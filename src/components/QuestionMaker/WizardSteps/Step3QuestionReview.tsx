
import React, { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, RefreshCw } from 'lucide-react';
import { useQuestionPool } from '@/hooks/useQuestionPool';
import { WizardQuestionItem, WizardQuestionCategory } from '@/data/wizard';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

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

const categoryTooltips: Record<string, string> = {
  'Diagnostic / Investigation': 'Questions about finding root causes',
  'System Selection': 'Questions about equipment and materials',
  'Timeline / Project Management': 'Questions about scheduling and process',
  'Health / Safety / Air Quality': 'Questions about health and safety concerns',
  'Compliance / Code': 'Questions about permits and regulations',
  'Cost & Value': 'Questions about pricing and budgeting',
  'Warranty / Contract': 'Questions about guarantees and agreements',
  'Customer Service': 'Questions about communication and service',
  'Risk Management': 'Questions about potential problems',
  'Emergency Response': 'Questions about urgent situations'
};

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

  const questionPool = useQuestionPool({
    selectedCategories,
    userConcern,
    starredQuestionIds: starredQuestions
  });

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

    setDisplayedQuestions(prev => 
      prev.map(q => q.id === questionId ? replacement : q)
    );

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
    <TooltipProvider>
      <>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
            Review & Add Questions
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Browse relevant questions and add the ones you want to ask contractors. You can organize and prioritize them in the next step.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              {selectedCategories.length} topic{selectedCategories.length !== 1 ? 's' : ''} selected
            </Badge>
            <Badge variant="outline" className="bg-gray-50 text-gray-600">
              {questionPool.totalAvailable} questions available
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 font-medium">
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
                    className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-200 ${
                      starredQuestions.has(question.id) 
                        ? 'border-green-300 bg-green-50 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Add Button */}
                      <Button
                        onClick={() => handleAddQuestion(question.id)}
                        disabled={starredQuestions.has(question.id)}
                        size="sm"
                        className={`flex-shrink-0 mt-1 min-w-[80px] font-medium ${
                          starredQuestions.has(question.id)
                            ? 'bg-green-600 text-white hover:bg-green-600'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {starredQuestions.has(question.id) ? (
                          '✓ Added'
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </>
                        )}
                      </Button>

                      {/* Question Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-3 leading-relaxed text-base md:text-lg">
                          {replaceUserConcern(question.question)}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge 
                                variant="outline" 
                                className="text-xs bg-blue-50 text-blue-700 border-blue-200 font-medium px-2 py-1"
                              >
                                {question.category}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">{categoryTooltips[question.category] || question.category}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        {/* Collapsible Pro Tip and Red Flag */}
                        <details className="group">
                          <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            View Pro Tips & Red Flags
                          </summary>
                          <div className="mt-3 space-y-3">
                            {question.proTip && (
                              <div className="w-[85%] mx-auto p-3 bg-green-100 border border-green-200 rounded-lg">
                                <div className="text-xs font-bold text-green-800 mb-1">💡 PRO TIP</div>
                                <p className="text-sm text-green-700 leading-relaxed">{question.proTip}</p>
                              </div>
                            )}
                            {question.redFlag && (
                              <div className="w-[85%] mx-auto p-3 bg-red-100 border border-red-200 rounded-lg">
                                <div className="text-xs font-bold text-red-800 mb-1">🚩 RED FLAG</div>
                                <p className="text-sm text-red-700 leading-relaxed">{question.redFlag}</p>
                              </div>
                            )}
                          </div>
                        </details>
                      </div>

                      {/* Refresh Button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => handleQuestionRefresh(question.id)}
                            variant="ghost"
                            size="sm"
                            className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Get a different question</p>
                        </TooltipContent>
                      </Tooltip>
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
            <div className="flex justify-center gap-3 flex-wrap">
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
    </TooltipProvider>
  );
};

export default Step3QuestionReview;
