import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, Target, Users } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center"
    >
      {/* Rajasthan Royals Logo/Branding */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.2 }}
        className="mb-8"
      >
        <div className="text-6xl mb-4">🏏</div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Rajasthan Royals
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-1">
          Trivia Challenge
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* Welcome Message */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.4 }}
        className="mb-8 max-w-md"
      >
        <p className="text-gray-600 text-lg leading-relaxed">
          Test your cricket knowledge with our exclusive Rajasthan Royals trivia! 
          Challenge yourself with questions about cricket legends, memorable matches, and team history.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full max-w-md"
      >
        <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-pink-50 to-blue-50 border border-pink-100">
          <Target className="w-6 h-6 text-pink-600 mb-2" />
          <span className="text-sm font-medium text-gray-700">Quick Questions</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-pink-50 border border-blue-100">
          <Trophy className="w-6 h-6 text-blue-600 mb-2" />
          <span className="text-sm font-medium text-gray-700">Win Prizes</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-pink-50 to-blue-50 border border-pink-100">
          <Users className="w-6 h-6 text-pink-600 mb-2" />
          <span className="text-sm font-medium text-gray-700">Compete</span>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.8 }}
        className="w-full max-w-xs"
      >
        <button
          onClick={onStart}
          className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-600 to-blue-600 px-8 py-4 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <div className="flex items-center justify-center">
            <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
            Start Quiz
          </div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, delay: 1.0 }}
        className="absolute top-4 right-4 text-2xl opacity-30"
      >
        🏏
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, delay: 1.2 }}
        className="absolute bottom-4 left-4 text-2xl opacity-30"
      >
        🏆
      </motion.div>
    </motion.div>
  );
};

export default StartScreen;
