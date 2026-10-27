// Reproductor de sonido oficial de Steam Achievement Toast (Valve Corporation)
// Utiliza el archivo nativo deck_ui_achievement_toast.wav extraído de Steam.

export function playSteamAchievementSound(volume = 0.6): void {
  if (typeof window === "undefined") return;

  try {
    const audio = new Audio("/sounds/steam_achievement.wav");
    audio.volume = Math.max(0, Math.min(1, volume));
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay bloqueado por el navegador o error al reproducir:", err);
      });
    }
  } catch (err) {
    console.warn("No se pudo reproducir el sonido oficial de Steam:", err);
  }
}
