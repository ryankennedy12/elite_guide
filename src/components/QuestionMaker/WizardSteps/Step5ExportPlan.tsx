
import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { RotateCcw, ArrowUpDown, Eye } from 'lucide-react';
import { type WizardState } from '../WizardContainer';
import { wizardQuestionBank } from '@/data/wizard';
import { TooltipProvider } from '@/components/ui/tooltip';
import { InterviewPlanCard, type QuestionPriority } from '../InterviewPlanCard';
import { StickyExportBar } from '../StickyExportBar';
import { useToast } from '@/hooks/use-toast';

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
  priority?: QuestionPriority;
  proTip?: string;
  redFlag?: string;
}

const Step5ExportPlan: React.FC<Step5ExportPlanProps> = ({
  wizardState,
  onBack,
  onStartOver
}) => {
  const { toast } = useToast();
  
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
          priority: 'maybe',
          proTip: question.proTip,
          redFlag: question.redFlag
        });
      }
    });
    
    // Add custom questions
    wizardState.customQuestions.forEach((question, index) => {
      questions.push({
        id: `custom-${index}`,
        text: question,
        type: 'custom',
        priority: 'maybe'
      });
    });
    
    return questions;
  });

  const [showPreview, setShowPreview] = useState(false);
  
  const mustAskCount = organizedQuestions.filter(q => q.priority === 'must-ask').length;
  const maybeCount = organizedQuestions.filter(q => q.priority === 'maybe').length;
  const totalQuestions = organizedQuestions.filter(q => q.priority !== 'remove').length;

  const handleAutoOrganize = () => {
    const mustAsk = organizedQuestions.filter(q => q.priority === 'must-ask');
    const maybe = organizedQuestions.filter(q => q.priority === 'maybe');
    const removed = organizedQuestions.filter(q => q.priority === 'remove');
    
    const categoryOrder = ['Diagnostic / Investigation', 'System Selection', 'Timeline / Project Management', 'Health / Safety / Air Quality', 'Compliance / Code', 'Cost & Value', 'Warranty / Contract'];
    
    const sortByCategory = (a: OrganizedQuestion, b: OrganizedQuestion) => {
      const aIndex = categoryOrder.indexOf(a.category || '');
      const bIndex = categoryOrder.indexOf(b.category || '');
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    };
    
    const organized = [
      ...mustAsk.sort(sortByCategory),
      ...maybe.sort(sortByCategory),
      ...removed
    ];
    
    setOrganizedQuestions(organized);
    toast({
      title: "Questions organized!",
      description: "Your questions are now in optimal interview order.",
      duration: 3000,
    });
  };

  const handlePriorityChange = (index: number, priority: QuestionPriority) => {
    const updated = [...organizedQuestions];
    updated[index] = { ...updated[index], priority };
    setOrganizedQuestions(updated);
  };

  const handleDelete = (index: number) => {
    setOrganizedQuestions(organizedQuestions.filter((_, i) => i !== index));
    toast({
      title: "Question removed",
      description: "The question has been deleted from your plan.",
      duration: 2000,
    });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...organizedQuestions];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setOrganizedQuestions(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === organizedQuestions.length - 1) return;
    const updated = [...organizedQuestions];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setOrganizedQuestions(updated);
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Downloading PDF...",
      description: "Your interview plan will download shortly.",
      duration: 3000,
    });
  };

  const handleShare = () => {
    const visibleQuestions = organizedQuestions.filter(q => q.priority !== 'remove');
    const text = visibleQuestions.map((q, i) => `${i + 1}. ${q.text}`).join('\n\n');
    if (navigator.share) {
      navigator.share({
        title: 'My Contractor Interview Questions',
        text: text
      });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Share your questions with others.",
        duration: 3000,
      });
    }
  };

  const visibleQuestions = organizedQuestions.filter(q => q.priority !== 'remove');

  return (
    <TooltipProvider>
      <>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
            Organize Your Interview Plan
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Prioritize your questions, organize the order, and export your final plan.
          </p>
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              {mustAskCount} Must Ask
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {maybeCount} Maybe
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {totalQuestions} total questions
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pb-24">
          <div className="max-w-4xl mx-auto">
            {/* Smart Organize Section */}
            <Card className="border-blue-200 bg-blue-50 mb-6">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ArrowUpDown className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900 mb-2">Smart Interview Order</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      Organize questions for maximum effectiveness: diagnostics first, process/timeline middle, cost and contracts last.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleAutoOrganize}
                        variant="outline"
                        size="sm"
                        className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        Auto-Organize
                      </Button>
                      <Button
                        onClick={() => setShowPreview(!showPreview)}
                        variant="outline"
                        size="sm"
                        className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {showPreview ? 'Edit View' : 'Preview Sheet'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {showPreview ? (
              /* Professional Interview Sheet Preview */
              <Card className="bg-white shadow-lg border-2 border-gray-200 max-w-4xl mx-auto">
                <div className="p-8 space-y-6 print:p-4">
                  {/* Header */}
                  <div className="text-center border-b-2 border-gray-300 pb-6">
                    <div className="bg-black text-white px-6 py-3 rounded-lg inline-block mb-4">
                      <h1 className="text-xl font-bold">ELITE 12 GUIDE</h1>
                      <p className="text-sm opacity-90">Professional Interview Plan</p>
                    </div>
                    {wizardState.userConcern && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                        <p className="text-gray-800 font-medium">Project Focus: {wizardState.userConcern}</p>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-3">
                      Generated on {new Date().toLocaleDateString()} • {totalQuestions} Questions
                    </p>
                  </div>
                  
                  {/* Questions by Priority */}
                  <div className="space-y-6">
                    {/* Must Ask Questions */}
                    {mustAskCount > 0 && (
                      <div>
                        <div className="bg-orange-100 border border-orange-300 rounded-lg p-3 mb-4">
                          <h2 className="text-lg font-bold text-orange-800 flex items-center gap-2">
                            ⭐ MUST ASK QUESTIONS ({mustAskCount})
                          </h2>
                          <p className="text-sm text-orange-700 mt-1">Ask these questions to every contractor</p>
                        </div>
                        <div className="space-y-3">
                          {visibleQuestions
                            .filter(q => q.priority === 'must-ask')
                            .map((question, index) => (
                            <div key={question.id} className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <span className="text-orange-600 font-bold flex-shrink-0 text-lg">
                                {index + 1}.
                              </span>
                              <div className="flex-1">
                                <p className="text-gray-800 leading-relaxed font-medium">{question.text}</p>
                                {question.category && (
                                  <span className="text-xs text-orange-600 font-medium mt-1 inline-block">
                                    {question.category}
                                  </span>
                                )}
                                <div className="mt-2 border-t border-orange-200 pt-2">
                                  <p className="text-xs text-gray-600">Contractor's Answer:</p>
                                  <div className="h-8 border-b border-gray-300 mt-1"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Maybe Questions */}
                    {maybeCount > 0 && (
                      <div>
                        <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 mb-4">
                          <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2">
                            💭 ADDITIONAL QUESTIONS ({maybeCount})
                          </h2>
                          <p className="text-sm text-blue-700 mt-1">Ask if time permits or specific concerns arise</p>
                        </div>
                        <div className="space-y-3">
                          {visibleQuestions
                            .filter(q => q.priority === 'maybe')
                            .map((question, index) => (
                            <div key={question.id} className="flex gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <span className="text-blue-600 font-bold flex-shrink-0 text-lg">
                                {mustAskCount + index + 1}.
                              </span>
                              <div className="flex-1">
                                <p className="text-gray-800 leading-relaxed font-medium">{question.text}</p>
                                {question.category && (
                                  <span className="text-xs text-blue-600 font-medium mt-1 inline-block">
                                    {question.category}
                                  </span>
                                )}
                                <div className="mt-2 border-t border-blue-200 pt-2">
                                  <p className="text-xs text-gray-600">Contractor's Answer:</p>
                                  <div className="h-8 border-b border-gray-300 mt-1"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="border-t-2 border-gray-300 pt-6 text-center">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700 italic font-medium">
                        "Great contractors appreciate prepared homeowners. Don't hesitate to ask these questions!"
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        For more contractor interview resources, visit Elite12Guide.com
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              /* Edit Mode */
              <div className="space-y-4">
                {organizedQuestions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No questions added yet. Go back to add some questions to your plan.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {organizedQuestions.filter(q => q.priority !== 'remove').map((question, index) => (
                      <InterviewPlanCard
                        key={question.id}
                        question={question}
                        index={index}
                        isFirst={index === 0}
                        isLast={index === organizedQuestions.filter(q => q.priority !== 'remove').length - 1}
                        onPriorityChange={(priority) => handlePriorityChange(
                          organizedQuestions.findIndex(q => q.id === question.id), 
                          priority
                        )}
                        onDelete={() => handleDelete(organizedQuestions.findIndex(q => q.id === question.id))}
                        onMoveUp={() => handleMoveUp(organizedQuestions.findIndex(q => q.id === question.id))}
                        onMoveDown={() => handleMoveDown(organizedQuestions.findIndex(q => q.id === question.id))}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center gap-3 mt-8">
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

        <StickyExportBar
          totalQuestions={totalQuestions}
          mustAskCount={mustAskCount}
          maybeCount={maybeCount}
          onPreview={() => setShowPreview(!showPreview)}
          onExport={handleDownloadPDF}
          onShare={handleShare}
          isPreviewMode={showPreview}
        />
      </>
    </TooltipProvider>
  );
};

export default Step5ExportPlan;
