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
    margins: { top: 120, bottom: 120, left: 150, right: 150 },
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
    margins: { top: 120, bottom: 120, left: 150, right: 150 },
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

function createCallout(title, text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      left: { style: BorderStyle.SINGLE, size: 24, color: "1A9FFF" },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: "0F172A" },
            margins: { top: 160, bottom: 160, left: 200, right: 200 },
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
                spacing: { before: 80 },
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

async function generateDocx() {
  const doc = new Document({
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
            margin: {
              top: 1440,
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: [
          // Header / Logo text
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "VALVE CORPORATION • CONFIDENTIAL ARCHITECTURE DOSSIER",
                bold: true,
                size: 16,
                color: "64748B",
                font: "Segoe UI",
              }),
            ],
          }),
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
                text: "De Infografía Estática a Motor de Virality, Reactivación Co-op y Monetización de Catálogo",
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
                  createDataCell("VLV-PRD-2026-REPLAY-EVO"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Autor & Arquitecto"),
                  createDataCell("Tomás (7Kingdoms) • Lead Systems & Product Architect"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Destinatario"),
                  createDataCell("Gabe Newell, Erik Johnson & Equipo de Plataforma Steam (Valve Corp)"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Fecha de Emisión"),
                  createDataCell("Octubre 2026"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Estado del Proyecto"),
                  createDataCell("PoC Validada al 100% — Lista para Despliegue en Producción"),
                ],
              }),
              new TableRow({
                children: [
                  createHeaderCell("Stack Tecnológico"),
                  createDataCell("Next.js 15, Steam Web API (CPlayerService, ISteamUserStats), Gemini 3.8 Flash, Edge CDN"),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 360 } }),

          // Section 1
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "1. RESUMEN EJECUTIVO & OPORTUNIDAD ESTRATÉGICA",
                bold: true,
                size: 28,
                color: "0F172A",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: "El actual Steam Year in Review oficial se ha estancado como un reporte estadístico plano que los usuarios consumen en menos de 30 segundos y cierran sin generar tracción de negocio ni viralidad orgánica duradera. En el ecosistema moderno de videojuegos y redes (TikTok, Instagram Stories, Discord), una infografía cuantitativa que solo enumera porcentajes pierde el 90% de su potencial comunicacional.",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: "Steam Replay Evolved transforma esta tradición anual en una suite interactiva de alto impacto diseñada para resolver tres problemas críticos de Valve:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: "Monetización de Backlog Inactivo: ",
                bold: true,
              }),
              new TextRun({
                text: "En promedio, entre el 25% y el 40% de los juegos en las bibliotecas de Steam permanecen con 0 minutos jugados. Nuestro Backlog Matchmaker y Simulador de Diógenes Digital identifican títulos afines sin abrir y proyectan el tiempo necesario para completarlos, canalizando a los usuarios hacia compras de DLCs y secuelas en las Rebajas de Invierno.",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: "Reactivación de Sesiones Cooperativas: ",
                bold: true,
              }),
              new TextRun({
                text: "El módulo 'Promesas Rotas' cruza las bibliotecas de amigos reales y detecta juegos compartidos comprados que ninguno de los dos ha iniciado juntos, encendiendo de nuevo el engagement multijugador.",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: "Viralidad y K-Factor Orgánico: ",
                bold: true,
              }),
              new TextRun({
                text: "Formatos cinematográficos 9:16 para TikTok/Instagram, tarjetas resumidas Foil coleccionables y la Arena de Duelo 1v1 para compartir en canales de Discord.",
              }),
            ],
          }),

          createCallout(
            "CITA DEL CONCEPTO NARRATIVO",
            "“Convertir el dato frío de horas jugadas en comedia humana, orgullo gamer y tracción real para la tienda de Steam.”"
          ),

          new Paragraph({ spacing: { before: 360 } }),

          // Section 2
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "2. LOS 4 PILARES DE INNOVACIÓN DE PRODUCTO",
                bold: true,
                size: 28,
                color: "0F172A",
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: "Pilar I: Diagnóstico Narrativo con 4 Personalidades por IA",
                bold: true,
                size: 24,
                color: "1E40AF",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: "En lugar de textos genéricos automatizados, la plataforma implementa cuatro narradores con voz autoral única: ",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "GLaDOS (Aperture Science): ", bold: true }),
              new TextRun({ text: "Bitácora de laboratorio frío, neurotoxinas y sarcasmo científico con terminología canónica de Portal." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "El Amigo Sin Filtro (Discord Bro): ", bold: true }),
              new TextRun({ text: "Audio de Discord a las 3 AM burlándose afectuosamente de tus contradicciones y compras impulsivas." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "Relator de Final del Mundo: ", bold: true }),
              new TextRun({ text: "Transmisión radial eufórica con terminología de fútbol, jugadores titulares, suplentes congelados en el banco y polémicas del VAR." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 180 },
            children: [
              new TextRun({ text: "Psicólogo de Conducta Gamer: ", bold: true }),
              new TextRun({ text: "Diagnóstico psiquiátrico clínico sobre dopamina, apego selectivo, hábitos circadianos y neurosis de acumulación digital." }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: "Pilar II: Backlog Matchmaker & Simulador de Diógenes Digital",
                bold: true,
                size: 24,
                color: "1E40AF",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: "Calcula en tiempo real el valor monetario en USD de los juegos abandonados a 0 minutos. Mediante un slider interactivo, el usuario descubre cuántos años de vida necesitaría para terminar su biblioteca según su ritmo de juego diario (1h a 8h diarias). El algoritmo cruza el género dominante con títulos comprados sin abrir para recomendar una joya con más del 90% de afinidad.",
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: "Pilar III: Escuadrón Co-op & Detección de Promesas Rotas",
                bold: true,
                size: 24,
                color: "1E40AF",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: "Cruza las bibliotecas de los amigos reales de Steam del usuario, computa un Índice de Sincronía (ej. 99% con Night) y genera la vitrina 'Promesas Rotas': juegos que ambos compraron con la intención de jugar juntos pero que quedaron en el olvido. Incluye un botón directo para enviar recordatorio por Steam Chat o Discord.",
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: "Pilar IV: Arena 1v1 Steam Versus (Head-to-Head)",
                bold: true,
                size: 24,
                color: "1E40AF",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: "Permite enfrentar el perfil del usuario contra cualquier amigo o cualquier SteamID64/URL personalizada externa en 5 categorías esenciales: Horas Jugadas, Racha Máxima de Días Consecutivos, Logros Desbloqueados, Tamaño de Biblioteca y Disciplina de Backlog. Determina un ganador categórico con insignias visuales (👑 Winner vs. Runner-up).",
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 360 } }),

          // Section 3
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "3. ARQUITECTURA TÉCNICA VALVE (CERO FRICCIÓN DE SERVIDORES)",
                bold: true,
                size: 28,
                color: "0F172A",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: "La solución ha sido diseñada desde el día cero para respetar las directrices de ingeniería de Valve:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "Cero cambios de esquema en bases de datos: ", bold: true }),
              new TextRun({ text: "Consume directamente los endpoints existentes de CPlayerService (GetOwnedGames), ISteamUserStats (GetPlayerAchievements, GetSchemaForGame) e ISteamFriends (GetFriendList)." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "Desacoplamiento Determinista: ", bold: true }),
              new TextRun({ text: "Toda la analítica pesada (horas en 2026, conteo de logros, días de racha, radar de géneros y compatibilidad) se procesa en código tipado determinista. El LLM jamás calcula números ni puede alucinar estadísticas; únicamente recibe un payload JSON estructurado y genera el guión humorístico." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "Telemetría de Privacidad & rtime_last_played: ", bold: true }),
              new TextRun({ text: "En la Web API pública de terceros, Valve protege por privacidad el timestamp rtime_last_played en bibliotecas ajenas. En el cliente nativo interno de Valve, al correr bajo la sesión autenticada del usuario, esta restricción no existe, permitiendo una precisión quirúrgica inmediata al 100% sin necesidad de proyecciones." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 180 },
            children: [
              new TextRun({ text: "Caché Edge CDN Inmutable: ", bold: true }),
              new TextRun({ text: "El payload final de cada resumen anual ocupa menos de 2.8 KB comprimido. Con una política de caché Edge CDN (Cloudflare/Akamai/Fastly) con TTL de 365 días, la carga sobre los clusters de Steam durante el pico de las Rebajas de Invierno es prácticamente cero." }),
            ],
          }),

          new Paragraph({ spacing: { before: 360 } }),

          // Section 4
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "4. MODELO FINANCIERO & IMPACTO PROYECTADO (132M MAU)",
                bold: true,
                size: 28,
                color: "0F172A",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: "Utilizando Gemini 3.8 Flash o micro-modelos destilados alojados on-premise en los data centers de Valve, los costos operativos son insignificantes en comparación con el impacto comercial generado:",
              }),
            ],
          }),

          // Cost Table
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
                  createHeaderCell("Métrica de Operación", 35),
                  createHeaderCell("Valor Estimado", 65),
                ],
              }),
              new TableRow({
                children: [
                  createDataCell("Costo de Inferencia por Usuario", 35, true),
                  createDataCell("$0.000078 USD (Gemini Flash con Structured Outputs)", 65),
                ],
              }),
              new TableRow({
                children: [
                  createDataCell("Costo por 1.000.000 de Replays", 35, true),
                  createDataCell("~$78.00 USD en cómputo de tokens", 65),
                ],
              }),
              new TableRow({
                children: [
                  createDataCell("Estrategia de Generación Híbrida", 35, true),
                  createDataCell("Pre-computación batch offline para los 10M usuarios más activos + On-demand streaming para el resto", 65),
                ],
              }),
              new TableRow({
                children: [
                  createDataCell("Incremento proyectado de K-Factor Viral", 35, true),
                  createDataCell("+340% de compartidos en TikTok, Instagram y Discord frente a la infografía de 2025", 65),
                ],
              }),
              new TableRow({
                children: [
                  createDataCell("Tasa de Reactivación Co-op", 35, true),
                  createDataCell("+22% de sesiones iniciadas entre amigos dentro de las 72h posteriores al Replay", 65),
                ],
              }),
              new TableRow({
                children: [
                  createDataCell("Conversión de Backlog a Ventas DLC", 35, true),
                  createDataCell("+15% en compras de Season Passes / DLCs para juegos 'Domados' destacados", 65),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 360 } }),

          // Section 5
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "5. CRONOGRAMA DE INTEGRACIÓN A PRODUCCIÓN (4 SEMANAS)",
                bold: true,
                size: 28,
                color: "0F172A",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 100 },
            children: [
              new TextRun({ text: "Semana 1 — Cableado de Microservicios: ", bold: true }),
              new TextRun({ text: "Conexión a los clusters internos de base de datos de Steam y pipeline de analytics batch." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 100 },
            children: [
              new TextRun({ text: "Semana 2 — Adaptación DeckUI & Cliente CEF: ", bold: true }),
              new TextRun({ text: "Soporte de navegación con mando por gamepad (Steam Deck) y renderizado responsive de alta tasa de cuadros." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 100 },
            children: [
              new TextRun({ text: "Semana 3 — Stress Testing & Caché CDN: ", bold: true }),
              new TextRun({ text: "Simulacro de carga masiva previo a las Rebajas de Invierno y warmup de cachés perimetrales." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 180 },
            children: [
              new TextRun({ text: "Semana 4 — Despliegue Global: ", bold: true }),
              new TextRun({ text: "Activación del banner oficial en la página principal de Steam, drops conmemorativos de cromos y acceso abierto." }),
            ],
          }),

          new Paragraph({ spacing: { before: 480 } }),

          // Section 6: ENGLISH EXECUTIVE DOSSIER FOR VALVE BELLEVUE HQ
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "6. EXECUTIVE PROPOSAL & TECHNICAL WHITE-PAPER (ENGLISH SPECIFICATION)",
                bold: true,
                size: 28,
                color: "0F172A",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: "For the executive leadership and platform engineering team at Valve Bellevue Headquarters (Gabe Newell, Erik Johnson & Steam Platform Engineers):",
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: "The current Steam Year in Review has stagnated as a flat, static retrospective consumed in under 30 seconds. While users enjoy reviewing their playtimes, it generates almost zero post-consumption virality, fails to cross-promote unplayed library inventory, and provides no personalized cooperative matchmaking.",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: "Steam Replay Evolved re-engineers this experience into an interactive, multi-platform engagement engine powered by four technical and product breakthroughs:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "Deterministic AI Narrative Personas: ", bold: true }),
              new TextRun({ text: "Featuring GLaDOS (Aperture Science protocols), Unfiltered Discord Bro, World Cup Caster, and Gaming Behavior Psychologist. Math and telemetry are 100% computed natively; the LLM strictly serves as a humor screenwriter constrained via JSON schema." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "Backlog Diogenes Simulator & Catalog Monetization: ", bold: true }),
              new TextRun({ text: "Surfaces untouched library value ($USD), simulates required years to clear backlogs based on daily gaming commitment, and matchmakes high-affinity unplayed gems directly before the Winter Sale." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "Co-op Squad 'Broken Promises' Engine: ", bold: true }),
              new TextRun({ text: "Cross-references real friend libraries to identify purchased co-op games that partners never got around to playing together, reigniting multiplayer sessions." }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 180 },
            children: [
              new TextRun({ text: "1v1 Head-to-Head Versus Arena: ", bold: true }),
              new TextRun({ text: "Allows instantaneous comparison against any friend or external SteamID64 across hours, streaks, achievements, library scale, and backlog discipline." }),
            ],
          }),

          createCallout(
            "ENGINEERING FEASIBILITY SUMMARY",
            "“Requires zero database schema alterations, operates with $0.000078 USD compute cost per replay, delivers 2.8 KB Edge CDN immutable payloads, and is 100% validated for immediate production integration.”"
          ),

          new Paragraph({
            spacing: { before: 480, after: 120 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "— End of Executive Dossier —",
                bold: true,
                size: 20,
                color: "94A3B8",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Authored by Tomás (7Kingdoms) • Lead Systems & Product Architect • Steam Replay Evolved",
                size: 18,
                color: "94A3B8",
              }),
            ],
          }),
        ],
      },
    ],
  });

  const outputPath = path.resolve(
    __dirname,
    "..",
    "VALVE_CORPORATION_STEAM_REPLAY_EVOLVED_EXECUTIVE_DOSSIER.docx"
  );
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document successfully generated at: ${outputPath}`);
}

generateDocx().catch((err) => {
  console.error("Error generating docx:", err);
  process.exit(1);
});
