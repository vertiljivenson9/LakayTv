import React from "react";
import Link from "next/link";
import { ArrowLeft, Target, Eye, Zap, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Pourquoi LakayTV - LakayTV",
  description: "Découvrez pourquoi LakayTV existe et comment nous transformons le paysage médiatique haïtien.",
};

export default function WhyLakayTVPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Pourquoi LakayTV Existe</h1>
          <p className="text-gray-400 text-lg">Une réponse à un besoin urgent</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* The Problem */}
          <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">Le Problème</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Pendant trop longtemps, le contenu haïtien a été sous-représenté, mal distribué, ou tout 
              simplement invisible sur les plateformes de streaming mainstream. Les créateurs haïtiens 
              talentueux peinent à trouver une audience, et les spectateurs intéressés par la culture 
              haïtienne n&apos;ont pas d&apos;endroit centralisé pour découvrir des contenus de qualité.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Les stéréotypes négatifs sur Haïti dominent souvent les médias internationaux, laissant 
              peu de place pour les récits authentiques, nuancés et positifs que les Haïtiens ont à offrir. 
              C&apos;est cette réalité injuste que nous cherchons à changer.
            </p>
          </section>

          {/* Our Solution */}
          <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">Notre Solution</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              LakayTV crée un écosystème complet pour le contenu haïtien. Nous offrons une plateforme 
              dédiée exclusivement aux créations audiovisuelles haïtiennes, avec une qualité de 
              diffusion qui rivalise avec les grandes plateformes internationales.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                Une vitrine pour les films, séries et documentaires haïtiens
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                Un système de revenus équitable pour les créateurs
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                Une promotion active auprès de la diaspora et du public international
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                Une communauté engagée et passionnée
              </li>
            </ul>
          </section>

          {/* The Impact */}
          <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">L&apos;Impact</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Chaque visionnage sur LakayTV contribue à l&apos;économie créative haïtienne. Chaque film 
              découvert change la perception d&apos;Haïti. Chaque créateur soutenu inspire la prochaine 
              génération de talents.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Nous ne faisons pas que diffuser du contenu. Nous construisons un mouvement culturel qui 
              célèbre la créativité, la résilience et la beauté d&apos;Haïti.
            </p>
          </section>

          {/* Join Us */}
          <section className="bg-gradient-to-br from-primary/20 to-dark-50 rounded-lg p-6 md:p-8 border border-primary/30">
            <div className="flex items-center space-x-3 mb-4">
              <Rocket className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">Rejoignez le Mouvement</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              LakayTV n&apos;est pas juste une plateforme. C&apos;est un appel à l&apos;action pour tous ceux qui 
              croient en le potentiel d&apos;Haïti. Que vous soyez créateur, spectateur, ou simplement curieux, 
              il y a une place pour vous dans notre communauté.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/submit">
                <Button className="bg-primary hover:bg-primary-600 text-white">
                  Soumettre votre film
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10">
                  Soutenir LakayTV
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
