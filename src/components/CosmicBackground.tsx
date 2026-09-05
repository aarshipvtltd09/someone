import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
  vx: number;
  vy: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

interface CursorDust {
  x: number;
  y: number;
  alpha: number;
  size: number;
  color: string;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorTrailRef = useRef<CursorDust[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    const colors = ['#FFF8F0', '#CDB4FF', '#FFC8DD', '#FFD166', '#A0C4FF'];
    let stars: Particle[] = [];

    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 4500);
      for (let i = 0; i < count; i++) {
        const baseRadius = Math.random() * 1.5 + 0.5;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: baseRadius,
          baseRadius,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
        });
      }
    };

    initStars();

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 50,
          speed: Math.random() * 6 + 4,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 1,
          active: true,
        });
      }
    };

    const shootingInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        spawnShootingStar();
      }
    }, 3500);

    // Mouse stardust listener
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorTrailRef.current.length < 25) {
        cursorTrailRef.current.push({
          x: e.clientX,
          y: e.clientY,
          alpha: 0.8,
          size: Math.random() * 3 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep galactic backdrop
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        width * 0.1,
        width * 0.5,
        height * 0.5,
        width * 0.9
      );
      bgGrad.addColorStop(0, '#1a102f');
      bgGrad.addColorStop(0.4, '#120b22');
      bgGrad.addColorStop(0.8, '#0b0816');
      bgGrad.addColorStop(1, '#06040d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Soft nebula glow spots
      const nebula1 = ctx.createRadialGradient(width * 0.25, height * 0.3, 10, width * 0.25, height * 0.3, 380);
      nebula1.addColorStop(0, 'rgba(205, 180, 255, 0.09)');
      nebula1.addColorStop(1, 'rgba(205, 180, 255, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(width * 0.75, height * 0.65, 10, width * 0.75, height * 0.65, 420);
      nebula2.addColorStop(0, 'rgba(255, 200, 221, 0.08)');
      nebula2.addColorStop(1, 'rgba(255, 200, 221, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      const nebula3 = ctx.createRadialGradient(width * 0.5, height * 0.85, 20, width * 0.5, height * 0.85, 450);
      nebula3.addColorStop(0, 'rgba(255, 209, 102, 0.06)');
      nebula3.addColorStop(1, 'rgba(255, 209, 102, 0)');
      ctx.fillStyle = nebula3;
      ctx.fillRect(0, 0, width, height);

      // Render & update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.radius * 4;
        ctx.shadowColor = star.color;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        if (!s.active) continue;

        ctx.save();
        ctx.strokeStyle = `rgba(255, 248, 240, ${s.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#FFD166';

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, 'rgba(255, 200, 221, 0)');
        grad.addColorStop(1, `rgba(255, 248, 240, ${s.alpha})`);
        ctx.strokeStyle = grad;

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.015;

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      // Render mouse stardust trail
      const trail = cursorTrailRef.current;
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.alpha -= 0.025;
        p.size = Math.max(0.2, p.size - 0.05);

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0) {
          trail.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(shootingInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      id="cosmic-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
