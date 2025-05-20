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
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: destinataire,
      subject: `📦 Livraison autonome - ${borne}`,
      text: `Livraison effectuée depuis : ${borne}\n\n${liste}\n\n📅 ${date}`,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (err) {
    console.error("Erreur envoi Resend", err);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
