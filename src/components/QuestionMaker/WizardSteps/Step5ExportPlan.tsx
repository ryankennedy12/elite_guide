
import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { RotateCcw, ArrowUpDown, Eye, Download, Share2 } from 'lucide-react';
import { type WizardState } from '../WizardContainer';
import { wizardQuestionBank } from '@/data/wizard';
import { TooltipProvider } from '@/components/ui/tooltip';
import { InterviewPlanCard, type QuestionPriority } from '../InterviewPlanCard';
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
    
    const categoryOrder = [
      'Diagnostic / Investigation', 
      'System Selection', 
      'Timeline / Project Management', 
      'Health / Safety / Air Quality', 
      'Compliance / Code', 
      'Cost & Value', 
      'Warranty / Contract'
    ];
    
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

  const handleDownloadPDF = () => {
    window.print();
    toast({
      title: "Print dialog opened",
      description: "Use your browser's print function to save as PDF.",
      duration: 3000,
    });
  };

  const handleShare = () => {
    const visibleQuestions = organizedQuestions.filter(q => q.priority !== 'remove');
    const text = `My Contractor Interview Questions\n\n${visibleQuestions.map((q, i) => `${i + 1}. ${q.text}`).join('\n\n')}`;
    
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
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-300 font-medium">
              {mustAskCount} Must Ask
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300 font-medium">
              {maybeCount} Maybe
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300 font-medium">
              {totalQuestions} total questions
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pb-32">
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
                    <Button
                      onClick={handleAutoOrganize}
                      variant="outline"
                      size="sm"
                      className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Auto-Organize
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {showPreview ? (
              /* PDF Preview Mode */
              <Card className="bg-white shadow-lg border-2 border-gray-200">
                <div className="p-6 md:p-8 space-y-6">
                  <div className="text-center border-b pb-4">
                    <h1 className="text-2xl font-bold text-black">Contractor Interview Plan</h1>
                    {wizardState.userConcern && (
                      <p className="text-gray-600 mt-2 font-medium">Focus: {wizardState.userConcern}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Generated on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {visibleQuestions.map((question, index) => (
                      <div key={question.id} className="flex gap-3 p-3 border-l-4 border-gray-200">
                        <span className="text-gray-500 font-medium flex-shrink-0 text-sm">
                          {index + 1}.
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-800 leading-relaxed mb-2">{question.text}</p>
                          <div className="flex gap-2 flex-wrap">
                            {question.priority === 'must-ask' && (
                              <Badge className="text-xs bg-orange-100 text-orange-700 border-orange-300">
                                ★ MUST ASK
                              </Badge>
                            )}
                            {question.category && (
                              <Badge variant="outline" className="text-xs">
                                {question.category}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {question.type === 'starred' ? 'Pre-built' : 'Custom'}
                            </Badge>
                          </div>
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
                        onPriorityChange={(priority) => handlePriorityChange(
                          organizedQuestions.findIndex(q => q.id === question.id), 
                          priority
                        )}
                        onDelete={() => handleDelete(organizedQuestions.findIndex(q => q.id === question.id))}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center gap-3 mt-8 flex-wrap">
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

        {/* Sticky Export Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-300">
                    {mustAskCount} Must Ask
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-300">
                    {maybeCount} Maybe
                  </Badge>
                </div>
                <span className="text-sm text-gray-600 hidden sm:block">
                  Your interview plan is ready!
                </span>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => setShowPreview(!showPreview)}
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? 'Edit View' : 'Preview'}
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                
                <Button
                  onClick={handleDownloadPDF}
                  size="sm"
                  className="bg-black text-white hover:bg-gray-800 font-medium"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    </TooltipProvider>
  );
};

export default Step5ExportPlan;
