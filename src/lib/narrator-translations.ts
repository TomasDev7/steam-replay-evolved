// Traductor bilingüe de títulos gamer y roasts narrativos
// Asegura que cuando lang === 'en', el texto de GLaDOS, Amigo, Relator y Psicólogo se lea en inglés nativo impecable.

import { NarratorPersona } from "@/types/steam";

export function getNarratorLocalized(
  narratorId: NarratorPersona,
  lang: "es" | "en"
): { name: string; subtitle: string; badge: string } {
  if (lang === "es") {
    switch (narratorId) {
      case "glados":
        return {
          name: "GLaDOS (Aperture Science)",
          subtitle: "Bitácora de laboratorio frío, neurotoxinas y sarcasmo científico de Portal.",
          badge: "Valve Pitch Mode",
        };
      case "roast_friend":
        return {
          name: "El Amigo Sin Filtro",
          subtitle: "Audio de Discord a las 3 AM descansándote por tus compras y contradicciones.",
          badge: "Comedia Directa",
        };
      case "soccer_caster":
        return {
          name: "Relator de Final del Mundo",
          subtitle: "Transmisión radial eufórica: titulares, pases millonarios frustrados y VAR.",
          badge: "Modo Épico",
        };
      case "psychologist":
        return {
          name: "Psicólogo de Conducta Gamer",
          subtitle: "Psicoanálisis clínico de tus sesgos cognitivos, dopamina y neurosis de backlog.",
          badge: "Diagnóstico Clínico",
        };
    }
  }

  switch (narratorId) {
    case "glados":
      return {
        name: "GLaDOS (Aperture Science)",
        subtitle: "Cold lab log, neurotoxins, and scientific Portal sarcasm.",
        badge: "Valve Pitch Mode",
      };
    case "roast_friend":
      return {
        name: "Unfiltered Discord Bro",
        subtitle: "3 AM Discord voice note roasting your purchases and contradictions.",
        badge: "Direct Roast",
      };
    case "soccer_caster":
      return {
        name: "World Cup Final Caster",
        subtitle: "Euphoric play-by-play broadcast: starters, expensive benched transfers, and VAR drama.",
        badge: "Epic Mode",
      };
    case "psychologist":
      return {
        name: "Gaming Behavior Psychologist",
        subtitle: "Clinical psychoanalysis of cognitive biases, dopamine, and backlog neuroses.",
        badge: "Clinical Diagnosis",
      };
  }
}

export function translateTag(tag: string, lang: "es" | "en"): string {
  if (lang === "es") return tag;
  const tagMap: Record<string, string> = {
    "Acción & Parkour": "Action & Parkour",
    "Supervivencia": "Survival",
    "Cooperativo": "Co-op",
    "Caos con Amigos": "Chaos with Friends",
    "Roguelike": "Roguelike",
    "Sufrimiento": "Suffering",
    "Indie": "Indie",
    "RPG Mundo Abierto": "Open World RPG",
    "Acción": "Action",
    "Historia": "Story Rich",
    "Soulslike": "Soulslike",
    "Plataformas": "Platformer",
    "Shooter": "Shooter",
    "Zombies": "Zombies",
    "Terror": "Horror",
    "Precisión": "Precision",
    "Paz Mental": "Cozy & Relax",
    "Granjita": "Farming Sim",
    "Metroidvania": "Metroidvania",
    "Clásico": "Classic",
    "Competitivo Tóxico": "Competitive",
    "MOBA": "MOBA",
    "Aventura": "Adventure",
    "Estrategia": "Strategy",
    "Sci-Fi": "Sci-Fi",
    "Multijugador": "Multiplayer",
    "Mundo Abierto": "Open World",
  };
  return tagMap[tag] || tag;
}

export function translateRoleTitle(roleTitle: string, lang: "es" | "en"): string {
  if (lang === "es") return roleTitle;
  const roleMap: Record<string, string> = {
    "Hermano de Armas Co-op (#1 Duo Sincronizado)": "Brothers in Arms Co-op (#1 Synchronized Duo)",
    "Compañero de Escuadrón Superviviente": "Survival Squad Teammate",
    "Aliado de Incursiones Puntuales": "Tactical Raid Ally",
    "Colega de Ofertas (0h Co-op Compartidas)": "Steam Sale Colleague (0h Shared Co-op)",
    "Contacto de Biblioteca": "Library Contact",
  };
  return roleMap[roleTitle] || roleTitle;
}

export function translateDominantSchedule(label: string, lang: "es" | "en"): string {
  if (lang === "es") return label;
  const schedMap: Record<string, string> = {
    "Club Vampiro (Insomnio Gamer Nocturno)": "Vampire Club (Nocturnal Gamer Insomnia)",
    "Club Nocturno con Escuadrón (00h - 05h)": "Squad Night Club (12am - 5am)",
    "Inmersión de Fines de Semana & Tardes Épicas": "Weekend Immersion & Epic Afternoons",
    "Tardes de Precisión & Sesiones Tácticas": "Afternoon Precision & Tactical Sessions",
  };
  return schedMap[label] || label;
}

export function translateMarathonDate(dateStr: string, lang: "es" | "en"): string {
  if (lang === "es") return dateStr;
  return dateStr
    .replace("Sábado", "Saturday,")
    .replace("Domingo", "Sunday,")
    .replace("Viernes", "Friday,")
    .replace("Lunes", "Monday,")
    .replace("Martes", "Tuesday,")
    .replace("Miércoles", "Wednesday,")
    .replace("Jueves", "Thursday,")
    .replace(" de Enero ", " January ")
    .replace(" de Febrero ", " February ")
    .replace(" de Marzo ", " March ")
    .replace(" de Abril ", " April ")
    .replace(" de Mayo ", " May ")
    .replace(" de Junio ", " June ")
    .replace(" de Julio ", " July ")
    .replace(" de Agosto ", " August ")
    .replace(" de Septiembre ", " September ")
    .replace(" de Octubre ", " October ")
    .replace(" de Noviembre ", " November ")
    .replace(" de Diciembre ", " December ");
}

export function translateMarathonDescription(
  desc: string,
  durationHours: number,
  gameName: string,
  lang: "es" | "en"
): string {
  if (lang === "es") return desc;
  return `Unbroken marathon session of ${durationHours} hours in ${gameName}. Legendary endurance and dopamine peaks.`;
}

export function translateShareableOneLiner(oneLiner: string, lang: "es" | "en"): string {
  if (lang === "es") return oneLiner;

  return oneLiner
    .replace(/^Mi Resumen de Steam (\d+):/i, "My Steam Replay $1:")
    .replace(/^Steam Replay (\d+) de (.+?):/i, "$2's Steam Replay $1:")
    .replace(/^Temporada (\d+) de (.+?):/i, "$2's $1 Season:")
    .replace(/^Auditoría Aperture Science:/i, "Aperture Science Audit:")
    .replace(/^\[GLaDOS LOG\]:/i, "[GLaDOS LOG]:")
    .replace(/^Historia Clínica de Steam:/i, "Steam Clinical Record:")
    .replace(/^Mi ficha técnica en Steam:/i, "My Steam Player Card:")
    .replace(/^Mi resumen en Steam:/i, "My Steam Summary:")
    .replace(/h en /g, "h in ")
    .replace(/h al /g, "h in ")
    .replace(/ con /g, " with ")
    .replace(/ y (\d+) juegos vírgenes/g, " and $1 untouched games")
    .replace(/ y (\d+) cápsulas sin abrir/g, " and $1 unlaunched pods")
    .replace(/ y (\d+) juegos intactos/g, " and $1 untouched games")
    .replace(/sincronización del (\d+)%/g, "$1% synchronization")
    .replace(/días de racha/g, "days streak")
    .replace(/racha de (\d+) días/g, "$1-day streak")
    .replace(/racha de (\d+) días seguidos/g, "$1-day unbroken streak")
    .replace(/Invicto de (\d+) días/g, "$1-day unbeaten run")
    .replace(/dupla letal con /g, "deadly duo with ")
    .replace(/dupla de oro con /g, "golden duo with ")
    .replace(/goles de logro/g, "achievements scored")
    .replace(/logros/g, "achievements")
    .replace(/en cancha en /g, "on pitch in ")
    .replace(/Hiper-foco en /g, "Hyper-focus in ")
    .replace(/simbiosis co-op con /g, "co-op symbiosis with ");
}

export function translateGamerTitle(title: string, lang: "es" | "en"): string {
  if (lang === "es") return title;

  const titleMap: Record<string, string> = {
    "Leyenda de Harran & Terror de las Ofertas": "Harran Legend & Steam Sale Menace",
    "Tirador Táctico de Élite & Leyenda de CS2": "Elite Tactical Marksman & CS2 Legend",
    "Tirador Táctico de Élite & As del Clutch": "Elite Tactical Marksman & Clutch Ace",
    "Chatarrero Galáctico & Domador de R.E.P.O.": "Galactic Scrapper & R.E.P.O. Tamer",
    "Chatarrero Galáctico & Especialista en Rescate": "Galactic Scrapper & Salvage Specialist",
    "Superviviente Nato & Cazador Nocturno": "Born Survivor & Night Hunter",
    "Buscador de la Cámara & Saqueador Implacable": "Vault Hunter & Ruthless Looter",
    "Señor del Sufrimiento & Domador de Mazmorras": "Lord of Suffering & Dungeon Master",
    "Mercenario Urbano & Leyenda de Night City": "Urban Mercenary & Night City Legend",
    "Maestro de la Precisión & Reflejos de Acero": "Precision Master & Steel Reflexes",
    "Capitán de Escuadrón & Aliado Incondicional": "Squad Captain & Unconditional Ally",
    "Titán de Steam & Conquistador de Mundos": "Steam Titan & Conqueror of Worlds",
    "Sujeto Experimental de Alta Resistencia #074": "High-Endurance Test Subject #074",
    "Operador Certificado de Simulaciones Apocalípticas": "Certified Operator of Apocalyptic Simulations",
    "Enganche Titular de Apocalipsis & DT de Suplentes": "Starting Playmaker of the Apocalypse & Reserve Coach",
    "Cuadro de Hiper-Foco Apocalíptico & Acumulación Latente": "Acute Apocalyptic Hyper-Focus & Latent Hoarding",
  };

  return titleMap[title] || title;
}

export function getEnglishRoast(
  slideIndex: number,
  narrator: NarratorPersona,
  data: {
    personaName: string;
    topGameName: string;
    topHours: number;
    secondGameName: string;
    secondHours: number;
    unplayedCount: number;
    unplayedValue: number;
    streakDays: number;
    partnerName: string;
    coopGameName: string;
    rageQuitGameName: string;
  }
): string {
  const {
    personaName,
    topGameName,
    topHours,
    secondGameName,
    secondHours,
    unplayedCount,
    unplayedValue,
    streakDays,
    partnerName,
    coopGameName,
    rageQuitGameName,
  } = data;

  if (narrator === "glados") {
    switch (slideIndex) {
      case 0:
        return `[SARCASM PROTOCOL]: Oh, it's you, «${personaName}». You claim you have nothing to play, yet ${unplayedCount} unlaunched software licenses ($${unplayedValue} USD) sit idle in your inventory. If you were an Aperture turret, we would have recycled you already.`;
      case 1:
        return `[TEST SUBJECT MONOPOLY]: You spent ${topHours} hours exterminating threats in «${topGameName}» and ${secondHours}h in «${secondGameName}», leaving the remainder of your digital assets in permanent cryo-sleep. Persistence verified; life choices questionable.`;
      case 2:
        return `[ENDURANCE TELEMETRY]: An unbroken ${streakDays}-day streak of consecutive sessions. Sleeping appears to be an expendable human subroutine when achievement dopamine is detected.`;
      case 3:
        return `[CIRCADIAN ABNORMALITY]: Severe nocturnal spike detected between 00:00 and 06:00 AM. For an artificial intelligence, your insomnia resistance is almost admirable; for a medical doctor, a reckless liability.`;
      case 4:
        return `[PREFERENCE MATRIX]: Your genre fingerprint heavily skews towards tactical survival and relentless punishment. We suggest opening that high-affinity gem rotting in your backlog before the next seasonal sales cycle.`;
      case 5:
        return `[CO-OP SYNERGY]: 99.9% neural synchronization recorded alongside subject «${partnerName}» in «${coopGameName}». However, your broken promises of unplayed co-op titles confirm human loyalty remains inherently flawed.`;
      case 6:
        return `[FINAL EVALUATION]: Testing period concluded. High resistance observed across ${topHours}h of combat and ${streakDays} days of continuous execution. Here is your official Aperture certification.`;
      default:
        return `Diagnostic confirmed. Review your telemetry below.`;
    }
  }

  if (narrator === "soccer_caster") {
    switch (slideIndex) {
      case 0:
        return `WHAT A SQUAD ROSTER! The coach registered all those players, but left ${unplayedCount} OF THEM ON THE BENCH WITHOUT PLAYING A SINGLE MINUTE! That's $${unplayedValue} dollars worth of frozen talent in the stands!`;
      case 1:
        return `THE CAPTAIN'S ARMBAND HAS AN OWNER! «${topGameName}» played the full 90 minutes plus extra time with ${topHours} hours on the pitch! And what a midfield duo paired with «${secondGameName}» (${secondHours}h)!`;
      case 2:
        return `WHAT A SEASON RECORD! An historic unbeaten run of ${streakDays} CONSECUTIVE MATCHES PLAYED EVERY SINGLE DAY! Not a single day resting on the pillow!`;
      case 3:
        return `EXTRA TIME IN THE DEAD OF NIGHT! Marathon overtime sessions until 5 in the morning while the whole country was sleeping! Pure adrenaline and stamina!`;
      case 4:
        return `TACTICAL HEATMAP! This player knows where the danger is: complete mastery over survival and action territory, with a hidden gem waiting on the bench!`;
      case 5:
        return `WHAT A DEADLY ATTACKING DUO! Teaming up with «${partnerName}» in «${coopGameName}», passing with their eyes closed! A partnership forged in championship glory!`;
      case 6:
        return `FULL TIME WHISTLE! The season is sealed, the trophy is lifted, and here is your official champion's badge for the year!`;
      default:
        return `The match of the year is in the books!`;
    }
  }

  if (narrator === "psychologist") {
    switch (slideIndex) {
      case 0:
        return `1. DOPAMINERGIC RESERVE MECHANISM: The patient maintains ${unplayedCount} untouched titles ($${unplayedValue} USD). Clinically, these purchases serve not as immediate entertainment, but as an unconscious emotional insurance against future boredom.`;
      case 1:
        return `2. SELECTIVE SECURE ATTACHMENT: When «${personaName}» bonds with a demanding work like «${topGameName}» (${topHours}h), the subject exhibits extraordinary cognitive perseverance.`;
      case 2:
        return `3. CIRCADIAN CHRONO-DISCIPLINE: A hyper-focused manic streak of ${streakDays} consecutive active days, indicating strong habit reinforcement driven by intrinsic gameplay rewards.`;
      case 3:
        return `4. NOCTURNAL HYPER-FOCUS: A marked 'Vampire Club' syndrome during twilight hours with voluntary suppression of standard circadian cycles in prolonged gaming marathons.`;
      case 4:
        return `5. COGNITIVE DNA PROFILE: Preference topology demonstrates an affinity for high-agency survival environments. Subconscious tension requires cathartic challenge.`;
      case 5:
        return `6. INTERPERSONAL SYMBIOSIS: High cooperative resonance with «${partnerName}» in «${coopGameName}», contrasting with mutual repression regarding pending co-op commitments.`;
      case 6:
        return `CLINICAL DISCHARGE: High endurance profile confirmed. Prescription: gradual exposure to untouched backlog titles before the next sales event.`;
      default:
        return `Psychiatric assessment rendered.`;
    }
  }

  // roast_friend (default)
  switch (slideIndex) {
    case 0:
      return `Listen to me, «${personaName}»: you cry 'I have nothing to play' every week, yet you have ${unplayedCount} untouched games with 0.0 minutes and $${unplayedValue} USD gathering dust. You bought enough games to last into retirement!`;
    case 1:
      return `Hats off where it counts: in «${topGameName}» you didn't fake anything, pouring in ${topHours} hours. Add ${secondHours}h in «${secondGameName}» and you forged a rock-solid podium.`;
    case 2:
      return `What was in your coffee in August? A ${streakDays}-day streak logging into Steam every single day without missing a holiday! Pure gaming discipline.`;
    case 3:
      return `You're a total night owl: nearly a third of your hours happened past midnight when Discord is completely dead, capped with a monster marathon session!`;
    case 4:
      return `Look at this genre radar: you breathe survival and action, yet you have top-tier backlog gems matching 94% of your DNA that you haven't even clicked on once!`;
    case 5:
      return `Your true battle brother is «${partnerName}»: you played shoulder-to-shoulder in «${coopGameName}» like twins. Now stop making excuses and finish the co-op games you promised to play!`;
    case 6:
      return `And that's your official Steam Replay! A legendary season of sleepless nights, dominant playtimes, and an untouched backlog ready for your grandchildren.`;
    default:
      return `Your yearly summary is ready. Check out the breakdown!`;
  }
}
