"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SkipForward, Volume2, VolumeX } from "lucide-react";

interface NetflixIntroProps {
  onComplete: () => void;
  duration?: number; // Duration in seconds
}

export function NetflixIntro({ onComplete, duration = 5 }: NetflixIntroProps) {
  const [countdown, setCountdown] = useState(duration);
  const [isMuted, setIsMuted] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle complete function - using useCallback to avoid dependency issues
  const handleComplete = useCallback(() => {
    setIsSkipping(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  }, [onComplete]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      handleComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, handleComplete]);

  // Handle video end
  const handleVideoEnd = () => {
    handleComplete();
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-300 ${
        isSkipping ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Video Intro */}
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={handleVideoEnd}
        className="w-full h-full object-cover"
        onError={() => {
          console.error("Error loading intro video");
          handleComplete(); // Skip intro if video fails to load
        }}
      />

      {/* Skip Button */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4">
        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-white" />
          ) : (
            <Volume2 className="h-5 w-5 text-white" />
          )}
        </button>

        {/* Skip Intro Button */}
        <button
          onClick={handleComplete}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full transition-all backdrop-blur-sm group"
        >
          <span className="text-white font-medium">Saltar intro</span>
          <SkipForward className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
          <span className="text-white/70 text-sm ml-1">{countdown}s</span>
        </button>
      </div>

      {/* Gradient Overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </div>
  );
}
