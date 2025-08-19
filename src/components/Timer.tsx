import React from 'react';
import { motion } from 'framer-motion';
import { TimerProps } from '../types';

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  const progress = (timeLeft / totalTime) * 100;
  const isLowTime = timeLeft <= 10;
  const isMediumTime = timeLeft <= 20;

  return (
    <div className="flex items-center justify-center mb-4 sm:mb-6">
      <div className="relative">
        <motion.div
          className="timer-circle w-14 h-14 sm:w-18 sm:h-18"
          animate={{
            scale: isLowTime ? [1, 1.15, 1] : isMediumTime ? [1, 1.05, 1] : 1,
            borderColor: isLowTime 
              ? ['#ef4444', '#dc2626', '#ef4444'] 
              : isMediumTime 
                ? ['#f59e0b', '#d97706', '#f59e0b']
                : '#e91e63'
          }}
          transition={{
            duration: 1,
            repeat: isLowTime || isMediumTime ? Infinity : 0
          }}
        >
          <span className={`text-sm sm:text-lg font-bold ${
            isLowTime ? 'text-red-600' : 
            isMediumTime ? 'text-orange-600' : 
            'rr-pink'
          }`}>
            {timeLeft}
          </span>
        </motion.div>
        
        <svg
          className="absolute inset-0 w-14 h-14 sm:w-18 sm:h-18 transform -rotate-90"
          viewBox="0 0 64 64"
        >
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className={
              isLowTime ? 'text-red-500' : 
              isMediumTime ? 'text-orange-500' : 
              'text-pink-500'
            }
            initial={{ strokeDasharray: 176, strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: 176 - (176 * progress) / 100 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
      </div>
      
      {isLowTime && (
        <motion.div
          className="ml-3 text-2xl sm:text-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ⚡
        </motion.div>
      )}
      
      {isMediumTime && !isLowTime && (
        <motion.div
          className="ml-3 text-xl sm:text-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          🏏
        </motion.div>
      )}
      
      {!isMediumTime && (
        <motion.div
          className="ml-3 text-lg sm:text-xl rr-gold"
          animate={{ 
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⏱️
        </motion.div>
      )}
    </div>
  );
};

export default Timer;
