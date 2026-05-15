import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import styles from './Hero.module.css';

function useTypewriter(texts) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let delay = deleting ? 40 : 80;
    if (!deleting && charIdx > current.length) {
      delay = 2200; setDeleting(true);
    } else if (deleting && charIdx < 0) {
      setDeleting(false); setCharIdx(0);
      setIdx(i => (i + 1) % texts.length);
      return;
    }
    const t = setTimeout(() => {
      setDisplay(current.substring(0, charIdx));
      setCharIdx(c => deleting ? c - 1 : c + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, texts]);

  return display;
}

function useCounter(target, start) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const dur = 1600;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [start, target]);
  return val;
}

function StatNum({ target, started }) {
  const val = useCounter(target, started);
  return <span className={styles.statNum}>{val}</span>;
}

export default function Hero() {
  const canvasRef = useRef(null);
  const typed = useTypewriter(profile.typewriterTexts);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsStarted(true); }, { threshold: 0.5 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, particles;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.45 + 0.08,
      }));
    };

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const gs = 48;
      ctx.fillStyle = 'rgba(0,212,255,0.035)';
      for (let x = 0; x < w; x += gs)
        for (let y = 0; y < h; y += gs) {
          ctx.beginPath(); ctx.arc(x, y, 0.7, 0, Math.PI * 2); ctx.fill();
        }
      particles.forEach(p => {
        p.x = (p.x + p.vx + w) % w;
        p.y = (p.y + p.vy + h) % h;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.a})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++)
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.055 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      animId = requestAnimationFrame(draw);
    };

    resize(); init(); draw();
    const onResize = () => { cancelAnimationFrame(animId); resize(); init(); draw(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.content}>
        <motion.p className={styles.greeting}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          안녕하세요, 저는
        </motion.p>
        <motion.h1 className={styles.name}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          {profile.name}
        </motion.h1>
        <motion.div className={styles.titleWrap}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <span className={styles.bracket}>[ </span>
          <span className={styles.typed}>{typed}</span>
          <span className={styles.cursor}>|</span>
          <span className={styles.bracket}> ]</span>
        </motion.div>
        <motion.p className={styles.sub}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          Thales Luna HSM 전문 기술지원 엔지니어 · 금융·공공·방산 분야 보안 인프라 구축
        </motion.p>
        <motion.div className={styles.btns}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
          <a href="#projects" className="btn-primary">프로젝트 보기</a>
          <a href="#contact" className="btn-outline">연락하기</a>
        </motion.div>
        <motion.div ref={statsRef} className={styles.stats}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          {profile.stats.map((s, i) => (
            <div key={i} className={styles.statGroup}>
              {i > 0 && <div className={styles.divider} />}
              <div className={styles.stat}>
                <StatNum target={s.value} started={statsStarted} />
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <a href="#about" className={styles.scrollHint}>
        <span>scroll</span>
        <div className={styles.arrow} />
      </a>
    </section>
  );
}
