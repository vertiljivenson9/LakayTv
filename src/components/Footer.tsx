import React from "react";
import Link from "next/link";
import { Play, Facebook, MessageCircle, Github, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="h-8 w-8 text-primary fill-primary" />
              <span className="text-2xl font-bold text-white">LakayTV</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              La première plateforme de streaming haïtienne. Découvrez le meilleur du cinéma, 
              des séries et des documentaires d&apos;Haïti et de la diaspora.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1XAX547gjx/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/18096429126"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/vertiljivenson9/LakayTv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:vertiljivenson9@gmail.com"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Plateforme</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/why-lakaytv" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Pourquoi LakayTV
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Creators */}
          <div>
            <h3 className="text-white font-semibold mb-4">Créateurs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/submit" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Soumettre un film
                </Link>
              </li>
              <li>
                <Link href="/producer" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Programme Créateurs
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Communauté</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Soutenir LakayTV
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Pour les Développeurs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
            <MapPin className="h-4 w-4 mr-2" />
            <span>Cap-Haïtien, Haïti</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LakayTV. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
