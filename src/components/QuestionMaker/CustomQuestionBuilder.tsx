
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Lightbulb, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface CustomQuestionBuilderProps {
  onAddQuestion: (question: string) => void;
  userConcern: string;
}

const promptStarters = [
  "Is there anything specific about my situation you need to know?",
  "How will you handle [specific concern] during the project?",
  "What would you do differently if this were your own home?",
  "Can you walk me through exactly how you'll solve my problem?"
];

const helpExamples = [
  "How do you handle working around a finished basement?",
  "What if I need to use my basement during the work?",
  "Do you offer financing options for this type of project?",
  "How will you protect my landscaping during installation?",
  "What happens if you find additional problems during the work?"
];

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
        {/* Prompt starters */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <Label className="text-sm font-medium text-gray-700">Need inspiration? Try these:</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {promptStarters.map((starter, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setCurrentQuestion(starter.replace('[specific concern]', userConcern || 'the issue'))}
                className="text-xs h-auto py-1 px-2 text-gray-600 border-gray-300 hover:border-gray-400"
              >
                {starter.replace('[specific concern]', userConcern || 'the issue')}
              </Button>
            ))}
          </div>
        </div>

        {/* Question input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="custom-question" className="text-base font-medium">
              Add your own question
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHelp(!showHelp)}
                  className="p-1 h-auto"
                >
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click for example questions</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="relative">
            <Input
              id="custom-question"
              value={currentQuestion}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. How do you handle working around my finished basement?"
              className="text-base p-4 h-auto pr-12"
            />
            <Button
              onClick={handleAddQuestion}
              disabled={!currentQuestion.trim()}
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white hover:bg-gray-800 h-8 w-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            Think about your specific situation, timeline, or concerns that are unique to your home.
          </p>
        </div>

        {/* AI suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Smart suggestions:</Label>
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <CardContent className="p-3" onClick={() => handleUseSuggestion(suggestion)}>
                    <p className="text-sm text-gray-700">{suggestion}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Help examples */}
        {showHelp && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-2">Example custom questions:</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                {helpExamples.map((example, index) => (
                  <li 
                    key={index} 
                    className="cursor-pointer hover:text-blue-900 hover:underline"
                    onClick={() => setCurrentQuestion(example)}
                  >
                    • {example}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};
