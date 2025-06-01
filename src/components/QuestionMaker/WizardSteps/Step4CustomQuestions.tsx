
import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
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
  const addCustomQuestion = (question: string) => {
    onCustomQuestionsChange([...customQuestions, question]);
  };

  const removeCustomQuestion = (index: number) => {
    const updated = customQuestions.filter((_, i) => i !== index);
    onCustomQuestionsChange(updated);
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
  );
};

export default Step4CustomQuestions;
