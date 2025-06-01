import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Edit3, GripVertical } from 'lucide-react';
import { type WizardQuestionCategory } from '@/data/wizard';

interface Step3QuestionReviewProps {
  userConcern: string;
  selectedCategories: WizardQuestionCategory[];
  starredQuestions: Set<string>;
  questionOrder: string[];
  onStarToggle: (questionId: string) => void;
  onOrderChange: (order: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3QuestionReview: React.FC<Step3QuestionReviewProps> = ({
  userConcern,
  selectedCategories,
  starredQuestions,
  questionOrder,
  onStarToggle,
  onOrderChange,
  onNext,
  onBack
}) => {
  // Placeholder questions - will be populated with actual data later
  const sampleQuestions = [
    {
      id: '1',
      text: `Can you show me exactly how you'd diagnose or solve ${userConcern || 'the issue'} in my basement?`,
      category: 'Diagnostic / Investigation' as WizardQuestionCategory,
      proTip: 'A professional should walk you through a multi-step process: visual inspection, moisture mapping, and sometimes specialized tests.',
      redFlag: 'If they immediately recommend a solution without inspection, or say "It\'s always the same process," they\'re likely just selling a one-size-fits-all fix.'
    },
    {
      id: '2', 
      text: `What specific tools, tests, or inspections do you use to find ${userConcern || 'the issue'}?`,
      category: 'Diagnostic / Investigation' as WizardQuestionCategory,
      proTip: 'Expect to hear terms like "moisture meter," "infrared camera," "hydrostatic pressure test," or "boroscope."',
      redFlag: 'If all they mention is a flashlight and "my experience," or refuse to name tools, be wary.'
    }
  ];

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
          Preview & Customize Your Questions
        </CardTitle>
        <p className="text-gray-600 text-lg">
          Star your most important questions, drag to reorder, and edit as needed.
        </p>
        <Badge variant="secondary" className="mt-2">
          {selectedCategories.length} topic{selectedCategories.length !== 1 ? 's' : ''} selected
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {sampleQuestions.map((question) => {
              const isStarred = starredQuestions.has(question.id);
              
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isStarred ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onStarToggle(question.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isStarred ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Star className="w-4 h-4" fill={isStarred ? 'currentColor' : 'none'} />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-grab">
                        <GripVertical className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 text-base">
                          {question.text}
                        </h3>
                        <button className="p-1 rounded hover:bg-gray-100">
                          <Edit3 className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-green-50 border-l-4 border-green-500 rounded">
                          <span className="font-medium text-green-800">Pro Tip: </span>
                          <span className="text-green-700">{question.proTip}</span>
                        </div>
                        
                        <div className="p-2 bg-red-50 border-l-4 border-red-500 rounded">
                          <span className="font-medium text-red-800">Red Flag: </span>
                          <span className="text-red-700">{question.redFlag}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center pt-6">
          <p className="text-sm text-gray-500 mb-4">
            {starredQuestions.size} question{starredQuestions.size !== 1 ? 's' : ''} starred for your interview plan
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
              Add Custom Questions
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default Step3QuestionReview;
