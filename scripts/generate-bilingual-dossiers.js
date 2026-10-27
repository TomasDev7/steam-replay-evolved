const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
} = require("docx");

function createHeaderCell(text, widthPercent = 30) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: "101827" },
    margins: { top: 140, bottom: 140, left: 160, right: 160 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: true,
            color: "66C0F4",
            size: 20,
            font: "Segoe UI",
          }),
        ],
      }),
    ],
  });
}

function createDataCell(text, widthPercent = 70, isBold = false) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: "1E293B" },
    margins: { top: 140, bottom: 140, left: 160, right: 160 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: isBold,
            color: "F8FAFC",
            size: 20,
            font: "Segoe UI",
          }),
        ],
      }),
    ],
  });
}

function createCallout(title, text, borderColor = "1A9FFF", bgColor = "0F172A") {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      left: { style: BorderStyle.SINGLE, size: 28, color: borderColor },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: bgColor },
            margins: { top: 180, bottom: 180, left: 220, right: 220 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    color: "66C0F4",
                    size: 22,
                    font: "Segoe UI",
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 90 },
                children: [
                  new TextRun({
                    text,
                    italics: true,
                    color: "CBD5E1",
                    size: 20,
                    font: "Segoe UI",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function createSectionHeading(title, subtitle = "") {
  const children = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 120 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 28,
          color: "1A9FFF",
          font: "Segoe UI",
        }),
      ],
    }),
  ];

  if (subtitle) {
    children.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: subtitle,
            italics: true,
            size: 20,
            color: "64748B",
            font: "Segoe UI",
          }),
        ],
      })
    );
  }

  return children;
}

function createBodyParagraph(text, isBold = false) {
  return new Paragraph({
    spacing: { before: 80, after: 120 },
    children: [
      new TextRun({
        text,
        size: 22,
        color: "1E293B",
        bold: isBold,
        font: "Segoe UI",
      }),
    ],
  });
}

function createBulletItem(boldPrefix, normalText) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({
        text: boldPrefix,
        bold: true,
        size: 21,
        color: "0F172A",
        font: "Segoe UI",
      }),
      new TextRun({
        text: normalText,
        size: 21,
        color: "334155",
        font: "Segoe UI",
      }),
    ],
  });
}

// ==========================================
// 1. ENGLISH DOSSIER GENERATION
// ==========================================
function buildEnglishDossier() {
  return new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Segoe UI",
            size: 22,
            color: "1E293B",
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        children: [
          // Header / Confidential Marker
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "VALVE CORPORATION • PRODUCT & ARCHITECTURE PROPOSAL",
                bold: true,
                size: 16,
                color: "64748B",
                font: "Segoe UI",
              }),
            ],
          }),

          // Cover Title
          new Paragraph({
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: "STEAM REPLAY EVOLVED",
                bold: true,
                size: 48,
                color: "0F172A",
                font: "Segoe UI",
              }),
            ],
          }),

          new Paragraph({
            spacing: { after: 360 },
            children: [
              new TextRun({
                text: "Transforming Static Annual Summaries into a Dynamic Virality, Co-op Reactivation & Backlog Monetization Engine",
                italics: true,
                size: 24,
                color: "2563EB",
                font: "Segoe UI",
              }),
            ],
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
              left: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
              right: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: "334155" },
              insideVertical: { style: BorderStyle.SINGLE, size: 2, color: "334155" },
            },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell("Document ID"),
                  createDataCell("VLV-PRD-2026-REPLAY-EVO-EN"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Author & Lead Architect"),
                  createDataCell("Tomás (7Kingdoms) • Lead Systems & Product Architect"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Target Stakeholders"),
                  createDataCell("Gabe Newell, Erik Johnson & The Steam Platform Engineering Team (Valve Corporation)"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Project Scope"),
                  createDataCell("Production Web Application, Multi-Persona AI Telemetry, 1v1 Versus Hub & Social Poster Export"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Release Date / Status"),
                  createDataCell("October 2026 • Verified Production Build (Ready for Platform Evaluation)"),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { after: 300 } }),

          // 1. Executive Summary
          ...createSectionHeading("1. Executive Summary: The Opportunity for Steam", "From Passive Telemetry to an Interactive Social Catalyst"),
          createBodyParagraph(
            "Every December, tens of millions of PC gamers eagerly open their Steam Year in Review. While Valve's visual identity and statistics are celebrated, the current implementation remains largely a passive, linear infographic. Users scroll once, see broad aggregate metrics, and close the tab without taking direct action within the Steam client, store, or friend network."
          ),
          createBodyParagraph(
            "Steam Replay Evolved reimagines the annual recap from first principles. By combining gamified storytelling, AI narrators with distinct personalities, behavioral backlog economics, cross-profile 1v1 duel matchmaking, and multi-format viral poster generation, this platform transforms dormant player data into measurable engagement, co-op session resurgence, and catalog sales."
          ),

          createCallout(
            "Core Architectural Thesis",
            "Player telemetry is only as valuable as the social and commercial actions it triggers. By gamifying self-reflection (backlog debt, 1v1 friend duels, broken co-op promises), we convert nostalgic review sessions into active gameplay sessions and store purchases."
          ),

          new Paragraph({ spacing: { after: 300 } }),

          // 2. CRITICAL SECTION: API Limitations & Architecture
          ...createSectionHeading(
            "2. Technical Transparency: Web API Constraints vs. Native Valve Telemetry",
            "Detailed Analysis of Playtime Limitations & Our Calendar-Derived Solution"
          ),
          createBodyParagraph(
            "A critical element of this presentation is total architectural transparency regarding Valve's public Web API versus internal Valve database capabilities. This section details how Steam Replay Evolved handles external constraints and why Valve's engineering team holds the key to the ultimate native implementation."
          ),

          createBodyParagraph(
            "A. The Public Steam Web API Playtime Bottleneck:",
            true
          ),
          createBulletItem(
            "Lifetime Aggregation Only: ",
            "The official public Steam Web API (specifically IPlayerService/GetOwnedGames) only exposes two playtime properties: 'playtime_forever' (total cumulative minutes played across the entire account's lifespan) and 'playtime_2weeks' (minutes in the trailing two weeks). Valve does not expose per-session timestamps or annual playtime slices to external Web API keys."
          ),
          createBulletItem(
            "Third-Party Session Privacy: ",
            "Valve's privacy architecture deliberately conceals 'rtime_last_played' and session logs on external friend libraries, making it impossible for any third-party tool to query the exact hours a friend played in a specific calendar year via standard REST endpoints."
          ),

          createBodyParagraph(
            "B. How Steam Replay Evolved Solved This Gracefully:",
            true
          ),
          createBulletItem(
            "Dual-Metric Playtime Architecture: ",
            "Rather than showing confusing or misleading data, Steam Replay Evolved establishes a dual-tier model. We use the account's verified global playtime (playtime_forever) as the absolute anchor of truth for lifetime rankings, while calibrating annual 2026 gameplay sessions based on active monthly timeline telemetry."
          ),
          createBulletItem(
            "Seasonal Playtime Calibration: ",
            "For example, in Tomás's verified account, Dying Light reflects 74.5 hours in 2026 alongside its 127.5 hours lifetime total. The UI transparently presents both figures: '74.5 hours in 2026 (127.5h all-time)', giving players a realistic seasonal picture without discarding their all-time dedication."
          ),
          createBulletItem(
            "Yearly Achievement Increments: ",
            "Similarly, the system isolates annual achievement unlocks (+14 in Dying Light, +18 in Isaac, +11 in Tiny Tina, +9 in Hollow Knight) totaling ~107 unlocked in 2026, avoiding the unrealistic inflation of showing all 778 historical achievements as if they occurred in a single season."
          ),

          createCallout(
            "The Native Valve Engineering Advantage",
            "While our external engine successfully derives and calibrates 2026 data using intelligent timeline projection, Valve's internal backend engineers have direct SQL access to raw microsecond session start/end timestamps and Steam Deck telemetry. Natively embedded inside the Steam Client, this engine would achieve 100% microsecond accuracy across all 132+ million active users with zero extrapolation."
          ),

          new Paragraph({ spacing: { after: 300 } }),

          // 3. Feature Breakdown
          ...createSectionHeading("3. Complete Feature Architecture & Innovations", "The 10 Pillars of Steam Replay Evolved"),

          createBulletItem(
            "1. Diógenes Syndrome & Backlog Debt Calculator: ",
            "Quantifies untouched games (0 minutes played) and calculates the player's 'Life Debt' in hours. Features an interactive amortization slider allowing users to see exactly how many years at X hours/day are needed to clear their catalog."
          ),
          createBulletItem(
            "2. Monopoly of Time & Native Desktop Hooks: ",
            "Interactive Top 5 showcase with vertical covers, completion tags, and 3 immediate action triggers: View Achievements, Open Steam Store, and Launch Directly in Desktop Client (using native steam://nav/games/details/ protocols)."
          ),
          createBulletItem(
            "3. Annual Streak & 10-Month Interactive Calendar: ",
            "Full monthly breakdown from January to October displaying the dominant game, monthly play hours, achievements earned, and secondary rotational titles, anchored by the player's longest continuous gaming streak (e.g., 22 days in August)."
          ),
          createBulletItem(
            "4. Circadian Gamer Chronobiology (Club Vampiro): ",
            "Visualizes day-night biological rhythms: morning, afternoon, prime time, and the dedicated 'Vampire Club' (late-night gaming). Highlights the single longest marathon session (e.g., 10.5h continuous run) and highest peak day."
          ),
          createBulletItem(
            "5. Love vs. Wallet Economics & Genre Radar: ",
            "Calculates real cost-per-hour amortized value ($/hour) to contrast ultra-cost-effective masteries ($0.15/h) against expensive unplayed 'paperweights' ($59.99/0h). Features a 6-axis player DNA radar compared against global Steam community medians, complete with gifted game exclusion."
          ),
          createBulletItem(
            "6. Co-op Squad & Broken Promises Analysis: ",
            "Identifies the user's #1 co-op partner (Night) with a calculated synchronization compatibility score. Displays shared titles played side-by-side, but crucially highlights 'Broken Promises': games purchased together during sales that were left uninstalled."
          ),
          createBulletItem(
            "7. Cross-Profile 1v1 Versus Mode: ",
            "Enables instant head-to-head stat duels against any friend in the squad or any external public Steam ID / custom URL. Compares seasonal hours, streaks, achievements, and library efficiency with real-time winner highlights."
          ),
          createBulletItem(
            "8. Multi-Personality AI Commentary Engine: ",
            "Integrates 4 specialized AI personas: GLaDOS (cold Aperture Science neurotoxin sarcasm), El Amigo Sin Filtro (brutal 3 AM Discord roast), Relator de Fútbol (epic stadium broadcast), and Dr. Sigmund Gamer (clinical DSM-V psychological gaming analysis). Features dynamic angle re-rolling on demand."
          ),
          createBulletItem(
            "9. Multi-Format Social Export Engine: ",
            "One-click high-resolution rendering into 3 tailored formats: Bento Horizontal (Twitter/Desktop), 9:16 Vertical Stories (TikTok, Instagram Reels, YouTube Shorts), and Steam Trading Card format, paired with auto-formatted clipboard sharing."
          ),
          createBulletItem(
            "10. Authentic Steam Sound Design: ",
            "The official Steam achievement unlock sound plays automatically upon reaching the final Season Certificate, delivering satisfying tactile closure to the review experience."
          ),

          new Paragraph({ spacing: { after: 300 } }),

          // 4. Commercial & Strategic Value
          ...createSectionHeading("4. Strategic & Commercial Impact for Valve", "How This Direct Drives Revenue, Engagement & Retention"),
          createBulletItem(
            "Direct Backlog Reactivation: ",
            "By showing players the dollar value of their untouched library alongside amortized $/hour comparisons, users are psychologically motivated to install unplayed games rather than churning to rival platforms."
          ),
          createBulletItem(
            "Peer-to-Peer Viral Acquisition: ",
            "The 1v1 Versus mode and TikTok-ready 9:16 export stories incentivize players to challenge friends and share their cards on social media, driving organic traffic and new client registrations back to Steam."
          ),
          createBulletItem(
            "Multiplayer Re-Engagement & Friend Gifting: ",
            "Highlighting 'Broken Promises' (co-op games bought but not played) directly triggers spontaneous Discord invitations ('Bro, we bought Borderlands 2 and have 0 hours, let's play tonight'), driving active concurrent player counts across multiplayer titles."
          ),

          new Paragraph({ spacing: { after: 300 } }),

          // 5. Integration Roadmap
          ...createSectionHeading("5. Implementation Roadmap for Steam", "Seamless Integration into the Existing Steam Ecosystem"),
          createBodyParagraph(
            "Steam Replay Evolved was built specifically with Valve's tech stack and community guidelines in mind. Its modular architecture allows straightforward adoption across three primary surfaces:"
          ),
          createBulletItem(
            "Surface 1 - Steam Desktop & Web Client: ",
            "Integrated directly into the Steam Community tab and Steam Store frontpage during the Winter Sale, utilizing internal Steam session telemetry for zero-friction loading."
          ),
          createBulletItem(
            "Surface 2 - Steam Mobile App: ",
            "Native touch-friendly story mode allowing users to tap through their annual replay like Instagram Stories, directly downloading 9:16 vertical cards to mobile photo rolls."
          ),
          createBulletItem(
            "Surface 3 - Steam Deck UI: ",
            "Dedicated controller-friendly Replay hub accessible from the SteamOS main menu, celebrating Steam Deck verified hours and battery-optimized gaming marathons."
          ),

          new Paragraph({ spacing: { before: 240 } }),

          createCallout(
            "Conclusion & Contact",
            "This project proves that with the right combination of humor, behavioral economics, competitive gamification, and social sharing, Steam Year in Review can become the single biggest viral event of the gaming calendar. Available for code review and technical presentation: Tomás (7Kingdoms) • Lead Architect."
          ),
        ],
      },
    ],
  });
}

// ==========================================
// 2. SPANISH DOSSIER GENERATION
// ==========================================
function buildSpanishDossier() {
  return new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Segoe UI",
            size: 22,
            color: "1E293B",
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        children: [
          // Header / Confidential Marker
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "VALVE CORPORATION • DOSSIER EJECUTIVO DE ARQUITECTURA",
                bold: true,
                size: 16,
                color: "64748B",
                font: "Segoe UI",
              }),
            ],
          }),

          // Cover Title
          new Paragraph({
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: "STEAM REPLAY EVOLVED",
                bold: true,
                size: 48,
                color: "0F172A",
                font: "Segoe UI",
              }),
            ],
          }),

          new Paragraph({
            spacing: { after: 360 },
            children: [
              new TextRun({
                text: "De Infografía Anual Estática a Motor de Viralidad Social, Reactivación Co-op y Monetización de Catálogo",
                italics: true,
                size: 24,
                color: "2563EB",
                font: "Segoe UI",
              }),
            ],
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
              left: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
              right: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: "334155" },
              insideVertical: { style: BorderStyle.SINGLE, size: 2, color: "334155" },
            },
            rows: [
              new TableRow({
                children: [
                  createHeaderCell("ID de Documento"),
                  createDataCell("VLV-PRD-2026-REPLAY-EVO-ES"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Autor y Arquitecto Principal"),
                  createDataCell("Tomás (7Kingdoms) • Lead Systems & Product Architect"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Destinatarios"),
                  createDataCell("Gabe Newell, Erik Johnson y el Equipo de Ingeniería de Steam (Valve Corporation)"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Alcance del Proyecto"),
                  createDataCell("Aplicación Web de Producción, IA Multinarrador, Duelo 1v1 y Motor de Exportación Social"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Fecha de Emisión / Estado"),
                  createDataCell("Octubre 2026 • Build de Producción Verificado (Listo para Evaluación Técnica)"),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { after: 300 } }),

          // 1. Executive Summary
          ...createSectionHeading("1. Resumen Ejecutivo: La Gran Oportunidad para Steam", "De la Telemetría Pasiva al Catalizador de Interacción Social"),
          createBodyParagraph(
            "Cada mes de diciembre, decenas de millones de usuarios en todo el mundo esperan el Steam Year in Review. Si bien la identidad visual y las estadísticas de Valve son ampliamente valoradas, el formato actual se comporta esencialmente como una infografía lineal y estática: el jugador la recorre una única vez, observa sus cifras globales y cierra la pestaña sin interactuar activamente con su lista de amigos, su biblioteca ni la tienda de Steam."
          ),
          createBodyParagraph(
            "Steam Replay Evolved rediseña esta experiencia desde sus cimientos. Al combinar narrativa interactiva gamificada, narradores de inteligencia artificial con personalidades sarcásticas y clínicas, análisis de conducta de compra y deuda de catálogo (Síndrome de Diógenes), un módulo de duelos 1v1 entre perfiles y generación de pósters multiformato para redes, este sistema transforma datos dormidos en revinculación activa, partidas cooperativas y ventas directas."
          ),

          createCallout(
            "Tesis de Arquitectura Central",
            "La telemetría de un jugador solo genera valor si impulsa acciones sociales y comerciales concretas. Al gamificar la autocrítica (deuda de backlog, promesas rotas entre amigos, duelos 1v1), transformamos la nostalgia pasiva en sesiones de juego reales y reactivación de compras."
          ),

          new Paragraph({ spacing: { after: 300 } }),

          // 2. CRITICAL SECTION: API Limitations & Architecture
          ...createSectionHeading(
            "2. Transparencia Técnica: Límites de la Web API vs. Telemetría Nativa de Valve",
            "Aclaración Fundamental sobre las Horas Globales y Nuestra Solución Calibrada"
          ),
          createBodyParagraph(
            "Un pilar fundamental de esta propuesta ante los ingenieros de Valve es la absoluta honestidad y transparencia arquitectónica respecto a los datos que la Web API pública entrega frente a los que Valve posee de forma privada en sus bases de datos."
          ),

          createBodyParagraph(
            "A. La Limitación de la Web API Pública de Steam:",
            true
          ),
          createBulletItem(
            "Sólo Horas Históricas Acumuladas: ",
            "El endpoint oficial de la Web API de Valve ('IPlayerService/GetOwnedGames') solo expone 'playtime_forever' (tiempo total acumulado en minutos desde la creación de la cuenta) y 'playtime_2weeks' (minutos de las últimas dos semanas). Valve no expone timestamps de sesiones pasadas ni desgloses anuales a API Keys públicas de desarrolladores externos."
          ),
          createBulletItem(
            "Privacidad en Bibliotecas Externas: ",
            "Por políticas de privacidad de Valve, el campo 'rtime_last_played' se oculta o anonimiza en perfiles de amigos o terceros consultados vía Web API, imposibilitando consultar directamente las horas exactas de un amigo en un año calendario particular mediante llamadas REST convencionales."
          ),

          createBodyParagraph(
            "B. La Solución Arquitectónica de Steam Replay Evolved:",
            true
          ),
          createBulletItem(
            "Arquitectura de Doble Métrica: ",
            "En lugar de mostrar cifras engañosas o contradictorias, Steam Replay Evolved implementó un modelo de doble nivel. Tomamos las horas totales acumuladas verificadas por Steam ('playtime_forever') como ancla de verdad histórica, y calibramos la distribución anual de 2026 en base a los meses de actividad del calendario interactivo."
          ),
          createBulletItem(
            "Calibración Estacional Transparente: ",
            "En la cuenta verificada de Tomás, por ejemplo, Dying Light muestra 74.5 horas en 2026 frente a sus 127.5 horas históricas totales. La interfaz lo comunica con total claridad: '74.5 horas en 2026 (127.5h en toda tu historia)', permitiendo al usuario ver su temporada anual realista sin perder el reconocimiento a su trayectoria histórica."
          ),
          createBulletItem(
            "Incremento Realista de Logros en el Año: ",
            "De forma idéntica, el sistema aísla los logros obtenidos en la temporada (+14 en Dying Light, +18 en Isaac, +11 en Tiny Tina, +9 en Hollow Knight), arrojando un total de ~107 logros en 2026 y evitando la cifra absurda de computar los 778 logros de toda la vida de la cuenta como si hubiesen ocurrido en un solo año."
          ),

          createCallout(
            "La Oportunidad de Implementación Nativa para Valve",
            "Mientras que nuestra aplicación externa logra una aproximación calibrada elegante mediante proyección de calendario, los ingenieros de Valve poseen acceso SQL directo a los registros de inicio y fin de cada sesión individual de juego. Integrado de forma nativa en Steam, este sistema funcionaría con precisión absoluta de microsegundos para los 132+ millones de usuarios activos, sin necesidad de calibraciones externas."
          ),

          new Paragraph({ spacing: { after: 300 } }),

          // 3. Feature Breakdown
          ...createSectionHeading("3. Desglose Completo de Funcionalidades Implementadas", "Los 10 Pilares de Steam Replay Evolved"),

          createBulletItem(
            "1. Síndrome de Diógenes y Simulador de Deuda de Backlog: ",
            "Identifica y cuantifica los juegos vírgenes (0 minutos de juego) y traduce el catálogo abandonado en 'Deuda de Vida en horas'. Incluye un slider interactivo donde el usuario simula cuántos años a razón de X horas diarias necesitaría para terminar su biblioteca."
          ),
          createBulletItem(
            "2. Monopolio del Tiempo y Acceso Directo a Steam Desktop: ",
            "Presentación del Top 5 de juegos con portadas oficiales verticales, porcentaje de finalización y 3 botones de acción directa: Ver Logros, Tienda de Steam y Lanzamiento Directo en el Cliente de Escritorio mediante el protocolo 'steam://nav/games/details/'."
          ),
          createBulletItem(
            "3. Racha Récord y Calendario Interactivo de 10 Meses: ",
            "Navegación visual mes a mes (Enero a Octubre) que destaca el juego dominante de cada mes, horas estimadas de sesión y juegos de rotación secundaria, respaldado por la mayor racha de conexión consecutiva (22 días en agosto)."
          ),
          createBulletItem(
            "4. Cronobiología Gamer y Club Vampiro: ",
            "Análisis de hábitos circadianos divididos en Mañana, Tarde, Prime Time y Madrugada ('Club Vampiro'). Registra la sesión maratónica más larga (10.5h continuas) y el día récord de mayor tiempo de juego."
          ),
          createBulletItem(
            "5. Amor vs. Billetera y Radar Gamer: ",
            "Cálculo del costo amortizado por hora (USD/h) para contrastar los juegos más rentables frente a los 'pisapapeles caros' no jugados. Gráfico de radar de 6 ejes que compara el ADN del usuario con la mediana de la comunidad de Steam, con filtro para excluir juegos recibidos como regalo."
          ),
          createBulletItem(
            "6. Escuadrón Co-op y Promesas Rotas: ",
            "Detección del mejor compañero de cooperativo (Night) con puntaje de compatibilidad. Destaca títulos sincronizados jugados a la par, pero enfatiza las 'Promesas Rotas': juegos multijugador comprados en ofertas que nunca llegaron a jugar juntos."
          ),
          createBulletItem(
            "7. Duelo 1v1 entre Perfiles (Modo Versus): ",
            "Permite enfrentar las estadísticas del usuario contra cualquier amigo o cuenta externa de Steam mediante Steam ID o URL personalizada, mostrando en tiempo real quién gana en cada categoría (Horas, Racha, Logros, Biblioteca)."
          ),
          createBulletItem(
            "8. Motor de Narración con Múltiples Personalidades de IA: ",
            "Cuatro narradores interactivos con tonos contrastantes: GLaDOS (sarcasmo y neurotoxinas de Aperture Science), El Amigo Sin Filtro (roast directo de Discord a las 3 AM), Relator de Fútbol (épica de transmisión radial) y Dr. Sigmund Gamer (psicología clínica). Incluye botón para rotar ángulo en vivo."
          ),
          createBulletItem(
            "9. Motor de Exportación y Compartición Social: ",
            "Generación en alta resolución de 3 formatos optimizados: Bento Horizontal (Twitter/Web), Historias Verticales 9:16 (TikTok, Instagram Reels) y Tarjeta Coleccionable de Steam, junto con copiado automático de texto para redes sociales."
          ),
          createBulletItem(
            "10. Efecto de Sonido Oficial de Logros de Steam: ",
            "Reproducción automática e incondicional del chime oficial de logro al alcanzar la diapositiva final del certificado de la temporada, aportando una gratificación táctil inconfundible."
          ),

          new Paragraph({ spacing: { after: 300 } }),

          // 4. Commercial & Strategic Value
          ...createSectionHeading("4. Impacto Estratégico y Comercial para Valve", "Cómo Este Enfoque Impulsa Ingresos, Retención y Viralidad"),
          createBulletItem(
            "Reactivación de Catálogo y Venta de DLCs: ",
            "Al exhibir el valor financiero del backlog y el costo por hora amortizado, el usuario siente el incentivo psicológico de reinstalar juegos pendientes, lo que genera compras secundarias de pases de temporada, DLCs y secuelas."
          ),
          createBulletItem(
            "Viralidad y Adquisición Orgánica de Usuarios: ",
            "El modo Duelo 1v1 y los pósters verticales 9:16 están concebidos para TikTok, Instagram y Twitter/X. Los jugadores desafían activamente a sus amigos a superarlos, generando tráfico externo masivo hacia Steam."
          ),
          createBulletItem(
            "Reactivación de Servidores Multijugador: ",
            "La detección de 'Promesas Rotas' actúa como recordatorio social en Discord ('Hermano, compramos Borderlands 2 y lo dejamos en 0 horas, conectate hoy'), elevando inmediatamente la concurrencia de títulos multijugador."
          ),

          new Paragraph({ spacing: { after: 300 } }),

          // 5. Integration Roadmap
          ...createSectionHeading("5. Hoja de Ruta para Integración en Steam", "Despliegue Progresivo en el Ecosistema de Valve"),
          createBodyParagraph(
            "Steam Replay Evolved fue diseñado respetando las directrices de interfaz y arquitectura de Valve. Puede integrarse sin fricción en tres plataformas clave:"
          ),
          createBulletItem(
            "Plataforma 1 - Cliente de Escritorio y Web de Steam: ",
            "Incrustado directamente en la pestaña de Comunidad y portada de la tienda durante las rebajas de fin de año, aprovechando la telemetría interna para carga instantánea."
          ),
          createBulletItem(
            "Plataforma 2 - Steam Mobile App: ",
            "Modo historias optimizado para pantallas táctiles donde el usuario navega su resumen como en Instagram Stories y descarga pósters 9:16 a su galería con un toque."
          ),
          createBulletItem(
            "Plataforma 3 - Steam Deck UI: ",
            "Hub dedicado en la interfaz de SteamOS con navegación nativa por mando, destacando horas en modo portátil y sesiones optimizadas en batería."
          ),

          new Paragraph({ spacing: { before: 240 } }),

          createCallout(
            "Conclusión y Contacto",
            "Este desarrollo demuestra que con la combinación adecuada de humor, economía conductual, gamificación competitiva y viralidad social, el Steam Year in Review puede convertirse en el mayor evento anual del calendario gamer. Código fuente, arquitectura y prototipo disponibles para revisión técnica: Tomás (7Kingdoms) • Lead Architect."
          ),
        ],
      },
    ],
  });
}

async function main() {
  console.log("Generando Dossiers Ejecutivos Bilingües para Valve Corporation...");

  // 1. English Document
  const docEn = buildEnglishDossier();
  const bufferEn = await Packer.toBuffer(docEn);
  const pathEn = path.join(
    __dirname,
    "..",
    "STEAM_REPLAY_EVOLVED_EXECUTIVE_DOSSIER_EN.docx"
  );
  fs.writeFileSync(pathEn, bufferEn);
  console.log("✓ Documento en Inglés generado con éxito:", pathEn);

  // 2. Spanish Document
  const docEs = buildSpanishDossier();
  const bufferEs = await Packer.toBuffer(docEs);
  const pathEs = path.join(
    __dirname,
    "..",
    "STEAM_REPLAY_EVOLVED_DOSSIER_EJECUTIVO_ES.docx"
  );
  fs.writeFileSync(pathEs, bufferEs);
  console.log("✓ Documento en Español generado con éxito:", pathEs);
}

main().catch((err) => {
  console.error("Error al generar los dossiers:", err);
  process.exit(1);
});
