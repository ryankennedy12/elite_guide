
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { type QuestionItem, type QuestionCategory } from '@/data/questionBank';

interface QuestionDisplayProps {
  questionsByCategory: Record<QuestionCategory, QuestionItem[]>;
  expandedCategories: Set<QuestionCategory>;
  starredQuestions: Set<string>;
  userConcern: string;
  onToggleCategoryExpansion: (category: QuestionCategory) => void;
  onToggleStarQuestion: (questionId: string) => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  questionsByCategory,
  expandedCategories,
  starredQuestions,
  userConcern,
  onToggleCategoryExpansion,
  onToggleStarQuestion
}) => {
  const replaceUserConcern = (questionText: string): string => {
    return questionText.replace(/\[user_concern\]/g, userConcern.trim() || 'your issue');
  };

  return (
    <div className="space-y-6">
      {Object.entries(questionsByCategory).map(([category, questions]) => (
        <Card key={category}>
          <CardHeader>
            <Button
              onClick={() => onToggleCategoryExpansion(category as QuestionCategory)}
              variant="ghost"
              className="justify-between w-full p-0 h-auto"
            >
              <CardTitle className="text-lg">{category} ({questions.length})</CardTitle>
              <span>{expandedCategories.has(category as QuestionCategory) ? '−' : '+'}</span>
            </Button>
          </CardHeader>
          {expandedCategories.has(category as QuestionCategory) && (
            <CardContent className="space-y-3">
              {questions.map(question => (
                <div key={question.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <Button
                    onClick={() => onToggleStarQuestion(question.id)}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                  >
                    <Star className={`w-5 h-5 ${starredQuestions.has(question.id) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
                  </Button>
                  <div className="flex-1">
                    <p className="text-gray-800">{replaceUserConcern(question.question)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default QuestionDisplay;
