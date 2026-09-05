import React, { useState } from 'react';
import { Wand2, Sparkles, CheckCircle2, ArrowRight, Star, Heart, HelpCircle, RotateCcw } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { useContent } from '../context/ContentContext';

interface Page3Props {
  onContinue: () => void;
}

type PowerType = 'request' | 'wish' | 'question' | null;

export const Page3BirthdayPowers: React.FC<Page3Props> = ({ onContinue }) => {
  const { config } = useContent();
  // Chosen single power (Only 1 power can be chosen out of 3)
  const [chosenPower, setChosenPower] = useState<PowerType>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const handleSelectCard = (power: PowerType) => {
    if (isConfirmed) return; // Locked once sealed
    audioManager.playSparkle();
    setChosenPower(power);
  };

  const handleSealPower = () => {
    if (!chosenPower) return;
    audioManager.playChime();
    audioManager.playSparkle();
    setIsConfirmed(true);
  };

  const handleReset = () => {
    audioManager.playSparkle();
    setIsConfirmed(false);
    setChosenPower(null);
  };

  return (
    <div id="page-3-birthday-powers" className="relative w-full min-h-screen flex flex-col items-center justify-between px-4 py-16 z-10 overflow-hidden select-none">
      
      {/* Chapter Eyebrow */}
      <div className="text-center z-20 mb-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#CDB4FF]/40 text-xs tracking-widest text-[#CDB4FF] uppercase">
          <Wand2 className="w-3.5 h-3.5 text-[#FFD166]" />
          <span>Chapter III &bull; Birthday Powers</span>
        </div>
        <h2 className="font-display-elegant text-3xl sm:text-5xl text-[#FFF8F0] mt-2">
          Choose <span className="font-script-grand text-4xl sm:text-6xl text-[#FFD166] text-glow-gold px-1">One Power</span>
        </h2>
        
        {/* Strict single-selection rule */}
        <div className="mt-2.5 flex flex-col items-center gap-1.5 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFD166]/15 border border-[#FFD166]/40 text-xs font-serif-dreamy text-[#FFD166]">
            <Sparkles className="w-3 h-3 text-[#FFD166]" />
            <span>In 3 cards me se aap sirf koi ek hi power chun sakti hain.</span>
          </div>
        </div>
      </div>

      {/* The Three Exclusive Cards */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 my-auto z-20">
        
        {/* CARD 1: Anything You Ask */}
        <div
          id="power-card-1"
          onClick={() => handleSelectCard('request')}
          className={`relative rounded-3xl p-6 transition-all duration-500 glass-card border flex flex-col justify-between ${
            isConfirmed && chosenPower === 'request'
              ? 'border-[#FFC8DD] shadow-[0_0_40px_rgba(255,200,221,0.6)] scale-105 bg-[#25143a]/95 ring-2 ring-[#FFC8DD]'
              : chosenPower === 'request'
              ? 'border-[#FFC8DD] shadow-[0_0_30px_rgba(255,200,221,0.4)] scale-102 bg-[#221338]/90 ring-1 ring-[#FFC8DD] cursor-pointer'
              : isConfirmed
              ? 'opacity-30 pointer-events-none border-white/10 grayscale-[50%]'
              : 'border-[#FFC8DD]/30 shadow-xl hover:border-[#FFC8DD] hover:-translate-y-1 cursor-pointer'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-[#FFC8DD]/20 border border-[#FFC8DD]/40 flex items-center justify-center text-xs font-serif-dreamy text-[#FFC8DD]">
                1
              </span>
              {isConfirmed && chosenPower === 'request' ? (
                <span className="px-3 py-0.5 rounded-full bg-[#FFC8DD] text-[#0b0816] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Sealed
                </span>
              ) : chosenPower === 'request' ? (
                <span className="px-3 py-0.5 rounded-full bg-[#FFC8DD]/80 text-[#0b0816] text-[11px] font-bold uppercase tracking-wider">
                  Selected
                </span>
              ) : isConfirmed ? (
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/50">
                  Locked
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFC8DD]/15 text-[11px] font-serif-dreamy text-[#FFC8DD] border border-[#FFC8DD]/30">
                  Tap to Select
                </span>
              )}
            </div>

            <div className="text-center my-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#FFC8DD]/20 to-[#CDB4FF]/20 flex items-center justify-center mb-3 glow-pink">
                <Heart className="w-7 h-7 text-[#FFC8DD]" />
              </div>
              <h3 className="font-display-elegant text-2xl text-[#FFF8F0]">
                {config.chapter3.card1Title}
              </h3>
              <p className="font-serif-dreamy text-sm sm:text-base text-[#FFF8F0]/90 italic mt-3 leading-relaxed">
                &ldquo;{config.chapter3.card1Description}&rdquo;
              </p>
            </div>
          </div>

          {/* Action & Confirmation */}
          <div className="mt-4 pt-4 border-t border-white/10">
            {chosenPower === 'request' && (
              <>
                {isConfirmed ? (
                  <div className="p-3.5 rounded-2xl bg-[#FFC8DD]/20 border border-[#FFC8DD]/50 text-center animate-fade-in space-y-1.5">
                    <p className="text-xs font-bold text-[#FFF8F0] tracking-wide">
                      👑 Vachan Sealed Forever!
                    </p>
                    <p className="text-xs font-serif-dreamy italic text-[#FFC8DD] leading-relaxed">
                      Aap mujhse jo chahein maang sakti hain, yeh vachan hamesha qubool aur sar-aankhon par rahega.
                    </p>
                  </div>
                ) : (
                  <div className="animate-fade-in text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={handleSealPower}
                      className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-[#FFC8DD] to-[#FFD166] text-[#0b0816] font-display-elegant font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(255,200,221,0.5)] hover:scale-102 flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-[#0b0816]" />
                      <span>Seal This Birthday Power 💖</span>
                    </button>
                  </div>
                )}
              </>
            )}
            {chosenPower !== 'request' && !isConfirmed && (
              <p className="text-center text-[11px] text-[#FFF8F0]/50 font-serif-dreamy italic">
                Card par tap karke select karein
              </p>
            )}
          </div>
        </div>

        {/* CARD 2: One Wish */}
        <div
          id="power-card-2"
          onClick={() => handleSelectCard('wish')}
          className={`relative rounded-3xl p-6 transition-all duration-500 glass-card border flex flex-col justify-between ${
            isConfirmed && chosenPower === 'wish'
              ? 'border-[#FFD166] shadow-[0_0_45px_rgba(255,209,102,0.65)] scale-105 bg-[#281c3a]/95 ring-2 ring-[#FFD166]'
              : chosenPower === 'wish'
              ? 'border-[#FFD166] shadow-[0_0_30px_rgba(255,209,102,0.45)] scale-102 bg-[#261b36]/90 ring-1 ring-[#FFD166] cursor-pointer'
              : isConfirmed
              ? 'opacity-30 pointer-events-none border-white/10 grayscale-[50%]'
              : 'border-[#FFD166]/35 shadow-xl hover:border-[#FFD166] hover:-translate-y-1 cursor-pointer'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-[#FFD166]/20 border border-[#FFD166]/40 flex items-center justify-center text-xs font-serif-dreamy text-[#FFD166]">
                2
              </span>
              {isConfirmed && chosenPower === 'wish' ? (
                <span className="px-3 py-0.5 rounded-full bg-[#FFD166] text-[#0b0816] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Sealed
                </span>
              ) : chosenPower === 'wish' ? (
                <span className="px-3 py-0.5 rounded-full bg-[#FFD166]/80 text-[#0b0816] text-[11px] font-bold uppercase tracking-wider">
                  Selected
                </span>
              ) : isConfirmed ? (
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/50">
                  Locked
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFD166]/15 text-[11px] font-serif-dreamy text-[#FFD166] border border-[#FFD166]/30">
                  Tap to Select
                </span>
              )}
            </div>

            <div className="text-center my-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#FFD166]/20 to-[#FFC8DD]/20 flex items-center justify-center mb-3 glow-gold">
                <Star className="w-7 h-7 text-[#FFD166] fill-[#FFD166]" />
              </div>
              <h3 className="font-display-elegant text-2xl text-[#FFF8F0]">
                {config.chapter3.card2Title}
              </h3>
              <p className="font-serif-dreamy text-sm sm:text-base text-[#FFF8F0]/90 italic mt-3 leading-relaxed">
                &ldquo;{config.chapter3.card2Description}&rdquo;
              </p>
            </div>
          </div>

          {/* Action & Confirmation */}
          <div className="mt-4 pt-4 border-t border-white/10">
            {chosenPower === 'wish' && (
              <>
                {isConfirmed ? (
                  <div className="p-3.5 rounded-2xl bg-[#FFD166]/20 border border-[#FFD166]/50 text-center animate-fade-in space-y-1.5">
                    <p className="text-xs font-bold text-[#FFF8F0] tracking-wide">
                      ⭐ Khwahish Sealed in the Stars!
                    </p>
                    <p className="text-xs font-serif-dreamy italic text-[#FFD166] leading-relaxed">
                      Aapki har dili dua aur wish taaron me darj ho gayi hai. Yeh hamesha roshan rahegi.
                    </p>
                  </div>
                ) : (
                  <div className="animate-fade-in text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={handleSealPower}
                      className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-[#FFD166] to-[#FFC8DD] text-[#0b0816] font-display-elegant font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(255,209,102,0.55)] hover:scale-102 flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-[#0b0816]" />
                      <span>Seal This Birthday Wish ⭐</span>
                    </button>
                  </div>
                )}
              </>
            )}
            {chosenPower !== 'wish' && !isConfirmed && (
              <p className="text-center text-[11px] text-[#FFF8F0]/50 font-serif-dreamy italic">
                Card par tap karke select karein
              </p>
            )}
          </div>
        </div>

        {/* CARD 3: Ask Me Anything */}
        <div
          id="power-card-3"
          onClick={() => handleSelectCard('question')}
          className={`relative rounded-3xl p-6 transition-all duration-500 glass-card border flex flex-col justify-between ${
            isConfirmed && chosenPower === 'question'
              ? 'border-[#CDB4FF] shadow-[0_0_40px_rgba(205,180,255,0.6)] scale-105 bg-[#20163b]/95 ring-2 ring-[#CDB4FF]'
              : chosenPower === 'question'
              ? 'border-[#CDB4FF] shadow-[0_0_30px_rgba(205,180,255,0.4)] scale-102 bg-[#1e1538]/90 ring-1 ring-[#CDB4FF] cursor-pointer'
              : isConfirmed
              ? 'opacity-30 pointer-events-none border-white/10 grayscale-[50%]'
              : 'border-[#CDB4FF]/30 shadow-xl hover:border-[#CDB4FF] hover:-translate-y-1 cursor-pointer'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-[#CDB4FF]/20 border border-[#CDB4FF]/40 flex items-center justify-center text-xs font-serif-dreamy text-[#CDB4FF]">
                3
              </span>
              {isConfirmed && chosenPower === 'question' ? (
                <span className="px-3 py-0.5 rounded-full bg-[#CDB4FF] text-[#0b0816] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Sealed
                </span>
              ) : chosenPower === 'question' ? (
                <span className="px-3 py-0.5 rounded-full bg-[#CDB4FF]/80 text-[#0b0816] text-[11px] font-bold uppercase tracking-wider">
                  Selected
                </span>
              ) : isConfirmed ? (
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/50">
                  Locked
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-[#CDB4FF]/15 text-[11px] font-serif-dreamy text-[#CDB4FF] border border-[#CDB4FF]/30">
                  Tap to Select
                </span>
              )}
            </div>

            <div className="text-center my-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#CDB4FF]/20 to-[#FFD166]/20 flex items-center justify-center mb-3 glow-lavender">
                <HelpCircle className="w-7 h-7 text-[#CDB4FF]" />
              </div>
              <h3 className="font-display-elegant text-2xl text-[#FFF8F0]">
                {config.chapter3.card3Title}
              </h3>
              <p className="font-serif-dreamy text-sm sm:text-base text-[#FFF8F0]/90 italic mt-3 leading-relaxed">
                &ldquo;{config.chapter3.card3Description}&rdquo;
              </p>
            </div>
          </div>

          {/* Action & Confirmation */}
          <div className="mt-4 pt-4 border-t border-white/10">
            {chosenPower === 'question' && (
              <>
                {isConfirmed ? (
                  <div className="p-3.5 rounded-2xl bg-[#CDB4FF]/20 border border-[#CDB4FF]/50 text-center animate-fade-in space-y-1.5">
                    <p className="text-xs font-bold text-[#FFF8F0] tracking-wide">
                      🔮 Truth Sealed Forever!
                    </p>
                    <p className="text-xs font-serif-dreamy italic text-[#CDB4FF] leading-relaxed">
                      Aap zindagi ke kisi bhi mod par jo poochna chahein, hamesha sach aur dil se jawab milega.
                    </p>
                  </div>
                ) : (
                  <div className="animate-fade-in text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={handleSealPower}
                      className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-[#CDB4FF] to-[#FFD166] text-[#0b0816] font-display-elegant font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(205,180,255,0.5)] hover:scale-102 flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-[#0b0816]" />
                      <span>Seal This Birthday Power 🔮</span>
                    </button>
                  </div>
                )}
              </>
            )}
            {chosenPower !== 'question' && !isConfirmed && (
              <p className="text-center text-[11px] text-[#FFF8F0]/50 font-serif-dreamy italic">
                Card par tap karke select karein
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation Button & Reset Option */}
      <div className="z-20 flex flex-col sm:flex-row items-center gap-3 mt-6">
        {isConfirmed && (
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-full glass-panel border border-white/20 text-xs font-serif-dreamy text-[#FFF8F0]/70 hover:text-white hover:border-white/40 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Change Power</span>
          </button>
        )}

        <button
          id="powers-continue-btn"
          onClick={() => {
            audioManager.playSparkle();
            onContinue();
          }}
          className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFC8DD]/25 via-[#CDB4FF]/25 to-[#FFD166]/25 border border-[#FFD166]/70 text-[#FFF8F0] font-display-elegant text-base tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,209,102,0.5)] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span>Next: Aarshi Constellation</span>
            <ArrowRight className="w-4 h-4 text-[#FFD166] group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};
