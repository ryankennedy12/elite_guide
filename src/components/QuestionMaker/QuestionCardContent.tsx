
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { WizardQuestionItem } from '@/data/wizard';

interface QuestionCardContentProps {
  question: WizardQuestionItem;
  userConcern: string;
}

const QuestionCardContent: React.FC<QuestionCardContentProps> = ({
  question,
  userConcern
}) => {
  const personalizeQuestion = (text: string): string => {
    if (!userConcern.trim()) {
      return text.replace(/\[.*?\]/g, 'the issue');
    }
    return text.replace(/\[.*?\]/g, userConcern.trim());
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-800 text-base leading-tight pr-2">
          {personalizeQuestion(question.question)}
        </h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="ghost" className="p-1 h-auto flex-shrink-0">
              <Info className="w-4 h-4 text-gray-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="text-sm">This question helps you understand the contractor's approach to {question.category.toLowerCase()}.</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
          <span className="font-medium text-green-800">Pro Tip: </span>
          <span className="text-green-700">{question.proTip}</span>
        </div>
        
        <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
          <span className="font-medium text-red-800">Red Flag: </span>
          <span className="text-red-700">{question.redFlag}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCardContent;
