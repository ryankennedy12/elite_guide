
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Circle,
  Trash2, 
  ChevronDown, 
  ChevronUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

export type QuestionPriority = 'must-ask' | 'maybe' | 'remove';

interface InterviewPlanCardProps {
  question: {
    id: string;
    text: string;
    type: 'starred' | 'custom';
    category?: string;
    priority?: QuestionPriority;
    proTip?: string;
    redFlag?: string;
  };
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onPriorityChange: (priority: QuestionPriority) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const InterviewPlanCard: React.FC<InterviewPlanCardProps> = ({
  question,
  index,
  isFirst,
  isLast,
  onPriorityChange,
  onDelete,
  onMoveUp,
  onMoveDown
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getPriorityColor = (priority?: QuestionPriority) => {
    switch (priority) {
      case 'must-ask':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'maybe':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPriorityIcon = (priority?: QuestionPriority) => {
    switch (priority) {
      case 'must-ask':
        return <Star className="w-3 h-3" fill="currentColor" />;
      case 'maybe':
        return <Circle className="w-3 h-3" />;
      default:
        return <Circle className="w-3 h-3" />;
    }
  };
  
  return (
    <TooltipProvider>
      <Card className="shadow-sm hover:shadow-md transition-all duration-200 bg-white border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Move Up/Down Arrows */}
            <div className="flex flex-col gap-1 flex-shrink-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onMoveUp}
                    disabled={isFirst}
                    size="sm"
                    variant="ghost"
                    className="p-1 h-6 w-6 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Move up</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onMoveDown}
                    disabled={isLast}
                    size="sm"
                    variant="ghost"
                    className="p-1 h-6 w-6 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Move down</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {/* Question Number */}
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm font-semibold text-gray-600">{index + 1}</span>
            </div>
            
            {/* Question Content */}
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 leading-relaxed font-medium mb-2">{question.text}</p>
              
              {/* Tags */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge 
                  variant="outline" 
                  className={`text-xs px-2 py-1 font-medium ${
                    question.type === 'starred' 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-green-50 text-green-700 border-green-200'
                  }`}
                >
                  {question.type === 'starred' ? 'Pre-built' : 'Custom'}
                </Badge>
                
                {question.category && (
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200 px-2 py-1 font-medium">
                    {question.category}
                  </Badge>
                )}
                
                {question.priority && question.priority !== 'remove' && (
                  <Badge 
                    variant="outline" 
                    className={`text-xs flex items-center gap-1 px-2 py-1 font-medium ${getPriorityColor(question.priority)}`}
                  >
                    {getPriorityIcon(question.priority)}
                    {question.priority === 'must-ask' ? 'Must Ask' : 'Maybe'}
                  </Badge>
                )}
              </div>
              
              {/* Pro Tips / Red Flags Toggle */}
              {(question.proTip || question.redFlag) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto mb-2"
                >
                  {showDetails ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                  View tips & notes
                </Button>
              )}
              
              {/* Collapsible Details */}
              {showDetails && (question.proTip || question.redFlag) && (
                <div className="mt-3 w-[90%] mx-auto space-y-3">
                  {question.proTip && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="text-xs font-semibold text-green-700 mb-2">💡 PRO TIP</div>
                      <p className="text-sm text-gray-700 leading-relaxed">{question.proTip}</p>
                    </div>
                  )}
                  {question.redFlag && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="text-xs font-semibold text-red-700 mb-2">🚩 RED FLAG</div>
                      <p className="text-sm text-gray-700 leading-relaxed">{question.redFlag}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Priority and Action Buttons */}
            <div className="flex flex-col gap-1 flex-shrink-0">
              {/* Must Ask Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onPriorityChange('must-ask')}
                    size="sm"
                    variant="ghost"
                    className={`p-2 h-8 w-8 ${
                      question.priority === 'must-ask'
                        ? 'text-orange-600 bg-orange-50' 
                        : 'text-gray-400 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <Star className="w-4 h-4" fill={question.priority === 'must-ask' ? 'currentColor' : 'none'} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mark as Must Ask</p>
                </TooltipContent>
              </Tooltip>
              
              {/* Maybe Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onPriorityChange('maybe')}
                    size="sm"
                    variant="ghost"
                    className={`p-2 h-8 w-8 ${
                      question.priority === 'maybe'
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Circle className="w-4 h-4" fill={question.priority === 'maybe' ? 'currentColor' : 'none'} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mark as Maybe</p>
                </TooltipContent>
              </Tooltip>
              
              {/* Delete Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onDelete}
                    size="sm"
                    variant="ghost"
                    className="p-2 h-8 w-8 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove question</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
