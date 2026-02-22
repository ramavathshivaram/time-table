import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
