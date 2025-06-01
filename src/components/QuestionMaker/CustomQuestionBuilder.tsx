
import React, { useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ContextualInspiration } from './ContextualInspiration';
import { StickyQuestionInput } from './StickyQuestionInput';

interface CustomQuestionBuilderProps {
  onAddQuestion: (question: string) => void;
  userConcern: string;
}

export const CustomQuestionBuilder: React.FC<CustomQuestionBuilderProps> = ({
  onAddQuestion,
  userConcern
}) => {
  const [currentQuestion, setCurrentQuestion] = useState('');

  const handleAddQuestion = () => {
    if (currentQuestion.trim()) {
      onAddQuestion(currentQuestion.trim());
      setCurrentQuestion('');
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setCurrentQuestion(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddQuestion();
    }
  };

  return (
    <TooltipProvider>
      <div className="pb-20"> {/* Add bottom padding for sticky input */}
        <ContextualInspiration
          userConcern={userConcern}
          onSelectSuggestion={handleSelectSuggestion}
        />
        
        <StickyQuestionInput
          currentQuestion={currentQuestion}
          onQuestionChange={setCurrentQuestion}
          onAddQuestion={handleAddQuestion}
          onKeyPress={handleKeyPress}
        />
      </div>
    </TooltipProvider>
  );
};
