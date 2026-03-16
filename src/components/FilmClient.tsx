"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, ArrowLeft, Star, Clock, Calendar, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getContentById, contents, Content } from "@/data/content";
import { ContentCard } from "@/components/ContentCard";
import { NetflixIntro } from "@/components/NetflixIntro";

interface FilmClientProps {
  id: string;
}

export function FilmClient({ id }: FilmClientProps) {
  const [showIntro, setShowIntro] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [userFilms, setUserFilms] = useState<Content[]>([]);
  const [content, setContent] = useState<Content | null>(null);
  const [allContent, setAllContent] = useState<Content[]>([]);
  const [isWatched, setIsWatched] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Load user films from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lakaytv_submitted_films");
      if (saved) {
        try {
          const parsed: Content[] = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setUserFilms(parsed);
          }
        } catch (e) {
          console.error("Error parsing saved films:", e);
          // Clear invalid data
          localStorage.removeItem("lakaytv_submitted_films");
        }
      }

      // Check if already watched
      const watchedContent = JSON.parse(localStorage.getItem("lakaytv_watched_content") || "[]");
      if (Array.isArray(watchedContent)) {
        setIsWatched(watchedContent.includes(id));
      }
    } catch (e) {
      console.error("Error accessing localStorage:", e);
    }
    
    setMounted(true);
  }, [id]);

  // Combine content and find the film
  useEffect(() => {
    if (!mounted) return;
    
    try {
      const combined = [...userFilms, ...contents];
      setAllContent(combined);
      
      // First check user films, then static content
      const userFilm = userFilms.find(f => f.id === id);
      const staticFilm = getContentById(id);
      
      if (userFilm) {
        setContent(userFilm);
      } else if (staticFilm) {
        setContent(staticFilm);
      } else {
        setContent(null);
      }
    } catch (e) {
      console.error("Error finding content:", e);
      setHasError(true);
    }
  }, [id, userFilms, mounted]);

  // Handle play button click - show intro first (only if not watched)
  const handlePlayClick = () => {
    if (isWatched) {
      // Already watched, go directly to player
      setShowPlayer(true);
    } else {
      // First time watching, show intro
      setShowIntro(true);
    }
  };

  // Handle intro complete - show YouTube player
  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowPlayer(true);
    setIsWatched(true);
  };

  // Handle close player
  const handleClosePlayer = () => {
    setShowIntro(false);
    setShowPlayer(false);
  };

  // Loading state
  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Erreur</h1>
          <p className="text-gray-400 mb-4">
            Une erreur s&apos;est produite lors du chargement du contenu.
          </p>
          <Link href="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Contenu non trouvé</h1>
          <p className="text-gray-400 mb-4">
            Ce film n&apos;a pas été trouvé. Il peut avoir été supprimé ou le lien est incorrect.
          </p>
          <Link href="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Validate content has required fields
  if (!content.thumbnail || !content.title || !content.youtubeId) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Contenu invalide</h1>
          <p className="text-gray-400 mb-4">
            Les informations de ce film sont incomplètes.
          </p>
          <Link href="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related content (same category, excluding current)
  const relatedContent = allContent
    .filter((c) => c.category === content.category && c.id !== content.id)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-dark pt-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 h-[500px]">
          <Image
            src={content.thumbnail}
            alt={content.title}
            fill
            className="object-cover opacity-30"
            priority
            onError={(e) => {
              // Hide broken image
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/80 to-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl relative group bg-dark-50">
                <Image
                  src={content.thumbnail}
                  alt={content.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback for broken image
                    e.currentTarget.src = '/logo.svg';
                  }}
                />
                {/* Play overlay */}
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </div>
                </button>
              </div>
              {/* Watched indicator */}
              {isWatched && (
                <div className="mt-2 text-center text-green-400 text-sm flex items-center justify-center gap-1">
                  <User className="h-4 w-4" />
                  Déjà vu
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:col-span-2">
              {/* Category & Year */}
              <div className="flex items-center flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 text-sm font-medium bg-primary text-white rounded-full">
                  {content.category === "movie" ? "Film" : 
                   content.category === "series" ? "Série" :
                   content.category === "documentary" ? "Documentaire" : "Court-métrage"}
                </span>
                <span className="text-gray-400">{content.year}</span>
                {isWatched && (
                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                    ✓ Déjà vu
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {content.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-white font-medium">{content.rating || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">{content.duration || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">{content.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">{content.genre || "N/A"}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {content.description || "Aucune description disponible."}
              </p>

              {/* Director */}
              {content.director && (
                <div className="flex items-center mb-4">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-400">Réalisateur:</span>
                  <span className="text-white ml-2">{content.director}</span>
                </div>
              )}

              {/* Cast */}
              {content.cast && content.cast.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-white font-medium mb-2">Distribution</h3>
                  <div className="flex flex-wrap gap-2">
                    {content.cast.map((actor, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-dark-50 text-gray-300 rounded-full text-sm"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-600 text-white"
                  onClick={handlePlayClick}
                >
                  <Play className="h-5 w-5 mr-2 fill-white" />
                  {isWatched ? "Regarder à nouveau" : "Regarder maintenant"}
                </Button>
                <Link href={`/watch/${content.id}`}>
                  <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-white/10">
                    Ouvrir en plein écran
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Netflix-Style Intro - Only shows for new content */}
      {showIntro && (
        <NetflixIntro onComplete={handleIntroComplete} contentId={id} />
      )}

      {/* Embedded Player Modal */}
      {showPlayer && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="w-full max-w-6xl aspect-video relative">
            {/* Close Button */}
            <button
              onClick={handleClosePlayer}
              className="absolute -top-10 right-0 text-white hover:text-primary transition-colors z-10"
            >
              Fermer ✕
            </button>
            
            {/* YouTube Embed */}
            <iframe
              src={`https://www.youtube.com/embed/${content.youtubeId}?autoplay=1`}
              title={content.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Related Content */}
      {relatedContent.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Contenu similaire</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {relatedContent.map((c) => (
              <ContentCard key={c.id} content={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
