
import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';

interface Step4CustomQuestionsProps {
  customQuestions: string[];
  onCustomQuestionsChange: (questions: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  userConcern: string;
}

const inspirationQuestions = [
  "How long have you been fixing this specific type of problem?",
  "What happens if your solution doesn't work as expected?",
  "Can you show me before/after photos from similar jobs?",
  "What's your emergency response time if something goes wrong?",
  "How do you handle unexpected costs or complications?"
];

const Step4CustomQuestions: React.FC<Step4CustomQuestionsProps> = ({
  customQuestions,
  onCustomQuestionsChange,
  onNext,
  onBack,
  userConcern
}) => {
  const [currentQuestion, setCurrentQuestion] = React.useState('');

  const addCustomQuestion = (question: string) => {
    if (question.trim()) {
      onCustomQuestionsChange([...customQuestions, question.trim()]);
      setCurrentQuestion('');
    }
  };

  const removeCustomQuestion = (index: number) => {
    const updated = customQuestions.filter((_, i) => i !== index);
    onCustomQuestionsChange(updated);
  };

  const handleInspirationClick = (question: string) => {
    setCurrentQuestion(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addCustomQuestion(currentQuestion);
    }
  };

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
            {/* Need Inspiration Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Need Inspiration?</h3>
              <div className="grid gap-2">
                {inspirationQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleInspirationClick(question)}
                    className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors duration-200 text-sm text-blue-800"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Question Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your custom question
                </label>
                <textarea
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Think about your specific situation, timeline, or unique concerns..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-none"
                />
              </div>
              
              <Button
                onClick={() => addCustomQuestion(currentQuestion)}
                disabled={!currentQuestion.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                Add Question
              </Button>
            </div>

            {/* Custom Questions List */}
            {customQuestions.length > 0 && (
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-2 justify-center">
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
                      className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                    >
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-semibold text-green-600">{index + 1}</span>
                      </div>
                      <span className="flex-1 text-gray-800 leading-relaxed">{question}</span>
                      <button
                        onClick={() => removeCustomQuestion(index)}
                        className="p-1 rounded hover:bg-red-50 text-red-500 flex-shrink-0 transition-colors"
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
                Organize & Export Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </>
    </TooltipProvider>
  );
};

export default Step4CustomQuestions;
