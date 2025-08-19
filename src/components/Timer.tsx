import React from 'react';
import { motion } from 'framer-motion';
import { TimerProps } from '../types';

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  const progress = (timeLeft / totalTime) * 100;
  const isLowTime = timeLeft <= 10;

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="relative">
        <motion.div
          className="timer-circle"
          animate={{
            scale: isLowTime ? [1, 1.1, 1] : 1,
            borderColor: isLowTime ? ['#ef4444', '#dc2626', '#ef4444'] : '#3b82f6'
          }}
          transition={{
            duration: 1,
            repeat: isLowTime ? Infinity : 0
          }}
        >
          <span className={isLowTime ? 'text-red-600' : 'text-primary-600'}>
            {timeLeft}
          </span>
        </motion.div>
        
        <svg
          className="absolute inset-0 w-16 h-16 transform -rotate-90"
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
            className={isLowTime ? 'text-red-500' : 'text-primary-500'}
            initial={{ strokeDasharray: 176, strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: 176 - (176 * progress) / 100 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
      </div>
      
      {isLowTime && (
        <motion.div
          className="ml-2 text-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ⚡
        </motion.div>
      )}
    </div>
  );
};

export default Timer;
