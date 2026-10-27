"use client";

import React, { useState } from "react";
import {
  X,
  Check,
  Globe,
  Users,
  Lock,
  ChevronDown,
  Share2,
} from "lucide-react";
import { SupportedLanguage } from "@/lib/i18n";

interface SteamShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  personaName: string;
  lang?: SupportedLanguage;
}

export type PageVisibility = "public" | "friends" | "private";

export default function SteamShareModal({
  isOpen,
  onClose,
  personaName,
  lang = "es",
}: SteamShareModalProps) {
  const [visibility, setVisibility] = useState<PageVisibility>("public");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [sharedOnActivity, setSharedOnActivity] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `https://s.team/y26/${personaName.toLowerCase()}?l=${lang === "es" ? "spanish" : "english"}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareOnActivity = () => {
    setSharedOnActivity(true);
    window.open("https://steamcommunity.com/my/status/", "_blank");
    setTimeout(() => setSharedOnActivity(false), 3000);
  };

  const getVisibilityLabel = () => {
    switch (visibility) {
      case "public":
        return lang === "es" ? "Público" : "Public";
      case "friends":
        return lang === "es" ? "Solo amigos" : "Friends only";
      case "private":
        return lang === "es" ? "Privado" : "Private";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#1b2838] border border-white/20 p-6 md:p-8 shadow-2xl text-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado en mayúsculas idéntico al original de Valve */}
        <p className="text-center text-xs md:text-sm font-bold tracking-wide text-gray-300 uppercase mb-8 max-w-md mx-auto">
          {lang === "es"
            ? "El formato a lo alto funciona mejor en historias de Instagram, Facebook, Snapchat, TikTok o Pinterest"
            : "The vertical format works best for Instagram, Facebook, Snapchat, TikTok Stories or Pinterest"}
        </p>

        {/* Selector de Visibilidad de tu página */}
        <div className="flex flex-col items-center justify-center mb-6">
          <span className="text-xs font-medium text-gray-300 mb-2">
            {lang === "es" ? "Visibilidad de tu página:" : "Your page visibility:"}
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-3 px-5 py-2 rounded-md bg-[#213247] hover:bg-[#2a405a] border border-[#3b5b7d] text-sm font-semibold text-white min-w-[150px] shadow"
            >
              <span className="flex items-center gap-2">
                {visibility === "public" ? (
                  <Globe className="w-4 h-4 text-steam-blue" />
                ) : visibility === "friends" ? (
                  <Users className="w-4 h-4 text-amber-400" />
                ) : (
                  <Lock className="w-4 h-4 text-red-400" />
                )}
                {getVisibilityLabel()}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-300" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-1.5 left-0 w-full rounded-md bg-[#172433] border border-steam-blue/30 shadow-xl overflow-hidden z-20">
                <button
                  type="button"
                  onClick={() => {
                    setVisibility("public");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-white hover:bg-steam-blue/20 flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5 text-steam-blue" />
                  {lang === "es" ? "Público" : "Public"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVisibility("friends");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-white hover:bg-steam-blue/20 flex items-center gap-2"
                >
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  {lang === "es" ? "Solo amigos" : "Friends only"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVisibility("private");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-white hover:bg-steam-blue/20 flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-red-400" />
                  {lang === "es" ? "Privado" : "Private"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Caja Principal estilo Steam Replay Oficial */}
        <div className="p-4 md:p-5 rounded-xl bg-[#121c27] border border-white/10 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              {lang === "es" ? "URL para compartirlo:" : "Share URL:"}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3.5 py-2.5 rounded-md bg-[#1b2838] border border-white/10 text-white text-xs font-mono select-all focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-md bg-[#2a475e] hover:bg-[#3d6585] text-white font-bold text-xs flex items-center gap-2 shadow transition"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    {lang === "es" ? "¡Copiado!" : "Copied!"}
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    {lang === "es" ? "Copiar enlace" : "Copy Link"}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Botón Oficial de Compartir en Steam */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleShareOnActivity}
              className="w-full p-3.5 rounded-lg bg-[#2a475e] hover:bg-[#3d6585] text-white font-bold text-xs flex items-center justify-center gap-2.5 transition shadow"
            >
              {/* Logo de Steam SVG */}
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.415l3.075-4.515a3.9 3.9 0 0 1-1.38-.9l-3.3 1.395c-.345-.87-.555-1.815-.6-2.805l3.825-1.605a3.96 3.96 0 0 1 2.28 1.11l4.47-3.045a5.97 5.97 0 1 1-1.275 6.09l-2.91 4.275C17.37 23.355 24 18.45 24 12c0-6.63-5.37-12-12-12zm4.8 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2zm0 1.2a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8z" />
              </svg>
              <span>
                {sharedOnActivity
                  ? lang === "es"
                    ? "¡Abriendo Steam Activity!"
                    : "Opening Steam Activity!"
                  : lang === "es"
                  ? "Compartir en «Actividad de los amigos de Steam»"
                  : "Share to «Steam Friends Activity»"}
              </span>
            </button>
          </div>
        </div>

        {/* Botón Cerrar Inferior */}
        <div className="flex justify-end pt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-2.5 rounded-md bg-[#213247] hover:bg-[#2a405a] border border-[#3b5b7d] text-white font-bold text-xs shadow transition"
          >
            {lang === "es" ? "Cerrar" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
