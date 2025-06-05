
import React from 'react';
import styles from './ProgressDots.module.css';

interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className={styles.progressDots}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        let dotClass = styles.progressDot;
        
        if (stepNumber < currentStep) {
          dotClass += ` ${styles.completed}`;
        } else if (stepNumber === currentStep) {
          dotClass += ` ${styles.active}`;
        }
        
        return (
          <div 
            key={stepNumber}
            className={dotClass}
            aria-label={`Step ${stepNumber} ${stepNumber < currentStep ? 'completed' : stepNumber === currentStep ? 'active' : 'pending'}`}
          />
        );
      })}
    </div>
  );
};
