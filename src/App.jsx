import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Career from './components/Career';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px 0',
      textAlign: 'center',
      background: 'var(--bg-alt)',
    }}>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        © 2026 신완철 · HSM 기술지원 / IT 보안 엔지니어
      </p>
      <p style={{ color: 'var(--cyan)', fontSize: '0.75rem', marginTop: 6, fontFamily: 'var(--mono)', opacity: 0.45 }}>
        Built with React · Deployed on Netlify
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Career />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
