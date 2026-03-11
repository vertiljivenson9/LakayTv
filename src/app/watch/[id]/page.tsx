'use client'

import { use, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SignInButton, useUser } from '@clerk/nextjs';

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

// Custom Player Icons
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16"/>
    <rect x="14" y="4" width="4" height="16"/>
  </svg>
);

const VolumeIcon = ({ muted = false }: { muted?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    {!muted && (
      <g>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </g>
    )}
    {muted && (
      <g>
        <line x1="23" y1="9" x2="17" y2="15"/>
        <line x1="17" y1="9" x2="23" y2="15"/>
      </g>
    )}
  </svg>
);

const FullscreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 3 21 3 21 9"/>
    <polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
);

const MinimizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 14 10 14 10 20"/>
    <polyline points="20 10 14 10 14 4"/>
    <line x1="14" y1="10" x2="21" y2="3"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
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

// Base de datos de demo
const demoContent: Record<string, ContentData> = {
  'featured-1': { id: 'featured-1', title: 'ENSANSIB', youtubeId: 'JOcNyL5tUO4', type: 'FILM', language: 'Creole', rating: 4.9, year: 2024, description: 'Une production de Magic Film.', genre: 'Drame' },
  'top1': { id: 'top1', title: 'ENSANSIB', youtubeId: 'JOcNyL5tUO4', type: 'FILM', language: 'Creole', rating: 4.9, year: 2024, description: 'Tragique histoire de couple.', genre: 'Drame' },
  'top2': { id: 'top2', title: 'LANMO MANMAN M', youtubeId: 'ZUM4UKnspCg', type: 'SERIE', language: 'Creole', rating: 4.8, year: 2024, description: 'Feyton populaire.', genre: 'Drame' },
  'top3': { id: 'top3', title: '2 FRERES JALOUX', youtubeId: 'PoUe8bCHGRo', type: 'FILM', language: 'Creole', rating: 4.7, year: 2025, description: 'Jalousie fraternelle.', genre: 'Drame' },
  'top4': { id: 'top4', title: 'MANMAN ZONBI', youtubeId: 'F43oGHZM1A4', type: 'FILM', language: 'Creole', rating: 4.6, year: 2024, description: 'Horreur vaudou.', genre: 'Horreur' },
  'top5': { id: 'top5', title: 'PASYANS', youtubeId: 'i-tEGbafd0c', type: 'FILM', language: 'Creole', rating: 4.6, year: 2024, description: 'Perseverance.', genre: 'Drame' },
  'f1': { id: 'f1', title: 'ENSANSIB', youtubeId: 'JOcNyL5tUO4', type: 'FILM', language: 'Creole', rating: 4.9, year: 2024, description: 'Drame', genre: 'Drame' },
  'f2': { id: 'f2', title: '2 FRERES JALOUX', youtubeId: 'PoUe8bCHGRo', type: 'FILM', language: 'Creole', rating: 4.7, year: 2025, description: 'Drame', genre: 'Drame' },
  'f3': { id: 'f3', title: 'MANMAN ZONBI', youtubeId: 'F43oGHZM1A4', type: 'FILM', language: 'Creole', rating: 4.6, year: 2024, description: 'Horreur', genre: 'Horreur' },
  'f4': { id: 'f4', title: 'TRAHISON', youtubeId: 'WHX983z6ZqQ', type: 'FILM', language: 'Creole', rating: 4.5, year: 2024, description: 'Drame', genre: 'Drame' },
  'f5': { id: 'f5', title: 'PASYANS', youtubeId: 'i-tEGbafd0c', type: 'FILM', language: 'Creole', rating: 4.6, year: 2024, description: 'Drame', genre: 'Drame' },
  'f6': { id: 'f6', title: 'REYALITE', youtubeId: 'WMi_1_6guVs', type: 'FILM', language: 'Creole', rating: 4.4, year: 2024, description: 'Drame', genre: 'Drame' },
  'f7': { id: 'f7', title: 'TRET MAKIYE', youtubeId: '7_8svqjHfqY', type: 'FILM', language: 'Creole', rating: 4.5, year: 2024, description: 'Court-metrage', genre: 'Court-metrage' },
  'f8': { id: 'f8', title: 'VWAZEN AN', youtubeId: '1n5GWkYZN00', type: 'FILM', language: 'Creole', rating: 4.3, year: 2024, description: 'Comedie', genre: 'Comedie' },
  'f9': { id: 'f9', title: 'SAW FE SE LI OU WE', youtubeId: '161oBU5v70A', type: 'FILM', language: 'Creole', rating: 4.4, year: 2024, description: 'Drame', genre: 'Drame' },
  'f10': { id: 'f10', title: 'SONY SAN MATIRITE', youtubeId: 'GWmTi2m-_-U', type: 'FILM', language: 'Creole', rating: 4.2, year: 2024, description: 'Comedie', genre: 'Comedie' },
  'f11': { id: 'f11', title: 'MEILLEUR FILM HAITIEN', youtubeId: 'Bakp4mqafJU', type: 'FILM', language: 'Creole', rating: 4.3, year: 2024, description: 'Drame', genre: 'Drame' },
  'f12': { id: 'f12', title: 'MIRACLE DE LA FOI', youtubeId: 'YOCkCoaJxo4', type: 'FILM', language: 'Creole', rating: 4.4, year: 2024, description: 'Drame', genre: 'Drame' },
  's1': { id: 's1', title: 'LANMO MANMAN M', youtubeId: 'ZUM4UKnspCg', type: 'SERIE', language: 'Creole', rating: 4.8, year: 2024, description: 'Feyton', genre: 'Drame' },
  's2': { id: 's2', title: 'ENSANSIB SERIE', youtubeId: 'PoUe8bCHGRo', type: 'SERIE', language: 'Creole', rating: 4.7, year: 2024, description: 'Web serie', genre: 'Drame' },
  's3': { id: 's3', title: 'MANMAN M TOUYE MENNAJ MWEN', youtubeId: 'evVTfc5S3G8', type: 'SERIE', language: 'Creole', rating: 4.6, year: 2024, description: 'Drame', genre: 'Drame' },
  's4': { id: 's4', title: 'MIZE LUMIE', youtubeId: 'etSBxOlUEx8', type: 'SERIE', language: 'Creole', rating: 4.5, year: 2024, description: 'Drame', genre: 'Drame' },
  's5': { id: 's5', title: 'ISTWA LAVI TI CHOLINE', youtubeId: '4BGcFV8O8w0', type: 'SERIE', language: 'Creole', rating: 4.4, year: 2024, description: 'Drame', genre: 'Drame' },
  's6': { id: 's6', title: 'MANMANM MECHAN', youtubeId: 'Ue-neeTE7nM', type: 'SERIE', language: 'Creole', rating: 4.5, year: 2024, description: 'Drame', genre: 'Drame' },
  's7': { id: 's7', title: 'FOS LANMOU', youtubeId: 'lrQfzikSc2Y', type: 'SERIE', language: 'Creole', rating: 4.3, year: 2024, description: 'Romance', genre: 'Romance' },
  's8': { id: 's8', title: 'MA RIVALE', youtubeId: 'MPJV7h7ad8I', type: 'SERIE', language: 'Creole', rating: 4.4, year: 2024, description: 'Drame', genre: 'Drame' },
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
  const { isSignedIn } = useUser();
  const playerRef = useRef<HTMLDivElement>(null);
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Obtener contenido
  const content = resolvedParams.id ? demoContent[resolvedParams.id] : null;

  // Redirigir si no existe
  useEffect(() => {
    if (!content) {
      router.push('/');
    }
  }, [content, router]);

  // Auto-hide controls
  useEffect(() => {
    if (showControls && isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying]);

  // Simulate progress updates (since we can't access YouTube iframe API directly)
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 0.1, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;
    
    if (!document.fullscreenElement) {
      await playerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  // URL nativa de YouTube con parametros optimizados para experiencia nativa
  // controls=0: Oculta controles de YouTube (usar overlay personalizado)
  // modestbranding=1: Minimiza logo de YouTube
  // rel=0: Sin videos relacionados al final
  // autoplay=1: Reproduccion automatica
  // mute=1: Silenciado para permitir autoplay en todos los navegadores
  // playsinline=1: Reproduccion inline en iOS
  // iv_load_policy=3: Oculta anotaciones
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${content.youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&controls=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&color=white&theme=dark&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;

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

      {/* Video Player - Nativo con controles personalizados */}
      <div className="pt-16">
        <div 
          ref={playerRef}
          className="video-player-wrapper relative w-full aspect-video bg-black max-h-[85vh] cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* YouTube iframe */}
          <iframe
            src={youtubeEmbedUrl}
            title={content.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="w-full h-full absolute inset-0"
            onLoad={() => setIsLoading(false)}
          />

          {/* Loading spinner */}
          {isLoading && (
            <div className="video-loading-spinner" />
          )}

          {/* Title overlay - top */}
          <div className={`video-title-overlay transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-white font-semibold text-lg">{content.title}</h2>
          </div>

          {/* Big play button in center */}
          {!isPlaying && (
            <div 
              className="big-play-button"
              onClick={() => setIsPlaying(true)}
            >
              <PlayIcon />
            </div>
          )}

          {/* Custom controls overlay */}
          <div className={`video-controls-overlay transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            {/* Progress bar */}
            <div className="video-progress-bar mb-4">
              <div className="video-progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {/* Play/Pause */}
                <button 
                  className="video-control-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>

                {/* Volume */}
                <button 
                  className="video-control-btn"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  <VolumeIcon muted={isMuted} />
                </button>

                {/* Volume slider */}
                <div className="volume-slider flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseInt(e.target.value));
                      setIsMuted(false);
                    }}
                    className="ml-2"
                  />
                </div>

                {/* Time display */}
                <span className="video-time-display ml-4">
                  {currentTime} / {duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Settings */}
                <button className="video-control-btn">
                  <SettingsIcon />
                </button>

                {/* Fullscreen */}
                <button 
                  className="video-control-btn"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <MinimizeIcon /> : <FullscreenIcon />}
                </button>
              </div>
            </div>
          </div>

          {/* Click overlay for play/pause */}
          <div 
            className="click-overlay"
            onClick={() => setIsPlaying(!isPlaying)}
          />
        </div>
      </div>

      {/* Content Info */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
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

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {content.title}
            </h1>

            <div className="flex items-center gap-4 text-stone-400 text-sm mb-4">
              <span className="flex items-center gap-1 text-amber-400">
                <StarIcon filled /> {content.rating}
              </span>
              <span>{content.year}</span>
            </div>

            <p className="text-stone-300 leading-relaxed mb-6">
              {content.description}
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
                <HeartIcon />
                Ajouter a ma liste
              </Button>
              <Button variant="outline" className="border-stone-700 text-white hover:bg-stone-800 gap-2">
                <ShareIcon />
                Partager
              </Button>
            </div>

            {!isSignedIn && (
              <div className="mt-8 p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg">
                <p className="text-amber-400 text-sm mb-3">
                  Connectez-vous pour ajouter ce contenu a votre liste.
                </p>
                <SignInButton mode="redirect">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    Se connecter
                  </Button>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
