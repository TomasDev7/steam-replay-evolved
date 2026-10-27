import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steam Replay Evolved — Auditoría Gamer con IA y Humor",
  description:
    "Propuesta de evolución para el Resumen del Año de Steam (Valve). Análisis humano de tu biblioteca, costo por hora, síndrome de Diógenes digital y narradores con IA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="steam-bg-mesh min-h-screen antialiased selection:bg-steam-neon selection:text-white">
        {children}
      </body>
    </html>
  );
}
