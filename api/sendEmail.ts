// Fichier : /api/sendEmail.ts

import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { liste, borne, date, destinataire } = req.body;

  if (!liste || !borne || !date || !destinataire) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: destinataire,
      subject: `📦 Livraison autonome - ${borne}`,
      text: `Une livraison autonome a été effectuée depuis la borne : ${borne}\n\nDétails :\n${liste}\n\nDate : ${date}`,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Erreur envoi email :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
