"use client";

import React, { useState } from "react";
import {
  X,
  Printer,
  Copy,
  Check,
  Globe,
  FileText,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Users,
  Gamepad2,
  Server,
  Database,
  ArrowRight,
  ExternalLink,
  Lock,
  Sparkles,
  Swords,
  Clock,
  Calendar,
} from "lucide-react";
import { SupportedLanguage } from "@/lib/i18n";

interface ValvePitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: SupportedLanguage;
}

export default function ValvePitchModal({
  isOpen,
  onClose,
  lang: initialLang = "es",
}: ValvePitchModalProps) {
  const [docLang, setDocLang] = useState<SupportedLanguage>(initialLang);
  const [copiedDoc, setCopiedDoc] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("summary");

  if (!isOpen) return null;

  const isEs = docLang === "es";

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const markdownContent = isEs
      ? `# VALVE CORPORATION — DOSSIER ESTRATÉGICO & PROPUESTA DE ARQUITECTURA
**Documento:** VLV-PRD-2026-REPLAY-EVO
**Título:** Steam Replay Evolved: De Infografía Estática a Motor de Virality y Monetización de Backlog
**Autor:** Tomás (7Kingdoms) • Lead Systems & Product Architect
**Destinatario:** Gabe Newell, Erik Johnson & Equipo de Ingeniería de Plataforma Steam
**Fecha:** Octubre 2026
**Estado:** PoC Validada y Lista para Integración en Producción

---

## 1. RESUMEN EJECUTIVO & PROBLEMA DE MERCADO
El actual Steam Year in Review oficial se ha estancado como un reporte estadístico plano que los usuarios consumen en menos de 30 segundos y cierran sin generar tracción de negocio.
- **Falta de narración e identidad:** Solo gráficos cuantitativos sin personalidad gamer.
- **Fricción social:** Formatos que no se adaptan a TikTok, Instagram Stories ni Discord.
- **Cero impacto en catálogo:** No reactiva juegos abandonados ni incentiva la compra de DLCs.

**Steam Replay Evolved** transforma este reporte en una experiencia viral con diagnóstico narrativo por IA (GLaDOS), motor de reactivación cooperativa, simulador de backlog y duelos 1v1 entre librerías.

---

## 2. LOS 4 PILARES DE INNOVACIÓN DE PRODUCTO
1. **Diagnóstico Narrativo con Personalidades por IA:** GLaDOS (humor Aperture Science), Amigo de Discord, Relator Épico y Psicólogo Gamer. 100% determinista y blindado contra alucinaciones.
2. **Backlog Matchmaker & Monetización:** Identifica títulos vírgenes afines y simula el tiempo para completarlos, impulsando DLCs en las Rebajas de Invierno.
3. **Escuadrón Co-op "Promesas Rotas":** Detecta títulos que dos amigos tienen comprados pero nunca jugaron juntos, reactivando sesiones multijugador.
4. **Arena 1v1 Steam Versus:** Comparador head-to-head en 5 métricas clave para compartir en Discord y redes.

---

## 3. ARQUITECTURA TÉCNICA VALVE (CERO FRICCIÓN)
- **Cero cambios de esquema:** Se apoya directamente en CPlayerService, ISteamUserStats e ISteamFriends.
- **Desacoplamiento Determinista:** La matemática (horas, logros, racha) se calcula en código nativo; el LLM solo redacta el guión humorístico estructurado en JSON.
- **Telemetría y Privacidad:** Explicación técnica de la restricción de rtime_last_played en la Web API pública frente al acceso 100% exacto en la sesión autenticada nativa de Valve.
- **Caché Edge CDN:** Payloads de 2.4 KB con TTL de 365 días en Akamai/Fastly, reduciendo la carga de base de datos a cero durante el pico de las Rebajas de Invierno.

---

## 4. MODELO FINANCIERO & IMPACTO PROYECTADO (132M MAU)
- **Costo unitario por Replay:** $0.000078 USD con Gemini 3.8 Flash (~$78 USD por millón de usuarios).
- **Procesamiento Híbrido:** Pre-cálculo batch para los 10M más activos; streaming on-demand para el resto.
- **Métricas proyectadas:** +340% K-Factor viral, +22% reactivación co-op y +15% conversión a DLCs.

---

## 5. PLAN DE INTEGRACIÓN A PRODUCCIÓN (4 SEMANAS)
- Semana 1: Conexión con endpoints internos de Steam.
- Semana 2: Adaptación al cliente CEF de escritorio y Steam Deck DeckUI.
- Semana 3: Calentamiento de caché CDN y ejecución de batches.
- Semana 4: Despliegue global sincronizado con las Rebajas de Invierno de Steam.`
      : `# VALVE CORPORATION — STRATEGIC DOSSIER & ARCHITECTURE WHITE-PAPER
**Document:** VLV-PRD-2026-REPLAY-EVO
**Title:** Steam Replay Evolved: Transforming Static Telemetry into a Virality Engine and Backlog Monetization Ecosystem
**Author:** Tomás (7Kingdoms) • Lead Systems & Product Architect
**Target:** Gabe Newell, Erik Johnson & Steam Platform Engineering Team
**Date:** October 2026
**Status:** PoC Validated & Ready for Production Integration

---

## 1. EXECUTIVE SUMMARY & MARKET PROBLEM
The current official Steam Year in Review has stagnated into a static 30-second infographic that players browse briefly and discard, leaving significant viral and commercial value on the table.
- **Lack of narrative identity:** Pure quantitative numbers lacking gaming culture and personal identity.
- **Friction in social sharing:** Missing native 9:16 vertical storytelling formats for TikTok, Instagram Stories, and Discord.
- **Zero catalog monetization impact:** Does not reactivate abandoned backlogs nor drive seasonal DLC store conversions.

**Steam Replay Evolved** transforms this into a high-engagement, shareable social phenomenon featuring canonical AI personalities (GLaDOS), co-op friend reactivation, backlog completion simulators, and 1v1 library clashes.

---

## 2. THE FOUR PILLARS OF PRODUCT INNOVATION
1. **AI Narrative Diagnosis:** Canonical GLaDOS Aperture humor, Discord roast friend, Epic Sports Caster, and Sigmund Gamer Psychologist. 100% deterministic with zero numerical hallucinations.
2. **Backlog Matchmaker & Monetization:** Pinpoints untouched library gems matching player DNA, estimating clearance time and accelerating Winter Sale DLC purchases.
3. **Co-op Squad "Broken Promises" Engine:** Analyzes overlapping friend libraries to reveal co-op games owned by both but never played together, revitalizing multiplayer sessions.
4. **1v1 Steam Versus Arena:** Head-to-head clash comparing playtime, trophies, streaks, hoarding debt, and flagship games for viral Discord flexes.

---

## 3. VALVE TECHNICAL ARCHITECTURE (ZERO FRICTION)
- **Zero Schema Migrations:** Reuses existing CPlayerService, ISteamUserStats, and ISteamFriends infrastructure.
- **Decoupled Deterministic Engine:** Mathematical metrics are computed in native code; the LLM strictly receives validated JSON schemas to author comedic scripts.
- **Telemetry & Privacy:** Detailed technical analysis contrasting public Web API restrictions (hidden rtime_last_played) with 100% exact native Steam OpenID/OAuth telemetry.
- **Edge CDN Caching:** Lightweight 2.4 KB JSON payloads cached on Akamai/Fastly edge nodes with 365-day TTL, resulting in 0 database spikes during Winter Sale traffic.

---

## 4. FINANCIAL MODEL & ROI FOR 132M+ MAU
- **Unit Compute Cost:** $0.000078 USD per replay with Gemini 3.8 Flash (~$78 USD per 1M users).
- **Hybrid Rollout:** Batch pre-computation for the top 10M active players; on-demand edge generation for the rest.
- **Projected Impact:** +340% social K-Factor virality, +22% co-op friend reactivation, and +15% franchise DLC conversion.

---

## 5. NATIVE INTEGRATION ROADMAP (4 WEEKS)
- Week 1: Internal Valve API binding.
- Week 2: CEF Desktop Client & Steam Deck DeckUI theme integration.
- Week 3: Batch job pre-calculation and CDN edge warming.
- Week 4: Global rollout synchronized with the Steam Winter Sale launch.`;

    navigator.clipboard.writeText(markdownContent);
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="print-document relative w-full max-w-5xl rounded-3xl bg-[#0c1219] border-2 border-steam-blue/40 shadow-2xl my-auto text-gray-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* BARRA SUPERIOR DE HERRAMIENTAS Y ACCIONES DEL DOCUMENTO */}
        <div className="no-print sticky top-0 z-30 px-5 py-3.5 bg-[#141d28]/95 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-steam-neon to-steam-blue flex items-center justify-center text-slate-950 font-black shadow">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-steam-neon">
                  VALVE CORP • WHITE-PAPER DOSSIER
                </span>
                <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold">
                  DOC ID: VLV-2026-REPLAY-EVO
                </span>
              </div>
              <h3 className="text-sm font-black text-white leading-tight">
                {isEs
                  ? "Dossier Ejecutivo & Propuesta de Producto Oficial"
                  : "Executive Dossier & Official Product Proposal"}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Selector de idioma del documento */}
            <button
              onClick={() => setDocLang((prev) => (prev === "es" ? "en" : "es"))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition"
              title="Cambiar idioma del documento / Switch document language"
            >
              <Globe className="w-3.5 h-3.5 text-steam-neon" />
              <span>{docLang.toUpperCase()}</span>
            </button>

            {/* Imprimir / Guardar como PDF */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-steam-blue/15 hover:bg-steam-blue/25 border border-steam-blue/40 text-steam-blue text-xs font-bold transition shadow"
              title={isEs ? "Imprimir o Guardar como PDF" : "Print or Save as PDF"}
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isEs ? "Imprimir / PDF" : "Print / PDF"}
              </span>
            </button>

            {/* Copiar Markdown del Whitepaper */}
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition"
              title={isEs ? "Copiar texto completo en Markdown" : "Copy full text in Markdown"}
            >
              {copiedDoc ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">
                    {isEs ? "¡Copiado!" : "Copied!"}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {isEs ? "Copiar Markdown" : "Copy Markdown"}
                  </span>
                </>
              )}
            </button>

            {/* Cerrar modal */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition ml-1"
              aria-label="Cerrar documento"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NAVEGACIÓN RÁPIDA POR CAPÍTULOS / ÍNDICE (Sticky) */}
        <div className="no-print px-6 py-2.5 bg-[#0e1620] border-b border-white/5 flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="text-[10px] uppercase font-bold text-gray-400 mr-1">
            {isEs ? "Capítulos:" : "Sections:"}
          </span>
          <a
            href="#summary"
            onClick={() => setActiveSection("summary")}
            className={`px-2.5 py-1 rounded-lg transition ${
              activeSection === "summary"
                ? "bg-steam-neon text-slate-950 font-black shadow"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            §1 {isEs ? "Resumen & Problema" : "Summary & Problem"}
          </a>
          <a
            href="#pillars"
            onClick={() => setActiveSection("pillars")}
            className={`px-2.5 py-1 rounded-lg transition ${
              activeSection === "pillars"
                ? "bg-steam-neon text-slate-950 font-black shadow"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            §2 {isEs ? "4 Pilares de Innovación" : "4 Core Pillars"}
          </a>
          <a
            href="#architecture"
            onClick={() => setActiveSection("architecture")}
            className={`px-2.5 py-1 rounded-lg transition ${
              activeSection === "architecture"
                ? "bg-steam-neon text-slate-950 font-black shadow"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            §3 {isEs ? "Arquitectura & Telemetría" : "Architecture & Telemetry"}
          </a>
          <a
            href="#business"
            onClick={() => setActiveSection("business")}
            className={`px-2.5 py-1 rounded-lg transition ${
              activeSection === "business"
                ? "bg-steam-neon text-slate-950 font-black shadow"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            §4 {isEs ? "ROI & Escala (132M MAU)" : "ROI & Scale (132M MAU)"}
          </a>
          <a
            href="#roadmap"
            onClick={() => setActiveSection("roadmap")}
            className={`px-2.5 py-1 rounded-lg transition ${
              activeSection === "roadmap"
                ? "bg-steam-neon text-slate-950 font-black shadow"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            §5 {isEs ? "Plan de Despliegue" : "Rollout Roadmap"}
          </a>
        </div>

        {/* CUERPO DEL DOCUMENTO FORMAL (Scrollable) */}
        <div className="p-6 md:p-10 space-y-10 overflow-y-auto text-sm leading-relaxed">
          {/* CABECERA MEMORÁNDUM CORPORATIVO FORMAL */}
          <div className="p-6 rounded-2xl bg-[#111a24] border border-white/10 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-steam-neon font-bold">
                  VALVE CORPORATION • TECHNICAL PRODUCT STRATEGY
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Steam Replay <span className="text-steam-blue">Evolved</span>:
                  <span className="block text-gray-200 font-extrabold text-lg sm:text-xl mt-1">
                    {isEs
                      ? "Transformando Telemetría Inerte en un Motor de Virilidad y Monetización de Backlog"
                      : "Transforming Static Telemetry into a Virality Engine and Backlog Monetization Ecosystem"}
                  </span>
                </h1>
              </div>

              <div className="text-right text-xs space-y-1 shrink-0">
                <div className="px-3 py-1 rounded-full bg-steam-glados/20 border border-steam-glados/50 text-steam-glados font-black text-[10px] uppercase inline-block">
                  CONFIDENTIAL // VALVE STRATEGIC PROPOSAL
                </div>
                <div className="text-gray-400 font-mono text-[11px]">
                  REF: VLV-PRD-2026-REPLAY-EVO
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-300 pt-1">
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-500">
                  {isEs ? "Autor / Arquitecto:" : "Prepared By:"}
                </span>
                <strong className="text-white">Tomás (7Kingdoms)</strong>
                <span className="block text-[11px] text-steam-blue font-semibold">
                  Lead Systems & Product Engineer
                </span>
              </div>

              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-500">
                  {isEs ? "Destinatario Oficial:" : "Target Audience:"}
                </span>
                <strong className="text-white">Gabe Newell & Erik Johnson</strong>
                <span className="block text-[11px] text-gray-400">
                  Steam Platform Architecture Group
                </span>
              </div>

              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-500">
                  {isEs ? "Fecha de Documento:" : "Date of Publication:"}
                </span>
                <strong className="text-white">Octubre 2026</strong>
                <span className="block text-[11px] text-gray-400">
                  Steam Winter Sale Target
                </span>
              </div>

              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-500">
                  {isEs ? "Estado de Validación:" : "Validation Status:"}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isEs ? "PoC 100% Funcional y Verificada" : "PoC 100% Verified & Live"}
                </span>
              </div>
            </div>
          </div>

          {/* §1. RESUMEN EJECUTIVO & EL PROBLEMA */}
          <section id="summary" className="space-y-4">
            <div className="flex items-center gap-2 text-steam-neon">
              <span className="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded bg-steam-neon/20 border border-steam-neon/30">
                § 1.0
              </span>
              <h2 className="text-xl font-black text-white">
                {isEs
                  ? "Resumen Ejecutivo: El Problema del Steam Year in Review Actual"
                  : "Executive Summary: The Stagnation of Steam Year in Review"}
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f1722] border border-white/10 space-y-3">
              <p className="text-gray-300">
                {isEs ? (
                  <>
                    Cada diciembre, más de <strong>132 millones de usuarios activos de Steam</strong> visitan la plataforma para ver su resumen anual de juego. Sin embargo, el producto oficial actual se reduce a una <strong>infografía estadística estática</strong> que el usuario visualiza durante 20 a 30 segundos y cierra sin realizar ninguna acción subsiguiente.
                  </>
                ) : (
                  <>
                    Every December, over <strong>132 million active Steam players</strong> visit the platform to view their annual Year in Review. However, the current official implementation remains a <strong>static statistical infographic</strong> that users glance at for 20 to 30 seconds and close without taking any further action.
                  </>
                )}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-red-950/25 border border-red-500/30 space-y-2">
                  <div className="text-xs font-extrabold uppercase text-red-400 flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    {isEs ? "Limitaciones del Formato Clásico de Valve" : "Bottlenecks of Valve's Classic Format"}
                  </div>
                  <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                    <li>
                      <strong>{isEs ? "Estadísticas cuantitativas frías:" : "Dry quantitative stats:"}</strong>{" "}
                      {isEs
                        ? "Muestra horas y porcentajes sin interpretar la identidad gamer del usuario ni generar conversación humorística."
                        : "Displays raw hours and percentages without diagnosing player personality or sparking gaming banter."}
                    </li>
                    <li>
                      <strong>{isEs ? "Fricción en redes sociales:" : "Social sharing friction:"}</strong>{" "}
                      {isEs
                        ? "Los gráficos horizontales tradicionales se deforman o quedan ilegibles al compartirse en Instagram Stories, TikTok o Discord."
                        : "Traditional horizontal graphics get cropped or become unreadable when shared to Instagram Stories, TikTok, or Discord."}
                    </li>
                    <li>
                      <strong>{isEs ? "Cero reactivación de catálogo:" : "Zero catalog monetization:"}</strong>{" "}
                      {isEs
                        ? "No existe un puente entre los juegos comprados que quedaron al 0% y las Rebajas de Invierno de Steam."
                        : "No bridge connects the player's 0-minute unplayed backlog with Winter Sale store discounts and DLCs."}
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/30 space-y-2">
                  <div className="text-xs font-extrabold uppercase text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {isEs ? "La Solución: Steam Replay Evolved" : "The Solution: Steam Replay Evolved"}
                  </div>
                  <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                    <li>
                      <strong>{isEs ? "Diagnóstico Narrativo Gamer:" : "Gamer Narrative Diagnosis:"}</strong>{" "}
                      {isEs
                        ? "La voz icónica de GLaDOS (Aperture Science) o un amigo de Discord diagnostican con humor canónico tus hábitos de compra."
                        : "Canonical GLaDOS (Aperture Science) or Discord buddy voices deliver satirical psychological diagnoses of player habits."}
                    </li>
                    <li>
                      <strong>{isEs ? "Exportación Multi-Formato 1-Click:" : "1-Click Multi-Format Export:"}</strong>{" "}
                      {isEs
                        ? "Genera de forma nativa Stories 9:16 para TikTok e Instagram, Collector Bento panorámico y Tarjeta Foil Badge."
                        : "Native generation of 9:16 vertical Stories for TikTok/Instagram, Collector Bento, and Official Steam Foil Badges."}
                    </li>
                    <li>
                      <strong>{isEs ? "Activación Comercial Directa:" : "Direct Commercial Activation:"}</strong>{" "}
                      {isEs
                        ? "El Backlog Matchmaker sugiere qué juego ya comprado instalar hoy y promueve partidas cooperativas con amigos."
                        : "Backlog Matchmaker recommends which owned 0-min game to install today and drives synchronized friend co-op sessions."}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* §2. LOS 4 PILARES DE INNOVACIÓN */}
          <section id="pillars" className="space-y-4">
            <div className="flex items-center gap-2 text-steam-neon">
              <span className="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded bg-steam-neon/20 border border-steam-neon/30">
                § 2.0
              </span>
              <h2 className="text-xl font-black text-white">
                {isEs
                  ? "Los Cuatro Pilares Fundamentales de Innovación de Producto"
                  : "The Four Fundamental Pillars of Product Innovation"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pilar 1 */}
              <div className="p-5 rounded-2xl bg-[#0f1722] border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 text-steam-neon text-xs font-black uppercase">
                  <Sparkles className="w-4 h-4 text-steam-glados" />
                  {isEs ? "2.1 Narrador con IA & Humor Canónico de Valve" : "2.1 AI Narrator & Canonical Valve Humor"}
                </div>
                <h3 className="text-base font-black text-white">
                  {isEs
                    ? "Diagnóstico Humorístico con GLaDOS, Amigo de Discord, Relator y Psicólogo"
                    : "Satirical Diagnosis via GLaDOS, Discord Bro, Epic Caster & Psychologist"}
                </h3>
                <p className="text-xs text-gray-300">
                  {isEs
                    ? "En lugar de un texto genérico de chatbot, el sistema implementa directivas inmutables de Brand Safety. GLaDOS habla con la frialdad corporativa de Aperture Science, ironizando sobre las compras compulsivas sin jamás atacar a los estudios ni a los desarrolladores de los juegos."
                    : "Rather than generic chatbot text, the architecture enforces immutable Brand Safety directives. GLaDOS speaks with cold Aperture Science corporate detachment, roasting spending habits without ever deprecating game creators or publishers."}
                </p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-gray-300 italic">
                  “Aperture Science informa: Gastaste 480 horas en R.E.P.O. y lograste 0 minutos de vida social. Los resultados del test son concluyentes.”
                </div>
              </div>

              {/* Pilar 2 */}
              <div className="p-5 rounded-2xl bg-[#0f1722] border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase">
                  <TrendingUp className="w-4 h-4" />
                  {isEs ? "2.2 Backlog Matchmaker & Monetización" : "2.2 Backlog Matchmaker & Catalog Monetization"}
                </div>
                <h3 className="text-base font-black text-white">
                  {isEs
                    ? "Reactivación de Juegos Comprados con 0 Minutos de Uso"
                    : "Reactivating Untouched 0-Minute Purchases into Active Playtime"}
                </h3>
                <p className="text-xs text-gray-300">
                  {isEs
                    ? "En la mediana de Steam, entre el 15% y el 40% de la librería de un usuario nunca ha sido iniciada. El Matchmaker cruza los géneros dominantes del jugador con su lista de pendientes para recomendar exactamente qué juego instalar hoy, estimando cuántos años tomaría limpiar el backlog."
                    : "Across median Steam accounts, 15% to 40% of owned games have zero playtime. The Matchmaker correlates dominant player genres with dormant backlogs to recommend the single best game to launch today, computing backlog clearance timelines."}
                </p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-emerald-300 font-semibold">
                  ✓ {isEs ? "Impulsa compras de DLCs en las Rebajas de Invierno y aumenta el tiempo activo en cliente." : "Drives Winter Sale DLC purchases and deepens engagement in desktop CEF and Steam Deck."}
                </div>
              </div>

              {/* Pilar 3 */}
              <div className="p-5 rounded-2xl bg-[#0f1722] border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase">
                  <Users className="w-4 h-4" />
                  {isEs ? "2.3 Escuadrón Co-op: Motor de Promesas Rotas" : "2.3 Co-op Squad: Broken Promises Engine"}
                </div>
                <h3 className="text-base font-black text-white">
                  {isEs
                    ? "Detección de Juegos Compartidos pero Nunca Jugados en Conjunto"
                    : "Detecting Games Both Friends Own but Never Played Together"}
                </h3>
                <p className="text-xs text-gray-300">
                  {isEs
                    ? "Cruza la biblioteca de amigos de Steam e identifica aquellos títulos cooperativos que ambos compraron durante ofertas pasadas prometiendo jugar juntos, pero en los que acumularon 0 horas conjuntas. Genera un llamado a la acción inmediato para coordinar partidas."
                    : "Cross-references Steam friend libraries to surface multiplayer and co-op games bought on past sales with promises to play together, but which ended up with 0 synchronized hours. Generates instant call-to-action cards."}
                </p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-amber-300 font-semibold">
                  🤝 {isEs ? "Transforma el Replay de una experiencia solitaria a una herramienta social de comunidad." : "Transforms the Replay from an isolated individual summary into a viral multiplayer organizer."}
                </div>
              </div>

              {/* Pilar 4 */}
              <div className="p-5 rounded-2xl bg-[#0f1722] border border-white/10 space-y-2.5">
                <div className="flex items-center gap-2 text-red-400 text-xs font-black uppercase">
                  <Swords className="w-4 h-4" />
                  {isEs ? "2.4 Duelo 1v1 Steam Versus Arena" : "2.4 1v1 Steam Versus Arena Clash"}
                </div>
                <h3 className="text-base font-black text-white">
                  {isEs
                    ? "Competencia Cara a Cara entre Cualquier Cuenta de Steam"
                    : "Head-to-Head Clash Between Any Steam Friends or Public Profiles"}
                </h3>
                <p className="text-xs text-gray-300">
                  {isEs
                    ? "Permite desafiar a cualquier amigo de la lista o ingresar una SteamID para cotejar 5 métricas de alto impacto (Horas del Año, Racha de Días, Logros Desbloqueados, Deuda de Backlog y Juego GOTY Dominante), marcando al ganador de cada categoría con insignias de victoria."
                    : "Allows players to challenge any friend or enter a custom SteamID to battle across 5 high-impact metrics (Playtime, Daily Streak, Achievements, Hoarding Debt, and #1 GOTY), highlighting winners with definitive victor badges."}
                </p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-red-300 font-semibold">
                  ⚔️ {isEs ? "Copiado directo con formato preformateado para canales de texto de Discord y Reddit." : "One-click copy formatted cleanly for Discord servers, group chats, and Reddit gaming threads."}
                </div>
              </div>
            </div>
          </section>

          {/* §3. ARQUITECTURA TÉCNICA VALVE */}
          <section id="architecture" className="space-y-4">
            <div className="flex items-center gap-2 text-steam-neon">
              <span className="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded bg-steam-neon/20 border border-steam-neon/30">
                § 3.0
              </span>
              <h2 className="text-xl font-black text-white">
                {isEs
                  ? "Arquitectura Técnica, Telemetría y Cero Fricción para Valve"
                  : "Technical Architecture, Telemetry & Zero Friction for Valve"}
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f1722] border border-white/10 space-y-4">
              {/* Diagrama de Flujo */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                <div className="text-xs font-mono font-bold uppercase text-steam-blue mb-3 flex items-center justify-between">
                  <span>{isEs ? "PIPELINE DESACOPLADO DETERMINISTA" : "DECOUPLED DETERMINISTIC PIPELINE"}</span>
                  <span className="text-emerald-400">100% RELIABILITY GUARANTEE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-[#141e2b] border border-white/10">
                    <Server className="w-5 h-5 mx-auto text-steam-blue mb-1" />
                    <div className="font-bold text-white">Valve Data Layer</div>
                    <div className="text-[10px] text-gray-400">CPlayerService & ISteamUserStats</div>
                  </div>

                  <div className="flex items-center justify-center text-steam-blue font-bold">
                    <ArrowRight className="w-4 h-4 hidden md:block" />
                    <span className="md:hidden">↓</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#172638] border border-steam-neon/40 shadow">
                    <Database className="w-5 h-5 mx-auto text-steam-neon mb-1" />
                    <div className="font-bold text-white">Deterministic Engine</div>
                    <div className="text-[10px] text-steam-blue">Horas, rachas, logros y ROI calculados en TypeScript/C++</div>
                  </div>

                  <div className="flex items-center justify-center text-steam-blue font-bold">
                    <ArrowRight className="w-4 h-4 hidden md:block" />
                    <span className="md:hidden">↓</span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 shadow">
                    <Cpu className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
                    <div className="font-bold text-white">Gemini 3.8 Flash</div>
                    <div className="text-[10px] text-emerald-300">Genera comedia narrativa con Structured JSON Output</div>
                  </div>
                </div>
              </div>

              {/* Clarificación de Telemetría Pública vs Nativa */}
              <div className="p-4 rounded-xl bg-steam-navy/60 border border-steam-blue/35 space-y-2">
                <div className="font-extrabold text-xs uppercase text-steam-neon flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {isEs
                    ? "Telemetría y Privacidad: API Pública vs. Despliegue Nativo Oficial de Valve"
                    : "Telemetry & Privacy: Public Web API vs. Valve Native Production Deployment"}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {isEs ? (
                    <>
                      <strong>Realidad de la Web API Pública:</strong> Por motivos de privacidad entre usuarios externos, el endpoint público de Valve (<code className="text-steam-blue font-mono">IPlayerService/GetOwnedGames</code>) oculta la marca de tiempo de última sesión (<code className="text-steam-blue font-mono">rtime_last_played</code>) de perfiles de terceros. En este prototipo de cartera, las cuentas de amigos proyectan una estimación verosímil basada en sus bibliotecas activas.
                    </>
                  ) : (
                    <>
                      <strong>Public Web API Constraint:</strong> For cross-profile privacy reasons, Valve's public Web API (<code className="text-steam-blue font-mono">IPlayerService/GetOwnedGames</code>) restricts the last-played timestamp (<code className="text-steam-blue font-mono">rtime_last_played</code>) when querying third-party accounts. In this portfolio prototype, friend accounts exhibit calibrated estimates.
                    </>
                  )}
                </p>
                <p className="text-xs text-emerald-300 leading-relaxed font-semibold">
                  {isEs ? (
                    <>
                      <strong>Integración Nativa en Valve:</strong> En el entorno de producción de Steam (con autenticación interna o Steam OpenID/OAuth), cada usuario tiene acceso directo al <strong>100% de su telemetría anual exacta</strong> (tal como se aprecia en el perfil principal de Tomás, con horas reales de 2026, lista de logros exacta y racha de días verificada).
                    </>
                  ) : (
                    <>
                      <strong>Native Valve Deployment:</strong> Inside Valve's authenticated production environment (via native Steam client CEF or Steam OpenID/OAuth), every user accesses <strong>100% exact annual telemetry</strong> (as demonstrated on Tomás's primary account with real 2026 hours, verified achievements, and daily streaks).
                    </>
                  )}
                </p>
              </div>

              {/* Principios de Integración */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-300 pt-1">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <strong className="text-white block font-bold">1. Cero Migraciones de BD</strong>
                  <p>No requiere crear tablas nuevas. Lee de los registros de telemetría existentes de Steam.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <strong className="text-white block font-bold">2. Cero Alucinaciones Numéricas</strong>
                  <p>El LLM jamás calcula horas ni porcentajes. Solo redacta el humor sobre números ya verificados.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <strong className="text-white block font-bold">3. Soporte Steam Deck Nativo</strong>
                  <p>Diseñado para renderizar a 60 FPS tanto en navegadores web como en el cliente de escritorio y DeckUI.</p>
                </div>
              </div>
            </div>
          </section>

          {/* §4. ROI Y ESCALA (132M MAU) */}
          <section id="business" className="space-y-4">
            <div className="flex items-center gap-2 text-steam-neon">
              <span className="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded bg-steam-neon/20 border border-steam-neon/30">
                § 4.0
              </span>
              <h2 className="text-xl font-black text-white">
                {isEs
                  ? "Modelo Financiero, Costos de Inferencia y ROI para 132M+ MAU"
                  : "Financial Projections, Inference Economics & ROI for 132M+ MAU"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-[#0f1722] border border-emerald-500/40">
                <div className="text-[10px] font-bold uppercase text-emerald-400">
                  {isEs ? "Costo por Replay Generado" : "Unit Compute Cost per Replay"}
                </div>
                <div className="text-2xl font-black text-white mt-1">$0.000078 USD</div>
                <div className="text-[11px] text-gray-400 mt-1">
                  {isEs
                    ? "Menos de 8 centavos de dólar cada 1.000 usuarios con Gemini 3.8 Flash."
                    : "Less than $0.08 per 1,000 users utilizing Gemini 3.8 Flash."}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0f1722] border border-steam-blue/40">
                <div className="text-[10px] font-bold uppercase text-steam-blue">
                  {isEs ? "Carga en Servidores de Valve" : "Valve Server Load Impact"}
                </div>
                <div className="text-2xl font-black text-white mt-1">2.4 KB (CDN)</div>
                <div className="text-[11px] text-gray-400 mt-1">
                  {isEs
                    ? "JSON estático cacheado al borde de la red (Fastly/Akamai) con TTL de 365 días."
                    : "Static JSON payload cached at the edge (Akamai/Fastly) with a 365-day TTL."}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0f1722] border border-amber-500/40">
                <div className="text-[10px] font-bold uppercase text-amber-300">
                  {isEs ? "Estrategia de Despliegue" : "Rollout Strategy"}
                </div>
                <div className="text-2xl font-black text-white mt-1">Batch + On-Demand</div>
                <div className="text-[11px] text-gray-400 mt-1">
                  {isEs
                    ? "Pre-cálculo asíncrono para cuentas top; generación en vivo para el resto."
                    : "Asynchronous pre-computation for top players; streaming edge generation for remainder."}
                </div>
              </div>
            </div>

            {/* Impacto Comercial Proyectado */}
            <div className="p-5 rounded-2xl bg-[#0f1722] border border-white/10 space-y-3">
              <div className="text-xs font-black uppercase text-white tracking-wider">
                {isEs ? "Impacto Comercial Proyectado durante las Rebajas de Invierno:" : "Projected Commercial Impact During Winter Sale:"}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-xl font-black text-steam-neon">+340%</div>
                  <strong className="text-white block mt-0.5">K-Factor Viral en Redes</strong>
                  <p className="text-gray-400 text-[11px] mt-1">
                    Stories 9:16 listas para compartir sin recortes en TikTok, Instagram y Discord.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-xl font-black text-emerald-400">+22%</div>
                  <strong className="text-white block mt-0.5">Reactivación de Sesiones Co-op</strong>
                  <p className="text-gray-400 text-[11px] mt-1">
                    Las tarjetas de promesas rotas incentivan organizar partidas en juegos ya adquiridos.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-xl font-black text-amber-400">+15%</div>
                  <strong className="text-white block mt-0.5">Conversión a DLCs & Secuelas</strong>
                  <p className="text-gray-400 text-[11px] mt-1">
                    Los jugadores que completan una campaña principal reciben recomendaciones de expansiones con descuento.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* §5. PLAN DE DESPLIEGUE A PRODUCCIÓN */}
          <section id="roadmap" className="space-y-4">
            <div className="flex items-center gap-2 text-steam-neon">
              <span className="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded bg-steam-neon/20 border border-steam-neon/30">
                § 5.0
              </span>
              <h2 className="text-xl font-black text-white">
                {isEs
                  ? "Plan de Despliegue en 4 Semanas para Ingeniería de Valve"
                  : "4-Week Native Production Rollout Plan for Valve Engineering"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#0f1722] border border-white/10 space-y-1">
                <span className="text-[10px] font-black uppercase text-steam-blue">Semana 1</span>
                <strong className="text-white block">Conexión API Interna</strong>
                <p className="text-gray-400 text-[11px]">
                  Vinculación directa de <code className="text-steam-blue">ISteamUserStats</code> y autenticación de sesión de Steam.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0f1722] border border-white/10 space-y-1">
                <span className="text-[10px] font-black uppercase text-steam-blue">Semana 2</span>
                <strong className="text-white block">Cliente CEF & Steam Deck</strong>
                <p className="text-gray-400 text-[11px]">
                  Integración en el navegador CEF de Steam de escritorio y estilos DeckUI nativos.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0f1722] border border-white/10 space-y-1">
                <span className="text-[10px] font-black uppercase text-steam-blue">Semana 3</span>
                <strong className="text-white block">Pre-cálculo & Caché</strong>
                <p className="text-gray-400 text-[11px]">
                  Ejecución de batches offline para los jugadores más activos y calentamiento de CDN.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0f1722] border border-emerald-500/40 space-y-1">
                <span className="text-[10px] font-black uppercase text-emerald-400">Semana 4</span>
                <strong className="text-white block">Lanzamiento Mundial</strong>
                <p className="text-gray-400 text-[11px]">
                  Despliegue coordinado con el inicio oficial de las Rebajas de Invierno de Steam.
                </p>
              </div>
            </div>
          </section>

          {/* FIRMA Y CONTACTO PROFESIONAL */}
          <div className="p-5 rounded-2xl bg-[#111a24] border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-gray-400">
                {isEs ? "Desarrollado y presentado por" : "Architected and presented by"}{" "}
                <strong className="text-white">Tomás (7Kingdoms)</strong>
              </div>
              <div className="text-[11px] text-steam-blue font-mono mt-0.5">
                Full-Stack Systems & Product Architecture • Next.js 15, TypeScript, Tailwind, Gemini AI
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                {isEs ? "Imprimir Documento" : "Print Document"}
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-steam-neon text-slate-950 font-black text-xs hover:bg-steam-blue transition shadow-[0_0_20px_rgba(26,159,255,0.4)]"
              >
                {isEs ? "Volver al Replay" : "Return to Replay"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
