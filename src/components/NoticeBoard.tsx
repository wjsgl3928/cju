import React, { useState } from 'react';
import { newsDatabase, noticesDatabase } from '../data.ts';
import { NewsItem, NoticeItem } from '../types.ts';
import { Search, Volume2, Calendar, User, Eye, ArrowRight, Tag, BookOpen, Clock, Heart } from 'lucide-react';

interface NoticeBoardProps {
  onSelectAction?: (actionName: string) => void;
}

export default function NoticeBoard({ onSelectAction }: NoticeBoardProps) {
  const [activeTab, setActiveTab] = useState<'생생소식' | '학사안내' | '장학/취업'>('생생소식');
  const [newsSearch, setNewsSearch] = useState('');
  const [noticeSearch, setNoticeSearch] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [likedNews, setLikedNews] = useState<string[]>([]);
  
  // Handlers
  const toggleLikeNews = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedNews.includes(id)) {
      setLikedNews(likedNews.filter(item => item !== id));
    } else {
      setLikedNews([...likedNews, id]);
    }
  };

  // Filtered notice results
  const filteredNotices = noticesDatabase.filter(notice => {
    const matchesTab = notice.category === activeTab;
    const matchesSearch = notice.title.toLowerCase().includes(noticeSearch.toLowerCase()) || 
                          notice.content.toLowerCase().includes(noticeSearch.toLowerCase()) ||
                          notice.writer.toLowerCase().includes(noticeSearch.toLowerCase());
    const matchesImportant = !showImportantOnly || notice.type === '중요';
    return matchesTab && matchesSearch && matchesImportant;
  });

  // Filtered news results
  const filteredNews = newsDatabase.filter(news => {
    return news.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
           news.description.toLowerCase().includes(newsSearch.toLowerCase()) ||
           news.category.toLowerCase().includes(newsSearch.toLowerCase());
  });

  // Featured original news and others
  const featuredNews = filteredNews[0];
  const otherNews = filteredNews.slice(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      {/* LEFT COLUMN: News Center ("청주대는 지금") */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e4e2e1] pb-4 gap-4">
          <div>
            <span className="text-xs text-heritage-blue font-bold tracking-wider uppercase font-display">Cheongju News</span>
            <h2 className="text-2xl font-bold text-deep-navy tracking-tight mt-0.5">청주대는 지금</h2>
          </div>
          
          {/* News Custom Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="뉴스 기사 실시간 검색..."
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
              className="w-full text-xs py-2 pl-9 pr-4 bg-white border border-[#c3c6d0] rounded focus:outline-none focus:border-heritage-blue text-ink-text text-ellipsis"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#73777f]" />
          </div>
        </div>

        {/* Dynamic News Results */}
        {filteredNews.length === 0 ? (
          <div className="bg-white rounded p-8 border border-[#e4e2e1] text-center text-[#73777f] text-sm">
            검색 조건에 부합하는 청주대 소식 뉴스가 없습니다.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Featured Hero News Card */}
            {featuredNews && (
              <div 
                onClick={() => setSelectedNews(featuredNews)}
                className="bg-white rounded-lg overflow-hidden border border-[#c3c6d0] shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <div className="h-60 relative w-full overflow-hidden bg-slate-100">
                  <img 
                    src={featuredNews.imageUrl} 
                    alt={featuredNews.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-deep-navy text-white text-xs font-semibold px-2.5 py-1 rounded shadow-sm">
                    {featuredNews.category}
                  </div>
                  <button 
                    onClick={(e) => toggleLikeNews(featuredNews.id, e)}
                    className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors text-red-500 shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${likedNews.includes(featuredNews.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-[#73777f] mb-2.5">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featuredNews.date}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />조회 수 {featuredNews.views}</span>
                  </div>
                  <h3 className="text-lg font-bold text-deep-navy mb-2 group-hover:text-heritage-blue transition-colors line-clamp-1">
                    {featuredNews.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-4">
                    {featuredNews.description}
                  </p>
                  <span className="inline-flex items-center text-xs font-semibold text-heritage-blue group-hover:translate-x-1 transition-transform">
                    기사 상문 읽기 <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            )}

            {/* Other News Grid */}
            {otherNews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherNews.map((news) => (
                  <div
                    key={news.id}
                    onClick={() => setSelectedNews(news)}
                    className="bg-white rounded-lg p-4 border border-[#e4e2e1] hover:border-heritage-blue cursor-pointer group flex gap-3 transition-colors duration-200"
                  >
                    <div className="w-20 h-20 rounded overflow-hidden shrink-0 bg-slate-100">
                      <img 
                        src={news.imageUrl} 
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-heritage-blue uppercase tracking-wider">{news.category}</span>
                        <h4 className="text-xs font-bold text-ink-text line-clamp-1 mt-0.5 group-hover:text-[#426AB3]">
                          {news.title}
                        </h4>
                        <p className="text-[11px] text-[#73777f] line-clamp-2 mt-1 leading-snug">
                          {news.description}
                        </p>
                      </div>
                      <span className="text-[10px] text-[#73777f] mt-1">{news.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Notices Tab ("생생소식 / 학사안내 / 장학·취업") */}
      <div className="lg:col-span-5">
        <div className="bg-white rounded-xl border border-[#c3c6d0] shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
          {/* Header Segment Tab Buttons */}
          <div className="flex bg-[#f6f3f2] border-b border-[#e4e2e1]">
            {(['생생소식', '학사안내', '장학/취업'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setNoticeSearch('');
                }}
                className={`flex-1 py-4 text-xs font-bold transition-all duration-200 text-center relative ${
                  activeTab === tab
                    ? 'text-deep-navy bg-white border-b-2 border-academic-gold font-extrabold'
                    : 'text-[#73777f] hover:text-deep-navy hover:bg-[#eae8e7]'
                }`}
              >
                {tab === '생생소식' ? '생생소식 (공지)' : tab}
              </button>
            ))}
          </div>

          {/* Sub Control bar: Search and Filter Important Toggles */}
          <div className="p-4 bg-white border-b border-[#f0eded] justify-between flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <input
                type="text"
                placeholder={`${activeTab} 내부 공지 검색...`}
                value={noticeSearch}
                onChange={(e) => setNoticeSearch(e.target.value)}
                className="w-full text-xs py-1.5 pl-8 pr-4 border border-[#e4e2e1] rounded outline-none focus:border-heritage-blue text-ink-text text-ellipsis"
              />
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[#73777f]" />
            </div>

            <button
              onClick={() => setShowImportantOnly(prev => !prev)}
              className={`text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-all shrink-0 font-medium ${
                showImportantOnly
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-[#f6f3f2] text-ink-text border border-[#e4e2e1] hover:bg-[#eae8e7]'
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${showImportantOnly ? 'animate-bounce' : ''}`} />
              중요 공지 필터
            </button>
          </div>

          {/* Notice Lists */}
          <div className="flex-1 overflow-y-auto max-h-[460px] divide-y divide-[#f0eded]">
            {filteredNotices.length === 0 ? (
              <div className="p-12 text-center text-[#73777f] text-xs">
                제공된 카테고리 내에 공지사항 내역이 없습니다.
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className="p-4 hover:bg-[#f6f3f2] cursor-pointer transition-colors duration-150 group"
                >
                  <div className="flex items-start gap-3">
                    {notice.type === '중요' ? (
                      <span className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold inline-flex items-center gap-0.5">
                        <Volume2 className="w-2.5 h-2.5" /> 중요
                      </span>
                    ) : (
                      <span className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-slate-100 text-[#73777f] text-[10px]">
                        일반
                      </span>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-ink-text group-hover:text-heritage-blue transition-colors leading-snug line-clamp-2">
                        {notice.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#73777f]">
                        <span className="font-medium text-deep-navy">{notice.writer}</span>
                        <span>•</span>
                        <span>{notice.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Footer of Notices widget: simulated link */}
          <div className="bg-[#fcfbfb] p-3 text-center border-t border-[#f0eded]">
            <button 
              onClick={() => onSelectAction?.('announcements')}
              className="text-xs font-semibold text-heritage-blue hover:text-deep-navy inline-flex items-center gap-1"
            >
              통합 학사공지 종합정보시스템 실행 <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* NOTICE MULTIPURPOSE DETAIL DIALOG MODAL Overlay */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[#c3c6d0] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90%] md:animate-scale-up">
            {/* Header */}
            <div className="bg-deep-navy text-white p-5">
              <div className="flex items-center gap-2 text-xs text-academic-gold font-bold mb-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>{selectedNotice.category} 공지사항</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                {selectedNotice.title}
              </h3>
            </div>

            {/* Metadata bar */}
            <div className="bg-[#f6f3f2] px-5 py-3 border-b border-[#e4e2e1] flex flex-wrap gap-4 text-xs text-[#73777f]">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-deep-navy" />작성부서: <strong className="text-ink-text">{selectedNotice.department} ({selectedNotice.writer})</strong></span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />게시일자: <strong className="text-ink-text">{selectedNotice.date}</strong></span>
            </div>

            {/* Content body */}
            <div className="p-6 overflow-y-auto text-xs md:text-sm text-[#43474e] leading-relaxed flex-1 whitespace-pre-wrap">
              {selectedNotice.content}
            </div>

            {/* Actions Footer */}
            <div className="bg-[#eae8e7] px-6 py-4 flex justify-between items-center border-t border-[#e4e2e1]">
              <button 
                onClick={() => {
                  alert("학교 통합 웹 메일로 전달되었습니다 (가상 전송).");
                }}
                className="text-xs bg-white text-deep-navy border border-[#c3c6d0] px-4 py-2 rounded font-semibold hover:bg-[#f6f3f2] transition-colors"
              >
                메일로 보내기
              </button>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-xs bg-deep-navy text-white px-5 py-2 rounded font-bold hover:bg-opacity-90 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEWS DETAIL DIALOG MODAL Overlay */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl border border-[#c3c6d0] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90%]">
            {/* Image banner */}
            <div className="h-48 relative bg-slate-100">
              <img 
                src={selectedNews.imageUrl} 
                alt={selectedNews.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] bg-academic-gold text-deep-navy bold px-2 py-0.5 rounded font-bold font-display uppercase tracking-widest">{selectedNews.category}</span>
                <h3 className="text-sm md:text-base font-bold text-white mt-1.5">{selectedNews.title}</h3>
              </div>
            </div>

            {/* Meta bar */}
            <div className="bg-[#f6f3f2] px-5 py-2.5 border-b border-[#e4e2e1] flex justify-between text-xs text-[#73777f]">
              <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-heritage-blue" />청주대학교 미디어센터</span>
              <span className="flex items-center gap-4">
                <span>일자: {selectedNews.date}</span>
                <span>조회수: {selectedNews.views + 1}</span>
              </span>
            </div>

            {/* Document contents */}
            <div className="p-6 overflow-y-auto text-xs md:text-sm text-ink-text leading-relaxed flex-1 space-y-4">
              <p className="font-semibold text-deep-navy border-l-4 border-academic-gold pl-3 py-1 bg-amber-50 rounded">
                {selectedNews.description}
              </p>
              <p>
                본 보도는 2026학년도 글로벌 지능형 학사 고도화를 지향하는 충북 선도대학, 청주대학교의 혁신 경영 일환으로 송출되었습니다. 
                대학 본부는 지속 가능한 특성화 연구와 하이테크 산학 협력망 기반의 혁신 기틀을 제공하고 있습니다.
              </p>
              <p>
                특히 해당 세부 성과는 학부 재학생들의 밀도 깊은 첨단 신산업 실무 체험과 주차별 캡스톤 결과물을 바탕으로 진행되어, 
                이론에만 치중되지 않는 '실학성세' 교시 이념을 가장 적확히 표방한 모범 사례로 다수 평가받았습니다.
              </p>
              <p>
                청주대학교 기획처는 "이번 도약을 시작으로 학생 모두가 핵심 가치 인재로 대우받는 역량 연계형 복지망을 증설함으로써 지역 핵심 상생 명문 대학의 기상을 한껏 드높이겠다"고 포부를 덧붙였습니다.
              </p>
            </div>

            {/* Footer actions */}
            <div className="bg-[#eae8e7] px-6 py-4 flex justify-between items-center border-t border-[#e4e2e1]">
              <span className="text-xs text-on-surface-variant font-medium">청주대학교 미디어혁신홍보부</span>
              <button
                onClick={() => setSelectedNews(null)}
                className="text-xs bg-deep-navy text-white px-5 py-2 rounded font-bold hover:bg-opacity-90 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
