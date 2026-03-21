import { REFRESH_TOKEN_EXPIRES_IN } from "../lib/const.js";
import { setCookie } from "./cookie.service.js";
import { generateTokens } from "./token.service.js";

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

  auth.refreshToken = refreshToken;
  await auth.save();

  console.log(REFRESH_TOKEN_EXPIRES_IN);

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
