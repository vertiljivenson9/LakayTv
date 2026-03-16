"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface NetflixIntroProps {
  onComplete: () => void;
  contentId: string;
}

export function NetflixIntro({ onComplete, contentId }: NetflixIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

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

    return () => clearTimeout(timer);
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
  }, []);

  // Handle skip click
  const handleSkip = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onComplete();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Intro Container */}
      <div className="w-full max-w-4xl mx-auto aspect-video relative">
        <video
          ref={videoRef}
          src="/videos/intro.mp4"
          autoPlay
          playsInline
          muted
          onEnded={handleVideoEnd}
          onError={handleError}
          onCanPlay={handleCanPlay}
          className="w-full h-full object-contain"
        />
        
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
