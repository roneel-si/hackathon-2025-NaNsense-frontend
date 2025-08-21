export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  hint?: string;
}

export interface APIQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty?: string;
  category?: string;
}

export interface APIResponse {
  success: boolean;
  data: APIQuestion[];
}

export interface Lifeline {
  id: string;
  name: string;
  icon: string;
  description: string;
  used: boolean;
  available: boolean;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: number | null; // null = no selection, -1 = timeout, 0+ = selected answer index
  isAnswered: boolean;
  timeLeft: number;
  isGameOver: boolean;
  showConfetti: boolean;
  lifelines: {
    fiftyFifty: Lifeline;
    refreshQuestion: Lifeline;
    extraTime: Lifeline;
  };
  eliminatedOptions: number[];
  showHint: boolean;
  streak: number;
  bestStreak: number;
}

export interface WidgetConfig {
  theme?: 'light' | 'dark';
  timeLimit?: number;
  questions?: Question[];
  apiUrl?: string;
  onComplete?: (score: number, total: number) => void;
  showLifelines?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
}

export interface TimerProps {
  timeLeft: number;
  totalTime: number;
  isActive?: boolean;
}
