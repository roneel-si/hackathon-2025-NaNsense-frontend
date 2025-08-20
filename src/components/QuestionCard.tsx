import React, { useEffect, useState } from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswered: boolean;
  timeLeft: number;
  totalTime: number;
  onAnswerSelect: (answerIndex: number) => void;
  questionNumber: number;
  totalQuestions: number;
  onClose: () => void;
  onFiftyFifty: () => void;
  onQuestionFlip: () => void;
  onExtendTime: () => void;
  fiftyFiftyUsed: boolean;
  questionFlipUsed: boolean;
  extendTimeUsed: boolean;
  hiddenOptions: number[];
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
  onClose,
  onFiftyFifty,
  onQuestionFlip,
  onExtendTime,
  fiftyFiftyUsed,
  questionFlipUsed,
  extendTimeUsed,
  hiddenOptions
}) => {
  const [animateOptions, setAnimateOptions] = useState(false);

  useEffect(() => {
    // Reset animation state for new question
    setAnimateOptions(false);
    
    // Animate options after a short delay
    const timer = setTimeout(() => setAnimateOptions(true), 100);
    return () => clearTimeout(timer);
  }, [questionNumber]); // Use questionNumber instead of question to ensure consistent timing

  const getOptionClass = (index: number) => {
    let className = 'option';
    if (animateOptions) className += ' animate';
    if (isAnswered) className += ' disabled';
    if (selectedAnswer === index) className += ' selected';
    if (isAnswered && index === question.correctAnswer) className += ' correct';
    if (isAnswered && selectedAnswer === index && index !== question.correctAnswer) className += ' incorrect';
    if (hiddenOptions.includes(index)) className += ' hidden';
    return className;
  };

  const getTimerColor = () => {
    if (timeLeft <= 5) return '#ff4444';
    return '#ffd700';
  };

  return (
    <div className="quiz-game">
      {/* Quiz Header */}
      <div 
        className="quiz-header"
        style={{
          background: 'linear-gradient(135deg, #e91e63, #ff6b9d)',
          padding: '25px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <button 
          className="close-btn" 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            zIndex: 3,
            transition: 'all 0.3s ease'
          }}
        >
          &times;
        </button>
        <div 
          className="quiz-title"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: 'white',
            marginBottom: '10px',
            position: 'relative',
            zIndex: 2
          }}
        >
          🏏 RR Quiz Challenge
        </div>
        <div 
          className="quiz-subtitle"
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '16px',
            position: 'relative',
            zIndex: 2
          }}
        >
          Test your Rajasthan Royals knowledge!
        </div>
      </div>

      {/* Timer and Question Counter */}
      <div 
        className="timer-container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 30px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div 
          className="question-counter"
          style={{
            background: 'linear-gradient(90deg, #ffd700, #ffed4e)',
            color: '#1a1a2e',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 600,
            fontSize: '14px'
          }}
        >
          Question {questionNumber} of {totalQuestions}
        </div>
        <div 
          className="timer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            color: 'white',
            fontWeight: 600
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>⏱️</span>
            <span style={{ fontSize: '16px', fontWeight: 700, color: getTimerColor() }}>
              {timeLeft}s
            </span>
          </div>
          <div 
            className="timer-progress-container"
            style={{
              width: '120px',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div 
              className="timer-progress-bar"
              style={{
                height: '100%',
                background: timeLeft <= 5 
                  ? 'linear-gradient(90deg, #ff4444, #ff6666)' 
                  : 'linear-gradient(90deg, #ffd700, #ffed4e)',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                width: `${(timeLeft / totalTime) * 100}%`,
                boxShadow: timeLeft <= 5 
                  ? '0 0 10px rgba(255, 68, 68, 0.5)' 
                  : '0 0 10px rgba(255, 215, 0, 0.3)'
              }}
            />
            {timeLeft <= 5 && (
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'timerPulse 0.8s ease-in-out infinite'
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Lifelines */}
      <div 
        className="lifelines"
        style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          padding: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div 
          className={`lifeline ${fiftyFiftyUsed ? 'used' : ''}`}
          onClick={!fiftyFiftyUsed && !isAnswered ? onFiftyFifty : undefined}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid #ffd700',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '25px',
            cursor: fiftyFiftyUsed || isAnswered ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: fiftyFiftyUsed ? 0.3 : 1,
            borderColor: fiftyFiftyUsed ? '#666' : '#ffd700'
          }}
        >
          <span className="lifeline-icon" style={{ fontSize: '16px' }}>⚡</span>
          <span>50:50</span>
        </div>
        <div 
          className={`lifeline ${questionFlipUsed ? 'used' : ''}`}
          onClick={!questionFlipUsed && !isAnswered ? onQuestionFlip : undefined}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid #ffd700',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '25px',
            cursor: questionFlipUsed || isAnswered ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: questionFlipUsed ? 0.3 : 1,
            borderColor: questionFlipUsed ? '#666' : '#ffd700'
          }}
        >
          <span className="lifeline-icon" style={{ fontSize: '16px' }}>🔄</span>
          <span>Flip Question</span>
        </div>
        <div 
          className={`lifeline ${extendTimeUsed ? 'used' : ''}`}
          onClick={!extendTimeUsed && !isAnswered ? onExtendTime : undefined}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid #ffd700',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '25px',
            cursor: extendTimeUsed || isAnswered ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: extendTimeUsed ? 0.3 : 1,
            borderColor: extendTimeUsed ? '#666' : '#ffd700'
          }}
        >
          <span className="lifeline-icon" style={{ fontSize: '16px' }}>⏰</span>
          <span>+10 Seconds</span>
        </div>
      </div>

      {/* Quiz Content */}
      <div 
        className="quiz-content"
        style={{ padding: '30px' }}
      >
        <div 
          className="question"
          style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '25px',
            lineHeight: 1.4,
            minHeight: '60px'
          }}
        >
          {question.question}
        </div>
        <div 
          className="options"
          style={{ display: 'grid', gap: '15px' }}
        >
          {question.options.map((option, index) => (
            <div
              key={`${questionNumber}-${index}`}
              className={getOptionClass(index)}
              onClick={() => !isAnswered && !hiddenOptions.includes(index) && onAnswerSelect(index)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '15px 20px',
                borderRadius: '12px',
                cursor: isAnswered ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: '16px',
                position: 'relative',
                overflow: 'hidden',
                opacity: animateOptions ? 1 : 0,
                transform: animateOptions ? 'translateX(0)' : 'translateX(-100px)',
                ...(index % 2 === 1 && { transform: animateOptions ? 'translateX(0)' : 'translateX(100px)' })
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Footer */}
      <div 
        className="quiz-footer"
        style={{
          padding: '20px 30px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div 
          className="progress-bar"
          style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <div 
            className="progress-fill"
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #ffd700, #ffed4e)',
              borderRadius: '4px',
              transition: 'width 0.3s ease',
              width: `${((questionNumber - 1) / totalQuestions) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
