import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types';

interface StadiumQuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswered: boolean;
  timeLeft: number;
  totalTime: number;
  onAnswerSelect: (answerIndex: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const StadiumQuestionCard: React.FC<StadiumQuestionCardProps> = ({
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
      return selectedAnswer === index ? 'stadium-selected' : '';
    }
    
    if (selectedAnswer === -1) {
      const correctAnswer = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer[0] 
        : question.correctAnswer;
      return index === correctAnswer ? 'stadium-correct' : '';
    }
    
    const correctAnswer = Array.isArray(question.correctAnswer) 
      ? question.correctAnswer[0] 
      : question.correctAnswer;
    
    if (index === correctAnswer) {
      return 'stadium-correct';
    }
    
    if (selectedAnswer === index && index !== correctAnswer) {
      return 'stadium-incorrect';
    }
    
    return '';
  };

  const getEmoji = (index: number) => {
    if (!isAnswered) return '';
    
    if (selectedAnswer === -1) {
      const correctAnswer = typeof question.correctAnswer === 'number' 
        ? question.correctAnswer 
        : question.correctAnswer[0];
      return index === correctAnswer ? '🏏' : '';
    }
    
    const correctAnswer = typeof question.correctAnswer === 'number' 
      ? question.correctAnswer 
      : question.correctAnswer[0];
    
    if (index === correctAnswer) return '🏏';
    if (selectedAnswer === index && index !== correctAnswer) return '❌';
    return '';
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stadium entrance animation
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateY(100px) scale(0.8)';
      cardRef.current.style.opacity = '0';
      
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          cardRef.current.style.transform = 'translateY(0) scale(1)';
          cardRef.current.style.opacity = '1';
        }
      }, 100);
    }

    // Question text animation
    if (questionRef.current) {
      questionRef.current.style.opacity = '0';
      questionRef.current.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        if (questionRef.current) {
          questionRef.current.style.transition = 'all 0.6s ease-out';
          questionRef.current.style.opacity = '1';
          questionRef.current.style.transform = 'translateY(0)';
        }
      }, 600);
    }

    // Options staggered animation
    if (optionsRef.current?.children) {
      Array.from(optionsRef.current.children).forEach((child, index) => {
        (child as HTMLElement).style.opacity = '0';
        (child as HTMLElement).style.transform = 'translateX(-30px) scale(0.9)';
        
        setTimeout(() => {
          (child as HTMLElement).style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          (child as HTMLElement).style.opacity = '1';
          (child as HTMLElement).style.transform = 'translateX(0) scale(1)';
        }, 800 + index * 150);
      });
    }
  }, [question]);

  const timePercentage = (timeLeft / totalTime) * 100;

  return (
    <div
      ref={cardRef}
      className="stadium-quiz-card"
    >
      {/* Stadium Scoreboard Header */}
      <div className="stadium-scoreboard">
        <div className="scoreboard-left">
          <div className="team-info">
            <span className="team-name">Rajasthan Royals</span>
            <span className="team-score">🏏</span>
          </div>
          <div className="match-info">
            <span className="innings">Question {questionNumber}/{totalQuestions}</span>
          </div>
        </div>
        
        <div className="scoreboard-center">
          <div className="stadium-timer">
            <div className="timer-display">
              <span className="timer-label">TIME</span>
              <span className="timer-value">{timeLeft}s</span>
            </div>
            <div className="timer-progress">
              <div 
                className="timer-bar" 
                style={{ width: `${timePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="scoreboard-right">
          <div className="stadium-logo">🏟️</div>
        </div>
      </div>

      {/* Cricket Field Background */}
      <div className="cricket-field">
        <div className="field-grass"></div>
        <div className="field-lines">
          <div className="pitch-line"></div>
          <div className="boundary-circle"></div>
        </div>
      </div>

      {/* Question Section */}
      <div className="question-section">
        <h2
          ref={questionRef}
          className="stadium-question"
        >
          {question.question}
        </h2>
      </div>

      {/* Options Section */}
      <div ref={optionsRef} className="stadium-options">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            className={`stadium-option ${getOptionClass(index)}`}
            onClick={() => !isAnswered && onAnswerSelect(index)}
            disabled={isAnswered}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="option-content">
              <span className="option-text">{option}</span>
              <span className="option-emoji">{getEmoji(index)}</span>
            </div>
            <div className="option-border"></div>
          </motion.button>
        ))}
      </div>

      {/* Feedback Section */}
      {isAnswered && (
        <motion.div 
          className="stadium-feedback"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {(() => {
            if (selectedAnswer === -1) {
              const correctAnswer = Array.isArray(question.correctAnswer) 
                ? question.correctAnswer[0] 
                : question.correctAnswer;
              const correctAnswerText = question.options[correctAnswer];
              
              return (
                <div className="feedback-timeout">
                  <div className="feedback-icon">⏰</div>
                  <div className="feedback-text">
                    <span className="feedback-title">Time's Up!</span>
                    <span className="feedback-answer">Correct: {correctAnswerText}</span>
                  </div>
                </div>
              );
            }
            
            const correctAnswer = Array.isArray(question.correctAnswer) 
              ? question.correctAnswer[0] 
              : question.correctAnswer;
            const isCorrect = selectedAnswer === correctAnswer;
            const correctAnswerText = question.options[correctAnswer];
            
            return isCorrect ? (
              <div className="feedback-correct">
                <div className="feedback-icon">🏏</div>
                <div className="feedback-text">
                  <span className="feedback-title">Excellent Shot!</span>
                  <span className="feedback-answer">That's a boundary!</span>
                </div>
              </div>
            ) : (
              <div className="feedback-incorrect">
                <div className="feedback-icon">😔</div>
                <div className="feedback-text">
                  <span className="feedback-title">Not This Time</span>
                  <span className="feedback-answer">Correct: {correctAnswerText}</span>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Crowd Cheer */}
      {isAnswered && (
        <div className="crowd-cheer">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="cheer-emoji"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {selectedAnswer === question.correctAnswer ? '🎉' : '😔'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StadiumQuestionCard;
