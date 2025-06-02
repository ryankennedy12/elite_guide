
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { generateQuestionList } from '@/lib/utils';

interface InterviewSheetProps {
  wizardState: any;
  onReorder?: (newOrder: string[]) => void;
}

interface QuestionItem {
  id: string;
  content: string;
  category?: string;
  type: 'starred' | 'custom';
}

const InterviewSheet: React.FC<InterviewSheetProps> = ({ wizardState, onReorder }) => {
  const [questions, setQuestions] = useState<QuestionItem[]>(() => {
    return generateQuestionList(wizardState).map((q, index) => ({
      id: q.id || `q-${index}`,
      content: q.content,
      category: q.category,
      type: wizardState.starredQuestions?.has(q.id) ? 'starred' : 'custom'
    }));
  });

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    const newQuestions = [...questions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newQuestions.length) {
      [newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]];
      setQuestions(newQuestions);
      
      if (onReorder) {
        onReorder(newQuestions.map(q => q.id));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Contractor Interview Checklist
        </h1>
        <p className="text-gray-600">
          Generated: {new Date().toLocaleDateString()}
        </p>
        {wizardState.userConcern && (
          <p className="text-sm text-gray-500 mt-2">
            Main Concern: {wizardState.userConcern}
          </p>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No questions selected. Go back to add questions to your interview plan.
            </p>
          </div>
        ) : (
          questions.map((question, index) => (
            <Card key={question.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Drag Handle & Number */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                    <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium leading-relaxed mb-3">
                      {question.content}
                    </p>
                    
                    {/* Category Badge */}
                    {question.category && (
                      <Badge variant="outline" className="text-xs">
                        {question.category}
                      </Badge>
                    )}
                  </div>

                  {/* Move Controls */}
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <Button
                      onClick={() => moveQuestion(index, 'up')}
                      disabled={index === 0}
                      size="sm"
                      variant="ghost"
                      className="p-1 h-6 w-6 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={() => moveQuestion(index, 'down')}
                      disabled={index === questions.length - 1}
                      size="sm"
                      variant="ghost"
                      className="p-1 h-6 w-6 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Footer */}
      {questions.length > 0 && (
        <div className="text-center pt-6 border-t text-sm text-gray-500">
          <p>Total Questions: {questions.length}</p>
          <p className="mt-1">
            Created with The Elite 12: Basement Waterproofing Contractor Screening Guide
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewSheet;
