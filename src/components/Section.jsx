import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function useFadeIn() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

export function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, vis] = useFadeIn();
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

export function SectionTitle({ pre, highlight }) {
  return (
    <FadeIn>
      <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 700, marginBottom: 48, letterSpacing: '-0.5px' }}>
        {pre} <span style={{ color: 'var(--cyan)' }}>{highlight}</span>
      </h2>
    </FadeIn>
  );
}
