# 🎮 Steam Replay Evolved

🌐 **Idiomas / Languages:** [Español](README.es.md) | [English](README.md)

> **Transformando el resumen anual estático de Steam en un motor dinámico impulsado por Inteligencia Artificial para la retención social, reactivación del backlog y competición gamer.**

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-2.0_Flash-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Valve Steam API](https://img.shields.io/badge/Steam_Web_API-Valve_Platform-171a21?style=for-the-badge&logo=steam)](https://steamcommunity.com/dev)

---

## 📖 Visión General

Cada diciembre, decenas de millones de jugadores de PC consultan su **Steam Year in Review** (Resumen del Año). Si bien es elogiado por su estética visual, el resumen tradicional funciona esencialmente como una infografía estática y lineal: los usuarios hacen scroll una sola vez, observan porcentajes generales y abandonan la plataforma sin una interacción real con su lista de amigos, su biblioteca acumulada o la Tienda de Steam.

**Steam Replay Evolved** rediseña esta experiencia desde sus cimientos. Al integrar economía conductual en tiempo real, simulación interactiva de deuda del backlog, duelos 1v1 entre perfiles, diseño sonoro oficial de Steam y un motor narrativo de Inteligencia Artificial adaptable con múltiples personalidades, la plataforma convierte la telemetría latente en retención social medible, reactivación cooperativa e impulso en ventas de catálogo.

---

## 🌟 Características Principales

### 1. 📦 Síndrome de Diógenes & Simulador de Deuda de Backlog
* Detecta y calcula las compras jamás jugadas (**0 minutos jugados**) en la biblioteca completa del usuario.
* Traduce los juegos sin tocar a una **Deuda de Vida en horas** y una inversión monetaria estancada (en USD).
* Incluye un **control deslizante interactivo de amortización**, donde el jugador calcula cuántos años a *X horas/día* necesitaría para completar sus pendientes.

### 2. 👑 Monopolio del Tiempo (Top 5) & Integración Nativa con Steam Desktop
* Muestra dinámica del Top 5 de juegos del usuario con portadas verticales oficiales en alta resolución (600x900), progreso de logros y costo amortizado por hora jugada (`USD / hora`).
* **3 Disparadores de Acción Inmediata:**
  * 🏆 Ver Logros Oficiales
  * 🛒 Abrir Página en la Tienda de Steam
  * 🚀 **Lanzar directamente en el Cliente de Escritorio de Steam** mediante el protocolo nativo `steam://nav/games/details/<appid>`.

### 3. 📅 Calendario Interactivo de 10 Meses & Racha Gamer
* Línea temporal mes a mes de **Enero a Octubre**, destacando el juego rey de cada mes, horas invertidas y títulos de rotación secundaria.
* Celebra la racha consecutiva más larga de días jugando (ej. 22 días consecutivos en Agosto).

### 4. 🌙 Cronobiología Circadiana Gamer & "Club Vampiro"
* Clasifica los hábitos de juego en franjas horarias biológicas: Mañana, Tarde, Horario Central (*Prime Time*) y la madrugada gamer en el **"Club Vampiro"**.
* Detecta la sesión de juego continua más larga del año (maratón continuo) y el día pico de mayor actividad anual.

### 5. 💰 Amor vs. Billetera & Radar de ADN Gamer en 6 Ejes
* Contrasta las inversiones más rentables (ej. `$0.15/h`) contra los "pisapapeles digitales" más caros (`$59.99/0h`).
* Radar de 6 ejes que mapea el ADN de juego (*Cooperativo & Caos, Supervivencia & Terror, Roguelike & Souls, RPG & Mundo Abierto, Acción & Parkour, Plataformas de Precisión*) calibrado contra las medianas de la comunidad de Steam.
* Incluye un gestor interactivo para excluir juegos regalados o promocionales sin costo.

### 6. 🤝 Escuadrón Cooperativo & Detector de "Promesas Rotas"
* Identifica al compañero co-op número 1 del usuario mediante un **Índice de Sincronización** matemático.
* Muestra títulos jugados en conjunto, pero además saca a la luz las **"Promesas Rotas"**: juegos cooperativos comprados durante rebajas que quedaron sin instalar en ambas bibliotecas.

### 7. ⚔️ Modo Versus 1v1 Entre Perfiles (Duelo 1v1)
* Duelo de estadísticas en tiempo real cara a cara contra cualquier amigo del escuadrón o introduciendo cualquier Steam ID / URL personalizada.
* Comparativas métricas en vivo con coronas dinámicas para el ganador en cada categoría (*Horas, Racha, Logros, Biblioteca*).

### 8. 🎭 Motor Narrativo de IA con Múltiples Personalidades
Impulsado por Google Gemini con motores de respaldo dinámicos y 4 personalidades contrastantes:
* **GLaDOS (Aperture Science):** Sarcasmo frío y clínico, comentarios pasivo-agresivos sobre la ineficiencia humana y metáforas de neurotoxinas.
* **El Amigo Sin Filtro (Discord Roast):** Crítica directa y sin anestesia al estilo de una llamada de Discord a las 3 AM sobre compras impulsivas y backlog abandonado.
* **Relator de Fútbol (Caster de Estadio):** Relato épico y apasionado transmitiendo el año gamer como una final de Copa del Mundo.
* **Dr. Sigmund Gamer (Psicología Clínica):** Informe de diagnóstico psiquiátrico formal según criterios del DSM-V sobre escapismo y apego zombi.
* Incluye el botón **"Otro Ángulo de IA"** para regenerar comentarios al instante.

### 9. 🎨 Motor de Exportación de Afiches para Redes Sociales
Generación de imágenes en alta resolución en el navegador mediante `html-to-image`:
* **Bento Horizontal (16:9):** Optimizado para Twitter/X y fondos de escritorio.
* **Historias Vertical (9:16):** Formato a pantalla completa para TikTok, Instagram Stories y YouTube Shorts.
* **Cromo Coleccionable de Steam:** Formato de carta física coleccionable con borde holográfico e insignia de rareza.
* Botón de copiado automático del texto resumen al portapapeles para compartir con un solo clic.

### 10. 🔊 Diseño Sonoro Auténtico de Valve
* Reproduce automáticamente el **sonido oficial de logro desbloqueado de Steam** al finalizar el recorrido en la Diapositiva 6 (Certificado de la Temporada).

---

## 🛠️ Arquitectura Técnica & Limitaciones de la API Pública de Steam

### Restricciones de la API Pública vs. Integración Nativa en Valve
* **El Cuello de Botella de la API Pública:** El endpoint público de Valve (`IPlayerService/GetOwnedGames`) únicamente expone `playtime_forever` (horas acumuladas a lo largo de toda la vida de la cuenta) y `playtime_2weeks`. Valve no proporciona marcas de tiempo por sesión ni horas anuales históricas a claves de API de terceros por motivos de privacidad.
* **Nuestra Solución Técnica:** Steam Replay Evolved implementa un modelo de dos niveles: utilizamos las horas globales verificadas (`playtime_forever`) como el ancla indiscutible de verdad para definir el ranking del Top 5, y calibramos la distribución de la temporada 2026 basándonos en la telemetría activa de la línea temporal mensual. La interfaz refleja de manera transparente ambos datos (ej. `74.5h en 2026 (127.5h totales)` y `+14 logros en el año (49/78 históricos)`).
* **Oportunidad para Valve:** Al ejecutarse de forma interna en los servidores de Valve, los ingenieros de Steam pueden alimentar esta misma interfaz y motor narrativo con **precisión SQL de microsegundos** sobre los registros de sesión en crudo, sin necesidad de extrapolaciones, para los más de 132 millones de usuarios activos.

---

## 📂 Dossiers Ejecutivos para Valve Corporation

El repositorio incluye dos documentos ejecutivos formales en formato Microsoft Word, con especificaciones técnicas completas, análisis de impacto comercial y planes de integración técnica:
* 🇬🇧 [**`STEAM_REPLAY_EVOLVED_EXECUTIVE_DOSSIER_EN.docx`**](./STEAM_REPLAY_EVOLVED_EXECUTIVE_DOSSIER_EN.docx) — *Dossier de Presentación Oficial para Valve (Inglés)*
* 🇪🇸 [**`STEAM_REPLAY_EVOLVED_DOSSIER_EJECUTIVO_ES.docx`**](./STEAM_REPLAY_EVOLVED_DOSSIER_EJECUTIVO_ES.docx) — *Dossier Ejecutivo de Arquitectura y Negocio (Español)*

---

## 🚀 Instalación y Ejecución Local

### Requisitos Previos
* [Node.js](https://nodejs.org/) v18.0.0 o superior
* npm o pnpm
* Una clave de API gratuita de [Steam Web API](https://steamcommunity.com/dev/apikey)
* Una clave de API gratuita de [Google Gemini API](https://ai.google.dev/)

### 1. Clonar el repositorio
```bash
git clone https://github.com/TomasDev7/steam-replay-evolved.git
cd steam-replay-evolved
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:
```env
STEAM_API_KEY=tu_clave_de_steam_aqui
GEMINI_API_KEY=tu_clave_de_gemini_aqui
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000).

---

## 📜 Licencia y Créditos

* Desarrollado por **Tomás (7Kingdoms)** — *Lead Systems & Product Architect*.
* Los recursos visuales, portadas de juegos y logotipos de Steam son propiedad de **Valve Corporation** y sus respectivos editores.
* Creado con fines de propuesta de producto y presentación de portfolio profesional.
