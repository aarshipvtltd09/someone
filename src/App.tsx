import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { CosmicBackground } from './components/CosmicBackground';
import { Page1LittleAarshi } from './components/Page1LittleAarshi';
import { Page2MoonOfAarshi } from './components/Page2MoonOfAarshi';
import { Page3BirthdayPowers } from './components/Page3BirthdayPowers';
import { Page4ConstellationGame } from './components/Page4ConstellationGame';
import { Page5BookOfBeautifulThings } from './components/Page5BookOfBeautifulThings';
import { Page6GrandFinale } from './components/Page6GrandFinale';
import { AudioToggle } from './components/AudioToggle';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(1);

  // Smooth scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleGoBack = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => (prev - 1) as PageId);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0b0816] text-[#FFF8F0] overflow-x-hidden select-none font-sans">
      {/* 60 FPS Ambient Canvas of Stars, Shooting Stars & Cursor Stardust */}
      <CosmicBackground />

      {/* Floating Header Branding in Hinglish */}
      <header className="fixed top-5 left-5 z-40 flex items-center gap-2">
        {currentPage > 1 && (
          <button
            onClick={handleGoBack}
            className="p-2 rounded-full glass-panel border border-[#CDB4FF]/30 hover:border-[#FFD166]/60 text-[#FFF8F0]/80 hover:text-white transition-all cursor-pointer"
            title="Pichle Chapter Par Jayein"
            aria-label="Pichla Chapter"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => setCurrentPage(1)}
          className="group flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#CDB4FF]/25 hover:border-[#FFD166]/50 transition-all duration-300 cursor-pointer"
          title="Shuruat se dekhein"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166] group-hover:rotate-45 transition-transform duration-300" />
          <span className="font-display-elegant text-xs sm:text-sm font-medium tracking-widest text-[#FFF8F0]">
            Aarshi Ka Jahan ✨
          </span>
        </button>
      </header>

      {/* Top-Right Ambient Music Audio Controller */}
      <AudioToggle />

      {/* Main Celestial Chapter Views (Clean, Immersive, No Bottom Spoiler Bar) */}
      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center">
        {currentPage === 1 && (
          <Page1LittleAarshi onContinue={() => setCurrentPage(2)} />
        )}
        {currentPage === 2 && (
          <Page2MoonOfAarshi onContinue={() => setCurrentPage(3)} />
        )}
        {currentPage === 3 && (
          <Page3BirthdayPowers onContinue={() => setCurrentPage(4)} />
        )}
        {currentPage === 4 && (
          <Page4ConstellationGame onContinue={() => setCurrentPage(5)} />
        )}
        {currentPage === 5 && (
          <Page5BookOfBeautifulThings onContinue={() => setCurrentPage(6)} />
        )}
        {currentPage === 6 && (
          <Page6GrandFinale onReplay={() => setCurrentPage(1)} />
        )}
      </main>
    </div>
  );
}
