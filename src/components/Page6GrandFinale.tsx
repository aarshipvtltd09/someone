import React, { useState, useEffect } from 'react';
import { Gift, Heart, RotateCcw, Copy, Check, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';
import { useContent } from '../context/ContentContext';

interface Page6Props {
  onReplay: () => void;
}

export const Page6GrandFinale: React.FC<Page6Props> = ({ onReplay }) => {
  const { config } = useContent();
  const [countdown, setCountdown] = useState<number>(3);
  const [isCelebrationUnlocked, setIsCelebrationUnlocked] = useState<boolean>(false);
  const [isGiftOpen, setIsGiftOpen] = useState<boolean>(false);
  const [copiedLetter, setCopiedLetter] = useState<boolean>(false);
  const [displayedQuote, setDisplayedQuote] = useState<string>('');

  const fullQuote = config.chapter6.typewriterQuote;
  const heartfeltLetter = config.chapter6.heartfeltLetter;

  // Typewriter effect for the emotional quote
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedQuote((prev) => fullQuote.slice(0, index + 1));
      index++;
      if (index >= fullQuote.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // 3-2-1 Countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((c) => c - 1);
        audioManager.playSparkle();
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isCelebrationUnlocked) {
      setIsCelebrationUnlocked(true);
      triggerGrandCelebration();
    }
  }, [countdown, isCelebrationUnlocked]);

  const triggerGrandCelebration = () => {
    audioManager.playChime();

    // Multistage firework starlight bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FFD166', '#FFC8DD', '#CDB4FF', '#FFF8F0', '#A0C4FF'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleOpenGift = () => {
    audioManager.playChime();
    setIsGiftOpen(true);
    triggerGrandCelebration();
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(heartfeltLetter);
    setCopiedLetter(true);
    audioManager.playSparkle();
    setTimeout(() => setCopiedLetter(false), 3000);
  };

  return (
    <div id="page-6-grand-finale" className="relative w-full min-h-screen flex flex-col items-center justify-between px-4 py-16 z-10 overflow-hidden select-none">
      
      {/* Chapter Eyebrow */}
      <div className="text-center z-20 mb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#FFD166]/40 text-xs tracking-widest text-[#FFD166] uppercase glow-gold">
          <Cake className="w-3.5 h-3.5 text-[#FFD166]" />
          <span>Chapter VI &bull; Grand Celestial Celebration</span>
        </div>
      </div>

      {/* Main Celestial Greeting Header */}
      <div className="text-center z-20 my-auto max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Countdown Starlight Aura */}
        {countdown > 0 ? (
          <div className="py-12 flex flex-col items-center animate-fade-in">
            <span className="font-serif-dreamy text-xs tracking-widest text-[#FFC8DD] uppercase mb-2">
              Sitare Saj Rahe Hain...
            </span>
            <div className="relative w-28 h-28 rounded-full glass-card border border-[#FFD166]/60 flex items-center justify-center glow-gold animate-bounce">
              <span className="font-display-elegant text-6xl text-[#FFD166] font-bold">
                {countdown}
              </span>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in flex flex-col items-center w-full">
            
            {/* The Grand Birthday Greeting Banner */}
            <div className="relative my-4">
              <h1
                className="font-display-elegant text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-[#FFD166] uppercase"
                style={{
                  textShadow:
                    '0 0 20px #FFD166, 0 0 40px #FFC8DD, 0 0 70px #CDB4FF',
                }}
              >
                HAPPY BIRTHDAY
              </h1>
              
              <div className="flex items-center justify-center gap-3 my-2">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#FFD166]" />
                <span className="font-script-grand text-6xl sm:text-8xl md:text-9xl text-[#FFF8F0] tracking-normal text-glow-gold px-2">
                  Aarshi
                </span>
                <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#FFD166]" />
              </div>
            </div>

            {/* Typewritten Emotional Quote in Hinglish */}
            <div className="my-3 min-h-[90px] flex flex-col items-center justify-center px-4">
              <p className="font-serif-dreamy text-base sm:text-xl md:text-2xl text-[#FFF8F0]/95 italic text-center whitespace-pre-line leading-relaxed max-w-xl">
                {displayedQuote}
                <span className="inline-block w-1.5 h-5 bg-[#FFD166] ml-1 animate-pulse" />
              </p>
            </div>

            {/* Interactive Birthday Gift Box */}
            <div className="my-6">
              {!isGiftOpen ? (
                <div className="flex flex-col items-center gap-3">
                  <button
                    id="open-birthday-gift-btn"
                    onClick={handleOpenGift}
                    className="group relative p-6 rounded-3xl glass-card border border-[#FFD166]/60 hover:border-[#FFD166] glow-gold transition-all duration-500 hover:scale-110 cursor-pointer shadow-2xl"
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-[#FFD166]/30 via-[#FFC8DD]/30 to-[#CDB4FF]/30 flex items-center justify-center">
                      <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-[#FFD166] group-hover:rotate-12 transition-transform duration-300" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FFD166] animate-ping" />
                    </div>
                  </button>
                  <span className="font-serif-dreamy text-xs tracking-widest text-[#FFD166] uppercase animate-pulse">
                    Apna Birthday Gift Kholein 🎁
                  </span>
                </div>
              ) : (
                /* Unveiled Heartfelt Letter */
                <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl glass-card border border-[#FFD166]/60 shadow-[0_15px_50px_rgba(0,0,0,0.8)] glow-gold animate-fade-in text-left">
                  <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[#FFC8DD] fill-[#FFC8DD]" />
                      <span className="font-serif-dreamy text-xs tracking-widest uppercase text-[#FFD166]">
                        Dil Se Likha Hua Khat
                      </span>
                    </div>

                    <button
                      onClick={handleCopyLetter}
                      className="flex items-center gap-1.5 text-xs text-[#FFF8F0]/70 hover:text-[#FFD166] transition-colors cursor-pointer"
                    >
                      {copiedLetter ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Letter</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar font-serif-dreamy text-sm sm:text-base text-[#FFF8F0]/90 leading-relaxed space-y-4">
                    {heartfeltLetter.split(/\n\n+/).map((paragraph, pIdx) => {
                      const trimmed = paragraph.trim();
                      const isHeader = trimmed.startsWith('**Phase') || trimmed.startsWith('**Last Phase') || trimmed.startsWith('**Happy Birthday');
                      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p
                          key={pIdx}
                          className={`${
                            isHeader
                              ? 'pt-2 font-display-elegant text-base sm:text-lg text-[#FFD166] border-b border-[#FFD166]/15 pb-1'
                              : 'text-[#FFF8F0]/90'
                          } leading-relaxed`}
                        >
                          {parts.map((part, idx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              const inner = part.slice(2, -2);
                              return (
                                <strong key={idx} className="text-[#FFD166] font-semibold">
                                  {inner}
                                </strong>
                              );
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-serif-dreamy text-[#FFD166]">
                    <span>With infinite warmth & starlight ✨</span>
                    <button
                      onClick={triggerGrandCelebration}
                      className="px-3 py-1 rounded-full glass-panel border border-[#FFD166]/40 hover:bg-[#FFD166]/20 transition-all cursor-pointer"
                    >
                      Celebrate Again ✨
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Replay Button */}
      <div className="z-20 flex flex-col sm:flex-row items-center gap-4 mt-6">
        <button
          id="replay-story-btn"
          onClick={() => {
            audioManager.playSparkle();
            onReplay();
          }}
          className="group flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-[#CDB4FF]/40 text-xs font-serif-dreamy tracking-wider text-[#FFF8F0] hover:border-[#FFD166] transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#FFD166] group-hover:-rotate-90 transition-transform duration-300" />
          <span>Shuruat Se Dekhein</span>
        </button>
      </div>
    </div>
  );
};
