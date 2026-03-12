'use client'

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// SVG Icons
const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

interface ContentData {
  id: string;
  title: string;
  youtubeId: string;
  type: string;
  language: string;
  rating: number;
  year: number;
  description: string;
  genre: string;
}

// Base de datos de demo con videos reales de YouTube
const demoContent: Record<string, ContentData> = {
  'featured-1': { id: 'featured-1', title: 'ENSANSIB', youtubeId: 'JOcNyL5tUO4', type: 'FILM', language: 'Creole', rating: 4.9, year: 2024, description: 'Une production de Magic Film, ecrit et realise par Steeve Bicot. Une tragique histoire de couple.', genre: 'Drame' },
  'top1': { id: 'top1', title: 'ENSANSIB', youtubeId: 'JOcNyL5tUO4', type: 'FILM', language: 'Creole', rating: 4.9, year: 2024, description: 'Tragique histoire de couple par Steeve Bicot.', genre: 'Drame' },
  'top2': { id: 'top2', title: 'LANMO MANMAN M', youtubeId: 'ZUM4UKnspCg', type: 'SERIE', language: 'Creole', rating: 4.8, year: 2024, description: 'Feyton populaire par CHARLY HSM.', genre: 'Drame' },
  'top3': { id: 'top3', title: '2 FRERES JALOUX', youtubeId: 'PoUe8bCHGRo', type: 'FILM', language: 'Creole', rating: 4.7, year: 2025, description: 'Nouveau film haitien par Steeve Bicot.', genre: 'Drame' },
  'top4': { id: 'top4', title: 'MANMAN ZONBI', youtubeId: 'F43oGHZM1A4', type: 'FILM', language: 'Creole', rating: 4.6, year: 2024, description: 'Horreur et traditions vaudou haitiennes.', genre: 'Horreur' },
  'top5': { id: 'top5', title: 'PASYANS', youtubeId: 'i-tEGbafd0c', type: 'FILM', language: 'Creole', rating: 4.6, year: 2024, description: 'Un film poignant sur la perseverance.', genre: 'Drame' },
  'f1': { id: 'f1', title: 'ENSANSIB', youtubeId: 'JOcNyL5tUO4', type: 'FILM', language: 'Creole', rating: 4.9, year: 2024, description: 'Tragique histoire de couple', genre: 'Drame' },
  'f2': { id: 'f2', title: '2 FRERES JALOUX', youtubeId: 'PoUe8bCHGRo', type: 'FILM', language: 'Creole', rating: 4.7, year: 2025, description: 'Jalousie fraternelle', genre: 'Drame' },
  'f3': { id: 'f3', title: 'MANMAN ZONBI', youtubeId: 'F43oGHZM1A4', type: 'FILM', language: 'Creole', rating: 4.6, year: 2024, description: 'Horreur vaudou', genre: 'Horreur' },
  'f4': { id: 'f4', title: 'TRAHISON', youtubeId: 'WHX983z6ZqQ', type: 'FILM', language: 'Creole', rating: 4.5, year: 2024, description: 'Trahison et redemption', genre: 'Drame' },
  'f5': { id: 'f5', title: 'PASYANS', youtubeId: 'i-tEGbafd0c', type: 'FILM', language: 'Creole', rating: 4.6, year: 2024, description: 'Perseverance et courage', genre: 'Drame' },
  'f6': { id: 'f6', title: 'REYALITE', youtubeId: 'WMi_1_6guVs', type: 'FILM', language: 'Creole', rating: 4.4, year: 2024, description: 'La realite haïtienne', genre: 'Drame' },
  'f7': { id: 'f7', title: 'TRET MAKIYE', youtubeId: '7_8svqjHfqY', type: 'FILM', language: 'Creole', rating: 4.5, year: 2024, description: 'Court-metrage haïtien', genre: 'Court-metrage' },
  'f8': { id: 'f8', title: 'VWAZEN AN', youtubeId: '1n5GWkYZN00', type: 'FILM', language: 'Creole', rating: 4.3, year: 2024, description: 'Histoire de voisinage', genre: 'Comedie' },
  'f9': { id: 'f9', title: 'SAW FE SE LI OU WE', youtubeId: '161oBU5v70A', type: 'FILM', language: 'Creole', rating: 4.4, year: 2024, description: 'Les consequences de nos actes', genre: 'Drame' },
  'f10': { id: 'f10', title: 'SONY SAN MATIRITE', youtubeId: 'GWmTi2m-_-U', type: 'FILM', language: 'Creole', rating: 4.2, year: 2024, description: 'Comedie haïtienne', genre: 'Comedie' },
  'f11': { id: 'f11', title: 'MEILLEUR FILM HAITIEN', youtubeId: 'Bakp4mqafJU', type: 'FILM', language: 'Creole', rating: 4.3, year: 2024, description: 'Cinema haïtien', genre: 'Drame' },
  'f12': { id: 'f12', title: 'MIRACLE DE LA FOI', youtubeId: 'YOCkCoaJxo4', type: 'FILM', language: 'Creole', rating: 4.4, year: 2024, description: 'Foi et miracles', genre: 'Drame' },
  's1': { id: 's1', title: 'LANMO MANMAN M', youtubeId: 'ZUM4UKnspCg', type: 'SERIE', language: 'Creole', rating: 4.8, year: 2024, description: 'Feyton populaire par CHARLY HSM', genre: 'Drame' },
  's2': { id: 's2', title: 'ENSANSIB SERIE', youtubeId: 'PoUe8bCHGRo', type: 'SERIE', language: 'Creole', rating: 4.7, year: 2024, description: 'Web serie par Magic Film', genre: 'Drame' },
  's3': { id: 's3', title: 'MANMAN M TOUYE MENNAJ MWEN', youtubeId: 'evVTfc5S3G8', type: 'SERIE', language: 'Creole', rating: 4.6, year: 2024, description: 'Drame familial intense', genre: 'Drame' },
  's4': { id: 's4', title: 'MIZE LUMIE', youtubeId: 'etSBxOlUEx8', type: 'SERIE', language: 'Creole', rating: 4.5, year: 2024, description: "Histoire d'une orpheline", genre: 'Drame' },
  's5': { id: 's5', title: 'ISTWA LAVI TI CHOLINE', youtubeId: '4BGcFV8O8w0', type: 'SERIE', language: 'Creole', rating: 4.4, year: 2024, description: 'Parcours de vie', genre: 'Drame' },
  's6': { id: 's6', title: 'MANMANM MECHAN', youtubeId: 'Ue-neeTE7nM', type: 'SERIE', language: 'Creole', rating: 4.5, year: 2024, description: 'Relations familiales', genre: 'Drame' },
  's7': { id: 's7', title: 'FOS LANMOU', youtubeId: 'lrQfzikSc2Y', type: 'SERIE', language: 'Creole', rating: 4.3, year: 2024, description: "La force de l'amour", genre: 'Romance' },
  's8': { id: 's8', title: 'MA RIVALE', youtubeId: 'MPJV7h7ad8I', type: 'SERIE', language: 'Creole', rating: 4.4, year: 2024, description: 'Rivalites et trahisons', genre: 'Drame' },
  't1': { id: 't1', title: 'LANMO MANMAN M', youtubeId: 'ZUM4UKnspCg', type: 'SERIE', language: 'Creole', rating: 4.8, year: 2024, description: 'Drame', genre: 'Drame' },
  't2': { id: 't2', title: 'ENSANSIB', youtubeId: 'JOcNyL5tUO4', type: 'FILM', language: 'Creole', rating: 4.9, year: 2024, description: 'Drame', genre: 'Drame' },
  't3': { id: 't3', title: '2 FRERES JALOUX', youtubeId: 'PoUe8bCHGRo', type: 'FILM', language: 'Creole', rating: 4.7, year: 2025, description: 'Drame', genre: 'Drame' },
  't4': { id: 't4', title: 'MANMAN ZONBI', youtubeId: 'F43oGHZM1A4', type: 'FILM', language: 'Creole', rating: 4.6, year: 2024, description: 'Horreur', genre: 'Horreur' },
  't5': { id: 't5', title: 'PASYANS', youtubeId: 'i-tEGbafd0c', type: 'FILM', language: 'Creole', rating: 4.6, year: 2024, description: 'Drame', genre: 'Drame' },
  't6': { id: 't6', title: 'MIZE LUMIE', youtubeId: 'etSBxOlUEx8', type: 'SERIE', language: 'Creole', rating: 4.5, year: 2024, description: 'Drame', genre: 'Drame' },
  't7': { id: 't7', title: 'TRAHISON', youtubeId: 'WHX983z6ZqQ', type: 'FILM', language: 'Creole', rating: 4.5, year: 2024, description: 'Drame', genre: 'Drame' },
  't8': { id: 't8', title: 'REYALITE', youtubeId: 'WMi_1_6guVs', type: 'FILM', language: 'Creole', rating: 4.4, year: 2024, description: 'Drame', genre: 'Drame' },
  'n1': { id: 'n1', title: '2 FRERES JALOUX', youtubeId: 'PoUe8bCHGRo', type: 'FILM', language: 'Creole', rating: 4.7, year: 2025, description: 'Drame', genre: 'Drame' },
  'n2': { id: 'n2', title: 'ENSANSIB EPISODE 13', youtubeId: 'ndRQ8khNE5E', type: 'SERIE', language: 'Creole', rating: 4.8, year: 2024, description: 'Drame', genre: 'Drame' },
  'n3': { id: 'n3', title: 'TRET MAKIYE', youtubeId: '7_8svqjHfqY', type: 'FILM', language: 'Creole', rating: 4.5, year: 2024, description: 'Court-metrage', genre: 'Court-metrage' },
  'n4': { id: 'n4', title: 'VWAZEN AN', youtubeId: '1n5GWkYZN00', type: 'FILM', language: 'Creole', rating: 4.3, year: 2024, description: 'Comedie', genre: 'Comedie' },
  'n5': { id: 'n5', title: 'MANMANM MECHAN EP23', youtubeId: 'Ue-neeTE7nM', type: 'SERIE', language: 'Creole', rating: 4.5, year: 2024, description: 'Drame', genre: 'Drame' },
  'n6': { id: 'n6', title: 'SAW FE SE LI OU WE', youtubeId: '161oBU5v70A', type: 'FILM', language: 'Creole', rating: 4.4, year: 2024, description: 'Drame', genre: 'Drame' },
};

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  // Obtener contenido
  const content = resolvedParams.id ? demoContent[resolvedParams.id] : null;
  const [isClient, setIsClient] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  // Efecto para montar el cliente
  useEffect(() => {
    setIsClient(true);
    if (!content) {
      router.push('/');
    }
  }, [content, router]);

  // Función para compartir
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content?.title || 'LakayTV',
          text: `Regarde ${content?.title} sur LakayTV!`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <div className="text-white">Chargement...</div>
        </div>
      </div>
    );
  }

  // URL del video de YouTube - usando embed con controles
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${content.youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="text-white hover:text-amber-400"
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon />
              <span className="ml-2 hidden sm:inline">Retour</span>
            </Button>
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="LakayTV" className="h-8 w-8" />
              <span className="text-xl font-bold text-white">LakayTV</span>
            </a>
            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Video Player */}
      <div className="pt-16">
        <div className="relative w-full bg-black" style={{ minHeight: '50vh' }}>
          {/* Thumbnail con botón de play mientras carga */}
          {!playerReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
              <img
                src={`https://img.youtube.com/vi/${content.youtubeId}/maxresdefault.jpg`}
                alt={content.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="relative z-20 animate-pulse">
                <PlayIcon />
              </div>
            </div>
          )}
          
          {/* YouTube iframe */}
          {isClient && (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={youtubeEmbedUrl}
                title={content.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                onLoad={() => setPlayerReady(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Info */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Thumbnail */}
          <div className="hidden md:block w-48 flex-shrink-0">
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-stone-800">
              <img
                src={`https://img.youtube.com/vi/${content.youtubeId}/hqdefault.jpg`}
                alt={content.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge className={content.type === 'FILM' ? 'bg-blue-600' : 'bg-purple-600'}>
                {content.type === 'FILM' ? 'Film' : 'Serie'}
              </Badge>
              <Badge variant="outline" className="border-stone-600 text-stone-300">
                {content.language}
              </Badge>
              <Badge variant="outline" className="border-stone-600 text-stone-300">
                {content.genre}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {content.title}
            </h1>

            {/* Rating & Year */}
            <div className="flex items-center gap-4 text-stone-400 text-sm mb-4">
              <span className="flex items-center gap-1 text-amber-400">
                <StarIcon filled /> {content.rating}
              </span>
              <span>{content.year}</span>
            </div>

            {/* Description */}
            <p className="text-stone-300 leading-relaxed mb-6">
              {content.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
                  <HeartIcon />
                  Ajouter a ma liste
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-stone-700 text-white hover:bg-stone-800 gap-2"
                onClick={handleShare}
              >
                <ShareIcon />
                Partager
              </Button>
            </div>

            {/* Watch on YouTube link */}
            <div className="mt-6 p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
              <p className="text-red-300 text-sm mb-3">
                Si le video ne joue pas, vous pouvez le regarder directement sur YouTube.
              </p>
              <a 
                href={`https://www.youtube.com/watch?v=${content.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Regarder sur YouTube
                </Button>
              </a>
            </div>

            {/* Login prompt */}
            <div className="mt-6 p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg">
              <p className="text-amber-400 text-sm mb-3">
                Connectez-vous pour ajouter ce contenu a votre liste et profiter de toutes les fonctionnalites.
              </p>
              <Link href="/">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
