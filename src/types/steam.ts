export type NarratorPersona =
  | "glados"          // IA Sarcástica estilo Portal (Aperture Science / Brand-safe para Valve)
  | "roast_friend"    // Amigo que te descansa sin filtro (Comedia gamer directa)
  | "soccer_caster"   // Relator de fútbol sudamericano épico
  | "psychologist";   // Psicólogo clínico preocupado por tus horas de sueño

export interface NarratorConfig {
  id: NarratorPersona;
  name: string;
  subtitle: string;
  badge: string;
  accentColor: string;
  iconName: string;
  sampleQuote: string;
}

export interface SteamGameEnriched {
  appid: number;
  name: string;
  playtimeMinutes: number;
  playtimeHours: number;          // Horas históricas totales de por vida en Steam
  hoursThisYear: number;          // Horas jugadas estrictamente en el año del Replay (2026)
  playtime2WeeksMinutes?: number;
  lastPlayedUnix?: number;
  lastPlayedYear?: number;
  lastPlayedDateStr?: string;
  estimatedPriceUsd: number;
  costPerHourUsd: number;
  tags: string[];
  isCoop: boolean;
  isIndie: boolean;
  achievementsUnlocked: number;
  achievementsUnlockedThisYear?: number;
  achievementsTotal: number;
  rareAchievementsCount: number;
  achievementPercentage: number; // 0 a 100
  completionStatus: "MASTERED" | "SOLID_RUN" | "EARLY_DROP" | "UNPLAYED";
  headerImage: string;
  verticalCover: string;
  heroImage: string;
}

export interface SteamProfileSummary {
  steamId: string;
  personaName: string;
  realName?: string;
  avatarUrl: string;
  profileUrl: string;
  accountCreatedUnix?: number;
  accountAgeYears: number;
  countryCode?: string;
  isDemo?: boolean;
  demoArchetype?: string;
}

/**
 * Estadísticas Oficiales Evolucionadas (Filtradas estrictamente por el año en curso 2026 para Racha y Meses)
 */
export interface OfficialSteamStyleStats {
  currentYear: number;
  totalHoursThisYear: number;              // Horas reales jugadas estrictamente en el año del Replay
  totalHoursLifetime: number;              // Horas históricas totales de la cuenta
  gamesPlayedThisYear: SteamGameEnriched[]; // Solo juegos con sesión en el año del Replay (para el fondo en movimiento y racha)
  totalAchievementsUnlocked: number;
  rareAchievementsUnlocked: number;
  gamesPlayedCount: number;
  steamMedianGamesPlayed: number;
  steamMedianAchievements: number;
  keyboardMousePercentage: number;
  controllerPercentage: number;
  longestStreakDays: number;
  streakStartDate: string;
  streakEndDate: string;
  streakHighlightGames: SteamGameEnriched[]; // Estrictamente juegos jugados en 2026
  radarAxes: {
    axis: string;
    value: number;          // Tu puntaje 0-100
    communityMedian: number; // Media de la comunidad de Steam 0-100
    rawHours: number;
    percentage: number;     // % real del tiempo dedicado a este género
  }[];
  monthlyTimeline: {
    monthIndex: number;
    monthShort: string;
    monthName: string;
    isPlayedIn2026: boolean;
    topGame: SteamGameEnriched;
    secondaryGames: SteamGameEnriched[];
    gamesCountInMonth: number;
    estimatedHoursInMonth: number;
    achievementsInMonth: number;
    highlightNote: string;
  }[];
}

/**
 * 3. Cronobiología Gamer & Sesiones Maratónicas (Reemplazo Innovador de Amor vs. Billetera)
 */
export interface GamerCircadianMetrics {
  marathonSession: {
    durationHours: number;
    game: SteamGameEnriched;
    dateAchieved: string;
    description: string;
  };
  peakDayRecord: {
    date: string;
    hours: number;
    highlightGames: SteamGameEnriched[];
  };
  timeOfDayDistribution: {
    morningPercent: number;    // 06:00 - 12:00 (Desayuno Gamer)
    afternoonPercent: number;  // 12:00 - 18:00 (Modo Tarde)
    primeTimePercent: number;  // 18:00 - 00:00 (Prime Time Nocturno)
    nightOwlPercent: number;   // 00:00 - 06:00 (Club Vampiro / Insomnio)
  };
  dominantScheduleLabel: string; // ej: "Criatura de la Noche (Insomnio Gamer)"
  weekendVsWeekday: {
    weekendPercent: number;    // Sábados y Domingos
    weekdayPercent: number;    // Lunes a Viernes
  };
  averageSessionHours: number; // Duración media de sesión
  activeGamingDaysCount: number; // Días del año con al menos 1 sesión
  mostPlayedNightGame: SteamGameEnriched;
}

/**
 * 1. Síndrome de Diógenes Digital (Backlog y Acumulación)
 */
export interface DiogenesMetrics {
  totalGames: number;
  unplayedCount: number;
  unplayedPercentage: number;
  barelyTouchedCount: number;
  totalHoursPlayed: number;
  totalDaysPlayed: number;
  estimatedBacklogHours: number;
  yearsNeededAt2HoursPerDay: number;
  unplayedValueUsd: number;
}

/**
 * 2. El Monopolio de tu Tiempo (Top 5 interactivo)
 */
export interface MonopolyMetrics {
  topGame: SteamGameEnriched;
  topGameSharePercentage: number;
  top5Games: SteamGameEnriched[];
  ignoredGamesCount: number;
  activeThisYearCount: number;
}

/**
 * 3. Amor vs. Billetera (Auditoría Financiera Completa)
 */
export interface WalletVsLoveMetrics {
  indieHero: {
    game: SteamGameEnriched;
    costPerHourUsd: number;
  };
  goldenPaperweight: {
    game: SteamGameEnriched;
    costPerHourUsd: number;
    minutesPlayed: number;
  };
  bestInvestmentsRanking: {
    game: SteamGameEnriched;
    costPerHourUsd: number;
    roiMultiplier: number; // Cuántas veces rindió comparado con una entrada de cine ($8 USD / 2h = $4/h)
  }[];
  worstInvestmentsRanking: {
    game: SteamGameEnriched;
    costPerHourUsd: number;
    minutesPlayed: number;
  }[];
  estimatedTotalLibraryValueUsd: number;
  activeCapitalUsd: number;       // Dinero en juegos que sí amortizaste
  deadCapitalUsd: number;         // Dinero en juegos con 0m o <2h
  overallCostPerHourUsd: number;
  cinemaTicketsEquivalent: number; // A cuántas salidas al cine equivalen tus horas de vicio
}

/**
 * 4. Radar, Obras Domadas, Abandonos Reales y Recomendación del Propio Backlog
 */
export interface GraveyardAndPsychologyMetrics {
  masteredGames: SteamGameEnriched[];
  earlyDropGames: SteamGameEnriched[];
  rageQuitGem?: SteamGameEnriched;
  backlogMatchmakerGem?: {
    game: SteamGameEnriched;
    reason: string;
  };
  dominantMoodCode: "MASOCHIST" | "COZY_ESCAPIST" | "COMPETITIVE_SWEAT" | "TIME_TRAVELER" | "CHAOTIC_TOURIST";
  dominantMoodLabel: string;
  humanCategories: {
    label: string;
    hours: number;
    percentage: number;
    description: string;
  }[];
  sleepDeprivationIndex: number;
}

/**
 * 5. Cruce Real de Bibliotecas con Amigos de Steam
 */
export interface SharedCoopGameMatch {
  game: SteamGameEnriched;
  myHours: number;
  friendHours: number;
  syncPercentage: number; // Qué tan parejo jugaron los dos
}

export interface BrokenPromiseMatch {
  game: SteamGameEnriched;
  myHours: number;
  friendHours: number;
  whoLeftWhoHanging: string; // Ej: "Night le metió 141.7h y vos lo dejaste en 0.0h" o "Ambos lo compraron y ninguno llegó a 2h"
}

export interface CoopFriendSquadMember {
  steamId: string;
  personaName: string;
  avatarUrl: string;
  compatibilityScore: number;
  roleTitle: string; // Ej: "Tu Hermano de Armas Co-op" / "Cómplice de Terror"
  syncedGamesPlayed: SharedCoopGameMatch[];
  brokenPromisesTogether: BrokenPromiseMatch[];
}

export interface BrokenPromisesMetrics {
  partnerName: string;
  partnerAvatarUrl?: string;
  squadFriends: CoopFriendSquadMember[]; // Lista real de amigos analizados
  favoriteCoopPlayed?: SteamGameEnriched;
  unplayedCoopGames: SteamGameEnriched[];
  totalCoopMoneyWastedUsd: number;
}

export interface SteamAnalyticsReport {
  profile: SteamProfileSummary;
  officialStats: OfficialSteamStyleStats;
  diogenes: DiogenesMetrics;
  monopoly: MonopolyMetrics;
  walletVsLove: WalletVsLoveMetrics;
  gamerCircadian: GamerCircadianMetrics;
  graveyardAndPsychology: GraveyardAndPsychologyMetrics;
  brokenPromises: BrokenPromisesMetrics;
}

export interface AINarratedCommentary {
  narrator: NarratorPersona;
  variationIndex: number;
  openingHook: string;
  slide1DiogenesRoast: string;
  slide2MonopolyRoast: string;
  slide3TimelineAndStreakRoast: string;
  slide4WalletRoast: string;
  slide5PsychologyAndDropsRoast: string;
  slide6CoopPromiseRoast: string;
  finalCertificate: {
    gamerTitle: string;
    crimeDescription: string;
    prescription: string;
    shareableOneLiner: string;
  };
}

export interface FullReplayResponse {
  analytics: SteamAnalyticsReport;
  commentary: AINarratedCommentary;
  generatedAt: string;
  dataSource: "steam_live_api" | "demo_archetype";
}
