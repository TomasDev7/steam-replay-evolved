import { SteamAnalyticsReport, SteamProfileSummary } from "@/types/steam";
import {
  buildSteamAnalyticsReport,
  enrichRawSteamGame,
} from "@/lib/steam-analytics";

export interface DemoPreset {
  id: string;
  label: string;
  tagline: string;
  badge: string;
  profile: SteamProfileSummary;
  friendName: string;
  rawGames: Parameters<typeof enrichRawSteamGame>[0][];
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: "hoarder",
    label: "El Acumulador de Ofertas",
    tagline: "312 juegos comprados en rebajas, pero juega siempre a los mismos 2.",
    badge: "Arquetipo Clásico",
    friendName: "Nico_98 (En línea hace 47 días)",
    profile: {
      steamId: "76561198042133701",
      personaName: "GabeMustBeStopped",
      avatarUrl:
        "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
      profileUrl: "https://steamcommunity.com/",
      accountAgeYears: 9,
      countryCode: "AR",
      isDemo: true,
      demoArchetype: "Síndrome de Diógenes Nivel Dios",
    },
    rawGames: [
      { appid: 730, name: "Counter-Strike 2", playtime_forever: 89400, playtime_2weeks: 1240, achievementPercentage: 91 }, // 1490h
      { appid: 2379780, name: "Balatro", playtime_forever: 11280, playtime_2weeks: 420, achievementPercentage: 78 }, // 188h
      { appid: 1794680, name: "Vampire Survivors", playtime_forever: 6420, achievementPercentage: 88 }, // 107h
      { appid: 1245620, name: "ELDEN RING", playtime_forever: 5100, achievementPercentage: 82 }, // 85h - casi terminado
      { appid: 1086940, name: "Baldur's Gate 3", playtime_forever: 4320, achievementPercentage: 71 }, // 72h - Acto 3 abandonado
      { appid: 413150, name: "Stardew Valley", playtime_forever: 2880, achievementPercentage: 66 }, // 48h
      { appid: 1091500, name: "Cyberpunk 2077", playtime_forever: 42, estimatedPriceUsd: 59.99, achievementPercentage: 4 }, // 42 min! Pisapapeles de oro
      { appid: 1174180, name: "Red Dead Redemption 2", playtime_forever: 95, estimatedPriceUsd: 59.99, achievementPercentage: 6 },
      { appid: 1966720, name: "Lethal Company", playtime_forever: 35, isCoop: true },
      { appid: 739630, name: "Phasmophobia", playtime_forever: 0, isCoop: true },
      { appid: 1326470, name: "Sons Of The Forest", playtime_forever: 15, isCoop: true },
      { appid: 292030, name: "The Witcher 3: Wild Hunt", playtime_forever: 0 },
      { appid: 367520, name: "Hollow Knight", playtime_forever: 0 },
      { appid: 1145360, name: "Hades", playtime_forever: 0 },
      { appid: 814380, name: "Sekiro: Shadows Die Twice", playtime_forever: 0 },
      { appid: 620, name: "Portal 2", playtime_forever: 0 },
      { appid: 105600, name: "Terraria", playtime_forever: 0 },
      { appid: 553850, name: "HELLDIVERS 2", playtime_forever: 0, isCoop: true },
    ],
  },
  {
    id: "masochist",
    label: "El Masoquista de Soulslikes",
    tagline: "Dice que juega para relajarse después del trabajo. Muere 90 veces por noche.",
    badge: "Alta Presión Arterial",
    friendName: "Lautaro_Souls",
    profile: {
      steamId: "76561198099887766",
      personaName: "SoloRuedoSinEscudo",
      avatarUrl:
        "https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg",
      profileUrl: "https://steamcommunity.com/",
      accountAgeYears: 6,
      countryCode: "ES",
      isDemo: true,
      demoArchetype: "Adicto al Sufrimiento Voluntario",
    },
    rawGames: [
      { appid: 1245620, name: "ELDEN RING", playtime_forever: 38400, playtime_2weeks: 890, achievementPercentage: 91 }, // 640h
      { appid: 814380, name: "Sekiro: Shadows Die Twice", playtime_forever: 12600, achievementPercentage: 84 }, // 210h
      { appid: 367520, name: "Hollow Knight", playtime_forever: 9300, achievementPercentage: 89 }, // 155h
      { appid: 1145360, name: "Hades", playtime_forever: 7200, achievementPercentage: 76 }, // 120h
      { appid: 570, name: "Dota 2", playtime_forever: 54000, achievementPercentage: 50 }, // 900h
      { appid: 1086940, name: "Baldur's Gate 3", playtime_forever: 65, estimatedPriceUsd: 59.99, achievementPercentage: 3 },
      { appid: 242760, name: "The Forest", playtime_forever: 0, isCoop: true },
      { appid: 2881650, name: "Content Warning", playtime_forever: 20, isCoop: true },
      { appid: 413150, name: "Stardew Valley", playtime_forever: 0 },
      { appid: 292030, name: "The Witcher 3: Wild Hunt", playtime_forever: 0 },
    ],
  },
  {
    id: "cozy_indie",
    label: "Granjitas y Caos Co-op",
    tagline: "Compra todos los cooperativos de moda con sus amigos. Juegan una sola noche.",
    badge: "Promesas Rotas",
    friendName: "Sofi_AFK",
    profile: {
      steamId: "76561198112233445",
      personaName: "CosechaDeMedianoche",
      avatarUrl:
        "https://avatars.steamstatic.com/c5d56249ee5d28a07db4ac9f7f60af961fab5426_full.jpg",
      profileUrl: "https://steamcommunity.com/",
      accountAgeYears: 5,
      countryCode: "MX",
      isDemo: true,
      demoArchetype: "Ilusionista de Fines de Semana Co-op",
    },
    rawGames: [
      { appid: 413150, name: "Stardew Valley", playtime_forever: 31200, playtime_2weeks: 610, achievementPercentage: 86 }, // 520h
      { appid: 2379780, name: "Balatro", playtime_forever: 14400, playtime_2weeks: 380, achievementPercentage: 79 }, // 240h
      { appid: 105600, name: "Terraria", playtime_forever: 10800, achievementPercentage: 74 }, // 180h
      { appid: 1623730, name: "Palworld", playtime_forever: 4200, achievementPercentage: 69 }, // 70h
      { appid: 1174180, name: "Red Dead Redemption 2", playtime_forever: 50, estimatedPriceUsd: 59.99, achievementPercentage: 2 },
      { appid: 553850, name: "HELLDIVERS 2", playtime_forever: 45, estimatedPriceUsd: 39.99, isCoop: true },
      { appid: 1326470, name: "Sons Of The Forest", playtime_forever: 0, estimatedPriceUsd: 29.99, isCoop: true },
      { appid: 739630, name: "Phasmophobia", playtime_forever: 30, estimatedPriceUsd: 19.99, isCoop: true },
      { appid: 1966720, name: "Lethal Company", playtime_forever: 55, estimatedPriceUsd: 9.99, isCoop: true },
      { appid: 1091500, name: "Cyberpunk 2077", playtime_forever: 0 },
      { appid: 1245620, name: "ELDEN RING", playtime_forever: 0 },
    ],
  },
];

export function getDemoAnalyticsReport(presetId: string): SteamAnalyticsReport {
  const preset =
    DEMO_PRESETS.find((p) => p.id === presetId) || DEMO_PRESETS[0];
  const enrichedGames = preset.rawGames.map((g) => enrichRawSteamGame(g));
  return buildSteamAnalyticsReport(
    preset.profile,
    enrichedGames,
    [
      {
        steamId: "76561198000000001",
        personaName: preset.friendName,
        avatarUrl:
          "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
        games: preset.rawGames.map((g) => ({
          appid: g.appid,
          name: g.name,
          playtime_forever: g.playtime_forever,
        })),
      },
    ]
  );
}
