
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X } from 'lucide-react';
import { questionBank } from '@/data/questionBank';

interface InterviewPlanSidebarProps {
  starredQuestions: Set<string>;
  customQuestions: string[];
  newCustomQuestion: string;
  setNewCustomQuestion: (question: string) => void;
  userConcern: string;
  onAddCustomQuestion: () => void;
  onRemoveCustomQuestion: (index: number) => void;
  onExportToPDF: () => void;
}

const InterviewPlanSidebar: React.FC<InterviewPlanSidebarProps> = ({
  starredQuestions,
  customQuestions,
  newCustomQuestion,
  setNewCustomQuestion,
  userConcern,
  onAddCustomQuestion,
  onRemoveCustomQuestion,
  onExportToPDF
}) => {
  const replaceUserConcern = (questionText: string): string => {
    return questionText.replace(/\[user_concern\]/g, userConcern.trim() || 'your issue');
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          My Interview Plan
          <span className="text-sm font-normal text-gray-500">
            {starredQuestions.size + customQuestions.length} questions
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Starred Questions Preview */}
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {Array.from(starredQuestions).slice(0, 3).map(questionId => {
            const question = questionBank.find(q => q.id === questionId);
            return question ? (
              <div key={questionId} className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                {replaceUserConcern(question.question).substring(0, 80)}...
              </div>
            ) : null;
          })}
          {starredQuestions.size > 3 && (
            <div className="text-xs text-gray-500">+ {starredQuestions.size - 3} more</div>
          )}
        </div>

        {/* Custom Questions */}
        <div>
          <Label className="text-sm">Add custom question</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={newCustomQuestion}
              onChange={(e) => setNewCustomQuestion(e.target.value)}
              placeholder="Your question..."
              className="text-sm"
              onKeyPress={(e) => e.key === 'Enter' && onAddCustomQuestion()}
            />
            <Button onClick={onAddCustomQuestion} size="sm">Add</Button>
          </div>
        </div>

        {customQuestions.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm">Custom questions</Label>
            {customQuestions.map((question, index) => (
              <div key={index} className="flex items-start gap-2 text-xs bg-blue-50 p-2 rounded">
                <span className="flex-1">{question}</span>
                <Button
                  onClick={() => onRemoveCustomQuestion(index)}
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto text-red-500"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Export Button */}
        <Button
          onClick={onExportToPDF}
          disabled={starredQuestions.size === 0 && customQuestions.length === 0}
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          <Download className="w-4 h-4 mr-2" />
          Export My Plan
        </Button>

        <div className="text-xs text-gray-500 text-center">
          Questions will include your specific concern: "{userConcern || 'your issue'}"
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewPlanSidebar;
