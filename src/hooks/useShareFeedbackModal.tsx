
import { useState, useEffect } from 'react';

export const useShareFeedbackModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerModal = (event: 'guide_completion' | 'pdf_download' | 'notes_completion') => {
    // Check if modal was already shown this session
    const modalShown = sessionStorage.getItem('share_feedback_modal_shown');
    
    if (modalShown !== 'true') {
      setIsModalOpen(true);
      sessionStorage.setItem('share_feedback_modal_shown', 'true');
      
      // Track analytics if available
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'share_feedback_modal_triggered', {
          trigger_event: event
        });
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    triggerModal,
    closeModal
  };
};
