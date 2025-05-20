import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY); // ✅ back-end correct

export async function envoyerEmailLivraison({
  liste,
  borne,
  date,
}: {
  liste: string;
  borne: string;
  date: string;
}) {
  return resend.emails.send({
    from: "onboarding@resend.dev",
    to: "tablettegt9@gmail.com",
    subject: `📦 Livraison autonome - ${borne}`,
    text: `Une livraison autonome a été effectuée depuis la borne : ${borne}\n\nDétails :\n${liste}\n\nDate : ${date}`,
  });
}
