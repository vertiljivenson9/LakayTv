import React from "react";
import Link from "next/link";
import { ArrowLeft, Play, Heart, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "À propos - LakayTV",
  description: "Découvrez l'histoire et la mission de LakayTV, la première plateforme de streaming haïtienne.",
};

export default function AboutPage() {
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
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Play className="h-12 w-12 text-primary fill-primary" />
            <span className="text-4xl font-bold text-white">LakayTV</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">À Propos de LakayTV</h1>
          <p className="text-gray-400 text-lg">La voix d&apos;Haïti sur le monde numérique</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Mission */}
          <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">Notre Mission</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              LakayTV est née d&apos;une vision simple mais puissante: créer une plateforme dédiée exclusivement 
              à la promotion et à la diffusion du contenu audiovisuel haïtien. Dans un monde où les 
              plateformes de streaming internationales dominent, nous avons choisi de mettre en lumière 
              les histoires, les talents et la culture d&apos;Haïti.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Notre mission est de devenir le pont entre les créateurs haïtiens et leur audience mondiale, 
              en offrant une vitrine numérique pour le cinéma, les documentaires, les séries et les courts-métrages 
              qui racontent l&apos;histoire d&apos;Haïti d&apos;une manière authentique et captivante.
            </p>
          </section>

          {/* Vision */}
          <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">Notre Vision</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Nous envisionons un avenir où chaque film haïtien trouve son audience, où chaque réalisateur 
              haïtien peut vivre de son art, et où la culture haïtienne brille sur la scène mondiale. 
              LakayTV aspire à être le catalyseur d&apos;une renaissance cinématographique haïtienne.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Nous croyons fermement que les histoires haïtiennes méritent d&apos;être racontées par des 
              Haïtiens, avec authenticité, passion et fierté. C&apos;est pourquoi nous nous engageons à 
              soutenir les talents locaux et à promouvoir une image positive et nuancée d&apos;Haïti.
            </p>
          </section>

          {/* Community */}
          <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">Notre Communauté</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              LakayTV n&apos;est pas seulement une plateforme de streaming, c&apos;est une communauté. Une 
              communauté de créateurs, de passionnés de cinéma, de patriotes haïtiens et de curieux 
              du monde entier qui souhaitent découvrir la richesse culturelle d&apos;Haïti.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Rejoignez-nous dans cette aventure. Ensemble, construisons un espace où la culture haïtienne 
              peut s&apos;épanouir, où les talents émergents peuvent être découverts, et où les histoires 
              d&apos;Haïti résonnent à travers le monde.
            </p>
          </section>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
              <p className="text-3xl font-bold text-primary mb-2">50+</p>
              <p className="text-gray-400 text-sm">Films & Séries</p>
            </div>
            <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
              <p className="text-3xl font-bold text-primary mb-2">10K+</p>
              <p className="text-gray-400 text-sm">Spectateurs</p>
            </div>
            <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
              <p className="text-3xl font-bold text-primary mb-2">25+</p>
              <p className="text-gray-400 text-sm">Créateurs</p>
            </div>
            <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
              <p className="text-3xl font-bold text-primary mb-2">5</p>
              <p className="text-gray-400 text-sm">Pays atteints</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary-600 text-white px-8 py-6 text-lg">
                Découvrir le contenu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
