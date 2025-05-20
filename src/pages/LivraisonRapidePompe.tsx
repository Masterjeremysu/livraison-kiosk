import { useState } from "react";
import SelecteurQuantite from "../composants/SelecteurQuantite";
import ListeArticlesLivrés from "../composants/ListeArticlesLivrés";
import DeverrouillageAdmin from "../composants/DeverrouillageAdmin";
import LayoutBorneClair from "../layouts/LayoutBorneClair";
import ArticlesDispo from "../composants/ArticlesDispo";
import type { Article } from "../composants/ArticlesDispo";
import BarreRechercheArticle from "../composants/BarreRechercheArticle";




export default function LivraisonRapidePompe() {
  const [produit, setProduit] = useState<string | null>(null);
  const [quantite, setQuantite] = useState(1);
  const [listeProduits, setListeProduits] = useState<
    { nom: string; destination: string; quantite: number }[]
  >([]);

  const handleAjouter = () => {
    if (!produit) return;

    const déclencherAnimation = () => {
      const node = document.createElement("div");
      node.innerText = produit || "";
      node.className = "fly-to-cart";
      document.body.appendChild(node);

      const champ = document.querySelector("input");
      const rect = champ?.getBoundingClientRect();
      if (rect) {
        node.style.left = rect.left + rect.width / 2 + "px";
        node.style.top = rect.top + "px";
      }

      setTimeout(() => {
        document.body.removeChild(node);
      }, 700);
    };

    déclencherAnimation();

    setListeProduits([
      ...listeProduits,
      {
        nom: produit,
        destination: "Atelier Fluides",
        quantite,
      },
    ]);
    setProduit(null);
    setQuantite(1);
  };

  const handleAjouterDepuisListe = (article: Article) => {
    const déjàAjouté = listeProduits.find(p => p.nom === article.libelle);
    if (déjàAjouté) return;

    setListeProduits([
      ...listeProduits,
      {
        nom: article.libelle,
        destination: "Atelier Fluides",
        quantite: 1,
      },
    ]);
  };

 const handleLivrer = async () => {
  const date = new Date().toLocaleString("fr-FR");
  const borne = "Pompe";
  const destinataire = "ton.email@exemple.com"; // modifie ici

  const liste = listeProduits
    .map((p) => `- ${p.quantite} x ${p.nom} – ${p.destination}`)
    .join("\n");

  try {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liste, borne, date, destinataire }),
    });

    if (!res.ok) throw new Error("Échec de l'envoi");

    alert("✅ Livraison enregistrée et email envoyé !");
    setListeProduits([]);
  } catch (err) {
    console.error(err);
    alert("❌ Livraison OK mais email non envoyé.");
  }
};


  return (
    <LayoutBorneClair>
    

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        🚚 Livraison Rapide – Pompe
      </h1>

      <div className="w-full space-y-6">
        <BarreRechercheArticle onAjouter={handleAjouterDepuisListe} />


        <SelecteurQuantite
          quantité={quantite}
          augmenter={() => setQuantite(quantite + 1)}
          diminuer={() => setQuantite(Math.max(1, quantite - 1))}
        />

        <button
          className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold shadow transition"
          onClick={handleAjouter}
          disabled={!produit}
        >
          ➕ Ajouter à la livraison
        </button>

        <ListeArticlesLivrés articles={listeProduits} />

        <div className="flex space-x-4">
          <button
            className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold shadow"
            onClick={handleLivrer}
            disabled={listeProduits.length === 0}
          >
            ✅ Valider et Livrer
          </button>
          <button
            className="flex-1 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg font-semibold shadow"
            onClick={() => {
              setProduit(null);
              setQuantite(1);
              setListeProduits([]);
            }}
          >
            ❌ Annuler
          </button>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            📦 Ajouter rapidement un article
          </h2>
          <ArticlesDispo onAjouter={handleAjouterDepuisListe} />
        </div>
      </div>

      <DeverrouillageAdmin />
    </LayoutBorneClair>
  );
}
