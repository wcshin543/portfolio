import { useState } from 'react';
import { FadeIn, SectionTitle } from './Section';
import styles from './About.module.css';

const competencies = [
  { icon: '🔐', title: 'HSM 전주기 기술지원', desc: '신규 구축·서버 연동·HA 설정·키 백업·이관·DR 훈련·인증심사 대응' },
  { icon: '🔄', title: 'PSE 마이그레이션', desc: 'PSE2 → PSE3 전환 · 키 마이그레이션 · 네트워크 설정 · 연동 테스트' },
  { icon: '⚡', title: '장애 대응 & 유지보수', desc: '장비 교체·서버 재연동·파티션 재구성·정기 현장 점검 및 F/W 업데이트' },
  { icon: '☁️', title: '클라우드 & 개발', desc: 'Linux · Docker · Kubernetes · Java · Spring Boot · React · Naver Cloud' },
];

export default function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <SectionTitle pre="About" highlight="Me" />
        <div className={styles.grid}>
          <FadeIn>
            <div className={styles.photoFrame}>
              <div className={styles.photo}>
                {!imgError ? (
                  <img src="/profile.jpg" alt="신완철" onError={() => setImgError(true)} />
                ) : (
                  <svg viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="38" r="20" stroke="#00d4ff" strokeWidth="2"/>
                    <path d="M15 90c0-19.33 15.67-35 35-35s35 15.67 35 35" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
              <div className={styles.badge}>
                <span>Thales Certified</span>
                <span>HSM Professional</span>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className={styles.h3}>
              HSM 보안 인프라의 <span style={{ color: 'var(--cyan)' }}>전주기를 담당</span>합니다
            </h3>
            <p className={styles.p}>
              2024년 11월 ㈜아도스트 보안기술팀에 합류하여, Thales Luna HSM 및 PSE 장비의
              신규 구축·운영·장애 대응·DR 훈련까지 전주기 기술지원을 수행하고 있습니다.
              입사 7개월 만에 <strong style={{ color: 'var(--cyan)' }}>Thales Luna HSM 7 Professional Certification</strong>을 취득하였으며,
              농협은행·우리은행·한국조폐공사·SKT·군인공제회·경기버스 등
              금융·공공·방산·교통 분야의 다양한 프로젝트를 수행하였습니다.
            </p>
            <p className={styles.p}>
              보안 분야 이전에는 FedEx Korea를 포함한 물류 포워딩 업계에서 약 5년간
              수출입 서류 관리·고객 대응·화물 트래킹을 담당하며
              빠른 상황 판단력과 체계적인 문서화 역량을 쌓았습니다.
            </p>
            <div className={styles.info}>
              <div className={styles.infoItem}><span>📍</span><span>서울시 강서구</span></div>
              <div className={styles.infoItem}><span>🏢</span><span>㈜아도스트 보안기술팀</span></div>
              <div className={styles.infoItem}><span>📧</span><a href="mailto:tlsdhsk543@naver.com">tlsdhsk543@naver.com</a></div>
              <div className={styles.infoItem}><span>🔗</span><a href="https://github.com/wcshin543" target="_blank" rel="noopener">github.com/wcshin543</a></div>
              <div className={styles.infoItem}><span>💼</span><a href="https://www.linkedin.com/in/%EC%99%84%EC%B2%A0-%EC%8B%A0-1673443a7/" target="_blank" rel="noopener">LinkedIn 프로필</a></div>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.15}>
          <h3 className={styles.subTitle}>핵심 역량</h3>
          <div className={styles.compGrid}>
            {competencies.map((c, i) => (
              <div key={i} className={styles.compCard}>
                <div className={styles.compIcon}>{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
