"use client";

import React from "react";
import { contents, getFeaturedContent, getContentByCategory } from "@/data/content";
import { FeaturedContent } from "@/components/FeaturedContent";
import { ContentCard } from "@/components/ContentCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featured = getFeaturedContent();
  const movies = getContentByCategory("movie");
  const series = getContentByCategory("series");
  const documentaries = getContentByCategory("documentary");

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section with Featured Content */}
      {featured.length > 0 && <FeaturedContent content={featured[0]} />}

      {/* Content Sections */}
      <div className="relative z-10 -mt-20 pb-20">
        {/* Continue Watching Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Continuer à regarder</h2>
            <Link href="/watch" className="text-primary hover:text-primary-400 flex items-center text-sm">
              Voir tout <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {contents.slice(0, 6).map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </section>

        {/* Movies Section */}
        <section id="movies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Films Haïtiens</h2>
            <Link href="/films" className="text-primary hover:text-primary-400 flex items-center text-sm">
              Voir tout <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </section>

        {/* Series Section */}
        <section id="series" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Séries</h2>
            <Link href="/series" className="text-primary hover:text-primary-400 flex items-center text-sm">
              Voir tout <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {series.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </section>

        {/* Documentaries Section */}
        <section id="documentaries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Documentaires</h2>
            <Link href="/documentaries" className="text-primary hover:text-primary-400 flex items-center text-sm">
              Voir tout <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {documentaries.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </section>

        {/* All Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Tout le contenu</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {contents.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
