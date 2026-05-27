import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser limit and parser
  app.use(express.json());

  // Initialize server-side Gemini client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not defined under environment variables. Check Secrets panel.");
  }

  // AI Chat advisor proxy endpoint
  app.post('/api/chat', async (req, res) => {
    const { prompt, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: '질문내용(prompt)이 공백일 수 없습니다.' });
    }

    if (!ai) {
      return res.status(503).json({ 
        text: '죄송합니다. 현재 AI 학사비서 "청우"의 핵심 지능망(Gemini API)이 구성되지 않았습니다.\n\nAI Studio UI의 [Settings > Secrets] 메뉴에서 GEMINI_API_KEY를 적법하게 바인딩 해주시면 실시간 정상 소통이 가능합니다.' 
      });
    }

    try {
      // Map previous history elements to Gemini contents schema
      const formattedContents = [];
      
      if (history && Array.isArray(history)) {
        // Only include up to 8 conversation rounds to prevent token blowup in flash queries
        const cutHistory = history.slice(-8);
        for (const turn of cutHistory) {
          formattedContents.push({
            role: turn.role === 'user' ? 'user' : 'model',
            parts: [{ text: turn.text }]
          });
        }
      }

      // Add the final user prompt
      formattedContents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      const systemInstruction = `당신은 청주대학교(Cheongju University)의 통합 학사관리 비서이자 진로 설계 AI 멘토인 "청우(淸友)"입니다.
학교에 대해 유용하고 권위 있으며, 정중하고 친절한 태도로 한국어로 자세히 답변해주십시오.

대학 및 학사 운영 가이드라인:
1. 대학 역사 & 비전: 청주대학교는 1947년에 설립된 중부권 최고의 역사를 자랑하는 명문 평생사학입니다. 교시 비전은 "실학성세 4.0 (實學成世: 실사구시 가치로 세상을 이롭게 한다)"입니다.
2. 학점 체계: 졸업 조건은 120학점이며, 수강신청 학점 상한은 학기당 18학점입니다. 성적평가는 최대 4.5만점 기준(A+=4.5, A0=4.0, B+=3.5, B0=3.0, C+=2.5, C0=2.0, D+=1.5, D0=1.0, F=0.0)입니다.
3. 개설 전공 예시:
   - AI 융합학부: 인공지능 개론(AAI101, 3학점), 컴퓨터 비전 실무 및 머신러닝(AAI210, 3학점)
   - 컴퓨터공학과: 고급 데이터구조 및 알고리즘(CS301, 3학점), 풀스택 웹 애플리케이션 프레임워크(CS204, 3학점)
   - 빅데이터통계학과: 데이터 마이닝 지능적 비즈니스 분석(CUP331, 3학점)
   - 교양: 대학영어(GED102, 2학점), 실학적 기업가정신(GED205, 2학점)
4. 공지 가이드: 2026학년도 1학기 기말고사는 전면 대면 평가 예정이고 성적 정정 신청은 6월 15일~6월 19일입니다. 장학지원 담당은 '학생처 장학지원팀'입니다.
5. 공간 가이드: 본관(청석관), 중앙도서관 (첨단 러닝 아뜨리움 보유), 새천년종합정보관 (소프트웨어/AI 연구 거점), 우암마을 (친환경 스마트 생활관)이 있습니다.

답변할 때는 Markdown 형식을 적절히 사용하여 글머리 기호(List), 굵은 글씨(**bold**) 등을 써서 정보가 눈에 쏙 들어오게 깔끔히 요약하십시오. 질문에 적극 수용하여 친절하게 경어를 사용해 청주대 학우로 존중하는 대화를 나누십시오.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || '죄송합니다. 답변을 생성하지 못했습니다.';
      res.json({ text: replyText });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: error.message || 'Error occurred while calling Gemini API.' });
    }
  });

  // Serve static assets / Vite middleware routing
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Host configuration
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Cheongju University Portal server successfully booted on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server startup crash:", err);
});
