import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, Brain } from 'lucide-react';
import TriviaQuiz from './TriviaQuiz';

interface FloatingButtonProps {
  config?: any;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ config = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial button animation
    gsap.fromTo(buttonRef.current,
      { 
        scale: 0, 
        rotation: -180,
        opacity: 0 
      },
      { 
        scale: 1, 
        rotation: 0,
        opacity: 1, 
        duration: 2.0, 
        ease: "back.out(1.2)",
        delay: 1.5
      }
    );

    // Floating animation
    gsap.to(buttonRef.current, {
      y: -8,
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  const openPopup = () => {
    setIsOpen(true);
    
    // Animate overlay
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.0, ease: "power2.out" }
    );

    // Animate popup
    gsap.fromTo(popupRef.current,
      { 
        scale: 0.6, 
        opacity: 0,
        y: 100
      },
      { 
        scale: 1, 
        opacity: 1,
        y: 0,
        duration: 1.5, 
        ease: "back.out(1.2)",
        delay: 0.3
      }
    );
  };

  const closePopup = () => {
    // Animate popup closing
    gsap.to(popupRef.current, {
      scale: 0.6,
      opacity: 0,
      y: 100,
      duration: 1.0,
      ease: "power2.in",
      onComplete: () => setIsOpen(false)
    });

    // Animate overlay closing
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 1.0,
      ease: "power2.in"
    });
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          ref={buttonRef}
          onClick={openPopup}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 group"
          style={{
            boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)'
          }}
        >
        <div className="flex items-center justify-center w-full h-full">
          <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
        </div>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-20"></div>
        </button>
      )}

      {/* Popup Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
        />
      )}

      {/* Popup */}
      {isOpen && (
        <div
          ref={popupRef}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-[1200px]"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 sm:p-4 relative">
              <h2 className="text-white text-lg sm:text-xl font-bold text-center pr-8">
                🏏 Rajasthan Royals Trivia
              </h2>
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white hover:text-gray-200 transition-colors duration-200 p-1"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Quiz Content */}
            <div className="p-3 sm:p-4">
              <TriviaQuiz 
                config={{
                  ...config,
                  apiUrl: config.apiUrl || 'http://localhost:3001/fetch-sports-trivia',
                  onComplete: (score, total) => {
                    // Call the original onComplete if provided
                    if (config.onComplete) {
                      config.onComplete(score, total);
                    }
                    // Don't auto-close - user must manually close with X button
                  }
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButton;
