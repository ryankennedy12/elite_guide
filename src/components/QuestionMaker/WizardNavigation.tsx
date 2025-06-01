
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  totalSteps,
  canProceed,
  onPrevStep,
  onNextStep
}) => {
  // Don't show navigation on the final step
  if (currentStep === totalSteps) {
    return null;
  }

  return (
    <div className="flex justify-between mt-6">
      <Button
        onClick={onPrevStep}
        variant="outline"
        disabled={currentStep === 1}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>
      
      <Button
        onClick={onNextStep}
        disabled={!canProceed}
        className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
      >
        {currentStep === totalSteps ? 'Finish' : 'Continue'}
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default WizardNavigation;
