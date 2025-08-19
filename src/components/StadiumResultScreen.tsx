import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Share2, Star } from 'lucide-react';

interface StadiumResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onShare?: () => void;
}

const StadiumResultScreen: React.FC<StadiumResultScreenProps> = ({
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
    if (isPerfect) return "🏆 Perfect Match! You're a Cricket Legend! 🏆";
    if (isExcellent) return "🌟 Outstanding Performance! Cricket Master! 🌟";
    if (isGood) return "🎉 Great Game! Well Played! 🎉";
    return "💪 Keep Practicing! You'll Get There! 💪";
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
    if (isPerfect || isExcellent) return 'stadium-perfect';
    if (isGood) return 'stadium-good';
    return 'stadium-poor';
  };

  const getEncouragingMessage = () => {
    if (isPerfect) return "You've hit every ball for a six! Legendary performance! 🚀";
    if (isExcellent) return "Outstanding batting! You know your cricket inside out! 🎯";
    if (isGood) return "Solid performance! Keep building your cricket knowledge! 📚";
    return "Every match makes you a better player! Practice makes perfect! 🧠";
  };

  return (
    <motion.div
      className="stadium-result-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stadium Background */}
      <div className="result-stadium-bg">
        <div className="result-crowd"></div>
        <div className="result-field"></div>
      </div>

      {/* Trophy Presentation */}
      <motion.div
        className="trophy-section"
        initial={{ y: -100, rotate: -180 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className={`trophy-icon ${isPoor ? '' : 'trophy-bounce'}`}>
          {getEmoji()}
        </div>
        <div className="trophy-glow"></div>
      </motion.div>

      {/* Score Display */}
      <motion.div
        className="score-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="result-title">
          Match Complete!
        </h2>
        <p className="result-message">
          {getMessage()}
        </p>
        
        <div className={`score-display ${getScoreColor()}`}>
          <div className="score-main">
            <span className="score-value">{score}</span>
            <span className="score-separator">/</span>
            <span className="score-total">{totalQuestions}</span>
          </div>
          <div className="score-percentage">
            {percentage}%
          </div>
          <div className="score-label">Runs Scored</div>
        </div>

        {/* Performance Stars */}
        <div className="performance-stars">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
            >
              <Star
                className={`star-icon ${
                  i < getStars() 
                    ? 'star-filled' 
                    : 'star-empty'
                }`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Bar */}
      <motion.div
        className="performance-bar-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="performance-bar-bg">
          <motion.div
            className={`performance-bar-fill ${getScoreColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 1 }}
          />
        </div>
        <div className="performance-labels">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="action-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.button
          onClick={onRestart}
          className="action-button restart-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="button-icon" />
          <span>Play Again</span>
        </motion.button>

        {onShare && (
          <motion.button
            onClick={onShare}
            className="action-button share-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="button-icon" />
            <span>Share Score</span>
          </motion.button>
        )}
      </motion.div>

      {/* Encouraging Message */}
      <motion.p
        className="encouraging-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {getEncouragingMessage()}
      </motion.p>

      {/* Stadium Branding */}
      <motion.div
        className="stadium-branding"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="branding-content">
          <span className="branding-icon">🏟️</span>
          <span className="branding-text">Rajasthan Royals Stadium</span>
        </div>
      </motion.div>

      {/* Crowd Celebration */}
      <div className="crowd-celebration">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="celebration-emoji"
            style={{ 
              animationDelay: `${i * 0.1}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            {isPerfect || isExcellent ? '🎉' : '👏'}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StadiumResultScreen;
