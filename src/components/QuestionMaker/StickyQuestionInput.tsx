
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StickyQuestionInputProps {
  currentQuestion: string;
  onQuestionChange: (value: string) => void;
  onAddQuestion: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const StickyQuestionInput: React.FC<StickyQuestionInputProps> = ({
  currentQuestion,
  onQuestionChange,
  onAddQuestion,
  onKeyPress
}) => {
  const { toast } = useToast();
  
  const handleAddQuestion = () => {
    onAddQuestion();
    if (currentQuestion.trim()) {
      toast({
        title: "Question added!",
        description: "You can edit it above before finalizing.",
        duration: 2000,
      });
    }
  };

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm text-gray-600 mb-3 text-center">
          Not sure where to start? Pick a suggestion above or write your own.
        </p>
        
        <div className="flex gap-3">
          <Input
            value={currentQuestion}
            onChange={(e) => onQuestionChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="What else do you want to know?"
            className="text-base h-12 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button
            onClick={handleAddQuestion}
            disabled={!currentQuestion.trim()}
            size="lg"
            className="bg-black text-white hover:bg-gray-800 h-12 w-12 p-0 flex-shrink-0"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
