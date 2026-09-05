import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Star, Wand2, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';
import { useContent } from '../context/ContentContext';

interface Page4Props {
  onContinue: () => void;
}

interface Point {
  x: number; // 0-100 coordinate in viewBox
  y: number; // 0-100 coordinate in viewBox
  order: number;
}

interface ConstellationShape {
  id: string;
  name: string;
  meaning: string;
  isClosed: boolean;
  points: Point[];
}

const SHAPES: ConstellationShape[] = [
  {
    id: 'heart',
    name: 'Heart of Aarshi',
    meaning: 'Itna pyara aur saaf dil, jo bina kisi shart ke sabko apna bana leta hai.',
    isClosed: true,
    points: [
      { x: 50, y: 82, order: 1 },
      { x: 28, y: 62, order: 2 },
      { x: 18, y: 40, order: 3 },
      { x: 26, y: 22, order: 4 },
      { x: 42, y: 24, order: 5 },
      { x: 50, y: 38, order: 6 },
      { x: 58, y: 24, order: 7 },
      { x: 74, y: 22, order: 8 },
      { x: 82, y: 40, order: 9 },
      { x: 72, y: 62, order: 10 },
    ],
  },
  {
    id: 'butterfly',
    name: 'Butterfly of Joy',
    meaning: 'Aisi azaad aur pyari rooh, jo jahan bhi jaye khushiyon ke phool khila de.',
    isClosed: false,
    points: [
      { x: 50, y: 18, order: 1 },
      { x: 50, y: 82, order: 2 },
      { x: 22, y: 24, order: 3 },
      { x: 14, y: 55, order: 4 },
      { x: 50, y: 50, order: 5 },
      { x: 86, y: 55, order: 6 },
      { x: 78, y: 24, order: 7 },
    ],
  },
  {
    id: 'moon',
    name: 'Crescent Moon',
    meaning: 'Andheri se andheri raaton me bhi sukoon aur thandak dene wali roshni.',
    isClosed: true,
    points: [
      { x: 58, y: 15, order: 1 },
      { x: 38, y: 25, order: 2 },
      { x: 28, y: 45, order: 3 },
      { x: 30, y: 65, order: 4 },
      { x: 42, y: 80, order: 5 },
      { x: 60, y: 85, order: 6 },
      { x: 48, y: 68, order: 7 },
      { x: 44, y: 50, order: 8 },
      { x: 48, y: 32, order: 9 },
    ],
  },
  {
    id: 'crown',
    name: "Queen's Crown",
    meaning: 'Hamesha sar utha kar jeene wali, dilon par raaj karne wali queen.',
    isClosed: true,
    points: [
      { x: 20, y: 72, order: 1 },
      { x: 16, y: 36, order: 2 },
      { x: 34, y: 50, order: 3 },
      { x: 50, y: 22, order: 4 },
      { x: 66, y: 50, order: 5 },
      { x: 84, y: 36, order: 6 },
      { x: 80, y: 72, order: 7 },
    ],
  },
];

export const Page4ConstellationGame: React.FC<Page4Props> = ({ onContinue }) => {
  const { config } = useContent();
  const [currentShapeIdx, setCurrentShapeIdx] = useState<number>(0);
  const [connectedCount, setConnectedCount] = useState<number>(1); // starts with star 1 active
  const [isGrandFinaleReady, setIsGrandFinaleReady] = useState<boolean>(false);
  const [isAutoConnecting, setIsAutoConnecting] = useState<boolean>(false);

  const currentShape = SHAPES[currentShapeIdx];
  const isShapeComplete = connectedCount >= currentShape.points.length;

  // Next star to click is connectedCount + 1
  const nextTargetOrder = isShapeComplete ? null : connectedCount + 1;

  const handleStarClick = (order: number) => {
    if (order <= connectedCount) return;

    audioManager.playSparkle();
    const newCount = Math.min(order, currentShape.points.length);
    setConnectedCount(newCount);

    if (newCount === currentShape.points.length) {
      triggerShapeCompletion();
    }
  };

  const triggerShapeCompletion = () => {
    audioManager.playChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD166', '#FFC8DD', '#CDB4FF', '#FFF8F0'],
    });

    if (currentShapeIdx === SHAPES.length - 1) {
      setTimeout(() => {
        setIsGrandFinaleReady(true);
      }, 1200);
    }
  };

  const handleAutoConnect = () => {
    if (isAutoConnecting || isShapeComplete) return;
    setIsAutoConnecting(true);
    audioManager.playSparkle();

    let current = connectedCount;
    const interval = setInterval(() => {
      current++;
      setConnectedCount(current);
      audioManager.playSparkle();

      if (current >= currentShape.points.length) {
        clearInterval(interval);
        setIsAutoConnecting(false);
        triggerShapeCompletion();
      }
    }, 280);
  };

  const handleNextShape = () => {
    if (currentShapeIdx < SHAPES.length - 1) {
      setCurrentShapeIdx((prev) => prev + 1);
      setConnectedCount(1);
      audioManager.playSparkle();
    } else {
      setIsGrandFinaleReady(true);
    }
  };

  const handleResetShape = () => {
    setConnectedCount(1);
    audioManager.playSparkle();
  };

  // Compute lines in viewBox coordinates
  const connectedLines = [];
  for (let i = 1; i < connectedCount; i++) {
    const p1 = currentShape.points[i - 1];
    const p2 = currentShape.points[i];
    if (p1 && p2) {
      connectedLines.push({ p1, p2, key: `line-${p1.order}-${p2.order}` });
    }
  }

  const closingLine =
    isShapeComplete && currentShape.isClosed && currentShape.points.length > 2
      ? {
          p1: currentShape.points[currentShape.points.length - 1],
          p2: currentShape.points[0],
          key: 'closing-line',
        }
      : null;

  return (
    <div id="page-4-constellation-game" className="relative w-full min-h-screen flex flex-col items-center justify-between px-4 py-16 z-10 overflow-hidden select-none">
      
      {/* Clean Single-Language Header */}
      <div className="text-center z-20 mb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#FFD166]/40 text-xs tracking-widest text-[#FFD166] uppercase">
          <Star className="w-3.5 h-3.5 fill-[#FFD166]" />
          <span>Chapter IV &bull; Constellation of Starlight</span>
        </div>
        <h2 className="font-display-elegant text-3xl sm:text-5xl text-[#FFF8F0] mt-2">
          {currentShape.name}
        </h2>
        <p className="font-serif-dreamy italic text-[#FFF8F0]/80 text-sm sm:text-base max-w-lg mx-auto mt-1">
          Numbered stars par tap karein aur Aarshi ke liye ye aakriti poori karein.
        </p>
      </div>

      {/* Main Celestial Starlight Canvas Container */}
      <div className="relative w-full max-w-lg h-[370px] sm:h-[430px] my-auto z-20 rounded-3xl glass-card border border-[#CDB4FF]/40 p-4 sm:p-6 flex items-center justify-center glow-lavender shadow-[0_10px_45px_rgba(0,0,0,0.6)]">
        
        {/* If Grand Finale is ready: Grand glowing Birthday Message with New Beautiful Shayari */}
        {isGrandFinaleReady ? (
          <div className="text-center animate-fade-in flex flex-col items-center justify-center p-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFD166]/20 border border-[#FFD166]/50 text-[#FFD166] text-xs font-serif-dreamy mb-3 glow-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aasman Ka Paigaam ✨</span>
            </div>

            <h3
              className="font-display-elegant text-3xl sm:text-5xl md:text-6xl font-bold tracking-wider text-[#FFD166] uppercase leading-tight"
              style={{
                textShadow: '0 0 25px #FFD166, 0 0 45px #FFC8DD, 0 0 70px #CDB4FF',
              }}
            >
              HAPPY BIRTHDAY
              <br />
              <span className="font-script-grand text-5xl sm:text-7xl text-[#FFF8F0] normal-case block mt-2 text-glow-gold">
                Aarshi
              </span>
            </h3>

            {/* BRAND NEW TOUCHING SHAYARI (Dynamic from config) */}
            <div className="mt-5 max-w-md mx-auto p-4 rounded-2xl bg-black/30 border border-[#FFD166]/30">
              <p className="font-serif-dreamy text-sm sm:text-base text-[#FFF8F0] leading-relaxed italic">
                &ldquo;{config.chapter4.shayariLine1}<br />
                {config.chapter4.shayariLine2}<br />
                {config.chapter4.shayariLine3}<br />
                {config.chapter4.shayariLine4}&rdquo;
              </p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            
            {/* Header Status inside Game Box */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between text-xs font-serif-dreamy text-[#FFF8F0]/80 z-30 px-1">
              <span className="text-[#FFD166] font-semibold text-sm sm:text-base flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#FFD166]" />
                <span>{currentShape.name}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full glass-panel border border-[#FFD166]/30 text-xs text-[#FFF8F0]/90">
                {connectedCount} / {currentShape.points.length} Stars
              </span>
            </div>

            {/* SVG Coordinate Layer */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            >
              <defs>
                <filter id="starGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connected Starlight Laser Lines */}
              {connectedLines.map(({ p1, p2, key }) => (
                <line
                  key={key}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#FFD166"
                  strokeWidth="1.6"
                  strokeDasharray="3 1.5"
                  filter="url(#starGlow)"
                  className="transition-all duration-300 shadow-[0_0_10px_#FFD166]"
                />
              ))}

              {/* Closing Line if Closed Shape */}
              {closingLine && (
                <line
                  x1={closingLine.p1.x}
                  y1={closingLine.p1.y}
                  x2={closingLine.p2.x}
                  y2={closingLine.p2.y}
                  stroke="#FFC8DD"
                  strokeWidth="1.8"
                  filter="url(#starGlow)"
                  className="animate-fade-in"
                />
              )}

              {/* Faint Guide Line to Next Star */}
              {nextTargetOrder && (
                <line
                  x1={currentShape.points[connectedCount - 1].x}
                  y1={currentShape.points[connectedCount - 1].y}
                  x2={currentShape.points[nextTargetOrder - 1].x}
                  y2={currentShape.points[nextTargetOrder - 1].y}
                  stroke="rgba(255, 209, 102, 0.35)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  className="animate-pulse"
                />
              )}
            </svg>

            {/* Interactive Stars */}
            {currentShape.points.map((pt) => {
              const isConnected = pt.order <= connectedCount;
              const isNextTarget = pt.order === nextTargetOrder;

              return (
                <div
                  key={pt.order}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                >
                  <button
                    id={`star-node-${pt.order}`}
                    onClick={() => handleStarClick(pt.order)}
                    className="relative w-12 h-12 flex items-center justify-center cursor-pointer group focus:outline-none"
                    aria-label={`Star ${pt.order}`}
                  >
                    {/* Pulsing Target Radar Aura */}
                    {isNextTarget && (
                      <span className="absolute w-10 h-10 rounded-full border-2 border-[#FFD166] animate-ping opacity-75 pointer-events-none" />
                    )}

                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-300 ${
                        isConnected
                          ? 'bg-[#FFD166] text-[#0b0816] shadow-[0_0_20px_#FFD166] scale-110'
                          : isNextTarget
                          ? 'bg-gradient-to-tr from-[#FFC8DD] to-[#FFD166] text-[#0b0816] border-2 border-[#FFF8F0] shadow-[0_0_18px_#FFD166] scale-125 animate-bounce'
                          : 'bg-white/15 border border-[#FFF8F0]/40 text-[#FFF8F0]/90 hover:border-[#FFD166] hover:scale-110'
                      }`}
                    >
                      {isConnected ? (
                        <Star className="w-3.5 h-3.5 fill-[#0b0816]" />
                      ) : (
                        <span>{pt.order}</span>
                      )}
                    </div>

                    {isNextTarget && (
                      <span className="absolute -top-6 px-2 py-0.5 rounded-full bg-[#FFD166] text-[#0b0816] text-[10px] font-bold uppercase tracking-wider shadow-md pointer-events-none whitespace-nowrap animate-pulse">
                        Tap Here
                      </span>
                    )}
                  </button>
                </div>
              );
            })}

            {/* Meaning subtitle when shape is complete */}
            {isShapeComplete && (
              <div className="absolute bottom-2 left-0 right-0 text-center animate-fade-in z-30 px-3 py-1.5 rounded-2xl glass-panel border border-[#FFD166]/40 glow-gold">
                <p className="font-serif-dreamy italic text-xs sm:text-sm text-[#FFD166]">
                  &ldquo;{currentShape.meaning}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Control Buttons (Clean, Not Double-Texted) */}
      <div className="z-20 flex flex-col sm:flex-row items-center gap-3 mt-6">
        {!isGrandFinaleReady ? (
          <>
            {!isShapeComplete ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAutoConnect}
                  disabled={isAutoConnecting}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD166]/30 via-[#FFC8DD]/30 to-[#CDB4FF]/30 border border-[#FFD166]/60 text-xs sm:text-sm font-medium text-[#FFF8F0] hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,209,102,0.4)] flex items-center gap-2 cursor-pointer"
                >
                  <Wand2 className="w-4 h-4 text-[#FFD166]" />
                  <span>Auto Connect ✨</span>
                </button>

                <button
                  onClick={handleResetShape}
                  className="p-2.5 rounded-full glass-panel border border-white/20 text-[#FFF8F0]/70 hover:text-white hover:border-[#FFD166] transition-colors cursor-pointer"
                  title="Reset Constellation"
                  aria-label="Reset Constellation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleNextShape}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-[#CDB4FF]/40 via-[#FFC8DD]/40 to-[#FFD166]/50 border border-[#FFD166] text-[#FFF8F0] font-display-elegant text-base tracking-wider hover:scale-105 transition-all glow-gold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>
                  {currentShapeIdx < SHAPES.length - 1
                    ? 'Next Constellation'
                    : 'Reveal Birthday Message ✨'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#FFD166]" />
              </button>
            )}
          </>
        ) : (
          <button
            id="constellation-continue-btn"
            onClick={() => {
              audioManager.playSparkle();
              onContinue();
            }}
            className="relative group px-8 py-3.5 rounded-full bg-gradient-to-r from-[#CDB4FF]/35 via-[#FFC8DD]/35 to-[#FFD166]/35 border border-[#FFD166] text-[#FFF8F0] font-display-elegant text-base tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,209,102,0.5)] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>Next: Book of Beautiful Things</span>
              <ArrowRight className="w-4 h-4 text-[#FFD166] group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
