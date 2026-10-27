# 🎮 Steam Replay Evolved

🌐 **Languages / Idiomas:** [English](README.md) | [Español](README.es.md)

> **Transforming the static annual Steam Year in Review into a dynamic, AI-powered social retention, backlog reactivation, and competitive gaming engine.**

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-2.0_Flash-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Valve Steam API](https://img.shields.io/badge/Steam_Web_API-Valve_Platform-171a21?style=for-the-badge&logo=steam)](https://steamcommunity.com/dev)

---

## 📖 Overview / Visión General

Every December, tens of millions of PC players check their **Steam Year in Review**. While celebrated for its visual aesthetics, the traditional recap functions essentially as a linear, static infographic: users scroll once, view broad aggregate percentages, and exit without meaningful interaction with their friend list, their library, or the Steam Store.

**Steam Replay Evolved** redesigns this experience from first principles. By integrating real-time behavioral economics, interactive debt simulation, cross-profile 1v1 matchmaking, authentic Steam sound design, and an adaptive multi-persona AI narrative engine, the platform converts dormant telemetry into measurable social engagement, co-op revival, and catalog sales.

---

## 🌟 Key Features / Características Principales

### 1. 📦 Diógenes Syndrome & Backlog Debt Simulator
* Detects and calculates untouched purchases (**0 minutes played**) across the user's entire library.
* Translates unplayed games into a **Life Debt in hours** and monetary wasted investment (USD).
* Features an **interactive amortization slider** where players calculate how many years at *X hours/day* are needed to complete their backlog.

### 2. 👑 Monopoly of Time (Top 5 Showcase) & Native Desktop Integration
* Dynamic showcase of the user's top games with official 600x900 vertical covers, achievement progress, and amortized cost per hour (`USD / hour`).
* **3 Instant Action Triggers:**
  * 🏆 View Official Achievements
  * 🛒 Open Steam Store Page
  * 🚀 **Launch directly in Steam Desktop Client** via the native `steam://nav/games/details/<appid>` protocol.

### 3. 📅 10-Month Interactive Calendar & Streak Tracker
* Comprehensive monthly timeline from **January to October** highlighting each month's dominant title, monthly playtime hours, and secondary game rotations.
* Celebrates the player's longest unbroken daily login streak (e.g., 22 days in August).

### 4. 🌙 Circadian Gamer Chronobiology & "Club Vampiro"
* Classifies play sessions into biological timeframes: Morning, Afternoon, Prime Time, and the late-night **"Club Vampiro"**.
* Identifies the single longest continuous marathon session (e.g., 10.5h run) and the peak gaming day of the year.

### 5. 💰 Love vs. Wallet & 6-Axis Player DNA Radar
* Contrasts high-value masteries (e.g., `$0.15/h`) against expensive unplayed "paperweights" (`$59.99/0h`).
* 6-Axis radar mapping the user's gameplay DNA (*Co-op & Chaos, Survival & Horror, Roguelike & Souls, RPG & Open World, Action & Parkour, Precision Platforming*) calibrated against global Steam community medians.
* Includes an interactive manager to exclude games received as gifts or free promotions.

### 6. 🤝 Co-op Squad & "Broken Promises" Detector
* Identifies the user's #1 co-op companion with a mathematical **Synchronization Score**.
* Displays titles played side-by-side, but crucially surfaces **"Broken Promises"**: multiplayer games purchased together during sales that were left uninstalled.

### 7. ⚔️ Cross-Profile 1v1 Versus Mode (Duelo 1v1)
* Real-time head-to-head stat duels against any friend in the squad or any external Steam ID / Vanity URL.
* Live metric comparisons with dynamic winner crowns per category (*Hours, Streak, Achievements, Library*).

### 8. 🎭 Multi-Personality AI Commentary Engine
Powered by Google Gemini with instant dynamic fallback engines, featuring 4 contrasting narrator personalities:
* **GLaDOS (Aperture Science):** Cold, clinical sarcasm, passive-aggressive remarks about human inefficiencies, and neurotoxin metaphors.
* **El Amigo Sin Filtro (Discord Roast):** Uncensored 3 AM Discord voice call roast calling out contradictory purchases and abandoned games.
* **Relator de Fútbol (Epic Stadium Caster):** High-octane sports broadcast treating the gaming year as a World Cup championship campaign.
* **Dr. Sigmund Gamer (Clinical Psychology):** DSM-V clinical psychiatric diagnostic report on escapism and zombie apocalypse attachment.
* Includes an **"Otro Ángulo de IA / New AI Perspective"** button to re-roll roasts on demand.

### 9. 🎨 Multi-Format High-Res Social Poster Engine
One-click client-side image rendering using `html-to-image`:
* **Bento Horizontal (16:9):** Optimized for Twitter/X and web desktop banners.
* **Stories Vertical (9:16):** Full-screen mobile format tailored for TikTok, Instagram Stories, and YouTube Shorts.
* **Steam Trading Card:** Collectible physical card-style layout with custom holographic border and rarity badges.
* Automated social clipboard text copy for instant sharing.

### 10. 🔊 Authentic Valve Sound Design
* Automatically triggers the official **Steam Achievement unlock chime** upon completing the review on Slide 6 (Season Certificate).

---

## 🛠️ Technical Architecture & API Constraints

### Public Steam Web API Limitations vs. Native Integration
* **The Public Bottleneck:** Valve's public Web API endpoint (`IPlayerService/GetOwnedGames`) only provides `playtime_forever` (cumulative minutes across the entire lifetime of the account) and `playtime_2weeks`. Valve does not expose per-session timestamps or annual historical playtime to third-party Web API keys for privacy reasons.
* **Our Solution:** Steam Replay Evolved establishes a dual-tier model: we use the verified global hours (`playtime_forever`) as the anchor of truth for Top 5 rankings, while calibrating the seasonal 2026 distribution based on active monthly timeline telemetry. The UI transparently communicates both figures (e.g., `74.5h in 2026 (127.5h all-time)` and `+14 achievements in the year (49/78 historical)`).
* **Native Valve Opportunity:** Operating natively within Valve's internal database clusters, Steam engineers can run this exact UI and narrative engine with **microsecond SQL accuracy** on raw session logs, requiring zero extrapolation for all 132+ million active accounts.

---

## 📂 Executive Dossiers for Valve Corporation

The project includes two formally authored executive whitepapers in Microsoft Word format, complete with technical specifications, commercial impact analysis, and integration blueprints:
* 🇬🇧 [**`STEAM_REPLAY_EVOLVED_EXECUTIVE_DOSSIER_EN.docx`**](./STEAM_REPLAY_EVOLVED_EXECUTIVE_DOSSIER_EN.docx) — *Official Valve Corporation Submission (English)*
* 🇪🇸 [**`STEAM_REPLAY_EVOLVED_DOSSIER_EJECUTIVO_ES.docx`**](./STEAM_REPLAY_EVOLVED_DOSSIER_EJECUTIVO_ES.docx) — *Dossier Ejecutivo de Arquitectura (Español)*

---

## 🚀 Getting Started / Instalación Local

### Prerequisites
* [Node.js](https://nodejs.org/) v18.0.0 or higher
* npm or pnpm
* A free [Steam Web API Key](https://steamcommunity.com/dev/apikey)
* A free [Google Gemini API Key](https://ai.google.dev/)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/steam-replay-evolved.git
cd steam-replay-evolved
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
STEAM_API_KEY=your_steam_web_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 License & Credits

* Developed by **Tomás (7Kingdoms)** — *Lead Systems & Product Architect*.
* Steam assets, game covers, and logos are property of **Valve Corporation** and their respective publishers.
* Built for platform proposal and portfolio presentation purposes.
