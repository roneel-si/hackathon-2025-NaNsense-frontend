import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  onClose: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onClose }) => {
  return (
    <div 
      className="start-screen"
      style={{
        textAlign: 'center',
        padding: '40px 30px',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        className="start-header"
        style={{
          background: 'linear-gradient(135deg, #e91e63, #ff6b9d)',
          padding: '25px',
          margin: '-40px -30px 30px -30px',
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
          className="start-title"
          style={{
            fontSize: '32px',
            fontWeight: 800,
            color: 'white',
            marginBottom: '8px',
            position: 'relative',
            zIndex: 2,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          🏏 RR Quiz Challenge
        </div>
        <div 
          className="start-subtitle"
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '16px',
            position: 'relative',
            zIndex: 2,
            fontWeight: 500
          }}
        >
          Test your Rajasthan Royals knowledge!
        </div>
      </div>

      <div 
        className="quiz-logo"
        style={{
          width: '120px',
          height: '120px',
          margin: '0 auto 25px',
          background: 'linear-gradient(135deg, #e91e63, #ff6b9d)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '4px solid #ffd700',
          animation: 'logoFloat 3s ease-in-out infinite alternate',
          boxShadow: '0 10px 30px rgba(233, 30, 99, 0.3)',
          position: 'relative',
          zIndex: 2
        }}
      >
        <svg 
          viewBox="0 0 24 24"
          style={{
            width: '60px',
            height: '60px',
            fill: 'white',
            filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))'
          }}
        >
          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
        </svg>
      </div>

      <div 
        className="quiz-description"
        style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '16px',
          lineHeight: 1.6,
          marginBottom: '30px',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        Think you know everything about the Rajasthan Royals? Put your knowledge to the test with our interactive quiz featuring lifelines and timed questions!
      </div>

      <div 
        className="quiz-features"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          marginBottom: '35px',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div 
          className="feature-card"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span className="feature-icon" style={{ fontSize: '28px', marginBottom: '10px', display: 'block' }}>🎯</span>
          <div className="feature-title" style={{ color: '#ffd700', fontWeight: 600, fontSize: '14px', marginBottom: '5px' }}>5 Questions</div>
          <div className="feature-desc" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', lineHeight: 1.4 }}>Carefully curated questions about RR</div>
        </div>
        <div 
          className="feature-card"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span className="feature-icon" style={{ fontSize: '28px', marginBottom: '10px', display: 'block' }}>⏱️</span>
          <div className="feature-title" style={{ color: '#ffd700', fontWeight: 600, fontSize: '14px', marginBottom: '5px' }}>Timed Challenge</div>
          <div className="feature-desc" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', lineHeight: 1.4 }}>25 seconds per question</div>
        </div>
        <div 
          className="feature-card"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span className="feature-icon" style={{ fontSize: '28px', marginBottom: '10px', display: 'block' }}>💡</span>
          <div className="feature-title" style={{ color: '#ffd700', fontWeight: 600, fontSize: '14px', marginBottom: '5px' }}>3 Lifelines</div>
          <div className="feature-desc" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', lineHeight: 1.4 }}>50:50, Flip Question, +10 Seconds</div>
        </div>
      </div>

      <button 
        className="start-quiz-btn" 
        onClick={onStart}
        style={{
          background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
          color: '#1a1a2e',
          border: 'none',
          padding: '18px 40px',
          borderRadius: '30px',
          fontWeight: 700,
          fontSize: '18px',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)',
          position: 'relative',
          zIndex: 2,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          overflow: 'hidden'
        }}
      >
        🚀 Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
