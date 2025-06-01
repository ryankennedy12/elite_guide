
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, HelpCircle } from 'lucide-react';

interface QuestionInputProps {
  currentQuestion: string;
  onQuestionChange: (value: string) => void;
  onAddQuestion: () => void;
  onToggleHelp: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  currentQuestion,
  onQuestionChange,
  onAddQuestion,
  onToggleHelp,
  onKeyPress
}) => {
  return (
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
              onClick={onToggleHelp}
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
          onChange={(e) => onQuestionChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="e.g. How do you handle working around my finished basement?"
          className="text-base p-4 h-auto pr-12"
        />
        <Button
          onClick={onAddQuestion}
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
  );
};
