import { NewsItem, NoticeItem, Course, CampusSpot } from './types.ts';

export const UNIVERSITY_LOGO = "https://lh3.googleusercontent.com/aida/ADBb0uiB9nA7hESf8ISRMInkkxwD3WRbx8GwM1-l1FxIe44ZEvZU2Njv-cRPnJHQyNC4St24ouOotdYmp9Onga5OUGvxKe-xKxdT7CbnEW9l5-AbQKWMw2Q8Mqflrutio__FQ32hMFeJt3cZds8laK0JXieLc4crFp4QAjy3jNcti8CTtE30yQGB-m0plO_cialmsRDtWoecYoS_6nEmivis9u1EsuvOq5f1tb6tk0reXFUqHGBEnQdHKO8JZQ";

export const UNIVERSITY_HERO_BG = "https://lh3.googleusercontent.com/aida/ADBb0ugzLRg8522Z1SBEKI3tvVpIcgp-VYOXOU0S57u-KEZDOvRETsdIxG9qTrNCfA2kI-pOAufUzwz6BKjRfZOyYEzgHaIspO7eJajZ-UBuQbdzIHZ5v-nM6uksJKqJxb3pQjNDZLxnFi8mhY4OZIbxkg4pAoxNhfWIZ9NcwNQ94bgYVSoo0dMKnmJuEeuivYYBOntWB1xAvzp831Ih3wm5hY2PqzMwfS0HlOxE5KfvX026QLtlrvfrL3MA";

export const newsDatabase: NewsItem[] = [
  {
    id: 'news-1',
    category: '대학뉴스',
    title: '청주대학교, 2024학년도 첨단분야 혁신융합대학사업 선정 쾌거',
    description: '바이오헬스 및 실감미디어 분야 혁신 인재 양성을 위한 연간 국비 약 50억 원을 지원받게 되었으며, 충북 지역 핵심 미래 인재 육성 거점대학으로 도약하게 되었습니다.',
    date: '2026.05.20',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
    views: 450
  },
  {
    id: 'news-2',
    category: '연구성과',
    title: 'AI 융합학부 연구팀, 세계적 권위 국제학술지(IEEE) 최우수 논문 게재',
    description: '학사과정 재학생 주저자로 참여한 인공지능 컴퓨터 비전 기반 불량 모니터링 기술 논문이 SCI 저널에 게재되면서 학부 연구 생태계의 가능성을 증명했습니다.',
    date: '2026.05.18',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
    views: 312
  },
  {
    id: 'news-3',
    category: '산학협력',
    title: '차세대 반도체 제조 기업 3사와 취업연계 학술협력 협약 체결',
    description: '충북 오창 테크노폴리스 소재 첨단 시스템 반도체 기업들과 현장 실습 및 매칭 인턴십 프로그램 운용 협약을 완료했습니다. 관련 교과를 이수하면 즉각 입사 검토가 제공됩니다.',
    date: '2026.05.15',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
    views: 284
  },
  {
    id: 'news-4',
    category: '대학뉴스',
    title: '실학성세 4.0 선포식 및 재학생 드림업 장학금 추가 수여 추진',
    description: '청주대학교 제79주년 개교기념식을 맞이하여 실학성세 가치를 계승하는 장학 복지 제도를 혁신하기로 하였습니다. 대상 재학생에게 장학 혜택이 확대됩니다.',
    date: '2026.05.12',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
    views: 520
  }
];

export const noticesDatabase: NoticeItem[] = [
  {
    id: 'notice-1',
    type: '중요',
    title: '[필독] 2026학년도 1학기 기말고사 시행 및 성적평가 일정 안내',
    writer: '학사지원팀',
    date: '2026.05.21',
    category: '학사안내',
    content: '교학처 학사지원팀에서 안내드립니다. 2026학년도 제1학기 기말고사는 전면 대면평가로 실시됩니다. 평가 방식은 과목별 특성에 따라 지필 또는 실기, 과제물 대체 등으로 다양하오니 담당교수님의 교과 안내 사항을 LMS를 통해 면밀히 확인 바랍니다. 성적 입정 기간(의의신청)은 6월 15일부터 6월 19일까지이며 기한 엄수해주십시오.',
    department: '교학처 학사지원팀'
  },
  {
    id: 'notice-2',
    type: '일반',
    title: '[모집] 2026학년도 하계방학 국가 우수학생 근로 장학생 추가 채용 공고',
    writer: '장학지원팀',
    date: '2026.05.19',
    category: '장학/취업',
    content: '장학지원팀에서 국가 및 교내 집중근로 방학 근로생을 모집합니다. 중위소득 기준 부합 학생 중 직전학기 평점 평균이 3.0 이상인 신정자를 대상으로, 실무 부처와 매칭 근로를 배정합니다. 근무 기간은 7월 1일부터 8월 24일까지이며 시간당 단가는 국가 장학 단가인 12,200원을 일괄 준용하여 지원합니다.',
    department: '학생처 장학지원팀'
  },
  {
    id: 'notice-3',
    type: '일반',
    title: '총장님과 주최하는 청우 톡콘서트 배심원 및 학생 패널단 신청 접수',
    writer: '학생처',
    date: '2026.05.17',
    category: '생생소식',
    content: '대학소생 활력 증진과 일방향 소통 타파를 위하여 총장님과 비빔밥 오찬을 나누는 캐주얼 토크콘서트가 중앙도서관 아뜨리움에서 개최됩니다. 학과 건의사항 및 복지 제보를 할 수 있는 자유 발언자 및 패널 신청을 메일 등으로 접수 받고 있으니, 학우님들의 많은 자발적 참여 바랍니다.',
    department: '학생처 학생지원팀'
  },
  {
    id: 'notice-4',
    type: '일반',
    title: '2026년 교내 청년 소셜벤처 연합 창업 아카데미 캠프 대상팀 선정결과 발표',
    writer: '취창업지원단',
    date: '2026.05.15',
    category: '장학/취업',
    content: '대학 혁신의 일환으로 지역 밀착형 창업 가치를 발굴하는 소셜벤처 연합 아카데미 캠프의 서면/대면 심사 최종 결과, 총 8개 팀을 최종 선정했습니다. 선정된 팀에게는 전문 액셀러레이터의 주차별 멘토링 프로그램과 시제품 제작 바우처 선지급 1,000만 원 등의 추가 크레딧이 전액 무상 연계 지원됩니다.',
    department: '산학협력단 취창업지원단'
  },
  {
    id: 'notice-5',
    type: '중요',
    title: '[방역/안전] 교내 다중이용시설 하계 정밀 방제 방역 및 소독 실시 학사안내',
    writer: '관리처 시설팀',
    date: '2026.05.10',
    category: '생생소식',
    content: '하계 무더위에 따른 교내 유해요소 소멸 소독 및 정밀 방제를 중앙도서관, 학생식당, 생활관, 공학관 순서로 순차적 일괄 시행합니다. 통제 당일에는 해당 건물의 엘리베이터 및 강의실 이용이 일부 시간 동안 부분 영구 중단되오니, 연구원 및 재직 중인 학우분들은 이용에 착오 없으시길 바랍니다.',
    department: '사무처 시설팀'
  },
  {
    id: 'notice-6',
    type: '일반',
    title: '동계 글로벌 인턴십 아시아권역 파견 대상자 어학성적 증빙 제출 추가 안내',
    writer: '국제교류팀',
    date: '2026.05.08',
    category: '학사안내',
    content: '글로벌 경쟁력 확립을 위한 해외 인턴 프로그램 모집과 관련하여 싱가포르 및 말레이시아 현지 중견 연구기업 파견 성적 조건을 완화 조정합니다. 기존 공인 토익 800점에서 730점 대 신규 지원이 가능하게 개방되었으니 어필 어학 자료를 포털을 통해 조속히 추가 제출해주시기 바랍니다.',
    department: '대외협력처 국제교류팀'
  }
];

export const campusSpots: CampusSpot[] = [
  {
    id: 'spot-1',
    name: '청주대학교 본관 (청석관)',
    category: '행정',
    description: '대학 총장실, 기획처, 교무처 등 행정본부가 위치한 학교의 상징적인 유서 깊은 건물입니다. 고풍스러운 양식의 석조 기둥 외관을 지니고 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=500&auto=format&fit=crop',
    location: '캠퍼스 중앙 서편 광장',
    tel: '043-229-8114'
  },
  {
    id: 'spot-2',
    name: '중앙도서관 (첨단 학습 러닝허브)',
    category: '편의시설',
    description: '최첨단 스마트 좌석 배정 및 하이테크 멀티미디어 수장고를 보유한 중앙도서관입니다. 크리에이터 스튜디오와 모둠 협업실, 대규모 독서 아뜨리움이 마련되어 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=500&auto=format&fit=crop',
    location: '지캠퍼스 중심부 남측',
    tel: '043-229-8730'
  },
  {
    id: 'spot-3',
    name: '새천년종합정보관 (IT 융합관)',
    category: '강의동',
    description: '전산융합센터, 컴퓨터정보공학, 소프트웨어 전공 및 AI 응용 랩실이 집중 밀집된 정보 기술의 심장부입니다. 고도의 네트워크 실습 기계와 개발자 허브 공간이 구축되어 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500&auto=format&fit=crop',
    location: '대학 본관 우측 방향',
    tel: '043-229-8012'
  },
  {
    id: 'spot-4',
    name: '우암마을 (학생생활관 기숙사)',
    category: '기숙사',
    description: '원거리 학우들의 안전하고 보람찬 수용 복지를 위한 초현대식 기숙사입니다. 피트니스 피트숍, 세탁 라운지, 세미나 회의실, 학생 전용 무인 편의점이 내설되어 있습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1555854817-5b21600a0555?q=80&w=500&auto=format&fit=crop',
    location: '우암산 둘레 캠퍼스 최북단',
    tel: '043-229-9100'
  }
];

export const courseDatabase: Course[] = [
  { id: 'c-1', code: 'AAI101', name: '인공지능 개론 (Introduction to AI)', credit: 3, professor: '홍길동 교수', dept: 'AI 융합학부', schedule: '월 1,2, 수 3' },
  { id: 'c-2', code: 'AAI210', name: '컴퓨터 비전 실무 및 머신러닝', credit: 3, professor: '박지성 교수', dept: 'AI 융합학부', schedule: '화 5,6, 목 7' },
  { id: 'c-3', code: 'CS301', name: '고급 데이터구조 및 알고리즘', credit: 3, professor: '이순신 교수', dept: '컴퓨터공학과', schedule: '수 6,7, 금 4' },
  { id: 'c-4', code: 'CS204', name: '풀스택 웹 애플리케이션 프레임워크', credit: 3, professor: '김철수 교수', dept: '컴퓨터공학과', schedule: '월 6,7,8' },
  { id: 'c-5', code: 'GED102', name: '대학 영어 및 글로벌 비즈니스 회화', credit: 2, professor: 'Sarah Smith', dept: '교양대학', schedule: '목 1,2' },
  { id: 'c-6', code: 'GED205', name: '실학적 기업가정신과 창업 시뮬레이션', credit: 2, professor: '정주영 교수', dept: '교양대학', schedule: '금 1,2,3' },
  { id: 'c-7', code: 'CUP331', name: '데이터 마이닝 지능적 비즈니스 분석', credit: 3, professor: '최민택 교수', dept: '빅데이터통계학과', schedule: '화 2,3,4' }
];

export const initialGradeCourses: Course[] = [
  { id: 'cg-1', code: 'GED101', name: '학술적 코딩과 파이썬 기본', credit: 3, professor: '강지훈 교수', dept: '교양대학', schedule: '이수완료', grade: 'A+' },
  { id: 'cg-2', code: 'AAI101', name: '인공지능 디자인과 윤리', credit: 3, professor: '홍길동 교수', dept: 'AI 융합학부', schedule: '이수완료', grade: 'A0' },
  { id: 'cg-3', code: 'CS202', name: '데이터베이스 모델링 및 SQL', credit: 3, professor: '정소연 교수', dept: '컴퓨터공학과', schedule: '이수완료', grade: 'B+' },
  { id: 'cg-4', code: 'GED105', name: '우암산 생태 사색과 인문 역사', credit: 2, professor: '이우암 교수', dept: '교양대학', schedule: '이수완료', grade: 'A+' },
  { id: 'cg-5', code: 'GED202', name: '진로 설계와 프레젠테이션 스킬', credit: 1, professor: '김학생 교수', dept: '교양대학', schedule: '이수완료', grade: 'Pass' }
];
