import React from 'react';
import { motion } from 'framer-motion';
import { Share2, RotateCcw, Star, Target, Zap, TrendingUp, Award } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onShare: () => void;
  streak?: number;
  bestStreak?: number;
  timeBonus?: number;
  accuracy?: number;
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

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  onRestart,
  onShare,
  streak = 0,
  timeBonus = 0,
  compact = false,
  theme
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isExcellent = percentage >= 80;
  
  const getPerformanceData = () => {
    if (percentage >= 90) {
      return {
        title: "LEGENDARY!",
        emoji: "🏆",
        color: "from-yellow-400 to-orange-500",
        bgColor: "from-yellow-500/20 to-orange-500/20",
        borderColor: "border-yellow-400/50",
        message: "You're a true quiz master! Absolutely incredible performance!",
        stars: 5
      };
    } else if (percentage >= 80) {
      return {
        title: "EXCELLENT!",
        emoji: "🌟",
        color: "from-purple-400 to-pink-500",
        bgColor: "from-purple-500/20 to-pink-500/20",
        borderColor: "border-purple-400/50",
        message: "Outstanding job! You really know your stuff!",
        stars: 4
      };
    } else if (percentage >= 60) {
      return {
        title: "GOOD JOB!",
        emoji: "👏",
        color: "from-blue-400 to-cyan-500",
        bgColor: "from-blue-500/20 to-cyan-500/20",
        borderColor: "border-blue-400/50",
        message: "Nice work! Keep practicing to reach the next level!",
        stars: 3
      };
    } else if (percentage >= 40) {
      return {
        title: "KEEP TRYING!",
        emoji: "💪",
        color: "from-green-400 to-teal-500",
        bgColor: "from-green-500/20 to-teal-500/20",
        borderColor: "border-green-400/50",
        message: "You're on the right track! Practice makes perfect!",
        stars: 2
      };
    } else {
      return {
        title: "NEVER GIVE UP!",
        emoji: "🚀",
        color: "from-red-400 to-pink-500",
        bgColor: "from-red-500/20 to-pink-500/20",
        borderColor: "border-red-400/50",
        message: "Every expert was once a beginner. You've got this!",
        stars: 1
      };
    }
  };

  const performance = getPerformanceData();

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

  const trophyVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.5
      }
    }
  };

  const starVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        delay: 1 + i * 0.1
      }
    })
  };

  const floatingVariants = {
    float: {
      y: [-5, 5, -5],
      rotate: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`${
        compact 
          ? `h-full bg-gradient-to-br ${theme?.questionBg || 'from-slate-900 via-purple-900 to-slate-900'} rounded-lg flex items-center justify-center` 
          : `min-h-screen bg-gradient-to-br ${theme?.questionBg || 'from-slate-900 via-purple-900 to-slate-900'} flex items-center justify-center`
      } relative overflow-hidden ${compact ? 'p-fluid-sm' : 'p-fluid-md'}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Enhanced Background Effects */}
      {!compact && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern" />
          
          {/* Floating celebration elements */}
          {isExcellent && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </>
          )}

          {/* Dynamic background orbs */}
          <motion.div
            className={`absolute top-[10vh] right-[10vw] w-64 h-64 bg-gradient-to-r ${performance.color} opacity-20 rounded-full blur-3xl`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-[10vh] left-[10vw] w-48 h-48 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}

      {/* RESPONSIVE RESULTS LAYOUT */}
      <div className={`relative z-10 ${
        compact ? 'w-full max-w-lg' : 'w-full max-w-6xl mx-auto'
      } text-center`}>
        
        {/* Main Trophy/Achievement Section - Responsive */}
        <motion.div
          className={compact ? "mb-fluid-sm" : "mb-fluid-lg"}
          variants={trophyVariants}
        >
          <motion.div
            className={`mx-auto ${
              compact 
                ? 'w-16 h-16 sm:w-20 sm:h-20' 
                : 'w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40'
            } bg-gradient-to-br ${performance.color} rounded-3xl flex items-center justify-center shadow-2xl ${
              compact ? 'mb-fluid-xs' : 'mb-fluid-md'
            }`}
            variants={floatingVariants}
            animate="float"
            style={{
              boxShadow: "0 1.5625rem 3.125rem rgba(0, 0, 0, 0.3)"
            }}
          >
            <span className={
              compact 
                ? "text-fluid-3xl sm:text-fluid-4xl" 
                : "text-fluid-4xl sm:text-fluid-5xl lg:text-[5rem]"
            }>{performance.emoji}</span>
          </motion.div>
        </motion.div>

        {/* Performance Title and Message - Responsive */}
        <motion.div
          className={compact ? "mb-fluid-sm" : "mb-fluid-lg"}
          variants={itemVariants}
        >
          <h1 className={`${
            compact 
              ? 'text-fluid-2xl sm:text-fluid-3xl' 
              : 'text-fluid-3xl sm:text-fluid-4xl lg:text-fluid-5xl'
          } font-black text-transparent bg-gradient-to-r ${performance.color} bg-clip-text ${
            compact ? 'mb-fluid-xs' : 'mb-fluid-md'
          }`}>
            {performance.title}
          </h1>
          <p className={`${
            compact 
              ? 'text-fluid-sm sm:text-fluid-base' 
              : 'text-fluid-base sm:text-fluid-lg lg:text-fluid-xl'
          } text-gray-300 font-medium max-w-4xl mx-auto leading-relaxed px-fluid-sm`}>
            {performance.message}
          </p>
        </motion.div>

        {/* Enhanced Star Rating - Responsive */}
        <motion.div
          className={`flex justify-center gap-fluid-xs ${
            compact ? 'mb-fluid-sm' : 'mb-fluid-lg'
          }`}
          variants={itemVariants}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={starVariants}
            >
              <Star 
                className={`${
                  compact 
                    ? 'w-5 h-5 sm:w-6 sm:h-6' 
                    : 'w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10'
                } ${
                  i < performance.stars 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-600'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid - Responsive */}
        <div className={`grid ${
          compact 
            ? 'grid-cols-1 gap-fluid-sm' 
            : 'grid-cols-1 lg:grid-cols-2 gap-fluid-md lg:gap-fluid-lg'
        } ${compact ? 'mb-fluid-sm' : 'mb-fluid-lg'}`}>
          
          {/* Score Display Card - Responsive */}
          <motion.div
            className={`bg-gradient-to-br ${performance.bgColor} backdrop-blur-md rounded-3xl ${
              compact 
                ? 'p-fluid-sm' 
                : 'p-fluid-md lg:p-fluid-lg'
            } border ${performance.borderColor} ${
              compact ? '' : 'lg:col-span-2'
            }`}
            variants={itemVariants}
            style={{
              boxShadow: "0 1.5625rem 3.125rem rgba(0, 0, 0, 0.3)"
            }}
          >
            <div className={`text-center ${
              compact ? 'mb-fluid-xs' : 'mb-fluid-md'
            }`}>
              <div className={`${
                compact 
                  ? 'text-fluid-4xl sm:text-fluid-5xl' 
                  : 'text-fluid-5xl sm:text-[4rem] lg:text-[6rem]'
              } font-black text-white ${
                compact ? 'mb-fluid-xs' : 'mb-fluid-sm'
              }`}>
                {score}<span className={`${
                  compact 
                    ? 'text-fluid-2xl sm:text-fluid-3xl' 
                    : 'text-fluid-3xl sm:text-fluid-4xl lg:text-fluid-5xl'
                } text-gray-400`}>/{totalQuestions}</span>
              </div>
              <div className={`${
                compact 
                  ? 'text-fluid-lg sm:text-fluid-xl' 
                  : 'text-fluid-xl sm:text-fluid-2xl lg:text-fluid-3xl'
              } font-bold bg-gradient-to-r ${performance.color} bg-clip-text text-transparent`}>
                {percentage}% CORRECT
              </div>
            </div>

            {/* Enhanced Progress Bar - Responsive */}
            <div className={`relative w-full ${
              compact ? 'h-3 sm:h-4' : 'h-4 sm:h-6'
            } bg-white/20 rounded-full overflow-hidden ${
              compact ? 'mb-fluid-xs' : 'mb-fluid-md'
            }`}>
              <motion.div
                className={`h-full bg-gradient-to-r ${performance.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
              />
            </div>

            {/* Performance Stats Grid - Responsive */}
            <div className={`grid ${
              compact 
                ? 'grid-cols-2 gap-fluid-xs' 
                : 'grid-cols-2 md:grid-cols-4 gap-fluid-sm'
            } text-center`}>
              <div className={`bg-white/10 rounded-xl ${
                compact ? 'p-fluid-xs' : 'p-fluid-sm'
              }`}>
                <Target className={`${
                  compact ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5 sm:w-6 sm:h-6'
                } text-blue-400 mx-auto ${
                  compact ? 'mb-1' : 'mb-fluid-xs'
                }`} />
                <div className={`${
                  compact ? 'text-fluid-sm sm:text-fluid-base' : 'text-fluid-base sm:text-fluid-lg'
                } font-bold text-white`}>{percentage}%</div>
                <div className={`${
                  compact ? 'text-fluid-xs' : 'text-fluid-sm'
                } text-gray-300`}>Accuracy</div>
              </div>
              
              <div className={`bg-white/10 rounded-xl ${
                compact ? 'p-fluid-xs' : 'p-fluid-sm'
              }`}>
                <Zap className={`${
                  compact ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5 sm:w-6 sm:h-6'
                } text-yellow-400 mx-auto ${
                  compact ? 'mb-1' : 'mb-fluid-xs'
                }`} />
                <div className={`${
                  compact ? 'text-fluid-sm sm:text-fluid-base' : 'text-fluid-base sm:text-fluid-lg'
                } font-bold text-white`}>{streak}</div>
                <div className={`${
                  compact ? 'text-fluid-xs' : 'text-fluid-sm'
                } text-gray-300`}>Best Streak</div>
              </div>
              
              {!compact && (
                <>
                  <div className="bg-white/10 rounded-xl p-fluid-sm">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-fluid-xs" />
                    <div className="text-fluid-base sm:text-fluid-lg font-bold text-white">{timeBonus}</div>
                    <div className="text-fluid-sm text-gray-300">Time Bonus</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-fluid-sm">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mx-auto mb-fluid-xs" />
                    <div className="text-fluid-base sm:text-fluid-lg font-bold text-white">{Math.round(score * 10 + timeBonus)}</div>
                    <div className="text-fluid-sm text-gray-300">Total Score</div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Action Buttons - Responsive */}
        <motion.div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            compact 
              ? 'gap-fluid-xs' 
              : 'gap-fluid-sm lg:gap-fluid-md'
          } ${compact ? 'mb-fluid-xs' : 'mb-fluid-md'}`}
          variants={itemVariants}
        >
          {/* Play Again Button - Responsive */}
          <motion.button
            onClick={onRestart}
            className={`group relative bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold ${
              compact 
                ? 'py-fluid-xs px-fluid-sm text-fluid-sm min-h-[3rem]' 
                : 'py-fluid-sm px-fluid-lg text-fluid-base sm:text-fluid-lg min-h-[3.5rem] sm:min-h-[4rem]'
            } rounded-2xl shadow-2xl overflow-hidden`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 1.5625rem 3.125rem rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
            />
            
            <div className="relative flex items-center justify-center gap-fluid-xs">
              <RotateCcw className={
                compact ? "w-4 h-4 sm:w-5 sm:h-5" : "w-5 h-5 sm:w-6 sm:h-6"
              } />
              <span>PLAY AGAIN</span>
            </div>
          </motion.button>

          {/* Share Button - Responsive */}
          <motion.button
            onClick={onShare}
            className={`group relative bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold ${
              compact 
                ? 'py-fluid-xs px-fluid-sm text-fluid-sm min-h-[3rem]' 
                : 'py-fluid-sm px-fluid-lg text-fluid-base sm:text-fluid-lg min-h-[3.5rem] sm:min-h-[4rem]'
            } rounded-2xl shadow-2xl overflow-hidden`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 1.5625rem 3.125rem rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: 0.5
              }}
            />
            
            <div className="relative flex items-center justify-center gap-fluid-xs">
              <Share2 className={
                compact ? "w-4 h-4 sm:w-5 sm:h-5" : "w-5 h-5 sm:w-6 sm:h-6"
              } />
              <span>SHARE SCORE</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Encouraging Footer - Responsive */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <p className={`text-gray-400 ${
            compact 
              ? 'text-fluid-xs sm:text-fluid-sm' 
              : 'text-fluid-sm sm:text-fluid-base'
          } max-w-3xl mx-auto px-fluid-sm leading-relaxed`}>
            {isExcellent 
              ? "🎉 Outstanding performance! Share your amazing score with friends and challenge them to beat it!" 
              : "🧠 Great effort! Challenge yourself again to improve your score and master the quiz!"
            }
          </p>
        </motion.div>
      </div>

      {/* Enhanced Corner Decorations - Full screen only with viewport units */}
      {!compact && (
        <>
          <motion.div
            className="absolute top-[5vh] left-[5vw] text-fluid-3xl sm:text-fluid-4xl opacity-20"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            🎯
          </motion.div>
          
          <motion.div
            className="absolute top-[5vh] right-[5vw] text-fluid-3xl sm:text-fluid-4xl opacity-20"
            animate={{ 
              rotate: -360,
              y: [-10, 10, -10]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            ⭐
          </motion.div>
          
          <motion.div
            className="absolute bottom-[5vh] left-[5vw] text-fluid-3xl sm:text-fluid-4xl opacity-20"
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🚀
          </motion.div>
          
          <motion.div
            className="absolute bottom-[5vh] right-[5vw] text-fluid-3xl sm:text-fluid-4xl opacity-20"
            animate={{ 
              y: [10, -10, 10],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            💫
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default ResultScreen;
