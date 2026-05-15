import { FadeIn, SectionTitle } from './Section';
import { skillGroups, certs } from '../data/portfolio';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle pre="Tech" highlight="Skills" />
        <div className={styles.groups}>
          {skillGroups.map((g, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className={styles.group}>
                <h3 className={styles.groupTitle}><span>{g.icon}</span>{g.title}</h3>
                <div className={styles.tags}>
                  {g.primary?.map((t, j) => (
                    <span key={j} className={`${styles.tag} ${styles.primary}`}>{t}</span>
                  ))}
                  {g.normal?.map((t, j) => (
                    <span key={j} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <h3 className={styles.subTitle}>자격증 & 교육</h3>
          <div className={styles.certGrid}>
            {certs.map((c, i) => (
              <div key={i} className={styles.certCard}>
                <span className={styles.certIcon}>{c.icon}</span>
                <div>
                  <h4 className={styles.certTitle}>{c.title}</h4>
                  <p className={styles.certIssuer}>{c.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
