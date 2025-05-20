import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import Fuse from "fuse.js";
import dataBrute from "../data/articles.json";

type Article = {
  reference: string;
  libelle: string;
  "code barre": string;
  "machine pdt"?: string;
};

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [recherche, setRecherche] = useState("");
  const [machineFiltrée, setMachineFiltrée] = useState("");
  const [résultats, setRésultats] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(dataBrute);
    setRésultats(dataBrute);
  }, []);

  useEffect(() => {
    let résultatsFiltres = [...articles];

    if (recherche.trim() !== "") {
      const fuseLocal = new Fuse(articles, {
        keys: ["reference", "libelle", "machine pdt"],
        threshold: 0.4, // tolérance fautes
      });

      const trouvés = fuseLocal.search(recherche).map((r) => r.item);
      résultatsFiltres = trouvés;
    }

    if (machineFiltrée !== "") {
      résultatsFiltres = résultatsFiltres.filter(
        (a) => a["machine pdt"] === machineFiltrée
      );
    }

    setRésultats(résultatsFiltres);
  }, [recherche, machineFiltrée, articles]);

  const machinesUniques = Array.from(
    new Set(articles.map((a) => a["machine pdt"]).filter(Boolean))
  );

  return (
    <div className="min-h-screen bg-neutral-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-400">📦 Catalogue des Articles</h1>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Rechercher un article..."
          className="p-3 rounded-lg bg-neutral-700 text-white w-full md:w-1/2"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />

        <div className="w-full md:w-1/3">
          <label htmlFor="machineSelect" className="sr-only">
            Filtrer par machine
          </label>
          <select
            id="machineSelect"
            aria-label="Filtrer par machine"
            className="p-3 rounded-lg bg-neutral-700 text-white w-full"
            value={machineFiltrée}
            onChange={(e) => setMachineFiltrée(e.target.value)}
          >
            <option value="">Toutes les machines</option>
            {machinesUniques.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste d’articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {résultats.map((article, i) => (
          <div key={i} className="bg-neutral-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-green-300">{article.libelle}</h2>
            <p className="text-sm text-gray-300 mb-1">Référence : {article.reference}</p>
            {article["machine pdt"] && (
              <p className="text-sm text-gray-400 mb-2">
                Machine : {article["machine pdt"]}
              </p>
            )}
            <div className="bg-white p-2 rounded-lg inline-block">
              <Barcode value={article["code barre"]} height={50} fontSize={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
