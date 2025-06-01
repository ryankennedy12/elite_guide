import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Step1ConcernInput from './WizardSteps/Step1ConcernInput';
import Step2CategorySelection from './WizardSteps/Step2CategorySelection';
import Step3QuestionReview from './WizardSteps/Step3QuestionReview';
import Step4CustomQuestions from './WizardSteps/Step4CustomQuestions';
import Step5ExportPlan from './WizardSteps/Step5ExportPlan';
import { type WizardQuestionCategory } from '@/data/wizard';

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

const WizardContainer: React.FC = () => {
  const navigate = useNavigate();
  
  const [wizardState, setWizardState] = useState<WizardState>({
    currentStep: 1,
    userConcern: '',
    selectedCategories: [],
    starredQuestions: new Set(),
    customQuestions: [],
    questionOrder: []
  });

  useEffect(() => {
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }
  }, [navigate]);

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

  const nextStep = () => {
    if (wizardState.currentStep < TOTAL_STEPS) {
      updateWizardState({ currentStep: wizardState.currentStep + 1 });
    }
  };

  const prevStep = () => {
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

  const renderCurrentStep = () => {
    switch (wizardState.currentStep) {
      case 1:
        return (
          <Step1ConcernInput
            userConcern={wizardState.userConcern}
            onConcernChange={(concern) => updateWizardState({ userConcern: concern })}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2CategorySelection
            selectedCategories={wizardState.selectedCategories}
            onCategoryToggle={(categories) => updateWizardState({ selectedCategories: categories })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <Step3QuestionReview
            userConcern={wizardState.userConcern}
            selectedCategories={wizardState.selectedCategories}
            starredQuestions={wizardState.starredQuestions}
            questionOrder={wizardState.questionOrder}
            onStarToggle={(questionId) => {
              const newStarred = new Set(wizardState.starredQuestions);
              if (newStarred.has(questionId)) {
                newStarred.delete(questionId);
              } else {
                newStarred.add(questionId);
              }
              updateWizardState({ starredQuestions: newStarred });
            }}
            onOrderChange={(order) => updateWizardState({ questionOrder: order })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Step4CustomQuestions
            customQuestions={wizardState.customQuestions}
            onCustomQuestionsChange={(questions) => updateWizardState({ customQuestions: questions })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <Step5ExportPlan
            wizardState={wizardState}
            onBack={prevStep}
            onStartOver={() => {
              setWizardState({
                currentStep: 1,
                userConcern: '',
                selectedCategories: [],
                starredQuestions: new Set(),
                customQuestions: [],
                questionOrder: []
              });
              localStorage.removeItem('wizardState');
            }}
          />
        );
      default:
        return null;
    }
  };

  const progressPercentage = (wizardState.currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-inter-tight font-bold text-2xl md:text-3xl text-black">
              Let's Build Your Contractor Interview Plan
            </h1>
            <div className="text-sm text-gray-500">
              Step {wizardState.currentStep} of {TOTAL_STEPS}
            </div>
          </div>
          
          <Progress value={progressPercentage} className="mb-4" />
          
          {/* Step Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {stepTitles.map((title, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === wizardState.currentStep;
              const isCompleted = stepNumber < wizardState.currentStep;
              
              return (
                <button
                  key={stepNumber}
                  onClick={() => goToStep(stepNumber)}
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

        {/* Current Step Content */}
        <Card className="min-h-[500px]">
          {renderCurrentStep()}
        </Card>

        {/* Navigation Buttons */}
        {wizardState.currentStep !== 5 && (
          <div className="flex justify-between mt-6">
            <Button
              onClick={prevStep}
              variant="outline"
              disabled={wizardState.currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
            >
              {wizardState.currentStep === TOTAL_STEPS ? 'Finish' : 'Continue'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WizardContainer;
