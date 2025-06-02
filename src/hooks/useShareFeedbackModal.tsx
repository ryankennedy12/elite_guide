
import { useState, useEffect } from 'react';

type TriggerType = 'guide-complete' | 'pdf-download' | 'notes-submit';

export const useShareFeedbackModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerType, setTriggerType] = useState<TriggerType>('guide-complete');

  // Check if modal was already shown this session
  const hasShownModal = () => {
    return sessionStorage.getItem('share_feedback_modal_shown') === 'true';
  };

  const markModalShown = () => {
    sessionStorage.setItem('share_feedback_modal_shown', 'true');
  };

  const showModal = (trigger: TriggerType) => {
    if (!hasShownModal()) {
      setTriggerType(trigger);
      setIsModalOpen(true);
      markModalShown();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Auto-trigger on guide completion (if user reaches end of guide)
  useEffect(() => {
    const handleGuideComplete = () => {
      showModal('guide-complete');
    };

    // Listen for custom events from other components
    window.addEventListener('guide-completed', handleGuideComplete);
    
    return () => {
      window.removeEventListener('guide-completed', handleGuideComplete);
    };
  }, []);

  return {
    isModalOpen,
    triggerType,
    showModal,
    closeModal
  };
};
