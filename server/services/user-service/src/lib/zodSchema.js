import * as Z from "zod";

export const createUserSchema = Z.object({
  userName: Z.string(),
  email: Z.string().email(),
  authId: Z.string(),
});
