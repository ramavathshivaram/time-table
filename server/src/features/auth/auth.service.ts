import { userService } from "#features/user/user.service.js";
import ApiError from "#utils/ApiError.js";
import { passwordService } from "./services/password.service.js";
import { queueService } from "./services/queue.service.js";
import { sessionService } from "./services/session.service.js";
import { tokenService } from "./services/token.service.js";
import { LoginDto, RegisterDto } from "./types/auth.types.js";

export const authService = {
  register: async (data: RegisterDto) => {
    let user;
    try {
      data.password = await passwordService.hash(data.password);
      user = await userService.create(data);
    } catch (err) {
      console.log(err);
    }

    const refreshToken = await sessionService.create(user._id);
    const accessToken = tokenService.generateAccessToken(user._id);

    return {
      user: user,
      refreshToken,
      accessToken,
    };
  },

  login: async (data: LoginDto) => {
    const user = await userService.findByEmail(data.email);

    const accessToken = tokenService.generateAccessToken(user._id);
    const refreshToken = await sessionService.create(user._id);

    return {
      user,
      accessToken,
      refreshToken,
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
    // TODO generate password reset token store it in redis and send it to user

    const user = await userService.findByEmail(email);

    const token = tokenService.generatePasswordResetToken(user._id);

    queueService.forgotPassword({ email, token });
  },

  resetPassword: async (token: string, password: string) => {
    const userId = sessionService.getUserIdFromPasswordResetToken(token);
    await userService.updatePassword(userId, password);
  },

  refresh: async (refreshToken: string) => {
    const [sessionId, token] =
      tokenService.getDataFromRefreshToken(refreshToken);

    const newRefreshToken = await sessionService.rotate(sessionId, token);

    const accessToken = tokenService.generateAccessToken(sessionId);

    return { accessToken, refreshToken: newRefreshToken };
  },
};
