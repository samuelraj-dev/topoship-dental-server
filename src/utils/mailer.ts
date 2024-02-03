import nodemailer, { SendMailOptions } from "nodemailer";

import config from "config";
import logger from "./logger";

// async function createTestCreds() {
//   const creds = await nodemailer.createTestAccount();
//   console.log({ creds });
// }

// createTestCreds();

const smtp = config.get<{
  user: string,
  pass: string,
  host: string,
  port: number,
  secure: boolean,
}>('smtp') || {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
};

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  }
})

export default async function sendMail(payload: SendMailOptions) {
  
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      logger.error(err, "Error sending email");
      return;
    }

    logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  })
}