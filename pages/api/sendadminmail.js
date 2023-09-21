import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST(req, res) {
  try {
    const { email, subject, message, attachment } = req.body;
    console.log(req);
    console.log(req.body);

    const data = await resend.emails.send({
      from: "Nyomda <admin@loosapp.com>",
      to: email,
      subject: subject,
      text: message,
      attachments: attachment,
    });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
