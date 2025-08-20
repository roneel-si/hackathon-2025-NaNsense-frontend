import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizState, WidgetConfig } from '../types';
import { defaultQuestions } from '../data/questions';
import { fetchQuestionsFromAPI } from '../utils/apiUtils';
import { shuffleAllQuestions, ShuffledQuestion } from '../utils/shuffleUtils';
import QuestionCard from './QuestionCard';
import ResultScreen from './ResultScreen';
import ConfettiAnimation from './Confetti';
import StartScreen from './StartScreen';

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

  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [questionsFetched, setQuestionsFetched] = useState(false);

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

  // Initialize questions with shuffling
  useEffect(() => {
    const questionsToUse = providedQuestions || defaultQuestions;
    const shuffledQuestions = shuffleAllQuestions(questionsToUse);
    setQuestions(shuffledQuestions);
    setQuestionsFetched(true);
  }, [providedQuestions]);

  // Fetch questions from API if apiUrl is provided
  useEffect(() => {
    if (apiUrl && !providedQuestions) {
      setIsLoading(true);
      setError(null);
      
      fetchQuestionsFromAPI(apiUrl)
        .then(fetchedQuestions => {
          const shuffledQuestions = shuffleAllQuestions(fetchedQuestions);
          setQuestions(shuffledQuestions);
          setIsLoading(false);
          setQuestionsFetched(true);
        })
        .catch(err => {
          console.error('Failed to fetch questions:', err);
          setError('Failed to load questions. Using default questions.');
          const shuffledQuestions = shuffleAllQuestions(defaultQuestions);
          setQuestions(shuffledQuestions);
          setIsLoading(false);
          setQuestionsFetched(true);
        });
    }
  }, [apiUrl, providedQuestions]);

  // Timer effect
  useEffect(() => {
    if (state.isGameOver || state.isAnswered) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
          // Time's up - mark as answered with timeout (no answer selected)
          return {
            ...prev,
            timeLeft: 0,
            isAnswered: true,
            selectedAnswer: -1 // Use -1 to indicate timeout (no answer selected)
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

    // For single choice, check if the selected answer matches the correct answer
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
  }, [state.currentQuestionIndex, state.score, state.selectedAnswer, currentQuestion, questions.length, timeLimit, onComplete]);

  // Handle start quiz
  const handleStart = useCallback(() => {
    setShowStartScreen(false);
  }, []);

  // Handle restart
  const handleRestart = useCallback(() => {
    // Reshuffle questions on restart
    const questionsToUse = providedQuestions || defaultQuestions;
    const shuffledQuestions = shuffleAllQuestions(questionsToUse);
    setQuestions(shuffledQuestions);
    
    setState({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      timeLeft: timeLimit,
      isGameOver: false,
      showConfetti: false
    });
    setShowStartScreen(true);
  }, [timeLimit, providedQuestions]);

  // Handle share
  const handleShare = useCallback(() => {
    const percentage = Math.round((state.score / questions.length) * 100);
    
    const text = `🎉 I scored ${state.score}/${questions.length} (${percentage}%) on the Sports Trivia Quiz! Can you beat my score? 🏆`;
    
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
      const timer = setTimeout(handleNext, 3000); // Increased from 2000ms to 5000ms (5 seconds)
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

  // Show start screen
  if (showStartScreen) {
    return (
      <div className="widget-container">
        <StartScreen 
          onStart={handleStart}
        />
      </div>
    );
  }

  // Show loading state (only if we're past start screen and still loading)
  if (isLoading && !questionsFetched) {
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
        score={state.score}
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
              score={state.score}
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
