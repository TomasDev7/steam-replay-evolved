"use client";

import React from "react";
import { SteamGameEnriched } from "@/types/steam";

interface MovingGamesBackdropProps {
  games: SteamGameEnriched[];
}

/**
 * Fondo en movimiento estilo Steam Replay Oficial:
 * Muestra filas diagonales en movimiento continuo con las portadas reales de los juegos
 * que el usuario jugó durante el año en curso (2026).
 */
export default function MovingGamesBackdrop({
  games,
}: MovingGamesBackdropProps) {
  if (!games || games.length === 0) return null;

  // Duplicamos el array para lograr un loop infinito fluido sin cortes
  const row1 = [...games, ...games, ...games];
  const row2 = [...games.slice().reverse(), ...games.slice().reverse(), ...games];
  const row3 = [
    ...games.slice(3),
    ...games.slice(0, 3),
    ...games.slice(3),
    ...games.slice(0, 3),
  ];

  const renderGameThumb = (g: SteamGameEnriched, key: string) => (
    <img
      key={key}
      src={g.headerImage}
      alt={g.name}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (!target.src.includes("library_hero")) {
          target.src = g.heroImage;
        } else {
          target.src = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${g.appid}/capsule_616x353.jpg`;
        }
      }}
      className="w-64 h-32 object-cover rounded-2xl border border-white/15 shadow-lg shrink-0"
    />
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Contenedor inclinado estilo collage de Steam Replay */}
      <div className="absolute -inset-24 -rotate-6 scale-110 opacity-25 flex flex-col justify-center gap-5">
        {/* Fila 1: Hacia la izquierda */}
        <div className="animate-marquee-left gap-4">
          {row1.map((g, idx) => renderGameThumb(g, `r1-${g.appid}-${idx}`))}
        </div>

        {/* Fila 2: Hacia la derecha */}
        <div className="animate-marquee-right gap-4">
          {row2.map((g, idx) => renderGameThumb(g, `r2-${g.appid}-${idx}`))}
        </div>

        {/* Fila 3: Hacia la izquierda */}
        <div className="animate-marquee-left gap-4">
          {row3.map((g, idx) => renderGameThumb(g, `r3-${g.appid}-${idx}`))}
        </div>

        {/* Fila 4: Hacia la derecha */}
        <div className="animate-marquee-right gap-4">
          {row1.map((g, idx) => renderGameThumb(g, `r4-${g.appid}-${idx}`))}
        </div>
      </div>

      {/* Viñeta de degradado radial estilo SteamOS para que el texto sea 100% legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e141b]/80 via-[#0e141b]/70 to-[#0e141b]/95" />
    </div>
  );
}
