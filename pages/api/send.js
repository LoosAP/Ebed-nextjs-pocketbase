import EmailTemplate from "@/components/EmailTemplate";

import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST(req, res) {
  try {
    const { email, name } = req.body;
    const data = await resend.emails.send({
      from: "Nyomda <admin@loosapp.com>",
      to: email,
      subject: "Köszönjük, hogy felvetted velünk a kapcsolatot!",
      react: EmailTemplate({ name: name }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
