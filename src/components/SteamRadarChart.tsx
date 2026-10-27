"use client";

import React from "react";

interface RadarAxis {
  axis: string;
  value: number; // 0 to 100
  communityMedian?: number;
  rawHours: number;
  percentage?: number;
}

interface SteamRadarChartProps {
  axes: RadarAxis[];
  accentColor?: string;
  size?: number;
  compact?: boolean;
  lang?: "es" | "en";
}

const AXIS_TRANSLATIONS: Record<string, string> = {
  "Cooperativo & Caos": "Co-op & Chaos",
  "Cooperativo y Caos": "Co-op & Chaos",
  "Supervivencia & Zombies": "Survival & Zombies",
  "Supervivencia": "Survival",
  "Roguelike & Soulslike": "Roguelike & Soulslike",
  "Roguelike": "Roguelike",
  "RPG & Mundo Abierto": "RPG & Open World",
  "RPG Mundo Abierto": "RPG & Open World",
  "Acción & Parkour": "Action & Parkour",
  "Acción": "Action",
  "Plataformas & Precisión": "Platformer & Precision",
  "Plataformas": "Platformer",
  "Terror": "Horror",
  "Indie": "Indie",
  "Paz Mental": "Cozy & Relax",
  "Competitivo": "Competitive",
  "Competitivo Tóxico": "Competitive",
  "Shooter": "Shooter",
};

export default function SteamRadarChart({
  axes,
  accentColor = "#1a9fff",
  size = 280,
  compact = false,
  lang = "es",
}: SteamRadarChartProps) {
  const center = size / 2;
  const radius = compact ? size * 0.36 : size * 0.33;
  const levels = [0.25, 0.5, 0.75, 1];
  const safeAxes = axes.slice(0, 6);
  const total = safeAxes.length || 6;

  const translateAxisLabel = (axis: string) => {
    if (lang === "es") return axis;
    return AXIS_TRANSLATIONS[axis] || axis;
  };

  const getPoint = (index: number, factor: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const x = center + radius * factor * Math.cos(angle);
    const y = center + radius * factor * Math.sin(angle);
    return { x, y };
  };

  const dataPoints = safeAxes
    .map((item, idx) => {
      const factor = Math.max(0.15, Math.min(1, item.value / 100));
      const pt = getPoint(idx, factor);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  const communityPoints = safeAxes
    .map((item, idx) => {
      const factor = Math.max(
        0.15,
        Math.min(1, (item.communityMedian ?? 45) / 100)
      );
      const pt = getPoint(idx, factor);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="steamRadarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.65" />
            <stop offset="100%" stopColor="#66c0f4" stopOpacity="0.22" />
          </radialGradient>
        </defs>

        {levels.map((lvl) => {
          const ringPoints = safeAxes
            .map((_, idx) => {
              const pt = getPoint(idx, lvl);
              return `${pt.x},${pt.y}`;
            })
            .join(" ");
          return (
            <polygon
              key={lvl}
              points={ringPoints}
              fill="none"
              stroke="rgba(102, 192, 244, 0.18)"
              strokeWidth="1"
              strokeDasharray={lvl < 1 ? "3 3" : undefined}
            />
          );
        })}

        {safeAxes.map((_, idx) => {
          const outer = getPoint(idx, 1);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(102, 192, 244, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Polígono de la Media de la Comunidad de Steam */}
        <polygon
          points={communityPoints}
          fill="rgba(255, 255, 255, 0.05)"
          stroke="rgba(255, 255, 255, 0.38)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Polígono del Jugador */}
        <polygon
          points={dataPoints}
          fill="url(#steamRadarFill)"
          stroke={accentColor}
          strokeWidth="2.5"
        />

        {safeAxes.map((item, idx) => {
          const factor = Math.max(0.15, Math.min(1, item.value / 100));
          const pt = getPoint(idx, factor);
          const labelPt = getPoint(idx, compact ? 1.24 : 1.28);

          return (
            <g key={item.axis}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={compact ? 3 : 4.5}
                fill="#ffffff"
                stroke={accentColor}
                strokeWidth="2.5"
              />
              {!compact && (
                <>
                  <text
                    x={labelPt.x}
                    y={labelPt.y - 5}
                    textAnchor="middle"
                    className="fill-gray-200 text-[10px] font-bold"
                  >
                    {translateAxisLabel(item.axis)}
                  </text>
                  <text
                    x={labelPt.x}
                    y={labelPt.y + 8}
                    textAnchor="middle"
                    className="fill-steam-blue text-[10px] font-extrabold"
                  >
                    {item.rawHours}h ({item.percentage ?? item.value}%)
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>

      {!compact && (
        <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-300">
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: accentColor }}
            />
            {lang === "es" ? "Tu ADN Gamer" : "Your Gamer DNA"}
          </span>
          <span className="flex items-center gap-1.5 text-gray-400">
            <span className="w-3 h-0.5 border-b border-dashed border-white/60 inline-block" />
            {lang === "es" ? "Mediana Global Steam" : "Steam Global Median"}
          </span>
        </div>
      )}
    </div>
  );
}
