
import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Download, 
  Copy, 
  RotateCcw, 
  Share2, 
  GripVertical, 
  Star, 
  Edit3, 
  Trash2,
  ArrowUpDown,
  FileText,
  Printer,
  Eye
} from 'lucide-react';
import { type WizardState } from '../WizardContainer';
import { wizardQuestionBank } from '@/data/wizard';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface Step5ExportPlanProps {
  wizardState: WizardState;
  onBack: () => void;
  onStartOver: () => void;
}

interface OrganizedQuestion {
  id: string;
  text: string;
  type: 'starred' | 'custom';
  category?: string;
  isStarred?: boolean;
}

const Step5ExportPlan: React.FC<Step5ExportPlanProps> = ({
  wizardState,
  onBack,
  onStartOver
}) => {
  const [organizedQuestions, setOrganizedQuestions] = useState<OrganizedQuestion[]>(() => {
    const questions: OrganizedQuestion[] = [];
    
    // Add starred questions
    Array.from(wizardState.starredQuestions).forEach(questionId => {
      const question = wizardQuestionBank.find(q => q.id === questionId);
      if (question) {
        questions.push({
          id: questionId,
          text: question.question.replace(/\[.*?\]/g, wizardState.userConcern || 'the issue'),
          type: 'starred',
          category: question.category,
          isStarred: true
        });
      }
    });
    
    // Add custom questions
    wizardState.customQuestions.forEach((question, index) => {
      questions.push({
        id: `custom-${index}`,
        text: question,
        type: 'custom'
      });
    });
    
    return questions;
  });

  const [showPreview, setShowPreview] = useState(false);

  const totalQuestions = organizedQuestions.length;

  const categoryOrder = ['Diagnostics', 'System', 'Warranty', 'Cost', 'Timeline', 'Process'];
  
  const groupedQuestions = organizedQuestions.reduce((groups, question) => {
    const category = question.category || 'Custom Questions';
    if (!groups[category]) groups[category] = [];
    groups[category].push(question);
    return groups;
  }, {} as Record<string, OrganizedQuestion[]>);

  const handleAutoOrganize = () => {
    const organized: OrganizedQuestion[] = [];
    
    // Add questions by category priority
    categoryOrder.forEach(category => {
      if (groupedQuestions[category]) {
        organized.push(...groupedQuestions[category]);
      }
    });
    
    // Add remaining categories
    Object.keys(groupedQuestions).forEach(category => {
      if (!categoryOrder.includes(category)) {
        organized.push(...groupedQuestions[category]);
      }
    });
    
    setOrganizedQuestions(organized);
  };

  const moveQuestion = (fromIndex: number, toIndex: number) => {
    const newQuestions = [...organizedQuestions];
    const [movedQuestion] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, movedQuestion);
    setOrganizedQuestions(newQuestions);
  };

  const removeQuestion = (index: number) => {
    setOrganizedQuestions(organizedQuestions.filter((_, i) => i !== index));
  };

  const toggleStar = (index: number) => {
    const updated = [...organizedQuestions];
    updated[index] = { ...updated[index], isStarred: !updated[index].isStarred };
    setOrganizedQuestions(updated);
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF...');
    // TODO: Implement PDF generation
  };

  const handleCopyToClipboard = async () => {
    const text = organizedQuestions.map((q, i) => `${i + 1}. ${q.text}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Contractor Interview Questions',
        text: organizedQuestions.map((q, i) => `${i + 1}. ${q.text}`).join('\n\n')
      });
    } else {
      handleCopyToClipboard();
    }
  };

  const getCurrentCategory = (index: number): string => {
    const question = organizedQuestions[index];
    return question.category || 'Custom Questions';
  };

  const shouldShowCategoryHeader = (index: number): boolean => {
    if (index === 0) return true;
    return getCurrentCategory(index) !== getCurrentCategory(index - 1);
  };

  return (
    <TooltipProvider>
      <>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
            Your Interview Plan is Ready!
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Review, organize, and export your customized contractor interview questions.
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {totalQuestions} question{totalQuestions !== 1 ? 's' : ''} total
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {wizardState.selectedCategories.length} topic{wizardState.selectedCategories.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="max-w-4xl mx-auto">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleAutoOrganize}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    Auto-Organize
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sort questions into optimal interview flow</p>
                </TooltipContent>
              </Tooltip>
              
              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Edit View' : 'Preview PDF'}
              </Button>
            </div>

            {showPreview ? (
              /* PDF Preview Mode */
              <Card className="bg-white shadow-lg border-2 border-gray-200">
                <div className="p-8 space-y-6">
                  <div className="text-center border-b pb-4">
                    <h1 className="text-2xl font-bold text-black">Contractor Interview Kit</h1>
                    {wizardState.userConcern && (
                      <p className="text-gray-600 mt-2">Focus: {wizardState.userConcern}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Generated on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {organizedQuestions.map((question, index) => (
                      <div key={question.id}>
                        {shouldShowCategoryHeader(index) && (
                          <h3 className="text-lg font-semibold text-black mt-6 mb-3 border-b border-gray-300 pb-1">
                            {getCurrentCategory(index)}
                          </h3>
                        )}
                        <div className="flex gap-3">
                          <span className="text-gray-500 font-medium flex-shrink-0">
                            {index + 1}.
                          </span>
                          <p className="text-gray-800 leading-relaxed">{question.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 text-center">
                    <p className="text-sm text-gray-600 italic">
                      "Great contractors appreciate prepared homeowners. Don't hesitate to ask these questions!"
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              /* Edit Mode */
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Pro Interview Tips:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Start with big-picture questions, end with cost details</li>
                    <li>• Ask for documentation and references</li>
                    <li>• Don't be afraid to ask for clarification</li>
                  </ul>
                </div>

                {organizedQuestions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No questions added yet. Go back to add some questions to your plan.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {organizedQuestions.map((question, index) => (
                      <div key={question.id}>
                        {shouldShowCategoryHeader(index) && (
                          <div className="flex items-center gap-3 mt-6 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {getCurrentCategory(index)}
                            </h3>
                            <div className="flex-1 h-px bg-gray-300"></div>
                          </div>
                        )}
                        
                        <Card className="border-2 hover:border-gray-300 transition-colors">
                          <div className="p-4 flex items-center gap-3">
                            {/* Drag Handle */}
                            <div className="cursor-grab hover:cursor-grabbing p-1 rounded hover:bg-gray-100">
                              <GripVertical className="w-4 h-4 text-gray-400" />
                            </div>
                            
                            {/* Question Number */}
                            <span className="text-sm font-semibold text-gray-500 w-8">
                              {index + 1}.
                            </span>
                            
                            {/* Question Text */}
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-800 leading-relaxed">{question.text}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    question.type === 'starred' 
                                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200' 
                                      : 'bg-blue-50 text-blue-700 border-blue-200'
                                  }`}
                                >
                                  {question.type === 'starred' ? 'Pre-built' : 'Custom'}
                                </Badge>
                                {question.isStarred && (
                                  <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                                    Must-ask
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    onClick={() => toggleStar(index)}
                                    size="sm"
                                    variant="ghost"
                                    className={`p-2 h-8 w-8 ${
                                      question.isStarred 
                                        ? 'text-orange-600 hover:bg-orange-50' 
                                        : 'text-gray-400 hover:bg-gray-100'
                                    }`}
                                  >
                                    <Star className="w-4 h-4" fill={question.isStarred ? 'currentColor' : 'none'} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{question.isStarred ? 'Remove from must-ask' : 'Mark as must-ask'}</p>
                                </TooltipContent>
                              </Tooltip>
                              
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="p-2 h-8 w-8 text-gray-400 hover:bg-gray-100"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit question</p>
                                </TooltipContent>
                              </Tooltip>
                              
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    onClick={() => removeQuestion(index)}
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
                        </Card>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Export Actions */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-semibold text-lg text-center">Export Your Plan</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={handleDownloadPDF}
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 h-16 flex flex-col gap-1"
                >
                  <Download className="w-5 h-5" />
                  <span className="text-sm">Download PDF</span>
                </Button>
                
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  size="lg"
                  className="h-16 flex flex-col gap-1"
                >
                  <Printer className="w-5 h-5" />
                  <span className="text-sm">Print</span>
                </Button>
                
                <Button
                  onClick={handleCopyToClipboard}
                  variant="outline"
                  size="lg"
                  className="h-16 flex flex-col gap-1"
                >
                  <Copy className="w-5 h-5" />
                  <span className="text-sm">Copy Text</span>
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="lg"
                  className="h-16 flex flex-col gap-1"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">Share</span>
                </Button>
              </div>
            </div>

            {/* Final Encouragement */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600 italic text-lg">
                "You're now prepared to interview contractors with confidence. Great work!"
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
            >
              Back to Edit
            </Button>
            <Button
              onClick={onStartOver}
              variant="outline"
              size="lg"
              className="text-gray-600"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </CardContent>
      </>
    </TooltipProvider>
  );
};

export default Step5ExportPlan;
