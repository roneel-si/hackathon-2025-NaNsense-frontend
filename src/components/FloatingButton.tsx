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
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-16 h-16 sm:w-18 sm:h-18 rr-gradient rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 group"
          style={{
            boxShadow: '0 15px 35px rgba(233, 30, 99, 0.4), 0 5px 15px rgba(63, 81, 181, 0.3)'
          }}
        >
        <div className="flex items-center justify-center w-full h-full">
          <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
        </div>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-20"></div>
        
        {/* Cricket bat decoration */}
        <div className="absolute -top-2 -right-2 text-lg opacity-70 cricket-bounce">
          🏏
        </div>
        </button>
      )}

      {/* Popup Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
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
            <div className="rr-gradient p-4 sm:p-5 relative">
              <h2 className="text-white text-xl sm:text-2xl font-bold text-center pr-10">
                🏏 Rajasthan Royals Trivia Quiz
              </h2>
              <p className="text-pink-100 text-sm text-center mt-1">
                Test your cricket knowledge!
              </p>
              <button
                onClick={closePopup}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-pink-200 transition-colors duration-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Quiz Content */}
            <div className="p-4 sm:p-5">
              <TriviaQuiz 
                config={{
                  ...config,
                  apiUrl: config.apiUrl || 'https://sportziq-apis.onrender.com/generate-sports-trivia',
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
