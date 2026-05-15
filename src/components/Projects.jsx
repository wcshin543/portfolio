import { FadeIn, SectionTitle } from './Section';
import { projects } from '../data/portfolio';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle pre="Key" highlight="Projects" />
        <FadeIn><p className={styles.desc}>㈜아도스트 재직 중 수행한 주요 프로젝트입니다.</p></FadeIn>
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <FadeIn key={i} delay={(i % 3) * 0.06}>
              <div className={styles.card}>
                <span className={`${styles.tag} ${styles[p.tag]}`}>{p.tagLabel}</span>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.period}>{p.period}</p>
                <ul className={styles.items}>
                  {p.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
                <div className={styles.chips}>
                  {p.chips.map((ch, j) => <span key={j}>{ch}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
