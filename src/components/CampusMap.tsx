import { useState, useMemo } from 'react';
import { campusSpots } from '../data.ts';
import { CampusSpot } from '../types.ts';
import { MapPin, Phone, Building2, Coffee, Layers, BookMarked, ToggleLeft } from 'lucide-react';

export default function CampusMap() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [activeSpot, setActiveSpot] = useState<CampusSpot>(campusSpots[0]);
  
  // Library Seat reservation simulator states
  const [librarySeats, setLibrarySeats] = useState<boolean[]>(
    Array.from({ length: 24 }, (_, i) => i % 3 !== 0) // random initial state
  );
  // Dorm laundry simulator states
  const laundryMachines = [
    { id: 1, name: '드럼세탁기 A호기', status: '사용중', remaining: '12분' },
    { id: 2, name: '드럼세탁기 B호기', status: '대기중', remaining: '-' },
    { id: 3, name: '식기세척기 A편의', status: '대기중', remaining: '-' },
    { id: 4, name: '건조기 정밀케어', status: '사용중', remaining: '45분' },
  ];

  const filteredSpots = useMemo(() => {
    if (selectedCategory === '전체') return campusSpots;
    return campusSpots.filter(spot => spot.category === selectedCategory);
  }, [selectedCategory]);

  const toggleSeat = (index: number) => {
    const next = [...librarySeats];
    next[index] = !next[index];
    setLibrarySeats(next);
  };

  const availableSeatsCount = useMemo(() => {
    return librarySeats.filter(s => s).length;
  }, [librarySeats]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      {/* LEFT COLUMN: Campus Spots Directory List in Col 5 */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-white rounded-xl border border-[#c3c6d0] p-5 shadow-sm space-y-4">
          <div className="border-b border-[#f0eded] pb-3">
            <span className="text-[10px] text-heritage-blue font-bold tracking-widest uppercase font-display">Campus Directory</span>
            <h3 className="text-sm font-bold text-deep-navy mt-1">캠퍼스 시설 정보 가이드</h3>
          </div>

          {/* Sub Navigation */}
          <div className="flex flex-wrap gap-1">
            {['전체', '강의동', '편의시설', '기숙사', '행정'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] px-2.5 py-1.5 rounded transition-colors font-semibold ${
                  selectedCategory === cat
                    ? 'bg-deep-navy text-white'
                    : 'bg-[#f6f3f2] text-[#73777f] hover:bg-[#eae8e7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List items */}
          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                onClick={() => {
                  setActiveSpot(spot);
                }}
                className={`p-3 rounded border text-left cursor-pointer transition-all flex gap-3 ${
                  activeSpot.id === spot.id
                    ? 'border-heritage-blue bg-blue-50/40 shadow-sm'
                    : 'border-[#e4e2e1] hover:bg-[#f6f3f2]'
                }`}
              >
                <div className="w-12 h-12 rounded bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={spot.imageUrl}
                    alt={spot.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] bg-[#e4e2e1] text-[#73777f] px-1.5 py-0.2 rounded font-semibold">
                      {spot.category}
                    </span>
                    <span className="text-[9px] text-[#73777f]">{spot.tel}</span>
                  </div>
                  <h4 className="text-xs font-bold text-ink-text mt-1 truncate">
                    {spot.name}
                  </h4>
                  <p className="text-[10px] text-[#73777f] truncate mt-0.5">
                    {spot.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Spot Interactive Console Details (Col 7) */}
      <div className="lg:col-span-7">
        <div className="bg-white rounded-xl border border-[#c3c6d0] shadow-sm overflow-hidden h-full flex flex-col justify-between">
          <div>
            {/* Banner picture */}
            <div className="h-44 relative bg-slate-200">
              <img
                src={activeSpot.imageUrl}
                alt={activeSpot.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] bg-academic-gold text-deep-navy font-bold px-2 py-0.5 rounded">
                  {activeSpot.category} 세부정보
                </span>
                <h3 className="text-base font-bold text-white mt-1">{activeSpot.name}</h3>
              </div>
            </div>

            {/* Quick Details Desk */}
            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 border-b border-[#f0eded] pb-4">
                <div className="flex items-center gap-2 text-xs text-ink-text sm:border-r border-[#e4e2e1] pr-4 shrink-0">
                  <MapPin className="w-4 h-4 text-heritage-blue" />
                  <span>위치: <strong>{activeSpot.location}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-ink-text">
                  <Phone className="w-4 h-4 text-heritage-blue" />
                  <span>행정팀 직통: <strong>{activeSpot.tel}</strong></span>
                </div>
              </div>

              <div className="text-xs text-[#43474e] leading-relaxed">
                <p className="font-semibold text-deep-navy mb-2">시설 개요 및 안내사항</p>
                {activeSpot.description}
              </div>

              {/* INTEGRATED REVOLVING FEATURE SIMULATION */}
              {activeSpot.id === 'spot-2' && ( // 중앙도서관 Study Seats
                <div className="mt-4 p-4 bg-[#f6f3f2] rounded border border-[#e4e2e1] space-y-3">
                  <div className="flex justify-between items-center border-b border-[#e4e2e1] pb-2">
                    <span className="text-xs font-bold text-deep-navy flex items-center gap-1">
                      <BookMarked className="w-3.5 h-3.5 text-heritage-blue" /> 스마트 아뜨리움 제2열람실 예약판
                    </span>
                    <span className="text-[10px] text-heritage-blue font-bold px-2 py-0.5 rounded bg-blue-50">
                      잔여석: {availableSeatsCount} / {librarySeats.length}석
                    </span>
                  </div>

                  <p className="text-[10px] text-[#73777f] leading-snug">
                    배정할 빈 사각형 번호를 누르시면 녹색(예약 가능)에서 주황색(개인 점유 배정 완료)으로 변동 처리됩니다.
                  </p>

                  <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                    {librarySeats.map((isAvailable, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleSeat(idx)}
                        className={`py-1.5 rounded text-[10px] font-bold text-center border transition-all ${
                          isAvailable
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        {idx + 1}
                        <span className="block text-[8px] font-normal font-sans">
                          {isAvailable ? '예약' : '진행'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeSpot.id === 'spot-4' && ( // 우암마을 기숙사 laundry machines
                <div className="mt-4 p-4 bg-[#fcfbfb] rounded border border-[#e4e2e1] space-y-3">
                  <div className="flex justify-between items-center border-b border-[#f0eded] pb-2">
                    <span className="text-xs font-bold text-deep-navy flex items-center gap-1">
                      <Coffee className="w-3.5 h-3.5 text-heritage-blue" /> 우암마을 공동 세탁실 가동 현황판
                    </span>
                    <span className="text-[10px] text-green-700 font-bold px-2 py-0.5 rounded bg-green-50">
                      가용 가능: 2대 대기중
                    </span>
                  </div>

                  <div className="space-y-2">
                    {laundryMachines.map((machine) => (
                      <div
                        key={machine.id}
                        className="flex justify-between items-center p-2 rounded bg-white border border-[#f0eded] text-[11px]"
                      >
                        <span className="font-semibold text-ink-text">{machine.name}</span>
                        <div className="flex items-center gap-3">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            machine.status === '사용중'
                              ? 'bg-red-50 text-red-600'
                              : 'bg-green-50 text-green-700'
                          }`}>
                            {machine.status}
                          </span>
                          <span className="text-[#73777f] font-mono">{machine.remaining}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#f6f3f2] p-4 text-center border-t border-[#e4e2e1] flex justify-between items-center">
            <span className="text-[10px] text-[#73777f]">관련 부하 담당: 청주대학교 사무시설운영처</span>
            <button
              onClick={() => alert(`해당 시설(${activeSpot.name}) 행정팀 전화 043-229-xxxx 로 국선 연결 신호가 송신됩니다 (가상통화).`)}
              className="text-[10px] bg-deep-navy text-white px-3 py-1.5 rounded font-semibold hover:bg-[#426AB3]"
            >
              종합 민원 전화걸기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
