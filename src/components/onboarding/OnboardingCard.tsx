'use client';

import React, { useState, useRef, useEffect } from 'react';
import { WizardStep } from '../wizardData';

interface OnboardingCardProps {
  step: WizardStep;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrev?: () => void;
  children?: React.ReactNode;
}

const OnboardingCard: React.FC<OnboardingCardProps> = ({
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  children
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1 range
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1 range
        setMousePosition({ x, y });
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Calculate parallax style for the image
  const parallaxStyle = {
    transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
    transition: 'transform 0.1s ease-out'
  };

  const handleNextStep = () => {
    if (onNext) onNext();
  };

  const handlePrevStep = () => {
    if (onPrev) onPrev();
  };

  // Determine if the image is a video
  const isVideo = step.image?.endsWith('.mp4') || step.image?.endsWith('.webm');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900/40 to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div 
        ref={cardRef} 
        className="w-full max-w-6xl h-[700px] perspective-[1000px]"
      >
        <div 
          className="w-full h-full bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-transform duration-300"
          style={{ transform: `rotateY(${mousePosition.x * 2}deg) rotateX(${mousePosition.y * -2}deg)` }}
        >
          {/* Left Panel */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col text-white relative">
            
            {/* Top Row: Counter, Title, Subtitle */}
            <div className='flex-shrink-0'>
              <div className="text-sm text-gray-400 font-medium">
                Step {currentStep} of {totalSteps}
              </div>
              <p className="mt-6 text-sm font-semibold tracking-widest uppercase text-purple-400">
                {step.component}
              </p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-bold">
                {step.title}
              </h1>
              <p className="mt-4 text-gray-300 font-light text-base">
                {step.description}
              </p>
            </div>

            {/* Middle Row: Content */}
            <div className="flex-grow flex items-center">
              {children || (
                <div className="w-full space-y-6">
                  {/* Default content if no children provided */}
                  {step.customComponent || (
                    <p className="text-gray-300">Loading {step.component} component...</p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Row: Buttons */}
            <div className="flex-shrink-0 mt-auto">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleNextStep}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg"
                >
                  {currentStep === totalSteps ? 'Finish' : 'Next'}
                </button>
                {currentStep > 1 && (
                  <button 
                    onClick={handlePrevStep}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Back
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Right Panel */}
          <div className="hidden md:flex w-1/2 items-stretch justify-center overflow-hidden p-4">
            <div className="w-full h-full rounded-2xl overflow-hidden">
              {isVideo ? (
                <video 
                  src={step.image} 
                  autoPlay 
                  loop 
                  muted 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={step.image || "https://picsum.photos/id/1060/800/1200"} 
                  alt={`${step.title} illustration`} 
                  className="w-full h-full object-cover"
                  style={parallaxStyle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCard;
