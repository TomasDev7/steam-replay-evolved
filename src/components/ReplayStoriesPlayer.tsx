"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Download,
  Copy,
  Check,
  Cpu,
  Flame,
  Trophy,
  Brain,
  Skull,
  Wallet,
  Clock,
  Users,
  Sparkles,
  Award,
  Calendar,
  Gamepad2,
  MousePointer,
  Zap,
  ShieldCheck,
  Ghost,
  TrendingUp,
  TrendingDown,
  Dices,
  Compass,
  Film,
  ExternalLink,
  Gift,
  Share2,
  Smartphone,
  Monitor,
  CreditCard,
  Sliders,
  Globe,
  Swords,
} from "lucide-react";
import { FullReplayResponse, NarratorPersona, SteamGameEnriched } from "@/types/steam";
import { NARRATOR_CONFIGS } from "@/lib/steam-analytics";
import SteamRadarChart from "@/components/SteamRadarChart";
import MovingGamesBackdrop from "@/components/MovingGamesBackdrop";
import SteamShareModal from "@/components/SteamShareModal";
import SteamVersusModal from "@/components/SteamVersusModal";
import { playSteamAchievementSound } from "@/lib/sound-effects";
import {
  SupportedLanguage,
  TRANSLATIONS,
} from "@/lib/i18n";
import {
  translateGamerTitle,
  getEnglishRoast,
  getNarratorLocalized,
  translateTag,
  translateRoleTitle,
  translateDominantSchedule,
  translateMarathonDate,
  translateMarathonDescription,
  translateShareableOneLiner,
} from "@/lib/narrator-translations";

const MONTH_SHORT_EN: Record<string, string> = {
  ENE: "JAN",
  FEB: "FEB",
  MAR: "MAR",
  ABR: "APR",
  MAY: "MAY",
  JUN: "JUN",
  JUL: "JUL",
  AGO: "AUG",
  SEP: "SEP",
  OCT: "OCT",
  NOV: "NOV",
  DIC: "DEC",
};

const HIGHLIGHT_NOTES_EN = [
  "Post-apocalyptic immersion in the Russian nuclear winter (January 2026)",
  "Hail of bullets, co-op looting, and survival in town (February 2026)",
  "Isometric zombie apocalypse and liminal exploration (March 2026)",
  "Month of rotation between co-op survival and platformers (April 2026)",
  "Precision mountain climbing and RPG trials (May 2026)",
  "Medieval graveyard management and descent into the underworld (June 2026)",
  "Full immersion into Night City + co-op horror with friends (July 2026)",
  "PEAK OF THE YEAR! 5 active games, Zombie Parkour and 102h in R.E.P.O. (August 2026)",
  "Chaotic RV road trip with the squad (September 2026)",
  "Roguelike basement marathon and mythological combat (October 2026)",
];

function translateMonthName(monthName: string, lang: SupportedLanguage): string {
  if (lang === "es") return monthName;
  return monthName
    .replace("Enero", "January")
    .replace("Febrero", "February")
    .replace("Marzo", "March")
    .replace("Abril", "April")
    .replace("Mayo", "May")
    .replace("Junio", "June")
    .replace("Julio", "July")
    .replace("Agosto", "August")
    .replace("Septiembre", "September")
    .replace("Octubre", "October")
    .replace("Noviembre", "November")
    .replace("Diciembre", "December");
}

interface ReplayStoriesPlayerProps {
  data: FullReplayResponse;
  onOpenAccountSwitcher: () => void;
  onChangeNarrator: (newNarrator: NarratorPersona, variationIndex?: number) => void;
  isSwitchingNarrator: boolean;
  lang?: SupportedLanguage;
  onLangChange?: (newLang: SupportedLanguage) => void;
}

const SLIDE_TITLES = [
  "1. Resumen & Diógenes",
  "2. Top 5 & Logros",
  "3. Racha & Calendario",
  "4. Horarios & Maratones",
  "5. Radar & Matchmaker",
  "6. Escuadrón Co-op Real",
  "7. Collector Poster",
];

export type PosterDownloadFormat = "bento_horizontal" | "stories_vertical" | "trading_card";

export default function ReplayStoriesPlayer({
  data,
  onOpenAccountSwitcher,
  onChangeNarrator,
  isSwitchingNarrator,
  lang: propLang,
  onLangChange,
}: ReplayStoriesPlayerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTopGameIdx, setSelectedTopGameIdx] = useState(0);
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(7); // Agosto 2026
  const [selectedFriendIdx, setSelectedFriendIdx] = useState<number>(0); // Night (#1 amigo real)
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Simulador interactivo de Diógenes (Slide 1)
  const [simulatedHoursPerDay, setSimulatedHoursPerDay] = useState(2);

  // Gestor de regalos/gratis en Amor vs Billetera (Slide 4)
  const [giftedAppIds, setGiftedAppIds] = useState<number[]>([]);

  // Formato de descarga en Slide 7 (Bento Horizontal, Stories Vertical, Trading Card)
  const [downloadFormat, setDownloadFormat] = useState<PosterDownloadFormat>("bento_horizontal");
  const [isSteamShareOpen, setIsSteamShareOpen] = useState(false);
  const [isVersusOpen, setIsVersusOpen] = useState(false);
  const [internalLang, setInternalLang] = useState<SupportedLanguage>("es");
  const lang = propLang ?? internalLang;
  const toggleLang = () => {
    const nextLang: SupportedLanguage = lang === "es" ? "en" : "es";
    if (onLangChange) {
      onLangChange(nextLang);
    } else {
      setInternalLang(nextLang);
    }
  };
  const hasPlayedAchievementSound = useRef(false);

  const t = TRANSLATIONS[lang];

  const posterBentoRef = useRef<HTMLDivElement>(null);
  const posterVerticalRef = useRef<HTMLDivElement>(null);
  const posterCardRef = useRef<HTMLDivElement>(null);

  const { analytics, commentary } = data;
  const {
    profile,
    officialStats,
    diogenes,
    monopoly,
    gamerCircadian,
    walletVsLove,
    graveyardAndPsychology,
    brokenPromises,
  } = analytics;

  // Reproducir el sonido oficial de Logros de Steam automáticamente al llegar al final
  useEffect(() => {
    if (currentSlide === t.slideTitles.length - 1) {
      if (!hasPlayedAchievementSound.current) {
        playSteamAchievementSound(0.75);
        hasPlayedAchievementSound.current = true;
      }
    } else {
      hasPlayedAchievementSound.current = false;
    }
  }, [currentSlide, t.slideTitles.length]);

  const activeNarratorConfig =
    NARRATOR_CONFIGS.find((n) => n.id === commentary.narrator) ||
    NARRATOR_CONFIGS[0];
  const localizedNarrator = getNarratorLocalized(commentary.narrator, lang);

  const inspectedTopGame =
    monopoly.top5Games[selectedTopGameIdx] || monopoly.topGame;

  const activeFriend =
    brokenPromises.squadFriends[selectedFriendIdx] ||
    brokenPromises.squadFriends[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => Math.min(SLIDE_TITLES.length - 1, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => Math.min(SLIDE_TITLES.length - 1, prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(0, prev - 1));

  // Descarga del Póster en el formato seleccionado (Horizontal, Vertical 9:16 o Trading Card)
  const handleDownloadPoster = async () => {
    let targetEl: HTMLElement | null = null;
    let fileName = `Steam-Replay-2026-${profile.personaName}`;

    if (downloadFormat === "stories_vertical") {
      targetEl = posterVerticalRef.current;
      fileName += "-Stories-Vertical.png";
    } else if (downloadFormat === "trading_card") {
      targetEl = posterCardRef.current;
      fileName += "-Trading-Card.png";
    } else {
      targetEl = posterBentoRef.current;
      fileName += "-Bento-Poster.png";
    }

    if (!targetEl) return;

    try {
      setIsDownloading(true);
      const dataUrl = await toPng(targetEl, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#090d14",
      });
      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error al generar imagen de póster:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyShareText = () => {
    const topYearHours = monopoly.topGame.hoursThisYear > 0 ? monopoly.topGame.hoursThisYear : monopoly.topGame.playtimeHours;
    const shareText = `🎮 STEAM REPLAY EVOLVED 2026 — ${profile.personaName}\n🏆 Título: "${commentary.finalCertificate.gamerTitle}"\n🔥 #1 Domado: ${monopoly.topGame.name} (${topYearHours}h)\n🤝 Dúo Co-op Sincronizado: ${activeFriend?.personaName} (${activeFriend?.compatibilityScore}% Sync)\n⚡ Racha Récord 2026: ${officialStats.longestStreakDays} días seguidos\n💀 Backlog sin abrir (0m): ${diogenes.unplayedCount}/${diogenes.totalGames} (${diogenes.unplayedPercentage}%)\n💬 "${commentary.finalCertificate.shareableOneLiner}"`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const renderNarratorIcon = (id: NarratorPersona) => {
    switch (id) {
      case "glados":
        return <Cpu className="w-4 h-4" />;
      case "roast_friend":
        return <Flame className="w-4 h-4" />;
      case "soccer_caster":
        return <Trophy className="w-4 h-4" />;
      case "psychologist":
        return <Brain className="w-4 h-4" />;
    }
  };

  const currentRoastText =
    lang === "en"
      ? getEnglishRoast(currentSlide, commentary.narrator, {
          personaName: profile.personaName,
          topGameName: monopoly.topGame.name,
          topHours:
            monopoly.topGame.hoursThisYear || monopoly.topGame.playtimeHours,
          secondGameName: monopoly.top5Games[1]?.name || "Second Game",
          secondHours:
            monopoly.top5Games[1]?.hoursThisYear ||
            monopoly.top5Games[1]?.playtimeHours ||
            0,
          unplayedCount: diogenes.unplayedCount,
          unplayedValue: diogenes.unplayedValueUsd,
          streakDays: officialStats.longestStreakDays,
          partnerName: activeFriend?.personaName || "Night",
          coopGameName:
            activeFriend?.syncedGamesPlayed[0]?.game.name || "Co-op",
          rageQuitGameName:
            graveyardAndPsychology.earlyDropGames[0]?.name || "Early Drop",
        })
      : currentSlide === 0
      ? commentary.slide1DiogenesRoast
      : currentSlide === 1
      ? commentary.slide2MonopolyRoast
      : currentSlide === 2
      ? commentary.slide3TimelineAndStreakRoast
      : currentSlide === 3
      ? commentary.slide4WalletRoast
      : currentSlide === 4
      ? commentary.slide5PsychologyAndDropsRoast
      : commentary.slide6CoopPromiseRoast;

  // Cálculo del simulador de Diógenes
  const simulatedYearsNeeded =
    Math.round(
      (diogenes.estimatedBacklogHours / (365 * simulatedHoursPerDay)) * 10
    ) / 10;

  // Filtrado de juegos de Amor vs Billetera excluyendo regalos
  const toggleGiftedGame = (appid: number) => {
    setGiftedAppIds((prev) =>
      prev.includes(appid) ? prev.filter((id) => id !== appid) : [...prev, appid]
    );
  };

  // Lista de juegos excluidos como regalos
  const giftedItems = walletVsLove.worstInvestmentsRanking.filter((item) =>
    giftedAppIds.includes(item.game.appid)
  );

  // Total ahorrado en regalos (capital no gastado de su bolsillo)
  const totalGiftedSavingsUsd = giftedItems.reduce(
    (acc, item) => acc + item.game.estimatedPriceUsd,
    0
  );

  // Lista filtrada viva de pisapapeles
  const filteredWorstInvestments = walletVsLove.worstInvestmentsRanking.filter(
    (item) => !giftedAppIds.includes(item.game.appid)
  );

  // Los 4 juegos que se muestran: cuando uno se marca como regalo, el siguiente entra inmediatamente
  const displayedWorstInvestments = filteredWorstInvestments.slice(0, 4);

  // Métricas financieras reactivas
  const effectiveDeadCapitalUsd = Math.max(
    0,
    walletVsLove.deadCapitalUsd - Math.round(totalGiftedSavingsUsd)
  );
  const effectiveLibraryValueUsd = Math.max(
    0,
    walletVsLove.estimatedTotalLibraryValueUsd - Math.round(totalGiftedSavingsUsd)
  );
  const effectiveActiveCapitalUsd = Math.max(
    0,
    effectiveLibraryValueUsd - effectiveDeadCapitalUsd
  );
  const effectiveCostPerHourUsd =
    Math.round(
      (effectiveLibraryValueUsd / Math.max(1, diogenes.totalHoursPlayed)) * 100
    ) / 100;

  return (
    <div className="relative w-full">
      <MovingGamesBackdrop games={officialStats.gamesPlayedThisYear} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-5">
        {/* Cabecera de Sesión Activa estilo Cliente de Steam */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 p-3.5 rounded-2xl bg-steam-darkest/90 backdrop-blur-xl border border-white/15 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.personaName}
                className="w-12 h-12 rounded-xl border-2 border-steam-neon shadow-[0_0_15px_rgba(26,159,255,0.4)]"
              />
              <span
                className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-steam-darkest absolute -bottom-1 -right-1"
                title="Sesión iniciada en Steam"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-steam-blue">
                  {t.activeSession} • {officialStats.currentYear}
                </span>
                {profile.isDemo && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {t.demoArchetype}
                  </span>
                )}
              </div>
              <h2 className="font-black text-white text-lg leading-tight">
                {profile.personaName}{" "}
                <span className="text-xs font-normal text-gray-300">
                  • {profile.accountAgeYears} {t.yearsOnSteam} •{" "}
                  {officialStats.gamesPlayedThisYear.length} {t.activeGamesThisYear}{" "}
                  {officialStats.currentYear}
                </span>
              </h2>
            </div>
          </div>

          {/* Selector de Narrador IA en Vivo */}
          <div className="flex flex-wrap items-center gap-1.5 bg-steam-navy/95 p-1.5 rounded-xl border border-white/15">
            <span className="text-[11px] text-gray-300 px-2 font-bold">
              {t.aiPersonality}
            </span>
            {NARRATOR_CONFIGS.map((n) => {
              const active = n.id === commentary.narrator;
              return (
                <button
                  key={n.id}
                  disabled={isSwitchingNarrator}
                  onClick={() => onChangeNarrator(n.id, 0)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    active
                      ? "bg-steam-neon text-slate-950 shadow-[0_0_12px_rgba(26,159,255,0.5)]"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {renderNarratorIcon(n.id)}
                  <span>{t.narratorNames[n.id]}</span>
                </button>
              );
            })}
          </div>

          {/* Duelo 1v1 y Botón de inspeccionar cuenta */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVersusOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-red-600/30 to-amber-600/30 hover:from-red-600/50 hover:to-amber-600/50 border border-red-500/40 text-red-200 text-xs font-bold shadow transition"
              title="Comparar estadísticas 1v1 contra cualquier amigo o cuenta externa de Steam"
            >
              <Swords className="w-3.5 h-3.5 text-red-400" />
              <span>{t.duel1v1}</span>
            </button>

            <button
              onClick={onOpenAccountSwitcher}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 border border-white/10 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t.inspectOtherAccount}
            </button>
          </div>
        </div>

        {/* Barras de progreso de las 7 Diapositivas */}
        <div className="grid grid-cols-7 gap-1.5 mb-5">
          {t.slideTitles.map((title, idx) => (
            <button
              key={title}
              onClick={() => setCurrentSlide(idx)}
              className="group text-left focus:outline-none"
            >
              <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden mb-1.5">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    idx < currentSlide
                      ? "w-full bg-steam-blue"
                      : idx === currentSlide
                      ? "w-full bg-steam-neon shadow-[0_0_10px_#1a9fff]"
                      : "w-0"
                }`}
              />
            </div>
            <span
              className={`hidden md:block text-[11px] truncate transition ${
                idx === currentSlide
                  ? "text-steam-blue font-extrabold"
                  : "text-gray-400 group-hover:text-gray-200"
              }`}
            >
              {title}
            </span>
          </button>
        ))}
      </div>

      {/* Escenario Principal */}
      <div className="steam-glass-heavy relative rounded-3xl p-5 md:p-8 min-h-[610px] flex flex-col justify-between shadow-2xl overflow-hidden">
        {isSwitchingNarrator && (
          <div className="absolute inset-0 z-30 bg-steam-darkest/85 backdrop-blur-sm flex items-center justify-center">
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-steam-navy border border-steam-blue/40 text-white font-semibold text-sm">
              <Sparkles className="w-5 h-5 text-steam-neon animate-spin" />
              Generando nuevo guion con la personalidad elegida...
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSlide}-${commentary.narrator}-${commentary.variationIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col justify-between"
          >
            {/* Banner del Narrador IA con Botón para rotar ángulo */}
            {currentSlide < 6 && (
              <div
                className="p-4 rounded-2xl mb-5 border-l-4 bg-black/55 border border-white/10 shadow-inner"
                style={{ borderLeftColor: activeNarratorConfig.accentColor }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span
                    className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5"
                    style={{ color: activeNarratorConfig.accentColor }}
                  >
                    {renderNarratorIcon(commentary.narrator)}
                    {localizedNarrator.name} —{" "}
                    <span className="text-gray-400 font-normal">
                      {localizedNarrator.subtitle}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      onChangeNarrator(
                        commentary.narrator,
                        (commentary.variationIndex || 0) + 1
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-steam-blue transition"
                    title={
                      lang === "es"
                        ? "Generar otro enfoque distinto con este mismo narrador"
                        : "Generate a different perspective with this narrator"
                    }
                  >
                    <Dices className="w-3.5 h-3.5" />
                    {lang === "es" ? "Otro Ángulo de IA" : "New AI Perspective"}
                  </button>
                </div>
                <p className="text-sm md:text-base text-gray-100 leading-relaxed">
                  “{currentRoastText}”
                </p>
              </div>
            )}

            {/* ==================== SLIDE 0: RESUMEN OFICIAL + SIMULADOR DE DIÓGENES ==================== */}
            {currentSlide === 0 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-steam-blue">
                    {t.diogenes.badge}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black text-white">
                    {t.diogenes.heading}
                  </h3>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-2xl bg-steam-darkest/85 border border-steam-blue/30">
                    <div className="flex items-center justify-between text-steam-blue mb-1">
                      <span className="text-[11px] font-bold uppercase">
                        {lang === "es" ? "Logros Desbloqueados en " : "Achievements Unlocked in "}
                        {officialStats.currentYear}
                      </span>
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="text-3xl font-black text-white">
                      {officialStats.totalAchievementsUnlocked}
                    </div>
                    <div className="text-[11px] text-amber-300 font-semibold mt-1">
                      {lang === "es"
                        ? `✨ ${officialStats.rareAchievementsUnlocked} logros raros (Mediana Steam: ${officialStats.steamMedianAchievements})`
                        : `✨ ${officialStats.rareAchievementsUnlocked} rare trophies (Steam Median: ${officialStats.steamMedianAchievements})`}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-steam-darkest/85 border border-steam-neon/30">
                    <div className="flex items-center justify-between text-steam-neon mb-1">
                      <span className="text-[11px] font-bold uppercase">
                        {lang === "es" ? "Juegos Jugados en " : "Games Played in "}
                        {officialStats.currentYear}
                      </span>
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                    <div className="text-3xl font-black text-white">
                      {officialStats.gamesPlayedThisYear.length}{" "}
                      <span className="text-sm font-normal text-gray-400">
                        {lang === "es"
                          ? `/ ${diogenes.totalGames} en tu biblioteca`
                          : `/ ${diogenes.totalGames} in your library`}
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-300 font-semibold mt-1">
                      {lang === "es"
                        ? `🔥 ${officialStats.gamesPlayedThisYear.length} activos en ${officialStats.currentYear} (Mediana global: ${officialStats.steamMedianGamesPlayed})`
                        : `🔥 ${officialStats.gamesPlayedThisYear.length} active in ${officialStats.currentYear} (Global median: ${officialStats.steamMedianGamesPlayed})`}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-steam-darkest/85 border border-red-500/30">
                    <div className="flex items-center justify-between text-red-400 mb-1">
                      <span className="text-[11px] font-bold uppercase">
                        {lang === "es" ? "Juegos Vírgenes (0 min)" : "Untouched Games (0 min)"}
                      </span>
                      <Skull className="w-4 h-4" />
                    </div>
                    <div className="text-3xl font-black text-red-400">
                      {diogenes.unplayedCount}{" "}
                      <span className="text-sm text-gray-300 font-bold">
                        ({diogenes.unplayedPercentage}%)
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-300 mt-1">
                      {lang === "es"
                        ? `~${diogenes.unplayedPercentage}% del total de tu cuenta nunca fueron iniciados`
                        : `~${diogenes.unplayedPercentage}% of your total library was never launched`}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-steam-darkest/85 border border-amber-500/30">
                    <div className="flex items-center justify-between text-amber-400 mb-1">
                      <span className="text-[11px] font-bold uppercase">
                        {lang === "es" ? "Deuda de Vida Total" : "Total Backlog Debt"}
                      </span>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="text-3xl font-black text-white">
                      {diogenes.estimatedBacklogHours}h
                    </div>
                    <div className="text-[11px] text-amber-300 mt-1 font-semibold">
                      {lang === "es"
                        ? "Horas requeridas para pasar todos tus pendientes"
                        : "Hours required to beat all untouched games"}
                    </div>
                  </div>
                </div>

                {/* Simulador Interactivo de Limpieza de Backlog */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-steam-navy via-steam-darkest to-steam-navy border border-steam-neon/40 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Sliders className="w-5 h-5 text-steam-neon" />
                      <div>
                        <h4 className="text-sm font-extrabold text-white">
                          {lang === "es"
                            ? "Simulador Interactivo de Limpieza de Backlog"
                            : "Interactive Backlog Clearance Simulator"}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {lang === "es"
                            ? `¿Cuánto tiempo tardarías en terminar tus ${diogenes.unplayedCount} juegos vírgenes sin comprar nada nuevo?`
                            : `How long would it take to complete your ${diogenes.unplayedCount} untouched games without buying anything new?`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 font-semibold">
                        {lang === "es" ? "Tiempo estimado necesario:" : "Estimated time needed:"}
                      </div>
                      <div className="text-2xl font-black text-steam-neon">
                        {simulatedYearsNeeded}{" "}
                        {lang === "es" ? "años" : "years"}{" "}
                        <span className="text-xs text-gray-300 font-normal">
                          ({Math.round(simulatedYearsNeeded * 12)}{" "}
                          {lang === "es" ? "meses" : "months"})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Slider de horas diarias */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs font-bold text-gray-300 mb-2">
                      <span>{lang === "es" ? "Dedicación diaria:" : "Daily commitment:"}</span>
                      <span className="text-steam-neon font-black">
                        {simulatedHoursPerDay}{" "}
                        {lang === "es"
                          ? "horas por día todos los días"
                          : "hours per day every day"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="1"
                      value={simulatedHoursPerDay}
                      onChange={(e) =>
                        setSimulatedHoursPerDay(Number(e.target.value))
                      }
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-steam-neon"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 font-semibold">
                      <span>1h ({lang === "es" ? "Casual" : "Casual"})</span>
                      <span>2h ({lang === "es" ? "Promedio" : "Average"})</span>
                      <span>4h ({lang === "es" ? "Gamer Firme" : "Dedicated Gamer"})</span>
                      <span>8h ({lang === "es" ? "Sin Trabajo ni Estudios" : "Full-time Gamer"})</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-steam-darkest/80 border border-white/10">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="flex items-center gap-1.5 text-steam-blue">
                        <MousePointer className="w-3.5 h-3.5" />
                        {lang === "es" ? "Teclado + Ratón" : "Keyboard + Mouse"} (
                        {officialStats.keyboardMousePercentage}%)
                      </span>
                      <span className="flex items-center gap-1.5 text-amber-400">
                        <Gamepad2 className="w-3.5 h-3.5" />
                        {lang === "es" ? "Mando / Controller" : "Controller"} (
                        {officialStats.controllerPercentage}%)
                      </span>
                    </div>
                    <div className="w-full h-3.5 rounded-full bg-amber-500/30 overflow-hidden flex">
                      <div
                        className="h-full bg-gradient-to-r from-steam-neon to-steam-blue"
                        style={{
                          width: `${officialStats.keyboardMousePercentage}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-steam-darkest/80 border border-white/10">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-emerald-400">
                        {lang === "es" ? "Aprovechados" : "Played"} ({100 - diogenes.unplayedPercentage}%)
                      </span>
                      <span className="text-red-400">
                        {lang === "es" ? "Vírgenes 0 min" : "Untouched 0m"} ({diogenes.unplayedPercentage}%)
                      </span>
                    </div>
                    <div className="w-full h-3.5 rounded-full bg-red-950/80 overflow-hidden flex">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-steam-blue"
                        style={{
                          width: `${Math.max(
                            5,
                            100 - diogenes.unplayedPercentage
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== SLIDE 1: TOP 5 + LOGROS + 3 BOTONES DE STEAM ==================== */}
            {currentSlide === 1 && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-steam-blue">
                    {t.top5.badge}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white">
                    {t.top5.heading}
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                  {/* Panel Izquierdo: Juego Seleccionado con los 3 Botones de Steam */}
                  <div className="lg:col-span-6 rounded-2xl overflow-hidden bg-steam-darkest border-2 border-steam-neon/60 shadow-2xl flex flex-col justify-between">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={inspectedTopGame.heroImage}
                        alt={inspectedTopGame.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = inspectedTopGame.headerImage;
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-steam-darkest via-transparent to-black/40" />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs font-black uppercase rounded-lg bg-steam-neon text-slate-950 shadow">
                          {lang === "es"
                            ? `Top #${selectedTopGameIdx + 1} de ${officialStats.currentYear}`
                            : `Top #${selectedTopGameIdx + 1} in ${officialStats.currentYear}`}
                        </span>
                        {inspectedTopGame.completionStatus === "MASTERED" && (
                          <span className="px-2.5 py-1 text-xs font-black uppercase rounded-lg bg-emerald-400 text-slate-950 shadow flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {lang === "es" ? "Campaña / DLC Domados" : "Campaign / DLC Mastered"}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          {inspectedTopGame.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-white/10 text-steam-blue"
                            >
                              {translateTag(t, lang)}
                            </span>
                          ))}
                        </div>
                        <h4 className="text-2xl font-black text-white">
                          {inspectedTopGame.name}
                        </h4>
                        <div className="flex flex-wrap items-baseline gap-4 mt-1">
                          <span className="text-3xl font-black text-steam-blue">
                            {inspectedTopGame.hoursThisYear > 0
                              ? lang === "es"
                                ? `${inspectedTopGame.hoursThisYear} horas en ${officialStats.currentYear}`
                                : `${inspectedTopGame.hoursThisYear} hours in ${officialStats.currentYear}`
                              : lang === "es"
                              ? `${inspectedTopGame.playtimeHours} horas`
                              : `${inspectedTopGame.playtimeHours} hours`}
                          </span>
                          {inspectedTopGame.hoursThisYear > 0 &&
                            inspectedTopGame.playtimeHours > inspectedTopGame.hoursThisYear && (
                              <span className="text-xs text-gray-400">
                                ({inspectedTopGame.playtimeHours}
                                {lang === "es" ? "h en toda tu historia" : "h all-time"})
                              </span>
                            )}
                          <span className="text-xs text-emerald-300 font-bold">
                            {lang === "es" ? "Costo amortizado: $" : "Amortized cost: $"}
                            {inspectedTopGame.costPerHourUsd} {lang === "es" ? "USD / hora" : "USD / hour"}
                          </span>
                        </div>
                      </div>

                      {/* Desglose de Logros o Detección de Juego sin logros (ej. R.E.P.O.) */}
                      {inspectedTopGame.achievementsTotal > 0 ? (
                        <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-200 font-bold flex items-center gap-1.5">
                              <Trophy className="w-4 h-4 text-amber-400" />
                              {lang === "es"
                                ? `Logros Desbloqueados en ${officialStats.currentYear}:`
                                : `Achievements Unlocked in ${officialStats.currentYear}:`}
                            </span>
                            <span className="font-black text-amber-300 text-sm">
                              +{inspectedTopGame.achievementsUnlockedThisYear ?? inspectedTopGame.achievementsUnlocked}{" "}
                              {lang === "es" ? "en el año" : "this year"}
                              <span className="text-gray-400 font-normal text-xs ml-1.5">
                                ({inspectedTopGame.achievementsUnlocked}/{inspectedTopGame.achievementsTotal} {lang === "es" ? "históricos" : "all-time"})
                              </span>
                            </span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-400 via-steam-neon to-emerald-400"
                              style={{
                                width: `${inspectedTopGame.achievementPercentage}%`,
                              }}
                            />
                          </div>
                          <div className="flex flex-wrap justify-between text-xs pt-1">
                            <span className="text-amber-300 font-semibold">
                              🌟 {inspectedTopGame.rareAchievementsCount}{" "}
                              {lang === "es" ? "logros raros (<10% global)" : "rare achievements (<10% global)"}
                            </span>
                            {inspectedTopGame.lastPlayedDateStr && (
                              <span className="text-gray-400">
                                {lang === "es" ? "Última sesión: " : "Last played: "}
                                <strong className="text-gray-200">
                                  {inspectedTopGame.lastPlayedDateStr}
                                </strong>
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-steam-navy/50 border border-steam-blue/30 flex items-center gap-3">
                          <Gamepad2 className="w-6 h-6 text-steam-blue shrink-0" />
                          <div>
                            <div className="text-xs font-black text-white">
                              {lang === "es"
                                ? "Juego sin sistema de logros en Steam"
                                : "Game without Steam achievements system"}
                            </div>
                            <div className="text-[11px] text-gray-300">
                              {lang === "es"
                                ? `«${inspectedTopGame.name}» está enfocado 100% en jugabilidad y supervivencia pura. Tus ${inspectedTopGame.hoursThisYear > 0 ? inspectedTopGame.hoursThisYear : inspectedTopGame.playtimeHours} horas son vicio genuino.`
                                : `«${inspectedTopGame.name}» is 100% focused on pure gameplay and survival. Your ${inspectedTopGame.hoursThisYear > 0 ? inspectedTopGame.hoursThisYear : inspectedTopGame.playtimeHours} hours are genuine dedication.`}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* LOS 3 BOTONES DE ACCIÓN DIRECTA EN STEAM */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/10">
                        {/* 1. Ver todos los logros */}
                        {inspectedTopGame.achievementsTotal > 0 ? (
                          <a
                            href={`https://steamcommunity.com/profiles/${profile.steamId}/stats/${inspectedTopGame.appid}/?tab=achievements`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition text-center shadow"
                          >
                            <Trophy className="w-3.5 h-3.5" />
                            {t.top5.viewAchievements}
                          </a>
                        ) : (
                          <button
                            disabled
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-500 text-xs font-bold flex items-center justify-center gap-1.5 cursor-not-allowed"
                          >
                            {t.top5.noAchievements}
                          </button>
                        )}

                        {/* 2. Página de la Tienda de Steam */}
                        <a
                          href={`https://store.steampowered.com/app/${inspectedTopGame.appid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-steam-blue/15 hover:bg-steam-blue/25 border border-steam-blue/40 text-steam-blue text-xs font-bold flex items-center justify-center gap-1.5 transition text-center shadow"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {t.top5.store}
                        </a>

                        {/* 3. Ver en mi Biblioteca de Steam (steam://) */}
                        <a
                          href={`steam://nav/games/details/${inspectedTopGame.appid}`}
                          className="p-2.5 rounded-xl bg-steam-neon/20 hover:bg-steam-neon/30 border border-steam-neon text-white text-xs font-black flex items-center justify-center gap-1.5 transition text-center shadow"
                          title={
                            lang === "es"
                              ? "Abre directamente el juego en tu aplicación de Steam de escritorio"
                              : "Opens the game directly in your desktop Steam client"
                          }
                        >
                          <Gamepad2 className="w-3.5 h-3.5 text-steam-neon" />
                          {t.top5.library}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Panel Derecho: Lista de los 5 Juegos */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-2.5">
                    {monopoly.top5Games.map((game, index) => {
                      const isSelected = index === selectedTopGameIdx;
                      const gameYearHours =
                        game.hoursThisYear > 0
                          ? game.hoursThisYear
                          : game.playtimeHours;
                      const topYearHours =
                        monopoly.topGame.hoursThisYear > 0
                          ? monopoly.topGame.hoursThisYear
                          : monopoly.topGame.playtimeHours;
                      const pct = Math.max(
                        10,
                        Math.round((gameYearHours / Math.max(1, topYearHours)) * 100)
                      );
                      return (
                        <button
                          key={game.appid}
                          type="button"
                          onClick={() => setSelectedTopGameIdx(index)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center gap-3.5 ${
                            isSelected
                              ? "bg-steam-navy border-steam-neon shadow-[0_0_20px_rgba(26,159,255,0.3)] scale-[1.01]"
                              : "bg-steam-darkest/80 border-white/10 hover:border-steam-blue/40"
                          }`}
                        >
                          <span
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                              isSelected
                                ? "bg-steam-neon text-slate-950"
                                : "bg-white/5 text-steam-blue"
                            }`}
                          >
                            #{index + 1}
                          </span>
                          <img
                            src={game.headerImage}
                            alt={game.name}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = game.heroImage;
                            }}
                            className="w-24 h-12 object-cover rounded-lg border border-white/10 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-black text-white text-sm truncate">
                                {game.name}
                              </span>
                              <span className="text-steam-blue font-black text-sm shrink-0">
                                {game.hoursThisYear > 0
                                  ? `${game.hoursThisYear}h`
                                  : `${game.playtimeHours}h`}
                              </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-1.5">
                              <div
                                className="h-full bg-gradient-to-r from-steam-neon to-steam-blue rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-gray-400">
                              {game.achievementsTotal > 0 ? (
                                <span className="text-amber-300 font-semibold">
                                  🏆 +{game.achievementsUnlockedThisYear ?? game.achievementsUnlocked}{" "}
                                  {lang === "es"
                                    ? `logros en ${officialStats.currentYear}`
                                    : `trophies in ${officialStats.currentYear}`}
                                </span>
                              ) : (
                                <span className="text-emerald-300 font-semibold">
                                  {lang === "es"
                                    ? "✓ Sin logros (Supervivencia)"
                                    : "✓ No achievements (Gameplay)"}
                                </span>
                              )}
                              <span className="text-steam-blue font-semibold">
                                {isSelected
                                  ? lang === "es"
                                    ? "● Seleccionado"
                                    : "● Selected"
                                  : lang === "es"
                                  ? "Inspeccionar →"
                                  : "Inspect →"}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== SLIDE 2: RACHA & CRONOLOGÍA 2026 (CARDS GRANDES) ==================== */}
            {currentSlide === 2 && (
              <div className="space-y-5">
                <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-steam-navy via-steam-darkest to-steam-navy border border-steam-neon/40 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-steam-neon/20 border border-steam-neon flex items-center justify-center text-steam-neon shadow-[0_0_20px_rgba(26,159,255,0.3)]">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold uppercase tracking-wider text-steam-blue">
                        {t.timeline.longestStreakDays} • {officialStats.currentYear}
                      </div>
                      <div className="text-2xl md:text-3xl font-black text-white">
                        {officialStats.longestStreakDays} {lang === "es" ? "días consecutivos jugando" : "consecutive days gaming"}
                      </div>
                      <p className="text-xs text-gray-300">
                        {lang === "es" ? "Del " : "From "}
                        <strong>{officialStats.streakStartDate}</strong>{" "}
                        {lang === "es" ? "al " : "to "}
                        <strong>{officialStats.streakEndDate}</strong> •{" "}
                        {lang === "es" ? "Juegos de la racha: " : "Streak games: "}
                        <strong className="text-steam-blue">
                          {officialStats.streakHighlightGames
                            .map((g) => g.name)
                            .join(" • ")}
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold text-emerald-300 mb-1.5">
                      {lang === "es"
                        ? `Registro de Sesiones • Agosto ${officialStats.currentYear}`
                        : `Session Log • August ${officialStats.currentYear}`}
                    </span>
                    <div className="grid grid-cols-10 gap-1">
                      {Array.from({ length: 30 }).map((_, idx) => {
                        const isStreak =
                          idx >= 2 && idx < 2 + officialStats.longestStreakDays;
                        return (
                          <div
                            key={idx}
                            className={`w-3.5 h-3.5 rounded-sm ${
                              isStreak
                                ? "bg-emerald-400 shadow-[0_0_6px_#34d399]"
                                : "bg-white/10"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-steam-blue" />
                      {lang === "es"
                        ? `Cronología Mensual ${officialStats.currentYear} (Enero a Octubre — Estrictamente Juegos de ${officialStats.currentYear})`
                        : `Monthly Timeline ${officialStats.currentYear} (January to October — Strictly ${officialStats.currentYear} Games)`}
                    </h4>
                    <span className="text-xs text-steam-blue font-semibold">
                      {lang === "es"
                        ? "Hacé clic en cualquier mes para ver los juegos de esa etapa"
                        : "Click any month to inspect active games during that period"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                    {officialStats.monthlyTimeline.map((m) => {
                      const isSelected = selectedMonthIdx === m.monthIndex;
                      return (
                        <button
                          key={m.monthShort}
                          type="button"
                          onClick={() => setSelectedMonthIdx(m.monthIndex)}
                          className={`group rounded-2xl overflow-hidden border text-left transition flex flex-col justify-between ${
                            isSelected
                              ? "border-steam-neon bg-steam-navy shadow-[0_0_20px_rgba(26,159,255,0.4)] scale-[1.02]"
                              : "border-white/15 bg-steam-darkest/85 hover:border-steam-blue/50"
                          }`}
                        >
                          <div className="relative h-24 w-full overflow-hidden">
                            <img
                              src={m.topGame.headerImage}
                              alt={m.topGame.name}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = m.topGame.heroImage;
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                            <span className="absolute top-2 left-2 px-2 py-0.5 text-[11px] font-black rounded-md bg-steam-neon text-slate-950 shadow">
                              {lang === "en" ? (MONTH_SHORT_EN[m.monthShort] || m.monthShort) : m.monthShort} {officialStats.currentYear}
                            </span>
                            <span className="absolute bottom-1.5 right-2 text-[11px] font-extrabold text-amber-300">
                              🏆 {m.achievementsInMonth}
                            </span>
                          </div>
                          <div className="p-3">
                            <div className="text-xs font-black text-white truncate">
                              {m.topGame.name}
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-gray-300 mt-1">
                              <span className="text-steam-blue font-bold">
                                ~{m.estimatedHoursInMonth}
                                {lang === "es" ? "h en el mes" : "h in month"}
                              </span>
                              {m.gamesCountInMonth > 1 && (
                                <span className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-gray-200">
                                  +{m.gamesCountInMonth - 1}{" "}
                                  {lang === "es" ? "más" : "more"}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {officialStats.monthlyTimeline[selectedMonthIdx] && (
                    <div className="mt-3.5 p-4 rounded-2xl bg-black/55 border border-steam-neon/40 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            officialStats.monthlyTimeline[selectedMonthIdx]
                              .topGame.headerImage
                          }
                          alt=""
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              officialStats.monthlyTimeline[selectedMonthIdx]
                                .topGame.heroImage;
                          }}
                          className="w-28 h-14 object-cover rounded-xl border border-steam-neon/40"
                        />
                        <div>
                          <div className="text-xs font-extrabold uppercase text-steam-neon">
                            {lang === "es" ? "Resumen de " : "Summary of "}
                            {translateMonthName(
                              officialStats.monthlyTimeline[selectedMonthIdx]
                                .monthName,
                              lang
                            )}
                          </div>
                          <div className="text-lg font-black text-white">
                            {lang === "es" ? "Juego Dominante: " : "Top Game: "}
                            {
                              officialStats.monthlyTimeline[selectedMonthIdx]
                                .topGame.name
                            }
                          </div>
                          <p className="text-xs text-gray-300">
                            {lang === "en"
                              ? (HIGHLIGHT_NOTES_EN[officialStats.monthlyTimeline[selectedMonthIdx].monthIndex] ||
                                 officialStats.monthlyTimeline[selectedMonthIdx].highlightNote)
                              : officialStats.monthlyTimeline[selectedMonthIdx].highlightNote}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-400 font-semibold">
                          {lang === "es" ? "Rotación de ese mes:" : "Monthly Rotation:"}
                        </span>
                        {officialStats.monthlyTimeline[
                          selectedMonthIdx
                        ].secondaryGames.map((sec) => (
                          <div
                            key={sec.appid}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10"
                          >
                            <img
                              src={sec.headerImage}
                              alt=""
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = sec.heroImage;
                              }}
                              className="w-10 h-5 object-cover rounded"
                            />
                            <span className="text-xs font-bold text-white">
                              {sec.name} ({sec.hoursThisYear > 0 ? `${sec.hoursThisYear}h` : `${sec.playtimeHours}h`})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ==================== SLIDE 3: CRONOBIOLOGÍA GAMER & SESIONES MARATÓNICAS ==================== */}
            {currentSlide === 3 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-steam-blue flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-steam-neon" />
                    {t.circadian.badge}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white">
                    {t.circadian.heading}
                  </h3>
                </div>

                {/* 4 KPIs Clave de Ritmo Gamer */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* KPI 1: Sesión Maratónica Récord */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/30 via-steam-darkest to-steam-darkest border border-amber-500/40">
                    <div className="text-[10px] font-bold uppercase text-amber-300 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      {lang === "es" ? "Sesión Maratón Récord" : "Record Marathon Session"}
                    </div>
                    <div className="text-2xl font-black text-white mt-0.5">
                      {analytics.gamerCircadian.marathonSession.durationHours}
                      {lang === "es" ? "h seguidas" : "h uninterrupted"}
                    </div>
                    <div className="text-[11px] text-amber-200 truncate mt-0.5">
                      {lang === "es" ? "En " : "In "}
                      {analytics.gamerCircadian.marathonSession.game.name}
                    </div>
                  </div>

                  {/* KPI 2: Día Más Viciado */}
                  <div className="p-3.5 rounded-2xl bg-steam-darkest/85 border border-steam-neon/40">
                    <div className="text-[10px] font-bold uppercase text-steam-neon flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      {lang === "es" ? "Día Más Intenso del Año" : "Most Intense Day of the Year"}
                    </div>
                    <div className="text-2xl font-black text-white mt-0.5">
                      {analytics.gamerCircadian.peakDayRecord.hours}{" "}
                      {lang === "es" ? "horas" : "hours"}
                    </div>
                    <div className="text-[11px] text-gray-300 mt-0.5">
                      {lang === "es" ? "El " : "On "}
                      {analytics.gamerCircadian.peakDayRecord.date}
                    </div>
                  </div>

                  {/* KPI 3: Club Vampiro */}
                  <div className="p-3.5 rounded-2xl bg-purple-950/25 border border-purple-500/40">
                    <div className="text-[10px] font-bold uppercase text-purple-300 flex items-center gap-1">
                      <Ghost className="w-3.5 h-3.5 text-purple-400" />
                      {lang === "es" ? "Club Vampiro (00h - 06h)" : "Vampire Club (12 AM - 6 AM)"}
                    </div>
                    <div className="text-2xl font-black text-purple-300 mt-0.5">
                      {analytics.gamerCircadian.timeOfDayDistribution.nightOwlPercent}%{" "}
                      {lang === "es" ? "de tus horas" : "of your hours"}
                    </div>
                    <div className="text-[11px] text-gray-300 mt-0.5">
                      {lang === "es" ? "Sesiones nocturnas de insomnio" : "Late-night insomnia sessions"}
                    </div>
                  </div>

                  {/* KPI 4: Fines de Semana */}
                  <div className="p-3.5 rounded-2xl bg-steam-darkest/85 border border-emerald-500/30">
                    <div className="text-[10px] font-bold uppercase text-emerald-300 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {lang === "es" ? "Fines de Semana vs. Semana" : "Weekends vs. Weekdays"}
                    </div>
                    <div className="text-2xl font-black text-emerald-400 mt-0.5">
                      {analytics.gamerCircadian.weekendVsWeekday.weekendPercent}%{" "}
                      {lang === "es" ? "Finde" : "Weekend"}
                    </div>
                    <div className="text-[11px] text-gray-300 mt-0.5">
                      {analytics.gamerCircadian.weekendVsWeekday.weekdayPercent}%{" "}
                      {lang === "es" ? "de Lunes a Viernes" : "Monday to Friday"}
                    </div>
                  </div>
                </div>

                {/* Mapa de Calor de 24 Horas */}
                <div className="p-4 rounded-2xl bg-steam-navy/60 border border-white/10 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase text-white tracking-wider flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-steam-blue" />
                      {lang === "es"
                        ? "Distribución Horaria de tus Sesiones (Ciclo de 24 Horas)"
                        : "Hourly Session Distribution (24-Hour Cycle)"}
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                      {translateDominantSchedule(analytics.gamerCircadian.dominantScheduleLabel, lang)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Mañana */}
                    <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20">
                      <div className="flex items-center justify-between text-xs text-amber-300 font-bold mb-1">
                        <span>🌅 {lang === "es" ? "Mañana" : "Morning"}</span>
                        <span>{analytics.gamerCircadian.timeOfDayDistribution.morningPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${analytics.gamerCircadian.timeOfDayDistribution.morningPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {lang === "es" ? "06:00 a 12:00 hs" : "06:00 to 12:00"}
                      </span>
                    </div>

                    {/* Tarde */}
                    <div className="p-3 rounded-xl bg-black/40 border border-steam-blue/20">
                      <div className="flex items-center justify-between text-xs text-steam-blue font-bold mb-1">
                        <span>☀️ {lang === "es" ? "Tarde" : "Afternoon"}</span>
                        <span>{analytics.gamerCircadian.timeOfDayDistribution.afternoonPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                        <div
                          className="h-full bg-steam-blue rounded-full"
                          style={{ width: `${analytics.gamerCircadian.timeOfDayDistribution.afternoonPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {lang === "es" ? "12:00 a 18:00 hs" : "12:00 to 18:00"}
                      </span>
                    </div>

                    {/* Prime Time */}
                    <div className="p-3 rounded-xl bg-black/40 border border-steam-neon/20">
                      <div className="flex items-center justify-between text-xs text-steam-neon font-bold mb-1">
                        <span>🌙 Prime Time</span>
                        <span>{analytics.gamerCircadian.timeOfDayDistribution.primeTimePercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                        <div
                          className="h-full bg-steam-neon rounded-full"
                          style={{ width: `${analytics.gamerCircadian.timeOfDayDistribution.primeTimePercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {lang === "es" ? "18:00 a 00:00 hs" : "18:00 to 00:00"}
                      </span>
                    </div>

                    {/* Madrugada */}
                    <div className="p-3 rounded-xl bg-black/40 border border-purple-500/30">
                      <div className="flex items-center justify-between text-xs text-purple-300 font-bold mb-1">
                        <span>🦇 {lang === "es" ? "Madrugada" : "Late Night"}</span>
                        <span>{analytics.gamerCircadian.timeOfDayDistribution.nightOwlPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${analytics.gamerCircadian.timeOfDayDistribution.nightOwlPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {lang === "es" ? "00:00 a 06:00 hs" : "00:00 to 06:00"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dos Bloques: Maratón Legendaria & Compañero de Madrugadas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Bloque Maratón */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/20 to-steam-navy border border-amber-500/40 flex items-center gap-4">
                    <img
                      src={analytics.gamerCircadian.marathonSession.game.headerImage}
                      alt=""
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = analytics.gamerCircadian.marathonSession.game.heroImage;
                      }}
                      className="w-28 h-16 object-cover rounded-xl border border-amber-400/30 shadow-lg shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-black tracking-wider text-amber-300">
                        {lang === "es" ? "★ Hazaña de Resistencia Humana" : "★ Feat of Human Endurance"}
                      </div>
                      <h4 className="text-base font-black text-white truncate">
                        {analytics.gamerCircadian.marathonSession.game.name}
                      </h4>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {translateMarathonDescription(
                          analytics.gamerCircadian.marathonSession.description,
                          analytics.gamerCircadian.marathonSession.durationHours,
                          analytics.gamerCircadian.marathonSession.game.name,
                          lang
                        )}
                      </p>
                      <div className="text-[11px] text-amber-200 mt-1 font-semibold">
                        {lang === "es" ? "Logrado el " : "Achieved on "}
                        {translateMarathonDate(analytics.gamerCircadian.marathonSession.dateAchieved, lang)}
                      </div>
                    </div>
                  </div>

                  {/* Bloque Compañero de Madrugadas */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/25 to-steam-navy border border-purple-500/35 flex items-center gap-4">
                    <img
                      src={analytics.gamerCircadian.mostPlayedNightGame.headerImage}
                      alt=""
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = analytics.gamerCircadian.mostPlayedNightGame.heroImage;
                      }}
                      className="w-28 h-16 object-cover rounded-xl border border-purple-400/30 shadow-lg shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-black tracking-wider text-purple-300">
                        {lang === "es" ? "🦇 Tu Compañero del Club Vampiro" : "🦇 Your Vampire Club Companion"}
                      </div>
                      <h4 className="text-base font-black text-white truncate">
                        {analytics.gamerCircadian.mostPlayedNightGame.name}
                      </h4>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {lang === "es"
                          ? "El juego en el que más perdiste la noción del tiempo entre la medianoche y el amanecer."
                          : "The game where you lost all sense of time between midnight and dawn."}
                      </p>
                      <div className="text-[11px] text-purple-200 mt-1 font-semibold">
                        {lang === "es"
                          ? `Constancia: ${analytics.gamerCircadian.averageSessionHours}h promedio por sesión en ${analytics.gamerCircadian.activeGamingDaysCount} días activos`
                          : `Pacing: ${analytics.gamerCircadian.averageSessionHours}h avg per session across ${analytics.gamerCircadian.activeGamingDaysCount} active days`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== SLIDE 4: RADAR & MATCHMAKER ==================== */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-5 p-4 rounded-2xl bg-steam-darkest/85 border border-white/10 flex flex-col items-center">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-steam-blue mb-1">
                    {lang === "es" ? "ADN de Géneros vs. Media de Steam" : "Genre DNA vs. Steam Average"}
                  </div>
                  <SteamRadarChart
                    axes={officialStats.radarAxes}
                    accentColor={activeNarratorConfig.accentColor}
                    size={255}
                    lang={lang}
                  />
                </div>

                <div className="lg:col-span-7 space-y-3.5">
                  <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                    <div className="flex items-center gap-2 text-emerald-300 text-xs font-extrabold uppercase mb-2">
                      <ShieldCheck className="w-4 h-4" />
                      {lang === "es"
                        ? "Obras Domadas (Campaña Principal & DLC Completados)"
                        : "Mastered Games (Main Campaign & DLC Completed)"}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {graveyardAndPsychology.masteredGames.map((g) => (
                        <div
                          key={g.appid}
                          className="p-2 rounded-xl bg-black/45 flex items-center gap-2.5 border border-white/5"
                        >
                          <img
                            src={g.headerImage}
                            alt={g.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = g.heroImage;
                            }}
                            className="w-14 h-8 object-cover rounded"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate">
                              {g.name}
                            </div>
                            <div className="text-[10px] text-emerald-300 font-semibold">
                              {g.playtimeHours}h • 🏆 {g.achievementsUnlocked}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-red-950/25 border border-red-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2 text-red-300 text-xs font-extrabold uppercase">
                        <Ghost className="w-4 h-4" />
                        {lang === "es"
                          ? "Fugas Tempranas (“Lo abrí un ratito y no volví más”)"
                          : "Early Drops (“Played for a bit and never touched again”)"}
                      </span>
                      {graveyardAndPsychology.rageQuitGem && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-500/20 text-red-300">
                          {lang === "es" ? "Rage Quit: " : "Rage Quit: "}
                          {graveyardAndPsychology.rageQuitGem.name} (
                          {graveyardAndPsychology.rageQuitGem.playtimeMinutes}m)
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {graveyardAndPsychology.earlyDropGames.map((g) => (
                        <div
                          key={g.appid}
                          className="p-2 rounded-xl bg-black/45 flex items-center gap-2.5 border border-white/5"
                        >
                          <img
                            src={g.headerImage}
                            alt={g.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = g.heroImage;
                            }}
                            className="w-14 h-8 object-cover rounded grayscale"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate">
                              {g.name}
                            </div>
                            <div className="text-[10px] text-red-300 font-semibold">
                              {lang === "es"
                                ? `Abierto solo ${g.playtimeMinutes} minutos`
                                : `Played only ${g.playtimeMinutes} minutes`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {graveyardAndPsychology.backlogMatchmakerGem && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-steam-navy to-steam-darkest border border-steam-neon/50 flex items-center gap-3.5">
                      <img
                        src={
                          graveyardAndPsychology.backlogMatchmakerGem.game
                            .headerImage
                        }
                        alt=""
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            graveyardAndPsychology.backlogMatchmakerGem?.game
                              .heroImage || "";
                        }}
                        className="w-24 h-12 object-cover rounded-lg border border-steam-neon/40 shrink-0"
                      />
                      <div>
                        <div className="text-[10px] font-extrabold uppercase text-steam-neon flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5" />
                          {lang === "es"
                            ? "Backlog Matchmaker • ¡Ya lo tenés comprado a 0 min!"
                            : "Backlog Matchmaker • Already owned at 0 minutes!"}
                        </div>
                        <div className="text-sm font-black text-white">
                          {lang === "es" ? "Deberías instalar hoy: " : "You should install today: "}
                          {
                            graveyardAndPsychology.backlogMatchmakerGem.game
                              .name
                          }
                        </div>
                        <p className="text-[11px] text-gray-300">
                          {lang === "es"
                            ? graveyardAndPsychology.backlogMatchmakerGem.reason
                            : `Already purchased in your library at 0 minutes. Since you loved ${monopoly.topGame.name} and Metro Exodus, this title has a 94% match with your Survival and Action DNA.`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ==================== SLIDE 5: ESCUADRÓN CO-OP REAL ==================== */}
            {currentSlide === 5 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-steam-blue">
                      {t.coop.badge}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white">
                      {t.coop.heading}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {brokenPromises.squadFriends.map((friend, idx) => {
                      const isSelected = idx === selectedFriendIdx;
                      return (
                        <button
                          key={friend.steamId}
                          type="button"
                          onClick={() => setSelectedFriendIdx(idx)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                            isSelected
                              ? "bg-steam-neon text-slate-950 border-steam-neon shadow-[0_0_15px_rgba(26,159,255,0.4)]"
                              : "bg-steam-darkest/80 text-gray-200 border-white/15 hover:border-steam-blue"
                          }`}
                        >
                          <img
                            src={friend.avatarUrl}
                            alt={friend.personaName}
                            className="w-5 h-5 rounded-full"
                          />
                          <span>{friend.personaName}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded ${
                              isSelected
                                ? "bg-black/20 text-slate-950"
                                : "bg-white/10 text-steam-blue"
                            }`}
                          >
                            {friend.compatibilityScore}% Sync
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {activeFriend && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-7 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={activeFriend.avatarUrl}
                            alt={activeFriend.personaName}
                            className="w-11 h-11 rounded-xl border-2 border-emerald-400"
                          />
                          <div>
                            <div className="text-[10px] font-extrabold uppercase text-emerald-300">
                              {translateRoleTitle(activeFriend.roleTitle, lang)}
                            </div>
                            <h4 className="text-lg font-black text-white">
                              {lang === "es"
                                ? `Horas Sincronizadas con ${activeFriend.personaName}`
                                : `Synchronized Hours with ${activeFriend.personaName}`}
                            </h4>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-black">
                          {activeFriend.compatibilityScore}% {lang === "es" ? "Coincidencia" : "Synergy"}
                        </span>
                      </div>

                      {activeFriend.syncedGamesPlayed.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {activeFriend.syncedGamesPlayed.map((match) => (
                            <div
                              key={match.game.appid}
                              className="p-2.5 rounded-xl bg-black/50 border border-emerald-500/20 flex items-center gap-2.5"
                            >
                              <img
                                src={match.game.headerImage}
                                alt=""
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = match.game.heroImage;
                                }}
                                className="w-16 h-9 object-cover rounded shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-black text-white truncate">
                                  {match.game.name}
                                </div>
                                <div className="text-[11px] text-emerald-300 font-semibold">
                                  {lang === "es" ? "Vos: " : "You: "}{match.myHours}h • {activeFriend.personaName}: {match.friendHours}h
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-black/40 text-xs text-gray-300">
                          {lang === "es" ? (
                            <>
                              El algoritmo verificó ambas bibliotecas y confirmó que vos y{" "}
                              <strong className="text-white">{activeFriend.personaName}</strong>{" "}
                              tienen <strong>0 horas de Co-op sincronizadas</strong>.
                            </>
                          ) : (
                            <>
                              Algorithm verified both libraries and confirmed you and{" "}
                              <strong className="text-white">{activeFriend.personaName}</strong>{" "}
                              share <strong>0 synchronized co-op hours</strong>.
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-5 p-4 rounded-2xl bg-red-950/25 border border-red-500/35 space-y-3">
                      <div className="flex items-center gap-2 text-red-300 text-xs font-extrabold uppercase">
                        <Users className="w-4 h-4" />
                        {lang === "es"
                          ? "Juegos que AMBOS tienen comprados pero no jugaron juntos:"
                          : "Games you BOTH own but never played together:"}
                      </div>

                      <div className="space-y-2.5">
                        {activeFriend.brokenPromisesTogether.length > 0 ? (
                          activeFriend.brokenPromisesTogether.map((bp) => (
                            <div
                              key={bp.game.appid}
                              className="p-2.5 rounded-xl bg-black/50 border border-red-500/20 flex items-center gap-3"
                            >
                              <img
                                src={bp.game.headerImage}
                                alt=""
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    bp.game.heroImage;
                                }}
                                className="w-16 h-9 object-cover rounded shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="text-xs font-black text-white truncate">
                                  {bp.game.name}
                                </div>
                                <div className="text-[11px] text-red-300">
                                  {bp.whoLeftWhoHanging}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400 text-center">
                            {lang === "es"
                              ? "No hay juegos cooperativos abandonados entre ustedes. ¡Sincronización impecable!"
                              : "No abandoned co-op games found between you two. Flawless synchronization!"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==================== SLIDE 6: PÓSTER COLECTOR 2026 + 3 FORMATOS + MODAL DE STEAM ==================== */}
            {currentSlide === 6 && (
              <div className="space-y-4">
                {/* Barra de Controles de Descarga y Compartir */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/60 border border-white/10">
                  {/* Selector de 3 Formatos de Descarga */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-300 mr-1">
                      {t.poster.chooseFormat}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDownloadFormat("bento_horizontal")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        downloadFormat === "bento_horizontal"
                          ? "bg-steam-neon text-slate-950 shadow"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      {t.formats.bentoHorizontal}
                    </button>

                    <button
                      type="button"
                      onClick={() => setDownloadFormat("stories_vertical")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        downloadFormat === "stories_vertical"
                          ? "bg-steam-neon text-slate-950 shadow"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      {t.formats.storiesVertical}
                    </button>

                    <button
                      type="button"
                      onClick={() => setDownloadFormat("trading_card")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        downloadFormat === "trading_card"
                          ? "bg-steam-neon text-slate-950 shadow"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      {t.formats.tradingCard}
                    </button>
                  </div>

                  {/* Botones de Compartir en Steam y Descargar */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSteamShareOpen(true)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#213247] hover:bg-[#2a405a] border border-steam-blue/40 text-steam-blue text-xs font-bold shadow transition"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      {t.shareOnSteam}
                    </button>

                    <button
                      onClick={handleCopyShareText}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          {t.copied}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          {t.copyText}
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDownloadPoster}
                      disabled={isDownloading}
                      className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-steam-neon via-steam-blue to-emerald-400 hover:opacity-95 text-slate-950 text-xs font-black shadow-[0_0_25px_rgba(26,159,255,0.5)] transition"
                    >
                      <Download className="w-4 h-4" />
                      {isDownloading ? t.rendering : t.downloadPng}
                    </button>
                  </div>
                </div>

                {/* FORMATO 1: BENTO HORIZONTAL COMPLETO (Renderizado por defecto) */}
                {downloadFormat === "bento_horizontal" && (
                  <div
                    ref={posterBentoRef}
                    className="rounded-3xl overflow-hidden bg-[#090d14] border-2 border-steam-neon/70 shadow-[0_0_60px_rgba(26,159,255,0.28)] relative p-5 md:p-6 space-y-4"
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-white/15 h-36">
                      <img
                        src={monopoly.topGame.heroImage}
                        alt=""
                        crossOrigin="anonymous"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            monopoly.topGame.headerImage;
                        }}
                        className="w-full h-full object-cover object-center brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#090d14] via-[#090d14]/75 to-transparent" />

                      <div className="absolute inset-0 p-4 md:p-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={profile.avatarUrl}
                              alt=""
                              crossOrigin="anonymous"
                              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 border-steam-neon shadow-2xl"
                            />
                            <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-steam-neon text-slate-950 absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap shadow">
                              {profile.accountAgeYears} {lang === "es" ? "AÑOS" : "YEARS"}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-steam-neon">
                                ★ STEAM REPLAY {officialStats.currentYear} • COLLECTOR BENTO
                              </span>
                            </div>
                            <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                              {profile.personaName}
                            </h4>
                            <div className="text-xs font-extrabold text-amber-300 mt-0.5">
                              «{translateGamerTitle(commentary.finalCertificate.gamerTitle, lang)}»
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className="px-3 py-2 rounded-xl bg-black/80 border border-steam-blue/40 text-center">
                            <div className="text-[9px] uppercase text-gray-400 font-bold">
                              {lang === "es" ? "Horas " : "Hours "} {officialStats.currentYear}
                            </div>
                            <div className="text-base font-black text-white">
                              {officialStats.totalHoursThisYear}h
                            </div>
                          </div>
                          <div className="px-3 py-2 rounded-xl bg-black/80 border border-amber-400/40 text-center">
                            <div className="text-[9px] uppercase text-gray-400 font-bold">
                              {lang === "es" ? "Logros" : "Achievements"}
                            </div>
                            <div className="text-base font-black text-amber-300">
                              🏆 {officialStats.totalAchievementsUnlocked}
                            </div>
                          </div>
                          <div className="px-3 py-2 rounded-xl bg-black/80 border border-emerald-400/40 text-center">
                            <div className="text-[9px] uppercase text-gray-400 font-bold">
                              {lang === "es" ? "Racha " : "Streak "} {officialStats.currentYear}
                            </div>
                            <div className="text-base font-black text-emerald-400">
                              ⚡ {officialStats.longestStreakDays}d
                            </div>
                          </div>
                          <div className="px-3 py-2 rounded-xl bg-black/80 border border-red-400/40 text-center">
                            <div className="text-[9px] uppercase text-gray-400 font-bold">
                              {lang === "es" ? "Sin Abrir (0m)" : "Untouched (0m)"}
                            </div>
                            <div className="text-base font-black text-red-400">
                              💀 {diogenes.unplayedPercentage}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                      <div className="lg:col-span-7 p-3.5 rounded-2xl bg-[#111924] border border-white/10 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-steam-blue">
                            {lang === "es"
                              ? "Panteón de Vicio Consagrado (Horas & Logros)"
                              : "Pantheon of Gaming Glory (Hours & Trophies)"}
                          </span>
                          <span className="text-[10px] text-emerald-300 font-bold">
                            {lang === "es" ? "✓ Campañas Domadas" : "✓ Campaigns Conquered"}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2.5">
                          {monopoly.top5Games.slice(0, 4).map((g, i) => (
                            <div
                              key={g.appid}
                              className="rounded-xl overflow-hidden bg-black/60 border border-white/15 relative"
                            >
                              <div className="relative h-36 w-full">
                                <img
                                  src={g.verticalCover}
                                  alt={g.name}
                                  crossOrigin="anonymous"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      g.headerImage;
                                  }}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-steam-neon text-slate-950 font-black text-[10px]">
                                  #{i + 1}
                                </span>
                                <div className="absolute bottom-1.5 left-1.5 right-1.5">
                                  <div className="text-[11px] font-black text-white truncate">
                                    {g.name}
                                  </div>
                                  <div className="flex items-center justify-between text-[10px] mt-0.5">
                                    <span className="text-steam-blue font-extrabold">
                                      {g.hoursThisYear > 0 ? `${g.hoursThisYear}h` : `${g.playtimeHours}h`}
                                    </span>
                                    <span className="text-amber-300 font-bold">
                                      🏆+{g.achievementsUnlockedThisYear ?? g.achievementsUnlocked}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-2xl bg-[#111924] border border-white/10 flex flex-col items-center justify-center">
                          <span className="text-[9px] font-extrabold uppercase text-steam-blue mb-1">
                            {lang === "es" ? "ADN de Géneros" : "Genre DNA"}
                          </span>
                          <SteamRadarChart
                            axes={officialStats.radarAxes}
                            accentColor={activeNarratorConfig.accentColor}
                            size={135}
                            compact
                            lang={lang}
                          />
                          <span className="text-[10px] font-bold text-white text-center truncate w-full mt-1">
                            {lang === "es" ? "Supervivencia & Co-op" : "Survival & Co-op"}
                          </span>
                        </div>

                        <div className="flex flex-col justify-between space-y-2.5">
                          <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                            <div className="text-[9px] uppercase text-emerald-300 font-bold">
                              {lang === "es" ? "Socio Co-op #1 Real" : "#1 True Co-op Partner"}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {activeFriend && (
                                <img
                                  src={activeFriend.avatarUrl}
                                  alt=""
                                  crossOrigin="anonymous"
                                  className="w-6 h-6 rounded-full border border-emerald-400"
                                />
                              )}
                              <div className="min-w-0">
                                <div className="text-xs font-black text-white truncate">
                                  {activeFriend?.personaName || "Night"}
                                </div>
                                <div className="text-[10px] text-emerald-300 font-bold">
                                  {activeFriend?.compatibilityScore || 99}% Sync
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-steam-navy/60 border border-steam-blue/30">
                            <div className="text-[9px] uppercase text-steam-blue font-bold">
                              {lang === "es" ? "🔥 Sesión Maratónica" : "🔥 Marathon Session"}
                            </div>
                            <div className="text-xs font-black text-white truncate mt-0.5">
                              {gamerCircadian.marathonSession.game.name}
                            </div>
                            <div className="text-[10px] text-emerald-300 font-bold">
                              {gamerCircadian.marathonSession.durationHours}
                              {lang === "es" ? "h seguidas sin pausa" : "h uninterrupted"}
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30">
                            <div className="text-[9px] uppercase text-purple-300 font-bold">
                              {lang === "es" ? "🦇 Club Vampiro (00h-06h)" : "🦇 Vampire Club (12am-6am)"}
                            </div>
                            <div className="text-xs font-black text-white truncate mt-0.5">
                              {gamerCircadian.timeOfDayDistribution.nightOwlPercent}%{" "}
                              {lang === "es" ? "actividad nocturna" : "night owl share"}
                            </div>
                            <div className="text-[10px] text-purple-300 font-bold">
                              {lang === "es" ? "Favorito: " : "Favorite: "}
                              {gamerCircadian.mostPlayedNightGame?.name || gamerCircadian.marathonSession.game.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#111924] border border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex-1 min-w-[260px]">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[10px] font-black uppercase tracking-wider"
                            style={{ color: activeNarratorConfig.accentColor }}
                          >
                            {lang === "es" ? "Veredicto Final • " : "Final Verdict • "}
                            {localizedNarrator.name}:
                          </span>
                        </div>
                        <p className="text-xs font-bold text-gray-100 italic">
                          “{translateShareableOneLiner(commentary.finalCertificate.shareableOneLiner, lang)}”
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {officialStats.monthlyTimeline.slice(0, 6).map((m) => (
                          <div
                            key={m.monthShort}
                            className="w-12 rounded-lg overflow-hidden bg-black border border-white/10 text-center"
                          >
                            <img
                              src={m.topGame.headerImage}
                              alt=""
                              crossOrigin="anonymous"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = m.topGame.heroImage;
                              }}
                              className="w-full h-6 object-cover"
                            />
                            <div className="text-[8px] font-black text-steam-blue py-0.5">
                              {lang === "en" ? (MONTH_SHORT_EN[m.monthShort] || m.monthShort) : m.monthShort}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* FORMATO 2: HISTORIAS / CELULAR (9:16 VERTICAL PARA TIKTOK / INSTAGRAM STORIES) */}
                {downloadFormat === "stories_vertical" && (
                  <div className="flex justify-center">
                    <div
                      ref={posterVerticalRef}
                      className="w-full max-w-[420px] rounded-3xl overflow-hidden bg-[#070b12] border-2 border-steam-neon/80 shadow-[0_0_60px_rgba(26,159,255,0.35)] relative p-5 sm:p-6 flex flex-col justify-between space-y-4"
                      style={{ minHeight: "720px" }}
                    >
                      {/* Fondo cinematográfico ambiental */}
                      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                        <img
                          src={monopoly.topGame.heroImage}
                          alt=""
                          crossOrigin="anonymous"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              monopoly.topGame.headerImage;
                          }}
                          className="w-full h-full object-cover opacity-20 blur-sm scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#070b12]/95 via-[#0b1420]/85 to-[#070b12]" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-steam-neon/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                      </div>

                      <div className="relative z-10 space-y-4">
                        {/* Cabecera Superior: Logo Steam Replay + Racha */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-steam-neon animate-pulse shadow-[0_0_8px_#1a9fff]" />
                            <span className="text-[11px] font-black uppercase text-steam-neon tracking-wider">
                              STEAM REPLAY {officialStats.currentYear}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black tracking-wide flex items-center gap-1">
                            <Zap className="w-3 h-3 text-emerald-400" />
                            {officialStats.longestStreakDays} {lang === "es" ? "DÍAS RACHA" : "DAYS STREAK"}
                          </span>
                        </div>

                        {/* Identidad del Jugador */}
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            <img
                              src={profile.avatarUrl}
                              alt=""
                              crossOrigin="anonymous"
                              className="w-14 h-14 rounded-2xl border-2 border-steam-neon shadow-lg object-cover"
                            />
                            <span className="px-1.5 py-0.5 rounded bg-steam-neon text-slate-950 font-black text-[8px] uppercase absolute -bottom-1.5 left-1/2 -translate-x-1/2 shadow">
                              {profile.accountAgeYears}{lang === "es" ? "A" : "Y"}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xl font-black text-white truncate leading-tight">
                              {profile.personaName}
                            </h4>
                            <div className="text-xs font-bold text-amber-300 truncate">
                              «{translateGamerTitle(commentary.finalCertificate.gamerTitle, lang)}»
                            </div>
                            <div className="text-[10px] text-gray-400 mt-0.5">
                              {officialStats.gamesPlayedThisYear.length} {lang === "es" ? "juegos activos en " : "active games in "} {officialStats.currentYear}
                            </div>
                          </div>
                        </div>

                        {/* Podio Top 3 Juegos */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-steam-blue tracking-wider">
                            <span>{lang === "es" ? "Podio de Juegos " : "Game Podium "} {officialStats.currentYear}</span>
                            <span className="text-gray-400">{lang === "es" ? "Horas & Logros" : "Hours & Trophies"}</span>
                          </div>

                          {/* #1 Campeón Absoluto */}
                          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-steam-navy/90 to-steam-darkest border-2 border-amber-400/60 shadow-lg p-2.5 flex items-center gap-3">
                            <div className="relative shrink-0">
                              <img
                                src={monopoly.topGame.verticalCover}
                                alt={monopoly.topGame.name}
                                crossOrigin="anonymous"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    monopoly.topGame.headerImage;
                                }}
                                className="w-16 h-22 object-cover rounded-xl shadow border border-white/10"
                              />
                              <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow">
                                1
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[10px] font-extrabold uppercase text-amber-300">
                                {lang === "es" ? "★ Incondicional #1" : "★ #1 Mainstay"}
                              </div>
                              <div className="text-sm font-black text-white truncate">
                                {monopoly.topGame.name}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-black text-steam-neon">
                                  {monopoly.topGame.hoursThisYear > 0 ? `${monopoly.topGame.hoursThisYear}h` : `${monopoly.topGame.playtimeHours}h`}
                                </span>
                                <span className="text-gray-500">•</span>
                                {monopoly.topGame.achievementsTotal > 0 ? (
                                  <span className="text-xs font-bold text-amber-300">
                                    🏆 +{monopoly.topGame.achievementsUnlockedThisYear ?? monopoly.topGame.achievementsUnlocked}{" "}
                                    {lang === "es" ? "este año" : "this year"}
                                  </span>
                                ) : (
                                  <span className="text-xs font-bold text-emerald-300">
                                    {lang === "es" ? "✓ Supervivencia" : "✓ Gameplay"}
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-gray-400 truncate mt-0.5">
                                {monopoly.topGame.tags.slice(0, 2).map((tg) => translateTag(tg, lang)).join(" • ")}
                              </div>
                            </div>
                          </div>

                          {/* #2 y #3 en Fila Paralela */}
                          <div className="grid grid-cols-2 gap-2">
                            {monopoly.top5Games.slice(1, 3).map((game, idx) => (
                              <div
                                key={game.appid}
                                className="rounded-xl bg-black/60 border border-white/10 p-2 flex items-center gap-2"
                              >
                                <div className="relative shrink-0">
                                  <img
                                    src={game.verticalCover}
                                    alt={game.name}
                                    crossOrigin="anonymous"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        game.headerImage;
                                    }}
                                    className="w-11 h-15 object-cover rounded-lg border border-white/10"
                                  />
                                  <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-steam-blue text-slate-950 font-black text-[9px] flex items-center justify-center">
                                    {idx + 2}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-black text-white truncate">
                                    {game.name}
                                  </div>
                                  <div className="text-[11px] font-black text-steam-blue">
                                    {game.hoursThisYear > 0 ? `${game.hoursThisYear}h` : `${game.playtimeHours}h`}
                                  </div>
                                  <div className="text-[9px] text-gray-400 truncate">
                                    {game.achievementsTotal > 0
                                      ? `🏆 +${game.achievementsUnlockedThisYear ?? game.achievementsUnlocked}`
                                      : "✓ Co-op"}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bento Highlights 2x2 */}
                        <div className="grid grid-cols-2 gap-2 text-left">
                          <div className="p-2.5 rounded-2xl bg-black/60 border border-amber-500/30">
                            <div className="text-[9px] font-bold uppercase text-amber-300 flex items-center gap-1">
                              <Trophy className="w-3 h-3 text-amber-400" />
                              {lang === "es" ? "Logros" : "Achievements"} {officialStats.currentYear}
                            </div>
                            <div className="text-lg font-black text-white mt-0.5">
                              {officialStats.totalAchievementsUnlocked}
                            </div>
                            <div className="text-[10px] text-amber-200">
                              ✨ {officialStats.rareAchievementsUnlocked} {lang === "es" ? "raros" : "rare"}
                            </div>
                          </div>

                          <div className="p-2.5 rounded-2xl bg-black/60 border border-emerald-500/30">
                            <div className="text-[9px] font-bold uppercase text-emerald-300 flex items-center gap-1">
                              <Users className="w-3 h-3 text-emerald-400" />
                              {lang === "es" ? "Dúo Co-op #1" : "#1 Co-op Duo"}
                            </div>
                            <div className="text-lg font-black text-white mt-0.5 truncate">
                              {activeFriend?.personaName || "Night"}
                            </div>
                            <div className="text-[10px] text-emerald-300">
                              {activeFriend?.compatibilityScore || 99}% {lang === "es" ? "Sincronía" : "Synergy"}
                            </div>
                          </div>

                          <div className="p-2.5 rounded-2xl bg-black/60 border border-steam-blue/30">
                            <div className="text-[9px] font-bold uppercase text-steam-blue flex items-center gap-1">
                              <Clock className="w-3 h-3 text-steam-neon" />
                              {lang === "es" ? "Horas" : "Hours"} {officialStats.currentYear}
                            </div>
                            <div className="text-lg font-black text-white mt-0.5">
                              {officialStats.totalHoursThisYear}h
                            </div>
                            <div className="text-[10px] text-gray-300">
                              {officialStats.gamesPlayedCount} {lang === "es" ? "títulos tocados" : "games launched"}
                            </div>
                          </div>

                          <div className="p-2.5 rounded-2xl bg-black/60 border border-red-500/30">
                            <div className="text-[9px] font-bold uppercase text-red-300 flex items-center gap-1">
                              <Skull className="w-3 h-3 text-red-400" />
                              {lang === "es" ? "Backlog Virgen" : "Untouched Backlog"}
                            </div>
                            <div className="text-lg font-black text-red-400 mt-0.5">
                              {diogenes.unplayedPercentage}%
                            </div>
                            <div className="text-[10px] text-gray-300">
                              {diogenes.unplayedCount} {lang === "es" ? "juegos con 0m" : "games at 0m"}
                            </div>
                          </div>
                        </div>

                        {/* ADN Gamer */}
                        <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-[10px] font-bold text-gray-300">
                          <span className="text-steam-blue uppercase font-black">
                            {lang === "es" ? "ADN Gamer:" : "Gamer DNA:"}
                          </span>
                          <span>🧟 {lang === "es" ? "Supervivencia" : "Survival"}</span>
                          <span>💀 Roguelike</span>
                          <span>🎯 {lang === "es" ? "Precisión" : "Precision"}</span>
                        </div>

                        {/* Veredicto Narrativo */}
                        <div
                          className="p-3 rounded-2xl bg-black/75 border border-white/15 text-left border-l-4"
                          style={{
                            borderLeftColor: activeNarratorConfig.accentColor,
                          }}
                        >
                          <div className="text-[9px] font-black uppercase text-gray-400 mb-0.5">
                            {lang === "es" ? "Veredicto • " : "Verdict • "}{localizedNarrator.name}
                          </div>
                          <p className="text-xs italic font-bold text-gray-100 leading-snug">
                            “{translateShareableOneLiner(commentary.finalCertificate.shareableOneLiner, lang)}”
                          </p>
                        </div>
                      </div>

                      {/* Pie de Página: Watermark Oficial */}
                      <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
                        <span className="font-bold text-white flex items-center gap-1">
                          <Gamepad2 className="w-3 h-3 text-steam-neon" />
                          Steam Replay Evolved
                        </span>
                        <span className="text-steam-blue font-mono font-bold">
                          s.team/replay/{officialStats.currentYear}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* FORMATO 3: TARJETA RESUMIDA HORIZONTAL / STEAM ID PASS */}
                {downloadFormat === "trading_card" && (
                  <div className="flex justify-center">
                    <div
                      ref={posterCardRef}
                      className="w-full max-w-2xl rounded-3xl bg-gradient-to-r from-[#0d141e] via-[#131d2b] to-[#0a1017] border-2 border-amber-400/80 shadow-[0_0_45px_rgba(245,158,11,0.25)] p-5 md:p-6 space-y-4 relative overflow-hidden text-left"
                    >
                      {/* Efectos de Brillo Foil Holográfico de fondo */}
                      <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 bg-amber-400/15 rounded-full blur-3xl" />
                      <div className="pointer-events-none absolute -bottom-20 -left-20 w-56 h-56 bg-steam-neon/15 rounded-full blur-3xl" />

                      {/* Header de la Tarjeta Resumida */}
                      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                            {lang === "es"
                              ? `★ STEAM REPLAY ${officialStats.currentYear} • TARJETA RESUMIDA OFICIAL`
                              : `★ STEAM REPLAY ${officialStats.currentYear} • OFFICIAL SUMMARY PASS`}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                          STEAM FOIL BADGE
                        </span>
                      </div>

                      {/* Cuerpo Horizontal: 2 Columnas */}
                      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                        {/* Columna Izquierda: Spotlight GOTY */}
                        <div className="sm:col-span-5 flex flex-col items-center sm:items-start">
                          <div className="relative w-40 h-56 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/60">
                            <img
                              src={monopoly.topGame.verticalCover}
                              alt=""
                              crossOrigin="anonymous"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  monopoly.topGame.headerImage;
                              }}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black shadow">
                              ★ #1 GOTY
                            </span>
                            <div className="absolute bottom-2 left-2 right-2 text-left">
                              <div className="text-xs font-black text-white truncate">
                                {monopoly.topGame.name}
                              </div>
                              <div className="text-[11px] font-black text-amber-300 mt-0.5">
                                🔥 {monopoly.topGame.hoursThisYear > 0 ? `${monopoly.topGame.hoursThisYear}h` : `${monopoly.topGame.playtimeHours}h`}{" "}
                                {lang === "es" ? "en " : "in "}{officialStats.currentYear}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Columna Derecha: Identidad, KPIs y Top Runner-Ups */}
                        <div className="sm:col-span-7 space-y-3.5">
                          {/* Perfil del Jugador */}
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              <img
                                src={profile.avatarUrl}
                                alt=""
                                crossOrigin="anonymous"
                                className="w-12 h-12 rounded-2xl border-2 border-amber-400 shadow-md object-cover"
                              />
                              <div className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded bg-black border border-amber-400 text-[8px] font-black text-amber-300">
                                50
                              </div>
                            </div>
                            <div className="min-w-0">
                              <div className="text-xl font-black text-white truncate leading-tight">
                                {profile.personaName}
                              </div>
                              <div className="text-xs font-extrabold text-amber-300 truncate">
                                «{translateGamerTitle(commentary.finalCertificate.gamerTitle, lang)}»
                              </div>
                            </div>
                          </div>

                          {/* Las 3 Métricas Esenciales en Píldoras Horizontales */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="p-2.5 rounded-xl bg-black/60 border border-steam-blue/30 text-center">
                              <div className="text-[9px] uppercase font-bold text-gray-400">
                                {lang === "es" ? "Horas " : "Hours "} {officialStats.currentYear}
                              </div>
                              <div className="text-base font-black text-steam-blue mt-0.5">
                                ⚡ {officialStats.totalHoursThisYear}h
                              </div>
                            </div>

                            <div className="p-2.5 rounded-xl bg-black/60 border border-amber-400/30 text-center">
                              <div className="text-[9px] uppercase font-bold text-gray-400">
                                {lang === "es" ? "Logros" : "Achievements"}
                              </div>
                              <div className="text-base font-black text-amber-300 mt-0.5">
                                🏆 {officialStats.totalAchievementsUnlocked}
                              </div>
                            </div>

                            <div className="p-2.5 rounded-xl bg-black/60 border border-emerald-400/30 text-center">
                              <div className="text-[9px] uppercase font-bold text-gray-400">
                                {lang === "es" ? "Racha" : "Streak"}
                              </div>
                              <div className="text-base font-black text-emerald-400 mt-0.5">
                                🔥 {officialStats.longestStreakDays}d
                              </div>
                            </div>
                          </div>

                          {/* Dúo Co-op & Runner-Ups */}
                          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-black/40 border border-white/10 text-xs">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-[10px] font-bold text-gray-400 uppercase">
                                {lang === "es" ? "Dúo Co-op:" : "Co-op Duo:"}
                              </span>
                              <span className="font-extrabold text-white truncate">
                                🤝 {activeFriend?.personaName || "Night"}
                              </span>
                              <span className="text-[10px] text-emerald-400 font-bold">
                                ({activeFriend?.compatibilityScore || 99}% Sync)
                              </span>
                            </div>

                            {monopoly.top5Games.length > 1 && (
                              <div className="flex items-center gap-1">
                                {monopoly.top5Games.slice(1, 4).map((r) => (
                                  <img
                                    key={r.appid}
                                    src={r.verticalCover}
                                    alt={r.name}
                                    title={`${r.name} (${r.hoursThisYear > 0 ? r.hoursThisYear : r.playtimeHours}h)`}
                                    crossOrigin="anonymous"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = r.headerImage;
                                    }}
                                    className="w-5 h-7 object-cover rounded shadow"
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Veredicto Narrador en 1 línea */}
                          <div className="p-2 rounded-xl bg-black/70 border border-white/10 text-left">
                            <p className="text-[11px] text-gray-300 italic font-semibold line-clamp-2">
                              “{translateShareableOneLiner(commentary.finalCertificate.shareableOneLiner, lang)}”
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Pie de Autenticidad Steam */}
                      <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
                        <span className="font-bold text-white flex items-center gap-1">
                          <Gamepad2 className="w-3 h-3 text-amber-400" />
                          Steam Replay Evolved
                        </span>
                        <span className="text-amber-300 font-mono font-bold">
                          s.team/replay/{officialStats.currentYear} • VERIFIED ID PASS
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controles Inferiores */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs font-bold text-white transition"
          >
            <ChevronLeft className="w-4 h-4" />
            {t.previous}
          </button>

          <div className="text-xs text-gray-400 hidden sm:block">
            {lang === "es"
              ? "Navegá con las flechas ⬅️ ➡️ o probá los enlaces a Steam de cada juego"
              : "Navigate with ⬅️ ➡️ arrow keys or explore Steam links for each game"}
          </div>

          {currentSlide < t.slideTitles.length - 1 ? (
            <button
              onClick={nextSlide}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-steam-neon hover:bg-steam-blue text-slate-950 text-xs font-extrabold shadow-lg transition"
            >
              {t.next}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentSlide(0)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition"
            >
              <RotateCcw className="w-4 h-4" />
              {t.backToChapter1}
            </button>
          )}
        </div>
      </div>

      {/* MODAL OFICIAL DE COMPARTIR EN STEAM (Fiel a la captura provista) */}
      <SteamShareModal
        isOpen={isSteamShareOpen}
        onClose={() => setIsSteamShareOpen(false)}
        personaName={profile.personaName}
        lang={lang}
      />

      {/* MODAL DUELO 1v1 VERSUS */}
      <SteamVersusModal
        isOpen={isVersusOpen}
        onClose={() => setIsVersusOpen(false)}
        userReplay={data}
        lang={lang}
      />
    </div>
  </div>
  );
}
