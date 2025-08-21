import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
  score?: number;
  totalQuestions?: number;
}

const ConfettiAnimation: React.FC<ConfettiProps> = ({ 
  show, 
  onComplete, 
  score = 0, 
  totalQuestions = 1 
}) => {
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
      const timer = setTimeout(onComplete, 15000); // Extended to 15 seconds for much longer confetti
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Determine confetti theme based on score
  const getConfettiTheme = () => {
    if (percentage >= 75) {
      return {
        name: 'excellent',
        colors: ['#e91e63', '#ffd700', '#3f51b5', '#9c27b0', '#4caf50', '#ff9800'],
        emojis: ['🔥', '🔥', '🔥', '🔥', '🔥', '🔥', '🔥', '🔥', '🔥', '🔥'],
        numberOfPieces: 500,
        gravity: 0.008, // EXTREMELY slow gravity
        wind: 0.001, // Almost no wind
        initialVelocityY: 2 // VERY slow initial velocity
      };
    } else if (percentage >= 50) {
      return {
        name: 'good',
        colors: ['#4caf50', '#ff9800', '#2196f3', '#9c27b0', '#ffd700', '#e91e63'],
        emojis: ['👍', '👍', '👍', '👍', '👍', '👍', '👍', '👍', '👍', '👍'],
        numberOfPieces: 400,
        gravity: 0.01, // EXTREMELY slow gravity
        wind: 0.002, // Almost no wind
        initialVelocityY: 3 // VERY slow initial velocity
      };
    } else {
      return {
        name: 'sad',
        colors: ['#ff5722', '#9e9e9e', '#607d8b', '#795548', '#ff9800', '#e91e63'],
        emojis: ['😔', '😔', '😔', '😔', '😔', '😔', '😔', '😔', '😔', '😔'],
        numberOfPieces: 300,
        gravity: 0.012, // EXTREMELY slow gravity
        wind: 0.001, // Almost no wind
        initialVelocityY: 4 // VERY slow initial velocity
      };
    }
  };

  const theme = getConfettiTheme();

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
          {/* Main confetti */}
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={theme.numberOfPieces}
            colors={theme.colors}
            gravity={theme.gravity}
            wind={theme.wind}
            initialVelocityX={2} // VERY reduced horizontal velocity
            initialVelocityY={theme.initialVelocityY}
            confettiSource={{
              x: 400,
              y: windowSize.height / 2 - 150,
              w: 400,
              h: 200,
            }}
          />
          
          {/* Floating emojis - SUPER MASSIVE SIZE */}
          {theme.emojis.map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none flex items-center justify-center"
              style={{
                width: '9.375rem',
                height: '9.375rem',
                fontSize: '8.125rem',
                lineHeight: '1',
              }}
              initial={{
                x: Math.random() * windowSize.width,
                y: -200,
                rotate: 0,
                scale: 0,
              }}
              animate={{
                y: windowSize.height + 200,
                rotate: 360,
                scale: 2.2, // Even bigger scale for MASSIVE emojis
              }}
              transition={{
                duration: 15 + Math.random() * 8, // MUCH longer duration (15-23 seconds)
                ease: "linear",
                delay: Math.random() * 5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
          
          {/* Additional themed particles for excellent scores */}
          {theme.name === 'excellent' && (
            <>
              {/* Golden sparkles - LARGER */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-4 h-4 bg-yellow-400 rounded-full pointer-events-none"
                  initial={{
                    x: Math.random() * windowSize.width,
                    y: -20,
                    opacity: 0,
                  }}
                  animate={{
                    y: windowSize.height + 20,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 12 + Math.random() * 6, // MUCH longer duration for sparkles
                    ease: "easeIn",
                    delay: Math.random() * 4,
                  }}
                />
              ))}
              
              {/* Cricket bat rain for excellent scores - MASSIVE SIZE */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`bat-${i}`}
                  className="absolute pointer-events-none flex items-center justify-center"
                  style={{
                    width: '9.375rem',
                    height: '9.375rem',
                    fontSize: '7.5rem',
                    lineHeight: '1',
                  }}
                  initial={{
                    x: Math.random() * windowSize.width,
                    y: -200,
                    rotate: 0,
                  }}
                  animate={{
                    y: windowSize.height + 200,
                    rotate: 720,
                    scale: 2.5, // Even bigger scale for cricket bats
                  }}
                  transition={{
                    duration: 18 + Math.random() * 5, // MUCH longer duration for cricket bats
                    ease: "linear",
                    delay: Math.random() * 3,
                  }}
                >
                  🏏
                </motion.div>
              ))}
            </>
          )}
          
          {/* Encouraging particles for sad scores */}
          {theme.name === 'sad' && (
            <>
              {/* Motivational words - MUCH LARGER */}
              {['TRY', 'AGAIN', 'LEARN', 'GROW', 'PRACTICE'].map((word, i) => (
                <motion.div
                  key={`word-${i}`}
                  className="absolute font-bold text-orange-500 pointer-events-none"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    textShadow: '0.125rem 0.125rem 0.25rem rgba(0,0,0,0.5)',
                  }}
                  initial={{
                    x: Math.random() * windowSize.width,
                    y: -100,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    y: windowSize.height + 100,
                    opacity: [0, 1, 0],
                    scale: 1.5,
                  }}
                  transition={{
                    duration: 14 + Math.random() * 4, // MUCH longer duration for words
                    ease: "linear",
                    delay: Math.random() * 5,
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfettiAnimation;
