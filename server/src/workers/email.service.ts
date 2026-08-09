import { sendEmail } from "#services/send-email.js";
import loadHtml from "#utils/loadHtml.js";

type ForgotPassword = {
  token: string;
};

type RegisterGreeting = {
  userName: string;
};

export const emailService = {
  forgotPassword: async (email: string, { token }: ForgotPassword) => {
    const html = await loadHtml("email.otp.ejs", { token });
    return await sendEmail(email, "Password Reset", html);
  },

  registerGreeting: async (email: string, { userName }: RegisterGreeting) => {
    const html = await loadHtml("email.register.ejs", {
      userName,
      email,
    });
    return await sendEmail(email, "Welcome to Time Table", html);
  },
};
