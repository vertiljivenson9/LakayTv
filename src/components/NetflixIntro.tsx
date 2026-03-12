"use client";

import { useRef, useCallback } from "react";

interface NetflixIntroProps {
  onComplete: () => void;
}

export function NetflixIntro({ onComplete }: NetflixIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video end - auto play YouTube video
  const handleVideoEnd = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Handle error - skip to video if intro fails
  const handleError = useCallback(() => {
    console.error("Error loading intro video");
    onComplete();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Video Intro - No controls, no skip, auto plays until end */}
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        autoPlay
        playsInline
        onEnded={handleVideoEnd}
        onError={handleError}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
