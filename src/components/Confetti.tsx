import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  show: boolean;
  onComplete: () => void;
}

const Confetti: React.FC<ConfettiProps> = ({ show, onComplete }) => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{
    id: number;
    left: string;
    animationDuration: string;
    animationDelay: string;
    width: string;
    height: string;
    borderRadius?: string;
    background: string;
  }>>([]);

  useEffect(() => {
    if (show) {
      // Create confetti pieces
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
        width: Math.random() > 0.5 ? '12px' : '8px',
        height: Math.random() > 0.5 ? '6px' : '8px',
        borderRadius: Math.random() > 0.5 ? '50%' : undefined,
        background: ['#e91e63', '#ffd700', '#ff6b9d', '#ffed4e', '#4caf50'][i % 5]
      }));
      
      setConfettiPieces(pieces);

      // Remove confetti after animation completes
      const timer = setTimeout(() => {
        setConfettiPieces([]);
        onComplete();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div 
      className="confetti-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3000,
        overflow: 'hidden'
      }}
    >
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            position: 'absolute',
            width: piece.width,
            height: piece.height,
            borderRadius: piece.borderRadius,
            background: piece.background,
            opacity: 0.9,
            left: piece.left,
            animation: `confetti-fall ${piece.animationDuration} linear infinite`,
            animationDelay: piece.animationDelay
          }}
        />
      ))}
      <style>
        {`
          @keyframes confetti-fall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Confetti;
