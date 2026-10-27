import { GoogleGenAI } from "@google/genai";
import {
  AINarratedCommentary,
  NarratorPersona,
  SteamAnalyticsReport,
} from "@/types/steam";
import { generateDynamicGamerTitle } from "@/lib/steam-analytics";

const NARRATOR_SYSTEM_PROMPTS: Record<NarratorPersona, string> = {
  glados: `Sos GLaDOS de Portal (Aperture Science).
REGLA ESTRICTA: NO repitas una estructura estándar de resumen. Hablá como una bitácora de laboratorio experimental evaluando reflejos biológicos, cámaras de pruebas, neurotoxinas, supervivencia a infecciones zombies y fallos cognitivos humanos. Ignorá el valor emocional de los juegos y tratá todo como experimentos científicos fallidos.`,

  roast_friend: `Sos un amigo argentino de Discord a las 3 AM que te conoce todas las mañas.
REGLA ESTRICTA: NO hagas una lista formal de datos. Hablá con total naturalidad, focuseando en las contradicciones absurdas del jugador (ej: cómo puede aguantar 127h de zombies en Dying Light pero asustarse a los 4 minutos en Titan Souls o dejar pagando a su amigo Night en Borderlands 2).`,

  soccer_caster: `Sos un relator de fútbol sudamericano en plena transmisión radial de una final de Copa Libertadores.
REGLA ESTRICTA: Relatá todo como un partido táctico: planteo 4-3-3, el 10 titular que jugó todos los domingos de agosto, los refuerzos caros que se lesionaron en el precalentamiento, el VAR revisando compras de madrugada y la dupla de ataque con su socio en la cancha.`,

  psychologist: `Sos el Dr. Sigmund Gamer redactando un informe psiquiátrico clínico (DSM-V).
REGLA ESTRICTA: No hables como un amigo ni como un locutor. Usá terminología clínica irónica (mecanismos de evasión, dopamina intermitente, síndrome de abstinencia estacional, apego evitativo ante RPGs largos y simbiosis cooperativa).`,
};

/**
 * Generador Narrativo con 4 personalidades RADICALMENTE DISTINTAS en enfoque, estructura y vocabulario,
 * además de múltiples variaciones por personalidad para que nunca responda siempre lo mismo.
 */
export function buildDynamicLocalCommentary(
  report: SteamAnalyticsReport,
  narrator: NarratorPersona,
  variationIndex = 0
): AINarratedCommentary {
  const {
    profile,
    officialStats,
    diogenes,
    monopoly,
    walletVsLove,
    graveyardAndPsychology,
    brokenPromises,
  } = report;

  const v = variationIndex % 2; // Variación 0 o 1 para rotar ángulos completamente distintos
  const isTomas =
    profile.steamId === "76561199197888086" ||
    profile.personaName.toLowerCase().includes("7kingdoms");

  const dynamicTitle = generateDynamicGamerTitle(report);

  const topGameName = monopoly.topGame.name;
  const topHours =
    monopoly.topGame.hoursThisYear > 0
      ? monopoly.topGame.hoursThisYear
      : monopoly.topGame.playtimeHours;
  const secondGameName =
    monopoly.top5Games[1]?.name || (isTomas ? "R.E.P.O." : "Juego Secundario");
  const secondHours =
    (monopoly.top5Games[1]?.hoursThisYear || 0) > 0
      ? monopoly.top5Games[1].hoursThisYear
      : monopoly.top5Games[1]?.playtimeHours || 0;
  const thirdGameName =
    monopoly.top5Games[2]?.name ||
    (isTomas ? "The Binding of Isaac: Rebirth" : "Tercer Juego");
  const thirdHours =
    (monopoly.top5Games[2]?.hoursThisYear || 0) > 0
      ? monopoly.top5Games[2].hoursThisYear
      : monopoly.top5Games[2]?.playtimeHours || 0;

  const indieName = walletVsLove.indieHero.game.name;
  const indieCph = walletVsLove.indieHero.costPerHourUsd;
  const paperName = walletVsLove.goldenPaperweight.game.name;
  const paperMins = walletVsLove.goldenPaperweight.minutesPlayed;
  const paperPrice = walletVsLove.goldenPaperweight.game.estimatedPriceUsd;

  const earlyDrop1 =
    graveyardAndPsychology.earlyDropGames[0]?.name || "The Witcher 3";
  const earlyDrop1Mins =
    graveyardAndPsychology.earlyDropGames[0]?.playtimeMinutes || 88;
  const rageQuitName =
    graveyardAndPsychology.rageQuitGem?.name || "Titan Souls";
  const rageQuitMins =
    graveyardAndPsychology.rageQuitGem?.playtimeMinutes || 4;

  const bestFriend = brokenPromises.squadFriends[0];
  const partnerName = bestFriend?.personaName || brokenPromises.partnerName;
  const topSyncedCoop =
    bestFriend?.syncedGamesPlayed[0]?.game.name || secondGameName;
  const topSyncedMyH = bestFriend?.syncedGamesPlayed[0]?.myHours || secondHours;
  const topSyncedFriendH =
    bestFriend?.syncedGamesPlayed[0]?.friendHours || secondHours;
  const brokenCoop =
    bestFriend?.brokenPromisesTogether[0]?.game.name ||
    brokenPromises.unplayedCoopGames[0]?.name ||
    "Borderlands 2";
  const brokenReason =
    bestFriend?.brokenPromisesTogether[0]?.whoLeftWhoHanging ||
    "quedó en 0.0 horas esperando el fin de semana";

  const circadian = report.gamerCircadian || {
    marathonSession: { durationHours: 8.5, game: monopoly.topGame, dateAchieved: "Sábado 15 de Agosto", description: "" },
    peakDayRecord: { date: "15 de Agosto", hours: 11.2, highlightGames: [] },
    timeOfDayDistribution: { morningPercent: 9, afternoonPercent: 23, primeTimePercent: 41, nightOwlPercent: 27 },
    dominantScheduleLabel: "Club Vampiro (Insomnio Gamer)",
    weekendVsWeekday: { weekendPercent: 64, weekdayPercent: 36 },
    averageSessionHours: 2.7,
    activeGamingDaysCount: 142,
    mostPlayedNightGame: monopoly.topGame,
  };

  // ==================== 1. GLaDOS (BITÁCORA CIENTÍFICA APERTURE SCIENCE) ====================
  if (narrator === "glados") {
    if (v === 0) {
      return {
        narrator,
        variationIndex: v,
        openingHook: `[REGISTRO DE LABORATORIO #74-AR]: Sujeto «${profile.personaName}» localizado. He monitoreado tus signos vitales durante ${officialStats.totalHoursThisYear} horas de pruebas simuladas en ${officialStats.currentYear}.`,
        slide1DiogenesRoast: `[PROTOCOLO DE ACUMULACIÓN]: Adquiriste ${diogenes.totalGames} cámaras de simulación, pero ${diogenes.unplayedCount} de ellas permanecen selladas al vacío con 0.0 minutos de uso. En Aperture Science no compramos equipamiento de pruebas para mirarlo en una estantería. Al ritmo actual de 2 horas diarias, tu esperanza de vida biológica deberá extenderse ${diogenes.yearsNeededAt2HoursPerDay} años adicionales.`,
        slide2MonopolyRoast: `[HIPER-FIJACIÓN MOTORA]: Tus reflejos en «${topGameName}» (${topHours}h, historia y DLC superados) y en «${thirdGameName}» (${thirdHours}h) sugieren una extraña tolerancia al estrés post-apocalíptico. Has recolectado ${officialStats.totalAchievementsUnlocked} medallas digitales brillantes en ${officialStats.currentYear}. Qué tierno: igual que una rata de laboratorio presionando el botón de recompensa.`,
        slide3TimelineAndStreakRoast: `[ANOMALÍA CIRCADIANA — AGOSTO ${officialStats.currentYear}]: Entre el ${officialStats.streakStartDate} y el ${officialStats.streakEndDate} registraste ${officialStats.longestStreakDays} ciclos solares consecutivos frente al monitor sin contacto con la fotosíntesis. Tus niveles de vitamina D cayeron un 84% mientras corrías por los techos en Dying Light.`,
        slide4WalletRoast: `[CRONOBIOLOGÍA APERTURE]: Tus sensores biométricos revelan que el ${circadian.timeOfDayDistribution.nightOwlPercent}% de tus decisiones ocurrieron entre la medianoche y las 06:00 hs en «${circadian.mostPlayedNightGame.name}». Además, tu maratón de ${circadian.marathonSession.durationHours} horas continuas un sábado confirma que tu concepto de 'descanso biológico' es una variable totalmente descartable.`,
        slide5PsychologyAndDropsRoast: `[UMBRAL DE FRUSTRACIÓN]: Es científicamente contradictorio que sobrevivas cientos de horas a hordas letales en «${topGameName}», pero tu sistema nervioso haya colapsado tras apenas ${rageQuitMins} minutos en «${rageQuitName}» y ${earlyDrop1Mins} minutos en «${earlyDrop1}». Al parecer le temés más a los diálogos largos que a los zombies.`,
        slide6CoopPromiseRoast: `[SIMBIOSIS DE SUJETOS DE PRUEBA]: Mis sensores confirman una sincronización neuronal del 99.9% con el sujeto «${partnerName}» en «${topSyncedCoop}» (${topSyncedMyH}h vs ${topSyncedFriendH}h). Sin embargo, el protocolo cooperativo «${brokenCoop}» fue abandonado (${brokenReason}). La lealtad humana sigue siendo defectuosa.`,
        finalCertificate: {
          gamerTitle: isTomas
            ? "Sujeto Experimental de Alta Resistencia #074"
            : dynamicTitle,
          crimeDescription: `Sobrevivir ${topHours}h en ${topGameName}, sincronizarse con ${partnerName} en ${topSyncedCoop} y abortar ${rageQuitName} a los ${rageQuitMins} minutos.`,
          prescription:
            "Iniciar cámara de pruebas pendiente en tu propio inventario antes de solicitar nuevos fondos.",
          shareableOneLiner: `[GLaDOS LOG]: ${topHours}h en ${topGameName}, sincronización del 99% con ${partnerName} en ${topSyncedCoop} y ${diogenes.unplayedCount} cápsulas sin abrir.`,
        },
      };
    } else {
      return {
        narrator,
        variationIndex: v,
        openingHook: `[RE-CALIBRANDO SENSORES DE SARCASMO]: Oh, seguís acá, «${profile.personaName}». Revisemos tu expediente desde otro ángulo antes de liberar las neurotoxinas.`,
        slide1DiogenesRoast: `De tus ${diogenes.totalGames} programas instalados o licenciados, el ${diogenes.unplayedPercentage}% jamás recibió un solo clic. Si fueras una torreta de Aperture Science, ya te habríamos reciclado por tener $${diogenes.unplayedValueUsd} USD de munición sin disparar.`,
        slide2MonopolyRoast: `Tu obsesión con «${topGameName}» (${topHours}h) y «${secondGameName}» (${secondHours}h) acaparó toda tu capacidad de procesamiento, dejando ${monopoly.ignoredGamesCount} simulaciones en estado de hibernación permanente.`,
        slide3TimelineAndStreakRoast: `Tu curva de actividad de ${officialStats.currentYear} arrancó en el invierno nuclear de Metro Exodus en enero y explotó en agosto con ${officialStats.longestStreakDays} días ininterrumpidos de actividad. Dormir es opcional para sujetos descartables.`,
        slide4WalletRoast: `Detecto una anomalía circadiana severa: el ${circadian.weekendVsWeekday.weekendPercent}% de tu actividad se concentra los fines de semana con sesiones maratónicas de ${circadian.marathonSession.durationHours}h seguidas. Para una IA, tu resistencia al sueño es casi admirable; para un médico, una negligencia flagrante.`,
        slide5PsychologyAndDropsRoast: `Completaste el contenido adicional de «${topGameName}», lo cual prueba que tenés paciencia selectiva. Pero abandonar «${earlyDrop1}» a los ${earlyDrop1Mins} minutos confirma que tu atención dura menos que un cubo de compañía en un incinerador.`,
        slide6CoopPromiseRoast: `Tu expediente cooperativo con «${partnerName}» registra una coordinación milimétrica en «${topSyncedCoop}», empañada únicamente por el abandono mutuo de «${brokenCoop}».`,
        finalCertificate: {
          gamerTitle: isTomas
            ? "Operador Certificado de Simulaciones Apocalípticas"
            : dynamicTitle,
          crimeDescription: `Acumular ${officialStats.totalAchievementsUnlocked} logros ignorando un tercio de su propio catálogo.`,
          prescription: "Ejecutar Metro: Last Light (0.0h) de manera inmediata.",
          shareableOneLiner: `Auditoría Aperture Science: ${officialStats.totalHoursThisYear}h en ${officialStats.currentYear}, ${officialStats.longestStreakDays} días de racha y ${diogenes.unplayedCount} juegos intactos.`,
        },
      };
    }
  }

  // ==================== 2. RELATOR DE FÚTBOL SUDAMERICANO ====================
  if (narrator === "soccer_caster") {
    if (v === 0) {
      return {
        narrator,
        variationIndex: v,
        openingHook: `¡HOLA QUÉ TAL, CÓMO LES VA! ¡Se abren las puertas del Monumental de Valve para recibir la temporada ${officialStats.currentYear} de «${profile.personaName}»!`,
        slide1DiogenesRoast: `¡MIRÁ LA LISTA DE BUENA FE QUE PRESENTÓ ESTE TÉCNICO! ¡Anotó ${diogenes.totalGames} jugadores en el plantel, pero dejó a ${diogenes.unplayedCount} (${diogenes.unplayedPercentage}%) COMIENDO BANCO TODO EL CAMPEONATO SIN ENTRAR NI UN SEGUNDO! ¡Son $${diogenes.unplayedValueUsd} dólares de pase congelados en la tribuna!`,
        slide2MonopolyRoast: `¡LA CINTA DE CAPITÁN TIENE DUEÑO! ¡«${topGameName}» jugó los 90 minutos más el alargue (campaña y DLC adentro) con ${topHours} horas en cancha y ${monopoly.topGame.achievementsUnlocked} goles de logro! ¡Y ojo con el doble cinco que armó con «${secondGameName}» (${secondHours}h) y «${thirdGameName}» (${thirdHours}h)!`,
        slide3TimelineAndStreakRoast: `¡ATENCIÓN CON EL FIXTURE DE LA TEMPORADA ${officialStats.currentYear}! Arrancó la pretemporada en enero con Metro Exodus, en julio se fue de gira con Cyberpunk y en agosto metió un invicto histórico de ¡${officialStats.longestStreakDays} PARTIDOS SEGUIDOS JUGANDO TODOS LOS DÍAS! ¡No concentró ni un día en la almohada!`,
        slide4WalletRoast: `¡TREMENDA PRÓRROGA DE MADRUGADA SE MANDÓ ESTE TITULAR! ¡Metió una maratón de ${circadian.marathonSession.durationHours} horas seguidas sin pedir agua ni cambio en «${circadian.marathonSession.game.name}»! ¡A las cuatro de la mañana, mientras el país dormía, este pibe seguía clavando tiros al ángulo en el Club Vampiro!`,
        slide5PsychologyAndDropsRoast: `¡PIDO VAR, SEÑOR JUEZ! ¿Cómo puede ser que un jugador que deja el alma ${topHours} horas en «${topGameName}» me tire la camiseta a los ${earlyDrop1Mins} minutos en «${earlyDrop1}» y se haga expulsar a los ¡${rageQuitMins} MINUTOS! en «${rageQuitName}»? ¡No había ni transpirado la casaca!`,
        slide6CoopPromiseRoast: `¡PERO MIRÁ QUÉ SOCIEDAD DE ATAQUE ENCONTRAMOS EN LA CANCHA! ¡Con «${partnerName}» jugaron de memoria en «${topSyncedCoop}»: ${topSyncedMyH} horas para vos y ${topSyncedFriendH} horas para él, tirando paredes con los ojos cerrados! Eso sí: en «${brokenCoop}» (${brokenReason}) dejaron la pelota sin tocar en el vestuario.`,
        finalCertificate: {
          gamerTitle: isTomas
            ? "Enganche Titular de Apocalipsis & DT de Suplentes"
            : dynamicTitle,
          crimeDescription: `Dar la vuelta olímpica en ${topGameName} (${topHours}h) con ${partnerName}, pero sacar a ${earlyDrop1} a los ${earlyDrop1Mins} minutos del primer tiempo.`,
          prescription:
            "Hacer debutar a los suplentes que todavía no pisaron el césped.",
          shareableOneLiner: `Temporada ${officialStats.currentYear} de ${profile.personaName}: Invicto de ${officialStats.longestStreakDays} días, dupla letal con ${partnerName} y ${officialStats.totalAchievementsUnlocked} goles de logro.`,
        },
      };
    } else {
      return {
        narrator,
        variationIndex: v,
        openingHook: `¡SEGUNDO TIEMPO EN MARCHA PARA «${profile.personaName}»! ¡Repasamos la pizarra táctica de un jugador que no negocia la intensidad!`,
        slide1DiogenesRoast: `¡El presidente del club Gabe Newell se frota las manos! ¡Le compraste ${diogenes.unplayedCount} refuerzos que siguen con el bolso armado sin debutar! ¡Necesitás ${diogenes.yearsNeededAt2HoursPerDay} años de contrato para ponerlos a todos!`,
        slide2MonopolyRoast: `¡El tridente ofensivo de tu cuenta fue letal: «${topGameName}», «${secondGameName}» y «${thirdGameName}» se llevaron todos los flashes y premios de la temporada!`,
        slide3TimelineAndStreakRoast: `¡Agosto de ${officialStats.currentYear} quedó en los libros dorados del club con ${officialStats.longestStreakDays} fechas al hilo transpirando el joystick y el teclado!`,
        slide4WalletRoast: `¡FÍSICO PRIVILEGIADO TIENE ESTE JUGADOR! ¡Clavó el récord del torneo: ${circadian.peakDayRecord.hours} horas en un solo día (${circadian.peakDayRecord.date}) y ${circadian.marathonSession.durationHours}h sin sentarse al banco! ¡El preparador físico ya no sabe cómo mandarlo a dormir!`,
        slide5PsychologyAndDropsRoast: `¡Contra los rivales difíciles te agrandás y ganás por penales, pero a «${rageQuitName}» le rescindiste el contrato a los ${rageQuitMins} minutos de haber firmado!`,
        slide6CoopPromiseRoast: `¡La hinchada pide de pie otro torneo junto a «${partnerName}» después de las ${topSyncedMyH}h históricas que metieron en «${topSyncedCoop}»!`,
        finalCertificate: {
          gamerTitle: isTomas
            ? `Bicampeón de Supervivencia Cooperativa ${officialStats.currentYear}`
            : dynamicTitle,
          crimeDescription: `Meter ${officialStats.longestStreakDays} días de racha en agosto y dejar a ${brokenCoop} fuera de la convocatoria.`,
          prescription: "Convocar a Borderlands 2 y Metro: Last Light para la próxima fecha.",
          shareableOneLiner: `Mi ficha técnica en Steam: ${officialStats.totalHoursThisYear}h en cancha en ${officialStats.currentYear}, ${officialStats.totalAchievementsUnlocked} logros y dupla de oro con ${partnerName}.`,
        },
      };
    }
  }

  // ==================== 3. DR. SIGMUND GAMER (INFORME CLÍNICO PSIQUIÁTRICO) ====================
  if (narrator === "psychologist") {
    return {
      narrator,
      variationIndex: v,
      openingHook: `INFORME CLÍNICO CONFIDENCIAL — Paciente: «${profile.personaName}». Motivo de consulta: ${officialStats.totalHoursThisYear} horas de inmersión en ${officialStats.currentYear}.`,
      slide1DiogenesRoast: `1. MECANISMO DE RESERVA DOPAMINÉRGICA: El paciente conserva ${diogenes.unplayedCount} títulos intactos (${diogenes.unplayedPercentage}% de su inventario). Clínicamente, el sujeto no compra estos juegos para jugarlos hoy, sino como un "seguro contra el aburrimiento futuro" que requeriría ${diogenes.yearsNeededAt2HoursPerDay} años de aislamiento para consumirse.`,
      slide2MonopolyRoast: `2. APEGO SEGURO SELECTIVO: Contrario al jugador impulsivo promedio, cuando «${profile.personaName}» establece un vínculo con una obra exigente —como «${topGameName}» (${topHours}h, historia y DLC finalizados) o «${thirdGameName}» (${thirdHours}h)— demuestra una notable perseverancia cognitiva.`,
      slide3TimelineAndStreakRoast: `3. CRONOBIOLOGÍA ${officialStats.currentYear}: El pico maníaco de actividad se registró en agosto con una racha ininterrumpida de ${officialStats.longestStreakDays} días consecutivos, seguida de una transición en octubre hacia el castigo autoimpuesto en «${thirdGameName}» y «Black Myth: Wukong».`,
      slide4WalletRoast: `4. CRONOBIOLOGÍA DEL INSOMNIO: El paciente padece el síndrome del 'Club Vampiro', registrando el ${circadian.timeOfDayDistribution.nightOwlPercent}% de su actividad neuronal entre las 00:00 y las 06:00 hs. La maratón ininterrumpida de ${circadian.marathonSession.durationHours} horas en «${circadian.marathonSession.game.name}» evidencia un estado de hiper-foco dopaminérgico con anulación voluntaria del ciclo circadiano estándar.`,
      slide5PsychologyAndDropsRoast: `5. PARADOJA DEL UMBRAL DE TOLERANCIA: Resulta fascinante cómo el paciente tolera cientos de horas de tensión extrema frente a hordas zombies, pero activa una respuesta de huida inmediata ante «${rageQuitName}» (${rageQuitMins} min) o la densidad narrativa inicial de «${earlyDrop1}» (${earlyDrop1Mins} min).`,
      slide6CoopPromiseRoast: `6. VÍNCULO INTERPERSONAL («${partnerName}»): Se evidencia una simbiosis cooperativa extraordinaria en «${topSyncedCoop}» (${topSyncedMyH}h vs ${topSyncedFriendH}h), contrastando con la negación compartida respecto a «${brokenCoop}» (${brokenReason}).`,
      finalCertificate: {
        gamerTitle: isTomas
          ? "Cuadro de Hiper-Foco Apocalíptico & Acumulación Latente"
          : dynamicTitle,
        crimeDescription: `Simbiosis de ${topSyncedMyH}h con ${partnerName} en ${topSyncedCoop} y rechazo agudo a ${earlyDrop1} (${earlyDrop1Mins}m).`,
        prescription:
          "Exposición gradual a los juegos ya adquiridos antes de abrir la tienda en las próximas rebajas.",
        shareableOneLiner: `Historia Clínica de Steam: Hiper-foco en ${topGameName} (${topHours}h), racha de ${officialStats.longestStreakDays} días y simbiosis co-op con ${partnerName}.`,
      },
    };
  }

  // ==================== 4. EL AMIGO SIN FILTRO (DISCORD A LAS 3 AM) ====================
  if (isTomas) {
    if (v === 0) {
      return {
        narrator: "roast_friend",
        variationIndex: v,
        openingHook: `Escuchame una cosa, «${profile.personaName}»: entré a revisar tus números reales de ${officialStats.currentYear} y hay cosas que te las tengo que decir en la cara porque tus amigos no se animan.`,
        slide1DiogenesRoast: `Tenés **${diogenes.unplayedCount} juegos con 0.0 minutos** de los ${diogenes.totalGames} de tu cuenta. ¡Literalmente tenés el *Metro: Last Light*, el *Borderlands 2* y el *7 Days to Die* comprados sin abrir jamás! Te armaste un colchón de $${diogenes.unplayedValueUsd} dólares para cuando te jubiles dentro de **${diogenes.yearsNeededAt2HoursPerDay} años**.`,
        slide2MonopolyRoast: `Acá me saco el sombrero: en **«${topGameName}»** no chamuyaste a nadie, te pasaste la historia, el DLC y le clavaste **${topHours} horas** con ${monopoly.topGame.achievementsUnlocked} logros. Y entre eso, las **${secondHours}h al «${secondGameName}»** y las **${thirdHours}h llorando en el «${thirdGameName}»**, te armaste un podio de fierro.`,
        slide3TimelineAndStreakRoast: `¿Me querés explicar qué te pasó en **agosto de ${officialStats.currentYear}**? Metiste **${officialStats.longestStreakDays} días seguidos conectándote a Steam** sin fallar ni un feriado, saltando entre *Dying Light*, *R.E.P.O.* y *Geometry Dash*. Y ahora en octubre cerraste a puro sufrimiento con *Isaac* y *Wukong*.`,
        slide4WalletRoast: `Sos un vampiro total, hermano: casi el 30% de tus horas las metiste de madrugada cuando ya no te contesta ni el bot de Discord. Y esa maratón de **${circadian.marathonSession.durationHours} horas clavadas** un sábado en **«${circadian.marathonSession.game.name}»**... decime la verdad, ¿te acordaste de tomar agua o te alimentabas por fotosíntesis de la pantalla?`,
        slide5PsychologyAndDropsRoast: `Explicame esta contradicción: te bancás ${topHours} horas revoleando caños contra zombies en *${topGameName}* y ${secondHours}h en *${secondGameName}*, pero abriste el **«${earlyDrop1}» durante 88 minutos** y te dio fiaca seguirlo. ¿Y los **${rageQuitMins} minutos en «${rageQuitName}»**? ¡Tardaste más en descargarlo que en desinstalarlo!`,
        slide6CoopPromiseRoast: `Ahora sí hablo con pruebas en la mano: tu verdadero hermano de armas es **«${partnerName}»**. ¡Mirá lo que son esos números: vos tenés **${topSyncedMyH}h en «${topSyncedCoop}» y ${partnerName} tiene ${topSyncedFriendH}h**! Jugaron literalmente pegados. Eso sí: se compraron **«${brokenCoop}»** (${brokenReason}) y ahí lo dejaron juntando telarañas.`,
        finalCertificate: {
          gamerTitle: "Leyenda de Harran & Terror de las Ofertas",
          crimeDescription: `Clavarle ${topHours}h a ${topGameName} y ${secondHours}h a ${secondGameName} con ${partnerName}, pero durar 4 minutos en ${rageQuitName} y 88 min en ${earlyDrop1}.`,
          prescription:
            "Instalar ya mismo el Borderlands 2 (que Night le metió 141 horas y te está esperando) o el Metro: Last Light.",
          shareableOneLiner: `Mi Resumen de Steam ${officialStats.currentYear}: ${topHours}h en ${topGameName}, ${secondHours}h al ${secondGameName} con ${partnerName} y ${diogenes.unplayedCount} juegos vírgenes.`,
        },
      };
    } else {
      return {
        narrator: "roast_friend",
        variationIndex: v,
        openingHook: `Parte 2 del escrache para «${profile.personaName}», porque con una sola pasada no alcanzaba para tanta magia en esa biblioteca.`,
        slide1DiogenesRoast: `Cada vez que decís *"no tengo nada para jugar"*, hay **${diogenes.unplayedCount} juegos sin instalar** en tu cuenta que te miran en silencio. Tenés el 35% de la biblioteca intacta lista para heredar a tus nietos.`,
        slide2MonopolyRoast: `Cuando un juego te engancha de verdad sos una topadora: entre *Dying Light*, *R.E.P.O.*, *Isaac* y *Cyberpunk* juntaste más de **350 horas** y desbloqueaste una locura de logros raros.`,
        slide3TimelineAndStreakRoast: `Tu calendario ${officialStats.currentYear} no tuvo desperdicio: arrancaste enero en Rusia con *Metro Exodus*, pasaste el invierno entre *Graveyard Keeper* y *Cyberpunk*, y en agosto clavaste los famosos **${officialStats.longestStreakDays} días de racha**.`,
        slide4WalletRoast: `¡Mirá esos horarios de vicio! El ${circadian.weekendVsWeekday.weekendPercent}% de tus horas las quemaste en fines de semana y metiste un pico de ${circadian.peakDayRecord.hours} horas en un solo día. Te conozco: dijiste *"una partidita más y me voy a dormir"* y te dieron las 5 de la mañana.`,
        slide5PsychologyAndDropsRoast: `Nadie te puede decir que no terminás los juegos grandes porque al *Dying Light* le exprimiste hasta el DLC, pero ese abandono de **${rageQuitMins} minutos en «${rageQuitName}»** quedó grabado a fuego en los servidores de Valve.`,
        slide6CoopPromiseRoast: `Entre **«${partnerName}»** (con quien sos mellizo de horas en *R.E.P.O.* y *Dying Light*), **Chori097** y **laucha912**, armaron flor de escuadrón este año... salvo cuando prometieron jugar al **«${brokenCoop}»**.`,
        finalCertificate: {
          gamerTitle: "Socio Honorario de Night & Domador de Zombies",
          crimeDescription: `Sincronización del 99.9% en ${topSyncedCoop} (${topSyncedMyH}h) y fuga récord de ${rageQuitMins}m en ${rageQuitName}.`,
          prescription: "Ponerle fecha este viernes al coop pendiente con la banda.",
          shareableOneLiner: `Steam ${officialStats.currentYear} de ${profile.personaName}: ${officialStats.totalAchievementsUnlocked} logros, racha de ${officialStats.longestStreakDays} días y ${topHours}h en ${topGameName}.`,
        },
      };
    }
  } else {
    // ROAST PERSONALIZADO Y DINÁMICO PARA CUALQUIER AMIGO O CUENTA EXTERNA
    if (v === 0) {
      return {
        narrator: "roast_friend",
        variationIndex: v,
        openingHook: `Escuchame una cosa, «${profile.personaName}»: me metí a auditar tu resumen oficial de Steam ${officialStats.currentYear} y tenés estadísticas dignas de un verdadero adicto al vicio.`,
        slide1DiogenesRoast: `Tenés **${diogenes.unplayedCount} juegos con 0.0 minutos** (${diogenes.unplayedPercentage}% de tu catálogo). Comprás en rebajas como si te sobrara el sueldo y necesitás **${diogenes.yearsNeededAt2HoursPerDay} años** para jugar todo lo que acumulaste.`,
        slide2MonopolyRoast: `En **«${topGameName}»** demostraste de qué estás hecho: le metiste **${topHours} horas** en ${officialStats.currentYear} con ${monopoly.topGame.achievementsUnlocked} logros. Y sumándole las **${secondHours}h al «${secondGameName}»**, armaste tu trono del año.`,
        slide3TimelineAndStreakRoast: `¿Y esa racha de **${officialStats.longestStreakDays} días seguidos** jugando en Steam? No fallaste ni un fin de semana metiendo partidas hasta que te ardían los ojos.`,
        slide4WalletRoast: `¡Mirá esos horarios, hermano! Tu horario dominante fue **${circadian.dominantScheduleLabel}** y clavaste una maratón de **${circadian.marathonSession.durationHours} horas seguidas** en «${circadian.marathonSession.game.name}». Decime la verdad, ¿te acordaste de tomar agua ese día?`,
        slide5PsychologyAndDropsRoast: `Te bancás ${topHours} horas al palo en «${topGameName}», pero abriste **«${earlyDrop1}» por ${earlyDrop1Mins} minutos** y te dio una fiaca descomunal. ¡No tenés término medio!`,
        slide6CoopPromiseRoast: `Tu socio principal de partidas fue **«${partnerName}»**: clavaron **${topSyncedMyH}h en «${topSyncedCoop}»** jugando a la par. Eso sí, los dos sabemos que «${brokenCoop}» quedó juntando polvo.`,
        finalCertificate: {
          gamerTitle: dynamicTitle,
          crimeDescription: `Clavarle ${topHours}h a ${topGameName} y meter ${circadian.marathonSession.durationHours}h seguidas de maratón en ${circadian.marathonSession.game.name}.`,
          prescription: `Instalar alguno de los ${diogenes.unplayedCount} juegos que compraste en oferta antes de que arranque la próxima Steam Sale.`,
          shareableOneLiner: `Steam Replay ${officialStats.currentYear} de ${profile.personaName}: ${topHours}h en ${topGameName}, ${officialStats.totalAchievementsUnlocked} logros y racha de ${officialStats.longestStreakDays} días.`,
        },
      };
    } else {
      return {
        narrator: "roast_friend",
        variationIndex: v,
        openingHook: `Segunda vuelta para «${profile.personaName}», porque tu biblioteca de Steam ${officialStats.currentYear} es una obra de arte del vicio.`,
        slide1DiogenesRoast: `Decís que no tenés qué jugar pero tenés **${diogenes.unplayedCount} juegos juntando telarañas** y $${diogenes.unplayedValueUsd} USD invertidos en el backlog.`,
        slide2MonopolyRoast: `Sos una máquina cuando te enganchás: le exprimiste **${topHours} horas** a «${topGameName}» y **${secondHours}h** a «${secondGameName}» sin pedir clemencia.`,
        slide3TimelineAndStreakRoast: `Marcaste **${officialStats.longestStreakDays} días consecutivos de actividad** y acumulaste ${officialStats.totalAchievementsUnlocked} logros en ${officialStats.currentYear}. La disciplina que te falta para madrugar la tenés para viciar.`,
        slide4WalletRoast: `Tu pico récord fue de **${circadian.peakDayRecord.hours} horas en un solo día**, quemando la noche en **«${circadian.mostPlayedNightGame.name}»**. El café ya corre por tus venas.`,
        slide5PsychologyAndDropsRoast: `Le metés decenas de horas a lo que te gusta, pero a **«${rageQuitName}» le diste apenas ${rageQuitMins} minutos** antes de cerrarlo con furia. ¡Paciencia cero!`,
        slide6CoopPromiseRoast: `El escuadrón con **«${partnerName}»** dio cátedra en «${topSyncedCoop}», demostrando que cuando juegan juntos son imparables.`,
        finalCertificate: {
          gamerTitle: dynamicTitle,
          crimeDescription: `Pico de ${circadian.peakDayRecord.hours}h en un día y racha de ${officialStats.longestStreakDays} días frente al monitor.`,
          prescription: "Coordinar la próxima partida con el escuadrón y terminar el juego que abandonaste.",
          shareableOneLiner: `Mi resumen en Steam: ${officialStats.totalHoursThisYear}h en ${officialStats.currentYear}, ${topHours}h en ${topGameName} y racha de ${officialStats.longestStreakDays} días.`,
        },
      };
    }
  }
}

export async function generateSteamReplayCommentary(
  report: SteamAnalyticsReport,
  narrator: NarratorPersona,
  variationIndex = 0
): Promise<AINarratedCommentary> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || !apiKey.startsWith("AIza")) {
    return buildDynamicLocalCommentary(report, narrator, variationIndex);
  }

  try {
    const client = new GoogleGenAI({ apiKey });
    const bestFriend = report.brokenPromises.squadFriends[0];

    const compactSummaryForPrompt = {
      jugador: report.profile.personaName,
      variacionSolicitada: variationIndex,
      horasEnElAno: report.officialStats.totalHoursThisYear,
      juegosActivosEnElAno: report.officialStats.gamesPlayedThisYear.length,
      totalJuegos: report.diogenes.totalGames,
      juegosSinAbrir: report.diogenes.unplayedCount,
      juegoTop1DomadoConDLC: report.monopoly.topGame.name,
      horasTop1: report.monopoly.topGame.playtimeHours,
      juegoTop2: report.monopoly.top5Games[1]?.name,
      horasTop2: report.monopoly.top5Games[1]?.playtimeHours,
      rachaDias: report.officialStats.longestStreakDays,
      maratonRecordHoras: report.gamerCircadian?.marathonSession.durationHours || 8.5,
      maratonJuego: report.gamerCircadian?.marathonSession.game.name || report.monopoly.topGame.name,
      horasDeMadrugadaClubVampiroPorcentaje: report.gamerCircadian?.timeOfDayDistribution.nightOwlPercent || 27,
      finDeSemanaPorcentaje: report.gamerCircadian?.weekendVsWeekday.weekendPercent || 64,
      abandonoTemprano1: report.graveyardAndPsychology.earlyDropGames[0]?.name,
      minutosAbandonoTemprano1:
        report.graveyardAndPsychology.earlyDropGames[0]?.playtimeMinutes,
      rageQuitJuego: report.graveyardAndPsychology.rageQuitGem?.name,
      rageQuitMinutos:
        report.graveyardAndPsychology.rageQuitGem?.playtimeMinutes,
      mejorAmigoCoopReal: bestFriend?.personaName,
      juegoCoopSincronizadoConAmigo:
        bestFriend?.syncedGamesPlayed[0]?.game.name,
      horasJuntosCoop: bestFriend?.syncedGamesPlayed[0]?.myHours,
      promesaRotaConAmigo:
        bestFriend?.brokenPromisesTogether[0]?.game.name,
      detallePromesaRota:
        bestFriend?.brokenPromisesTogether[0]?.whoLeftWhoHanging,
    };

    const interaction = await client.interactions.create({
      model: "gemini-3.8-flash",
      system_instruction: NARRATOR_SYSTEM_PROMPTS[narrator],
      input: `Generá un guion 100% original y fiel a tu personaje (variación #${variationIndex}) usando estos datos reales verificados de ${report.officialStats.currentYear}. NOTA: slide4WalletRoast debe ser sobre sus horarios de insomnio (Club Vampiro de madrugada) y su maratón récord de horas seguidas:\n${JSON.stringify(
        compactSummaryForPrompt,
        null,
        2
      )}`,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: {
          type: "object",
          required: [
            "openingHook",
            "slide1DiogenesRoast",
            "slide2MonopolyRoast",
            "slide3TimelineAndStreakRoast",
            "slide4WalletRoast",
            "slide5PsychologyAndDropsRoast",
            "slide6CoopPromiseRoast",
            "finalCertificate",
          ],
          properties: {
            openingHook: { type: "string" },
            slide1DiogenesRoast: { type: "string" },
            slide2MonopolyRoast: { type: "string" },
            slide3TimelineAndStreakRoast: { type: "string" },
            slide4WalletRoast: { type: "string" },
            slide5PsychologyAndDropsRoast: { type: "string" },
            slide6CoopPromiseRoast: { type: "string" },
            finalCertificate: {
              type: "object",
              required: [
                "gamerTitle",
                "crimeDescription",
                "prescription",
                "shareableOneLiner",
              ],
              properties: {
                gamerTitle: { type: "string" },
                crimeDescription: { type: "string" },
                prescription: { type: "string" },
                shareableOneLiner: { type: "string" },
              },
            },
          },
        },
      },
    });

    if (interaction.output_text) {
      const parsed = JSON.parse(interaction.output_text);
      return {
        narrator,
        variationIndex,
        ...parsed,
      };
    }
  } catch (err) {
    console.warn("Usando generador narrativo local como fallback:", err);
  }

  return buildDynamicLocalCommentary(report, narrator, variationIndex);
}
