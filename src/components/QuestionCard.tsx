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
      style={{
        background: 'linear-gradient(135deg, #fff7ed 0%, #fefce8 100%)',
        boxShadow: '0 20px 40px rgba(255, 107, 53, 0.1)',
        border: '2px solid rgba(255, 107, 53, 0.1)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-center mb-3 sm:mb-4">
        <span className="text-xs sm:text-sm font-medium text-gray-600">
          Question {questionNumber}/{totalQuestions}
        </span>
      </div>

      {/* Timer */}
      <Timer timeLeft={timeLeft} totalTime={totalTime} isActive={!isAnswered} />

      {/* Question */}
      <h2
        ref={questionRef}
        className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 leading-relaxed"
      >
        {question.question}
      </h2>

      {/* Options */}
      <div ref={optionsRef} className="space-y-2 sm:space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${getOptionClass(index)} transform-gpu`}
            onClick={() => !isAnswered && onAnswerSelect(index)}
            disabled={isAnswered}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: '0 4px 15px rgba(255, 107, 53, 0.1)',
              border: '2px solid rgba(255, 107, 53, 0.1)'
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm sm:text-base">{option}</span>
              <span className="text-lg sm:text-xl">{getEmoji(index)}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg text-center transform-gpu">
          {selectedAnswer === question.correctAnswer ? (
            <div className="text-green-600 font-semibold bg-green-50 p-2 sm:p-3 rounded-xl border border-green-200 text-sm sm:text-base">
              🎉 Correct! Well done! 🎉
            </div>
          ) : (
            <div className="text-red-600 font-semibold bg-red-50 p-2 sm:p-3 rounded-xl border border-red-200 text-sm sm:text-base">
              😔 Wrong! The correct answer was: {question.options[question.correctAnswer]}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
