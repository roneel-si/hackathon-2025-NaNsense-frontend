import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimerProps } from '../types';

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime, isActive }) => {
  const progress = (timeLeft / totalTime) * 100;
  const isUrgent = timeLeft <= 10; // Last 10 seconds
  const isMedium = timeLeft <= 20 && !isUrgent; // 11-20 seconds

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Color schemes for different states
  const getTimerColors = () => {
    if (isUrgent) {
      return {
        primary: '#ef4444', // red-500
        secondary: '#dc2626', // red-600
        background: '#fef2f2', // red-50
        border: '#fecaca', // red-200
        text: '#dc2626',
        shadow: 'rgba(239, 68, 68, 0.3)',
        gradient: 'from-red-400 to-red-600'
      };
    }
    if (isMedium) {
      return {
        primary: '#f59e0b', // amber-500
        secondary: '#d97706', // amber-600
        background: '#fffbeb', // amber-50
        border: '#fed7aa', // amber-200
        text: '#d97706',
        shadow: 'rgba(245, 158, 11, 0.3)',
        gradient: 'from-amber-400 to-orange-500'
      };
    }
    return {
      primary: '#3b82f6', // blue-500
      secondary: '#2563eb', // blue-600
      background: '#eff6ff', // blue-50
      border: '#bfdbfe', // blue-200
      text: '#2563eb',
      shadow: 'rgba(59, 130, 246, 0.3)',
      gradient: 'from-blue-400 to-blue-600'
    };
  };

  const colors = getTimerColors();

  return (
    <div className="flex flex-col items-center">
      {/* Enhanced Timer Circle with better sizing */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25,
          duration: 0.5 
        }}
      >
        {/* Responsive Timer Circle */}
        <div 
          className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full flex items-center justify-center shadow-2xl timer-circle"
          style={{
            background: `linear-gradient(135deg, ${colors.background} 0%, rgba(255,255,255,0.9) 100%)`,
            border: `0.25rem solid ${colors.border}`,
            backdropFilter: 'blur(0.75rem)',
            boxShadow: `0 0.75rem 2.5rem ${colors.shadow}, 0 0 0 0.125rem rgba(255,255,255,0.1)`
          }}
        >
          {/* Progress Ring */}
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="3"
            />
            
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={colors.primary}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Timer Display */}
          <div className="relative z-10 text-center">
            <motion.div
              className="text-fluid-2xl sm:text-fluid-3xl font-bold"
              style={{ color: colors.text }}
              animate={isUrgent ? {
                scale: [1, 1.1, 1],
                transition: { duration: 0.5, repeat: Infinity }
              } : {}}
            >
              {timeLeft}
            </motion.div>
            <div 
              className="text-fluid-xs font-medium opacity-70"
              style={{ color: colors.text }}
            >
              seconds
            </div>
          </div>

          {/* Urgent Pulse Effect */}
          <AnimatePresence>
            {isUrgent && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1.2, 0.8], 
                  opacity: [0, 0.6, 0] 
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Floating Time Indicators */}
        <AnimatePresence>
          {isUrgent && (
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="bg-red-500 text-white text-fluid-xs px-2 py-1 rounded-full font-bold shadow-lg">
                HURRY!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Status Text */}
      <motion.div 
        className="mt-fluid-xs text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-fluid-sm font-medium text-white/80">
          {isActive ? (
            isUrgent ? (
              <span className="text-red-400 font-bold">Time's Running Out!</span>
            ) : isMedium ? (
              <span className="text-amber-400 font-bold">Think Fast!</span>
            ) : (
              <span className="text-blue-400">Choose Your Answer</span>
            )
          ) : (
            <span className="text-gray-400">Paused</span>
          )}
        </div>
      </motion.div>

      {/* Progress Bar Alternative for Very Small Screens */}
      <div className="block xs:hidden w-full mt-fluid-xs">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full bg-gradient-to-r ${colors.gradient}`}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="text-center mt-1">
          <span className="text-fluid-sm font-bold text-white">{timeLeft}s</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
