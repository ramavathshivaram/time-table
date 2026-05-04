import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(8081),
  REDIS_HOST: z.string().default("127.0.0.1"),
  REDIS_PORT: z.coerce.number().default(6379),
  ORIGIN: z.string().min(1, "ORIGIN is required"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  USER_SERVICE_URL: z.string().min(1, "User Service URL is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.format());
  process.exit(1);
}

let privateKey, publicKey;

try {
  privateKey = fs.readFileSync(
    path.join(__dirname, "../../keys/private.pem"),
    "utf-8"
  );

  publicKey = fs.readFileSync(
    path.join(__dirname, "../../keys/public.pem"),
    "utf-8"
  );
} catch (err: any) {
  console.error("❌ Failed to load RSA keys");
  console.error(err.message);
  process.exit(1);
}

if (!privateKey || !publicKey) {
  console.error("❌ JWT keys are missing");
  process.exit(1);
}

const env = {
  ...parsed.data,
  isProd: parsed.data.NODE_ENV === "production",
  JWT_PRIVATE_KEY: privateKey,
  JWT_PUBLIC_KEY: publicKey,
};

export default env;