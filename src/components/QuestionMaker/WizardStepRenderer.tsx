
import React from 'react';
import Step1ConcernInput from './WizardSteps/Step1ConcernInput';
import Step2CategorySelection from './WizardSteps/Step2CategorySelection';
import Step3QuestionReview from './WizardSteps/Step3QuestionReview';
import Step4CustomQuestions from './WizardSteps/Step4CustomQuestions';
import Step5ExportPlan from './WizardSteps/Step5ExportPlan';
import { type WizardState } from './WizardContainer';

interface WizardStepRendererProps {
  wizardState: WizardState;
  onUpdateState: (updates: Partial<WizardState>) => void;
  onNext: () => void;
  onBack: () => void;
  onStartOver: () => void;
  onExportComplete?: () => void;
}

const WizardStepRenderer: React.FC<WizardStepRendererProps> = ({
  wizardState,
  onUpdateState,
  onNext,
  onBack,
  onStartOver,
  onExportComplete
}) => {
  const handleStarToggle = (questionId: string) => {
    const newStarred = new Set(wizardState.starredQuestions);
    if (newStarred.has(questionId)) {
      newStarred.delete(questionId);
    } else {
      newStarred.add(questionId);
    }
    onUpdateState({ starredQuestions: newStarred });
  };

  switch (wizardState.currentStep) {
    case 1:
      return (
        <Step1ConcernInput
          userConcern={wizardState.userConcern}
          onConcernChange={(concern) => onUpdateState({ userConcern: concern })}
          onNext={onNext}
        />
      );
    case 2:
      return (
        <Step2CategorySelection
          selectedCategories={wizardState.selectedCategories}
          onCategoryToggle={(categories) => onUpdateState({ selectedCategories: categories })}
          onNext={onNext}
          onBack={onBack}
        />
      );
    case 3:
      return (
        <Step3QuestionReview
          userConcern={wizardState.userConcern}
          selectedCategories={wizardState.selectedCategories}
          starredQuestions={wizardState.starredQuestions}
          questionOrder={wizardState.questionOrder}
          onStarToggle={handleStarToggle}
          onOrderChange={(order) => onUpdateState({ questionOrder: order })}
          onNext={onNext}
          onBack={onBack}
        />
      );
    case 4:
      return (
        <Step4CustomQuestions
          customQuestions={wizardState.customQuestions}
          onCustomQuestionsChange={(questions) => onUpdateState({ customQuestions: questions })}
          userConcern={wizardState.userConcern}
          onNext={onNext}
          onBack={onBack}
        />
      );
    case 5:
      return (
        <Step5ExportPlan
          wizardState={wizardState}
          onBack={onBack}
          onStartOver={onStartOver}
          onExportComplete={onExportComplete}
        />
      );
    default:
      return null;
  }
};

export default WizardStepRenderer;
