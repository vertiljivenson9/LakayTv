import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LakayTV - Streaming Haïtien",
  description: "Plateforme de streaming pour films, séries et bandes-annonces haïtiens en français et créole. Découvrez le meilleur du cinéma haïtien en qualité Full HD.",
  keywords: ["LakayTV", "streaming haïtien", "films haïtiens", "séries créole", "cinéma haïtien"],
  authors: [{ name: "LakayTV" }],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" suppressHydrationWarning>
        <body
          className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
