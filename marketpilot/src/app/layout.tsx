import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarketPilot — E-commerce & Dropshipping Intelligence",
  description: "Plateforme d'analyse de marché international, recherche de niches et produits gagnants, simulateur de tests publicitaires et diagnostic d'entonnoir de conversion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
