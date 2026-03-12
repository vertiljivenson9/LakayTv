import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle, Target, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Roadmap - LakayTV",
  description: "Découvrez les futures fonctionnalités et le développement de LakayTV.",
};

export default function RoadmapPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Roadmap LakayTV</h1>
          <p className="text-gray-400 text-lg">Notre voyage vers l&apos;excellence</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Phase 1 - Completed */}
          <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-green-600">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <h2 className="text-2xl font-bold text-white">Phase 1: Lancement (Actuel)</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              La première version de LakayTV est maintenant disponible avec les fonctionnalités essentielles 
              pour découvrir et regarder du contenu haïtien de qualité.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                Plateforme de streaming web
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                Catalogue de films et séries haïtiens
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                Système de catégories (Films, Séries, Documentaires)
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                Interface bilingue (Français/Créole)
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                Dashboard producteur
              </li>
            </ul>
          </section>

          {/* Phase 2 - In Progress */}
          <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-yellow-600">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-white">Phase 2: Croissance (Q2 2026)</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Expansion des fonctionnalités et amélioration de l&apos;expérience utilisateur.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="text-yellow-500 mr-3">○</span>
                Application mobile iOS et Android
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-3">○</span>
                Système de comptes utilisateurs
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-3">○</span>
                Listes de lecture personnalisées
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-3">○</span>
                Système de notation et commentaires
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-3">○</span>
                Recommandations personnalisées
              </li>
            </ul>
          </section>

          {/* Phase 3 - Planned */}
          <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-blue-600">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-white">Phase 3: Monétisation (Q3 2026)</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Mise en place d&apos;un modèle économique durable pour les créateurs.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">○</span>
                Abonnement premium sans publicité
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">○</span>
                Paiement direct aux créateurs
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">○</span>
                Location et achat de films
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">○</span>
                Analytics avancés pour producteurs
              </li>
            </ul>
          </section>

          {/* Phase 4 - Vision */}
          <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-purple-600">
            <div className="flex items-center space-x-3 mb-4">
              <Rocket className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-white">Phase 4: Expansion (2027+)</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Devenir le leader du streaming caribéen et africain francophone.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="text-purple-500 mr-3">○</span>
                Contenu original LakayTV Productions
              </li>
              <li className="flex items-center">
                <span className="text-purple-500 mr-3">○</span>
                Expansion aux autres pays caribéens
              </li>
              <li className="flex items-center">
                <span className="text-purple-500 mr-3">○</span>
                Partenariats avec festivals de cinéma
              </li>
              <li className="flex items-center">
                <span className="text-purple-500 mr-3">○</span>
                Événements en direct et rediffusions
              </li>
            </ul>
          </section>

          {/* CTA */}
          <div className="text-center pt-8">
            <p className="text-gray-400 mb-4">Vous avez des suggestions pour notre roadmap?</p>
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary-600 text-white">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
