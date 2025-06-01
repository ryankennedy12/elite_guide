
import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';
import { type WizardState } from '../WizardContainer';
import { wizardQuestionBank } from '@/data/wizard';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QuestionPlanCard } from '../QuestionPlanCard';
import { SmartOrganizer } from '../SmartOrganizer';
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
  isStarred?: boolean;
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
          isStarred: true,
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
        type: 'custom'
      });
    });
    
    return questions;
  });

  const [showPreview, setShowPreview] = useState(false);
  const totalQuestions = organizedQuestions.length;
  const mustAskCount = organizedQuestions.filter(q => q.isStarred).length;

  const categoryOrder = ['Diagnostics', 'System', 'Warranty', 'Cost', 'Timeline', 'Process'];
  
  const handleAutoOrganize = () => {
    const organized: OrganizedQuestion[] = [];
    const grouped = organizedQuestions.reduce((groups, question) => {
      const category = question.category || 'Custom Questions';
      if (!groups[category]) groups[category] = [];
      groups[category].push(question);
      return groups;
    }, {} as Record<string, OrganizedQuestion[]>);
    
    // Add must-ask questions first
    const mustAsk = organizedQuestions.filter(q => q.isStarred);
    organized.push(...mustAsk);
    
    // Add remaining questions by category priority
    categoryOrder.forEach(category => {
      if (grouped[category]) {
        const remaining = grouped[category].filter(q => !q.isStarred);
        organized.push(...remaining);
      }
    });
    
    // Add remaining categories
    Object.keys(grouped).forEach(category => {
      if (!categoryOrder.includes(category)) {
        const remaining = grouped[category].filter(q => !q.isStarred);
        organized.push(...remaining);
      }
    });
    
    setOrganizedQuestions(organized);
    toast({
      title: "Questions organized!",
      description: "Your questions are now in optimal interview order.",
      duration: 3000,
    });
  };

  const handleToggleStar = (index: number) => {
    const updated = [...organizedQuestions];
    updated[index] = { ...updated[index], isStarred: !updated[index].isStarred };
    setOrganizedQuestions(updated);
  };

  const handleEdit = (index: number) => {
    // TODO: Implement inline editing
    console.log('Edit question at index:', index);
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
    toast({
      title: "Downloading PDF...",
      description: "Your interview plan will download shortly.",
      duration: 3000,
    });
    // TODO: Implement actual PDF generation
  };

  const handleShare = () => {
    const text = organizedQuestions.map((q, i) => `${i + 1}. ${q.text}`).join('\n\n');
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

  // Group questions by category for display
  const groupedQuestions = organizedQuestions.reduce((groups, question, index) => {
    const category = question.category || 'Custom Questions';
    if (!groups[category]) groups[category] = [];
    groups[category].push({ ...question, originalIndex: index });
    return groups;
  }, {} as Record<string, (OrganizedQuestion & { originalIndex: number })[]>);

  const shouldShowCategoryHeader = (index: number): boolean => {
    if (index === 0) return true;
    const currentCategory = organizedQuestions[index].category || 'Custom Questions';
    const previousCategory = organizedQuestions[index - 1].category || 'Custom Questions';
    return currentCategory !== previousCategory;
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
            {mustAskCount > 0 && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {mustAskCount} must-ask
              </Badge>
            )}
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {wizardState.selectedCategories.length} topic{wizardState.selectedCategories.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pb-24"> {/* Add bottom padding for sticky bar */}
          <div className="max-w-4xl mx-auto">
            <SmartOrganizer
              onAutoOrganize={handleAutoOrganize}
              totalQuestions={totalQuestions}
            />

            {showPreview ? (
              /* PDF Preview Mode */
              <Card className="bg-white shadow-lg border-2 border-gray-200 mt-6">
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
                            {question.category || 'Custom Questions'}
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
              <div className="space-y-4 mt-6">
                {organizedQuestions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No questions added yet. Go back to add some questions to your plan.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {organizedQuestions.map((question, index) => (
                      <div key={question.id}>
                        {shouldShowCategoryHeader(index) && (
                          <div className="flex items-center gap-3 mt-8 mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {question.category || 'Custom Questions'}
                            </h3>
                            <div className="flex-1 h-px bg-gray-300"></div>
                          </div>
                        )}
                        
                        <QuestionPlanCard
                          question={question}
                          index={index}
                          onEdit={() => handleEdit(index)}
                          onDelete={() => handleDelete(index)}
                          onToggleStar={() => handleToggleStar(index)}
                        />
                      </div>
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
