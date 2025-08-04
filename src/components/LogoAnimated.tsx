import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface LogoAnimatedProps {
  className?: string;
  maxWidth?: string;
  onClick?: () => void;
}

export const LogoAnimated: React.FC<LogoAnimatedProps> = ({ 
  className = '', 
  maxWidth = '320px',
  onClick 
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Check if we've already animated in this session for this specific page
    const currentPath = window.location.pathname;
    const sessionKey = `logo-animated-${currentPath}`;
    const hasAnimatedInSession = sessionStorage.getItem(sessionKey);
    
    console.log('LogoAnimated useEffect:', { currentPath, sessionKey, hasAnimatedInSession });
    
    if (!hasAnimatedInSession) {
      // Check user's motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      console.log('Setting up animation:', { prefersReducedMotion });
      
      if (!prefersReducedMotion) {
        setShouldAnimate(true);
        // Mark as animated for this session
        sessionStorage.setItem(sessionKey, 'true');
        console.log('Animation triggered for path:', currentPath);
      }
    } else {
      console.log('Animation already shown for this session on path:', currentPath);
    }
  }, []);

  const handleAnimationComplete = () => {
    setHasAnimated(true);
  };

  return (
    <div 
      className={`flex items-center justify-center cursor-pointer ${className}`}
      style={{ maxWidth }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {/* Animated Icon */}
        <div className="relative">
          <div 
            className={`w-12 h-12 rounded-full border-2 border-primary transition-all duration-500 ${
              shouldAnimate ? 'animate-logo-circle' : ''
            }`}
            style={{
              animation: shouldAnimate ? 'drawCircle 0.6s ease-out forwards' : 'none'
            }}
          >
            <CheckCircle 
              className={`w-8 h-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                shouldAnimate ? 'animate-logo-check' : 'opacity-100 scale-100'
              }`}
              style={{
                animation: shouldAnimate ? 'fadeInCheck 0.4s ease-out 0.6s forwards' : 'none',
                opacity: shouldAnimate ? '0' : '1',
                transform: shouldAnimate ? 'translate(-50%, -50%) scale(0.8)' : 'translate(-50%, -50%) scale(1)'
              }}
            />
          </div>
        </div>

        {/* Animated Text */}
        <div className="flex items-baseline">
          <span className="text-2xl md:text-3xl font-bold text-foreground">
            {'Contractor'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  animation: shouldAnimate ? `letterFadeIn 0.1s ease-out ${1.0 + index * 0.05}s forwards` : 'none',
                  opacity: shouldAnimate ? '0' : '1'
                }}
              >
                {letter}
              </span>
            ))}
          </span>
          <span className="text-2xl md:text-3xl font-bold text-primary ml-1">
            {'VET'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  animation: shouldAnimate ? `letterFadeIn 0.1s ease-out ${1.5 + index * 0.1}s forwards` : 'none',
                  opacity: shouldAnimate ? '0' : '1'
                }}
                onAnimationEnd={index === 2 ? handleAnimationComplete : undefined}
              >
                {letter}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Glow Effect */}
      {shouldAnimate && (
        <div 
          className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
          style={{
            animation: 'glowPulse 0.8s ease-out 2.0s forwards',
            boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
          }}
        />
      )}

      <style>{`
        @keyframes drawCircle {
          from {
            stroke-dasharray: 0 100;
          }
          to {
            stroke-dasharray: 100 0;
          }
        }

        @keyframes fadeInCheck {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes letterFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glowPulse {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};