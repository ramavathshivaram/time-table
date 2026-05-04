import ApiError from "#utils/ApiError.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import env from "#configs/env.js";
import type { Types } from "mongoose";
import type { Socket } from "socket.io";

const publicKey = env.JWT_PUBLIC_KEY?.replace(/\\n/g, "\n");

if (!publicKey) {
  throw new Error("JWT public key is missing");
}

interface TokenPayload extends JwtPayload {
  userId: Types.ObjectId;
  tokenVersion: number;
  type: "access" ;
}

const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    }) as TokenPayload;

    if (!decoded.userId) {
      throw new ApiError(401, "Invalid token payload");
    }

    if (decoded.type !== "access") {
      throw new ApiError(401, "Invalid token type");
    }

    return decoded;
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};

const authenticate = (
  socket: Socket & { user?: TokenPayload },
  next: (err?: Error) => void,
) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication failed: No token"));
    }

    const payload = verifyToken(token);

    socket.user = payload;

    next();
  } catch (err: any) {
    next(new Error(err.message || "Authentication error"));
  }
};

export default authenticate;
