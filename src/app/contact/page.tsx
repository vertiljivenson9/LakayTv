import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle, Facebook, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Contact - LakayTV",
  description: "Contactez l'équipe LakayTV pour toute question ou suggestion.",
};

export default function ContactPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contactez-Nous</h1>
          <p className="text-gray-400 text-lg">Nous sommes là pour vous aider</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <section className="space-y-6">
            <div className="bg-dark-50 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Informations de Contact</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href="mailto:vertiljivenson9@gmail.com" className="text-white hover:text-primary">
                      vertiljivenson9@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-gray-400 text-sm">WhatsApp</p>
                    <a href="https://wa.me/18096429126" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary">
                      +1 809 642 9126
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-gray-400 text-sm">Localisation</p>
                    <p className="text-white">Cap-Haïtien, Haïti</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-50 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Réseaux Sociaux</h2>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/share/1XAX547gjx/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-dark rounded-lg text-gray-400 hover:text-primary hover:bg-dark-100 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="https://wa.me/18096429126" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-dark rounded-lg text-gray-400 hover:text-green-500 hover:bg-dark-100 transition-colors"
                >
                  <MessageCircle className="h-6 w-6" />
                </a>
                <a 
                  href="https://github.com/vertiljivenson9/LakayTv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-dark rounded-lg text-gray-400 hover:text-white hover:bg-dark-100 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div className="bg-dark-50 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-2">Horaires de Réponse</h2>
              <p className="text-gray-400 text-sm">
                Nous répondons généralement sous 24-48 heures ouvrées.
                Pour les demandes urgentes, utilisez WhatsApp.
              </p>
            </div>
          </section>

          {/* Contact Form */}
          <section className="bg-dark-50 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Envoyez un Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Nom complet *</label>
                <Input
                  type="text"
                  placeholder="Votre nom"
                  className="bg-dark border-gray-700 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">Email *</label>
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  className="bg-dark border-gray-700 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">Sujet *</label>
                <select className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md text-white">
                  <option value="">Sélectionner un sujet</option>
                  <option value="general">Question générale</option>
                  <option value="technical">Problème technique</option>
                  <option value="partnership">Partenariat</option>
                  <option value="submission">Soumission de film</option>
                  <option value="feedback">Commentaires</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">Message *</label>
                <textarea
                  placeholder="Votre message..."
                  className="w-full h-32 px-3 py-2 bg-dark border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary-600 text-white py-6">
                Envoyer le message
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
