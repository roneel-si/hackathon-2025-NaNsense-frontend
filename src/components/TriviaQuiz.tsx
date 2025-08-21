import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizState, WidgetConfig } from '../types';
import { defaultQuestions } from '../data/questions';
import { fetchQuestionsFromAPI } from '../utils/apiUtils';
import { shuffleAllQuestions, ShuffledQuestion } from '../utils/shuffleUtils';
import QuestionCard from './QuestionCard';
import ResultScreen from './ResultScreen';
import Confetti from './Confetti';
import StartScreen from './StartScreen';
import FloatingButton from './FloatingButton';

interface TriviaQuizProps {
  config?: WidgetConfig;
}

const TriviaQuiz: React.FC<TriviaQuizProps> = ({ config = {} }) => {
  const {
    questions: providedQuestions,
    timeLimit = 25, // Changed to 25 seconds
    apiUrl,
    onComplete
  } = config;

  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isAnswered: false,
    timeLeft: timeLimit,
    isGameOver: false,
    showConfetti: false
  });

  // Lifeline states
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [questionFlipUsed, setQuestionFlipUsed] = useState(false);
  const [extendTimeUsed, setExtendTimeUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);

  const currentQuestion = questions[state.currentQuestionIndex];

  // Initialize with default questions first
  useEffect(() => {
    const questionsToUse = providedQuestions || defaultQuestions;
    const shuffledQuestions = shuffleAllQuestions(questionsToUse);
    setQuestions(shuffledQuestions);
  }, [providedQuestions]);

  // Timer effect
  useEffect(() => {
    if (state.isGameOver || state.isAnswered || showStartScreen) return;

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
  }, [state.isGameOver, state.isAnswered, showStartScreen]);

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
      
      // Reset lifelines for new question
      setHiddenOptions([]);
    } else {
      // Game over
      const percentage = Math.round((state.score / questions.length) * 100);
      const shouldShowConfetti = percentage >= 80;
      
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
  }, [state.currentQuestionIndex, state.score, currentQuestion, questions.length, timeLimit, onComplete]);

  // Handle start quiz
  const handleStart = useCallback(() => {
    console.log('🚀 Quiz started!');
    
    // If API URL is provided and no questions are provided, fetch from API
    if (apiUrl && !providedQuestions) {
      console.log('🔗 Fetching questions from API:', apiUrl);
      console.log('📄 Page title being sent as prompt:', document.title);
      
      fetchQuestionsFromAPI(apiUrl)
        .then(fetchedQuestions => {
          console.log('✅ API questions received:', fetchedQuestions);
          const shuffledQuestions = shuffleAllQuestions(fetchedQuestions);
          setQuestions(shuffledQuestions);
          console.log('🔀 Questions shuffled and set:', shuffledQuestions);
          setShowStartScreen(false);
        })
        .catch(err => {
          console.error('❌ Failed to fetch questions from API:', err);
          console.log('🔄 Falling back to default questions');
          const shuffledQuestions = shuffleAllQuestions(defaultQuestions);
          setQuestions(shuffledQuestions);
          setShowStartScreen(false);
        });
    } else {
      // Use existing questions (default or provided)
      console.log('ℹ️ Using existing questions (no API call needed)');
      setShowStartScreen(false);
    }
  }, [apiUrl, providedQuestions]);

  // Handle restart
  const handleRestart = useCallback(() => {
    // Reset state first
    setState({
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
      timeLeft: timeLimit,
      isGameOver: false,
      showConfetti: false
    });
    
    // Reset lifelines
    setFiftyFiftyUsed(false);
    setQuestionFlipUsed(false);
    setExtendTimeUsed(false);
    
    // If API URL is provided and no questions are provided, fetch new questions from API
    if (apiUrl && !providedQuestions) {
      console.log('🔄 Refetching questions from API for restart:', apiUrl);
      
      fetchQuestionsFromAPI(apiUrl)
        .then(fetchedQuestions => {
          console.log('✅ New API questions received for restart:', fetchedQuestions);
          const shuffledQuestions = shuffleAllQuestions(fetchedQuestions);
          setQuestions(shuffledQuestions);
          console.log('🔀 New questions shuffled and set for restart:', shuffledQuestions);
          setShowStartScreen(true);
        })
        .catch(err => {
          console.error('❌ Failed to refetch questions from API for restart:', err);
          console.log('🔄 Falling back to reshuffling existing questions');
          // Fallback to reshuffling existing questions
          const questionsToUse = providedQuestions || defaultQuestions;
          const shuffledQuestions = shuffleAllQuestions(questionsToUse);
          setQuestions(shuffledQuestions);
          setShowStartScreen(true);
        });
    } else {
      // Use existing questions (default or provided) - just reshuffle
      console.log('ℹ️ Reshuffling existing questions for restart (no API call needed)');
      const questionsToUse = providedQuestions || defaultQuestions;
      const shuffledQuestions = shuffleAllQuestions(questionsToUse);
      setQuestions(shuffledQuestions);
      setShowStartScreen(true);
    }
  }, [timeLimit, providedQuestions, apiUrl]);

  // Handle share
  const handleShare = useCallback(() => {
    const percentage = Math.round((state.score / questions.length) * 100);
    
    const text = `🎉 I scored ${state.score}/${questions.length} (${percentage}%) on the RR Quiz Challenge! Can you beat my score? 🏆`;
    
    if (navigator.share) {
      navigator.share({
        title: 'RR Quiz Challenge',
        text: text,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(text);
      alert('Score copied to clipboard!');
    }
  }, [state.score, questions.length]);

  // Lifeline functions
  const handleFiftyFifty = useCallback(() => {
    if (fiftyFiftyUsed || state.isAnswered) return;
    
    setFiftyFiftyUsed(true);
    
    const correctIndex = currentQuestion.correctAnswer;
    const wrongOptions = currentQuestion.options
      .map((_, index) => index)
      .filter(index => index !== correctIndex);
    
    // Randomly select 2 wrong options to hide
    const shuffledWrong = wrongOptions.sort(() => Math.random() - 0.5);
    const toHide = shuffledWrong.slice(0, 2);
    
    // Store hidden options for this question
    setHiddenOptions(toHide);
  }, [fiftyFiftyUsed, state.isAnswered, currentQuestion]);

  const handleQuestionFlip = useCallback(() => {
    if (questionFlipUsed || state.isAnswered) return;
    
    setQuestionFlipUsed(true);
    
    // Create alternate question for the same topic
    const alternateQuestions = [
      {
        question: "What is the home ground of Rajasthan Royals?",
        options: ["Sawai Mansingh Stadium", "Wankhede Stadium", "Eden Gardens", "M. Chinnaswamy Stadium"],
        correctAnswer: 0,
        originalCorrectAnswer: 0,
        id: 0,
        category: 'sports',
        difficulty: 'medium' as const
      },
      {
        question: "Who was the first captain of Rajasthan Royals?",
        options: ["Shane Warne", "Rahul Dravid", "Ajinkya Rahane", "Steve Smith"],
        correctAnswer: 0,
        originalCorrectAnswer: 0,
        id: 1,
        category: 'sports',
        difficulty: 'medium' as const
      },
      {
        question: "What is the primary color of RR's jersey?",
        options: ["Blue", "Pink", "Red", "Green"],
        correctAnswer: 1,
        originalCorrectAnswer: 1,
        id: 2,
        category: 'sports',
        difficulty: 'medium' as const
      },
      {
        question: "Which year did RR win their first IPL title?",
        options: ["2008", "2009", "2010", "2011"],
        correctAnswer: 0,
        originalCorrectAnswer: 0,
        id: 3,
        category: 'sports',
        difficulty: 'medium' as const
      },
      {
        question: "Who is known as RR's 'Mr. 360'?",
        options: ["Jos Buttler", "Ben Stokes", "Sanju Samson", "Rahul Tewatia"],
        correctAnswer: 0,
        originalCorrectAnswer: 0,
        id: 4,
        category: 'sports',
        difficulty: 'medium' as const
      }
    ];
    
    // Replace current question with alternate
    const newQuestions = [...questions];
    newQuestions[state.currentQuestionIndex] = alternateQuestions[state.currentQuestionIndex % alternateQuestions.length];
    setQuestions(newQuestions);
    
    // Reset hidden options for new question
    setHiddenOptions([]);
  }, [questionFlipUsed, state.isAnswered, questions, state.currentQuestionIndex]);

  const handleExtendTime = useCallback(() => {
    if (extendTimeUsed || state.isAnswered) return;
    
    setExtendTimeUsed(true);
    setState(prev => ({
      ...prev,
      timeLeft: Math.min(prev.timeLeft + 10, 25) // Cap at 25 seconds
    }));
  }, [extendTimeUsed, state.isAnswered]);

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

  const openQuiz = () => setIsQuizOpen(true);
  const closeQuiz = () => setIsQuizOpen(false);

  // Show floating button when quiz is not open
  if (!isQuizOpen) {
    return <FloatingButton onClick={openQuiz} />;
  }

  return (
    <>
      {/* Quiz Overlay */}
      <div 
        className="quiz-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          backdropFilter: 'blur(10px)'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeQuiz();
          }
        }}
      >
        <div 
          className="quiz-container"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
            borderRadius: '20px',
            padding: 0,
            width: '90%',
            maxWidth: '650px',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid #ffd700',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Confetti 
            show={state.showConfetti} 
            onComplete={() => setState(prev => ({ ...prev, showConfetti: false }))}
          />
          
          <AnimatePresence mode="wait">
            {showStartScreen ? (
              <motion.div
                key="start"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <StartScreen 
                  onStart={handleStart}
                  onClose={closeQuiz}
                />
              </motion.div>
            ) : !state.isGameOver ? (
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
                  onClose={closeQuiz}
                  onFiftyFifty={handleFiftyFifty}
                  onQuestionFlip={handleQuestionFlip}
                  onExtendTime={handleExtendTime}
                  fiftyFiftyUsed={fiftyFiftyUsed}
                  questionFlipUsed={questionFlipUsed}
                  extendTimeUsed={extendTimeUsed}
                  hiddenOptions={hiddenOptions}
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
      </div>
    </>
  );
};

export default TriviaQuiz;
