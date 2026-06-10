
import React, { useEffect, useRef } from 'react';

/**
 * Interactive dot-matrix background.
 * Faint dots rest across the page; dots near the cursor smoothly scale up and
 * tint toward the accent color, creating a soft spotlight that follows the mouse.
 * Theme-aware: neutral slate on light, soft white on dark.
 * Respects prefers-reduced-motion (renders a static grid, no animation/spotlight).
 */
const GridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SPACING = 38;     // distance between dots
    const INFLUENCE = 160;  // cursor effect radius
    const EASE = 0.1;       // spotlight follow smoothing
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // target + eased cursor position (start off-screen)
    const target = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999 };
    let hasMouse = false;

    let isDark = document.documentElement.classList.contains('dark');
    let animationFrameId = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const draw = () => {
      smooth.x += (target.x - smooth.x) * EASE;
      smooth.y += (target.y - smooth.y) * EASE;

      ctx.clearRect(0, 0, width, height);

      const base = isDark ? [255, 255, 255] : [15, 23, 42];
      const accent = isDark ? [96, 165, 250] : [37, 99, 235];
      const baseAlpha = isDark ? 0.12 : 0.10;
      const inflSq = INFLUENCE * INFLUENCE;

      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          let r = 1.1;
          let alpha = baseAlpha;
          let cr = base[0];
          let cg = base[1];
          let cb = base[2];

          if (!reduce && hasMouse) {
            const dx = x - smooth.x;
            const dy = y - smooth.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < inflSq) {
              const t = 1 - Math.sqrt(distSq) / INFLUENCE; // 0..1, strongest at cursor
              const e = t * t; // ease for a tighter glow
              r = 1.1 + e * 2.4;
              alpha = baseAlpha + e * 0.55;
              cr = Math.round(base[0] + (accent[0] - base[0]) * e);
              cg = Math.round(base[1] + (accent[1] - base[1]) * e);
              cb = Math.round(base[2] + (accent[2] - base[2]) * e);
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
          ctx.fill();
        }
      }

      if (!reduce) animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      hasMouse = true;
    };
    const handleMouseLeave = () => { hasMouse = false; };

    const onResize = () => {
      resize();
      if (reduce) draw(); // static mode needs an explicit redraw
    };

    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
      if (reduce) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('resize', onResize);
    if (!reduce) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      themeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="grid-bg"
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default GridBackground;
