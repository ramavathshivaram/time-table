import axios from "axios";
import logger from "../configs/logger.js";
import env from "#configs/env.js";

const brevoApi = axios.create({
  baseURL: "https://api.brevo.com/v3",
  headers: {
    "api-key": env.BREVO_API_KEY,
    "Content-Type": "application/json",
    accept: "application/json",
  },
  timeout: 10000,
});

const sendEmail = async (toEmail, subject, htmlContent) => {
  try {
    const payload = {
      sender: {
        name: "Time Table",
        email: "ramavathshiva6300@gmail.com",
      },
      to: [{ email: toEmail }],
      subject,
      htmlContent,
    };

    const response = await brevoApi.post("/smtp/email", payload);

    logger.info(`Email sent: ${response.data.messageId}`);

    return response.data;
  } catch (error) {
    const err = error?.response?.data || error.message;
    logger.error("Brevo email error", err);
    throw error;
  }
};

export default sendEmail;
