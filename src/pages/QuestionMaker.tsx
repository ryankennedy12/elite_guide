import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import WizardContainer from '@/components/QuestionMaker/WizardContainer';
import ShareFeedbackModal from '@/components/ShareFeedbackModal';
import { useShareFeedbackModal } from '@/hooks/useShareFeedbackModal';

const QuestionMaker = () => {
  const { isModalOpen, triggerType, showModal, closeModal } = useShareFeedbackModal();

  // Trigger modal when user completes their interview plan
  const handlePlanComplete = () => {
    showModal('notes-submit');
  };

  // Listen for wizard completion from WizardContainer
  useEffect(() => {
    const handleWizardComplete = () => {
      handlePlanComplete();
    };

    window.addEventListener('wizard-completed', handleWizardComplete);
    
    return () => {
      window.removeEventListener('wizard-completed', handleWizardComplete);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <WizardContainer />
      
      {/* Add the Share Feedback Modal */}
      <ShareFeedbackModal
        isOpen={isModalOpen}
        onClose={closeModal}
        trigger={triggerType}
      />
    </div>
  );
};

export default QuestionMaker;
