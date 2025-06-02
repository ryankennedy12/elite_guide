import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import ShareFeedbackModal from '@/components/ShareFeedbackModal';
import { useShareFeedbackModal } from '@/hooks/useShareFeedbackModal';

const Elite12Questions = () => {
  const navigate = useNavigate();

  // Example state for questions and current index
  const [questions, setQuestions] = useState<string[]>([
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
    "Question 6",
    "Question 7",
    "Question 8",
    "Question 9",
    "Question 10",
    "Question 11",
    "Question 12",
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Load viewed questions from localStorage or initialize
  useEffect(() => {
    const viewed = localStorage.getItem('viewedQuestions');
    if (!viewed) {
      localStorage.setItem('viewedQuestions', JSON.stringify([]));
    }
  }, []);

  // Track viewed questions on question change
  useEffect(() => {
    const viewed = localStorage.getItem('viewedQuestions');
    let viewedArray: number[] = [];
    if (viewed) {
      try {
        viewedArray = JSON.parse(viewed);
      } catch {
        viewedArray = [];
      }
    }
    if (!viewedArray.includes(currentQuestionIndex)) {
      viewedArray.push(currentQuestionIndex);
      localStorage.setItem('viewedQuestions', JSON.stringify(viewedArray));
    }
  }, [currentQuestionIndex]);

  // Navigation handlers
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // PDF download logic (placeholder)
  const handlePDFDownload = () => {
    // Example PDF download logic
    const pdfUrl = '/path/to/elite12-guide.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Elite12Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Trigger modal after PDF download
    setTimeout(() => {
      showModal('pdf-download');
    }, 1000);
  };

  const { isModalOpen, triggerType, showModal, closeModal } = useShareFeedbackModal();

  // Trigger modal when user reaches near the end and has interacted significantly
  useEffect(() => {
    const viewedQuestions = localStorage.getItem('viewedQuestions');
    const hasInteracted = viewedQuestions && JSON.parse(viewedQuestions).length >= 8;

    if (hasInteracted && currentQuestionIndex >= questions.length - 2) {
      // User is near completion, trigger modal after a delay
      setTimeout(() => {
        const event = new CustomEvent('guide-completed');
        window.dispatchEvent(event);
      }, 3000);
    }
  }, [currentQuestionIndex, questions.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Elite 12 Questions</h1>
        <div className="mb-4 text-center text-lg font-medium">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="mb-8 text-center text-xl text-gray-800">
          {questions[currentQuestionIndex]}
        </div>
        <div className="flex justify-between">
          <Button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </Button>
        </div>
        <div className="mt-8 flex justify-center">
          <Button onClick={handlePDFDownload} className="bg-yellow-400 text-black hover:bg-yellow-500">
            Download PDF Guide
          </Button>
        </div>
      </Card>

      {/* Add the Share Feedback Modal */}
      <ShareFeedbackModal
        isOpen={isModalOpen}
        onClose={closeModal}
        trigger={triggerType}
      />
    </div>
  );
};

export default Elite12Questions;
