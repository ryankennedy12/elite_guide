import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Mic, Plus, Lightbulb } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { CustomQuestionBuilder } from '../CustomQuestionBuilder';

interface Step4CustomQuestionsProps {
  customQuestions: string[];
  onCustomQuestionsChange: (questions: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  userConcern: string;
}

const Step4CustomQuestions: React.FC<Step4CustomQuestionsProps> = ({
  customQuestions,
  onCustomQuestionsChange,
  onNext,
  onBack,
  userConcern
}) => {
  const [currentInput, setCurrentInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Smart suggestions based on user concern and common scenarios
  const getSmartSuggestions = () => {
    const baseSuggestions = [
      "What's your warranty process if issues return?",
      "How do you diagnose the root cause?",
      "What's included vs. extra in your pricing?",
      "How do you protect my finished areas during work?",
      "Can you provide references from similar projects?"
    ];

    if (userConcern.trim()) {
      const concernSpecific = [
        `How will you prevent ${userConcern} from happening again?`,
        `What's the most common cause of ${userConcern} in homes like mine?`,
        `How long does it typically take to fix ${userConcern}?`
      ];
      return [...concernSpecific, ...baseSuggestions.slice(0, 2)];
    }

    return baseSuggestions;
  };

  // Generate real-time rewrite suggestions as user types
  const generateRewrites = (input: string): string[] => {
    if (input.length < 10) return [];
    
    const rewrites: string[] = [];
    
    // Make it more specific
    if (!input.includes('specific') && !input.includes('exactly')) {
      rewrites.push(`Can you be specific about ${input.toLowerCase()}?`);
    }
    
    // Make it more professional
    if (input.includes('you guys') || input.includes('your company')) {
      rewrites.push(input.replace(/you guys|your company/g, 'your team'));
    }
    
    // Add follow-up angle
    if (!input.includes('documentation') && (input.includes('warranty') || input.includes('guarantee'))) {
      rewrites.push(`${input} Can you provide that in writing?`);
    }

    return rewrites.slice(0, 3);
  };

  const handleInputChange = (value: string) => {
    setCurrentInput(value);
    setSuggestions(generateRewrites(value));
  };

  const addCustomQuestion = (question: string) => {
    onCustomQuestionsChange([...customQuestions, question]);
  };

  const removeCustomQuestion = (index: number) => {
    const updated = customQuestions.filter((_, i) => i !== index);
    onCustomQuestionsChange(updated);
  };

  const addQuestion = (question: string) => {
    if (question.trim()) {
      onCustomQuestionsChange([...customQuestions, question.trim()]);
      setCurrentInput('');
      setSuggestions([]);
    }
  };

  const useSuggestion = (suggestion: string) => {
    setCurrentInput(suggestion);
    setSuggestions([]);
  };

  const smartSuggestions = getSmartSuggestions();

  return (
    <TooltipProvider>
      <>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
            Add Your Own Questions
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Think of specific questions about your situation that weren't covered? Add them here.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <CustomQuestionBuilder
              onAddQuestion={addCustomQuestion}
              userConcern={userConcern}
            />

            {customQuestions.length > 0 && (
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium text-gray-900">
                    Your custom questions
                  </h3>
                  <Badge variant="secondary">
                    {customQuestions.length}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {customQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border transition-colors hover:bg-gray-100"
                    >
                      <span className="flex-1 text-gray-800 leading-relaxed">{question}</span>
                      <button
                        onClick={() => removeCustomQuestion(index)}
                        className="p-1 rounded hover:bg-gray-200 text-gray-500 flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="text-center pt-6 border-t">
            <p className="text-sm text-gray-500 mb-4">
              {customQuestions.length === 0 
                ? "No custom questions yet—that's okay! You can always add more later."
                : `${customQuestions.length} custom question${customQuestions.length !== 1 ? 's' : ''} added to your plan`
              }
            </p>
            <div className="flex justify-center gap-3">
              <Button
                onClick={onBack}
                variant="outline"
                size="lg"
              >
                Back
              </Button>
              <Button
                onClick={onNext}
                size="lg"
                className="bg-black text-white hover:bg-gray-800 px-8"
              >
                Preview Final Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </>
    </TooltipProvider>
  );
};

export default Step4CustomQuestions;
