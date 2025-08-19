import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizState, WidgetConfig, Question } from '../types';
import { defaultQuestions } from '../data/questions';
import { fetchQuestionsFromAPI } from '../utils/apiUtils';
import StadiumQuestionCard from './StadiumQuestionCard';
import StadiumResultScreen from './StadiumResultScreen';
import ConfettiAnimation from './Confetti';

interface StadiumQuizProps {
  config?: WidgetConfig;
}

const StadiumQuiz: React.FC<StadiumQuizProps> = ({ config = {} }) => {
  const {
    questions: providedQuestions,
    timeLimit = 30,
    apiUrl,
    onComplete
  } = config;

  const [questions, setQuestions] = useState<Question[]>(providedQuestions || defaultQuestions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isAnswered: false,
    timeLeft: timeLimit,
    isGameOver: false,
    showConfetti: false
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[state.currentQuestionIndex];

  // Fetch questions from API if apiUrl is provided
  useEffect(() => {
    if (apiUrl && !providedQuestions) {
      setIsLoading(true);
      setError(null);
      
      fetchQuestionsFromAPI(apiUrl)
        .then(fetchedQuestions => {
          setQuestions(fetchedQuestions);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch questions:', err);
          setError('Failed to load questions. Using default questions.');
          setQuestions(defaultQuestions);
          setIsLoading(false);
        });
    }
  }, [apiUrl, providedQuestions]);

  // Timer effect
  useEffect(() => {
    if (state.isGameOver || state.isAnswered) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
          return {
            ...prev,
            timeLeft: 0,
            isAnswered: true,
            selectedAnswer: -1
          };
        }
        return {
          ...prev,
          timeLeft: prev.timeLeft - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isGameOver, state.isAnswered]);

  // Handle answer selection
  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (state.isAnswered) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  }, [state.isAnswered, currentQuestion]);

  // Handle next question or game over
  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (state.currentQuestionIndex < questions.length - 1) {
        setState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          selectedAnswer: null,
          isAnswered: false,
          timeLeft: timeLimit
        }));
      } else {
        setState(prev => ({
          ...prev,
          isGameOver: true,
          showConfetti: true
        }));
        
        if (onComplete) {
          const finalScore = state.selectedAnswer === -1 ? state.score : state.score + (state.selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
          onComplete(finalScore, questions.length);
        }
      }
      setIsTransitioning(false);
    }, 800); // Smooth transition delay
  }, [state.currentQuestionIndex, state.score, state.selectedAnswer, currentQuestion, questions.length, timeLimit, onComplete]);

  // Handle restart
  const handleRestart = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      timeLeft: timeLimit,
      isGameOver: false,
      showConfetti: false
    });
  }, [timeLimit]);

  // Handle share
  const handleShare = useCallback(() => {
    const score = state.selectedAnswer === -1 ? state.score : state.score + (state.selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
    const percentage = Math.round((score / questions.length) * 100);
    
    const text = `🏏 I scored ${score}/${questions.length} (${percentage}%) at the Rajasthan Royals Stadium! Can you beat my score? 🏆`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Rajasthan Royals Stadium Quiz',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Score copied to clipboard!');
    }
  }, [state.score, state.selectedAnswer, currentQuestion, questions.length]);

  // Auto-advance after showing answer
  useEffect(() => {
    if (state.isAnswered && !state.isGameOver) {
      const timer = setTimeout(handleNext, 5000);
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="stadium-container">
        <div className="stadium-loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Preparing the stadium...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="stadium-container">
        <div className="stadium-error">
          <div className="error-icon">⚠️</div>
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stadium-container">
      {/* Stadium Background */}
      <div className="stadium-background">
        <div className="crowd-section crowd-top"></div>
        <div className="field-section">
          <div className="pitch"></div>
          <div className="boundary-line"></div>
        </div>
        <div className="crowd-section crowd-bottom"></div>
      </div>

      {/* Crowd animation removed - not needed */}

      <ConfettiAnimation 
        show={state.showConfetti} 
        onComplete={() => setState(prev => ({ ...prev, showConfetti: false }))}
        score={state.selectedAnswer === -1 ? state.score : state.score + (state.selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)}
        totalQuestions={questions.length}
      />
      
      <AnimatePresence mode="wait">
        {isTransitioning ? (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="stadium-transition"
          >
            <div className="transition-content">
              <div className="transition-spinner"></div>
              <p className="transition-text">Next Question...</p>
            </div>
          </motion.div>
        ) : !state.isGameOver ? (
          <motion.div
            key="stadium-question"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 1.2, type: "spring", damping: 20, stiffness: 100 }}
          >
            <StadiumQuestionCard
              question={currentQuestion}
              selectedAnswer={state.selectedAnswer}
              isAnswered={state.isAnswered}
              timeLeft={state.timeLeft}
              totalTime={timeLimit}
              onAnswerSelect={handleAnswerSelect}
              questionNumber={state.currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          </motion.div>
        ) : (
          <motion.div
            key="stadium-result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.2, type: "spring", damping: 20, stiffness: 100 }}
          >
            <StadiumResultScreen
              score={state.selectedAnswer === -1 ? state.score : state.score + (state.selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)}
              totalQuestions={questions.length}
              onRestart={handleRestart}
              onShare={handleShare}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StadiumQuiz;
