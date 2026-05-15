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
    if (!deleting && charIdx > current.length) { delay = 2200; setDeleting(true); }
    else if (deleting && charIdx < 0) { setDeleting(false); setCharIdx(0); setIdx(i => (i + 1) % texts.length); return; }
    const t = setTimeout(() => { setDisplay(current.substring(0, charIdx)); setCharIdx(c => deleting ? c - 1 : c + 1); }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, texts]);

  return display;
}

function useCounter(target, start) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const dur = 1600, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick); else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [start, target]);
  return val;
}

function StatNum({ target, started }) {
  const val = useCounter(target, started);
  return <>{val}</>;
}

const badges = [
  { icon: '🏅', text: 'Thales Certified Professional' },
  { icon: '🔐', text: 'Luna HSM 전문가' },
  { icon: '🏢', text: '㈜아도스트 재직중' },
];

export default function Hero() {
  const canvasRef = useRef(null);
  const typed = useTypewriter(profile.typewriterTexts);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);
  const [imgError, setImgError] = useState(false);

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

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    const init = () => {
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.3 + 0.3, a: Math.random() * 0.4 + 0.08,
      }));
    };

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const gs = 52;
      ctx.fillStyle = 'rgba(0,212,255,0.03)';
      for (let x = 0; x < w; x += gs) for (let y = 0; y < h; y += gs) { ctx.beginPath(); ctx.arc(x, y, 0.7, 0, Math.PI * 2); ctx.fill(); }
      particles.forEach(p => {
        p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.a})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++)
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(0,212,255,${0.05 * (1 - d / 100)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
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

      <div className={styles.inner}>
        {/* ── LEFT ── */}
        <div className={styles.left}>
          <motion.div className={styles.tagline}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className={styles.taglineLine} />
            HSM 보안 인프라 전문가
            <span className={styles.taglineLine} />
          </motion.div>

          <motion.h1 className={styles.name}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            신완철
          </motion.h1>

          <motion.div className={styles.roleWrap}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className={styles.bracket}>[ </span>
            <span className={styles.typed}>{typed}</span>
            <span className={styles.cursor}>|</span>
            <span className={styles.bracket}> ]</span>
          </motion.div>

          <motion.p className={styles.desc}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
            금융·공공·방산 분야 보안 인프라를 현장에서 직접 지킵니다.<br />
            농협은행·우리은행·한국조폐공사·SKT 등 다양한 기관에서<br />
            HSM 구축부터 DR 훈련·인증심사까지 <strong>전주기를 책임</strong>집니다.
          </motion.p>

          <motion.div className={styles.badgeRow}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            {badges.map((b, i) => (
              <span key={i} className={styles.badge}>{b.icon} {b.text}</span>
            ))}
          </motion.div>

          <motion.div className={styles.btns}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}>
            <a href="#projects" className={styles.btnPrimary}>프로젝트 보기</a>
            <a href="#contact" className={styles.btnOutline}>연락하기</a>
          </motion.div>

          <motion.div ref={statsRef} className={styles.stats}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            {profile.stats.map((s, i) => (
              <div key={i} className={styles.statItem}>
                {i > 0 && <div className={styles.statDiv} />}
                <div className={styles.stat}>
                  <span className={styles.statNum}>
                    <StatNum target={s.value} started={statsStarted} />
                    <span className={styles.statPlus}>+</span>
                  </span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — 프로필 사진 ── */}
        <motion.div className={styles.right}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <div className={styles.photoWrap}>
            <div className={styles.photoGlow} />
            <div className={styles.photoRing} />
            {!imgError ? (
              <img
                src="/profile.jpg"
                alt="신완철 프로필"
                className={styles.photo}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className={styles.photoPlaceholder}>
                <svg viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="38" r="22" stroke="#00d4ff" strokeWidth="1.5"/>
                  <path d="M12 92c0-21 16.7-38 38-38s38 17 38 38" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            )}
            <div className={styles.certBadge}>
              <span className={styles.certIcon}>🏅</span>
              <div>
                <div className={styles.certTitle}>Thales Certified</div>
                <div className={styles.certSub}>Luna HSM 7 Professional</div>
              </div>
            </div>
            <div className={styles.activeDot}>
              <span className={styles.activePulse} />
              재직중
            </div>
          </div>
        </motion.div>
      </div>

      <a href="#about" className={styles.scrollHint}>
        <span>scroll</span>
        <div className={styles.arrow} />
      </a>
    </section>
  );
}
