import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const links = [
  { href: '#about', label: '소개' },
  { href: '#career', label: '경력' },
  { href: '#projects', label: '프로젝트' },
  { href: '#skills', label: '기술' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = document.querySelectorAll('section[id]');
      let cur = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>WC<span>.</span></a>
        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className={active === l.href.slice(1) ? styles.activeLink : ''}>
                {l.label}
              </a>
            </li>
          ))}
          <li><a href="#contact" className={styles.cta}>연락하기</a></li>
        </ul>
        <button className={`${styles.ham} ${open ? styles.hamOpen : ''}`}
          onClick={() => setOpen(o => !o)} aria-label="메뉴">
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className={styles.mobile}>
          {links.map(l => (
            <a key={l.href} href={l.href} className={styles.mobileLink} onClick={close}>{l.label}</a>
          ))}
          <a href="#contact" className={styles.mobileLink} onClick={close}>연락하기</a>
        </div>
      )}
    </nav>
  );
}
