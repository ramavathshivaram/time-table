import brevo from "./configs/brevo.js";
import ejs from "ejs";
import path from "path";

const sendOTPEmail = async (email, otp) => {
  try {
    const html = await ejs.renderFile(
     path.join(process.cwd(), "src/views/otp.ejs"),
      { otp },
    );

    const data = {
      sender: {
        name: "Time Table",
        email: "ramavathshiva6300@gmail.com",
      },

      to: [{ email }],

      subject: "OTP Verification",

      htmlContent: html,
    };

    const response = await brevo.post("/smtp/email", data);

    return response.data;
  } catch (error) {
    console.error(error?.response?.data || error.message);
    throw error;
  }
};

export default sendOTPEmail;
