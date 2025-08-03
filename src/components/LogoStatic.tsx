import React from 'react';
import { CheckCircle } from 'lucide-react';

interface LogoStaticProps {
  className?: string;
  maxWidth?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const LogoStatic: React.FC<LogoStaticProps> = ({ 
  className = '', 
  maxWidth = '200px',
  onClick,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'gap-2',
    md: 'gap-3', 
    lg: 'gap-4'
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl'
  };

  return (
    <div 
      className={`flex items-center justify-center cursor-pointer ${className}`}
      style={{ maxWidth }}
      onClick={onClick}
    >
      <div className={`flex items-center ${sizeClasses[size]}`}>
        {/* Static Icon */}
        <div className="relative">
          <div className={`${iconSizes[size]} rounded-full border-2 border-primary flex items-center justify-center`}>
            <CheckCircle className={`${iconSizes[size]} text-primary`} />
          </div>
        </div>

        {/* Static Text */}
        <div className="flex items-baseline">
          <span className={`${textSizes[size]} font-bold text-foreground`}>
            Contractor
          </span>
          <span className={`${textSizes[size]} font-bold text-primary ml-1`}>
            VET
          </span>
        </div>
      </div>
    </div>
  );
};