import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizState, WidgetConfig } from '../types';
import { shuffleAllQuestions, ShuffledQuestion } from '../utils/shuffleUtils';
import QuestionCard from './QuestionCard';
import ResultScreen from './ResultScreen';
import ConfettiAnimation from './Confetti';
import StartScreen from './StartScreen';

interface TriviaQuizProps {
  config?: WidgetConfig;
  compact?: boolean;
  onReload?: () => void;
  onStartQuiz?: () => Promise<void>;
  theme?: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    button: string;
    text: string;
    border: string;
    glow: string;
    modalBg: string;
    startBg: string;
    questionBg: string;
  };
}

const TriviaQuiz: React.FC<TriviaQuizProps> = ({ config = {}, compact = false, onReload, onStartQuiz, theme }) => {
  const {
    questions: providedQuestions,
    timeLimit = 25,
    apiUrl,
    onComplete
  } = config;

  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize lifelines
  const initializeLifelines = () => ({
    fiftyFifty: {
      id: 'fiftyFifty',
      name: '50:50',
      icon: '🎯',
      description: 'Remove 2 wrong answers',
      used: false,
      available: true
    },
    refreshQuestion: {
      id: 'refreshQuestion',
      name: 'Skip',
      icon: '🔄',
      description: 'Skip the question',
      used: false,
      available: true
    },
    extraTime: {
      id: 'extraTime',
      name: '+Time',
      icon: '⚡',
      description: 'Add 15 seconds',
      used: false,
      available: true
    }
  });

  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isAnswered: false,
    timeLeft: timeLimit,
    isGameOver: false,
    showConfetti: false,
    lifelines: initializeLifelines(),
    eliminatedOptions: [],
    showHint: false,
    streak: 0,
    bestStreak: 0
  });

  const currentQuestion = questions[state.currentQuestionIndex];
  const [timeBonus, setTimeBonus] = useState(0);

  // Initialize questions with shuffling
  useEffect(() => {
    if (!apiUrl && providedQuestions) {
      const shuffledQuestions = shuffleAllQuestions(providedQuestions);
      setQuestions(shuffledQuestions);
    }
    // Removed default questions fallback - only use API or provided questions
  }, [providedQuestions, apiUrl]);

  // Handle start quiz
  const handleStart = useCallback(async () => {
    // If onStartQuiz is provided, call it first (for loading state handling)
    if (onStartQuiz) {
      await onStartQuiz();
    }
    
    if (questions.length > 0) {
      // Questions are available, start the quiz
      setShowStartScreen(false);
      setGameStarted(true); // Start the timer now
    } else {
      // No questions available
      setError('No questions available to start the quiz');
    }
  }, [questions.length, onStartQuiz]);

  // Handle restart
  const handleRestart = useCallback(async () => {
    // Ask parent to reload fresh questions
    if (onReload) {
      try {
        await onReload();
      } catch (_) {}
    }

    // Reset all state
    setState({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      timeLeft: timeLimit,
      isGameOver: false,
      showConfetti: false,
      lifelines: initializeLifelines(),
      eliminatedOptions: [],
      showHint: false,
      streak: 0,
      bestStreak: 0
    });
    setTimeBonus(0);
    setShowStartScreen(true);
    setGameStarted(false); // Reset game started state
    setError(null);
    
    // If we already have providedQuestions, reshuffle while waiting onReload
    if (providedQuestions && providedQuestions.length > 0) {
      const shuffledQuestions = shuffleAllQuestions(providedQuestions);
      setQuestions(shuffledQuestions);
    }
  }, [timeLimit, providedQuestions, onReload]);

  // Handle next question or game over
  const handleNext = useCallback(() => {
    if (state.currentQuestionIndex < questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
        timeLeft: timeLimit,
        eliminatedOptions: [],
        showHint: false
      }));
    } else {
      // Game over
      const percentage = Math.round((state.score / questions.length) * 100);
      const shouldShowConfetti = percentage > 75;
      
      setState(prev => ({
        ...prev,
        isGameOver: true,
        showConfetti: shouldShowConfetti
      }));
      
      // Call completion callback
      if (onComplete) {
        onComplete(state.score, questions.length);
      }
    }
  }, [state.currentQuestionIndex, state.score, questions.length, timeLimit, onComplete]);

  // Handle share
  const handleShare = useCallback(() => {
    const percentage = Math.round((state.score / questions.length) * 100);
    const totalScore = Math.round(state.score * 10 + timeBonus);
    
    const text = `🎮 I just scored ${state.score}/${questions.length} (${percentage}%) with ${totalScore} total points on Quiz Master! 🏆 Can you beat my score? 🚀`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz Master - Challenge Complete!',
        text: text,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(text);
      alert('Score copied to clipboard!');
    }
  }, [state.score, questions.length, timeBonus]);

  // Auto-advance after showing answer
  useEffect(() => {
    if (state.isAnswered && !state.isGameOver) {
      const timer = setTimeout(handleNext, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.isAnswered, state.isGameOver, handleNext]);

  // Hide confetti after animation
  useEffect(() => {
    if (state.showConfetti) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, showConfetti: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.showConfetti]);

  // Timer effect - only start when game has started
  useEffect(() => {
    if (!gameStarted || state.isGameOver || state.isAnswered) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
          // Time's up - auto-select timeout
          return {
            ...prev,
            timeLeft: 0,
            selectedAnswer: -1, // -1 indicates timeout
            isAnswered: true
          };
        }
        return {
          ...prev,
          timeLeft: prev.timeLeft - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, state.isGameOver, state.isAnswered, state.currentQuestionIndex]);

  // Handle answer selection
  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (state.isAnswered) return;

    const correctAnswer = Array.isArray(currentQuestion.correctAnswer) 
      ? currentQuestion.correctAnswer[0] 
      : currentQuestion.correctAnswer;
    
    const isCorrect = answerIndex === correctAnswer;
    const newScore = isCorrect ? state.score + 1 : state.score;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newBestStreak = Math.max(state.bestStreak, newStreak);
    
    // Calculate time bonus (more time left = more bonus)
    const bonus = isCorrect ? Math.max(0, Math.floor(state.timeLeft / 5)) : 0;
    setTimeBonus(prev => prev + bonus);

    setState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isAnswered: true,
      score: newScore,
      streak: newStreak,
      bestStreak: newBestStreak
    }));
  }, [state.isAnswered, state.score, state.streak, state.bestStreak, state.timeLeft, currentQuestion]);

  // Handle lifeline usage
  const handleUseLifeline = useCallback((lifelineId: string) => {
    if (state.isAnswered) return;

    setState(prev => {
      const newLifelines = { ...prev.lifelines };
      
      switch (lifelineId) {
        case 'fiftyFifty':
          if (!newLifelines.fiftyFifty.used) {
            newLifelines.fiftyFifty.used = true;
            
            // Find correct answer
            const correctAnswer = Array.isArray(currentQuestion.correctAnswer) 
              ? currentQuestion.correctAnswer[0] 
              : currentQuestion.correctAnswer;
            
            // Get all wrong answer indices
            const wrongAnswers = currentQuestion.options
              .map((_, index) => index)
              .filter(index => index !== correctAnswer);
            
            // Randomly select 2 wrong answers to eliminate
            const toEliminate = wrongAnswers
              .sort(() => Math.random() - 0.5)
              .slice(0, 2);
            
            return {
              ...prev,
              lifelines: newLifelines,
              eliminatedOptions: [...prev.eliminatedOptions, ...toEliminate]
            };
          }
          break;
          
        case 'refreshQuestion':
          if (!newLifelines.refreshQuestion.used) {
            newLifelines.refreshQuestion.used = true;
            // Skip to next question
            setTimeout(() => {
              if (prev.currentQuestionIndex < questions.length - 1) {
                setState(current => ({
                  ...current,
                  currentQuestionIndex: current.currentQuestionIndex + 1,
                  selectedAnswer: null,
                  isAnswered: false,
                  timeLeft: timeLimit,
                  eliminatedOptions: [],
                  showHint: false,
                  lifelines: newLifelines
                }));
              }
            }, 100);
          }
          break;
          
        case 'extraTime':
          if (!newLifelines.extraTime.used) {
            newLifelines.extraTime.used = true;
            return {
              ...prev,
              lifelines: newLifelines,
              timeLeft: Math.min(prev.timeLeft + 15, timeLimit + 15)
            };
          }
          break;
      }
      
      return { ...prev, lifelines: newLifelines };
    });
  }, [state.isAnswered, currentQuestion, questions.length, timeLimit]);

  // Show start screen
  if (showStartScreen) {
    return <StartScreen onStart={handleStart} compact={compact} theme={theme} />;
  }

  // Show error state - Responsive
  if (error) {
    return (
      <div className={`${
        compact 
          ? 'h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg flex items-center justify-center' 
          : 'min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'
      }`}>
        <div className="text-center max-w-md mx-auto p-fluid-md">
          <div className="text-red-400 mb-fluid-sm text-fluid-4xl">❌</div>
          <h2 className="text-white text-fluid-xl font-bold mb-fluid-xs">Error</h2>
          <p className="text-gray-300 text-fluid-sm mb-fluid-sm">
            {error}
          </p>
          <button
            onClick={handleRestart}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-fluid-md py-fluid-xs rounded-lg font-semibold hover:opacity-90 transition-opacity text-fluid-sm"
          >
            Retry API Connection
          </button>
        </div>
      </div>
    );
  }

  // Show message if no API URL and no provided questions - Responsive
  if (!apiUrl && !providedQuestions) {
    return (
      <div className={`${
        compact 
          ? 'h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg flex items-center justify-center' 
          : 'min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'
      }`}>
        <div className="text-center max-w-md mx-auto p-fluid-md">
          <div className="text-yellow-400 mb-fluid-sm text-fluid-4xl">⚙️</div>
          <h2 className="text-white text-fluid-xl font-bold mb-fluid-xs">Configuration Required</h2>
          <p className="text-gray-300 text-fluid-sm mb-fluid-sm">
            Please provide an API URL or questions to start the quiz.
          </p>
          <div className="text-gray-400 text-fluid-xs">
            This quiz widget requires either an API endpoint or pre-defined questions to function.
          </div>
        </div>
      </div>
    );
  }

  // Show message if we don't have any questions loaded - Responsive
  if (!showStartScreen && questions.length === 0 && !error) {
    return (
      <div className={`${
        compact 
          ? 'h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg flex items-center justify-center' 
          : 'min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'
      }`}>
        <div className="text-center max-w-md mx-auto p-fluid-md">
          <div className="text-blue-400 mb-fluid-sm text-fluid-4xl">📝</div>
          <h2 className="text-white text-fluid-xl font-bold mb-fluid-xs">No Questions Available</h2>
          <p className="text-gray-300 text-fluid-sm mb-fluid-sm">
            Questions are still being loaded or none were received from the API.
          </p>
          <button
            onClick={handleRestart}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-fluid-md py-fluid-xs rounded-lg font-semibold hover:opacity-90 transition-opacity text-fluid-sm"
          >
            Reload Questions
          </button>
        </div>
      </div>
    );
  }

  // Ensure we have a valid current question before rendering - Responsive
  if (!currentQuestion) {
    return (
      <div className={`${
        compact 
          ? 'h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg flex items-center justify-center' 
          : 'min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'
      }`}>
        <div className="text-center max-w-md mx-auto p-fluid-md">
          <div className="text-orange-400 mb-fluid-sm text-fluid-4xl">🔄</div>
          <h2 className="text-white text-fluid-xl font-bold mb-fluid-xs">Loading Question...</h2>
          <p className="text-gray-300 text-fluid-sm">
            Please wait while we prepare your next question.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="trivia-widget-container">
      <ConfettiAnimation 
        show={state.showConfetti} 
        onComplete={() => setState(prev => ({ ...prev, showConfetti: false }))}
        score={state.score}
        totalQuestions={questions.length}
      />
      
      <AnimatePresence mode="wait">
        {!state.isGameOver ? (
          <motion.div
            key="question"
            className={compact ? "h-full" : "min-h-screen"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.5
            }}
          >
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={state.selectedAnswer}
              isAnswered={state.isAnswered}
              timeLeft={state.timeLeft}
              totalTime={timeLimit}
              onAnswerSelect={handleAnswerSelect}
              questionNumber={state.currentQuestionIndex + 1}
              totalQuestions={questions.length}
              lifelines={state.lifelines}
              eliminatedOptions={state.eliminatedOptions}
              showHint={state.showHint}
              onUseLifeline={handleUseLifeline}
              streak={state.streak}
              compact={compact}
              gameStarted={gameStarted}
              theme={theme}
            />
          </motion.div>
        ) : (
          <motion.div
            key="result"
            className={compact ? "h-full" : "min-h-screen"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.5 }}
          >
            <ResultScreen
              score={state.score}
              totalQuestions={questions.length}
              onRestart={handleRestart}
              onShare={handleShare}
              streak={state.bestStreak}
              timeBonus={timeBonus}
              accuracy={Math.round((state.score / questions.length) * 100)}
              compact={compact}
              theme={theme}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TriviaQuiz;
