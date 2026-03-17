"use client";

// Required for Cloudflare Pages
export const runtime = 'edge';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getContentById, contents, Content } from "@/data/content";
import { ContentCard } from "@/components/ContentCard";
import { NetflixIntro } from "@/components/NetflixIntro";
import { use } from "react";

// Watch Page - Client Component for Cloudflare compatibility
export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const [userFilms, setUserFilms] = useState<Content[]>([]);
  const [content, setContent] = useState<Content | null>(null);
  const [allContent, setAllContent] = useState<Content[]>([]);
  const [showIntro, setShowIntro] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
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

  // Determine if we should show intro
  useEffect(() => {
    if (!mounted || !content) return;
    
    if (!isWatched) {
      setShowIntro(true);
    } else {
      setShowPlayer(true);
    }
  }, [content, isWatched, mounted]);

  // Handle intro complete
  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowPlayer(true);
    setIsWatched(true);
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
          <h1 className="text-2xl font-bold text-white mb-4">Vidéo non trouvée</h1>
          <p className="text-gray-400 mb-4">
            Cette vidéo n&apos;a pas été trouvée. Elle peut avoir été supprimée ou le lien est incorrect.
          </p>
          <Link href="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Validate content
  if (!content.youtubeId) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Vidéo invalide</h1>
          <p className="text-gray-400 mb-4">
            Les informations de cette vidéo sont incomplètes.
          </p>
          <Link href="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related content
  const relatedContent = allContent
    .filter((c) => c.id !== content.id)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-dark pt-16">
      {/* Netflix-Style Intro */}
      {showIntro && (
        <NetflixIntro onComplete={handleIntroComplete} contentId={id} />
      )}

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href={`/film/${content.id}`} className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour aux détails
        </Link>
      </div>

      {/* Video Player Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Player */}
          <div className="lg:col-span-2">
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              {showPlayer ? (
                <iframe
                  src={`https://www.youtube.com/embed/${content.youtubeId}?autoplay=1`}
                  title={content.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-primary/40" />
                    </div>
                    <p className="text-gray-400">Chargement...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="mt-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {content.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{content.rating || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{content.duration || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{content.year}</span>
                </div>
                <span className="px-2 py-1 bg-dark-50 rounded text-sm">{content.genre || "N/A"}</span>
                {isWatched && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                    ✓ Déjà vu
                  </span>
                )}
              </div>
              <p className="text-gray-300 mt-4 leading-relaxed">
                {content.description || "Aucune description disponible."}
              </p>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">À suivre</h3>
            <div className="space-y-4">
              {relatedContent.map((c) => (
                <Link key={c.id} href={`/watch/${c.id}`} className="block group">
                  <div className="flex gap-3">
                    <div className="relative w-40 aspect-video rounded overflow-hidden flex-shrink-0 bg-dark-50">
                      <Image
                        src={c.thumbnail}
                        alt={c.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {c.title}
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">{c.genre || "N/A"}</p>
                      <p className="text-gray-500 text-xs">{c.duration || "N/A"}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* More Content */}
      {allContent.length > 6 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-bold text-white mb-6">Autres contenus</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {allContent.slice(6).map((c) => (
              <ContentCard key={c.id} content={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
