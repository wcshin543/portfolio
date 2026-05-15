export const profile = {
  name: '신완철',
  nameEn: 'Shin Wancheol',
  title: 'HSM 기술지원 / IT 보안 엔지니어',
  company: '㈜아도스트 보안기술팀',
  email: 'tlsdhsk543@naver.com',
  phone: '010-6269-1896',
  github: 'wcshin543',
  location: '서울시 강서구',
  summary: 'Thales Luna HSM 및 PSE 장비 전문 기술지원 엔지니어. 금융·공공·방산·교통 분야 고객사에서 HSM 신규 구축·운영·DR·장애 대응·PSE2→PSE3 마이그레이션까지 전주기 기술지원 수행.',
  stats: [
    { value: 14, label: '프로젝트' },
    { value: 5, label: '년+ 경력' },
    { value: 10, label: '고객사' },
  ],
  typewriterTexts: [
    'HSM 기술지원 엔지니어',
    'IT 보안 인프라 전문가',
    'Thales Luna HSM Professional',
    'PSE 마이그레이션 전문가',
    'DR 훈련 / 인증심사 지원',
  ],
};

export const careers = [
  {
    company: '㈜아도스트',
    role: '보안사업본부 보안기술팀 · 사원',
    period: '2024.11 ~ 재직중',
    isCurrent: true,
    tasks: [
      'Thales Luna HSM (Network/PCIe) 및 PSE 장비 신규 설치·초기 구축 기술지원',
      '장비 서버 연동, HA 설정, Remote PED 설정, 키 생성·백업·이관',
      'PSE2 → PSE3 마이그레이션 수행 (군인공제회 삼각지·대전)',
      'DR 훈련 지원, Webtrust 인증심사 증적 대응',
      'F/W·S/W 업데이트, LunaClient 버전 관리, 정기 유지보수',
    ],
    badge: '🏅 Thales Luna HSM 7 Professional Certification (2025.06)',
  },
  {
    company: '㈜아이로지스코리아',
    role: '항공·해상 화물 포워딩 영업',
    period: '2023.10 ~ 2024.01 · 4개월',
    tasks: [
      '항공·해상 화물 포워딩 영업 및 신규 고객 발굴',
      '고객사 화물 운송 상담, 견적 제공, 진행 현황 모니터링',
    ],
  },
  {
    company: '㈜에이에스엠케이',
    role: '항공·해상 화물 포워딩 영업',
    period: '2023.03 ~ 2023.09 · 7개월',
    tasks: [
      '수출입 서류 관리 – B/L, 상업송장, 패킹리스트, C/O 작성·관리',
      '선사·항공사·관세사 파트너사 커뮤니케이션',
    ],
  },
  {
    company: '㈜스카이매스터',
    role: '항공·해상 화물 포워딩 영업',
    period: '2021.12 ~ 2023.02 · 1년 3개월',
    tasks: [
      '신규 어카운트 발굴 및 수출입 서류 관리',
      '고객사 화물 진행 현황 모니터링 및 내부 행정 처리',
    ],
  },
  {
    company: '페더럴익스프레스코리아 (FedEx Korea)',
    role: '고객서비스팀 · 직접고용 전환',
    period: '2019.01 ~ 2021.06 · 약 2년 6개월',
    tasks: [
      '삼성전자·SK하이닉스·한화에어로스페이스 등 대기업 반도체 항공 수입 핸들링',
      '화물 트래킹, 빌링 업무, 분실·파손 컴플레인 처리',
      '㈜맨파워그룹코리아 파견(2019.01) → FedEx Korea 직접고용 전환(2020.01)',
    ],
  },
];

export const projects = [
  {
    tag: 'finance', tagLabel: '금융',
    title: '농협은행 [모바일신분증] HSM 구축',
    period: '2024.12 ~ 2025.11 · 의왕·안성',
    items: [
      '민간 시스템 신규 구축 · 장비 이니셜라이즈 · 서버 연동',
      '운영 장비 키 백업 및 DR 센터 키 이관 (Remote PED 활용)',
      '운영 신규 파티션·키 생성 및 DR 이관 지원',
      'ARL 갱신 작업 지원 (2025.07)',
    ],
    chips: ['Luna HSM', 'Remote PED', 'DR 이관'],
  },
  {
    tag: 'finance', tagLabel: '금융',
    title: '농협은행 [클라우드 인증서 시스템] 구축',
    period: '2025.10 ~ 진행중',
    items: [
      '운영·DR 장비 신규 설치 및 네트워크·토큰 설정',
      'F/W·S/W 업데이트 및 서버 연동 구성',
    ],
    chips: ['Luna HSM', '클라우드 인증', 'HA 구성'],
  },
  {
    tag: 'finance', tagLabel: '금융',
    title: '우리은행 [전자서명] Webtrust 인증심사',
    period: '2025.04 / 2025.07 / 2025.08',
    items: [
      '개발 CERT 장비 키 재생성 지원',
      'Webtrust 운영/개발 현장 실사 – HSM 안내, Audit 로그 증적',
      'CA 재해복구 훈련 지원 및 감사로그 전달',
    ],
    chips: ['Webtrust', 'CA DR', 'Audit 로그'],
  },
  {
    tag: 'public', tagLabel: '공공',
    title: '한국조폐공사 [전자여권·모바일신분증·모바일장애인증]',
    period: '2025.05 ~ 2025.12',
    items: [
      'DR 훈련 모의 테스트 지원 (HSM log, 메모리 사용량 증적)',
      '서버 복구 – LunaClient 재설치, 장비 연동, HA 설정 완료',
      '모바일 장애인증 서비스 오픈 성능테스트 지원',
    ],
    chips: ['DR 훈련', 'HA', 'LunaClient'],
  },
  {
    tag: 'defense', tagLabel: '방산',
    title: '군인공제회 PSE2 → PSE3 마이그레이션',
    period: '2025.09 ~ 2025.10 · 삼각지·대전',
    items: [
      'PSE2 기존 장비 키 백업 및 PSE3 신규 장비 설치',
      '키 마이그레이션, 네트워크 설정 및 연동 테스트',
    ],
    chips: ['PSE2→PSE3', '키 마이그레이션'],
  },
  {
    tag: 'public', tagLabel: '통신',
    title: 'SKT DR [전자서명 인증심사]',
    period: '2025.09 · 대전',
    items: [
      '인증심사 증적자료 제출',
      'OCSP 2번 서버 장비 연동',
    ],
    chips: ['인증심사', 'OCSP'],
  },
  {
    tag: 'finance', tagLabel: '금융',
    title: '롯데카드 DR 장비 전환',
    period: '2025.10 · 대전',
    items: ['DR 장비 Standby → Active 전환 작업'],
    chips: ['PSE DR', 'Failover'],
  },
  {
    tag: 'transport', tagLabel: '교통',
    title: '경기버스 HSM 장비 기술지원',
    period: '2025년',
    items: ['HSM 장비 신규 구축 및 운영 기술지원'],
    chips: ['Luna HSM', '신규 구축'],
  },
  {
    tag: 'overseas', tagLabel: '해외',
    title: '유비벨록스 필리핀 PSE3 해외 현장 설치',
    period: '2025.12',
    items: ['PSE3 장비 설치 확인, 서버 연동 설정 및 키 생성 테스트'],
    chips: ['PSE3', '해외 현장'],
  },
  {
    tag: 'public', tagLabel: '공공',
    title: '모바일 장애인증 서비스 신규 구축',
    period: '2025.06 ~ 2025.08',
    items: ['신규 구축 기술지원 및 성능테스트 지원'],
    chips: ['Luna HSM', '성능테스트'],
  },
];

export const skillGroups = [
  {
    icon: '🔐', title: '보안 장비',
    primary: ['Thales Luna HSM 7', 'Luna Network HSM', 'Luna PCIe HSM', 'PSE2 / PSE3', 'PayShield 10K'],
    normal: ['Remote PED', 'HA 구성', '키 백업·이관', 'PSE 마이그레이션'],
  },
  {
    icon: '🛡️', title: '보안 운영',
    normal: ['DR 훈련 지원', 'Webtrust 인증심사', '감사로그 관리', '장애 대응', '정기 유지보수', 'LunaClient', 'Splunk 연동'],
  },
  {
    icon: '🐧', title: 'OS / 인프라',
    normal: ['Linux (Ubuntu)', 'Rocky Linux', 'Docker', 'Kubernetes', '네트워크 구성', 'Naver Cloud Platform'],
  },
  {
    icon: '💻', title: '개발',
    normal: ['Java', 'Spring Boot', 'JavaScript', 'React', 'HTML / CSS'],
  },
];

export const certs = [
  { icon: '🏅', title: 'Thales Luna HSM 7 Professional Certification', issuer: 'Thales Group · 2025.06.12' },
  { icon: '☁️', title: '네이버클라우드 웹 데브옵스 개발자 과정 수료', issuer: '네이버클라우드 · 2024.03 ~ 2024.09' },
];
