

type Article = {
  nom: string;
  destination: string;
  quantite: number;
};

type Props = {
  articles: Article[];
};

export default function ListeArticlesLivrés({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <div className="bg-gray-100 text-gray-800 p-4 rounded-xl border border-blue-100 shadow-sm">
      <h2 className="text-blue-600 font-semibold">📦 Livraison en cours :</h2>
      <ul className="space-y-1">
        {articles.map((article, index) => (
          <li key={index} className="text-gray-800">
            ▸ <strong>{article.quantite}</strong> x {article.nom} –{" "}
            <em>{article.destination}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
