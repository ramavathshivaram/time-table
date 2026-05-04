import "dotenv/config";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(8084),

  ORIGIN: z.string().min(1, "ORIGIN is required"),
  WORKFLOW_SERVICE_URL: z.string().min(1, "WORKFLOW_SERVICE_URL is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.format());
  process.exit(1);
}

let publicKey;

try {
  publicKey = fs.readFileSync(
    path.join(__dirname, "../../keys/public.pem"),
    "utf-8",
  );
} catch (err: any) {
  console.error("❌ Failed to load RSA keys");
  console.error(err.message);
  process.exit(1);
}

if (!publicKey) {
  console.error("❌ JWT keys are missing");
  process.exit(1);
}

const env = {
  ...parsed.data,
  isProd: parsed.data.NODE_ENV === "production",
  JWT_PUBLIC_KEY: publicKey,
};

export default env;
