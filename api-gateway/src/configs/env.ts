import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(8080),

  REDIS_HOST: z.string().default("127.0.0.1"),
  REDIS_PORT: z.coerce.number().default(6379),

  ORIGIN: z.string().min(1, "ORIGIN is required"),

  AUTH_SERVICE_URL: z.string().min(1, "AUTH_SERVICE_URL is required"),
  USER_SERVICE_URL: z.string().min(1, "USER_SERVICE_URL is required"),
  WORKFLOW_SERVICE_URL: z.string().min(1, "WORKFLOW_SERVICE_URL is required")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.format());
  process.exit(1);
}
const env = {
  ...parsed.data,
  isProd: parsed.data.NODE_ENV === "production",
};

export default env;
