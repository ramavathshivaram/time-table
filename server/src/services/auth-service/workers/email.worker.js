import { queueConst } from "../lib/const.js";
import { Worker } from "bullmq";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import redis from "../../../shared/configs/redis.js";

import sendEmail from "../../../shared/configs/sendEmail.js";

const emailJob = async (job) => {
  console.log("Processing:", job.name);

  const { email, otp } = job.data;

  const html = await ejs.renderFile(
    path.join(__dirname, "../templetes/email.otp.ejs"),
    { otp },
  );

  await sendEmail(email, "OTP Verification", html);
};

const worker = () =>
  new Worker(queueConst.SEND_OTP_EMAIL, emailJob, {
    connection: redis,
  });

export default worker;
