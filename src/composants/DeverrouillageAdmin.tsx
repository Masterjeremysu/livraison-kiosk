import  { useState, useRef } from "react";

export default function DeverrouillageAdmin() {
  const [afficherCode, setAfficherCode] = useState(false);
  const [code, setCode] = useState("");
  const zone = useRef<HTMLDivElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);


  const CODE_SECRET = "1515";

  const handleStart = () => {
    timer.current = setTimeout(() => {
      setAfficherCode(true);
    }, 3000); // appui long 3s
  };

  const handleEnd = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  const validerCode = () => {
    if (code === CODE_SECRET) {
      alert("🔓 Accès admin débloqué !");
      // TODO : rediriger vers /admin ou désactiver borne
      setAfficherCode(false);
      setCode("");
    } else {
      alert("❌ Code incorrect");
    }
  };

  return (
    <>
      {/* Zone invisible coin bas gauche */}
      <div
        ref={zone}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        className="fixed bottom-0 left-0 w-8 h-8 z-50"
      ></div>

      {/* Fenêtre modale code admin */}
      {afficherCode && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-neutral-800 p-6 rounded-xl space-y-4 w-72 text-white text-center">
            <h2 className="text-lg font-bold">🔐 Code Admin</h2>
            <input
              type="password"
              className="w-full p-2 rounded text-black"
              placeholder="Entrez le code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white font-bold"
              onClick={validerCode}
            >
              Valider
            </button>
            <button
              className="text-sm underline text-gray-300"
              onClick={() => setAfficherCode(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </>
  );
}
