"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface NetflixIntroProps {
  onComplete: () => void;
  contentId: string;
}

export function NetflixIntro({ onComplete, contentId }: NetflixIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showUnmuteHint, setShowUnmuteHint] = useState(true);

  // Check if this content was already watched
  useEffect(() => {
    const watchedContent = JSON.parse(localStorage.getItem("lakaytv_watched_content") || "[]");
    
    // If already watched, skip intro immediately
    if (watchedContent.includes(contentId)) {
      onComplete();
      return;
    }

    // Mark as watched after a delay (simulating viewing)
    const timer = setTimeout(() => {
      const updated = [...new Set([...watchedContent, contentId])];
      localStorage.setItem("lakaytv_watched_content", JSON.stringify(updated));
    }, 5000); // Mark as watched after 5 seconds

    // Hide unmute hint after 3 seconds
    const hintTimer = setTimeout(() => {
      setShowUnmuteHint(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hintTimer);
    };
  }, [contentId, onComplete]);

  // Handle video end - auto play YouTube video
  const handleVideoEnd = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Handle error - skip to video if intro fails
  const handleError = useCallback(() => {
    console.error("Error loading intro video");
    onComplete();
  }, [onComplete]);

  // Handle can play
  const handleCanPlay = useCallback(() => {
    setCanPlay(true);
    // Try to unmute automatically (may fail due to browser policies)
    if (videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay with sound was blocked, keep muted
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
          }
        });
      } else {
        setIsMuted(false);
      }
    }
  }, []);

  // Handle skip click
  const handleSkip = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onComplete();
  }, [onComplete]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Intro Container */}
      <div className="w-full max-w-4xl mx-auto aspect-video relative">
        <video
          ref={videoRef}
          src="/videos/intro.mp4"
          autoPlay
          playsInline
          muted={isMuted}
          onEnded={handleVideoEnd}
          onError={handleError}
          onCanPlay={handleCanPlay}
          className="w-full h-full object-contain"
        />
        
        {/* Sound Control Button */}
        {canPlay && (
          <button
            onClick={toggleMute}
            className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors"
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
        )}

        {/* Unmute Hint */}
        {canPlay && showUnmuteHint && isMuted && (
          <div className="absolute top-8 right-20 bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg animate-pulse">
            🔊 Click para activar sonido
          </div>
        )}
        
        {/* Skip Button */}
        {canPlay && (
          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md text-sm backdrop-blur-sm transition-colors"
          >
            Saltar intro →
          </button>
        )}
      </div>
    </div>
  );
}
