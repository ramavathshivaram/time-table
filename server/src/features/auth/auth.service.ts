import { userService } from "#features/user/user.service.js";
import { passwordService } from "./services/password.service.js";
import { sessionService } from "./services/session.service.js";
import { tokenService } from "./services/token.service.js";
import { RegisterDto } from "./types/auth.types.js";

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
};
