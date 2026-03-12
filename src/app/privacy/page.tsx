import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Politique de Confidentialité - LakayTV",
  description: "Politique de confidentialité de LakayTV - Comment nous protégeons vos données.",
};

export default function PrivacyPage() {
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
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Politique de Confidentialité</h1>
          <p className="text-gray-400">Dernière mise à jour: Mars 2026</p>
        </div>

        {/* Content */}
        <div className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800">
          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                LakayTV s&apos;engage à protéger la vie privée de ses utilisateurs. Cette politique de 
                confidentialité explique comment nous collectons, utilisons et protégeons vos 
                informations personnelles lorsque vous utilisez notre plateforme de streaming.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Données Collectées</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Nous pouvons collecter les types de données suivants:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Informations de compte (nom, email, mot de passe chiffré)</li>
                <li>Données de visionnage (films regardés, temps de visionnage)</li>
                <li>Informations de paiement (traitées par des tiers sécurisés)</li>
                <li>Données techniques (adresse IP, type d&apos;appareil, navigateur)</li>
                <li>Préférences et paramètres de l&apos;utilisateur</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Utilisation des Données</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Vos données sont utilisées pour:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Fournir et améliorer nos services de streaming</li>
                <li>Personnaliser votre expérience et vos recommandations</li>
                <li>Traiter les paiements et les abonnements</li>
                <li>Communiquer avec vous concernant votre compte</li>
                <li>Assurer la sécurité de la plateforme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Partage des Données</h2>
              <p className="text-gray-300 leading-relaxed">
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager certaines 
                informations avec des partenaires de confiance pour le traitement des paiements, 
                l&apos;hébergement de contenu, et l&apos;analyse de données, toujours dans le respect des 
                lois applicables.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Sécurité</h2>
              <p className="text-gray-300 leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles 
                pour protéger vos données, incluant le chiffrement SSL, l&apos;authentification 
                sécurisée, et des audits réguliers de sécurité.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Vos Droits</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Vous avez le droit de:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Accéder à vos données personnelles</li>
                <li>Corriger les informations inexactes</li>
                <li>Demander la suppression de votre compte</li>
                <li>Vous opposer au traitement de vos données</li>
                <li>Porter plainte auprès d&apos;une autorité de protection des données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Cookies</h2>
              <p className="text-gray-300 leading-relaxed">
                LakayTV utilise des cookies pour améliorer votre expérience, mémoriser vos 
                préférences et analyser l&apos;utilisation de la plateforme. Vous pouvez gérer 
                vos préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Contact</h2>
              <p className="text-gray-300 leading-relaxed">
                Pour toute question concernant cette politique, contactez-nous à:{" "}
                <a href="mailto:vertiljivenson9@gmail.com" className="text-primary hover:underline">
                  vertiljivenson9@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
