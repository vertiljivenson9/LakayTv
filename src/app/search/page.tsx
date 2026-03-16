"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { contents, Content } from "@/data/content";
import { ContentCard } from "@/components/ContentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Content[]>([]);
  const [userFilms, setUserFilms] = useState<Content[]>([]);
  const [allContent, setAllContent] = useState<Content[]>([]);

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
  }, []);

  // Combine all content
  useEffect(() => {
    setAllContent([...userFilms, ...contents]);
  }, [userFilms]);

  // Search logic
  useEffect(() => {
    if (query.trim().length > 0) {
      const searchLower = query.toLowerCase();
      const filtered = allContent.filter(
        (c) =>
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower) ||
          c.genre.toLowerCase().includes(searchLower) ||
          c.director?.toLowerCase().includes(searchLower) ||
          c.cast?.some((actor) => actor.toLowerCase().includes(searchLower))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, allContent]);

  // Handle search form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL without navigation
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.pushState({}, "", url.toString());
  };

  return (
    <div className="min-h-screen bg-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour à l&apos;accueil
        </Link>

        {/* Search Form */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Recherche</h1>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un film, une série, un acteur..."
                className="pl-10 py-6 bg-dark-50 border-gray-700 text-white text-lg focus:border-primary"
                autoFocus
              />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary-600 py-6 px-8">
              Rechercher
            </Button>
          </form>
        </div>

        {/* Results */}
        <div>
          {query.trim().length > 0 && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-gray-400">
                {results.length} résultat{results.length !== 1 ? "s" : ""} pour &quot;{query}&quot;
              </h2>
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {results.map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          ) : query.trim().length > 0 ? (
            <div className="text-center py-16">
              <SearchIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">Aucun résultat trouvé</p>
              <p className="text-gray-500">
                Essayez avec d&apos;autres mots-clés ou vérifiez l&apos;orthographe
              </p>
            </div>
          ) : (
            <div className="text-center py-16">
              <SearchIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                Tapez votre recherche pour commencer
              </p>
            </div>
          )}
        </div>

        {/* Popular searches */}
        {query.trim().length === 0 && (
          <div className="mt-12">
            <h3 className="text-white font-medium mb-4">Recherches populaires</h3>
            <div className="flex flex-wrap gap-2">
              {["Tonton Dezirab", "Comédie", "Drame", "Romance", "2024", "2025"].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-dark-50 text-gray-300 rounded-full hover:bg-dark-80 hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
