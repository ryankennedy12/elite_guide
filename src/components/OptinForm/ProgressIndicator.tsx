
import React from 'react';
import styles from './FormContainer.module.css';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps = 3
}) => {
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
