import { MailAdapter, SendMailData } from "../mail-adpater";

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2ea5c1db089e0a",
    pass: "cc1cc8063a2d2a",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe FidGet <no-reply@fidget>",
      to: "Anderson Mateus <sinothic@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
