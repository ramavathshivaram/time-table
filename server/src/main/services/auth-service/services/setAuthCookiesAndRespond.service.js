import authRepository from "../repositorys/auth.repository.js";
import { setCookie } from "./cookie.service.js";
import { generateTokens } from "./token.service.js";
import { createSession } from "./session.service.js";

const setAuthCookiesAndRespond = async (
  auth,
  userId,
  res,
  msg,
  statusCode = 201,
) => {
  const { accessToken, refreshToken } = generateTokens(
    userId,
    auth._id,
    auth.tokenVersion,
  );

  await auth.save();

  await createSession(auth._id, auth.tokenVersion);

  setCookie(res, "refreshToken", refreshToken);

  res.status(statusCode).json({
    message: msg,
    success: true,
    user: {
      userName: auth.userName,
      email: auth.email,
    },
    token: accessToken,
  });
};

export default setAuthCookiesAndRespond;
