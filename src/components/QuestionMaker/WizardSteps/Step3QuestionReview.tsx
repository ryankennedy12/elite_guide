
import React, { useState, useEffect } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuestionCard } from '../QuestionCard';
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
    const questions = questionPool.getQuestionsForDisplay(10);
    setDisplayedQuestions(questions);
  }, [questionPool.getQuestionsForDisplay]);

  const handleStarToggle = (questionId: string) => {
    onStarToggle(questionId);
    
    if (!starredQuestions.has(questionId)) {
      toast({
        title: "Question added to your plan",
        description: "This question will appear in your final interview checklist.",
        duration: 2000,
      });
    }
  };

  const handleQuestionEdit = (questionId: string, updates: Partial<WizardQuestionItem>) => {
    const originalQuestion = displayedQuestions.find(q => q.id === questionId);
    if (!originalQuestion) return;

    const updatedQuestion = { ...originalQuestion, ...updates };
    setEditedQuestions(prev => new Map(prev.set(questionId, updatedQuestion)));

    // Update displayed questions
    setDisplayedQuestions(prev => 
      prev.map(q => q.id === questionId ? updatedQuestion : q)
    );

    toast({
      title: "Question updated",
      description: "Your changes have been saved.",
      duration: 2000,
    });
  };

  const handleQuestionDelete = (questionId: string) => {
    // Remove from displayed questions
    setDisplayedQuestions(prev => prev.filter(q => q.id !== questionId));
    
    // Exclude from future selections
    questionPool.excludeQuestion(questionId);
    
    // Get a replacement question
    const replacement = questionPool.getRandomQuestion();
    if (replacement) {
      setDisplayedQuestions(prev => [...prev, replacement]);
    }

    toast({
      title: "Question removed",
      description: "A new question has been loaded in its place.",
      duration: 2000,
    });
  };

  const handleQuestionRefresh = (questionId: string) => {
    const replacement = questionPool.getRandomQuestion();
    if (!replacement) {
      toast({
        title: "No more questions available",
        description: "Try selecting more categories or reducing your starred questions.",
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

  const getQuestionToDisplay = (question: WizardQuestionItem): WizardQuestionItem => {
    return editedQuestions.get(question.id) || question;
  };

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
          Review & Customize Your Questions
        </CardTitle>
        <p className="text-gray-600 text-lg">
          Star your most important questions, edit them to fit your situation, and remove any that don't apply.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="secondary">
            {selectedCategories.length} topic{selectedCategories.length !== 1 ? 's' : ''} selected
          </Badge>
          <Badge variant="outline">
            {questionPool.totalAvailable} questions available
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
                <QuestionCard
                  key={question.id}
                  question={getQuestionToDisplay(question)}
                  isStarred={starredQuestions.has(question.id)}
                  userConcern={userConcern}
                  onStar={() => handleStarToggle(question.id)}
                  onEdit={(updates) => handleQuestionEdit(question.id, updates)}
                  onDelete={() => handleQuestionDelete(question.id)}
                  onRefresh={() => handleQuestionRefresh(question.id)}
                  className="animate-fade-in"
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center pt-6 border-t">
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
