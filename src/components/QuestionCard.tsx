import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, Lifeline } from '../types';
import { Target, Lightbulb, RefreshCw, Zap, Clock, Star } from 'lucide-react';
import Timer from './Timer';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswered: boolean;
  timeLeft: number;
  totalTime: number;
  onAnswerSelect: (answerIndex: number) => void;
  questionNumber: number;
  totalQuestions: number;
  lifelines: {
    fiftyFifty: Lifeline;
    refreshQuestion: Lifeline;
    extraTime: Lifeline;
  };
  eliminatedOptions: number[];
  showHint: boolean;
  onUseLifeline: (lifelineId: string) => void;
  streak: number;
  compact?: boolean;
  gameStarted?: boolean;
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

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  isAnswered,
  timeLeft,
  totalTime,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
  lifelines,
  eliminatedOptions,
  showHint,
  onUseLifeline,
  streak,
  compact = false,
  gameStarted = true,
  theme
}) => {
  const getOptionClass = (index: number) => {
    if (eliminatedOptions.includes(index)) {
      return 'eliminated';
    }
    
    if (!isAnswered) {
      return selectedAnswer === index ? 'selected' : '';
    }
    
    // Handle timeout case (selectedAnswer === -1)
    if (selectedAnswer === -1) {
      const correctAnswer = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer[0] 
        : question.correctAnswer;
      return index === correctAnswer ? 'correct' : '';
    }
    
    // Handle single choice questions
    const correctAnswer = Array.isArray(question.correctAnswer) 
      ? question.correctAnswer[0] 
      : question.correctAnswer;
    
    if (index === correctAnswer) {
      return 'correct';
    }
    
    if (selectedAnswer === index && index !== correctAnswer) {
      return 'incorrect';
    }
    
    return '';
  };

  const getOptionIcon = (index: number) => {
    if (eliminatedOptions.includes(index)) return '❌';
    if (!isAnswered) return '';
    
    // Handle timeout case
    if (selectedAnswer === -1) {
      const correctAnswer = typeof question.correctAnswer === 'number' 
        ? question.correctAnswer 
        : question.correctAnswer[0];
      return index === correctAnswer ? '✅' : '';
    }
    
    // Handle normal cases
    const correctAnswer = typeof question.correctAnswer === 'number' 
      ? question.correctAnswer 
      : question.correctAnswer[0];
    
    if (index === correctAnswer) return '✅';
    if (selectedAnswer === index && index !== correctAnswer) return '❌';
    return '';
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const optionVariants = {
    idle: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const lifelineVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
    tap: { 
      scale: 0.9,
      rotate: -5,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15
      }
    },
    used: {
      scale: 0.8,
      opacity: 0.3,
      rotate: 0
    }
  };

  return (
    <motion.div
      className={`${
        compact 
          ? `h-full bg-gradient-to-br ${theme?.questionBg || 'from-slate-900 via-purple-900 to-slate-900'} rounded-lg flex flex-col` 
          : `min-h-screen bg-gradient-to-br ${theme?.questionBg || 'from-slate-900 via-purple-900 to-slate-900'} flex flex-col`
      } relative overflow-hidden`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Effects - Enhanced for full screen */}
      {!compact && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern" />
          <motion.div
            className="absolute top-[10vh] right-[10vw] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-[10vh] left-[10vw] w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}

      {/* OPTIMIZED LAYOUT - Responsive */}
      <div className={`relative z-10 ${
        compact 
          ? 'h-full flex flex-col p-fluid-sm' 
          : 'min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-fluid-md py-fluid-lg'
      }`}>
        
        {/* Header Section - Responsive */}
        <motion.div 
          className={`flex items-center justify-between ${
            compact 
              ? 'mb-fluid-xs flex-shrink-0' 
              : 'mb-fluid-md flex-shrink-0'
          }`}
          variants={itemVariants}
        >
          <div className="flex items-center gap-fluid-xs">
            <div className="bg-pink-500/90 rounded-full px-fluid-xs py-1 text-fluid-xs font-bold text-white">
              Question {questionNumber}/{totalQuestions}
            </div>
            
            {streak > 1 && (
              <motion.div
                className="flex items-center bg-yellow-500/20 rounded-full px-fluid-xs py-1 border border-yellow-500/30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-yellow-400 text-fluid-xs font-bold ml-1">{streak}</span>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-gray-400 font-medium text-fluid-xs">{timeLeft}s</span>
          </div>
        </motion.div>

        {/* Main Content Area - Responsive */}
        <div className={`${
          compact 
            ? 'flex-1 flex flex-col justify-between min-h-0' 
            : 'flex-1 flex flex-col justify-center'
        }`}>
          
          {/* Timer - Centered and Responsive */}
          <motion.div 
            variants={itemVariants} 
            className={`${
              compact 
                ? 'mb-fluid-xs flex justify-center flex-shrink-0' 
                : 'mb-fluid-md flex justify-center'
            }`}
          >
            <div className={compact ? 'scale-75 transform-gpu' : ''}>
              <Timer timeLeft={timeLeft} totalTime={totalTime} isActive={gameStarted && !isAnswered} />
            </div>
          </motion.div>
          
          {/* Question Section - Responsive */}
          <motion.div 
            className={`bg-white/10 backdrop-blur-md rounded-xl ${
              compact 
                ? 'py-fluid-xs px-fluid-xs mb-fluid-xs flex-shrink-0' 
                : 'py-fluid-sm px-fluid-md mb-fluid-md'
            } border border-white/20 shadow-lg ${
              !compact ? 'max-w-5xl mx-auto w-full' : ''
            }`}
            variants={itemVariants}
          >
            <h2 className={`${
              compact 
                ? 'text-fluid-sm font-bold leading-tight' 
                : 'text-fluid-2xl sm:text-fluid-3xl lg:text-fluid-4xl font-bold'
            } text-white text-center question-text`}>
              {question.question}
            </h2>
          </motion.div>

          {/* Lifelines Row - Responsive */}
          <motion.div 
            className={`grid grid-cols-3 ${
              compact 
                ? 'gap-1 mb-fluid-xs flex-shrink-0' 
                : 'gap-fluid-sm mb-fluid-md'
            } ${!compact ? 'max-w-2xl mx-auto w-full' : ''}`}
            variants={itemVariants}
          >
            <motion.button
              className={`lifeline-btn ${lifelines.fiftyFifty.used ? 'used' : ''} ${
                compact 
                  ? 'text-fluid-xs py-1 px-1 min-h-[2rem]' 
                  : 'text-fluid-sm py-fluid-xs px-fluid-sm min-h-[3rem] sm:min-h-[3.5rem]'
              }`}
              onClick={() => !lifelines.fiftyFifty.used && !isAnswered && onUseLifeline('fiftyFifty')}
              disabled={lifelines.fiftyFifty.used || isAnswered}
              variants={lifelineVariants}
              initial="idle"
              whileHover={!lifelines.fiftyFifty.used && !isAnswered ? "hover" : "idle"}
              whileTap={!lifelines.fiftyFifty.used && !isAnswered ? "tap" : "idle"}
              animate={lifelines.fiftyFifty.used ? "used" : "idle"}
            >
              <Target className={`${compact ? 'w-3 h-3' : 'w-5 h-5 sm:w-6 sm:h-6'}`} />
              <span className={`${compact ? 'text-fluid-xs' : 'text-fluid-sm'} font-bold`}>50:50</span>
            </motion.button>

            <motion.button
              className={`lifeline-btn ${lifelines.refreshQuestion.used ? 'used' : ''} ${
                compact 
                  ? 'text-fluid-xs py-1 px-1 min-h-[2rem]' 
                  : 'text-fluid-sm py-fluid-xs px-fluid-sm min-h-[3rem] sm:min-h-[3.5rem]'
              }`}
              onClick={() => !lifelines.refreshQuestion.used && !isAnswered && onUseLifeline('refreshQuestion')}
              disabled={lifelines.refreshQuestion.used || isAnswered}
              variants={lifelineVariants}
              initial="idle"
              whileHover={!lifelines.refreshQuestion.used && !isAnswered ? "hover" : "idle"}
              whileTap={!lifelines.refreshQuestion.used && !isAnswered ? "tap" : "idle"}
              animate={lifelines.refreshQuestion.used ? "used" : "idle"}
            >
              <RefreshCw className={`${compact ? 'w-3 h-3' : 'w-5 h-5 sm:w-6 sm:h-6'}`} />
              <span className={`${compact ? 'text-fluid-xs' : 'text-fluid-sm'} font-bold`}>Skip</span>
            </motion.button>

            <motion.button
              className={`lifeline-btn ${lifelines.extraTime.used ? 'used' : ''} ${
                compact 
                  ? 'text-fluid-xs py-1 px-1 min-h-[2rem]' 
                  : 'text-fluid-sm py-fluid-xs px-fluid-sm min-h-[3rem] sm:min-h-[3.5rem]'
              }`}
              onClick={() => !lifelines.extraTime.used && !isAnswered && onUseLifeline('extraTime')}
              disabled={lifelines.extraTime.used || isAnswered}
              variants={lifelineVariants}
              initial="idle"
              whileHover={!lifelines.extraTime.used && !isAnswered ? "hover" : "idle"}
              whileTap={!lifelines.extraTime.used && !isAnswered ? "tap" : "idle"}
              animate={lifelines.extraTime.used ? "used" : "idle"}
            >
              <Zap className={`${compact ? 'w-3 h-3' : 'w-5 h-5 sm:w-6 sm:h-6'}`} />
              <span className={`${compact ? 'text-fluid-xs' : 'text-fluid-sm'} font-bold`}>+Time</span>
            </motion.button>
          </motion.div>

          {/* Hint Section - Responsive */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                className={`bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-lg ${
                  compact 
                    ? 'p-fluid-xs mb-fluid-xs flex-shrink-0' 
                    : 'p-fluid-md mb-fluid-md'
                } border border-yellow-500/30 ${
                  !compact ? 'max-w-4xl mx-auto w-full' : ''
                }`}
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center justify-center gap-fluid-xs">
                  <Lightbulb className={`${compact ? 'w-3 h-3' : 'w-5 h-5 sm:w-6 sm:h-6'} text-yellow-400`} />
                  <span className={`${
                    compact 
                      ? 'text-fluid-xs' 
                      : 'text-fluid-base sm:text-fluid-lg'
                  } text-yellow-200 font-medium text-center`}>
                    {question.hint || "Think about the most logical answer!"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Options Section - Responsive Grid */}
          <motion.div 
            className={`grid grid-cols-1 ${
              compact 
                ? 'gap-1 flex-1 min-h-0' 
                : 'gap-fluid-sm lg:gap-fluid-md'
            } ${!compact ? 'max-w-6xl mx-auto w-full' : ''}`}
            variants={itemVariants}
          >
            {question.options.map((option, index) => {
              const optionClass = getOptionClass(index);
              const optionIcon = getOptionIcon(index);
              
              return (
                <motion.button
                  key={index}
                  className={`quiz-option ${optionClass} ${
                    compact 
                      ? 'min-h-[2.5rem] p-fluid-xs text-fluid-xs' 
                      : 'min-h-[3.5rem] sm:min-h-[4rem] p-fluid-md sm:p-fluid-lg text-fluid-base sm:text-fluid-lg'
                  }`}
                  onClick={() => !isAnswered && onAnswerSelect(index)}
                  disabled={isAnswered || eliminatedOptions.includes(index)}
                  variants={optionVariants}
                  initial="idle"
                  whileHover={!isAnswered && !eliminatedOptions.includes(index) ? "hover" : "idle"}
                  whileTap={!isAnswered && !eliminatedOptions.includes(index) ? "tap" : "idle"}
                  layout
                >
                  <div className={`option-letter ${optionClass === 'eliminated' ? 'opacity-50' : ''} ${
                    compact 
                      ? 'w-5 h-5 text-fluid-xs' 
                      : 'w-8 h-8 sm:w-10 sm:h-10 text-fluid-base sm:text-fluid-lg'
                  } flex-shrink-0`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  
                  <div className="flex-1 text-left min-w-0">
                    <span className={`${
                      compact 
                        ? 'text-fluid-xs leading-tight font-medium' 
                        : 'text-fluid-base sm:text-fluid-lg leading-relaxed font-semibold'
                    } break-words`}>
                      {option}
                    </span>
                  </div>
                  
                  {optionIcon && (
                    <motion.div
                      className={`ml-fluid-xs flex-shrink-0 ${
                        compact ? 'text-fluid-xs' : 'text-fluid-xl sm:text-fluid-2xl'
                      }`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 25,
                        delay: 0.1 
                      }}
                    >
                      {optionIcon}
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Feedback Section - Responsive */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                className={`${
                  compact 
                    ? 'mt-fluid-xs flex justify-center flex-shrink-0' 
                    : 'mt-fluid-md flex justify-center'
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: 0.2
                }}
              >
                <div className={`text-center ${
                  compact 
                    ? 'p-fluid-xs rounded-lg' 
                    : 'p-fluid-md sm:p-fluid-lg rounded-2xl'
                } border backdrop-blur-md ${
                  !compact ? 'max-w-2xl w-full' : 'w-full'
                } ${
                  selectedAnswer === -1 
                    ? 'bg-orange-500/20 border-orange-500/30 text-orange-200'
                    : selectedAnswer === (Array.isArray(question.correctAnswer) ? question.correctAnswer[0] : question.correctAnswer)
                      ? 'bg-green-500/20 border-green-500/30 text-green-200'
                      : 'bg-red-500/20 border-red-500/30 text-red-200'
                }`}>
                  
                  <div className="flex items-center justify-center gap-fluid-xs">
                    <motion.div
                      className={`${
                        compact 
                          ? 'text-fluid-xl' 
                          : 'text-fluid-4xl sm:text-fluid-5xl'
                      }`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.3
                      }}
                    >
                      {selectedAnswer === -1 
                        ? '😅' 
                        : selectedAnswer === (Array.isArray(question.correctAnswer) ? question.correctAnswer[0] : question.correctAnswer)
                          ? '🎉'
                          : '😔'
                      }
                    </motion.div>
                    
                    <div className="text-left">
                      <h3 className={`${
                        compact 
                          ? 'text-fluid-xs font-bold' 
                          : 'text-fluid-xl sm:text-fluid-2xl font-bold mb-fluid-xs'
                      } feedback-title`}>
                        {selectedAnswer === -1 
                          ? "Time's Up!" 
                          : selectedAnswer === (Array.isArray(question.correctAnswer) ? question.correctAnswer[0] : question.correctAnswer)
                            ? "Correct!"
                            : "Not Quite!"
                        }
                      </h3>
                      
                      <p className={`${
                        compact 
                          ? 'text-fluid-xs font-medium' 
                          : 'text-fluid-base sm:text-fluid-lg font-semibold'
                      } opacity-95 feedback-text`}>
                        Correct: <span className="font-bold">
                          {question.options[Array.isArray(question.correctAnswer) ? question.correctAnswer[0] : question.correctAnswer]}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Corner Decorations - Only for full screen with viewport units */}
      {!compact && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[5vh] left-[5vw] text-fluid-3xl opacity-20">🎯</div>
          <div className="absolute top-[5vh] right-[5vw] text-fluid-3xl opacity-20">⚡</div>
          <div className="absolute bottom-[5vh] left-[5vw] text-fluid-3xl opacity-20">🚀</div>
          <div className="absolute bottom-[5vh] right-[5vw] text-fluid-3xl opacity-20">🏆</div>
        </div>
      )}
    </motion.div>
  );
};

export default QuestionCard;
