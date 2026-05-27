import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types.ts';
import { Send, Bot, Sparkles, MessageSquare, ShieldAlert, Loader } from 'lucide-react';

export default function AdvisorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: '반갑습니다! 청주대학교 Smart 4.0 학사 지원 AI 비서, "청우(淸友)"입니다.\n\n수강신청 요령, 장학금 지원 요건, 기말고사 평가 방법, 캠퍼스 시설 안내 등 궁금하신 무엇이든 해결해 드리겠습니다. 편하게 여쭤보세요!',
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Quick Prompt FAQs
  const faqList = [
    '청주대학교의 교육 비전을 알려줘',
    '수강신청할 수 있는 인공지능 개론은?',
    '기말고사 및 성적 평가 의의신청 일정은?',
    '중앙도서관 내부 편의시설은 어떤가요?',
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: text,
          history: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('의사결정 중계 요청에 실패했습니다.');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        sender: 'bot',
        text: data.text || '죄송합니다. 정상적인 답변을 수신하지 못했습니다. 잠시 후 다시 시도해 주십시오.',
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        sender: 'bot',
        text: `죄송합니다. 학사 지원 서버 및 인공지능 연계 채널 점검 중입니다.\n\n[오류 설명]: ${err.message || 'Unknown network error'}\n\n도움말: .env 파일에 GEMINI_API_KEY가 적법하게 세팅되었는지 또는 서버 개발 환경을 확인해주십시오.`,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="bg-white rounded-xl border border-[#c3c6d0] shadow-sm flex flex-col h-[520px] overflow-hidden">
      {/* Dynamic chat header with brand colors */}
      <div className="bg-deep-navy text-white p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-academic-gold/20 flex items-center justify-center border border-academic-gold/40 text-[#FFC400]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-black text-white">청우 (淸友)</h4>
              <span className="text-[9px] bg-red-600 text-white font-bold px-1 py-0.2 rounded uppercase animate-pulse">AI 학사비서</span>
            </div>
            <p className="text-[10px] text-white/70">Cheongju AI Academic Co-Advisor</p>
          </div>
        </div>

        <div className="text-[10px] text-zinc-300 font-mono tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-academic-gold" />
          <span>Gemini Core Active</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
        {messages.map((message, index) => {
          const isBot = message.sender === 'bot';
          return (
            <div
              key={index}
              className={`flex gap-2.5 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto'}`}
              style={{ alignSelf: isBot ? 'flex-start' : 'flex-end', flexDirection: isBot ? 'row' : 'row-reverse' }}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-full bg-[#00315A] text-white shrink-0 flex items-center justify-center text-xs font-bold shadow-sm">
                  淸
                </div>
              )}

              <div className="space-y-1">
                <div
                  className={`p-3 rounded-lg text-xs leading-relaxed shadow-sm ${
                    isBot
                      ? 'bg-white text-ink-text border border-[#e4e2e1] rounded-tl-none'
                      : 'bg-deep-navy text-white rounded-tr-none'
                  } whitespace-pre-wrap`}
                >
                  {message.text}
                </div>
                <span className="text-[9px] text-[#73777f] block px-1" style={{ textAlign: isBot ? 'left' : 'right' }}>
                  {message.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Loading Spinner for Response */}
        {isLoading && (
          <div className="flex gap-2.5 max-w-[80%] mr-auto items-center">
            <div className="w-8 h-8 rounded-full bg-[#00315A] text-white shrink-0 flex items-center justify-center text-xs font-bold">
              淸
            </div>
            <div className="bg-white border border-[#e4e2e1] p-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader className="w-4 h-4 text-heritage-blue animate-spin" />
              <span className="text-[11px] text-[#73777f]">청우가 답변을 분석하고 있습니다...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Option FAQs Trigger button */}
      <div className="bg-white border-t border-[#f0eded] px-3 py-2 shrink-0 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
        {faqList.map((faq, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(faq)}
            className="text-[10px] bg-[#f6f3f2] hover:bg-[#eae8e7] text-deep-navy border border-[#e4e2e1] px-2.5 py-1.5 rounded transition-colors font-medium cursor-pointer shrink-0"
          >
            {faq}
          </button>
        ))}
      </div>

      {/* INPUT FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white border-t border-[#e4e2e1] flex items-center gap-2 shrink-0"
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="학업 및 캠퍼스 관련 질문을 자유롭게 하세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="w-full text-xs py-2.5 pl-4 pr-10 border border-[#c3c6d0] rounded outline-none focus:border-heritage-blue text-ink-text bg-white disabled:bg-zinc-50"
          />
        </div>

        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="bg-deep-navy hover:bg-heritage-blue disabled:bg-zinc-300 text-white p-2.5 rounded transition-all shrink-0 flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
