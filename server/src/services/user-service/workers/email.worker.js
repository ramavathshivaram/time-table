import { queueConst } from "../lib/const.js";
import { tryCatch, Worker } from "bullmq";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import redis from "#shared/configs/redis.js";

import sendEmail from "#shared/configs/sendEmail.js";

const emailJob = async (job) => {
  try {
    const { email, userName, avatar = "" } = job.data;

    const html = await ejs.renderFile(
      path.join(__dirname, "../templetes/email.register.ejs"),
      { email, userName, avatar },
    );

    await sendEmail(email, "Welcome to Time Table", html);
  } catch (error) {
    console.log(error);
  }
};

const worker = () =>
  new Worker(queueConst.SEND_REGISTER_EMAIL, emailJob, {
    connection: redis,
  });

export default worker;
