// Sistema de Internacionalización Completo para Steam Replay Evolved (ES / EN)
// Permite que evaluadores y reclutadores de Valve naveguen todo el resumen en inglés nativo.

export type SupportedLanguage = "es" | "en";

export interface I18nDictionary {
  clientConnected: string;
  activeSession: string;
  yearsOnSteam: string;
  activeGamesThisYear: string;
  demoArchetype: string;
  inspectOtherAccount: string;
  aiPersonality: string;
  duel1v1: string;
  volumeMute: string;
  volumeUnmute: string;
  shareOnSteam: string;
  downloadPng: string;
  rendering: string;
  copied: string;
  copyText: string;
  backToChapter1: string;
  previous: string;
  next: string;
  slideTitles: string[];
  narratorNames: {
    glados: string;
    roast_friend: string;
    soccer_caster: string;
    psychologist: string;
  };
  formats: {
    bentoHorizontal: string;
    storiesVertical: string;
    tradingCard: string;
  };
  diogenes: {
    badge: string;
    heading: string;
    unplayedCountLabel: string;
    frozenCapitalLabel: string;
    simulatorTitle: string;
    hoursPerDayLabel: string;
    yearsNeededPrefix: string;
    yearsNeededSuffix: string;
    quoteNote: string;
  };
  top5: {
    badge: string;
    heading: string;
    viewAchievements: string;
    store: string;
    library: string;
    noAchievements: string;
    hoursThisYear: string;
    totalPlaytime: string;
    shareOfTotal: string;
  };
  timeline: {
    badge: string;
    heading: string;
    longestStreakDays: string;
    consecutiveDaysNote: string;
    monthsTitle: string;
    inactiveMonth: string;
  };
  circadian: {
    badge: string;
    heading: string;
    marathonDuration: string;
    peakDay: string;
    dominantSchedule: string;
  };
  radar: {
    badge: string;
    heading: string;
    dnaAnalysis: string;
    backlogGem: string;
    affinityMatch: string;
  };
  coop: {
    badge: string;
    heading: string;
    syncRate: string;
    hoursTogether: string;
    brokenPromisesTitle: string;
    brokenPromisesEmpty: string;
  };
  poster: {
    badge: string;
    heading: string;
    chooseFormat: string;
    statsOverview: string;
    hoursLabel: string;
    streakLabel: string;
    achievementsLabel: string;
    topGameLabel: string;
  };
  versus: {
    title: string;
    subtitle: string;
    squadQuickSelect: string;
    customSearchPlaceholder: string;
    fightButton: string;
    analyzing: string;
    vsBadge: string;
    categoryWins: string;
    winner: string;
    loser: string;
    tie: string;
    metricHours: string;
    metricStreak: string;
    metricAchievements: string;
    metricDiogenes: string;
    metricTopGame: string;
    juryVerdict: string;
    copyResults: string;
    copiedForDiscord: string;
    done: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, I18nDictionary> = {
  es: {
    clientConnected: "Cliente Conectado",
    activeSession: "Sesión de Steam Activa",
    yearsOnSteam: "años en Steam",
    activeGamesThisYear: "juegos activos en",
    demoArchetype: "Arquetipo Demo",
    inspectOtherAccount: "Inspeccionar otra cuenta",
    aiPersonality: "Personalidad IA:",
    duel1v1: "Duelo 1v1 Versus",
    volumeMute: "Silenciar sonido de logro",
    volumeUnmute: "Activar sonido de logro al final",
    shareOnSteam: "Compartir en Steam...",
    downloadPng: "Descargar PNG",
    rendering: "Renderizando...",
    copied: "¡Copiado!",
    copyText: "Texto",
    backToChapter1: "Volver al Capítulo 1",
    previous: "Anterior",
    next: "Siguiente",
    slideTitles: [
      "1. Resumen & Diógenes",
      "2. Top 5 & Logros",
      "3. Racha & Calendario",
      "4. Horarios & Maratones",
      "5. Radar & Matchmaker",
      "6. Escuadrón Co-op Real",
      "7. Collector Poster",
    ],
    narratorNames: {
      glados: "GLaDOS",
      roast_friend: "Amigo",
      soccer_caster: "Relator",
      psychologist: "Psicólogo",
    },
    formats: {
      bentoHorizontal: "1. Bento Completo (Horizontal)",
      storiesVertical: "2. Formato Vertical (Celular 9:16)",
      tradingCard: "3. Tarjeta Resumida (Foil Card)",
    },
    diogenes: {
      badge: "AUDITORÍA DE INVENTARIO • SÍNDROME DE DIÓGENES",
      heading: "Tu Biblioteca: Comprar en Oferta vs. Jugar de Verdad",
      unplayedCountLabel: "Juegos con 0.0 Minutos",
      frozenCapitalLabel: "Inversión Congelada en Backlog",
      simulatorTitle: "Simulador de Jubilación Gamer",
      hoursPerDayLabel: "Si jugás por día:",
      yearsNeededPrefix: "Tardarías",
      yearsNeededSuffix: "años seguidos en jugar cada compra pendiente",
      quoteNote: "Juegos acumulados sin un solo clic en todo el historial",
    },
    top5: {
      badge: "LOS 5 MONOPOLIOS • PODIO ANUAL",
      heading: "Tus 5 Títulos Dominantes de 2026",
      viewAchievements: "Ver Logros",
      store: "Tienda",
      library: "Biblioteca",
      noAchievements: "Este juego no cuenta con logros en Steam",
      hoursThisYear: "Horas en 2026",
      totalPlaytime: "Total Histórico",
      shareOfTotal: "del tiempo total del año",
    },
    timeline: {
      badge: "CALENDARIO ANUAL • RITMO DE SESIONES",
      heading: "Tu Racha Récord y Actividad Mes a Mes",
      longestStreakDays: "DÍAS CONSECUTIVOS",
      consecutiveDaysNote: "Tu racha récord jugando en Steam sin faltar un solo día en 2026",
      monthsTitle: "Actividad Mensual",
      inactiveMonth: "Sin sesiones registradas este mes",
    },
    circadian: {
      badge: "CRONOBIOLOGÍA GAMER • MARATONES",
      heading: "Horarios y Sesiones Extremas sin Parar",
      marathonDuration: "Horas Continuas de Maratón",
      peakDay: "Día Récord de Horas",
      dominantSchedule: "Horario Predilecto",
    },
    radar: {
      badge: "ADN GAMER • MAPA DE PREFERENCIAS",
      heading: "Radar de Géneros y Recomendación Inteligente",
      dnaAnalysis: "Distribución de tus Géneros Principales",
      backlogGem: "Joya Sugerida de tu Backlog",
      affinityMatch: "de coincidencia con tu perfil",
    },
    coop: {
      badge: "ESCUADRÓN CO-OP • HERMANDAD DE ARMAS",
      heading: "Con Quién Jugaste y Qué Promesas Quedaron Pendientes",
      syncRate: "Sincronización Co-op",
      hoursTogether: "Horas Juntos",
      brokenPromisesTitle: "Juegos que tenemos pero no jugamos",
      brokenPromisesEmpty: "¡No tienen promesas rotas pendientes! Han jugado todo su catálogo cooperativo.",
    },
    poster: {
      badge: "CERTIFICADO OFICIAL • RESUMEN DE TEMPORADA",
      heading: "Póster de Colección Listo para Descargar y Compartir",
      chooseFormat: "Elegí el formato para exportar:",
      statsOverview: "Resumen de Métricas",
      hoursLabel: "Horas 2026",
      streakLabel: "Racha Récord",
      achievementsLabel: "Logros",
      topGameLabel: "Juego #1",
    },
    versus: {
      title: "DUELO 1v1 VERSUS: CLASH DE BIBLIOTECAS",
      subtitle: "Compará tu rendimiento anual contra cualquier cuenta de Steam o de tu escuadrón",
      squadQuickSelect: "Desafiar del escuadrón:",
      customSearchPlaceholder: "Pegá cualquier SteamID64, URL de perfil o vanity URL externa...",
      fightButton: "¡Pelear!",
      analyzing: "Analizando...",
      vsBadge: "VS",
      categoryWins: "Victorias de Categoría",
      winner: "👑 GANA",
      loser: "DERROTA",
      tie: "🤝 EMPATE",
      metricHours: "Horas Jugadas en el Año",
      metricStreak: "Racha Más Larga Consecutiva",
      metricAchievements: "Logros Desbloqueados",
      metricDiogenes: "Síndrome de Diógenes (Juegos 0m)",
      metricTopGame: "Juego Monopolio #1 (Horas)",
      juryVerdict: "Veredicto del Jurado Gamer de Valve:",
      copyResults: "Copiar Resultados del Duelo",
      copiedForDiscord: "¡Copiado para Discord/Steam!",
      done: "Listo",
    },
  },
  en: {
    clientConnected: "Steam Client Connected",
    activeSession: "Active Steam Session",
    yearsOnSteam: "years on Steam",
    activeGamesThisYear: "active games in",
    demoArchetype: "Demo Archetype",
    inspectOtherAccount: "Inspect another account",
    aiPersonality: "AI Personality:",
    duel1v1: "1v1 Versus Duel",
    volumeMute: "Mute achievement sound",
    volumeUnmute: "Enable achievement chime at finale",
    shareOnSteam: "Share on Steam...",
    downloadPng: "Download PNG",
    rendering: "Rendering...",
    copied: "Copied!",
    copyText: "Text",
    backToChapter1: "Back to Chapter 1",
    previous: "Previous",
    next: "Next",
    slideTitles: [
      "1. Summary & Backlog",
      "2. Top 5 & Achievements",
      "3. Streak & Calendar",
      "4. Schedules & Marathons",
      "5. Radar & Matchmaker",
      "6. Real Co-op Squad",
      "7. Collector Poster",
    ],
    narratorNames: {
      glados: "GLaDOS",
      roast_friend: "Friend",
      soccer_caster: "Caster",
      psychologist: "Psychologist",
    },
    formats: {
      bentoHorizontal: "1. Full Bento (Horizontal)",
      storiesVertical: "2. Vertical Format (Mobile 9:16)",
      tradingCard: "3. Foil Card (Summarized)",
    },
    diogenes: {
      badge: "INVENTORY AUDIT • DIOGENES SYNDROME",
      heading: "Your Library: Buying on Sale vs. Actually Playing",
      unplayedCountLabel: "Games with 0.0 Minutes",
      frozenCapitalLabel: "Frozen Backlog Capital",
      simulatorTitle: "Gamer Retirement Simulator",
      hoursPerDayLabel: "If you play daily:",
      yearsNeededPrefix: "It would take",
      yearsNeededSuffix: "consecutive years to finish every untouched game",
      quoteNote: "Untouched purchases gathered across your full Steam history",
    },
    top5: {
      badge: "TOP 5 MONOPOLIES • ANNUAL PODIUM",
      heading: "Your 5 Dominant Titles of 2026",
      viewAchievements: "View Achievements",
      store: "Store",
      library: "Library",
      noAchievements: "This game has no achievements on Steam",
      hoursThisYear: "Hours in 2026",
      totalPlaytime: "All-Time Total",
      shareOfTotal: "of total yearly playtime",
    },
    timeline: {
      badge: "ANNUAL CALENDAR • SESSION CADENCE",
      heading: "Your Record Streak and Month-by-Month Activity",
      longestStreakDays: "CONSECUTIVE DAYS",
      consecutiveDaysNote: "Your longest continuous gaming streak on Steam in 2026",
      monthsTitle: "Monthly Activity",
      inactiveMonth: "No sessions recorded this month",
    },
    circadian: {
      badge: "GAMER CRONOBIOLOGY • MARATHONS",
      heading: "Peak Schedules and Non-Stop Marathon Sessions",
      marathonDuration: "Continuous Marathon Hours",
      peakDay: "Peak Day Hours Record",
      dominantSchedule: "Dominant Playing Schedule",
    },
    radar: {
      badge: "GAMER DNA • PREFERENCE MAP",
      heading: "Genre Radar & Smart Backlog Recommendation",
      dnaAnalysis: "Distribution of Primary Gaming Genres",
      backlogGem: "Suggested Gem from Your Backlog",
      affinityMatch: "match with your gaming DNA",
    },
    coop: {
      badge: "CO-OP SQUAD • BROTHERHOOD OF ARMS",
      heading: "Squad Mates & Broken Promises",
      syncRate: "Co-op Synchronization",
      hoursTogether: "Hours Together",
      brokenPromisesTitle: "Games we own but haven't played together",
      brokenPromisesEmpty: "No broken promises! You have played every shared co-op game in your libraries.",
    },
    poster: {
      badge: "OFFICIAL CERTIFICATE • SEASON SUMMARY",
      heading: "Collector Poster Ready to Download and Share",
      chooseFormat: "Choose export format:",
      statsOverview: "Metrics Overview",
      hoursLabel: "2026 Hours",
      streakLabel: "Record Streak",
      achievementsLabel: "Achievements",
      topGameLabel: "#1 Game",
    },
    versus: {
      title: "1v1 VERSUS DUEL: LIBRARY CLASH",
      subtitle: "Compare your yearly performance head-to-head against any Steam account or squad mate",
      squadQuickSelect: "Challenge from squad:",
      customSearchPlaceholder: "Paste any SteamID64, profile URL or vanity URL...",
      fightButton: "Fight!",
      analyzing: "Analyzing...",
      vsBadge: "VS",
      categoryWins: "Category Victories",
      winner: "👑 WINS",
      loser: "DEFEAT",
      tie: "🤝 TIE",
      metricHours: "Yearly Playtime Hours",
      metricStreak: "Longest Consecutive Streak",
      metricAchievements: "Achievements Unlocked",
      metricDiogenes: "Diogenes Syndrome (0m Games)",
      metricTopGame: "#1 Monopoly Game (Hours)",
      juryVerdict: "Valve Gamer Jury Verdict:",
      copyResults: "Copy Duel Results",
      copiedForDiscord: "Copied for Discord/Steam!",
      done: "Done",
    },
  },
};
