import React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, DollarSign, Users, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Soutenir LakayTV - LakayTV",
  description: "Soutenez le développement de LakayTV et aidez à promouvoir le cinéma haïtien.",
};

export default function SupportPage() {
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
          <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
            <DollarSign className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Don Financier</h3>
            <p className="text-gray-400 text-sm mb-4">Soutenez directement le développement de la plateforme</p>
            <Button className="bg-primary hover:bg-primary-600 text-white w-full">
              Faire un don
            </Button>
          </div>
          
          <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
            <Share2 className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Partager</h3>
            <p className="text-gray-400 text-sm mb-4">Faites connaître LakayTV autour de vous</p>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 w-full">
              Partager
            </Button>
          </div>
          
          <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
            <Users className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Bénévolat</h3>
            <p className="text-gray-400 text-sm mb-4">Mettez vos compétences au service de la communauté</p>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 w-full">
              Rejoindre
            </Button>
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
