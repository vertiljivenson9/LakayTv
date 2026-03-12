"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getContentById, contents } from "@/data/content";
import { ContentCard } from "@/components/ContentCard";

export default function WatchPage() {
  const params = useParams();
  const contentId = params.id as string;
  const content = getContentById(contentId);

  if (!content) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Vidéo non trouvée</h1>
          <Link href="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related content
  const relatedContent = contents
    .filter((c) => c.id !== content.id)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-dark pt-16">
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
              <iframe
                src={`https://www.youtube.com/embed/${content.youtubeId}?autoplay=1`}
                title={content.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Video Info */}
            <div className="mt-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {content.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{content.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{content.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{content.year}</span>
                </div>
                <span className="px-2 py-1 bg-dark-50 rounded text-sm">{content.genre}</span>
              </div>
              <p className="text-gray-300 mt-4 leading-relaxed">
                {content.description}
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
                    <div className="relative w-40 aspect-video rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={c.thumbnail}
                        alt={c.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {c.title}
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">{c.genre}</p>
                      <p className="text-gray-500 text-xs">{c.duration}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* More Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold text-white mb-6">Autres contenus</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {contents.slice(6).map((c) => (
            <ContentCard key={c.id} content={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
