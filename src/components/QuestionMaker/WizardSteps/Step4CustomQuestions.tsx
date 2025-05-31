
import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface Step4CustomQuestionsProps {
  customQuestions: string[];
  onCustomQuestionsChange: (questions: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4CustomQuestions: React.FC<Step4CustomQuestionsProps> = ({
  customQuestions,
  onCustomQuestionsChange,
  onNext,
  onBack
}) => {
  const [newQuestion, setNewQuestion] = useState('');

  const addCustomQuestion = () => {
    if (newQuestion.trim()) {
      onCustomQuestionsChange([...customQuestions, newQuestion.trim()]);
      setNewQuestion('');
    }
  };

  const removeCustomQuestion = (index: number) => {
    const updated = customQuestions.filter((_, i) => i !== index);
    onCustomQuestionsChange(updated);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCustomQuestion();
    }
  };

  return (
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
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-question" className="text-base font-medium">
                Add a custom question
              </Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="new-question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g. How do you handle working around my finished basement?"
                  className="flex-1 text-base p-4 h-auto"
                />
                <Button
                  onClick={addCustomQuestion}
                  disabled={!newQuestion.trim()}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Think about your specific situation, timeline, or concerns that are unique to your home.
              </p>
            </div>

            {customQuestions.length > 0 && (
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Your custom questions ({customQuestions.length})
                </Label>
                {customQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border"
                  >
                    <span className="flex-1 text-gray-800">{question}</span>
                    <button
                      onClick={() => removeCustomQuestion(index)}
                      className="p-1 rounded hover:bg-gray-200 text-gray-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center pt-6">
          <p className="text-sm text-gray-500 mb-4">
            {customQuestions.length === 0 
              ? "No custom questions yet—that's okay! You can always add more later."
              : `${customQuestions.length} custom question${customQuestions.length !== 1 ? 's' : ''} added`
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
  );
};

export default Step4CustomQuestions;
