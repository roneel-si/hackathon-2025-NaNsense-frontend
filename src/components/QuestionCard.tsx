import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types';
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
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  isAnswered,
  timeLeft,
  totalTime,
  onAnswerSelect,
  questionNumber,
  totalQuestions
}) => {
  const getOptionClass = (index: number) => {
    if (!isAnswered) {
      return selectedAnswer === index ? 'selected' : '';
    }
    
    if (index === question.correctAnswer) {
      return 'correct';
    }
    
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'incorrect';
    }
    
    return '';
  };

  const getEmoji = (index: number) => {
    if (!isAnswered) return '';
    
    if (index === question.correctAnswer) return '✅';
    if (selectedAnswer === index && index !== question.correctAnswer) return '❌';
    return '';
  };

  return (
    <motion.div
      className="quiz-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">
            Question {questionNumber}/{totalQuestions}
          </span>
          <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">
            {question.category}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {question.difficulty === 'easy' && <span className="text-green-500">🟢</span>}
          {question.difficulty === 'medium' && <span className="text-yellow-500">🟡</span>}
          {question.difficulty === 'hard' && <span className="text-red-500">🔴</span>}
        </div>
      </div>

      {/* Timer */}
      <Timer timeLeft={timeLeft} totalTime={totalTime} isActive={!isAnswered} />

      {/* Question */}
      <motion.h2
        className="text-xl font-bold text-gray-800 mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {question.question}
      </motion.h2>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            className={`option-button ${getOptionClass(index)}`}
            onClick={() => !isAnswered && onAnswerSelect(index)}
            disabled={isAnswered}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={!isAnswered ? { scale: 1.02 } : {}}
            whileTap={!isAnswered ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              <span className="text-xl">{getEmoji(index)}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <motion.div
          className="mt-4 p-4 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {selectedAnswer === question.correctAnswer ? (
            <div className="text-green-600 font-semibold">
              🎉 Correct! Well done! 🎉
            </div>
          ) : (
            <div className="text-red-600 font-semibold">
              😔 Wrong! The correct answer was: {question.options[question.correctAnswer]}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestionCard;
