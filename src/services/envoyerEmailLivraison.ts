import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

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
    to: "tablettegt9@gmail.com", // remplace par ton vrai mail de test
    subject: `📦 Livraison autonome - ${borne}`,
    text: `Une livraison autonome a été effectuée depuis la borne : ${borne}\n\nDétails :\n${liste}\n\nDate : ${date}`,
  });
}
