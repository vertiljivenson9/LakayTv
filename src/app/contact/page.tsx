"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle, Facebook, Github, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xpqydgzr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `[LakayTV - ${formData.subject}]`,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
            
            {/* Success Message */}
            {status === "success" && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-green-400 font-medium">Message envoyé!</p>
                  <p className="text-green-400/70 text-sm">Nous vous répondrons bientôt.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-red-400 font-medium">Erreur</p>
                  <p className="text-red-400/70 text-sm">Veuillez réessayer plus tard.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Nom complet *</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-dark border-gray-700 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">Email *</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-dark border-gray-700 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">Sujet *</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md text-white"
                  required
                >
                  <option value="">Sélectionner un sujet</option>
                  <option value="Question générale">Question générale</option>
                  <option value="Problème technique">Problème technique</option>
                  <option value="Partenariat">Partenariat</option>
                  <option value="Soumission de film">Soumission de film</option>
                  <option value="Commentaires">Commentaires</option>
                  <option value="Signaler un problème">Signaler un problème</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">Message *</label>
                <textarea
                  name="message"
                  placeholder="Votre message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full h-32 px-3 py-2 bg-dark border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-600 text-white py-6"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="h-5 w-5 mr-2" />
                    Envoyer le message
                  </span>
                )}
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
