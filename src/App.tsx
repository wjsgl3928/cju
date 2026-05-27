import { useState, useEffect } from 'react';
import { 
  UNIVERSITY_LOGO, 
  UNIVERSITY_HERO_BG 
} from './data.ts';
import NoticeBoard from './components/NoticeBoard.tsx';
import StudentPortal from './components/StudentPortal.tsx';
import CampusMap from './components/CampusMap.tsx';
import AdvisorChat from './components/AdvisorChat.tsx';

// Icons import
import { 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  School, 
  Badge, 
  Trophy, 
  Home, 
  Newspaper, 
  BookOpen, 
  MapPin, 
  Bot, 
  Layers, 
  Info,
  Calendar,
  Lock,
  Phone,
  CheckCircle2,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab ] = useState<'home' | 'notices' | 'portal' | 'campus' | 'chat'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [facultyModalOpen, setFacultyModalOpen] = useState(false);
  const [floatingChatOpen, setFloatingChatOpen] = useState(false);

  // Auto-scroll helper when matching action is selected
  const handleNavigate = (tab: 'home' | 'notices' | 'portal' | 'campus' | 'chat') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    // Smooth scroll back to viewing hub
    const element = document.getElementById('viewing-hub');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-ink-text flex flex-col font-sans selection:bg-academic-gold selection:text-deep-navy relative">
      
      {/* ================ TOP NAVIGATION ====== */}
      <nav className="bg-white border-b border-[#e4e2e1] shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1200px] mx-auto h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-heritage-blue rounded"
          >
            <img 
              alt="청주대학교 로고" 
              className="h-10 md:h-12 object-contain" 
              src={UNIVERSITY_LOGO}
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Desktop Nav links */}
          <ul className="hidden md:flex gap-6 lg:gap-8 items-center h-full font-sans text-xs lg:text-sm font-semibold text-[#43474e]">
            <li className="h-full flex items-center">
              <button 
                onClick={() => handleNavigate('home')}
                className={`transition-colors h-full flex items-center border-b-3 px-1 cursor-pointer ${
                  activeTab === 'home' 
                    ? 'text-deep-navy border-academic-gold font-bold' 
                    : 'border-transparent text-on-surface-variant hover:text-deep-navy hover:border-[#eae8e7]'
                }`}
              >
                포털 홈
              </button>
            </li>
            <li className="h-full flex items-center">
              <button 
                onClick={() => handleNavigate('notices')}
                className={`transition-colors h-full flex items-center border-b-3 px-1 cursor-pointer ${
                  activeTab === 'notices' 
                    ? 'text-deep-navy border-academic-gold font-bold' 
                    : 'border-transparent text-on-surface-variant hover:text-deep-navy hover:border-[#eae8e7]'
                }`}
              >
                의사결정 공지 & 뉴스
              </button>
            </li>
            <li className="h-full flex items-center">
              <button 
                onClick={() => handleNavigate('portal')}
                className={`transition-colors h-full flex items-center border-b-3 px-1 cursor-pointer ${
                  activeTab === 'portal' 
                    ? 'text-deep-navy border-academic-gold font-bold' 
                    : 'border-transparent text-on-surface-variant hover:text-deep-navy hover:border-[#eae8e7]'
                }`}
              >
                교과수강 시뮬레이터
              </button>
            </li>
            <li className="h-full flex items-center">
              <button 
                onClick={() => handleNavigate('campus')}
                className={`transition-colors h-full flex items-center border-b-3 px-1 cursor-pointer ${
                  activeTab === 'campus' 
                    ? 'text-deep-navy border-academic-gold font-bold' 
                    : 'border-transparent text-on-surface-variant hover:text-deep-navy hover:border-[#eae8e7]'
                }`}
              >
                캠퍼스 시설안내
              </button>
            </li>
            <li className="h-full flex items-center">
              <button 
                onClick={() => handleNavigate('chat')}
                className={`transition-colors h-full flex text-red-700 items-center gap-1 border-b-3 px-1 cursor-pointer ${
                  activeTab === 'chat' 
                    ? 'text-deep-navy border-academic-gold font-black' 
                    : 'border-transparent text-on-surface-variant hover:text-deep-navy hover:border-[#eae8e7]'
                }`}
              >
                <Bot className="w-4 h-4 text-heritage-blue" />
                청우 AI 비서
              </button>
            </li>
          </ul>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-all text-deep-navy cursor-pointer"
              title="통합 도서 지식 검색"
            >
              <Search className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setPortalModalOpen(true)}
              className="hidden sm:inline-flex items-center justify-center bg-deep-navy text-white font-semibold text-xs px-5 py-2.5 rounded hover:bg-[#345da5] transition-all cursor-pointer shadow-sm"
            >
              종합정보 포털접속
            </button>

            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-deep-navy focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE NAV MENU ====== */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#e4e2e1] py-4 px-6 space-y-3 absolute w-full left-0 z-40 shadow-lg animate-fade-in">
            <button 
              onClick={() => handleNavigate('home')}
              className={`w-full text-left py-2 px-3 text-xs font-bold rounded flex items-center gap-2 ${
                activeTab === 'home' ? 'bg-amber-50 text-deep-navy' : 'text-[#73777f] hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4" /> 포털 홈 종합정보
            </button>
            <button 
              onClick={() => handleNavigate('notices')}
              className={`w-full text-left py-2 px-3 text-xs font-bold rounded flex items-center gap-2 ${
                activeTab === 'notices' ? 'bg-amber-50 text-deep-navy' : 'text-[#73777f] hover:bg-slate-50'
              }`}
            >
              <Newspaper className="w-4 h-4" /> 생생소식 공지 & 뉴스
            </button>
            <button 
              onClick={() => handleNavigate('portal')}
              className={`w-full text-left py-2 px-3 text-xs font-bold rounded flex items-center gap-2 ${
                activeTab === 'portal' ? 'bg-amber-50 text-deep-navy' : 'text-[#73777f] hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" /> 학사 수강 시뮬레이터
            </button>
            <button 
              onClick={() => handleNavigate('campus')}
              className={`w-full text-left py-2 px-3 text-xs font-bold rounded flex items-center gap-2 ${
                activeTab === 'campus' ? 'bg-amber-50 text-deep-navy' : 'text-[#73777f] hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-4 h-4" /> 캠퍼스 시설가이드
            </button>
            <button 
              onClick={() => handleNavigate('chat')}
              className={`w-full text-left py-2 px-3 text-xs font-black rounded flex items-center gap-2 ${
                activeTab === 'chat' ? 'bg-amber-50 text-deep-navy' : 'text-[#73777f] hover:bg-slate-50'
              }`}
            >
              <Bot className="w-4 h-4 text-heritage-blue" /> 청우 AI 학사비서
            </button>
            
            <div className="pt-2 border-t border-zinc-100 flex justify-center">
              <button 
                onClick={() => { setMobileMenuOpen(false); setPortalModalOpen(true); }}
                className="w-full bg-deep-navy text-white text-xs py-2 rounded text-center font-bold"
              >
                교직원/학생 그룹웨어 로그인
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO INTRO SECTION ====== */}
      <header 
        className="relative w-full h-[380px] md:h-[460px] flex items-center overflow-hidden shrink-0 bg-[#001c37]"
        style={{ 
          backgroundImage: `url(${UNIVERSITY_HERO_BG})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center 35%' 
        }}
        aria-label="Cheongju University Campus Landscape"
      >
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="relative z-10 w-full px-4 md:px-10 max-w-[1200px] mx-auto">
          <div className="max-w-2xl text-white space-y-4">
            <span className="inline-block bg-academic-gold text-deep-navy font-bold text-[10px] md:text-xs px-3.5 py-1 rounded-full shadow-sm font-display tracking-widest uppercase">
              실학성세 4.0 Vision
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight font-sans tracking-tight">
              실학성세 4.0!<br />
              미래를 향한 큰 걸음,<br />
              청주대학교
            </h1>
            <p className="text-xs md:text-base text-zinc-200 font-medium max-w-lg leading-relaxed">
              중부권 최고의 명문 사학으로 견고히 성장하는 청주대학교가 여러분의 비전 실현과 하이테크 미래 동량을 길러내는 기틀이 되겠습니다.
            </p>
            
            <div className="flex gap-2.5 pt-2">
              <button 
                onClick={() => handleNavigate('portal')}
                className="inline-flex items-center justify-center bg-academic-gold text-deep-navy font-black text-xs px-5 py-3 rounded hover:bg-amber-300 transition-all cursor-pointer shadow-md"
              >
                교과 등록 시뮬레이터 실행
                <ArrowRight className="w-4 h-4 ml-1.5 shrink-0" />
              </button>
              <button 
                onClick={() => handleNavigate('chat')}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white text-white font-extrabold text-xs px-5 py-3 rounded transition-all cursor-pointer"
              >
                청우 AI 학사 비서 질문하기
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= QUICK LINKS BENTO GRID ====== */}
      <section className="py-8 -mt-12 relative z-20 px-4 md:px-10 max-w-[1200px] mx-auto w-full shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Bento Card: Student */}
          <button 
            onClick={() => handleNavigate('portal')}
            className="bento-card rounded-xl p-5 text-left group hover:-translate-y-1 hover:border-heritage-blue hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
              <School className="w-5 h-5 text-deep-navy" />
            </div>
            <h3 className="text-sm font-bold text-deep-navy mb-1 flex items-center justify-between">
              <span>재학생 전용</span>
              <ArrowRight className="w-4 h-4 text-[#73777f] group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-[11px] text-[#73777f] mb-3.5 leading-relaxed">
              수강 수강신청, 장학 혜택 모니터링, 평점 평균 성적(GPA) 등 재학생 학무 업무 시뮬레이션
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] bg-slate-100/80 text-[#73777f] px-2 py-0.5 rounded-full font-semibold">종합정보포털</span>
              <span className="text-[10px] bg-slate-100/80 text-[#73777f] px-2 py-0.5 rounded-full font-semibold">LMS/e-Class</span>
            </div>
          </button>

          {/* Bento Card: Faculty */}
          <button 
            onClick={() => setFacultyModalOpen(true)}
            className="bento-card rounded-xl p-5 text-left group hover:-translate-y-1 hover:border-heritage-blue hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="w-11 h-11 bg-orange-50 rounded-full flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
              <Badge className="w-5 h-5 text-heritage-blue" />
            </div>
            <h3 className="text-sm font-bold text-deep-navy mb-1 flex items-center justify-between">
              <span>교직원 존</span>
              <ArrowRight className="w-4 h-4 text-[#73777f] group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-[11px] text-[#73777f] mb-3.5 leading-relaxed">
              전자 연재 결재 기안서, 그룹웨어, 교수 웹메일, 교내 연구비 정산 지원 및 연구성과 포털
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] bg-slate-100/80 text-[#73777f] px-2 py-0.5 rounded-full font-semibold">인사행정</span>
              <span className="text-[10px] bg-slate-100/80 text-[#73777f] px-2 py-0.5 rounded-full font-semibold">연구종합</span>
            </div>
          </button>

          {/* Bento Card: Future Students */}
          <button 
            onClick={() => handleNavigate('chat')}
            className="bento-card rounded-xl p-5 text-left border-3 border-academic-gold/20 group hover:-translate-y-1 hover:border-academic-gold hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="w-11 h-11 bg-amber-100 rounded-full flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
              <Trophy className="w-5 h-5 text-amber-900" />
            </div>
            <h3 className="text-sm font-bold text-deep-navy mb-1 flex items-center justify-between">
              <span>예비신입생 공간</span>
              <ArrowRight className="w-4 h-4 text-[#73777f] group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-[11px] text-[#73777f] mb-3.5 leading-relaxed">
              입학요강 요건, 장학 수혜 조건 등을 AI 학사비서 청우에게 즉석 상문 질문할 수 있습니다.
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] bg-amber-100/30 text-amber-950 px-2 py-0.5 rounded-full font-bold">입학처 수능계산</span>
              <span className="text-[10px] bg-slate-100/80 text-[#73777f] px-2 py-0.5 rounded-full font-semibold">원서접수</span>
            </div>
          </button>

        </div>
      </section>

      {/* ================= VIEWING MAIN HUB ====== */}
      <span id="viewing-hub" className="scroll-mt-24"></span>
      <main className="flex-1 w-full py-6 px-4 md:px-10 max-w-[1200px] mx-auto space-y-12">
        
        {/* Hub Title and Status Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#e4e2e1] pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-deep-navy tracking-tight uppercase font-sans">
              {activeTab === 'home' && '종합 학사정보 홈 광장'}
              {activeTab === 'notices' && '실시간 학사공지 & 대학뉴스 미디어'}
              {activeTab === 'portal' && '하이테크 수강신청 학점 & GPA 계산기'}
              {activeTab === 'campus' && '청주대 캠퍼스 안내 지도 및 실시간 상태'}
              {activeTab === 'chat' && '청우 AI 비서 학사 행정 지원 어드바이저'}
            </h2>
            <p className="text-xs text-[#73777f] mt-1">
              {activeTab === 'home' && '학사 일정부터 생생뉴스, 학점 관리 도구를 한 데 묶었습니다.'}
              {activeTab === 'notices' && '글로벌 청주대 내신 및 연구 소식을 상세 추적하고 중요한 결정을 내리세요.'}
              {activeTab === 'portal' && '원하는 학과 전공 강의를 담고 과목별 평점을 적용해 최종 GPA 학점을 미리 검토하세요.'}
              {activeTab === 'campus' && '청주대 주요 강의동, 도서관 좌석 열람실 잔여석 및 세탁 가동률을 모니터링하세요.'}
              {activeTab === 'chat' && 'Google Gemini 3.5 기반 가이드가 학과 정보를 친절한 한국어로 즉각 풀어드립니다.'}
            </p>
          </div>

          {/* Sub menu tabs inside main card segment */}
          <div className="flex gap-1.5 p-1 bg-[#eae8e7] rounded-lg">
            {(['home', 'notices', 'portal', 'campus', 'chat'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleNavigate(tab)}
                className={`text-[10px] md:text-xs px-3 py-1.5 rounded transition-all font-bold cursor-pointer capitalize ${
                  activeTab === tab 
                    ? 'bg-deep-navy text-white shadow-sm' 
                    : 'text-[#73777f] hover:text-black hover:bg-white/50'
                }`}
              >
                {tab === 'home' && '전체홈'}
                {tab === 'notices' && '공지/뉴스'}
                {tab === 'portal' && '수강/성적시뮬레이터'}
                {tab === 'campus' && '시설'}
                {tab === 'chat' && 'AI 비서 UI'}
              </button>
            ))}
          </div>
        </div>

        {/* ================= WORKSPACE DISTRIBUTED VIEW ROUTING ====== */}
        <div className="transition-all duration-300">
          {activeTab === 'home' && (
            <div className="space-y-12">
              {/* Combine Notice Center */}
              <NoticeBoard onSelectAction={(act) => handleNavigate(act === 'announcements' ? 'portal' : 'notices')} />
              
              {/* Combine Info Calendar alert */}
              <div className="bg-white rounded-xl border border-[#c3c6d0] p-6 shadow-sm">
                <div className="flex items-center gap-3 text-deep-navy font-bold border-b border-[#f0eded] pb-3 mb-4">
                  <Calendar className="w-5 h-5 text-heritage-blue" />
                  <h3 className="text-sm font-bold">2026학년도 주요 학사 기본 일정표</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded bg-[#f6f3f2] border-l-4 border-academic-gold space-y-1 text-xs">
                    <span className="text-[#73777f]">기말 지필 대면 평가</span>
                    <h4 className="font-bold text-deep-navy">06.08 ~ 06.19</h4>
                    <p className="text-[10px] text-[#73777f]">성적 이수 전산 이관</p>
                  </div>
                  <div className="p-4 rounded bg-[#f6f3f2] border-l-4 border-heritage-blue space-y-1 text-xs">
                    <span className="text-[#73777f]">하계 집중 현장 실습</span>
                    <h4 className="font-bold text-deep-navy">07.01 ~ 08.10</h4>
                    <p className="text-[10px] text-[#73777f]">기업체 연계 매칭 실무</p>
                  </div>
                  <div className="p-4 rounded bg-[#f6f3f2] border-l-4 border-[#00315A] space-y-1 text-xs">
                    <span className="text-[#73777f]">복학 및 수강 신청 바구니</span>
                    <h4 className="font-bold text-deep-navy">08.11 ~ 08.20</h4>
                    <p className="text-[10px] text-[#73777f]">15학점 한도 기본 담기</p>
                  </div>
                  <div className="p-4 rounded bg-[#f6f3f2] border-l-4 border-red-600 space-y-1 text-xs">
                    <span className="text-[#73777f]">2학기 개강 및 학학 등록</span>
                    <h4 className="font-bold text-deep-navy">09.01 개설</h4>
                    <p className="text-[10px] text-[#73777f]">LMS 동영상 교육 가습</p>
                  </div>
                </div>
              </div>

              {/* Grid split of map & chat previews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-white rounded-xl border border-[#c3c6d0] shadow-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-heritage-blue font-bold tracking-wider font-display uppercase">Interactive Map Tool</span>
                    <h3 className="text-sm font-black text-deep-navy">캠퍼스 공간 시설 정보 조회기</h3>
                    <p className="text-xs text-[#73777f] leading-relaxed">
                      중앙도서관 아뜨리움 제2열람석 실시간 예약 상황 또는 학생생활관 "우암마을" 공동 세탁기 연동 현황을 직접 시뮬레이션할 수 있습니다.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate('campus')}
                    className="mt-6 w-full text-center bg-[#f6f3f2] hover:bg-[#eae8e7] text-deep-navy text-xs py-2.5 rounded font-bold transition-all border border-[#e4e2e1]"
                  >
                    캠퍼스 열람석 및 현황 보러가기 →
                  </button>
                </div>

                <div className="p-6 bg-gradient-to-br from-white to-blue-50/20 rounded-xl border border-[#c3c6d0] shadow-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-heritage-blue font-bold tracking-wider font-display uppercase">AI Virtual Agent</span>
                    <h3 className="text-sm font-black text-deep-navy flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-academic-gold" /> 청우 AI 학사비서 (Gemini 3.5 기반)
                    </h3>
                    <p className="text-xs text-[#73777f] leading-relaxed">
                      학교 설립 교시, 학과 학년별 졸업 규정, 수강신청 유의 사항 등 궁금한 무엇이든 스마트 질문을 주시면 실시간 어드바이스를 드립니다.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate('chat')}
                    className="mt-6 w-full text-center bg-[#00315A] hover:bg-[#345da5] text-white text-xs py-2.5 rounded font-black transition-all shadow"
                  >
                    AI 학습 어드바이저 대화 시작하기 →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notices' && (
            <NoticeBoard onSelectAction={(act) => handleNavigate(act === 'announcements' ? 'portal' : 'notices')} />
          )}

          {activeTab === 'portal' && (
            <StudentPortal />
          )}

          {activeTab === 'campus' && (
            <CampusMap />
          )}

          {activeTab === 'chat' && (
            <div className="max-w-3xl mx-auto">
              <AdvisorChat />
            </div>
          )}
        </div>
      </main>

      {/* ========================================================
          DECENT INSTITUTION FOOTER 
      ======================================================== */}
      <footer className="bg-deep-navy text-white mt-12 py-12 shrink-0 border-t-3 border-academic-gold font-sans">
        <div className="px-4 md:px-10 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Institution logos and credits */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="flex items-center gap-2">
              <img 
                alt="청주대학교 로고" 
                className="h-10 object-contain filter brightness-0 invert" 
                src={UNIVERSITY_LOGO}
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[10px] text-zinc-300 max-w-sm leading-normal font-medium">
              청주대학교는 학생과 지역 사회의 동행 발전을 위해 다각도의 학사 지원 솔루션을 제공하며 중부권 최고 명문을 향해 힘차게 전진합니다.
            </p>
          </div>

          {/* Quick link tags */}
          <ul className="flex flex-wrap justify-center gap-5 text-zinc-300 text-xs font-semibold">
            <li><button onClick={() => alert("개인정보 처리방침은 가상으로 작동하며, 수집되는 데이터는 브라우저 내부 소멸 처리됩니다.")} className="hover:text-academic-gold transition-colors text-xs">개인정보처리방침</button></li>
            <li><a href="#" className="hover:text-academic-gold transition-colors text-xs">이메일무단수집거부</a></li>
            <li><button onClick={() => handleNavigate('campus')} className="hover:text-academic-gold transition-colors text-xs">찾아오시는 길</button></li>
            <li><a href="#" className="hover:text-academic-gold transition-colors text-xs">사이트맵</a></li>
          </ul>
        </div>

        {/* Legal copyright & address */}
        <div className="px-4 md:px-10 max-w-[1200px] mx-auto border-t border-white/10 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-zinc-400 text-center md:text-left leading-relaxed font-sans">
            [28503] 충청북도 청주시 청원구 대성로 298 청주대학교 기획처 | TEL. 043-229-8114 | FAX. 043-229-8119<br />
            © CHEONGJU UNIVERSITY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
            <span>Development Container: v2.5.4</span>
            <span>•</span>
            <span className="text-academic-gold font-bold">Standard UI Verified</span>
          </div>
        </div>
      </footer>

      {/* ========================================================
          FLOATING AI ASSISTANT CONSOLE BUBBLE
      ======================================================== */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans">
        {floatingChatOpen && (
          <div className="w-[330px] sm:w-[380px] shadow-2xl rounded-xl border border-zinc-200 overflow-hidden bg-white animate-scale-up-long">
            <div className="bg-deep-navy text-white p-3.5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-4.5 h-4.5 text-academic-gold" />
                <span className="text-xs font-bold font-display">청우 AI 비서 (미니 챗봇)</span>
              </div>
              <button 
                onClick={() => setFloatingChatOpen(false)}
                className="hover:bg-white/10 p-1 rounded text-zinc-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-[340px]">
              <AdvisorChat />
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setFloatingChatOpen(prev => !prev);
            // highlight state if opened from home page
            if (!floatingChatOpen && activeTab !== 'chat') {
              // prompt small feedback toast
            }
          }}
          className="w-14 h-14 bg-deep-navy hover:bg-heritage-blue text-white rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer group hover:scale-105 active:scale-95"
          title="청우 AI 실시간 챗봇 실행"
        >
          {floatingChatOpen ? (
            <X className="w-6 h-6 animate-spin-once" />
          ) : (
            <div className="relative">
              <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1.5 -right-1.5 bg-academic-gold text-deep-navy text-[8px] font-black px-1.5 py-0.2 rounded-full border border-deep-navy">
                AI
              </span>
            </div>
          )}
        </button>
      </div>

      {/* =============== MODAL DIALOGS OVERLAY ============== */}
      
      {/* Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl border border-zinc-200 w-full max-w-md overflow-hidden animate-scale-up">
            <div className="p-5 border-b border-[#f0eded] flex justify-between items-center bg-[#f6f3f2]">
              <h3 className="text-xs font-bold text-deep-navy flex items-center gap-1.5 font-sans">
                <Search className="w-4 h-4 text-heritage-blue" /> 통합 지식학술 및 시설 검색
              </h3>
              <button onClick={() => { setSearchModalOpen(false); setSearchQuery(''); }} className="text-[#73777f] hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-[11px] text-[#73777f] leading-normal">
                학사 관리 편람, 단과 학부, 도서관 신작 서적, 또는 동아리 활동 소식을 키워드로 찾아보실 수 있습니다.
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="예: '인공지능', '장학생', '대면 기말고사'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs py-2 pl-4 pr-10 border border-[#c3c6d0] rounded outline-none focus:border-heritage-blue text-ink-text bg-white"
                />
                <button 
                  onClick={() => {
                    if (searchQuery.trim()) {
                      setSearchModalOpen(false);
                      handleNavigate('notices');
                      alert(`'${searchQuery}' (으)로 통합 검색을 실시합니다. 뉴스 및 공지 탭에 결과를 정렬했습니다.`);
                    }
                  }}
                  className="absolute right-3 top-2 w-6 h-6 flex items-center justify-center text-deep-navy hover:text-heritage-blue"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-[#fcfbfb] p-3 text-center border-t border-[#f0eded]">
              <button 
                onClick={() => {
                  setSearchModalOpen(false);
                  handleNavigate('chat');
                }}
                className="text-[11px] font-semibold text-heritage-blue hover:underline inline-flex items-center gap-1"
              >
                AI 어드바이저 챗 대화 질문으로 찾기 <Sparkles className="w-3.5 h-3.5 text-academic-gold" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Student Portal Virtual Login modal */}
      {portalModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl border border-zinc-200 w-full max-w-sm overflow-hidden animate-scale-up">
            <div className="p-6 bg-deep-navy text-white text-center space-y-1.5">
              <img 
                src={UNIVERSITY_LOGO} 
                alt="Cheongju University" 
                className="h-9 mx-auto object-contain filter brightness-0 invert" 
                referrerPolicy="no-referrer"
              />
              <h3 className="text-sm font-bold">통합 종합행정 정보시스템 포털</h3>
              <p className="text-[10px] text-zinc-300">포털 접속은 가상 세션 보호로 일차 인증되어 자동 보호됩니다.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 bg-green-50 text-green-800 rounded border border-green-200 text-xs flex gap-2 items-start">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>안내: AI Studio Preview 보안 연동 세션으로 즉석 소유주 자동 인가가 매칭 확인되었습니다!</span>
              </div>
              <p className="text-[11px] text-[#73777f] leading-normal">
                학사 행정 권한 접근(수강 신청 취득 학점 가감, 성적 시뮬레이터 및 캠퍼스 스마트 상태 예약 등)이 정상 가동되었습니다. 우측의 시뮬레이터 탭에서 자유롭게 확인하십시오.
              </p>
            </div>
            <div className="p-4 bg-zinc-50 flex justify-end gap-2 border-t border-[#f0eded]">
              <button 
                onClick={() => {
                  setPortalModalOpen(false);
                  handleNavigate('portal');
                }}
                className="text-xs bg-deep-navy hover:bg-[#345da5] text-white px-4 py-2 rounded font-bold transition-all"
              >
                학사 시뮬레이터 이동하기
              </button>
              <button 
                onClick={() => setPortalModalOpen(false)}
                className="text-xs text-[#73777f] hover:bg-slate-100 px-3 py-2 rounded font-semibold transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Info Modal */}
      {facultyModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl border border-zinc-200 w-full max-w-sm overflow-hidden">
            <div className="p-5 border-b border-[#f0eded] bg-[#f6f3f2] flex items-center gap-2">
              <Lock className="w-4 h-4 text-red-600" />
              <h3 className="text-xs font-bold text-deep-navy">교직원 행정 내부 보안 안내</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 bg-amber-50 rounded text-amber-900 text-xs flex gap-2 items-start border border-amber-200">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>본 존(Zone)은 공인 공무 교직원 전용 업무망입니다. 교직원 ID 및 공인인증서 USB를 장착한 본가 인가된 클라이언트 외에는 기안 작성이 봉쇄됩니다.</span>
              </div>
              <p className="text-[11px] text-[#73777f] leading-normal">
                연결을 원하시는 교지 직통 사무실 번호 및 문의 내역은 <strong>포털 공지 카테고리 기사란</strong> 또는 <strong>AI 학사 비서 질의 응답</strong>을 활용하여 직접 검색해 보실 수 있습니다.
              </p>
            </div>
            <div className="p-4 bg-zinc-50 flex justify-end border-t border-[#f0eded]">
              <button 
                onClick={() => setFacultyModalOpen(false)}
                className="text-xs bg-deep-navy text-white px-5 py-2 rounded font-bold cursor-pointer hover:bg-opacity-90 transition"
              >
                확인 접수 완료
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
