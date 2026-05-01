import ApiError from "#utils/ApiError.js";
import { COOKIE_EXPIRES_IN } from "../lib/const.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  maxAge: COOKIE_EXPIRES_IN,
};

export const setCookie = (res, name, value, options = {}) => {
  if (!name) throw new ApiError(400, "Cookie name is required");
  if (!res?.cookie) throw new ApiError(500, "Invalid response object");

  return res.cookie(name, value, { ...cookieOptions, ...options });
};

export const clearCookie = (res, name) => {
  if (!name) throw new ApiError(400, "Cookie name is required");
  return res.clearCookie(name);
};

export const getCookie = (req, name) => {
  if (!req?.cookies) {
    throw new ApiError(400, "Cookies middleware not enabled");
  }
  const cookie = req.cookies?.[name];

  if (!cookie) {
    throw new ApiError(404, `Cookie not found ${name}`);
  }

  return cookie;
};
