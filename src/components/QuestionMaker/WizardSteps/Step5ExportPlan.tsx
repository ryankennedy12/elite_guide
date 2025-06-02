
import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Share2, ArrowUpDown, Lightbulb } from 'lucide-react';
import { InterviewPlanCard, type QuestionPriority } from '../InterviewPlanCard';
import { ProfessionalPreview } from '../ProfessionalPreview';
import { type WizardState } from '../WizardContainer';
import { useToast } from '@/hooks/use-toast';
import html2pdf from 'html2pdf.js';

interface Step5ExportPlanProps {
  wizardState: WizardState;
  onBack: () => void;
  onStartOver: () => void;
}

interface QuestionItem {
  id: string;
  text: string;
  type: 'starred' | 'custom';
  category?: string;
  priority: QuestionPriority;
  proTip?: string;
  redFlag?: string;
}

const Step5ExportPlan: React.FC<Step5ExportPlanProps> = ({
  wizardState,
  onBack,
  onStartOver
}) => {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [questions, setQuestions] = useState<QuestionItem[]>(() => {
    // Initialize questions from wizard state
    const customQuestions = Array.isArray(wizardState.customQuestions) 
      ? wizardState.customQuestions 
      : [];
    
    return customQuestions.map((q, index) => {
      if (typeof q === 'string') {
        return {
          id: `question-${index}`,
          text: q,
          type: 'custom' as const,
          category: 'Custom Questions',
          priority: 'maybe' as QuestionPriority,
          proTip: undefined,
          redFlag: undefined
        };
      }
      
      return {
        id: q.id || `question-${index}`,
        text: q.text || q,
        type: (q.type || 'custom') as 'starred' | 'custom',
        category: q.category,
        priority: (q.priority || 'maybe') as QuestionPriority,
        proTip: q.proTip,
        redFlag: q.redFlag
      };
    });
  });

  const handlePriorityChange = (questionId: string, priority: QuestionPriority) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId ? { ...q, priority } : q
      )
    );
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
    toast({
      title: "Question removed",
      description: "The question has been removed from your interview plan.",
      duration: 2000,
    });
  };

  const handleMoveQuestion = (questionId: string, direction: 'up' | 'down') => {
    setQuestions(prev => {
      const currentIndex = prev.findIndex(q => q.id === questionId);
      if (currentIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newQuestions = [...prev];
      [newQuestions[currentIndex], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[currentIndex]];
      return newQuestions;
    });
  };

  const handleSmartOrganize = () => {
    setQuestions(prev => {
      const organized = [...prev].sort((a, b) => {
        // Priority: must-ask first, then maybe, then others
        const priorityOrder = { 'must-ask': 0, 'maybe': 1, 'remove': 2 };
        const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 1;
        const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 1;
        
        if (aPriority !== bPriority) return aPriority - bPriority;
        
        // Then by category (diagnostic first, cost last)
        const categoryOrder = {
          'Diagnostic': 0,
          'Health & Safety': 1,
          'System & Methods': 2,
          'Timeline': 3,
          'Warranty': 4,
          'Cost': 5,
          'Custom': 6
        };
        
        const aCategory = categoryOrder[a.category as keyof typeof categoryOrder] ?? 6;
        const bCategory = categoryOrder[b.category as keyof typeof categoryOrder] ?? 6;
        
        return aCategory - bCategory;
      });
      
      return organized;
    });

    toast({
      title: "Questions organized!",
      description: "Your questions have been arranged in the recommended interview flow.",
      duration: 2000,
    });
  };

  const handleExportPDF = async () => {
    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your interview plan.",
        duration: 3000,
      });

      const element = document.getElementById('pdf-content');
      if (!element) {
        throw new Error('Preview content not found');
      }

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `Interview-Plan-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
      
      toast({
        title: "PDF downloaded successfully!",
        description: "Your interview plan has been saved to your downloads.",
        duration: 2000,
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export failed",
        description: "There was an issue creating the PDF. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Contractor Interview Plan',
          text: 'Check out my professional contractor interview plan!',
          url: window.location.href
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback - copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The link to your interview plan has been copied to clipboard.",
        duration: 2000,
      });
    }
  };

  const mustAskCount = questions.filter(q => q.priority === 'must-ask').length;
  const maybeCount = questions.filter(q => q.priority === 'maybe').length;
  const totalQuestions = questions.length;

  if (showPreview) {
    return (
      <>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
            Interview Plan Preview
          </CardTitle>
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => setShowPreview(false)}
              variant="outline"
              size="lg"
            >
              <Eye className="w-4 h-4 mr-2" />
              Edit View
            </Button>
            <Button
              onClick={handleExportPDF}
              size="lg"
              className="bg-black text-white hover:bg-gray-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div id="pdf-content">
            <ProfessionalPreview 
              wizardState={{
                ...wizardState,
                customQuestions: questions
              }}
              printMode={false}
            />
          </div>
        </CardContent>
      </>
    );
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
          Review & Organize Your Questions
        </CardTitle>
        <p className="text-gray-600 text-lg">
          Organize your questions, set priorities, and create your professional interview plan.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="secondary" className="px-3 py-1 text-sm bg-orange-50 text-orange-700 border border-orange-200">
            {mustAskCount} Must Ask
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-sm bg-blue-50 text-blue-700 border border-blue-200">
            {maybeCount} Maybe
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-sm bg-gray-50 text-gray-600 border border-gray-200">
            {totalQuestions} Total Questions
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Smart Organize Card */}
        {totalQuestions > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900 mb-2">Pro Interview Flow</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Start with your top concern, then cover methodology, timeline, and save cost questions for last to get the best results.
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
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="max-w-4xl mx-auto">
          {totalQuestions === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No questions in your interview plan yet.
              </p>
              <Button onClick={onBack} variant="outline">
                Go back and add questions
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <InterviewPlanCard
                  key={question.id}
                  question={question}
                  index={index}
                  onPriorityChange={(priority) => handlePriorityChange(question.id, priority)}
                  onDelete={() => handleDeleteQuestion(question.id)}
                  onMoveUp={() => handleMoveQuestion(question.id, 'up')}
                  onMoveDown={() => handleMoveQuestion(question.id, 'down')}
                  canMoveUp={index > 0}
                  canMoveDown={index < questions.length - 1}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center pt-6 border-t">
          <div className="flex justify-center gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
            >
              Back
            </Button>
            <Button
              onClick={() => setShowPreview(true)}
              variant="outline"
              size="lg"
              disabled={totalQuestions === 0}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Plan
            </Button>
            <Button
              onClick={handleExportPDF}
              size="lg"
              className="bg-black text-white hover:bg-gray-800"
              disabled={totalQuestions === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Sticky Export Bar */}
      {totalQuestions > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="px-3 py-1 text-sm bg-orange-50 text-orange-700 border border-orange-200">
                    {mustAskCount} Must Ask
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1 text-sm bg-blue-50 text-blue-700 border border-blue-200">
                    {maybeCount} Maybe
                  </Badge>
                </div>
                <span className="text-sm text-gray-600 hidden sm:block">
                  Your interview plan is ready!
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowPreview(true)}
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
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
                  onClick={handleExportPDF}
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
      )}
    </>
  );
};

export default Step5ExportPlan;
