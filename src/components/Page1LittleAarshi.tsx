import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Camera, RotateCcw, ImagePlus, Check } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { useContent } from '../context/ContentContext';

interface Page1Props {
  onContinue: () => void;
}

const DEFAULT_CHILDHOOD_PHOTO = '/childhood_aarshi.jpg';
const DEFAULT_TODAY_PHOTO = '/today_aarshi.jpg';
const STORAGE_KEY_CHILDHOOD = 'aarshi_real_childhood_photo';
const STORAGE_KEY_TODAY = 'aarshi_real_today_photo';

// Helper to safely compress high-res phone camera photos before saving to localStorage
const compressImage = (file: File, maxWidth = 900, maxHeight = 1200, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const Page1LittleAarshi: React.FC<Page1Props> = ({ onContinue }) => {
  const { config } = useContent();
  const [step, setStep] = useState<number>(0);

  const [childhoodPhoto, setChildhoodPhoto] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_CHILDHOOD) || config.chapter1.childhoodPhoto || DEFAULT_CHILDHOOD_PHOTO;
  });

  const [todayPhoto, setTodayPhoto] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_TODAY) || config.chapter1.todayPhoto || DEFAULT_TODAY_PHOTO;
  });

  const [todayImgError, setTodayImgError] = useState<boolean>(false);
  const [childhoodImgError, setChildhoodImgError] = useState<boolean>(false);

  const [isDraggingChildhood, setIsDraggingChildhood] = useState<boolean>(false);
  const [isDraggingToday, setIsDraggingToday] = useState<boolean>(false);
  const [savedSuccessMessage, setSavedSuccessMessage] = useState<string | null>(null);

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const childhoodInputRef = useRef<HTMLInputElement | null>(null);
  const todayInputRef = useRef<HTMLInputElement | null>(null);

  // Progressive conversation revelation
  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setStep(1), 800)); // Little Aarshi line 1
    timers.push(window.setTimeout(() => setStep(2), 2800)); // Future Aarshi line 1
    timers.push(window.setTimeout(() => setStep(3), 5000)); // Little Aarshi line 2
    timers.push(window.setTimeout(() => setStep(4), 7200)); // Future Aarshi line 2
    timers.push(window.setTimeout(() => setStep(5), 9000)); // Button shines

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  const handlePhotoUpload = async (file: File, type: 'childhood' | 'today') => {
    try {
      const compressedDataUrl = await compressImage(file);
      if (type === 'childhood') {
        setChildhoodPhoto(compressedDataUrl);
        setChildhoodImgError(false);
        try {
          localStorage.setItem(STORAGE_KEY_CHILDHOOD, compressedDataUrl);
        } catch {
          // ignore quota
        }
        setSavedSuccessMessage('Choti Aarshi ki photo save ho gayi! 🌸');
      } else {
        setTodayPhoto(compressedDataUrl);
        setTodayImgError(false);
        try {
          localStorage.setItem(STORAGE_KEY_TODAY, compressedDataUrl);
        } catch {
          // ignore quota
        }
        setSavedSuccessMessage('Aaj Ki Aarshi ki photo save ho gayi! ✨');
      }
      audioManager.playSparkle();
      setTimeout(() => setSavedSuccessMessage(null), 3000);
    } catch {
      // fallback
    }
  };

  const handleResetPhoto = (type: 'childhood' | 'today') => {
    if (type === 'childhood') {
      setChildhoodPhoto(DEFAULT_CHILDHOOD_PHOTO);
      setChildhoodImgError(false);
      localStorage.removeItem(STORAGE_KEY_CHILDHOOD);
    } else {
      setTodayPhoto(DEFAULT_TODAY_PHOTO);
      setTodayImgError(false);
      localStorage.removeItem(STORAGE_KEY_TODAY);
    }
    audioManager.playSparkle();
  };

  const handleStartJourney = () => {
    audioManager.playSparkle();
    setIsTransitioning(true);
    setTimeout(() => {
      onContinue();
    }, 1200);
  };

  return (
    <div id="page-1-little-aarshi" className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 z-10 overflow-hidden select-none">
      
      {/* Cinematic Star Gathering Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/40 transition-opacity duration-1000">
          <div className="w-96 h-96 rounded-full bg-radial from-[#FFD166]/50 via-[#CDB4FF]/30 to-transparent animate-ping" />
        </div>
      )}

      {/* Floating Save Toast Notification */}
      {savedSuccessMessage && (
        <div className="fixed top-6 z-50 animate-bounce flex items-center gap-2 px-4 py-2 rounded-full bg-[#1b1233]/90 border border-[#FFD166] text-[#FFD166] text-xs font-serif-dreamy shadow-xl">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{savedSuccessMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#CDB4FF]/30 text-xs tracking-widest text-[#CDB4FF] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
          <span>{config.chapter1.eyebrow}</span>
        </div>
        <h1 className="font-display-elegant text-3xl sm:text-5xl font-normal tracking-wide text-[#FFF8F0] mt-3">
          {config.chapter1.title.includes('Aarshi') ? (
            config.chapter1.title
          ) : (
            <>
              The Story of{' '}
              <span className="font-script-grand text-4xl sm:text-6xl text-[#FFD166] text-glow-gold px-2">
                Aarshi
              </span>
            </>
          )}
        </h1>
        <p className="font-serif-dreamy italic text-[#FFF8F0]/80 text-base sm:text-lg mt-1 max-w-md mx-auto">
          {config.chapter1.subtitle}
        </p>
      </div>

      {/* Centerpiece: Ethereal Floating Starlight Frames */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 my-4">
        
        {/* Left: Little Aarshi Photo Frame */}
        <div className="flex flex-col items-center group relative">
          <div className="relative p-3 rounded-3xl glass-card glow-lavender transition-all duration-500 hover:scale-105">
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#FFD166] rounded-tl-lg pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#FFD166] rounded-br-lg pointer-events-none" />
            
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDraggingChildhood(true); }}
              onDragLeave={() => setIsDraggingChildhood(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingChildhood(false);
                const file = e.dataTransfer.files?.[0];
                if (file && file.type.startsWith('image/')) {
                  handlePhotoUpload(file, 'childhood');
                }
              }}
              className={`relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-[#241544] via-[#1a0f30] to-[#0c0717] flex items-center justify-center border transition-all duration-300 shadow-2xl ${
                isDraggingChildhood 
                  ? 'border-[#FFD166] ring-4 ring-[#FFD166]/30 scale-102' 
                  : 'border-[#FFC8DD]/30'
              }`}
            >
              {childhoodPhoto && !childhoodImgError ? (
                <div className="relative w-full h-full group/img">
                  <img
                    src={childhoodPhoto}
                    alt="Choti Aarshi"
                    onError={() => setChildhoodImgError(true)}
                    className="w-full h-full object-cover object-top rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none rounded-2xl" />
                  <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-[#FFD166]/40 text-[10px] font-serif-dreamy tracking-wider text-[#FFD166]">
                      {config.chapter1.badgeLittleAarshi}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="absolute inset-4 rounded-full border border-dashed border-[#FFC8DD]/20 animate-spin-slow pointer-events-none" />

                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-[#FFC8DD]/30 via-[#CDB4FF]/30 to-[#FFD166]/20 p-1 glow-pink flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full rounded-full">
                      <defs>
                        <radialGradient id="littleGlow" cx="50%" cy="40%" r="60%">
                          <stop offset="0%" stopColor="#FFF8F0" />
                          <stop offset="60%" stopColor="#FFC8DD" />
                          <stop offset="100%" stopColor="#CDB4FF" />
                        </radialGradient>
                      </defs>
                      <circle cx="50" cy="50" r="48" fill="#150d26" />
                      <path
                        d="M 50 25 C 44 25 38 31 38 38 C 38 44 42 49 46 51 C 36 56 28 67 26 84 C 34 86 66 86 74 84 C 72 67 64 56 54 51 C 58 49 62 44 62 38 C 62 31 56 25 50 25 Z"
                        fill="url(#littleGlow)"
                        opacity="0.85"
                      />
                      <circle cx="50" cy="22" r="7" fill="url(#littleGlow)" opacity="0.8" />
                      <circle cx="58" cy="28" r="3.5" fill="#FFD166" />
                      <circle cx="58" cy="28" r="6" fill="#FFD166" opacity="0.4" />
                      <circle cx="35" cy="40" r="1.2" fill="#FFF8F0" />
                      <circle cx="65" cy="48" r="1.5" fill="#FFD166" />
                      <circle cx="42" cy="65" r="1.3" fill="#FFF8F0" />
                    </svg>
                  </div>

                  <div className="mt-3 text-center">
                    <span className="font-serif-dreamy text-xs text-[#FFC8DD] tracking-widest uppercase">
                      The Little Dreamer
                    </span>
                    <p className="font-script-romantic text-2xl text-[#FFF8F0] leading-none mt-0.5">
                      Choti Aarshi
                    </p>
                  </div>
                </div>
              )}

              {/* Drag overlay hint */}
              {isDraggingChildhood && (
                <div className="absolute inset-0 bg-[#150d26]/90 flex flex-col items-center justify-center p-3 text-center pointer-events-none">
                  <Sparkles className="w-8 h-8 text-[#FFD166] animate-bounce mb-1" />
                  <span className="font-serif-dreamy text-xs text-[#FFD166]">Yahan photo drop karein ✨</span>
                </div>
              )}

              {/* Quick camera icon */}
              <button
                onClick={() => childhoodInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 text-[#FFF8F0]/80 hover:text-[#FFD166] hover:bg-black/90 transition-all text-xs flex items-center gap-1 backdrop-blur-md cursor-pointer"
                title="Choti Aarshi ki photo badlein"
                aria-label="Upload childhood photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input
                ref={childhoodInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePhotoUpload(file, 'childhood');
                }}
              />
            </div>

            {/* Direct 1-Click Asli Photo button */}
            <button
              onClick={() => childhoodInputRef.current?.click()}
              className="mt-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD166]/15 hover:bg-[#FFD166]/25 border border-[#FFD166]/40 text-[11px] font-serif-dreamy text-[#FFD166] transition-all hover:scale-105 cursor-pointer mx-auto"
              title="Apni gallery se choti Aarshi ki photo lagayein"
            >
              <ImagePlus className="w-3.5 h-3.5" />
              <span>Choti Aarshi Ki Photo 📸</span>
            </button>

            {childhoodPhoto !== DEFAULT_CHILDHOOD_PHOTO && (
              <button
                onClick={() => handleResetPhoto('childhood')}
                className="mt-1.5 text-[11px] text-[#FFF8F0]/60 hover:text-[#FFD166] flex items-center gap-1 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset Default
              </button>
            )}
          </div>
        </div>

        {/* Center: Constellation Link */}
        <div className="hidden md:flex flex-col items-center justify-center text-[#FFD166]/50">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#FFD166]/40 to-transparent" />
          <div className="my-2 relative">
            <Heart className="w-5 h-5 text-[#FFC8DD] animate-pulse" />
            <span className="absolute -inset-1 rounded-full bg-[#FFC8DD]/20 blur-sm" />
          </div>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#FFD166]/40 to-transparent" />
        </div>

        {/* Right: Today's Aarshi Photo Frame */}
        <div className="flex flex-col items-center group relative">
          <div className="relative p-3 rounded-3xl glass-card glow-pink transition-all duration-500 hover:scale-105">
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#CDB4FF] rounded-tr-lg pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#CDB4FF] rounded-bl-lg pointer-events-none" />

            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDraggingToday(true); }}
              onDragLeave={() => setIsDraggingToday(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingToday(false);
                const file = e.dataTransfer.files?.[0];
                if (file && file.type.startsWith('image/')) {
                  handlePhotoUpload(file, 'today');
                }
              }}
              className={`relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-[#1b1233] via-[#2a1340] to-[#120a22] flex items-center justify-center border transition-all duration-300 shadow-2xl ${
                isDraggingToday 
                  ? 'border-[#FFD166] ring-4 ring-[#FFD166]/30 scale-102' 
                  : 'border-[#CDB4FF]/30'
              }`}
            >
              {todayPhoto && !todayImgError ? (
                <div className="relative w-full h-full group/img">
                  <img
                    src={todayPhoto}
                    alt="Aaj Ki Aarshi"
                    onError={() => setTodayImgError(true)}
                    className="w-full h-full object-cover object-top rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none rounded-2xl" />
                  <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-[#FFD166]/40 text-[10px] font-serif-dreamy tracking-wider text-[#FFD166]">
                      {config.chapter1.badgeTodayAarshi}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="absolute inset-4 rounded-full border border-dashed border-[#CDB4FF]/20 animate-spin-slow pointer-events-none" />

                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-[#CDB4FF]/30 via-[#FFD166]/25 to-[#FFF8F0]/20 p-1 glow-lavender flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full rounded-full">
                      <defs>
                        <linearGradient id="futureGlowBlend" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#CDB4FF" />
                          <stop offset="50%" stopColor="#FFC8DD" />
                          <stop offset="100%" stopColor="#FFD166" />
                        </linearGradient>
                      </defs>
                      <circle cx="50" cy="50" r="48" fill="#130b24" />
                      <path
                        d="M 50 18 C 42 18 36 24 36 33 C 36 40 40 46 45 49 C 32 55 24 67 22 86 C 30 88 70 88 78 86 C 76 67 68 55 55 49 C 60 46 64 40 64 33 C 64 24 58 18 50 18 Z"
                        fill="url(#futureGlowBlend)"
                        opacity="0.85"
                      />
                      <circle cx="50" cy="30" r="1.5" fill="#FFF8F0" />
                      <circle cx="45" cy="65" r="1.5" fill="#FFD166" />
                      <circle cx="58" cy="72" r="1.2" fill="#FFF8F0" />
                      <circle cx="40" cy="78" r="1.4" fill="#CDB4FF" />
                      <path d="M 44 20 L 47 15 L 50 19 L 53 15 L 56 20 Z" fill="#FFD166" />
                    </svg>
                  </div>

                  <div className="mt-3 text-center">
                    <span className="font-serif-dreamy text-xs text-[#FFD166] tracking-widest uppercase">
                      The Radiant Soul
                    </span>
                    <p className="font-script-romantic text-2xl text-[#FFD166] leading-none mt-0.5">
                      Aaj Ki Aarshi
                    </p>
                  </div>
                </div>
              )}

              {/* Drag overlay hint */}
              {isDraggingToday && (
                <div className="absolute inset-0 bg-[#150d26]/90 flex flex-col items-center justify-center p-3 text-center pointer-events-none">
                  <Sparkles className="w-8 h-8 text-[#FFD166] animate-bounce mb-1" />
                  <span className="font-serif-dreamy text-xs text-[#FFD166]">Yahan photo drop karein ✨</span>
                </div>
              )}

              {/* Quick camera icon */}
              <button
                onClick={() => todayInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 text-[#FFF8F0]/80 hover:text-[#FFD166] hover:bg-black/90 transition-all text-xs flex items-center gap-1 backdrop-blur-md cursor-pointer"
                title="Aaj Ki Aarshi ki photo badlein"
                aria-label="Upload today photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input
                ref={todayInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePhotoUpload(file, 'today');
                }}
              />
            </div>

            {/* Direct 1-Click Asli Photo button */}
            <button
              onClick={() => todayInputRef.current?.click()}
              className="mt-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CDB4FF]/15 hover:bg-[#CDB4FF]/25 border border-[#CDB4FF]/40 text-[11px] font-serif-dreamy text-[#CDB4FF] transition-all hover:scale-105 cursor-pointer mx-auto"
              title="Apni gallery se Aaj ki Aarshi ki photo lagayein (e.g. black saree ya recent photo)"
            >
              <ImagePlus className="w-3.5 h-3.5" />
              <span>Aaj Ki Aarshi Ki Photo 📸</span>
            </button>

            {todayPhoto !== DEFAULT_TODAY_PHOTO && (
              <button
                onClick={() => handleResetPhoto('today')}
                className="mt-1.5 text-[11px] text-[#FFF8F0]/60 hover:text-[#FFD166] flex items-center gap-1 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset Default
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Conversation Cards Sequence */}
      <div className="w-full max-w-xl mx-auto space-y-3.5 my-4 px-2">
        {/* Dialogue 1: Little Aarshi */}
        {step >= 1 && (
          <div className="flex items-start gap-3 transition-all duration-700 animate-slide-up">
            <div className="w-7 h-7 rounded-full bg-[#FFC8DD]/20 border border-[#FFC8DD]/40 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-serif-dreamy text-[#FFC8DD]">A</span>
            </div>
            <div className="p-3.5 rounded-2xl glass-card border border-[#FFC8DD]/30 text-left glow-pink flex-1">
              <span className="font-serif-dreamy text-[11px] text-[#FFC8DD] uppercase tracking-wider block mb-0.5">
                {config.chapter1.dialogue1Label}
              </span>
              <p className="font-serif-dreamy text-sm sm:text-base text-[#FFF8F0]">
                {config.chapter1.dialogue1Text}
              </p>
            </div>
          </div>
        )}

        {/* Dialogue 2: Future Aarshi */}
        {step >= 2 && (
          <div className="flex items-start gap-3 transition-all duration-700 animate-slide-up flex-row-reverse">
            <div className="w-7 h-7 rounded-full bg-[#FFD166]/20 border border-[#FFD166]/40 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-serif-dreamy text-[#FFD166]">A</span>
            </div>
            <div className="p-3.5 rounded-2xl glass-card border border-[#FFD166]/30 text-right glow-gold flex-1">
              <span className="font-serif-dreamy text-[11px] text-[#FFD166] uppercase tracking-wider block mb-0.5">
                {config.chapter1.dialogue2Label}
              </span>
              <p className="font-serif-dreamy text-sm sm:text-base text-[#FFF8F0]">
                {config.chapter1.dialogue2Text}
              </p>
            </div>
          </div>
        )}

        {/* Dialogue 3: Little Aarshi */}
        {step >= 3 && (
          <div className="flex items-start gap-3 transition-all duration-700 animate-slide-up">
            <div className="w-7 h-7 rounded-full bg-[#FFC8DD]/20 border border-[#FFC8DD]/40 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-serif-dreamy text-[#FFC8DD]">A</span>
            </div>
            <div className="p-3.5 rounded-2xl glass-card border border-[#FFC8DD]/30 text-left glow-pink flex-1">
              <span className="font-serif-dreamy text-[11px] text-[#FFC8DD] uppercase tracking-wider block mb-0.5">
                {config.chapter1.dialogue3Label}
              </span>
              <p className="font-serif-dreamy text-sm sm:text-base text-[#FFF8F0]">
                {config.chapter1.dialogue3Text}
              </p>
            </div>
          </div>
        )}

        {/* Dialogue 4: Future Aarshi */}
        {step >= 4 && (
          <div className="flex items-start gap-3 transition-all duration-700 animate-slide-up flex-row-reverse">
            <div className="w-7 h-7 rounded-full bg-[#FFD166]/20 border border-[#FFD166]/40 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-serif-dreamy text-[#FFD166]">A</span>
            </div>
            <div className="p-3.5 rounded-2xl glass-card border border-[#FFD166]/30 text-right glow-gold flex-1">
              <span className="font-serif-dreamy text-[11px] text-[#FFD166] uppercase tracking-wider block mb-0.5">
                {config.chapter1.dialogue4Label}
              </span>
              <p className="font-serif-dreamy text-sm sm:text-base text-[#FFF8F0]">
                {config.chapter1.dialogue4Text}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Button to Enter Chapter 2 */}
      {step >= 5 && (
        <div className="mt-6 flex flex-col items-center gap-2 animate-fade-in">
          <button
            id="start-aarshi-journey-btn"
            onClick={handleStartJourney}
            className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD166] via-[#FFC8DD] to-[#CDB4FF] text-[#130b24] font-serif-dreamy font-semibold text-base sm:text-lg shadow-[0_0_30px_rgba(255,209,102,0.4)] hover:shadow-[0_0_50px_rgba(255,209,102,0.7)] transition-all duration-500 hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#130b24] animate-spin-slow" />
            <span>{config.chapter1.buttonText}</span>
          </button>
        </div>
      )}
    </div>
  );
};
