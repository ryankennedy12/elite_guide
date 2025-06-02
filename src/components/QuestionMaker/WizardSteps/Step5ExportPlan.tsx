
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

  const handleSmartOrganize = () => {
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
    const visibleQuestions = organizedQuestions.filter(q => q.priority !== 'remove');
    const content = generatePDFContent(visibleQuestions, wizardState.userConcern);
    
    // Create and download PDF
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'contractor-interview-plan.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download started!",
      description: "Your interview plan is downloading.",
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

  const generatePDFContent = (questions: OrganizedQuestion[], concern: string) => {
    const mustAskQuestions = questions.filter(q => q.priority === 'must-ask');
    const maybeQuestions = questions.filter(q => q.priority === 'maybe');
    const optionalQuestions = questions.filter(q => q.priority === 'optional');
    
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Contractor Interview Plan</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin-bottom: 30px; }
        .question { margin-bottom: 15px; padding: 10px; border-left: 3px solid #007bff; }
        .must-ask { border-left-color: #dc3545; background: #fff5f5; }
        .maybe { border-left-color: #007bff; background: #f8f9fa; }
        .optional { border-left-color: #6c757d; background: #f8f9fa; }
        .tag { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-right: 5px; }
        .must-ask-tag { background: #dc3545; color: white; }
        .maybe-tag { background: #007bff; color: white; }
        .optional-tag { background: #6c757d; color: white; }
        .pro-tip { background: #d4edda; border: 1px solid #c3e6cb; padding: 10px; margin: 5px 0; border-radius: 5px; }
        .red-flag { background: #f8d7da; border: 1px solid #f5c6cb; padding: 10px; margin: 5px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Contractor Interview Plan</h1>
        <h2>Elite 12 Guide</h2>
        ${concern ? `<p><strong>Focus:</strong> ${concern}</p>` : ''}
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    </div>
    
    ${mustAskQuestions.length > 0 ? `
    <div class="section">
        <h2>Must Ask Questions (${mustAskQuestions.length})</h2>
        ${mustAskQuestions.map((q, i) => `
        <div class="question must-ask">
            <strong>${i + 1}. ${q.text}</strong>
            <span class="tag must-ask-tag">MUST ASK</span>
            ${q.category ? `<span class="tag">${q.category}</span>` : ''}
            ${q.proTip ? `<div class="pro-tip"><strong>💡 Pro Tip:</strong> ${q.proTip}</div>` : ''}
            ${q.redFlag ? `<div class="red-flag"><strong>🚩 Red Flag:</strong> ${q.redFlag}</div>` : ''}
        </div>
        `).join('')}
    </div>
    ` : ''}
    
    ${maybeQuestions.length > 0 ? `
    <div class="section">
        <h2>Maybe Questions (${maybeQuestions.length})</h2>
        ${maybeQuestions.map((q, i) => `
        <div class="question maybe">
            <strong>${mustAskQuestions.length + i + 1}. ${q.text}</strong>
            <span class="tag maybe-tag">MAYBE</span>
            ${q.category ? `<span class="tag">${q.category}</span>` : ''}
            ${q.proTip ? `<div class="pro-tip"><strong>💡 Pro Tip:</strong> ${q.proTip}</div>` : ''}
            ${q.redFlag ? `<div class="red-flag"><strong>🚩 Red Flag:</strong> ${q.redFlag}</div>` : ''}
        </div>
        `).join('')}
    </div>
    ` : ''}
    
    ${optionalQuestions.length > 0 ? `
    <div class="section">
        <h2>Optional Questions (${optionalQuestions.length})</h2>
        ${optionalQuestions.map((q, i) => `
        <div class="question optional">
            <strong>${mustAskQuestions.length + maybeQuestions.length + i + 1}. ${q.text}</strong>
            <span class="tag optional-tag">OPTIONAL</span>
            ${q.category ? `<span class="tag">${q.category}</span>` : ''}
            ${q.proTip ? `<div class="pro-tip"><strong>💡 Pro Tip:</strong> ${q.proTip}</div>` : ''}
            ${q.redFlag ? `<div class="red-flag"><strong>🚩 Red Flag:</strong> ${q.redFlag}</div>` : ''}
        </div>
        `).join('')}
    </div>
    ` : ''}
    
    <div class="section">
        <h2>Notes</h2>
        <p style="border: 1px solid #ddd; padding: 20px; min-height: 200px;">
            Use this space to write down contractor responses and compare their answers.
        </p>
    </div>
    
    <div style="text-align: center; font-style: italic; margin-top: 40px; color: #666;">
        "Great contractors appreciate prepared homeowners. Don't hesitate to ask these questions!"
    </div>
</body>
</html>
    `;
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
                    <Button
                      onClick={handleSmartOrganize}
                      variant="outline"
                      size="sm"
                      className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Smart Organize
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {showPreview ? (
              /* Professional PDF Preview */
              <Card className="bg-white shadow-lg border-2 border-gray-200">
                <div className="p-8 space-y-6">
                  <div className="text-center border-b pb-4">
                    <h1 className="text-2xl font-bold text-black">Contractor Interview Plan</h1>
                    <h2 className="text-lg text-gray-700 mt-1">Elite 12 Guide</h2>
                    {wizardState.userConcern && (
                      <p className="text-gray-600 mt-2">
                        <strong>Focus:</strong> {wizardState.userConcern}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Generated on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  
                  {/* Must Ask Questions */}
                  {visibleQuestions.filter(q => q.priority === 'must-ask').length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-red-700 border-l-4 border-red-500 pl-3">
                        Must Ask Questions ({visibleQuestions.filter(q => q.priority === 'must-ask').length})
                      </h3>
                      {visibleQuestions.filter(q => q.priority === 'must-ask').map((question, index) => (
                        <div key={question.id} className="bg-red-50 border-l-3 border-red-500 p-4 rounded">
                          <div className="flex items-start gap-3">
                            <span className="text-red-700 font-bold">{index + 1}.</span>
                            <div className="flex-1">
                              <p className="text-gray-800">{question.text}</p>
                              <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mt-1">
                                MUST ASK
                              </span>
                              {question.category && (
                                <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mt-1 ml-2">
                                  {question.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Maybe Questions */}
                  {visibleQuestions.filter(q => q.priority === 'maybe').length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-blue-700 border-l-4 border-blue-500 pl-3">
                        Maybe Questions ({visibleQuestions.filter(q => q.priority === 'maybe').length})
                      </h3>
                      {visibleQuestions.filter(q => q.priority === 'maybe').map((question, index) => (
                        <div key={question.id} className="bg-blue-50 border-l-3 border-blue-500 p-4 rounded">
                          <div className="flex items-start gap-3">
                            <span className="text-blue-700 font-bold">
                              {visibleQuestions.filter(q => q.priority === 'must-ask').length + index + 1}.
                            </span>
                            <div className="flex-1">
                              <p className="text-gray-800">{question.text}</p>
                              <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mt-1">
                                MAYBE
                              </span>
                              {question.category && (
                                <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mt-1 ml-2">
                                  {question.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Notes</h3>
                    <div className="border border-gray-300 p-4 min-h-32 bg-gray-50 rounded">
                      <p className="text-gray-500 italic">
                        Use this space to write down contractor responses and compare their answers.
                      </p>
                    </div>
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

        {/* Sticky Export Bar */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {mustAskCount} Must Ask
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {maybeCount} Maybe
                  </Badge>
                </div>
                <span className="text-sm text-gray-600 hidden sm:block">
                  Your interview plan is ready!
                </span>
              </div>
              
              <div className="flex gap-2">
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
                  className="bg-black text-white hover:bg-gray-800"
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
