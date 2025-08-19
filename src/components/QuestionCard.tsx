import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
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
    
    // Handle multiple choice questions
    if (question.multipleChoice) {
      const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer];
      
      if (correctAnswers.includes(index)) {
        return 'correct';
      }
      
      if (selectedAnswer === index && !correctAnswers.includes(index)) {
        return 'incorrect';
      }
      
      return '';
    } else {
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
    }
  };

  const getEmoji = (index: number) => {
    if (!isAnswered) return '';
    
    // Handle multiple choice questions
    if (question.multipleChoice) {
      const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer];
      
      if (correctAnswers.includes(index)) return '🏏';
      if (selectedAnswer === index && !correctAnswers.includes(index)) return '❌';
      return '';
    } else {
      // Handle single choice questions
      const correctAnswer = typeof question.correctAnswer === 'number' 
        ? question.correctAnswer 
        : question.correctAnswer[0];
      
      if (index === correctAnswer) return '🏏';
      if (selectedAnswer === index && index !== correctAnswer) return '❌';
      return '';
    }
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Card entrance animation
    gsap.fromTo(cardRef.current,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.95,
        rotationY: -8
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 2.0, 
        ease: "back.out(1.2)"
      }
    );

    // Question text animation
    gsap.fromTo(questionRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.8, ease: "power2.out" }
    );

    // Options staggered animation
    if (optionsRef.current?.children) {
      gsap.fromTo(optionsRef.current.children,
        { 
          opacity: 0, 
          x: -20,
          scale: 0.95
        },
        { 
          opacity: 1, 
          x: 0,
          scale: 1,
          duration: 1.2, 
          stagger: 0.3,
          delay: 1.5,
          ease: "back.out(1.2)"
        }
      );
    }
  }, [question]);

  return (
    <div
      ref={cardRef}
      className="quiz-card transform-gpu"
    >
      {/* Header with Rajasthan Royals branding */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-xs sm:text-sm font-medium rr-pink">
            🏏 Question {questionNumber}/{totalQuestions}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs sm:text-sm font-medium rr-blue">
            Rajasthan Royals
          </span>
        </div>
      </div>

      {/* Timer */}
      <Timer timeLeft={timeLeft} totalTime={totalTime} isActive={!isAnswered} />

      {/* Question */}
      <div className="mb-4 sm:mb-6">
        <h2
          ref={questionRef}
          className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed"
        >
          {question.question}
        </h2>
        {question.multipleChoice && (
          <div className="mt-3 inline-block rr-gradient text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
            🎯 Multiple Choice
          </div>
        )}
      </div>

      {/* Options */}
      <div ref={optionsRef} className="space-y-3 sm:space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${getOptionClass(index)} transform-gpu`}
            onClick={() => !isAnswered && onAnswerSelect(index)}
            disabled={isAnswered}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm sm:text-base">{option}</span>
              <span className="text-lg sm:text-xl cricket-bounce">{getEmoji(index)}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div className="mt-4 sm:mt-6 p-4 sm:p-5 rounded-xl text-center transform-gpu">
          {(() => {
            let isCorrect = false;
            let correctAnswerText = '';
            
            if (question.multipleChoice) {
              const correctAnswers = Array.isArray(question.correctAnswer) 
                ? question.correctAnswer 
                : [question.correctAnswer];
              isCorrect = correctAnswers.includes(selectedAnswer || -1);
              correctAnswerText = correctAnswers.map(index => question.options[index]).join(', ');
            } else {
              const correctAnswer = Array.isArray(question.correctAnswer) 
                ? question.correctAnswer[0] 
                : question.correctAnswer;
              isCorrect = selectedAnswer === correctAnswer;
              correctAnswerText = question.options[correctAnswer];
            }
            
            return isCorrect ? (
              <div className="text-green-600 font-semibold bg-green-50 p-3 sm:p-4 rounded-xl border-2 border-green-200 text-sm sm:text-base shadow-lg">
                🏏 Excellent! That's the right answer! 🏏
              </div>
            ) : (
              <div className="text-red-600 font-semibold bg-red-50 p-3 sm:p-4 rounded-xl border-2 border-red-200 text-sm sm:text-base shadow-lg">
                😔 Not quite! The correct answer was: <span className="font-bold">{correctAnswerText}</span>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
