import React from 'react';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <div 
      className="quiz-float-btn" 
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '70px',
        height: '70px',
        background: 'linear-gradient(135deg, #e91e63, #ff6b9d)',
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(233, 30, 99, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '3px solid #ffd700',
        animation: 'pulse 2s infinite'
      }}
    >
      <svg 
        viewBox="0 0 24 24" 
        style={{ width: '32px', height: '32px', fill: 'white' }}
      >
        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
      </svg>
    </div>
  );
};

export default FloatingButton;
