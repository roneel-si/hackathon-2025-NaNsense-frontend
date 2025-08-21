import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, Target, RefreshCw, Zap } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  compact?: boolean;
  theme?: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    button: string;
    text: string;
    border: string;
    glow: string;
    modalBg: string;
    startBg: string;
    questionBg: string;
  };
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, compact = false, theme }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`${
        compact 
          ? `h-full bg-gradient-to-br ${theme?.startBg || 'from-indigo-900 via-purple-900 to-pink-900'} rounded-lg flex flex-col justify-center items-center p-fluid-sm` 
          : `min-h-screen bg-gradient-to-br ${theme?.startBg || 'from-indigo-900 via-purple-900 to-pink-900'} relative overflow-hidden flex items-center justify-center p-fluid-md`
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Simplified Background Elements - only show when not compact and not in widget */}
      {!compact && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Simple Grid Pattern Only */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:3.125rem_3.125rem]" />
          
          {/* Minimal Floating Orbs - Reduced Animation */}
          <div className="absolute top-[10vh] right-[10vw] w-32 h-32 bg-purple-400/10 rounded-full blur-xl opacity-50"></div>
          <div className="absolute bottom-[10vh] left-[10vw] w-24 h-24 bg-blue-400/10 rounded-full blur-xl opacity-50"></div>
        </div>
      )}

      {/* Main Content - Responsive Layout */}
      <div className={`relative z-10 ${compact ? 'flex flex-col items-center justify-center space-y-fluid-sm max-w-full' : 'max-w-4xl mx-auto'} text-center`}>
        
        {/* Compact Header - Adaptive Spacing */}
        <motion.div className={compact ? "flex-shrink-0" : "mb-fluid-lg"} variants={itemVariants}>
          <motion.div
            className={`mx-auto ${
              compact 
                ? 'w-12 h-12 mb-fluid-sm' 
                : 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-fluid-sm'
            } bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg`}
            variants={compact ? {} : floatingVariants}
            animate={compact ? "" : "float"}
          >
            <Trophy className={`${
              compact 
                ? 'w-6 h-6' 
                : 'w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12'
            } text-white`} />
          </motion.div>
          
          <h1 className={`${
            compact 
              ? 'text-fluid-2xl leading-tight font-black mb-fluid-xs' 
              : 'text-fluid-4xl md:text-fluid-5xl font-black'
          } text-white`}>
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              QUIZ
            </span>
            {compact && ' '}
            <span className="text-white">MASTER</span>
          </h1>
          
          {/* Always show description, but adapt size */}
          <p className={`${
            compact 
              ? 'text-fluid-base text-white/90 max-w-xs mx-auto leading-relaxed' 
              : 'text-fluid-lg text-white/80 mt-fluid-sm max-w-2xl mx-auto'
          }`}>
            Test your sports knowledge with our interactive trivia challenge!
          </p>
        </motion.div>

        {/* Features Grid - Responsive and Adaptive */}
        <motion.div 
          className={`${
            compact 
              ? 'grid grid-cols-1 gap-fluid-xs max-w-xs mx-auto w-full' 
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-fluid-sm mb-fluid-lg max-w-3xl mx-auto'
          }`}
          variants={itemVariants}
        >
          <div className={`bg-white/10 backdrop-blur-sm rounded-xl ${
            compact ? 'p-fluid-xs flex items-center gap-fluid-xs' : 'p-fluid-sm'
          } border border-white/20`}>
            <Target className={`${
              compact ? 'w-5 h-5 flex-shrink-0' : 'w-8 h-8 mx-auto mb-fluid-xs'
            } text-yellow-400`} />
            <div className={compact ? 'text-left' : 'text-center'}>
              <h3 className={`${
                compact ? 'text-fluid-sm' : 'text-fluid-base'
              } font-bold text-white ${compact ? 'mb-0' : 'mb-fluid-xs'}`}>
                {compact ? '50:50 Lifeline' : '50:50 Lifeline'}
              </h3>
              {!compact && <p className="text-fluid-sm text-white/70">Remove wrong answers</p>}
              {compact && <p className="text-fluid-xs text-white/70">Remove wrong answers</p>}
            </div>
          </div>
          
          <div className={`bg-white/10 backdrop-blur-sm rounded-xl ${
            compact ? 'p-fluid-xs flex items-center gap-fluid-xs' : 'p-fluid-sm'
          } border border-white/20`}>
            <RefreshCw className={`${
              compact ? 'w-5 h-5 flex-shrink-0' : 'w-8 h-8 mx-auto mb-fluid-xs'
            } text-blue-400`} />
            <div className={compact ? 'text-left' : 'text-center'}>
              <h3 className={`${
                compact ? 'text-fluid-sm' : 'text-fluid-base'
              } font-bold text-white ${compact ? 'mb-0' : 'mb-fluid-xs'}`}>
                {compact ? 'Skip Question' : 'Skip Question'}
              </h3>
              {!compact && <p className="text-fluid-sm text-white/70">Move to next question</p>}
              {compact && <p className="text-fluid-xs text-white/70">Move to next question</p>}
            </div>
          </div>
          
          <div className={`bg-white/10 backdrop-blur-sm rounded-xl ${
            compact ? 'p-fluid-xs flex items-center gap-fluid-xs' : 'p-fluid-sm'
          } border border-white/20 ${compact ? '' : 'sm:col-span-2 lg:col-span-1'}`}>
            <Zap className={`${
              compact ? 'w-5 h-5 flex-shrink-0' : 'w-8 h-8 mx-auto mb-fluid-xs'
            } text-green-400`} />
            <div className={compact ? 'text-left' : 'text-center'}>
              <h3 className={`${
                compact ? 'text-fluid-sm' : 'text-fluid-base'
              } font-bold text-white ${compact ? 'mb-0' : 'mb-fluid-xs'}`}>
                {compact ? 'Extra Time' : 'Extra Time'}
              </h3>
              {!compact && <p className="text-fluid-sm text-white/70">Get 15 more seconds</p>}
              {compact && <p className="text-fluid-xs text-white/70">Get 15 more seconds</p>}
            </div>
          </div>
        </motion.div>

        {/* Start Button - Responsive */}
        <motion.div className={compact ? "w-full max-w-xs" : ""} variants={itemVariants}>
          <motion.button
            onClick={onStart}
            className={`
              bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl
              shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-fluid-xs mx-auto
              ${compact 
                ? 'w-full py-fluid-sm px-fluid-md text-fluid-base min-h-[3rem]' 
                : 'py-fluid-sm px-fluid-lg text-fluid-lg min-h-[3rem] sm:min-h-[3.5rem]'
              }
            `}
            variants={pulseVariants}
            animate="pulse"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className={`${compact ? 'w-5 h-5' : 'w-5 h-5'}`} />
            <span>START QUIZ</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StartScreen;
