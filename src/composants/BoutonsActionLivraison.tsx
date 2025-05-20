

type Props = {
  désactiverValidation: boolean;
  onLivrer: () => void;
  onAnnuler: () => void;
};

export default function BoutonsActionLivraison({
  désactiverValidation,
  onLivrer,
  onAnnuler,
}: Props) {
  return (
    <div className="flex space-x-4 mt-4">
      <button
        className="flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white text-lg font-bold"
        onClick={onLivrer}
        disabled={désactiverValidation}
      >
        ✅ Valider et Livrer
      </button>
      <button
        className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-lg font-bold"
        onClick={onAnnuler}
      >
        ❌ Annuler
      </button>
    </div>
  );
}
