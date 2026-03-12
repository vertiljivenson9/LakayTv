"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Users, Share2, Facebook, Twitter, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://lakaytv.pages.dev";
  const shareText = "Découvrez LakayTV - La plateforme de streaming haïtien! 🎬🇭🇹";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
  };

  return (
    <div className="min-h-screen bg-dark pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour à l&apos;accueil
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Soutenir LakayTV</h1>
          <p className="text-gray-400 text-lg">Ensemble, construisons l&apos;avenir du cinéma haïtien</p>
        </div>

        {/* Why Support */}
        <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Pourquoi Votre Soutien Compte</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            LakayTV est plus qu&apos;une plateforme de streaming. C&apos;est un mouvement pour la visibilité 
            et la valorisation du cinéma haïtien. Votre soutien nous permet de continuer à offrir 
            une vitrine gratuite aux créateurs haïtiens et à développer des outils pour la communauté.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Chaque contribution, quelle que soit sa taille, nous rapproche de notre objectif: faire 
            du cinéma haïtien une référence mondiale.
          </p>
        </section>

        {/* Support Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Donation - Empty for now */}
          <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
            <Heart className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Faire un Don</h3>
            <p className="text-gray-400 text-sm mb-4">Soutenez financièrement le développement de LakayTV</p>
            <Button disabled className="bg-gray-600 text-gray-400 cursor-not-allowed w-full">
              Bientôt disponible
            </Button>
            <p className="text-xs text-gray-500 mt-2">PayPal arrive bientôt</p>
          </div>
          
          {/* Share - Real social links */}
          <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
            <Share2 className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Partager LakayTV</h3>
            <p className="text-gray-400 text-sm mb-4">Faites connaître LakayTV à vos amis</p>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm transition-colors"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-sky-500 hover:bg-sky-600 rounded text-white text-sm transition-colors"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
              <a
                href={shareLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm transition-colors"
              >
                <Send className="h-4 w-4" />
                Telegram
              </a>
            </div>
          </div>
          
          {/* Community - Discord */}
          <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
            <Users className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Rejoindre la Communauté</h3>
            <p className="text-gray-400 text-sm mb-4">Discutez avec d&apos;autres passionnés de cinéma haïtien</p>
            <a
              href="https://discord.gg/TytxPNWpe"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Rejoindre Discord
              </Button>
            </a>
          </div>
        </div>

        {/* Impact */}
        <section className="bg-gradient-to-br from-primary/20 to-dark-50 rounded-lg p-6 md:p-8 border border-primary/30 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Votre Impact</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-dark/50 rounded p-4">
              <p className="text-primary text-3xl font-bold">$10</p>
              <p className="text-gray-300 text-sm">Hébergement d&apos;un film pour un mois</p>
            </div>
            <div className="bg-dark/50 rounded p-4">
              <p className="text-primary text-3xl font-bold">$50</p>
              <p className="text-gray-300 text-sm">Marketing pour un créateur</p>
            </div>
            <div className="bg-dark/50 rounded p-4">
              <p className="text-primary text-3xl font-bold">$100</p>
              <p className="text-gray-300 text-sm">Sous-titrage d&apos;un film</p>
            </div>
            <div className="bg-dark/50 rounded p-4">
              <p className="text-primary text-3xl font-bold">$500</p>
              <p className="text-gray-300 text-sm">Développement d&apos;une nouvelle fonctionnalité</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Vous souhaitez un partenariat ou un soutien plus important?
          </p>
          <Link href="/contact">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10">
              Contactez notre équipe
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
