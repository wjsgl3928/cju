import { useState, useMemo } from 'react';
import { Course } from '../types.ts';
import { courseDatabase, initialGradeCourses } from '../data.ts';
import { Search, FolderPlus, Trash2, Award, ClipboardCheck, AlertCircle, Sparkles, BookOpen, GraduationCap } from 'lucide-react';

export default function StudentPortal() {
  const [selectedDept, setSelectedDept] = useState<string>('전체');
  const [courseSearch, setCourseSearch] = useState<string>('');
  
  // States for student academic simulation
  const [registeredCourses, setRegisteredCourses] = useState<Course[]>([]);
  const [completedRecords, setCompletedRecords] = useState<Course[]>(initialGradeCourses);
  const [creditLimit] = useState<number>(18);

  // Department List Options
  const departments = useMemo(() => {
    const list = new Set(courseDatabase.map((c) => c.dept));
    return ['전체', ...Array.from(list)];
  }, []);

  // Filtered Course Search
  const filteredCourses = useMemo(() => {
    return courseDatabase.filter((course) => {
      const matchDept = selectedDept === '전체' || course.dept === selectedDept;
      const matchSearch =
        course.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
        course.code.toLowerCase().includes(courseSearch.toLowerCase()) ||
        course.professor.toLowerCase().includes(courseSearch.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [selectedDept, courseSearch]);

  // Total current enrolled credits
  const enrolledCredits = useMemo(() => {
    return registeredCourses.reduce((sum, c) => sum + c.credit, 0);
  }, [registeredCourses]);

  // GPA calculation helper
  const gradeToScore = (grade?: string): number => {
    if (!grade) return 0;
    switch (grade) {
      case 'A+': return 4.5;
      case 'A0': return 4.0;
      case 'B+': return 3.5;
      case 'B0': return 3.0;
      case 'C+': return 2.5;
      case 'C0': return 2.0;
      case 'D+': return 1.5;
      case 'D0': return 1.0;
      case 'F': return 0.0;
      default: return 0.0; // Fail/Pass etc is excluded from GPA weight
    }
  };

  // Cumulative GPA & Statistics (Completed + Registered with mock grades)
  const fullAcademicRecords = useMemo(() => {
    return [...completedRecords, ...registeredCourses.map(c => ({
      ...c,
      grade: c.grade || 'A+' // default simulation is A+ unless adjusted
    }))];
  }, [completedRecords, registeredCourses]);

  const stats = useMemo(() => {
    let weightedScoreSum = 0;
    let totalGPAEligibleCredits = 0;
    let completedCreditsSum = 0;

    fullAcademicRecords.forEach((record) => {
      if (record.grade === 'Pass' || record.grade === 'Fail') {
        if (record.grade === 'Pass') {
          completedCreditsSum += record.credit;
        }
        return;
      }
      
      const score = gradeToScore(record.grade);
      if (record.grade !== 'F' && record.grade) {
        completedCreditsSum += record.credit;
      }
      
      weightedScoreSum += score * record.credit;
      totalGPAEligibleCredits += record.credit;
    });

    const gpa = totalGPAEligibleCredits > 0 ? (weightedScoreSum / totalGPAEligibleCredits) : 0;
    return {
      gpa: parseFloat(gpa.toFixed(2)),
      completedCredits: completedCreditsSum,
      totalCount: fullAcademicRecords.length
    };
  }, [fullAcademicRecords]);

  // Register Handler
  const handleEnroll = (course: Course) => {
    if (registeredCourses.some((c) => c.id === course.id)) {
      alert('이미 등록(장바구니 담기) 완료된 교수 교과목입니다.');
      return;
    }
    if (enrolledCredits + course.credit > creditLimit) {
      alert(`최대 수강 신청 가능 한도는 ${creditLimit}학점입니다. 학점 균형 배정을 확인하십시오.`);
      return;
    }
    // Enroll with default mock student grade
    setRegisteredCourses([...registeredCourses, { ...course, grade: 'A+' }]);
  };

  // Withdraw Handler
  const handleDrop = (id: string) => {
    setRegisteredCourses(registeredCourses.filter((c) => c.id !== id));
  };

  // Edit Simulated Grade
  const handleGradeChange = (id: string, newGrade: string, isCompletedRecord: boolean) => {
    if (isCompletedRecord) {
      setCompletedRecords(completedRecords.map(c => c.id === id ? { ...c, grade: newGrade } : c));
    } else {
      setRegisteredCourses(registeredCourses.map(c => c.id === id ? { ...c, grade: newGrade } : c));
    }
  };

  return (
    <div className="space-y-8">
      {/* GPA & CREDIT TRACKER BANNER (Visual Dial Header) */}
      <div className="bg-white rounded-xl p-6 border border-[#c3c6d0] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* GPA Circle Gauge */}
        <div className="flex items-center gap-4 border-r border-transparent md:border-[#e4e2e1] pr-4">
          <div className="w-20 h-20 rounded-full border-4 border-academic-gold flex flex-col items-center justify-center bg-amber-50 shrink-0">
            <span className="text-2xl font-black text-deep-navy">{stats.gpa}</span>
            <span className="text-[9px] font-bold text-[#73777f] uppercase">/ 4.5 GPA</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-heritage-blue font-bold font-display px-2 py-0.5 rounded bg-blue-50">학사성세 비전</span>
            </div>
            <h3 className="text-sm font-bold text-ink-text mt-1.5">종합 평점 성적</h3>
            <p className="text-[11px] text-[#73777f] mt-0.5">
              현재 시뮬레이션 기반 추산 학업성취 평점입니다.
            </p>
          </div>
        </div>

        {/* Completion Bar Gauge */}
        <div className="md:px-4 border-r border-transparent md:border-[#e4e2e1]">
          <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-deep-navy">
            <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4 text-heritage-blue" /> 취득학점 시뮬레이터</span>
            <span>{stats.completedCredits} / 120 학점</span>
          </div>
          <div className="w-full bg-[#f0eded] h-3 rounded-full overflow-hidden">
            <div 
              className="bg-heritage-blue h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min((stats.completedCredits / 120) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-[#73777f] mt-2">
            졸업 이수 요건 (120학점) 대비 <strong className="text-deep-navy">{Math.round((stats.completedCredits / 120) * 100)}%</strong>가 완료되었습니다.
          </p>
        </div>

        {/* Info panel */}
        <div className="md:pl-4 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-red-600 font-bold bg-red-50 px-2 py-1 rounded">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>수강신청 제한 한도: {enrolledCredits} / {creditLimit}학점</span>
          </div>
          <p className="text-[11px] text-[#73777f] leading-relaxed">
            아래 개방된 전공/교양 교과목 목록에서 수강 신청을 하거나 완료된 평점을 임의 수정하여 실시간 학계 성적 등락을 시뮬레이션 할 수 있습니다. 미국/유럽권 교환 프로그램 가산점에 반영됩니다.
          </p>
        </div>
      </div>

      {/* CORE WORKSPACE: FIND & REGISTER VS SIMULATE PLAN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COMPONENT: Course Finder Desk (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-[#c3c6d0] p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0eded] pb-3">
              <h3 className="text-sm font-bold text-deep-navy flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-heritage-blue" /> 개설 학부 교과목 편람 검색
              </h3>
              
              {/* Category selector */}
              <div className="flex flex-wrap gap-1.5">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`text-[10px] px-2.5 py-1 rounded transition-colors font-semibold ${
                      selectedDept === dept
                        ? 'bg-deep-navy text-white'
                        : 'bg-[#f6f3f2] text-[#73777f] hover:bg-[#eae8e7]'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyword searching */}
            <div className="relative">
              <input
                type="text"
                placeholder="교과목명, 코드 또는 교수명 실시간 탐색..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="w-full text-xs py-2 pl-9 pr-4 bg-white border border-[#c3c6d0] rounded focus:outline-none focus:border-heritage-blue text-ink-text text-ellipsis"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#73777f]" />
            </div>

            {/* 편람 강의 목록 */}
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {filteredCourses.length === 0 ? (
                <div className="text-center p-12 text-[#73777f] text-xs">
                  개설 조건에 매칭되는 대학 학과부 강의가 존재하지 않습니다.
                </div>
              ) : (
                filteredCourses.map((course) => {
                  const isRegistered = registeredCourses.some(c => c.id === course.id);
                  return (
                    <div 
                      key={course.id}
                      className="p-3 bg-white border border-[#e4e2e1] rounded hover:border-heritage-blue transition-colors flex justify-between items-center gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-heritage-blue font-display px-1.5 py-0.5 rounded bg-blue-50">
                            {course.code}
                          </span>
                          <span className="text-[10px] font-semibold text-deep-navy bg-[#ffdf99] px-1.5 py-0.5 rounded">
                            {course.credit}학점
                          </span>
                          <span className="text-[10px] text-[#73777f]">{course.dept}</span>
                        </div>
                        <h4 className="text-xs font-bold text-ink-text">{course.name}</h4>
                        <p className="text-[10px] text-[#73777f]">
                          담당: {course.professor} | 시간표: {course.schedule}
                        </p>
                      </div>

                      <button
                        onClick={() => handleEnroll(course)}
                        disabled={isRegistered}
                        className={`text-[10px] font-bold px-3 py-1.5 rounded inline-flex items-center gap-1 transition-all shrink-0 ${
                          isRegistered
                            ? 'bg-[#eae8e7] text-[#73777f] cursor-not-allowed'
                            : 'bg-deep-navy text-white hover:bg-[#426AB3]'
                        }`}
                      >
                        <FolderPlus className="w-3.5 h-3.5" />
                        {isRegistered ? '신청완료' : '수강신청'}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENT: Simulator Sheet (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 수강신청 장바구니 리스트 */}
          <div className="bg-white rounded-xl border border-[#c3c6d0] p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-[#f0eded] pb-3">
              <h3 className="text-sm font-bold text-deep-navy flex items-center gap-1.5">
                <ClipboardCheck className="w-4 h-4 text-heritage-blue" /> 이번 학기 신청 학사 목록
              </h3>
              <span className="text-xs text-heritage-blue font-extrabold px-2 py-0.5 rounded bg-blue-50">
                {enrolledCredits} / {creditLimit} 학점
              </span>
            </div>

            {registeredCourses.length === 0 ? (
              <div className="p-8 text-center text-[#73777f] text-xs border border-dashed border-[#e4e2e1] rounded">
                왼쪽 강의목록에서 수강신청 버튼을 누르면 이수 예정 성적이 이 영역에 시뮬레이션 산출물로 추가됩니다.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto">
                {registeredCourses.map((course) => (
                  <div 
                    key={course.id}
                    className="p-3 bg-[#f6f3f2] border border-[#e4e2e1] rounded-lg flex justify-between items-center gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="font-extrabold text-[#426AB3]">{course.code}</span>
                        <span className="text-deep-navy">({course.credit}학점)</span>
                      </div>
                      <h4 className="text-xs font-bold text-ink-text truncate mt-0.5">
                        {course.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {/* Interactive grade select */}
                      <select
                        value={course.grade || 'A+'}
                        onChange={(e) => handleGradeChange(course.id, e.target.value, false)}
                        className="text-xs px-1.5 py-1 border border-[#c3c6d0] bg-white rounded font-bold text-deep-navy focus:outline-none"
                      >
                        <option value="A+">A+ (4.5)</option>
                        <option value="A0">A0 (4.0)</option>
                        <option value="B+">B+ (3.5)</option>
                        <option value="B0">B0 (3.0)</option>
                        <option value="C+">C+ (2.5)</option>
                        <option value="C0">C0 (2.0)</option>
                        <option value="D+">D+ (1.5)</option>
                        <option value="D0">D0 (1.0)</option>
                        <option value="F">F (0.0)</option>
                      </select>

                      <button
                        onClick={() => handleDrop(course.id)}
                        className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded text-[#73777f] transition-all"
                        title="drop course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 기 취득 성적 일람표 (Completed records edit) */}
          <div className="bg-white rounded-xl border border-[#c3c6d0] p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-deep-navy flex items-center gap-1.5 border-b border-[#f0eded] pb-3">
              <Award className="w-4 h-4 text-amber-500" /> 이전 학기 성적 증빙서 (수정 가능)
            </h3>
            
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto">
              {completedRecords.map((course) => (
                <div 
                  key={course.id}
                  className="p-2.5 bg-amber-50/50 border border-amber-200/60 rounded flex justify-between items-center gap-2"
                >
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-[#73777f] block">
                      {course.code} / {course.professor}
                    </span>
                    <h4 className="text-xs font-bold text-ink-text truncate mt-0.5">
                      {course.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] text-deep-navy font-semibold">
                      {course.credit}학점
                    </span>
                    <select
                      value={course.grade}
                      onChange={(e) => handleGradeChange(course.id, e.target.value, true)}
                      className="text-xs px-1 py-1 bg-white border border-[#c3c6d0] rounded font-bold text-deep-navy focus:outline-none"
                    >
                      <option value="A+">A+ (4.5)</option>
                      <option value="A0">A0 (4.0)</option>
                      <option value="B+">B+ (3.5)</option>
                      <option value="B0">B0 (3.0)</option>
                      <option value="C+">C+ (2.5)</option>
                      <option value="C0">C0 (2.0)</option>
                      <option value="D+">D+ (1.5)</option>
                      <option value="D0">D0 (1.0)</option>
                      <option value="F">F (0.0)</option>
                      <option value="Pass">Pass</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-800 leading-normal flex gap-1.5 items-start">
              <Sparkles className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
              <span>
                위 취득성적 조정을 활용하면 전공/교양별 평점을 실시간 확인하여 다음 하계 계절수강 소요 학점을 유비무환으로 안배할 수 있습니다.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
