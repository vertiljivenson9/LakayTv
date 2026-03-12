"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Bell, User, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Play className="h-8 w-8 text-primary fill-primary" />
              <span className="text-2xl font-bold text-white">LakayTV</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/#movies" className="text-gray-300 hover:text-primary transition-colors">
              Films
            </Link>
            <Link href="/#series" className="text-gray-300 hover:text-primary transition-colors">
              Séries
            </Link>
            <Link href="/#documentaries" className="text-gray-300 hover:text-primary transition-colors">
              Documentaires
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
              <Bell className="h-5 w-5" />
            </Button>
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-100 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-white hover:bg-dark-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/#movies"
                className="block px-3 py-2 text-gray-300 hover:bg-dark-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Films
              </Link>
              <Link
                href="/#series"
                className="block px-3 py-2 text-gray-300 hover:bg-dark-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Séries
              </Link>
              <Link
                href="/#documentaries"
                className="block px-3 py-2 text-gray-300 hover:bg-dark-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Documentaires
              </Link>
              <Link
                href="/admin"
                className="block px-3 py-2 text-gray-300 hover:bg-dark-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <Link
                href="/producer"
                className="block px-3 py-2 text-gray-300 hover:bg-dark-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Producteurs
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
