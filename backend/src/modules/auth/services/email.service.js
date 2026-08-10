import nodemailer from "nodemailer";
import config from "../../../config/index.js";
import logger from "../../../utils/logger.js";

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const { smtp } = config.email;

  if (!smtp.host || !smtp.user || !smtp.pass) {
    transporter = null;
    return null;
  }

  transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  return transporter;
};

const buildResetOtpHtml = ({ otp, expiryMinutes, fullName }) => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; color: #0F172A; line-height: 1.6;">
  <div style="max-width: 520px; margin: 0 auto; padding: 24px;">
    <h2 style="color: #16A34A;">NourishBridge Password Reset</h2>
    <p>Hi ${fullName || "there"},</p>
    <p>Use the following one-time code to reset your password:</p>
    <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #16A34A;">${otp}</p>
    <p>This code expires in <strong>${expiryMinutes} minutes</strong>.</p>
    <p>If you did not request this, you can safely ignore this email.</p>
    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
    <p style="font-size: 12px; color: #64748B;">NourishBridge — Share Food • Share Hope</p>
  </div>
</body>
</html>
`;

export async function sendPasswordResetOtp({ to, otp, fullName }) {
  const subject = "Your NourishBridge password reset code";
  const html = buildResetOtpHtml({
    otp,
    expiryMinutes: config.otp.expiryMinutes,
    fullName,
  });
  const text = `Your NourishBridge password reset code is ${otp}. It expires in ${config.otp.expiryMinutes} minutes.`;

  const mailTransporter = getTransporter();

  if (!mailTransporter) {
    logger.info(`[DEV] Password reset OTP for ${to}: ${otp}`);
    return { delivered: false, mode: "console" };
  }

  await mailTransporter.sendMail({
    from: config.email.from,
    to,
    subject,
    text,
    html,
  });

  return { delivered: true, mode: "smtp" };
}

export default { sendPasswordResetOtp };
