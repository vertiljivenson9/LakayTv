"use client";

import React, { useState, useEffect, useCallback } from "react";
import { contents, Content } from "@/data/content";
import { FeaturedContent } from "@/components/FeaturedContent";
import { ContentCard } from "@/components/ContentCard";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

// Horizontal Scroll Section Component
function HorizontalScrollSection({ 
  title, 
  contents, 
  viewAllLink 
}: { 
  title: string; 
  contents: Content[]; 
  viewAllLink?: string;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (contents.length === 0) return null;

  return (
    <section className="relative mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg md:text-xl font-bold text-white">{title}</h2>
          <div className="flex items-center space-x-2">
            {/* Scroll Buttons */}
            <button 
              onClick={() => scroll('left')}
              className="hidden sm:flex p-1.5 rounded-full bg-dark-50 border border-gray-700 text-gray-400 hover:text-white hover:bg-dark-80 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="hidden sm:flex p-1.5 rounded-full bg-dark-50 border border-gray-700 text-gray-400 hover:text-white hover:bg-dark-80 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            {viewAllLink && (
              <Link href={viewAllLink} className="text-primary hover:text-primary-400 flex items-center text-sm ml-2">
                Voir tout <ChevronRight className="h-4 w-4 ml-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-3 px-4 sm:px-6 lg:px-8 pb-2 scroll-smooth"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
        }}
      >
        {/* Add padding at the end for better UX */}
        <div className="flex-shrink-0 w-0" />
        
        {contents.map((content) => (
          <ContentCard key={content.id} content={content} size="small" />
        ))}
        
        {/* Extra space at the end */}
        <div className="flex-shrink-0 w-4" />
      </div>
      
      {/* Gradient Overlays for scroll indication */}
      <div className="absolute left-0 top-8 bottom-0 w-8 bg-gradient-to-r from-dark to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-8 bottom-0 w-8 bg-gradient-to-l from-dark to-transparent pointer-events-none z-10" />
    </section>
  );
}

export default function Home() {
  const [userFilms, setUserFilms] = useState<Content[]>([]);
  const [allContent, setAllContent] = useState<Content[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load user films from localStorage
  const loadUserFilms = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const saved = localStorage.getItem("lakaytv_submitted_films");
    if (saved) {
      try {
        const parsed: Content[] = JSON.parse(saved);
        setUserFilms(parsed);
      } catch (e) {
        console.error("Error loading saved films:", e);
      }
    } else {
      setUserFilms([]);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadUserFilms();
    setMounted(true);
  }, [loadUserFilms]);

  // Listen for storage changes (from other tabs/windows)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "lakaytv_submitted_films") {
        loadUserFilms();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadUserFilms]);

  // Custom event for same-tab updates
  useEffect(() => {
    const handleCustomUpdate = () => {
      loadUserFilms();
    };

    window.addEventListener('lakaytv_content_updated', handleCustomUpdate);
    return () => window.removeEventListener('lakaytv_content_updated', handleCustomUpdate);
  }, [loadUserFilms]);

  // Combine all content
  useEffect(() => {
    setAllContent([...userFilms, ...contents]);
  }, [userFilms]);

  // Don't render until mounted to avoid hydration mismatch
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

  const featured = allContent.filter(c => c.featured);
  const movies = allContent.filter(c => c.category === "movie");
  const series = allContent.filter(c => c.category === "series");
  const documentaries = allContent.filter(c => c.category === "documentary");

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section with Featured Content */}
      {featured.length > 0 && <FeaturedContent content={featured[0]} />}

      {/* Content Sections with Horizontal Scroll */}
      <div className="relative z-10 -mt-16 pb-16">
        {/* User Submitted Films Section (if any) */}
        {userFilms.length > 0 && (
          <div className="pt-4">
            <HorizontalScrollSection 
              title="🎬 Mes Films Ajoutés" 
              contents={userFilms} 
            />
          </div>
        )}

        {/* Continue Watching Section */}
        <div className={userFilms.length > 0 ? '' : 'pt-4'}>
          <HorizontalScrollSection 
            title="Continuer à regarder" 
            contents={allContent.slice(0, 8)} 
            viewAllLink="/watch" 
          />
        </div>

        {/* Movies Section */}
        <HorizontalScrollSection 
          title="Films Haïtiens" 
          contents={movies} 
          viewAllLink="/films" 
        />

        {/* Series Section */}
        <HorizontalScrollSection 
          title="Séries" 
          contents={series} 
          viewAllLink="/series" 
        />

        {/* Documentaries Section */}
        <HorizontalScrollSection 
          title="Documentaires" 
          contents={documentaries} 
          viewAllLink="/documentaries" 
        />

        {/* All Content Grid (at the bottom) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4">Tout le contenu</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
            {allContent.map((content) => (
              <ContentCard key={content.id} content={content} size="small" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
