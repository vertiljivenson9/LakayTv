'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Base de datos local
const videos: Record<string, {
  title: string;
  youtubeId: string;
  type: string;
  year: number;
  rating: number;
  description: string;
  genre: string;
}> = {
  'featured-1': { title: 'ENSANSIB', youtubeId: 'JOcNyL5tUO4', type: 'FILM', year: 2024, rating: 4.9, description: 'Film haitien', genre: 'Drame' },
  'top1': { title: 'ENSANSIB', youtubeId: 'JOcNyL5tUO4', type: 'FILM', year: 2024, rating: 4.9, description: 'Film haitien', genre: 'Drame' },
  'top2': { title: 'LANMO MANMAN M', youtubeId: 'ZUM4UKnspCg', type: 'SERIE', year: 2024, rating: 4.8, description: 'Feyton', genre: 'Drame' },
  'top3': { title: '2 FRERES JALOUX', youtubeId: 'PoUe8bCHGRo', type: 'FILM', year: 2025, rating: 4.7, description: 'Film', genre: 'Drame' },
  'top4': { title: 'MANMAN ZONBI', youtubeId: 'F43oGHZM1A4', type: 'FILM', year: 2024, rating: 4.6, description: 'Horreur', genre: 'Horreur' },
  'top5': { title: 'PASYans', youtubeId: 'i-tEGbafd0c', type: 'FILM', year: 2024, rating: 4.6, description: 'Drame', genre: 'Drame' },
  'f1': { title: 'ENSANSIB', youtubeId: 'JOcNyL5tUO4', type: 'FILM', year: 2024, rating: 4.9, description: 'Film', genre: 'Drame' },
  'f2': { title: '2 FRERES JALOUX', youtubeId: 'PoUe8bCHGRo', type: 'FILM', year: 2025, rating: 4.7, description: 'Drame', genre: 'Drame' },
  'f3': { title: 'MANMAN ZONBI', youtubeId: 'F43oGHZM1A4', type: 'FILM', year: 2024, rating: 4.6, description: 'Horreur', genre: 'Horreur' },
  'f4': { title: 'Trahison', youtubeId: 'WHX983z6ZqQ', type: 'FILM', year: 2024, rating: 4.5, description: 'Drame', genre: 'Drame' },
  'f5': { title: 'Pasyans', youtubeId: 'i-tEGbafd0c', type: 'FILM', year: 2024, rating: 4.6, description: 'Drame', genre: 'Drame' },
  'f6': { title: 'Reyalite', youtubeId: 'WMi_1_6guVs', type: 'FILM', year: 2024, rating: 4.4, description: 'Drame', genre: 'Drame' },
  'f7': { title: 'Tret Makiye', youtubeId: '7_8svqjHfqY', type: 'FILM', year: 2024, rating: 4.5, description: 'Court-metrage', genre: 'Court-metrage' },
  'f8': { title: 'Vwazen an', youtubeId: '1n5GWkYZN00', type: 'FILM', year: 2024, rating: 4.3, description: 'Comedi', genre: 'Comedie' },
  'f9': { title: 'Saw fe se li ou we', youtubeId: '161oBU5v70A', type: 'FILM', year: 2024, rating: 4.4, description: 'Drame', genre: 'Drame' },
  'f10': { title: 'Sony san matirite', youtubeId: 'GWmTi2m-_-U', type: 'FILM', year: 2024, rating: 4.2, description: 'comedi', genre: 'Comedie' },
  'f11': { title: 'Meilleur film haitien', youtubeId: 'Bakp4mqafJU', type: 'FILM', year: 2024, rating: 4.3, description: 'drame', genre: 'Drame' },
  'f12': { title: 'Miracle de la foi', youtubeId: 'YOCkCoaJxo4', type: 'FILM', year: 2024, rating: 4.4, description: 'drame', genre: 'Drame' },
  's1': { title: 'Lanmo manman m', youtubeId: 'ZUM4UKnspCg', type: 'SERIE', year: 2024, rating: 4.8, description: 'feyton', genre: 'Drame' },
  's2': { title: 'Ensansib serie', youtubeId: 'PoUe8bCHGRo', type: 'SERIE', year: 2024, rating: 4.7, description: 'web serie', genre: 'Drame' },
  's3': { title: 'Manman m touye mennaj mwen', youtubeId: 'evVTfc5S3G8', type: 'SERIE', year: 2024, rating: 4.6, description: 'drame', genre: 'Drame' },
  's4': { title: 'Mize lumie', youtubeId: 'etSBxOlUEx8', type: 'SERIE', year: 2024, rating: 4.5, description: 'drame', genre: 'Drame' },
  's5': { title: 'Istwa lavi ti choline', youtubeId: '4BGcFV8O8w0', type: 'SERIE', year: 2024, rating: 4.4, description: 'drame', genre: 'Drame' },
  's6': { title: 'Manmanm mechan', youtubeId: 'Ue-neeTE7nM', type: 'SERIE', year: 2024, rating: 4.5, description: 'drame', genre: 'Drame' },
  's7': { title: 'Fos lanmou', youtubeId: 'lrQfzikSc2Y', type: 'SERIE', year: 2024, rating: 4.3, description: 'romance', genre: 'Romance' },
  's8': { title: 'Ma rivale', youtubeId: 'MPJV7h7ad8I', type: 'SERIE', year: 2024, rating: 4.4, description: 'drame', genre: 'Drame' },
  't1': { title: 'Lanmo manman m', youtubeId: 'ZUM4UKnspCg', type: 'SERIE', year: 2024, rating: 4.8, description: 'drame', genre: 'Drame' },
  't2': { title: 'Ensansib', youtubeId: 'JOcNyL5tUO4', type: 'FILM', year: 2024, rating: 4.9, description: 'drame', genre: 'Drame' },
  't3': { title: '2 freres jaloux', youtubeId: 'PoUe8bCHGRo', type: 'FILM', year: 2025, rating: 4.7, description: 'drame', genre: 'Drame' },
  't4': { title: 'Manman zonbi', youtubeId: 'F43oGHZM1A4', type: 'FILM', year: 2024, rating: 4.6, description: 'horreur', genre: 'Horreur' },
  't5': { title: 'Pasyans', youtubeId: 'i-tEGbafd0c', type: 'FILM', year: 2024, rating: 4.6, description: 'drame', genre: 'Drame' },
  't6': { title: 'Mize lumie', youtubeId: 'etSBxOlUEx8', type: 'SERIE', year: 2024, rating: 4.5, description: 'drame', genre: 'Drame' },
  't7': { title: 'Trahison', youtubeId: 'WHX983z6ZqQ', type: 'FILM', year: 2024, rating: 4.5, description: 'drame', genre: 'Drame' },
  't8': { title: 'Reyalite', youtubeId: 'WMi_1_6guVs', type: 'FILM', year: 2024, rating: 4.4, description: 'drame', genre: 'Drame' },
  'n1': { title: '2 freres jaloux', youtubeId: 'PoUe8bCHGRo', type: 'FILM', year: 2025, rating: 4.7, description: 'drame', genre: 'Drame' },
  'n2': { title: 'Ensansib episode 13', youtubeId: 'ndRQ8khNE5E', type: 'SERIE', year: 2024, rating: 4.8, description: 'drame', genre: 'Drame' },
  'n3': { title: 'Tret makiye', youtubeId: '7_8svqjHfqY', type: 'FILM', year: 2024, rating: 4.5, description: 'court-metrage', genre: 'Court-metrage' },
  'n4': { title: 'Vwazen an', youtubeId: '1n5GWkYZN00', type: 'FILM', year: 2024, rating: 4.3, description: 'comedi', genre: 'Comedie' },
  'n5': { title: 'Manmanm mechan ep23', youtubeId: 'Ue-neeTE7nM', type: 'SERIE', year: 2024, rating: 4.5, description: 'drame', genre: 'Drame' },
  'n6': { title: 'Saw fe se li ou we', youtubeId: '161oBU5v70A', type: 'FILM', year: 2024, rating: 4.4, description: 'drame', genre: 'Drame' },
};

interface Video {
  title: string;
  youtubeId: string;
  type: string;
  year: number;
  rating: number;
  description: string;
  genre: string;
}

export default function WatchPage() {
  const params = useParams();
  const [content, setContent] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      const video = videos[params.id as string];
      if (video) {
        setContent(video);
      }
    }
    setLoading(false);
  }, [params?.id]);

  if (!content && !loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Contenu non trouve</h1>
          <Link href="/">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Retour
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-white hover:text-amber-400">
            ← Retour
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="LakayTV" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">LakayTV</span>
          </Link>
          <div className="w-20" />
        </div>
      </header>

      {/* Video Player */}
      <div className="pt-20">
        <div className="w-full aspect-video bg-black max-w-6xl mx-auto">
          <iframe
            src={`https://www.youtube.com/embed/${content?.youtubeId}?autoplay=1`}
            title={content?.title || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Info */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-2">{content?.title}</h1>
        <div className="flex items-center gap-4 text-stone-400 text-sm mb-4">
          <Badge className={content?.type === 'FILM' ? 'bg-blue-600' : 'bg-purple-600'}>
            {content?.type === 'FILM' ? 'Film' : 'Serie'}
          </Badge>
          <span>{content?.year}</span>
          <span className="text-amber-400">★ {content?.rating}</span>
        </div>
        <p className="text-stone-300 mb-6">{content?.description}</p>
        
        <a 
          href={`https://www.youtube.com/watch?v=${content?.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Regarder sur YouTube
          </Button>
        </a>
      </div>
    </div>
  );
}
