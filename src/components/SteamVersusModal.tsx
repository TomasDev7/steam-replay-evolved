"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Swords,
  Crown,
  Flame,
  Trophy,
  Clock,
  Gamepad2,
  Search,
  Sparkles,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { FullReplayResponse, CoopFriendSquadMember } from "@/types/steam";
import { SupportedLanguage, TRANSLATIONS } from "@/lib/i18n";
import { translateGamerTitle } from "@/lib/narrator-translations";

interface SteamVersusModalProps {
  isOpen: boolean;
  onClose: () => void;
  userReplay: FullReplayResponse;
  lang?: SupportedLanguage;
}

export default function SteamVersusModal({
  isOpen,
  onClose,
  userReplay,
  lang = "es",
}: SteamVersusModalProps) {
  const t = TRANSLATIONS[lang];
  const [opponentInput, setOpponentInput] = useState("");
  const [opponentData, setOpponentData] = useState<FullReplayResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedDuel, setCopiedDuel] = useState(false);

  const squadFriends: CoopFriendSquadMember[] =
    userReplay.analytics.brokenPromises?.squadFriends || [];

  // Al abrir el modal por primera vez, si no hay oponente cargado, desafía al primer amigo (Night) por defecto
  useEffect(() => {
    if (isOpen && !opponentData && squadFriends.length > 0) {
      handleChallengeFriend(squadFriends[0].steamId);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChallengeFriend = async (steamId: string) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch("/api/replay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          steamInput: steamId,
          narrator: "roast_friend",
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.message || "No se pudo cargar el perfil para el duelo.");
        return;
      }
      setOpponentData(json);
    } catch {
      setErrorMsg("Error de conexión al cargar el oponente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opponentInput.trim()) return;
    handleChallengeFriend(opponentInput.trim());
  };

  const p1 = userReplay;
  const p2 = opponentData;

  const p1Profile = p1.analytics.profile;
  const p2Profile = p2?.analytics.profile;

  // Métricas seleccionadas de alto impacto (sin insomnio)
  const p1Hours = p1.analytics.officialStats.totalHoursThisYear;
  const p2Hours = p2 ? p2.analytics.officialStats.totalHoursThisYear : 0;

  const p1Streak = p1.analytics.officialStats.longestStreakDays;
  const p2Streak = p2 ? p2.analytics.officialStats.longestStreakDays : 0;

  const p1Achievements = p1.analytics.officialStats.totalAchievementsUnlocked;
  const p2Achievements = p2 ? p2.analytics.officialStats.totalAchievementsUnlocked : 0;

  const p1Diogenes = p1.analytics.diogenes.unplayedCount;
  const p2Diogenes = p2 ? p2.analytics.diogenes.unplayedCount : 0;

  const p1TopGameHours =
    p1.analytics.monopoly.topGame.hoursThisYear ||
    p1.analytics.monopoly.topGame.playtimeHours;
  const p2TopGameHours = p2
    ? p2.analytics.monopoly.topGame.hoursThisYear ||
      p2.analytics.monopoly.topGame.playtimeHours
    : 0;

  // Conteo de victorias
  let p1Wins = 0;
  let p2Wins = 0;
  if (p2) {
    if (p1Hours > p2Hours) p1Wins++; else if (p2Hours > p1Hours) p2Wins++;
    if (p1Streak > p2Streak) p1Wins++; else if (p2Streak > p1Streak) p2Wins++;
    if (p1Achievements > p2Achievements) p1Wins++; else if (p2Achievements > p1Achievements) p2Wins++;
    if (p1Diogenes > p2Diogenes) p1Wins++; else if (p2Diogenes > p1Diogenes) p2Wins++;
    if (p1TopGameHours > p2TopGameHours) p1Wins++; else if (p2TopGameHours > p1TopGameHours) p2Wins++;
  }

  const handleCopyDuelText = () => {
    if (!p2 || !p2Profile) return;
    const text = `⚔️ DUELO 1v1 STEAM REPLAY ${p1.analytics.officialStats.currentYear}\n` +
      `🔥 ${p1Profile.personaName} [${p1Wins} VICTORIAS] VS ${p2Profile.personaName} [${p2Wins} VICTORIAS]\n` +
      `⏱️ ${t.versus.metricHours}: ${p1Hours}h vs ${p2Hours}h (${p1Hours > p2Hours ? p1Profile.personaName : p2Profile.personaName} GANA)\n` +
      `⚡ ${t.versus.metricStreak}: ${p1Streak}d vs ${p2Streak}d\n` +
      `🏆 ${t.versus.metricAchievements}: ${p1Achievements} vs ${p2Achievements}\n` +
      `📦 ${t.versus.metricDiogenes}: ${p1Diogenes} vs ${p2Diogenes}\n` +
      `👑 ${t.versus.metricTopGame}: ${p1.analytics.monopoly.topGame.name} (${p1TopGameHours}h) vs ${p2.analytics.monopoly.topGame.name} (${p2TopGameHours}h)\n` +
      `Resultado: ¡${p1Wins > p2Wins ? p1Profile.personaName : p2Wins > p1Wins ? p2Profile.personaName : "Empate Legendario"} domina el versus de Steam!`;

    navigator.clipboard.writeText(text);
    setCopiedDuel(true);
    setTimeout(() => setCopiedDuel(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="steam-glass-heavy relative w-full max-w-4xl rounded-3xl p-5 md:p-8 border border-steam-blue/30 shadow-2xl space-y-6 my-auto text-white">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado */}
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
              <Swords className="w-4 h-4" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-red-400">
              {t.versus.title}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white mt-1">
            {lang === "es"
              ? "Cara a Cara: ¿Quién domina en Steam?"
              : "Head-to-Head: Who Dominates on Steam?"}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {t.versus.subtitle}
          </p>
        </div>

        {/* Selector de oponente */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400">
              {t.versus.squadQuickSelect}
            </span>
            {squadFriends.map((friend) => (
              <button
                key={friend.steamId}
                type="button"
                onClick={() => handleChallengeFriend(friend.steamId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                  p2Profile?.steamId === friend.steamId
                    ? "bg-red-500/20 border-red-500/50 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                    : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                }`}
              >
                <img
                  src={friend.avatarUrl}
                  alt={friend.personaName}
                  className="w-4 h-4 rounded-full"
                />
                {friend.personaName}
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={opponentInput}
                onChange={(e) => setOpponentInput(e.target.value)}
                placeholder={t.versus.customSearchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-steam-darkest border border-white/15 text-white text-xs focus:border-red-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:opacity-90 text-white font-black text-xs transition flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
            >
              <Swords className="w-3.5 h-3.5" />
              {loading ? t.versus.analyzing : t.versus.fightButton}
            </button>
          </form>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
            {errorMsg}
          </div>
        )}

        {/* Versus Arena */}
        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500 flex items-center justify-center mx-auto animate-pulse">
              <Swords className="w-6 h-6 text-red-400 animate-spin" />
            </div>
            <div className="text-sm font-black text-white">
              {lang === "es"
                ? "Cotejando librerías y estadísticas oficiales en los servidores de Steam..."
                : "Fetching official libraries and statistics from Steam servers..."}
            </div>
          </div>
        ) : p2 && p2Profile ? (
          <div className="space-y-4">
            {/* Cabecera de los dos Titanes con marcador visual */}
            <div className="grid grid-cols-11 items-center gap-2 p-4 rounded-2xl bg-black/60 border border-white/10 shadow-lg">
              {/* Jugador 1 */}
              <div className="col-span-5 flex items-center gap-3">
                <div className="relative">
                  <img
                    src={p1Profile.avatarUrl}
                    alt={p1Profile.personaName}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 border-steam-neon object-cover shadow-[0_0_20px_rgba(26,159,255,0.4)]"
                  />
                  {p1Wins > p2Wins && (
                    <div className="absolute -top-2 -right-2 p-1 bg-amber-400 rounded-full text-slate-950 shadow animate-bounce">
                      <Crown className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-steam-neon truncate max-w-[160px] md:max-w-[220px]">
                    {translateGamerTitle(p1.commentary.finalCertificate.gamerTitle, lang)}
                  </div>
                  <h4 className="text-base md:text-lg font-black text-white leading-tight">
                    {p1Profile.personaName}
                  </h4>
                  <div className="text-xs font-black text-steam-neon flex items-center gap-1 mt-0.5">
                    <span className="px-2 py-0.5 rounded bg-steam-neon/20 border border-steam-neon/40">
                      {p1Wins} {t.versus.categoryWins}
                    </span>
                  </div>
                </div>
              </div>

              {/* Emblema VS Central */}
              <div className="col-span-1 text-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 flex items-center justify-center font-black text-xs text-slate-950 shadow-[0_0_25px_rgba(239,68,68,0.7)] mx-auto border border-white/30">
                  VS
                </div>
              </div>

              {/* Jugador 2 (Oponente) */}
              <div className="col-span-5 flex items-center justify-end gap-3 text-right">
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-400 truncate max-w-[160px] md:max-w-[220px]">
                    {translateGamerTitle(p2.commentary.finalCertificate.gamerTitle, lang)}
                  </div>
                  <h4 className="text-base md:text-lg font-black text-white leading-tight">
                    {p2Profile.personaName}
                  </h4>
                  <div className="text-xs font-black text-amber-400 flex items-center justify-end gap-1 mt-0.5">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40">
                      {p2Wins} {t.versus.categoryWins}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={p2Profile.avatarUrl}
                    alt={p2Profile.personaName}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 border-amber-400 object-cover shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                  />
                  {p2Wins > p1Wins && (
                    <div className="absolute -top-2 -left-2 p-1 bg-amber-400 rounded-full text-slate-950 shadow animate-bounce">
                      <Crown className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Matriz de Duelo: 5 Categorías Clave con Ganador Claramente Marcado */}
            <div className="grid grid-cols-1 gap-2 text-xs">
              {/* CATEGORÍA 1: Horas Jugadas en el Año */}
              <div className="grid grid-cols-11 items-center p-3 rounded-2xl bg-steam-darkest/90 border border-white/10 gap-2">
                <div className={`col-span-4 p-2 rounded-xl flex items-center justify-between border ${
                  p1Hours > p2Hours
                    ? "bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : p1Hours < p2Hours
                    ? "bg-black/30 border-white/5 opacity-60"
                    : "bg-white/5 border-white/10"
                }`}>
                  <span className={`font-black text-sm ${p1Hours > p2Hours ? "text-emerald-400" : "text-white"}`}>
                    {p1Hours}h
                  </span>
                  {p1Hours > p2Hours ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                      {t.versus.winner}
                    </span>
                  ) : p1Hours === p2Hours ? (
                    <span className="text-[10px] text-gray-400 font-bold">{t.versus.tie}</span>
                  ) : (
                    <span className="text-[10px] text-gray-500 font-bold">{t.versus.loser}</span>
                  )}
                </div>

                <div className="col-span-3 text-center">
                  <div className="font-extrabold text-white text-[11px] flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-steam-blue" />
                    {t.versus.metricHours}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                    {Math.abs(p1Hours - p2Hours)} {lang === "es" ? "h de diferencia" : "h difference"}
                  </div>
                </div>

                <div className={`col-span-4 p-2 rounded-xl flex items-center justify-between border ${
                  p2Hours > p1Hours
                    ? "bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : p2Hours < p1Hours
                    ? "bg-black/30 border-white/5 opacity-60"
                    : "bg-white/5 border-white/10"
                }`}>
                  {p2Hours > p1Hours ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                      {t.versus.winner}
                    </span>
                  ) : p2Hours === p1Hours ? (
                    <span className="text-[10px] text-gray-400 font-bold">{t.versus.tie}</span>
                  ) : (
                    <span className="text-[10px] text-gray-500 font-bold">{t.versus.loser}</span>
                  )}
                  <span className={`font-black text-sm ${p2Hours > p1Hours ? "text-emerald-400" : "text-white"}`}>
                    {p2Hours}h
                  </span>
                </div>
              </div>

              {/* CATEGORÍA 2: Racha Récord Consecutiva */}
              <div className="grid grid-cols-11 items-center p-3 rounded-2xl bg-steam-darkest/90 border border-white/10 gap-2">
                <div className={`col-span-4 p-2 rounded-xl flex items-center justify-between border ${
                  p1Streak > p2Streak
                    ? "bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : p1Streak < p2Streak
                    ? "bg-black/30 border-white/5 opacity-60"
                    : "bg-white/5 border-white/10"
                }`}>
                  <span className={`font-black text-sm ${p1Streak > p2Streak ? "text-emerald-400" : "text-white"}`}>
                    {p1Streak} {lang === "es" ? "días" : "days"}
                  </span>
                  {p1Streak > p2Streak ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                      {t.versus.winner}
                    </span>
                  ) : p1Streak === p2Streak ? (
                    <span className="text-[10px] text-gray-400 font-bold">{t.versus.tie}</span>
                  ) : (
                    <span className="text-[10px] text-gray-500 font-bold">{t.versus.loser}</span>
                  )}
                </div>

                <div className="col-span-3 text-center">
                  <div className="font-extrabold text-white text-[11px] flex items-center justify-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    {t.versus.metricStreak}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                    {Math.abs(p1Streak - p2Streak)} {lang === "es" ? "días de ventaja" : "days lead"}
                  </div>
                </div>

                <div className={`col-span-4 p-2 rounded-xl flex items-center justify-between border ${
                  p2Streak > p1Streak
                    ? "bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : p2Streak < p1Streak
                    ? "bg-black/30 border-white/5 opacity-60"
                    : "bg-white/5 border-white/10"
                }`}>
                  {p2Streak > p1Streak ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                      {t.versus.winner}
                    </span>
                  ) : p2Streak === p1Streak ? (
                    <span className="text-[10px] text-gray-400 font-bold">{t.versus.tie}</span>
                  ) : (
                    <span className="text-[10px] text-gray-500 font-bold">{t.versus.loser}</span>
                  )}
                  <span className={`font-black text-sm ${p2Streak > p1Streak ? "text-emerald-400" : "text-white"}`}>
                    {p2Streak} {lang === "es" ? "días" : "days"}
                  </span>
                </div>
              </div>

              {/* CATEGORÍA 3: Logros Desbloqueados */}
              <div className="grid grid-cols-11 items-center p-3 rounded-2xl bg-steam-darkest/90 border border-white/10 gap-2">
                <div className={`col-span-4 p-2 rounded-xl flex items-center justify-between border ${
                  p1Achievements > p2Achievements
                    ? "bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : p1Achievements < p2Achievements
                    ? "bg-black/30 border-white/5 opacity-60"
                    : "bg-white/5 border-white/10"
                }`}>
                  <span className={`font-black text-sm ${p1Achievements > p2Achievements ? "text-emerald-400" : "text-white"}`}>
                    {p1Achievements}
                  </span>
                  {p1Achievements > p2Achievements ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                      {t.versus.winner}
                    </span>
                  ) : p1Achievements === p2Achievements ? (
                    <span className="text-[10px] text-gray-400 font-bold">{t.versus.tie}</span>
                  ) : (
                    <span className="text-[10px] text-gray-500 font-bold">{t.versus.loser}</span>
                  )}
                </div>

                <div className="col-span-3 text-center">
                  <div className="font-extrabold text-white text-[11px] flex items-center justify-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                    {t.versus.metricAchievements}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                    {Math.abs(p1Achievements - p2Achievements)} {lang === "es" ? "logros más" : "more trophies"}
                  </div>
                </div>

                <div className={`col-span-4 p-2 rounded-xl flex items-center justify-between border ${
                  p2Achievements > p1Achievements
                    ? "bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : p2Achievements < p1Achievements
                    ? "bg-black/30 border-white/5 opacity-60"
                    : "bg-white/5 border-white/10"
                }`}>
                  {p2Achievements > p1Achievements ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                      {t.versus.winner}
                    </span>
                  ) : p2Achievements === p1Achievements ? (
                    <span className="text-[10px] text-gray-400 font-bold">{t.versus.tie}</span>
                  ) : (
                    <span className="text-[10px] text-gray-500 font-bold">{t.versus.loser}</span>
                  )}
                  <span className={`font-black text-sm ${p2Achievements > p1Achievements ? "text-emerald-400" : "text-white"}`}>
                    {p2Achievements}
                  </span>
                </div>
              </div>

              {/* CATEGORÍA 4: Síndrome de Diógenes (Compras sin abrir) */}
              <div className="grid grid-cols-11 items-center p-3 rounded-2xl bg-steam-darkest/90 border border-white/10 gap-2">
                <div className={`col-span-4 p-2 rounded-xl flex items-center justify-between border ${
                  p1Diogenes > p2Diogenes
                    ? "bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : p1Diogenes < p2Diogenes
                    ? "bg-black/30 border-white/5 opacity-60"
                    : "bg-white/5 border-white/10"
                }`}>
                  <span className={`font-black text-sm ${p1Diogenes > p2Diogenes ? "text-purple-300" : "text-white"}`}>
                    {p1Diogenes} {lang === "es" ? "juegos" : "games"}
                  </span>
                  {p1Diogenes > p2Diogenes ? (
                    <span className="px-2 py-0.5 rounded-full bg-purple-400 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                      {lang === "es" ? "👑 MÁS ADICTO" : "👑 BIGGER HOARDER"}
                    </span>
                  ) : p1Diogenes === p2Diogenes ? (
                    <span className="text-[10px] text-gray-400 font-bold">{t.versus.tie}</span>
                  ) : (
                    <span className="text-[10px] text-gray-500 font-bold">{t.versus.loser}</span>
                  )}
                </div>

                <div className="col-span-3 text-center">
                  <div className="font-extrabold text-white text-[11px] flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    {t.versus.metricDiogenes}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                    {Math.abs(p1Diogenes - p2Diogenes)} {lang === "es" ? "juegos de diferencia" : "games diff"}
                  </div>
                </div>

                <div className={`col-span-4 p-2 rounded-xl flex items-center justify-between border ${
                  p2Diogenes > p1Diogenes
                    ? "bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : p2Diogenes < p1Diogenes
                    ? "bg-black/30 border-white/5 opacity-60"
                    : "bg-white/5 border-white/10"
                }`}>
                  {p2Diogenes > p1Diogenes ? (
                    <span className="px-2 py-0.5 rounded-full bg-purple-400 text-slate-950 font-black text-[10px] tracking-wider uppercase">
                      {lang === "es" ? "👑 MÁS ADICTO" : "👑 BIGGER HOARDER"}
                    </span>
                  ) : p2Diogenes === p1Diogenes ? (
                    <span className="text-[10px] text-gray-400 font-bold">{t.versus.tie}</span>
                  ) : (
                    <span className="text-[10px] text-gray-500 font-bold">{t.versus.loser}</span>
                  )}
                  <span className={`font-black text-sm ${p2Diogenes > p1Diogenes ? "text-purple-300" : "text-white"}`}>
                    {p2Diogenes} {lang === "es" ? "juegos" : "games"}
                  </span>
                </div>
              </div>

              {/* CATEGORÍA 5: Juego Monopolio #1 */}
              <div className="grid grid-cols-11 items-center p-3 rounded-2xl bg-steam-darkest/90 border border-white/10 gap-2">
                <div className={`col-span-4 p-2 rounded-xl flex items-center justify-between border ${
                  p1TopGameHours > p2TopGameHours
                    ? "bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : p1TopGameHours < p2TopGameHours
                    ? "bg-black/30 border-white/5 opacity-60"
                    : "bg-white/5 border-white/10"
                }`}>
                  <div className="text-left truncate max-w-[150px]">
                    <span className="font-black text-xs block text-white truncate">
                      {p1.analytics.monopoly.topGame.name}
                    </span>
                    <span className="text-[11px] font-bold text-steam-neon">
                      {p1TopGameHours}h
                    </span>
                  </div>
                  {p1TopGameHours > p2TopGameHours && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wider uppercase shrink-0">
                      {t.versus.winner}
                    </span>
                  )}
                </div>

                <div className="col-span-3 text-center">
                  <div className="font-extrabold text-white text-[11px] flex items-center justify-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
                    {t.versus.metricTopGame}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                    {Math.abs(Math.round((p1TopGameHours - p2TopGameHours) * 10) / 10)} {lang === "es" ? "h de diferencia" : "h difference"}
                  </div>
                </div>

                <div className={`col-span-4 p-2 rounded-xl flex items-center justify-between border ${
                  p2TopGameHours > p1TopGameHours
                    ? "bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    : p2TopGameHours < p1TopGameHours
                    ? "bg-black/30 border-white/5 opacity-60"
                    : "bg-white/5 border-white/10"
                }`}>
                  {p2TopGameHours > p1TopGameHours && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wider uppercase shrink-0">
                      {t.versus.winner}
                    </span>
                  )}
                  <div className="text-right truncate max-w-[150px]">
                    <span className="font-black text-xs block text-white truncate">
                      {p2.analytics.monopoly.topGame.name}
                    </span>
                    <span className="text-[11px] font-bold text-amber-400">
                      {p2TopGameHours}h
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Veredicto Dinámico */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-purple-950/40 to-blue-950/40 border border-white/15 flex items-start gap-3">
              <Crown className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-xs">
                  {t.versus.juryVerdict}
                </strong>
                <p className="text-xs text-gray-300 mt-0.5">
                  {p1Wins > p2Wins
                    ? lang === "es"
                      ? `¡Victoria indiscutida para ${p1Profile.personaName}! Se impuso en ${p1Wins} de 5 categorías clave con mayor volumen de horas y una racha intratable.`
                      : `Decisive victory for ${p1Profile.personaName}! Won ${p1Wins} out of 5 key categories with higher playtime and an unstoppable streak.`
                    : p2Wins > p1Wins
                    ? lang === "es"
                      ? `¡Victoria para ${p2Profile.personaName}! Superó a su rival en ${p2Wins} categorías, consolidándose en lo más alto del podio gamer.`
                      : `Victory for ${p2Profile.personaName}! Defeated their opponent in ${p2Wins} categories, standing tall on the Steam gaming podium.`
                    : lang === "es"
                    ? `¡Empate técnico absoluto (${p1Wins} a ${p2Wins})! Ambos comparten un nivel extraordinario de dedicación en Steam. ¡Tienen que definirlo en una partida co-op!`
                    : `Absolute draw (${p1Wins} to ${p2Wins})! Both share extreme dedication on Steam. Settle it in a co-op match!`}
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleCopyDuelText}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2 transition"
              >
                {copiedDuel ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    {t.versus.copiedForDiscord}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {t.versus.copyResults}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-steam-neon text-slate-950 font-black text-xs hover:bg-steam-blue transition"
              >
                {t.versus.done}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
