import { FadeIn, SectionTitle } from './Section';
import { careers } from '../data/portfolio';
import styles from './Career.module.css';

export default function Career() {
  return (
    <section id="career" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle pre="Career" highlight="Timeline" />
        <div className={styles.timeline}>
          {careers.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className={styles.item}>
                <div className={`${styles.dot} ${c.isCurrent ? styles.dotActive : ''}`} />
                <div className={styles.card}>
                  <div className={styles.header}>
                    <div>
                      <h3 className={styles.company}>{c.company}</h3>
                      <span className={styles.role}>{c.role}</span>
                    </div>
                    <span className={`${styles.period} ${c.isCurrent ? styles.periodActive : ''}`}>
                      {c.period}
                    </span>
                  </div>
                  <ul className={styles.tasks}>
                    {c.tasks.map((t, j) => <li key={j}>{t}</li>)}
                  </ul>
                  {c.badge && <div className={styles.badge}>{c.badge}</div>}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
