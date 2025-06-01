
import React, { useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PromptStarters } from './PromptStarters';
import { QuestionInput } from './QuestionInput';
import { SmartSuggestions } from './SmartSuggestions';
import { HelpExamples } from './HelpExamples';

interface CustomQuestionBuilderProps {
  onAddQuestion: (question: string) => void;
  userConcern: string;
}

export const CustomQuestionBuilder: React.FC<CustomQuestionBuilderProps> = ({
  onAddQuestion,
  userConcern
}) => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = (input: string) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    const inputLower = input.toLowerCase();
    const newSuggestions: string[] = [];

    // Add smart suggestions based on input
    if (inputLower.includes('cost') || inputLower.includes('price') || inputLower.includes('money')) {
      newSuggestions.push("What's included in your quote, and what might cost extra?");
      newSuggestions.push("Do you offer payment plans or financing options?");
    }

    if (inputLower.includes('time') || inputLower.includes('schedule') || inputLower.includes('when')) {
      newSuggestions.push("How long will this project take from start to finish?");
      newSuggestions.push("What could delay the timeline, and how do you handle that?");
    }

    if (inputLower.includes('warranty') || inputLower.includes('guarantee')) {
      newSuggestions.push("What exactly is covered under your warranty?");
      newSuggestions.push("How do I make a warranty claim if needed?");
    }

    // If we have a user concern, personalize suggestions
    if (userConcern.trim() && newSuggestions.length < 2) {
      newSuggestions.push(`How will you prevent ${userConcern} from happening again?`);
      newSuggestions.push(`What's the most common cause of ${userConcern} in homes like mine?`);
    }

    setSuggestions(newSuggestions.slice(0, 3));
  };

  const handleInputChange = (value: string) => {
    setCurrentQuestion(value);
    generateSuggestions(value);
  };

  const handleAddQuestion = () => {
    if (currentQuestion.trim()) {
      onAddQuestion(currentQuestion.trim());
      setCurrentQuestion('');
      setSuggestions([]);
    }
  };

  const handleUseSuggestion = (suggestion: string) => {
    setCurrentQuestion(suggestion);
    setSuggestions([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddQuestion();
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <PromptStarters
          userConcern={userConcern}
          onSelectStarter={setCurrentQuestion}
        />

        <QuestionInput
          currentQuestion={currentQuestion}
          onQuestionChange={handleInputChange}
          onAddQuestion={handleAddQuestion}
          onToggleHelp={() => setShowHelp(!showHelp)}
          onKeyPress={handleKeyPress}
        />

        <SmartSuggestions
          suggestions={suggestions}
          onUseSuggestion={handleUseSuggestion}
        />

        {showHelp && (
          <HelpExamples
            onSelectExample={setCurrentQuestion}
          />
        )}
      </div>
    </TooltipProvider>
  );
};
