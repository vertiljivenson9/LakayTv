import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LakayTV - Streaming Haïtien",
  description: "La première plateforme de streaming haïtienne. Découvrez le meilleur du cinéma, des séries et des documentaires d'Haïti et de la diaspora.",
  keywords: ["Haiti", "streaming", "films", "series", "documentaires", "haitian movies", "cinema haitien"],
  authors: [{ name: "LakayTV Team" }],
  openGraph: {
    title: "LakayTV - Streaming Haïtien",
    description: "La première plateforme de streaming haïtienne. Découvrez le meilleur du cinéma, des séries et des documentaires d'Haïti et de la diaspora.",
    type: "website",
    locale: "fr_HT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} bg-dark text-white min-h-screen`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
