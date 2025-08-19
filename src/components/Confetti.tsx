import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
}

const ConfettiAnimation: React.FC<ConfettiProps> = ({ show, onComplete }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="confetti-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            colors={colors}
            gravity={0.3}
            wind={0.05}
            initialVelocityX={15}
            initialVelocityY={30}
            confettiSource={{
              x: 0,
              y: windowSize.height / 2 - 100,
              w: 300,
              h: 200,
            }}
          />
          
          {/* Additional floating emojis */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl pointer-events-none"
              initial={{
                x: Math.random() * 300,
                y: -50,
                rotate: 0,
              }}
              animate={{
                y: windowSize.height + 50,
                rotate: 360,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: "easeIn",
                delay: Math.random() * 0.5,
              }}
            >
              {['🎉', '🏆', '⭐', '🎊', '💫', '🌟', '✨', '🎈', '🎯', '🔥'][i]}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfettiAnimation;
