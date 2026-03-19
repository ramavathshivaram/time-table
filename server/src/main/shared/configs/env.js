import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production"])
    .default("development"),

  REDIS_HOST: z.string().default("127.0.0.1"),
  REDIS_PORT: z.coerce.number().default(6379),

  MONGODB_URI: z.string().default("mongodb://localhost:27017/timeTable"),

  JWT_ACCESS_SECRET: z.string().optional(),
  JWT_REFRESH_SECRET: z.string().optional(),

  BREVO_API_KEY: z.string().optional(),

  GROQ_API_KEY: z.string().optional(),

  PORT: z.coerce.number().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const env = {
  ...parsed.data,
  isProd: parsed.data.NODE_ENV === "production",
};

export default env;
