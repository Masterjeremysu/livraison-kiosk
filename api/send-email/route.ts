import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { liste, borne, date, destinataire } = await req.json();

  if (!liste || !borne || !date || !destinataire) {
    return new Response(JSON.stringify({ error: "Champs manquants" }), {
      status: 400,
    });
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: destinataire,
      subject: `📦 Livraison autonome - ${borne}`,
      text: `Une livraison autonome a été effectuée depuis la borne : ${borne}\n\nDétails :\n${liste}\n\nDate : ${date}`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error("Erreur Resend:", err);
    return new Response(JSON.stringify({ error: "Échec d'envoi email" }), {
      status: 500,
    });
  }
}
