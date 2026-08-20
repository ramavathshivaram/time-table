import { userService } from "#features/user/user.service.js";
import ApiError from "#utils/ApiError.js";
import { passwordService } from "./services/password.service.js";
import { queueService } from "../../shared/services/queue.service.js";
import { sessionService } from "./services/session.service.js";
import { tokenService } from "./services/token.service.js";
import { LoginDto, RegisterDto } from "./types/auth.types.js";

export const authService = {
  register: async (data: RegisterDto) => {
    let user;

    data.password = await passwordService.hash(data.password);
    user = await userService.create(data);

    const { refreshToken } = await sessionService.create(user._id);
    const accessToken = tokenService.generateAccessToken(user._id);

    queueService.registerGreeting({
      email: user.email,
      userName: user.userName,
    });
    return {
      user: user,
      refreshToken,
      accessToken,
    };
  },

  login: async (data: LoginDto) => {
    const user = await userService.findByEmailWithPassword(data.email);

    const isPasswordValid = await passwordService.compare(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid password");
    }
    const accessToken = tokenService.generateAccessToken(user._id);
    const { refreshToken } = await sessionService.create(user._id);

    return {
      user: {
        userName: user.userName,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  },

  googleLogin: async (data: any) => {
    const user = await userService.findByEmail(data.email);

    const accessToken = tokenService.generateAccessToken(user._id);
    const { refreshToken } = await sessionService.create(user._id);

    return {
      user: {
        userName: user.userName,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  },

  googleRegister: async (data: any) => {
    let user;

    data.password = await passwordService.hash(
      passwordService.generatePassword(),
    );
    user = await userService.create(data);

    const { refreshToken } = await sessionService.create(user._id);
    const accessToken = tokenService.generateAccessToken(user._id);

    queueService.registerGreeting({
      email: user.email,
      userName: user.userName,
    });
    return {
      user: user,
      refreshToken,
      accessToken,
    };
  },

  me: async (userId: string) => {
    const user = await userService.findById(userId);
    return user;
  },

  logout: async (refreshToken: string) => {
    await sessionService.revoke(refreshToken);
  },

  forgotPassword: async (email: string) => {
    const user = await userService.findByEmail(email);

    const token = await sessionService.generateForgotPasswordToken(user._id);

    queueService.forgotPassword({ email, token });
  },

  resetPassword: async (token: string, password: string) => {
    const userId = await sessionService.getUserIdFromPasswordResetToken(token);

    password = await passwordService.hash(password);

    await userService.updatePassword(userId, password);
  },

  refresh: async (refreshToken: string) => {
    const { userId, refreshToken: newRefreshToken } =
      await sessionService.rotate(refreshToken);

    const accessToken = tokenService.generateAccessToken(userId);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  },
};
