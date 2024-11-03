import { env } from "@/constants/env";
import { createTransport } from "nodemailer";

if (!env.MY_GMAIL || !env.MY_GMAIL_PASSWORD) {
  throw new Error("Gmail keys are not set");
}

export const sendMailToMe = async ({ text }: { text: string }) => {
  const mail = env.MY_GMAIL;
  const pass = env.MY_GMAIL_PASSWORD;

  const transporter = createTransport({
    service: "Gmail",
    auth: { user: mail, pass: pass },
  });

  const info = await transporter.sendMail({
    from: mail,
    to: mail,
    subject: `[${env.SERVICE_NAME}] AWS Lambda からの通知`,
    text,
  });

  console.log("メールを送信しました", info);
};
