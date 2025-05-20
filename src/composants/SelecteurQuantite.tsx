

type Props = {
  quantité: number;
  augmenter: () => void;
  diminuer: () => void;
};

export default function SélecteurQuantité({ quantité, augmenter, diminuer }: Props) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-lg">🛒 Quantité :</label>
      <div className="flex items-center space-x-2">
        <button
          className="bg-gray-100 text-gray-800 p-4 rounded-xl border border-blue-100 shadow-sm hover:bg-gray-200 transition"
          onClick={diminuer}
        >
          –
        </button>
        <span className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-xl border border-blue-100 shadow-sm transition">
          {quantité}
        </span>
        <button
          className="bg-gray-100 text-gray-800 p-4 rounded-xl border border-blue-100 shadow-sm hover:bg-gray-200 transition"
          onClick={augmenter}
        >
          +
        </button>
      </div>
    </div>
  );
}
  