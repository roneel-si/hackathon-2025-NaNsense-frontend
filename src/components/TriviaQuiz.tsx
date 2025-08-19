import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizState, WidgetConfig, Question } from '../types';
import { defaultQuestions } from '../data/questions';
import { fetchQuestionsFromAPI } from '../utils/apiUtils';
import QuestionCard from './QuestionCard';
import ResultScreen from './ResultScreen';
import ConfettiAnimation from './Confetti';

interface TriviaQuizProps {
  config?: WidgetConfig;
}

const TriviaQuiz: React.FC<TriviaQuizProps> = ({ config = {} }) => {
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
          // Time's up - mark as answered and move to next question
          return {
            ...prev,
            timeLeft: 0,
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
  }, [state.isGameOver, state.isAnswered]);

  // Handle answer selection
  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (state.isAnswered) return;

    let isCorrect = false;
    
    if (currentQuestion.multipleChoice) {
      // For multiple choice, check if the selected answer is in the correct answers array
      const correctAnswers = Array.isArray(currentQuestion.correctAnswer) 
        ? currentQuestion.correctAnswer 
        : [currentQuestion.correctAnswer];
      isCorrect = correctAnswers.includes(answerIndex);
    } else {
      // For single choice, check if the selected answer matches the correct answer
      isCorrect = answerIndex === currentQuestion.correctAnswer;
    }
    
    setState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  }, [state.isAnswered, currentQuestion]);

  // Handle next question or game over
  const handleNext = useCallback(() => {
    if (state.currentQuestionIndex < questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
        timeLeft: timeLimit
      }));
    } else {
      // Game over
      setState(prev => ({
        ...prev,
        isGameOver: true,
        showConfetti: true
      }));
      
      // Call completion callback
      if (onComplete) {
        onComplete(state.score + (state.selectedAnswer === currentQuestion.correctAnswer ? 1 : 0), questions.length);
      }
    }
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
    const score = state.score + (state.selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
    const percentage = Math.round((score / questions.length) * 100);
    
    const text = `🎉 I scored ${score}/${questions.length} (${percentage}%) on the Sports Trivia Quiz! Can you beat my score? 🏆`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Sports Trivia Quiz',
        text: text,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(text);
      alert('Score copied to clipboard!');
    }
  }, [state.score, state.selectedAnswer, currentQuestion, questions.length]);

  // Auto-advance after showing answer
  useEffect(() => {
    if (state.isAnswered && !state.isGameOver) {
      const timer = setTimeout(handleNext, 2000);
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
      <div className="widget-container">
        <div className="quiz-card text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="widget-container">
        <div className="quiz-card text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="widget-container">
      <ConfettiAnimation 
        show={state.showConfetti} 
        onComplete={() => setState(prev => ({ ...prev, showConfetti: false }))}
        score={state.score + (state.selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)}
        totalQuestions={questions.length}
      />
      
      <AnimatePresence mode="wait">
        {!state.isGameOver ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
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
            />
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ResultScreen
              score={state.score + (state.selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)}
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

export default TriviaQuiz;
