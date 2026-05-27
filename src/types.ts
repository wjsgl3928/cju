export interface NewsItem {
  id: string;
  category: '대학뉴스' | '연구성과' | '산학협력';
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  views: number;
}

export interface NoticeItem {
  id: string;
  type: '중요' | '일반';
  title: string;
  writer: string;
  date: string;
  category: '생생소식' | '학사안내' | '장학/취업';
  content: string;
  department: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credit: number;
  professor: string;
  dept: string;
  schedule: string;
  grade?: string; // e.g. A+, B0, etc for simulation
}

export interface CampusSpot {
  id: string;
  name: string;
  category: '강의동' | '편의시설' | '기숙사' | '행정';
  description: string;
  imageUrl: string;
  location: string;
  tel: string;
}

export interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
