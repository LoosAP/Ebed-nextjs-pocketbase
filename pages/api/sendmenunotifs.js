import NewMenuEmail from "@/components/mailing/NewMenuEmail";
import { Resend } from "resend";
const resendName = process.env.RESEND_API_NAME;
const resendDomain = process.env.RESEND_DOMAIN;
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST(req, res) {
  try {
    const { email, prices, date, menuData } = req.body;

    const data = await resend.emails.send({
      from: `${resendName} <szolgaltato@${resendDomain}>`,
      to: email,
      subject: "Új heti menü lett feltéve!",
      react: NewMenuEmail({ prices: prices, date: date, menuData: menuData }),
    });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}

// attachments: [
//   {
//     filename: "logo.png",
//     path: "https://loosapp.com/logo.png",
//     cid: "logo",
//   },
// ],
