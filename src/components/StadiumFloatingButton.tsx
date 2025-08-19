import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StadiumQuiz from './StadiumQuiz';

const StadiumFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="stadium-floating-button"
        onClick={handleToggle}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.5 
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          boxShadow: "0 20px 40px rgba(233, 30, 99, 0.4)"
        }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="stadium-button-content">
          <span className="stadium-button-icon">🏟️</span>
          <span className="stadium-button-text">Stadium Quiz</span>
        </div>
        <div className="stadium-button-glow"></div>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="stadium-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* Modal Content */}
            <motion.div
              className="stadium-modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="stadium-close-button"
                onClick={handleClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="close-icon">×</span>
              </motion.button>

              {/* Quiz Component */}
              <StadiumQuiz />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StadiumFloatingButton;
