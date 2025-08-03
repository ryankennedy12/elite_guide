
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GripVertical, ArrowUp, ArrowDown, Star } from 'lucide-react';
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
  isMustAsk?: boolean;
}

const InterviewSheet: React.FC<InterviewSheetProps> = ({ wizardState, onReorder }) => {
  const [questions, setQuestions] = useState<QuestionItem[]>(() => {
    return generateQuestionList(wizardState).map((q, index) => ({
      id: q.id || `q-${index}`,
      content: q.content,
      category: q.category,
      type: wizardState.starredQuestions?.has(q.id) ? 'starred' : 'custom',
      isMustAsk: false
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

  const toggleMustAsk = (index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].isMustAsk = !newQuestions[index].isMustAsk;
    setQuestions(newQuestions);
  };

  const mustAskCount = questions.filter(q => q.isMustAsk).length;

  return (
    <div className="space-y-6 mobile-padding">
      {/* Header */}
      <div className="text-center border-b pb-6 mobile-stack">
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
            <Card key={question.id} className={`border mobile-card ${question.isMustAsk ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>
              <CardContent className="p-4 mobile-padding">
                <div className="flex items-start gap-4 mobile-gap">
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
                    <div className="flex items-center gap-2">
                      {question.category && (
                        <Badge variant="outline" className="text-xs">
                          {question.category}
                        </Badge>
                      )}
                      {question.isMustAsk && (
                        <Badge className="text-xs bg-yellow-500 text-white">
                          Must Ask
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    {/* Must Ask Star */}
                    <Button
                      onClick={() => toggleMustAsk(index)}
                      size="sm"
                      variant="ghost"
                      className={`p-2 h-8 w-8 touch-target ${question.isMustAsk ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                    >
                      <Star className={`w-4 h-4 ${question.isMustAsk ? 'fill-current' : ''}`} />
                    </Button>
                    
                    {/* Move Controls */}
                    <Button
                      onClick={() => moveQuestion(index, 'up')}
                      disabled={index === 0}
                      size="sm"
                      variant="ghost"
                      className="p-2 h-8 w-8 text-gray-400 hover:text-gray-600 disabled:opacity-30 touch-target"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => moveQuestion(index, 'down')}
                      disabled={index === questions.length - 1}
                      size="sm"
                      variant="ghost"
                      className="p-2 h-8 w-8 text-gray-400 hover:text-gray-600 disabled:opacity-30 touch-target"
                    >
                      <ArrowDown className="w-4 h-4" />
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
          <p>Total Questions: {questions.length} | Must Ask: {mustAskCount}</p>
          <p className="mt-1">
            Created with The Elite 12: Basement Waterproofing Contractor Screening Guide
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewSheet;
