import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import articles from "../data/articles.json";
import type { Article } from "./ArticlesDispo";

type Props = {
  onAjouter: (article: Article) => void;
};

export default function BarreRechercheArticle({ onAjouter }: Props) {
  const [recherche, setRecherche] = useState("");
  const [résultats, setRésultats] = useState<Article[]>([]);

  useEffect(() => {
  if (recherche.trim() === "") {
    setRésultats([]);
  } else {
    const fuse = new Fuse(articles, {
      keys: ["reference", "libelle", "machine pdt"],
      threshold: 0.4,
    });
    const trouvés = fuse.search(recherche).map((r) => r.item);
    setRésultats(trouvés);
  }
}, [recherche]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="🔎 Rechercher un article par référence, nom ou machine"
        className="w-full p-3 rounded-xl border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />

      {résultats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {résultats.map((article, i) => (
            <button
              key={i}
              onClick={() => {
                onAjouter(article);
                setRecherche("");
              }}
              className="bg-white rounded-xl shadow hover:shadow-md p-4 text-left border border-gray-200 hover:border-blue-400 transition text-sm"
            >
              <h3 className="font-semibold text-blue-600 mb-1">
                {article.libelle}
              </h3>
              <p className="text-gray-600 text-xs">Réf. : {article.reference}</p>
              {article["machine pdt"] && (
                <p className="text-gray-400 text-xs italic">
                  Machine : {article["machine pdt"]}
                </p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
