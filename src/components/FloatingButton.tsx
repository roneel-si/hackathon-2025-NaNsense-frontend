import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain } from 'lucide-react';
import TriviaQuiz from './TriviaQuiz';
import { fetchQuestionsFromAPI } from '../utils/apiUtils';
import { shuffleAllQuestions, ShuffledQuestion } from '../utils/shuffleUtils';

interface FloatingButtonProps {
  config?: any;
}

// Theme configuration based on domain
const getThemeByDomain = () => {
  const hostname = window.location.hostname.toLowerCase();
  
  // KKR Theme (Purple & Gold)
  if (hostname.includes('kkr.in') || hostname.includes('kolkata') || hostname.includes('knight')) {
    return {
      name: 'KKR',
      primary: 'from-purple-900 via-purple-800 to-indigo-900',
      secondary: 'from-yellow-500 to-amber-600',
      accent: 'from-purple-600 to-indigo-700',
      button: 'from-purple-500 via-purple-600 to-indigo-600',
      text: 'text-purple-100',
      border: 'border-purple-500/30',
      glow: 'rgba(147, 51, 234, 0.3)',
      modalBg: 'from-purple-900 via-slate-900 to-purple-900',
      startBg: 'from-purple-900 via-indigo-900 to-purple-900',
      questionBg: 'from-slate-900 via-purple-900 to-slate-900'
    };
  }
  
  // Rajasthan Royals Theme (Pink & Blue)
  if (hostname.includes('rajasthanroyals.com') || hostname.includes('rajasthan') || hostname.includes('royals')) {
    return {
      name: 'RRR',
      primary: 'from-pink-900 via-rose-800 to-blue-900',
      secondary: 'from-pink-500 to-rose-600',
      accent: 'from-blue-600 to-pink-700',
      button: 'from-pink-500 via-rose-600 to-blue-600',
      text: 'text-pink-100',
      border: 'border-pink-500/30',
      glow: 'rgba(236, 72, 153, 0.3)',
      modalBg: 'from-pink-900 via-slate-900 to-blue-900',
      startBg: 'from-pink-900 via-rose-900 to-blue-900',
      questionBg: 'from-slate-900 via-pink-900 to-slate-900'
    };
  }
  
  // Default Random Theme (Original colors with good visibility)
  return {
    name: 'DEFAULT',
    primary: 'from-slate-900 via-purple-900 to-slate-900',
    secondary: 'from-green-500 to-emerald-600',
    accent: 'from-indigo-600 to-purple-700',
    button: 'from-pink-500 via-purple-500 to-blue-600',
    text: 'text-white',
    border: 'border-white/20',
    glow: 'rgba(233, 30, 99, 0.3)',
    modalBg: 'from-slate-900 via-purple-900 to-slate-900',
    startBg: 'from-indigo-900 via-purple-900 to-pink-900',
    questionBg: 'from-slate-900 via-purple-900 to-slate-900'
  };
};

// Device detection and responsive sizing utility
const useResponsiveModal = () => {
  const [modalDimensions, setModalDimensions] = useState({
    width: '90vw',
    height: '85vh',
    maxWidth: '31.25rem',
    maxHeight: '43.75rem',
    padding: '1rem',
    isCompact: true
  });

  useEffect(() => {
    const calculateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;
      
      // Device type detection
      const isMobile = width <= 768;
      const isTablet = width > 768 && width <= 1024;
      const isDesktop = width > 1024;
      const isPortrait = aspectRatio < 0.8;
      
      let dimensions = {
        width: '90vw',
        height: 'calc(100vh - 200px)',
        maxWidth: '31.25rem',
        maxHeight: 'calc(100vh - 200px)',
        padding: '1rem',
        isCompact: true
      };

      if (isMobile) {
        if (isPortrait) {
          // Mobile Portrait - Optimize for better fit
          dimensions = {
            width: '95vw',
            height: 'calc(100vh - 100px)',
            maxWidth: 'none',
            maxHeight: 'calc(100vh - 100px)',
            padding: 'clamp(0.25rem, 1vw, 0.5rem)',
            isCompact: true
          };
        } else {
          // Mobile Landscape - Critical fix for content overflow
          dimensions = {
            width: '95vw',
            height: 'calc(100vh - 80px)',
            maxWidth: 'none',
            maxHeight: 'calc(100vh - 80px)',
            padding: 'clamp(0.125rem, 0.5vw, 0.25rem)',
            isCompact: true
          };
        }
      } else if (isTablet) {
        if (isPortrait) {
          // Tablet Portrait
          dimensions = {
            width: '85vw',
            height: 'calc(100vh - 120px)',
            maxWidth: '37.5rem',
            maxHeight: 'calc(100vh - 120px)',
            padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
            isCompact: true
          };
        } else {
          // Tablet Landscape - Better space utilization
          dimensions = {
            width: '90vw',
            height: 'calc(100vh - 100px)',
            maxWidth: 'none',
            maxHeight: 'calc(100vh - 100px)',
            padding: 'clamp(0.375rem, 1vw, 0.5rem)',
            isCompact: true
          };
        }
      } else if (isDesktop) {
        // Desktop - Maintain compact but increase height
        if (height < 700) {
          // Short desktop screens
          dimensions = {
            width: '75vw',
            height: 'calc(100vh - 80px)',
            maxWidth: '50rem',
            maxHeight: 'calc(100vh - 80px)',
            padding: 'clamp(0.5rem, 1vw, 1rem)',
            isCompact: true
          };
        } else {
          // Normal desktop screens
          dimensions = {
            width: '55vw',
            height: 'calc(100vh - 150px)',
            maxWidth: '40.625rem',
            maxHeight: 'calc(100vh - 150px)',
            padding: 'clamp(1rem, 2vw, 1.5rem)',
            isCompact: true
          };
        }
      }

      // Critical fixes for edge cases
      if (width < 350 || height < 500) {
        // Very small screens - maximize usage
        dimensions = {
          width: '100vw',
          height: '100vh',
          maxWidth: 'none',
          maxHeight: '100vh',
          padding: 'clamp(0.125rem, 0.5vw, 0.25rem)',
          isCompact: true
        };
      }

      setModalDimensions(dimensions);
    };

    // Calculate on mount and resize
    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    window.addEventListener('orientationchange', () => {
      setTimeout(calculateDimensions, 100); // Delay for orientation change
    });

    return () => {
      window.removeEventListener('resize', calculateDimensions);
      window.removeEventListener('orientationchange', calculateDimensions);
    };
  }, []);

  return modalDimensions;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ config = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [showLoadingAfterStart, setShowLoadingAfterStart] = useState(false);
  
  // Use responsive modal dimensions and theme
  const modalDimensions = useResponsiveModal();
  const theme = getThemeByDomain();

  useEffect(() => {
    // Delayed entrance for the floating button
    const timer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openModal = async () => {
    setIsOpen(true);
    
    // Start fetching questions in background when modal opens (but don't show loading yet)
    const apiUrl = config.apiUrl || 'https://sportziq-apis.onrender.com/trivia/generate-sports-trivia';
    
    if (apiUrl && questions.length === 0) {
      // Fetch questions silently in background
      try {
        const fetchedQuestions = await fetchQuestionsFromAPI(apiUrl);
        const shuffledQuestions = shuffleAllQuestions(fetchedQuestions);
        setQuestions(shuffledQuestions);
      } catch (err) {
        console.error('Failed to fetch questions on modal open:', err);
      }
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setShowLoadingAfterStart(false); // Reset loading state when modal closes
  };

  const reloadQuestions = async () => {
    const apiUrl = config.apiUrl || 'https://sportziq-apis.onrender.com/trivia/generate-sports-trivia';
    
    setIsLoadingQuestions(true);
    setQuestions([]); // Clear existing questions
    
    try {
      const fetchedQuestions = await fetchQuestionsFromAPI(apiUrl);
      const shuffledQuestions = shuffleAllQuestions(fetchedQuestions);
      setQuestions(shuffledQuestions);
      setIsLoadingQuestions(false);
    } catch (err) {
      console.error('Failed to reload questions:', err);
      setIsLoadingQuestions(false);
    }
  };

  // Handle when user clicks START QUIZ
  const handleStartQuiz = async () => {
    // If questions are already loaded, proceed normally
    if (questions.length > 0) {
      setShowLoadingAfterStart(false);
      return;
    }

    // If questions are not loaded yet, show loading and wait for them
    setShowLoadingAfterStart(true);
    setIsLoadingQuestions(true);
    
    const apiUrl = config.apiUrl || 'https://sportziq-apis.onrender.com/trivia/generate-sports-trivia';
    
    try {
      const fetchedQuestions = await fetchQuestionsFromAPI(apiUrl);
      const shuffledQuestions = shuffleAllQuestions(fetchedQuestions);
      setQuestions(shuffledQuestions);
      setIsLoadingQuestions(false);
      setShowLoadingAfterStart(false);
    } catch (err) {
      console.error('Failed to fetch questions after start:', err);
      setIsLoadingQuestions(false);
      setShowLoadingAfterStart(false);
    }
  };

  // Animation variants for the floating button
  const buttonVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      rotate: -180,
      y: 100
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.5
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      rotate: -5,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 10
      }
    }
  };

  // Animation variants for the modal
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      y: 100,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8
      } 
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      rotateX: 15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.5
      }
    }
  };

  // Animation variants for the overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  // Animation variants for the close button
  const closeButtonVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: 90, 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      rotate: 135, 
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15
      }
    }
  };

  return (
    <>
      {/* Responsive Floating Button */}
      <AnimatePresence>
        {isButtonVisible && !isOpen && (
          <motion.div
            className="fixed bottom-fluid-md right-fluid-md z-[1000]"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.button
              onClick={openModal}
              className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-br ${theme.button} rounded-full shadow-2xl group overflow-hidden`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              style={{
                boxShadow: `0 0.5rem 2rem ${theme.glow}, 0 0.25rem 1rem rgba(0, 0, 0, 0.2)`
              }}
            >
              {/* Background gradient animation */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${theme.accent} rounded-full`}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Main content */}
              <div className={`absolute inset-0.5 bg-gradient-to-br ${theme.button} rounded-full flex items-center justify-center`}>
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Brain className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-white drop-shadow-lg" />
                </motion.div>
              </div>
              
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/20"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5
                }}
              />
              
              {/* Sports decoration with better animation */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ⚽
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1500]"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeModal}
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-[1500] flex items-center justify-center p-fluid-sm">
              <motion.div
                className="relative bg-transparent rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                style={{
                  width: modalDimensions.width,
                  height: modalDimensions.height,
                  maxWidth: modalDimensions.maxWidth,
                  maxHeight: modalDimensions.maxHeight,
                  padding: modalDimensions.padding
                }}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with close button */}
                <div className="relative flex-shrink-0">
                  <motion.button
                    onClick={closeModal}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors duration-200 z-10 backdrop-blur-sm border border-white/20"
                    variants={closeButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* Quiz Content with proper height calculation */}
                <div className="flex-1 overflow-hidden">
                  {/* Show loading state only after user clicks START QUIZ and questions aren't ready */}
                  {showLoadingAfterStart && isLoadingQuestions ? (
                    <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center rounded-lg">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
                        <p className="text-white text-fluid-lg">Loading Questions...</p>
                        <p className="text-gray-300 text-fluid-sm mt-2">Please wait while we fetch your trivia questions</p>
                      </div>
                    </div>
                  ) : (
                    /* Show TriviaQuiz - it will handle its own start screen and loading states */
                    <div className="h-full">
                      <TriviaQuiz 
                        config={{
                          ...config,
                          questions: questions, // Pass the fetched questions
                          onComplete: (score, total) => {
                            if (config.onComplete) {
                              config.onComplete(score, total);
                            }
                          }
                        }}
                        compact={modalDimensions.isCompact}
                        onReload={reloadQuestions}
                        onStartQuiz={handleStartQuiz}
                        theme={theme}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingButton;
