import bcrypt from "bcryptjs";
import crypto from "crypto";

const SALT_ROUNDS = 10;

export const passwordService = {
  hash: (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
  },

  compare: (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
  },

  generatePassword: () => crypto.randomBytes(8).toString().toString(),
};
