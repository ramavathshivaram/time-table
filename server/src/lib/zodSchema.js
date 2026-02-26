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

export const forgotPasswordSchema = z.object({ email: z.string().email() });

export const verifyOTPSchema = z.object({
  otp: z.string().min(6).max(6),
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  otp: z.string().min(6).max(6),
  email: z.string().email(),
});

export const googleLoginSchema = z.object({
  accessToken: z.string(),
});

export const googleRegisterSchema = z.object({
  accessToken: z.string(),
});
