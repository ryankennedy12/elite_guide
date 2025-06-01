
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lightbulb } from 'lucide-react';

interface PromptStartersProps {
  userConcern: string;
  onSelectStarter: (starter: string) => void;
}

const promptStarters = [
  "Is there anything specific about my situation you need to know?",
  "How will you handle [specific concern] during the project?",
  "What would you do differently if this were your own home?",
  "Can you walk me through exactly how you'll solve my problem?"
];

export const PromptStarters: React.FC<PromptStartersProps> = ({
  userConcern,
  onSelectStarter
}) => {
  return (
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
            onClick={() => onSelectStarter(starter.replace('[specific concern]', userConcern || 'the issue'))}
            className="text-xs h-auto py-1 px-2 text-gray-600 border-gray-300 hover:border-gray-400"
          >
            {starter.replace('[specific concern]', userConcern || 'the issue')}
          </Button>
        ))}
      </div>
    </div>
  );
};
