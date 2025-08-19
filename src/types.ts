export interface Question {
  id?: number;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  multipleChoice?: boolean;
}

export interface APIQuestion {
  Question: string;
  Options: string[];
  multipleChoice: boolean;
  Answer: string[];
}

export interface APIResponse {
  data: APIQuestion[];
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  timeLeft: number;
  isGameOver: boolean;
  showConfetti: boolean;
}

export interface WidgetConfig {
  theme?: 'light' | 'dark';
  primaryColor?: string;
  secondaryColor?: string;
  timeLimit?: number;
  questions?: Question[];
  apiUrl?: string;
  onComplete?: (score: number, totalQuestions: number) => void;
}

export interface TimerProps {
  timeLeft: number;
  totalTime: number;
  isActive?: boolean;
}
