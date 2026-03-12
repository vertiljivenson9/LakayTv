"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Info, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Content } from "@/data/content";

interface FeaturedContentProps {
  content: Content;
}

export function FeaturedContent({ content }: FeaturedContentProps) {
  return (
    <div className="relative h-[70vh] min-h-[500px] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={content.thumbnail}
          alt={content.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Category Badge */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-primary text-white rounded-full">
                {content.category === "movie" ? "Film" : 
                 content.category === "series" ? "Série" :
                 content.category === "documentary" ? "Documentaire" : "Court-métrage"}
              </span>
              <span className="text-gray-400 text-sm">{content.year}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {content.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-medium">{content.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">{content.duration}</span>
              </div>
              <span className="text-gray-400">{content.genre}</span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-6 line-clamp-3">
              {content.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href={`/watch/${content.id}`}>
                <Button size="lg" className="bg-primary hover:bg-primary-600 text-white">
                  <Play className="h-5 w-5 mr-2 fill-white" />
                  Regarder
                </Button>
              </Link>
              <Link href={`/film/${content.id}`}>
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-white/10">
                  <Info className="h-5 w-5 mr-2" />
                  Plus d&apos;infos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
