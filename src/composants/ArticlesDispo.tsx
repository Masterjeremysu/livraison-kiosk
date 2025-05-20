
import articles from "../data/articles.json";

export type Article = {
  reference: string;
  libelle: string;
  "code barre": string;
  "machine pdt"?: string;
};

type Props = {
  onAjouter: (article: Article) => void;
};

export default function ArticlesDispo({ onAjouter }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <button
          key={index}
          onClick={() => onAjouter(article)}
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
  );
}
