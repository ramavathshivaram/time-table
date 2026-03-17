import sendEmail from "#utils/sendEmail.js";

describe("Email Service", () => {
  it("should send email successfully", async () => {
    const res = await sendEmail(
      "ramavathshiva6300@gmail.com",
      "OTP Generation",
      "<h1>Your OTP</h1>",
    );

    expect(res).toBeDefined();
    expect(res.messageId).toBeDefined();
  });
});
