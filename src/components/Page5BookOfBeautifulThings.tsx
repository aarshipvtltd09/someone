import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { useContent } from '../context/ContentContext';

interface Page5Props {
  onContinue: () => void;
}

export const Page5BookOfBeautifulThings: React.FC<Page5Props> = ({ onContinue }) => {
  const { config } = useContent();
  const pages = config.chapter5Pages;
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  // Guard against index out of bounds if pages were deleted
  const safeIndex = Math.min(activePageIndex, Math.max(0, pages.length - 1));
  const activePage = pages[safeIndex] || {
    number: 'I',
    title: 'Aarshi',
    body: 'Anmol rooh.',
    accentColor: '#FFD166',
  };

  const handleNextPage = () => {
    if (safeIndex < pages.length - 1) {
      audioManager.playSparkle();
      setActivePageIndex(safeIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (safeIndex > 0) {
      audioManager.playSparkle();
      setActivePageIndex(safeIndex - 1);
    }
  };

  return (
    <div id="page-5-book-of-beautiful-things" className="relative w-full min-h-screen flex flex-col items-center justify-between px-4 py-16 z-10 overflow-hidden select-none">
      
      {/* Chapter Eyebrow */}
      <div className="text-center z-20 mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#CDB4FF]/40 text-xs tracking-widest text-[#CDB4FF] uppercase">
          <BookOpen className="w-3.5 h-3.5 text-[#FFD166]" />
          <span>Chapter V &bull; The Book of Beautiful Things</span>
        </div>
        <h2 className="font-display-elegant text-2xl sm:text-4xl text-[#FFF8F0] mt-2">
          Kitab-e-Aarshi &bull;{' '}
          <span className="font-script-grand text-3xl sm:text-5xl text-[#FFD166] text-glow-gold px-1">
            Khoobsurat Baatein
          </span>
        </h2>
        <p className="font-serif-dreamy italic text-[#FFF8F0]/80 text-sm sm:text-base max-w-lg mx-auto mt-1">
          {pages.length} anmol baatein jo Aarshi ko sabse alag aur khaas banati hain.
        </p>
      </div>

      {/* The Illuminated Celestial Book Container */}
      <div className="relative w-full max-w-3xl my-auto z-20 flex flex-col items-center">
        
        {/* Ornate Bound Book Spine Effect */}
        <div className="relative w-full min-h-[360px] sm:min-h-[420px] rounded-3xl glass-card border border-[#CDB4FF]/40 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden glow-lavender">
          
          {/* Subtle Golden Corner Filigree */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#FFD166]/60 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#FFD166]/60 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#FFD166]/60 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#FFD166]/60 pointer-events-none" />

          {/* Page Top Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-white/10 border border-[#FFD166]/40 flex items-center justify-center font-display-elegant text-xs text-[#FFD166]">
                {activePage.number}
              </span>
              <span className="font-serif-dreamy text-xs tracking-widest text-[#FFF8F0]/70 uppercase">
                Virtue {safeIndex + 1} of {pages.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-serif-dreamy text-[#FFD166]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aarshi&apos;s Essence</span>
            </div>
          </div>

          {/* Page Content: Beautiful clean Hinglish prose */}
          <div className="my-auto py-6 text-center animate-fade-in" key={safeIndex}>
            <h3
              className="font-display-elegant text-3xl sm:text-4xl md:text-5xl font-normal text-[#FFF8F0] tracking-wide"
              style={{
                textShadow: `0 0 20px ${activePage.accentColor}50`,
              }}
            >
              {activePage.title}
            </h3>

            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#FFD166]/50 to-transparent mx-auto my-4" />

            <p className="font-serif-dreamy text-base sm:text-xl text-[#FFF8F0]/95 max-w-xl mx-auto leading-relaxed italic">
              &ldquo;{activePage.body}&rdquo;
            </p>
          </div>

          {/* Page Footer Navigation */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <button
              onClick={handlePrevPage}
              disabled={safeIndex === 0}
              className="flex items-center gap-1 text-xs font-serif-dreamy text-[#FFF8F0]/70 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    audioManager.playSparkle();
                    setActivePageIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === safeIndex
                      ? 'w-6 bg-[#FFD166] shadow-[0_0_8px_#FFD166]'
                      : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={safeIndex === pages.length - 1}
              className="flex items-center gap-1 text-xs font-serif-dreamy text-[#FFF8F0]/70 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <span>Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation Button */}
      <div className="z-20 flex flex-col sm:flex-row items-center gap-3 mt-6">
        <button
          id="book-continue-btn"
          onClick={() => {
            audioManager.playSparkle();
            onContinue();
          }}
          className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#CDB4FF]/35 via-[#FFC8DD]/35 to-[#FFD166]/35 border border-[#FFD166]/70 text-[#FFF8F0] font-display-elegant text-base tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,209,102,0.5)] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span>Next: Grand Celestial Finale</span>
            <ArrowRight className="w-4 h-4 text-[#FFD166] group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};
