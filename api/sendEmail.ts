import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Méthode non autorisée" }), {
      status: 405,
    });
  }

  const body = await req.json();
  const { liste, borne, date, destinataire } = body;

  if (!liste || !borne || !date || !destinataire) {
    return new Response(JSON.stringify({ error: "Champs manquants" }), {
      status: 400,
    });
  }

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: destinataire,
      subject: `📦 Livraison autonome - ${borne}`,
      text: `Une livraison autonome a été effectuée depuis la borne : ${borne}\n\nDétails :\n${liste}\n\nDate : ${date}`,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erreur email", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
