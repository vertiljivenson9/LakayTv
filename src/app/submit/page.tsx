import React from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Film, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Soumettre un film - LakayTV",
  description: "Soumettez votre film haïtien sur LakayTV et atteignez une audience mondiale.",
};

export default function SubmitPage() {
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
          <Upload className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Soumettre Votre Film</h1>
          <p className="text-gray-400 text-lg">Partagez votre création avec le monde</p>
        </div>

        {/* Benefits */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
            <Film className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Visibilité Mondiale</h3>
            <p className="text-gray-400 text-sm">Votre film accessible à la diaspora haïtienne et au public international</p>
          </div>
          <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
            <CheckCircle className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Revenus Équitables</h3>
            <p className="text-gray-400 text-sm">70% des revenus vont directement aux créateurs</p>
          </div>
          <div className="bg-dark-50 rounded-lg p-6 text-center border border-gray-800">
            <Upload className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Processus Simple</h3>
            <p className="text-gray-400 text-sm">Soumettez en quelques clics et suivez l&apos;avancement</p>
          </div>
        </section>

        {/* Form */}
        <section className="bg-dark-50 rounded-lg p-6 md:p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Formulaire de Soumission</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Titre du film *</label>
                <Input
                  type="text"
                  placeholder="Ex: Kafou"
                  className="bg-dark border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Réalisateur *</label>
                <Input
                  type="text"
                  placeholder="Nom du réalisateur"
                  className="bg-dark border-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Année de production *</label>
                <Input
                  type="number"
                  placeholder="2024"
                  className="bg-dark border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Durée *</label>
                <Input
                  type="text"
                  placeholder="Ex: 1h 45min"
                  className="bg-dark border-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">Genre *</label>
              <select className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md text-white">
                <option value="">Sélectionner un genre</option>
                <option value="drame">Drame</option>
                <option value="comedie">Comédie</option>
                <option value="thriller">Thriller</option>
                <option value="romance">Romance</option>
                <option value="action">Action</option>
                <option value="documentaire">Documentaire</option>
                <option value="court-metrage">Court-métrage</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">Synopsis *</label>
              <textarea
                placeholder="Décrivez votre film en quelques paragraphes..."
                className="w-full h-32 px-3 py-2 bg-dark border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">Lien YouTube/Vimeo du film *</label>
              <Input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                className="bg-dark border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">Email de contact *</label>
              <Input
                type="email"
                placeholder="votre@email.com"
                className="bg-dark border-gray-700 text-white"
                required
              />
            </div>

            <div className="flex items-start">
              <input type="checkbox" id="terms" className="mt-1 mr-3" required />
              <label htmlFor="terms" className="text-gray-400 text-sm">
                J&apos;accepte les <Link href="/terms" className="text-primary hover:underline">conditions d&apos;utilisation</Link> et 
                la <Link href="/privacy" className="text-primary hover:underline">politique de confidentialité</Link> de LakayTV
              </label>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-600 text-white py-6">
              Soumettre mon film
            </Button>
          </form>
        </section>

        {/* Contact */}
        <div className="text-center mt-8">
          <p className="text-gray-400">
            Des questions? <Link href="/contact" className="text-primary hover:underline">Contactez-nous</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
