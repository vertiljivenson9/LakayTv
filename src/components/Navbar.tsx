"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, Search, Bell, User, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contents, Content } from "@/data/content";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Content[]>([]);
  const [userFilms, setUserFilms] = useState<Content[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load user films
  useEffect(() => {
    const saved = localStorage.getItem("lakaytv_submitted_films");
    if (saved) {
      try {
        setUserFilms(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved films:", e);
      }
    }

    // Listen for updates
    const handleUpdate = () => {
      const updated = localStorage.getItem("lakaytv_submitted_films");
      if (updated) {
        try {
          setUserFilms(JSON.parse(updated));
        } catch (e) {
          console.error("Error loading saved films:", e);
        }
      }
    };

    window.addEventListener('lakaytv_content_updated', handleUpdate);
    return () => window.removeEventListener('lakaytv_content_updated', handleUpdate);
  }, []);

  // Search logic
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const allContent = [...userFilms, ...contents];
      const query = searchQuery.toLowerCase();
      const results = allContent.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.genre.toLowerCase().includes(query)
      );
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, userFilms]);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

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
            {/* Search */}
            <div ref={searchRef} className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-64 px-4 py-2 bg-dark-50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  {/* Search Results Dropdown */}
                  {searchResults.length > 0 && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-dark-50 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
                      {searchResults.map((result) => (
                        <Link
                          key={result.id}
                          href={`/film/${result.id}`}
                          className="flex items-center space-x-3 p-3 hover:bg-dark-80 transition-colors"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <Image
                            src={result.thumbnail}
                            alt={result.title}
                            width={48}
                            height={64}
                            className="object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{result.title}</p>
                            <p className="text-gray-400 text-sm">{result.genre} • {result.year}</p>
                          </div>
                        </Link>
                      ))}
                      <Link
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        className="block p-3 text-center text-primary hover:bg-dark-80 transition-colors text-sm"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        Voir tous les résultats →
                      </Link>
                    </div>
                  )}
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-primary"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            <Button variant="ghost" size="icon" className="text-white hover:text-primary relative">
              <Bell className="h-5 w-5" />
              {/* Notification dot */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
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
            {/* Mobile Search */}
            <div className="px-4 py-3">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full px-4 py-2 bg-dark-50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
              </form>
            </div>

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
