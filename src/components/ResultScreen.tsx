import React from 'react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onShare: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart, onShare }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getMessage = () => {
    if (percentage >= 80) {
      return "🏆 Outstanding! You're a true RR superfan!";
    } else if (percentage >= 60) {
      return "👏 Great job! You know your Royals well!";
    } else if (percentage >= 40) {
      return "👍 Not bad! Keep following the Royals!";
    } else {
      return "📚 Time to brush up on your RR knowledge!";
    }
  };

  return (
    <div 
      className="quiz-results"
      style={{
        textAlign: 'center',
        color: 'white',
        padding: '40px 30px'
      }}
    >
      <div 
        className="score-display"
        style={{
          fontSize: '48px',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px'
        }}
      >
        {score}/{totalQuestions}
      </div>
      <div 
        className="score-message"
        style={{
          fontSize: '18px',
          marginBottom: '30px',
          opacity: 0.9
        }}
      >
        {getMessage()}
      </div>
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button 
          className="restart-btn" 
          onClick={onRestart}
          style={{
            background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
            color: '#1a1a2e',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            fontWeight: 600,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Take Quiz Again
        </button>
        <button 
          className="share-btn" 
          onClick={onShare}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '2px solid #ffd700',
            padding: '15px 30px',
            borderRadius: '25px',
            fontWeight: 600,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Share Score
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
