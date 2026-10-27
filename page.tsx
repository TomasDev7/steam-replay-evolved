"use client";

import React, { useState, useEffect } from "react";
import {
  Gamepad2,
  Sparkles,
  Search,
  Lock,
  X,
  UserCheck,
  ArrowRight,
  Globe,
} from "lucide-react";
import { FullReplayResponse, NarratorPersona } from "@/types/steam";
import { DEMO_PRESETS } from "@/lib/mock-profiles";
import { SupportedLanguage, TRANSLATIONS } from "@/lib/i18n";
import ReplayStoriesPlayer from "@/components/ReplayStoriesPlayer";

const DEFAULT_LOGGED_IN_STEAM_ID = "76561199197888086"; // Sesión activa en cliente de Steam: 7Kingdoms

export default function HomePage() {
  const [lang, setLang] = useState<SupportedLanguage>("es");
  const t = TRANSLATIONS[lang];
  const [selectedNarrator, setSelectedNarrator] =
    useState<NarratorPersona>("roast_friend");
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [switchingNarrator, setSwitchingNarrator] = useState(false);
  const [replayData, setReplayData] = useState<FullReplayResponse | null>(null);
  const [lastRequestSource, setLastRequestSource] = useState<{
    steamInput?: string;
    demoPresetId?: string;
  }>({ steamInput: DEFAULT_LOGGED_IN_STEAM_ID });

  // Modal para inspeccionar otra cuenta (para reclutadores o amigos)
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [customSteamInput, setCustomSteamInput] = useState("");
  const [switcherLoading, setSwitcherLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const fetchReplay = async (params: {
    steamInput?: string;
    demoPresetId?: string;
    narrator: NarratorPersona;
    variationIndex?: number;
    isNarratorSwitch?: boolean;
    fromModal?: boolean;
  }) => {
    try {
      setErrorMsg(null);
      setErrorCode(null);
      if (params.isNarratorSwitch) {
        setSwitchingNarrator(true);
      } else if (params.fromModal) {
        setSwitcherLoading(true);
      } else {
        setLoadingInitial(true);
      }

      const res = await fetch("/api/replay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          steamInput: params.steamInput,
          demoPresetId: params.demoPresetId,
          narrator: params.narrator,
          variationIndex: params.variationIndex || 0,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setErrorCode(json.error || "ERROR");
        setErrorMsg(
          json.message || "No se pudo analizar el perfil de Steam."
        );
        return;
      }

      setReplayData(json);
      setLastRequestSource({
        steamInput: params.steamInput,
        demoPresetId: params.demoPresetId,
      });
      setIsSwitcherOpen(false);
    } catch {
      setErrorMsg("Error de red al conectar con el servidor de Steam Replay.");
    } finally {
      setLoadingInitial(false);
      setSwitchingNarrator(false);
      setSwitcherLoading(false);
    }
  };

  // Al entrar a la app, carga automáticamente la sesión activa de Steam (7Kingdoms) sin pedir cuenta
  useEffect(() => {
    fetchReplay({
      steamInput: DEFAULT_LOGGED_IN_STEAM_ID,
      narrator: "roast_friend",
    });
  }, []);

  const handleLiveNarratorChange = (
    newNarrator: NarratorPersona,
    variationIndex = 0
  ) => {
    setSelectedNarrator(newNarrator);
    fetchReplay({
      steamInput: lastRequestSource.steamInput,
      demoPresetId: lastRequestSource.demoPresetId,
      narrator: newNarrator,
      variationIndex,
      isNarratorSwitch: true,
    });
  };

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReplay({
      steamInput: customSteamInput,
      narrator: selectedNarrator,
      fromModal: true,
    });
  };

  const handleLoadDemo = (presetId: string) => {
    fetchReplay({
      demoPresetId: presetId,
      narrator: selectedNarrator,
      fromModal: true,
    });
  };

  const handleReturnToMySession = () => {
    fetchReplay({
      steamInput: DEFAULT_LOGGED_IN_STEAM_ID,
      narrator: selectedNarrator,
      fromModal: true,
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Barra Superior Estilo Cliente Nativo de Steam */}
      <header className="border-b border-white/10 bg-[#171a21]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-steam-neon to-steam-blue flex items-center justify-center shadow-lg">
                <Gamepad2 className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black tracking-tight text-white text-base md:text-lg">
                    STEAM <span className="text-steam-blue">REPLAY EVOLVED</span>
                  </span>
                  <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {lang === "es" ? "Cliente Conectado" : "Steam Connected"}
                  </span>
                </div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-gray-400">
              <span className="text-gray-500">{lang === "es" ? "Tienda" : "Store"}</span>
              <span className="text-gray-500">{lang === "es" ? "Comunidad" : "Community"}</span>
              <span className="text-steam-blue border-b-2 border-steam-neon pb-1">
                {lang === "es" ? "Resumen del Año de " : "Year in Review: "}
                {replayData?.analytics.profile.personaName || "7Kingdoms"}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setLang((prev) => (prev === "es" ? "en" : "es"))}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold transition"
              title="Cambiar idioma / Switch language"
            >
              <Globe className="w-4 h-4 text-steam-neon" />
              <span>{lang.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Cuerpo Principal: Entra directo al Resumen de la Sesión Activa */}
      <main className="flex-1 flex flex-col justify-center">
        {loadingInitial && !replayData ? (
          <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-steam-neon/20 border border-steam-neon flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(26,159,255,0.4)]">
              <Sparkles className="w-8 h-8 text-steam-neon animate-spin" />
            </div>
            <h2 className="text-2xl font-black text-white">
              {lang === "es"
                ? "Sincronizando tu Sesión Activa de Steam..."
                : "Synchronizing your Active Steam Session..."}
            </h2>
            <p className="text-xs text-gray-400">
              {lang === "es"
                ? "Leyendo biblioteca de 7Kingdoms, calculando racha anual, logros desbloqueados y preparando el narrador con IA."
                : "Reading 7Kingdoms library, computing yearly streak, unlocked achievements, and configuring AI narrator."}
            </p>
          </div>
        ) : replayData ? (
          <ReplayStoriesPlayer
            data={replayData}
            onOpenAccountSwitcher={() => setIsSwitcherOpen(true)}
            onChangeNarrator={handleLiveNarratorChange}
            isSwitchingNarrator={switchingNarrator}
            lang={lang}
            onLangChange={setLang}
          />
        ) : (
          <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-5 bg-steam-darkest/90 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">
                {lang === "es" ? "Sincronizando Resumen de Steam" : "Synchronizing Steam Replay"}
              </h2>
              <p className="text-xs text-gray-400 mt-2">
                {errorMsg ||
                  (lang === "es"
                    ? "Configurá tus variables de entorno en Vercel o explorá el resumen con el perfil de demostración."
                    : "Configure your environment variables on Vercel or explore the replay using demo mode.")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => handleLoadDemo("hoarder")}
                className="px-5 py-3 rounded-xl bg-steam-neon hover:bg-steam-blue text-slate-950 font-black text-xs transition shadow-lg"
              >
                {lang === "es" ? "Cargar Perfil Demo" : "Load Demo Profile"}
              </button>
              <button
                onClick={() => handleReturnToMySession()}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition"
              >
                {lang === "es" ? "Reintentar 7Kingdoms" : "Retry 7Kingdoms"}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modal para Inspeccionar Otra Cuenta o Arquetipos Demo (Opcional) */}
      {isSwitcherOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="steam-glass-heavy relative w-full max-w-2xl rounded-3xl p-6 md:p-8 border border-steam-blue/30 shadow-2xl space-y-5">
            <button
              onClick={() => setIsSwitcherOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-steam-blue">
                Modo Inspector Externo / Portafolio
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Probar con otra cuenta de Steam o Arquetipo Demo
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Por defecto el sistema detecta tu sesión iniciada (
                <strong>7Kingdoms</strong>). Desde acá podés auditar a un amigo
                o probar los perfiles de demostración.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReturnToMySession}
              className="w-full p-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-black text-white">
                    Volver a mi sesión iniciada: 7Kingdoms (Tomás)
                  </div>
                  <div className="text-[11px] text-emerald-300">
                    Cuenta principal conectada vía Steam Web API
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>

            <form onSubmit={handleCustomSearch} className="flex gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customSteamInput}
                  onChange={(e) => setCustomSteamInput(e.target.value)}
                  placeholder="Pegá otra URL de Steam o SteamID64..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-steam-darkest border border-white/15 text-white text-xs focus:border-steam-neon focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={switcherLoading}
                className="px-5 py-3 rounded-xl bg-steam-neon hover:bg-steam-blue text-slate-950 font-black text-xs transition"
              >
                {switcherLoading ? "Cargando..." : "Auditar"}
              </button>
            </form>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-200 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">
                    {errorCode === "PRIVATE_PROFILE"
                      ? "Perfil Privado Detectado"
                      : "Atención"}
                  </strong>
                  {errorMsg}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-white/10">
              <div className="text-xs font-bold text-gray-400 mb-2.5">
                O seleccioná un Arquetipo Demo pre-cargado:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {DEMO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleLoadDemo(preset.id)}
                    className="p-3 rounded-xl bg-steam-darkest/80 hover:bg-steam-darkest border border-white/10 hover:border-steam-blue/40 text-left transition"
                  >
                    <div className="font-bold text-white text-xs">
                      {preset.label}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {preset.tagline}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        {lang === "es" ? (
          <>
            Diseñado y Desarrollado por{" "}
            <strong className="text-gray-300">Tomás (7Kingdoms)</strong> • Propuesta
            de Evolución para el Resumen del Año de Steam (Valve)
          </>
        ) : (
          <>
            Designed & Developed by{" "}
            <strong className="text-gray-300">Tomás (7Kingdoms)</strong> • Product
            Evolution Proposal for Steam Year in Review (Valve)
          </>
        )}
      </footer>
    </div>
  );
}
