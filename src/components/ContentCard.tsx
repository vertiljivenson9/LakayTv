"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Star } from "lucide-react";
import { Content } from "@/data/content";

interface ContentCardProps {
  content: Content;
}

export function ContentCard({ content }: ContentCardProps) {
  return (
    <Link href={`/film/${content.id}`}>
      <div className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-dark-50 cursor-pointer">
        {/* Thumbnail */}
        <Image
          src={content.thumbnail}
          alt={content.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
            <Play className="h-7 w-7 text-white fill-white ml-1" />
          </div>
        </div>
        
        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-semibold text-sm truncate">{content.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-gray-400 text-xs">{content.year}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-400 text-xs">{content.rating}</span>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 text-xs font-medium bg-primary/80 text-white rounded">
            {content.category === "movie" ? "Film" : 
             content.category === "series" ? "Série" :
             content.category === "documentary" ? "Doc" : "Court"}
          </span>
        </div>
      </div>
      
      {/* Title (always visible below card) */}
      <div className="mt-2">
        <h3 className="text-white font-medium text-sm truncate">{content.title}</h3>
        <p className="text-gray-500 text-xs truncate">{content.genre} • {content.duration}</p>
      </div>
    </Link>
  );
}
