
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface WizardHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onStepClick: (step: number) => void;
}

const WizardHeader: React.FC<WizardHeaderProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
  onStepClick
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-inter-tight font-bold text-2xl md:text-3xl text-black">
          Let's Build Your Contractor Interview Plan
        </h1>
        <div className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      
      <Progress value={progressPercentage} className="mb-4" />
      
      {/* Step Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <button
              key={stepNumber}
              onClick={() => onStepClick(stepNumber)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-black text-white'
                  : isCompleted
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {stepNumber}. {title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WizardHeader;
