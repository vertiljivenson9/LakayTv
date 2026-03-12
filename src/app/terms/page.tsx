import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Conditions d'Utilisation - LakayTV",
  description: "Conditions d'utilisation de la plateforme LakayTV.",
};

export default function TermsPage() {
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
          <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Conditions d&apos;Utilisation</h1>
          <p className="text-gray-400">Dernière mise à jour: Mars 2026</p>
        </div>

        {/* Content */}
        <div className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800">
          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Acceptation des Conditions</h2>
              <p className="text-gray-300 leading-relaxed">
                En accédant et en utilisant LakayTV, vous acceptez d&apos;être lié par ces conditions 
                d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser 
                notre plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Description du Service</h2>
              <p className="text-gray-300 leading-relaxed">
                LakayTV est une plateforme de streaming dédiée au contenu audiovisuel haïtien. 
                Nous offrons un accès à des films, séries, documentaires et courts-métrages 
                produits par des créateurs haïtiens ou portant sur la culture haïtienne.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Comptes Utilisateurs</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Pour accéder à certaines fonctionnalités, vous devrez créer un compte. Vous êtes 
                responsable de:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Maintenir la confidentialité de vos identifiants</li>
                <li>Toutes les activités effectuées sous votre compte</li>
                <li>Fournir des informations exactes et à jour</li>
                <li>Nous informer de toute utilisation non autorisée</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Utilisation Acceptable</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Vous vous engagez à ne pas:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Utiliser la plateforme à des fins illégales</li>
                <li>Copier, télécharger ou redistribuer le contenu sans autorisation</li>
                <li>Contourner les mesures de protection du contenu</li>
                <li>Harceler ou porter atteinte à d&apos;autres utilisateurs</li>
                <li>Tenter d&apos;accéder non autorisé à nos systèmes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Propriété Intellectuelle</h2>
              <p className="text-gray-300 leading-relaxed">
                Tout le contenu disponible sur LakayTV, incluant les films, séries, images, 
                textes et logos, est protégé par le droit d&apos;auteur. Les créateurs conservent 
                leurs droits sur leurs œuvres. LakayTV dispose d&apos;une licence pour diffuser 
                ce contenu sur sa plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Abonnements et Paiements</h2>
              <p className="text-gray-300 leading-relaxed">
                Certains contenus peuvent nécessiter un abonnement ou un paiement unique. Les 
                prix sont affichés en gourdes haïtiennes (HTG) ou en dollars américains (USD). 
                Les paiements sont traités de manière sécurisée par nos partenaires. Les 
                abonnements sont renouvelés automatiquement sauf annulation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Soumission de Contenu</h2>
              <p className="text-gray-300 leading-relaxed">
                Les créateurs souhaitant soumettre leur contenu doivent respecter nos directives 
                de soumission. En soumettant du contenu, vous confirmez en être le propriétaire 
                légitime ou disposer des droits nécessaires pour sa diffusion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Limitation de Responsabilité</h2>
              <p className="text-gray-300 leading-relaxed">
                LakayTV fournit le contenu &quot;tel quel&quot; et ne garantit pas l&apos;absence d&apos;erreurs 
                ou d&apos;interruptions. Nous ne sommes pas responsables des dommages indirects 
                résultant de l&apos;utilisation de la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">9. Modifications</h2>
              <p className="text-gray-300 leading-relaxed">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les 
                utilisateurs seront informés des changements significatifs par email ou 
                notification sur la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">10. Loi Applicable</h2>
              <p className="text-gray-300 leading-relaxed">
                Ces conditions sont régies par les lois de la République d&apos;Haïti. Tout litige 
                sera soumis aux tribunaux compétents de Port-au-Prince.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">11. Contact</h2>
              <p className="text-gray-300 leading-relaxed">
                Pour toute question concernant ces conditions:{" "}
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
