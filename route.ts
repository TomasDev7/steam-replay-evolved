import { NextRequest, NextResponse } from "next/server";
import { FullReplayResponse, NarratorPersona, SteamAnalyticsReport } from "@/types/steam";
import { getDemoAnalyticsReport } from "@/lib/mock-profiles";
import {
  fetchRealSteamProfileReport,
  getTomasCalibratedReport,
  SteamProfileError,
} from "@/lib/steam-client";
import { generateSteamReplayCommentary } from "@/lib/ai-narrator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const narrator: NarratorPersona = body.narrator || "glados";
    const variationIndex: number = body.variationIndex || 0;
    const demoPresetId: string | undefined = body.demoPresetId;
    const steamInput: string | undefined = body.steamInput;

    // 1. Modo Demo (Para reclutadores, pruebas rápidas o perfiles privados)
    if (demoPresetId) {
      const analytics = getDemoAnalyticsReport(demoPresetId);
      const commentary = await generateSteamReplayCommentary(
        analytics,
        narrator,
        variationIndex
      );

      const response: FullReplayResponse = {
        analytics,
        commentary,
        generatedAt: new Date().toISOString(),
        dataSource: "demo_archetype",
      };

      return NextResponse.json(response);
    }

    // 2. Modo Cuenta Real de Steam (Steam Web API en vivo)
    if (!steamInput || !steamInput.trim()) {
      return NextResponse.json(
        {
          error: "INVALID_INPUT",
          message:
            "Ingresá tu URL de Steam, SteamID64 o seleccioná un perfil Demo.",
        },
        { status: 400 }
      );
    }

    let analytics: SteamAnalyticsReport;
    let dataSource: "steam_live_api" | "demo_archetype" = "steam_live_api";

    try {
      analytics = await fetchRealSteamProfileReport(steamInput);
    } catch (apiError) {
      console.warn("Fallo o ausencia de Steam Web API en servidor, activando fallback calibrado de 7Kingdoms:", apiError);
      // Si la API falla (ej. sin API Key en Vercel o perfil privado o timeout), usamos los datos calibrados de 7Kingdoms
      analytics = getTomasCalibratedReport();
      dataSource = "demo_archetype";
    }

    const commentary = await generateSteamReplayCommentary(
      analytics,
      narrator,
      variationIndex
    );

    const response: FullReplayResponse = {
      analytics,
      commentary,
      generatedAt: new Date().toISOString(),
      dataSource,
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof SteamProfileError) {
      const statusMap: Record<SteamProfileError["code"], number> = {
        INVALID_INPUT: 400,
        USER_NOT_FOUND: 404,
        PRIVATE_PROFILE: 403,
        MISSING_API_KEY: 500,
        STEAM_API_ERROR: 502,
      };
      return NextResponse.json(
        {
          error: error.code,
          message: error.message,
        },
        { status: statusMap[error.code] || 400 }
      );
    }

    console.error("Error inesperado en /api/replay:", error);
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: "Ocurrió un error procesando el perfil de Steam.",
      },
      { status: 500 }
    );
  }
}
