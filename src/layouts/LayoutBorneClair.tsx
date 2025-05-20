import React from "react";

/**
 * LayoutBorneClair.tsx
 * Fond clair stylé iOS avec flou subtil / dégradé léger
 */
type Props = {
  children: React.ReactNode;
};

export default function LayoutBorneClair({ children }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f3f4f6] to-[#e0e7ff] text-gray-800 flex flex-col items-center justify-start px-6 py-10 font-sans relative overflow-hidden">
      {/* Arrière-plan flouté */}
      <div className="absolute inset-0 z-0 bg-[url('/fond-entrepot-flou.jpg')] bg-cover bg-center opacity-10 blur-sm pointer-events-none" />

      {/* Contenu principal */}
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl p-8 space-y-6 z-10">
        {children}
      </div>
    </div>
  );
}
