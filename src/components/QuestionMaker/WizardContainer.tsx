
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { type WizardQuestionCategory } from '@/data/wizard';
import WizardHeader from './WizardHeader';
import WizardNavigation from './WizardNavigation';
import WizardStepRenderer from './WizardStepRenderer';

export interface WizardState {
  currentStep: number;
  userConcern: string;
  selectedCategories: WizardQuestionCategory[];
  starredQuestions: Set<string>;
  customQuestions: string[];
  questionOrder: string[];
}

const TOTAL_STEPS = 5;

const stepTitles = [
  "What's Your Main Concern?",
  "Which Topics Matter Most?",
  "Preview & Customize Your Questions",
  "Add Your Own Questions",
  "Export or Share Your Plan"
];

interface WizardContainerProps {
  onPlanComplete?: () => void;
}

const WizardContainer: React.FC<WizardContainerProps> = ({ onPlanComplete }) => {
  const [wizardState, setWizardState] = useState<WizardState>({
    currentStep: 1,
    userConcern: '',
    selectedCategories: [],
    starredQuestions: new Set(),
    customQuestions: [],
    questionOrder: []
  });

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('wizardState', JSON.stringify({
      ...wizardState,
      starredQuestions: Array.from(wizardState.starredQuestions)
    }));
  }, [wizardState]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('wizardState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setWizardState({
          ...parsed,
          starredQuestions: new Set(parsed.starredQuestions || [])
        });
      } catch (error) {
        console.log('Error loading saved wizard state:', error);
      }
    }
  }, []);

  const updateWizardState = (updates: Partial<WizardState>) => {
    setWizardState(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (wizardState.currentStep < TOTAL_STEPS) {
      updateWizardState({ currentStep: wizardState.currentStep + 1 });
    }
  };

  const handleBack = () => {
    if (wizardState.currentStep > 1) {
      updateWizardState({ currentStep: wizardState.currentStep - 1 });
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      updateWizardState({ currentStep: step });
    }
  };

  const canProceed = () => {
    switch (wizardState.currentStep) {
      case 1:
        return true; // Can always proceed from step 1
      case 2:
        return wizardState.selectedCategories.length > 0;
      case 3:
        return true; // Can proceed even with no starred questions
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleStartOver = () => {
    setWizardState({
      currentStep: 1,
      userConcern: '',
      selectedCategories: [],
      starredQuestions: new Set(),
      customQuestions: [],
      questionOrder: []
    });
    localStorage.removeItem('wizardState');
  };

  const handleExportComplete = () => {
    // Trigger the completion callback when user exports their plan
    if (onPlanComplete) {
      onPlanComplete();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with Progress */}
        <WizardHeader
          currentStep={wizardState.currentStep}
          totalSteps={TOTAL_STEPS}
          stepTitles={stepTitles}
          onStepClick={goToStep}
        />

        {/* Current Step Content */}
        <Card className="min-h-[500px]">
          <WizardStepRenderer
            wizardState={wizardState}
            onUpdateState={updateWizardState}
            onNext={handleNext}
            onBack={handleBack}
            onStartOver={handleStartOver}
            onExportComplete={handleExportComplete}
          />
        </Card>

        {/* Navigation Buttons */}
        <WizardNavigation
          currentStep={wizardState.currentStep}
          totalSteps={TOTAL_STEPS}
          canProceed={canProceed()}
          onPrevStep={handleBack}
          onNextStep={handleNext}
        />
      </div>
    </div>
  );
};

export default WizardContainer;
