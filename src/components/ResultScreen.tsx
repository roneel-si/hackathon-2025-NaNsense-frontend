import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Share2, Star } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onShare?: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  onRestart,
  onShare
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfect = score === totalQuestions;
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 50;
  const isPoor = percentage < 50;

  const getMessage = () => {
    if (isPerfect) return "🏆 Perfect Score! You're a Rajasthan Royals legend! 🏆";
    if (isExcellent) return "🌟 Excellent! You're a cricket master! 🌟";
    if (isGood) return "🎉 Good job! Great cricket knowledge! 🎉";
    return "💪 Keep practicing! You'll become a cricket expert! 💪";
  };

  const getEmoji = () => {
    if (isPerfect) return "🏆";
    if (isExcellent) return "🌟";
    if (isGood) return "🏏";
    return "💪";
  };

  const getStars = () => {
    if (isPerfect) return 5;
    if (isExcellent) return 4;
    if (isGood) return 3;
    return Math.max(1, Math.floor(percentage / 20));
  };

  const getScoreColor = () => {
    if (isPerfect || isExcellent) return 'rr-gradient';
    if (isGood) return 'bg-gradient-to-r from-green-500 to-blue-600';
    return 'bg-gradient-to-r from-orange-500 to-red-600';
  };

  const getEncouragingMessage = () => {
    if (isPerfect) return "You're absolutely incredible! A true cricket master! 🚀";
    if (isExcellent) return "Outstanding performance! You know your cricket! 🎯";
    if (isGood) return "Well done! Keep learning and improving! 📚";
    return "Every quiz makes you a better cricket fan! Practice makes perfect! 🧠";
  };

  return (
    <motion.div
      className="quiz-card text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Trophy Icon */}
      <motion.div
        className="flex justify-center mb-6"
        initial={{ y: -50, rotate: -180 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className={`text-8xl ${isPoor ? '' : 'cricket-bounce'}`}>{getEmoji()}</div>
      </motion.div>

      {/* Score Display */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold rr-pink mb-2">
          Quiz Complete!
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          {getMessage()}
        </p>
        
        <div className={`${getScoreColor()} text-white rounded-2xl p-6 mb-4 shadow-xl`}>
          <div className="text-4xl font-bold mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-xl rr-gold font-semibold">
            {percentage}%
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
            >
              <Star
                className={`w-8 h-8 ${
                  i < getStars() 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Bar */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-gray-200 rounded-full h-3 mb-2 shadow-inner">
          <motion.div
            className={`h-3 rounded-full shadow-lg ${
              isPerfect || isExcellent ? 'rr-gradient' :
              isGood ? 'bg-gradient-to-r from-green-500 to-blue-600' :
              'bg-gradient-to-r from-orange-500 to-red-600'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 1 }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.button
          onClick={onRestart}
          className="flex-1 rr-bg-pink hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-5 h-5" />
          <span>Play Again</span>
        </motion.button>

        {onShare && (
          <motion.button
            onClick={onShare}
            className="flex-1 rr-bg-blue hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-5 h-5" />
            <span>Share Score</span>
          </motion.button>
        )}
      </motion.div>

      {/* Encouraging Message */}
      <motion.p
        className="text-sm text-gray-500 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {getEncouragingMessage()}
      </motion.p>

      {/* Rajasthan Royals branding */}
      <motion.div
        className="mt-6 pt-4 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <p className="text-xs text-gray-400">
          🏏 Powered by Rajasthan Royals Trivia
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ResultScreen;
