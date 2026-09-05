import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const handleToggle = () => {
    setHasInteracted(true);
    const active = audioManager.toggleSound();
    setIsPlaying(active);
    if (active) {
      audioManager.playSparkle();
    }
  };

  // Optional gentle prompt to enable music on first user gesture
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted) {
        // We do not force autoplay to prevent jarring, but we are ready
      }
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    return () => window.removeEventListener('click', handleFirstClick);
  }, [hasInteracted]);

  return (
    <div id="audio-control-container" className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <button
        id="audio-toggle-button"
        onClick={handleToggle}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-panel hover:border-[#FFD166]/50 transition-all duration-300 shadow-lg hover:shadow-[#CDB4FF]/20"
        title={isPlaying ? "Mute Celestial Melody" : "Play Celestial Melody"}
        aria-label="Toggle Celestial Music"
      >
        <div className="relative">
          {isPlaying ? (
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-3 bg-[#FFD166] rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-[#FFC8DD] rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2 bg-[#CDB4FF] rounded-full animate-pulse delay-150" />
            </div>
          ) : (
            <Music className="w-4 h-4 text-[#CDB4FF] group-hover:text-[#FFD166] transition-colors" />
          )}
        </div>

        <span className="text-xs font-medium tracking-wider text-[#FFF8F0]/90">
          {isPlaying ? 'Music Chalu Hai ♪' : 'Pyara Sa Music ♫'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#FFD166]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#FFF8F0]/50" />
        )}
      </button>
    </div>
  );
};
