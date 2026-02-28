import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const brevoApi = axios.create({
  baseURL: "https://api.brevo.com/v3",
  headers: {
    "api-key": process.env.BREVO_API_KEY,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

const sendEmail = async (toEmail, subject, htmlContent) => {
  try {
    const data = {
      sender: {
        name: "Time Table",
        email: "ramavathshiva6300@gmail.com",
      },
      to: [{ email: toEmail }],
      subject,
      htmlContent,
    };

    const response = await brevoApi.post("/smtp/email", data);

    return response.data;
  } catch (error) {
    console.error(error?.response?.data || error.message);
    throw error;
  }
};

export default sendEmail;
