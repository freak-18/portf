import React, { useEffect, useRef } from 'react';

const SpiderWeb = ({ dark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const WEB_COLOR  = dark ? 'rgba(255,255,255,' : 'rgba(0,0,0,';
    const GLOW       = dark ? '#ffffff' : '#000000';

    // ── Floating spiders ──
    const spiders = Array.from({ length: 10 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      size: Math.random() * 16 + 12,
      opacity: Math.random() * 0.35 + 0.15,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.012,
      scale: 1,
      spawning: false,
      trail: [],
    }));

    // ── Web structures (on click) ──
    const webs = [];

    // ── Draw a real spider web at a point ──
    const drawWeb = (web) => {
      const { x, y, size, opacity, progress } = web;
      const SPOKES = 12;
      const RINGS = 5;
      const currentSize = size * progress;

      ctx.save();
      ctx.globalAlpha = opacity;

      // radial spokes
      for (let s = 0; s < SPOKES; s++) {
        const angle = (s / SPOKES) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * currentSize, y + Math.sin(angle) * currentSize);
        ctx.strokeStyle = WEB_COLOR + '0.6)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // straight ring segments connecting spokes
      for (let r = 1; r <= RINGS; r++) {
        const radius = (currentSize / RINGS) * r;
        const ringOpacity = 0.5 - r * 0.05;

        for (let s = 0; s < SPOKES; s++) {
          const a1 = (s / SPOKES) * Math.PI * 2;
          const a2 = ((s + 1) / SPOKES) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(x + Math.cos(a1) * radius, y + Math.sin(a1) * radius);
          ctx.lineTo(x + Math.cos(a2) * radius, y + Math.sin(a2) * radius);
          ctx.strokeStyle = WEB_COLOR + ringOpacity + ')';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        // zigzag between rings
        if (r > 1) {
          const prevRadius = (currentSize / RINGS) * (r - 1);
          for (let s = 0; s < SPOKES; s++) {
            const a1 = (s / SPOKES) * Math.PI * 2;
            const a2 = ((s + 0.5) / SPOKES) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(a1) * prevRadius, y + Math.sin(a1) * prevRadius);
            ctx.lineTo(x + Math.cos(a2) * radius, y + Math.sin(a2) * radius);
            ctx.strokeStyle = WEB_COLOR + (ringOpacity * 0.5) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    };

    // ── Spawn web + spider on click ──
    const handleClick = (e) => {
      const size = 80 + Math.random() * 80;
      webs.push({
        x: e.clientX,
        y: e.clientY,
        size,
        opacity: 0.7,
        progress: 0,
        growing: true,
        fade: false,
      });

      spiders.push({
        x: e.clientX, y: e.clientY,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 16 + 12,
        opacity: 0, rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        scale: 0, spawning: true,
        trail: [],
      });
    };

    window.addEventListener('click', handleClick);

    // ── Main loop ──
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // update & draw webs
      for (let i = webs.length - 1; i >= 0; i--) {
        const w = webs[i];
        if (w.growing) {
          w.progress += 0.04;
          if (w.progress >= 1) { w.progress = 1; w.growing = false; }
        } else if (!w.fade) {
          // hold for a moment then fade
          w.holdTimer = (w.holdTimer || 0) + 1;
          if (w.holdTimer > 90) w.fade = true;
        } else {
          w.opacity -= 0.008;
          if (w.opacity <= 0) { webs.splice(i, 1); continue; }
        }
        drawWeb(w);
      }

      // update & draw spiders
      for (let i = spiders.length - 1; i >= 0; i--) {
        const s = spiders[i];

        if (s.spawning) {
          s.scale += 0.06;
          s.opacity += 0.02;
          if (s.scale >= 1) { s.scale = 1; s.spawning = false; }
        }

        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;

        if (s.x < -50) s.x = canvas.width + 50;
        if (s.x > canvas.width + 50) s.x = -50;
        if (s.y < -50) s.y = canvas.height + 50;
        if (s.y > canvas.height + 50) s.y = -50;

        // silk trail
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 18) s.trail.shift();

        if (s.trail.length > 1) {
          for (let t = 1; t < s.trail.length; t++) {
            const tOpacity = (t / s.trail.length) * 0.12 * s.opacity * 3;
            ctx.beginPath();
            ctx.moveTo(s.trail[t - 1].x, s.trail[t - 1].y);
            ctx.lineTo(s.trail[t].x, s.trail[t].y);
            ctx.strokeStyle = WEB_COLOR + tOpacity + ')';
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.scale(s.scale, s.scale);
        ctx.globalAlpha = s.opacity;
        if (dark) ctx.filter = `brightness(1.4) drop-shadow(0 0 6px ${GLOW})`;
        ctx.font = `${s.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('\uD83D\uDD77', 0, 0);
        ctx.filter = 'none';
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default SpiderWeb;
