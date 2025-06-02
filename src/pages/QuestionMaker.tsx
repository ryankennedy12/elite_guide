
import React from 'react';
import Navigation from '@/components/Navigation';
import WizardContainer from '@/components/QuestionMaker/WizardContainer';
import ShareFeedbackModal from '@/components/ShareFeedbackModal';
import { useShareFeedbackModal } from '@/hooks/useShareFeedbackModal';

const QuestionMaker = () => {
  const { isModalOpen, triggerModal, closeModal } = useShareFeedbackModal();

  const handlePlanComplete = () => {
    triggerModal('notes_completion');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <WizardContainer onPlanComplete={handlePlanComplete} />
      <ShareFeedbackModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default QuestionMaker;
