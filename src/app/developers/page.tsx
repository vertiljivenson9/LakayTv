import React from "react";
import Link from "next/link";
import { ArrowLeft, Code, Github, Book, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Pour les Développeurs - LakayTV",
  description: "Ressources et documentation pour les développeurs souhaitant contribuer à LakayTV.",
};

export default function DevelopersPage() {
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
          <Code className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Pour les Développeurs</h1>
          <p className="text-gray-400 text-lg">Construisez avec LakayTV</p>
        </div>

        {/* Tech Stack */}
        <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Stack Technologique</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-dark rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Frontend</h3>
              <ul className="text-gray-400 space-y-1">
                <li>Next.js 15 (App Router)</li>
                <li>React 19</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>shadcn/ui Components</li>
              </ul>
            </div>
            <div className="bg-dark rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Infrastructure</h3>
              <ul className="text-gray-400 space-y-1">
                <li>Cloudflare Pages</li>
                <li>YouTube Embed API</li>
                <li>Edge Functions</li>
                <li>Static Site Generation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Resources */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <a 
            href="https://github.com/vertiljivenson9/LakayTv" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800 hover:border-primary transition-colors"
          >
            <Github className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">GitHub</h3>
            <p className="text-gray-400 text-sm">Code source et contributions</p>
          </a>
          
          <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
            <Book className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Documentation</h3>
            <p className="text-gray-400 text-sm">Guide d&apos;utilisation (bientôt)</p>
          </div>
          
          <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
            <Terminal className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">API</h3>
            <p className="text-gray-400 text-sm">API publique (bientôt)</p>
          </div>
        </div>

        {/* Contribute */}
        <section className="bg-gradient-to-br from-primary/20 to-dark-50 rounded-lg p-6 md:p-8 border border-primary/30 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Comment Contribuer</h2>
          <ol className="space-y-4 text-gray-300">
            <li className="flex items-start">
              <span className="text-primary font-bold mr-3">1.</span>
              <span>Forkez le repository sur GitHub</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-3">2.</span>
              <span>Créez une branche pour votre fonctionnalité (git checkout -b feature/nom-fonctionnalite)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-3">3.</span>
              <span>Committez vos changements (git commit -m &apos;Ajout fonctionnalité&apos;)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-3">4.</span>
              <span>Poussez vers la branche (git push origin feature/nom-fonctionnalite)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary font-bold mr-3">5.</span>
              <span>Ouvrez une Pull Request</span>
            </li>
          </ol>
        </section>

        {/* Ideas */}
        <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Idées de Contribution</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              Application mobile React Native
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              Système de sous-titres automatiques (créole/français/anglais)
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              Intégration avec d&apos;autres plateformes vidéo
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              Système de recommandation basé sur l&apos;IA
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              Dashboard analytics avancé pour créateurs
            </li>
          </ul>
        </section>

        {/* Contact */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Vous avez des idées ou des questions techniques?
          </p>
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary-600 text-white">
              Contacter l&apos;équipe technique
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
