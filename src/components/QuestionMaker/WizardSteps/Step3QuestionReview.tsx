
import React, { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { useQuestionPool } from '@/hooks/useQuestionPool';
import { WizardQuestionItem, WizardQuestionCategory } from '@/data/wizard';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [displayedQuestions, setDisplayedQuestions] = useState<WizardQuestionItem[]>([]);
  const [editedQuestions, setEditedQuestions] = useState<Map<string, WizardQuestionItem>>(new Map());

  const questionPool = useQuestionPool({
    selectedCategories,
    userConcern,
    starredQuestionIds: starredQuestions
  });

  // Initialize displayed questions
  useEffect(() => {
    const questions = questionPool.getQuestionsForDisplay(12);
    setDisplayedQuestions(questions);
  }, [questionPool.getQuestionsForDisplay]);

  const handleAddQuestion = (questionId: string) => {
    onStarToggle(questionId);
    
    toast({
      title: "Question added to your plan",
      description: "This question will appear in your final interview checklist.",
      duration: 2000,
    });
  };

  const handleQuestionRefresh = (questionId: string) => {
    const replacement = questionPool.getRandomQuestion();
    if (!replacement) {
      toast({
        title: "No more questions available",
        description: "Try selecting more categories to see additional questions.",
        duration: 3000,
      });
      return;
    }

    // Replace the question
    setDisplayedQuestions(prev => 
      prev.map(q => q.id === questionId ? replacement : q)
    );

    // Exclude the old question
    questionPool.excludeQuestion(questionId);

    toast({
      title: "Question refreshed",
      description: "A new question has been loaded.",
      duration: 2000,
    });
  };

  const replaceUserConcern = (questionText: string): string => {
    return questionText.replace(/\[.*?\]/g, userConcern || 'the issue');
  };

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
          Review & Add Questions
        </CardTitle>
        <p className="text-gray-600 text-lg">
          Browse relevant questions and add the ones you want to ask contractors. You can organize and prioritize them in the next step.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="secondary">
            {selectedCategories.length} topic{selectedCategories.length !== 1 ? 's' : ''} selected
          </Badge>
          <Badge variant="outline">
            {questionPool.totalAvailable} questions available
          </Badge>
          <Badge variant="outline" className="bg-green-100 text-green-800">
            {starredQuestions.size} added to plan
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="max-w-4xl mx-auto">
          {displayedQuestions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No questions available for your selected categories.
              </p>
              <Button onClick={onBack} variant="outline">
                Go back and select different topics
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    starredQuestions.has(question.id) 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  } animate-fade-in`}
                >
                  <div className="flex items-start gap-3">
                    {/* Add Button */}
                    <Button
                      onClick={() => handleAddQuestion(question.id)}
                      disabled={starredQuestions.has(question.id)}
                      size="sm"
                      className={`flex-shrink-0 mt-1 ${
                        starredQuestions.has(question.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {starredQuestions.has(question.id) ? '✓ Added' : <><Plus className="w-4 h-4 mr-1" />Add</>}
                    </Button>

                    {/* Question Content */}
                    <div className="flex-1 min-w-0 w-full">
                      <h3 className="font-medium text-gray-900 mb-3 leading-relaxed">
                        {replaceUserConcern(question.question)}
                      </h3>
                      
                      {/* Category pill with proper wrapping */}
                      <div className="w-full mb-3">
                        <Badge 
                          variant="outline" 
                          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#E9F0FF] text-[#0056D2] border-[#0056D2]/20 inline-block max-w-full break-words whitespace-normal leading-normal"
                        >
                          {question.category}
                        </Badge>
                      </div>

                      {/* Pro Tips & Red Flags Toggle */}
                      <details className="group w-full">
                        <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium">
                          View Pro Tips & Red Flags
                        </summary>
                        <div className="mt-4 w-full">
                          <div className="w-full p-6 bg-gray-50 rounded-lg border shadow-sm">
                            <div className="space-y-6 w-full max-w-none">
                              {question.proTip && (
                                <div className="w-full">
                                  <div className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                                    <span>💡</span>
                                    <span>PRO TIP</span>
                                  </div>
                                  <p className="text-sm text-gray-700 leading-relaxed w-full max-w-none break-words">
                                    {question.proTip}
                                  </p>
                                </div>
                              )}
                              {question.redFlag && (
                                <div className="w-full">
                                  <div className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                                    <span>🚩</span>
                                    <span>RED FLAG</span>
                                  </div>
                                  <p className="text-sm text-gray-700 leading-relaxed w-full max-w-none break-words">
                                    {question.redFlag}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </details>
                    </div>

                    {/* Refresh Button */}
                    <Button
                      onClick={() => handleQuestionRefresh(question.id)}
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                    >
                      ↻
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center pt-6 border-t">
          <p className="text-sm text-gray-500 mb-4">
            {starredQuestions.size} question{starredQuestions.size !== 1 ? 's' : ''} added to your interview plan
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
