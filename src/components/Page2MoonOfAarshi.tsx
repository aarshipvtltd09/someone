import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Star, X, RotateCw } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { useContent } from '../context/ContentContext';

interface Page2Props {
  onContinue: () => void;
}

interface TraitOrb {
  id: string;
  word: string;
  subWord: string;
  initialAngle: number;
  radius: number;
  color: string;
  glow: string;
  title: string;
  quote: string;
}

const TRAITS: TraitOrb[] = [
  {
    id: 'kind',
    word: 'Kind Heart',
    subWord: 'Dil Ki Saaf',
    initialAngle: 0,
    radius: 260,
    color: '#FFC8DD',
    glow: 'rgba(255, 200, 221, 0.7)',
    title: 'Kind & Pure Heart',
    quote: 'Tumhara dil itna pyara aur saaf hai ki tumhare paas aate hi har kisi ko ek ajeeb sa sukoon milta hai.',
  },
  {
    id: 'beautiful',
    word: 'Truly Beautiful',
    subWord: 'Bepanah Haseen',
    initialAngle: 40,
    radius: 310,
    color: '#CDB4FF',
    glow: 'rgba(205, 180, 255, 0.7)',
    title: 'Pure Elegance',
    quote: 'Sirf chehra hi nahi, balki tumhari awaaz, tumhari baatein aur tumhari rooh bepanah haseen hain.',
  },
  {
    id: 'strong',
    word: 'Quiet Strength',
    subWord: 'Majboot Irade',
    initialAngle: 80,
    radius: 270,
    color: '#FFD166',
    glow: 'rgba(255, 209, 102, 0.7)',
    title: 'Inner Resilience',
    quote: 'Chahe din kitna bhi mushkil ho, tum hamesha ek pyaari si muskaan ke sath aage badhti ho.',
  },
  {
    id: 'cute',
    word: 'Super Cute',
    subWord: 'Masoom & Pyaari',
    initialAngle: 120,
    radius: 320,
    color: '#FFC8DD',
    glow: 'rgba(255, 200, 221, 0.7)',
    title: 'Adorable Moments',
    quote: 'Tumhari choti choti masoom baatein aur khilkhilati hasi poore aalam ko roshan kar deti hai.',
  },
  {
    id: 'caring',
    word: 'Deeply Caring',
    subWord: 'Fikramand Andaaz',
    initialAngle: 160,
    radius: 265,
    color: '#FFF8F0',
    glow: 'rgba(255, 248, 240, 0.7)',
    title: 'Unconditional Care',
    quote: 'Tum bina kisi shart ke doosron ka khayal rakhti ho aur unki khushi me apni khushi dhoondh leti ho.',
  },
  {
    id: 'smart',
    word: 'Brilliant Mind',
    subWord: 'Samajhdaar Zehen',
    initialAngle: 200,
    radius: 315,
    color: '#A0C4FF',
    glow: 'rgba(160, 196, 255, 0.7)',
    title: 'Wisdom & Intelligence',
    quote: 'Tumhari samajh, tumhari soch aur tumhari baatein hamesha sabka dil jeet leti hain.',
  },
  {
    id: 'lovely',
    word: 'Simply Lovely',
    subWord: 'Sabse Pyaari',
    initialAngle: 240,
    radius: 275,
    color: '#FFC8DD',
    glow: 'rgba(255, 200, 221, 0.7)',
    title: 'Warmth of Home',
    quote: 'Tumhare aas-paas hona hi ek bohot sukoon bhara ehsaas deta hai, bilkul apne ghar jaisa.',
  },
  {
    id: 'rare',
    word: 'Rare Soul',
    subWord: 'Anmol & Alag',
    initialAngle: 280,
    radius: 325,
    color: '#FFD166',
    glow: 'rgba(255, 209, 102, 0.7)',
    title: 'One in a Billion',
    quote: 'Is poori universe ke arbon taaron me bhi, Aarshi jaisi anmol rooh sirf ek hi hai.',
  },
  {
    id: 'radiant',
    word: 'Radiant Aura',
    subWord: 'Roshan Chehra',
    initialAngle: 320,
    radius: 280,
    color: '#CDB4FF',
    glow: 'rgba(205, 180, 255, 0.7)',
    title: 'Spreading Starlight',
    quote: 'Jahan bhi tum qadam rakhti ho, wahan sirf khushiyan aur umeed ke phool khil jaate hain.',
  },
];

export const Page2MoonOfAarshi: React.FC<Page2Props> = ({ onContinue }) => {
  const { config } = useContent();
  const [selectedTrait, setSelectedTrait] = useState<TraitOrb | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [moonHovered, setMoonHovered] = useState<boolean>(false);
  const requestRef = useRef<number | null>(null);

  // Smooth continuous celestial revolution around the moon
  useEffect(() => {
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      if (isRotating) {
        setOrbitAngle((prev) => (prev + delta * 0.016) % 360);
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRotating]);

  const handleSelectTrait = (trait: TraitOrb) => {
    audioManager.playSparkle();
    setSelectedTrait(trait);
    setIsRotating(false);
  };

  const handleCloseModal = () => {
    audioManager.playSparkle();
    setSelectedTrait(null);
    setIsRotating(true);
  };

  return (
    <div id="page-2-moon-of-aarshi" className="relative w-full min-h-screen flex flex-col items-center justify-between px-4 py-16 z-10 overflow-hidden select-none">
      
      {/* Chapter Eyebrow Header */}
      <div className="text-center z-20 mb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#FFD166]/40 text-xs tracking-widest text-[#FFD166] uppercase">
          <Star className="w-3.5 h-3.5 fill-[#FFD166]" />
          <span>Chapter II &bull; The Celestial Orbit</span>
        </div>
        <h2 className="font-display-elegant text-3xl sm:text-5xl text-[#FFF8F0] mt-2">
          Moon of <span className="font-script-grand text-4xl sm:text-6xl text-[#FFD166] text-glow-gold px-1">Aarshi</span>
        </h2>
        <p className="font-serif-dreamy italic text-[#FFF8F0]/80 text-sm sm:text-base max-w-lg mx-auto mt-1">
          {config.chapter2.centerMoonNote}
        </p>
      </div>

      {/* Main Orbit Stage */}
      <div className="relative w-full max-w-4xl h-[440px] sm:h-[500px] flex items-center justify-center my-auto z-20">
        
        {/* Visual Elliptical Orbit Paths */}
        <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-[#FFD166]/20 pointer-events-none animate-spin-slow" />
        <div className="absolute w-[440px] h-[440px] sm:w-[620px] sm:h-[620px] rounded-full border border-[#CDB4FF]/15 pointer-events-none" />

        {/* Center: The Realistic 3D Glowing Moon */}
        <div
          id="realistic-moon-center"
          onMouseEnter={() => setMoonHovered(true)}
          onMouseLeave={() => setMoonHovered(false)}
          className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full cursor-pointer z-30 transition-all duration-700 hover:scale-110 flex items-center justify-center group"
          onClick={() => {
            audioManager.playChime();
            setIsRotating((prev) => !prev);
          }}
        >
          {/* Photorealistic Moon Atmosphere Glow */}
          <div className="absolute -inset-10 rounded-full bg-radial from-[#FFD166]/35 via-[#FFF8F0]/15 to-transparent blur-2xl pointer-events-none animate-pulse-soft" />
          <div className="absolute -inset-4 rounded-full bg-radial from-[#CDB4FF]/30 to-transparent blur-lg pointer-events-none" />

          {/* Hyper-realistic 3D Spherical Moon Body */}
          <div
            className="w-full h-full rounded-full shadow-[inset_-25px_-20px_45px_rgba(0,0,0,0.85),0_0_50px_rgba(255,209,102,0.45),0_0_90px_rgba(255,200,221,0.25)] relative overflow-hidden flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #FFFDF7 0%, #F5E8C7 25%, #DEC598 60%, #8C7853 90%, #3D3222 100%)',
            }}
          >
            {/* Crater System Details */}
            <div className="absolute w-12 h-10 rounded-full bg-[#B39B70]/40 blur-[1px] top-8 left-10 transform -rotate-12 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6)]" />
            <div className="absolute w-16 h-12 rounded-full bg-[#A38B60]/35 blur-[2px] bottom-10 right-8 transform rotate-24 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]" />
            <div className="absolute w-8 h-8 rounded-full bg-[#8E7852]/45 blur-[1px] top-20 right-12 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.7)]" />
            <div className="absolute w-6 h-6 rounded-full bg-[#7D6843]/40 blur-[1px] bottom-16 left-12" />
            <div className="absolute w-14 h-9 rounded-full bg-[#C2AA7F]/30 blur-[2px] top-12 right-20" />
            
            {/* Mare Basins (Dark lunar patches) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/20 pointer-events-none" />

            {/* Glowing Center Label */}
            <div className="relative z-10 text-center px-2 pointer-events-none">
              <span className="font-serif-dreamy text-[11px] sm:text-xs tracking-widest text-[#574320] uppercase font-bold block">
                Her Light
              </span>
              <span className="font-script-grand text-2xl sm:text-4xl text-[#2F210E] font-extrabold tracking-wide drop-shadow-sm">
                Aarshi
              </span>
            </div>
          </div>

          {/* Hover helper */}
          {moonHovered && (
            <div className="absolute -bottom-8 px-3 py-1 rounded-full glass-panel border border-[#FFD166]/40 text-[11px] font-serif-dreamy text-[#FFD166] whitespace-nowrap animate-fade-in pointer-events-none">
              Tap to {isRotating ? 'pause orbit' : 'resume orbit'}
            </div>
          )}
        </div>

        {/* 9 Circling Trait Orbs */}
        {TRAITS.map((trait, index) => {
          const currentDeg = (trait.initialAngle + orbitAngle) % 360;
          const rad = (currentDeg * Math.PI) / 180;
          
          // Responsive radius multiplier
          const responsiveRadius = window.innerWidth < 640 ? trait.radius * 0.62 : trait.radius;
          const x = Math.cos(rad) * responsiveRadius;
          const y = Math.sin(rad) * (responsiveRadius * 0.72); // Elliptical perspective

          // Z-index based on vertical depth
          const isFront = Math.sin(rad) > 0;
          const depthScale = 0.85 + (Math.sin(rad) + 1) * 0.15;

          return (
            <div
              key={trait.id}
              className="absolute transition-transform duration-75 cursor-pointer"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${depthScale})`,
                zIndex: isFront ? 40 : 20,
              }}
              onClick={() => handleSelectTrait(trait)}
            >
              <div className="group relative flex flex-col items-center">
                {/* Glowing Core Star */}
                <div
                  className="w-10 h-10 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-125 border border-white/40 shadow-lg"
                  style={{
                    backgroundColor: `${trait.color}30`,
                    boxShadow: `0 0 20px ${trait.glow}`,
                  }}
                >
                  <Star
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45"
                    style={{ color: trait.color, fill: `${trait.color}60` }}
                  />
                </div>

                {/* Trait Name Pill */}
                <div className="mt-2 px-3 py-1 rounded-full glass-panel border border-white/20 group-hover:border-[#FFD166] transition-all whitespace-nowrap text-center shadow-md">
                  <p className="font-serif-dreamy text-xs font-semibold text-[#FFF8F0] tracking-wide">
                    {trait.word}
                  </p>
                  <p className="font-script-romantic text-xs text-[#FFD166]">
                    {trait.subWord}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trait Card Modal */}
      {selectedTrait && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-card border border-[#FFD166]/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] glow-gold text-center animate-slide-up">
            
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full glass-panel text-[#FFF8F0]/70 hover:text-white hover:border-[#FFD166] transition-all cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/30"
              style={{
                backgroundColor: `${selectedTrait.color}25`,
                boxShadow: `0 0 25px ${selectedTrait.glow}`,
              }}
            >
              <Sparkles className="w-8 h-8" style={{ color: selectedTrait.color }} />
            </div>

            <span className="font-serif-dreamy text-xs text-[#FFC8DD] uppercase tracking-widest block mb-1">
              Celestial Trait
            </span>

            <h3 className="font-display-elegant text-2xl sm:text-3xl text-[#FFF8F0] font-normal">
              {selectedTrait.title}
            </h3>

            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#FFD166] to-transparent mx-auto my-4" />

            <p className="font-serif-dreamy italic text-sm sm:text-base text-[#FFF8F0]/90 leading-relaxed">
              &ldquo;{selectedTrait.quote}&rdquo;
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-full bg-[#FFD166] text-[#0b0816] font-semibold text-xs uppercase tracking-wider hover:bg-[#ffe082] transition-colors cursor-pointer shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation Button */}
      <div className="z-20 flex items-center gap-4 mt-6">
        <button
          onClick={() => setIsRotating((prev) => !prev)}
          className="p-3 rounded-full glass-panel border border-white/20 text-[#FFF8F0]/70 hover:text-white hover:border-[#FFD166] transition-all cursor-pointer"
          title={isRotating ? 'Pause Orbit' : 'Resume Orbit'}
          aria-label={isRotating ? 'Pause Orbit' : 'Resume Orbit'}
        >
          <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin-slow' : ''}`} />
        </button>

        <button
          id="orbit-continue-btn"
          onClick={() => {
            audioManager.playSparkle();
            onContinue();
          }}
          className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#CDB4FF]/30 via-[#FFC8DD]/30 to-[#FFD166]/30 border border-[#FFD166]/70 text-[#FFF8F0] font-display-elegant text-base tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,209,102,0.5)] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span>Next: Birthday Powers</span>
            <ArrowRight className="w-4 h-4 text-[#FFD166] group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};
