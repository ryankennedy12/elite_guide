
import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Copy, RotateCcw, Share2 } from 'lucide-react';
import { type WizardState } from '../WizardContainer';

interface Step5ExportPlanProps {
  wizardState: WizardState;
  onBack: () => void;
  onStartOver: () => void;
}

const Step5ExportPlan: React.FC<Step5ExportPlanProps> = ({
  wizardState,
  onBack,
  onStartOver
}) => {
  const totalQuestions = wizardState.starredQuestions.size + wizardState.customQuestions.length;

  const handleDownloadPDF = () => {
    // TODO: Implement PDF export
    console.log('Downloading PDF...');
  };

  const handleCopyToClipboard = () => {
    // TODO: Implement copy functionality
    console.log('Copying to clipboard...');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Sharing plan...');
  };

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold text-black mb-4">
          Your Interview Plan is Ready!
        </CardTitle>
        <p className="text-gray-600 text-lg">
          Download, copy, or share your customized contractor interview questions.
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary">
            {totalQuestions} question{totalQuestions !== 1 ? 's' : ''} total
          </Badge>
          <Badge variant="secondary">
            {wizardState.selectedCategories.length} topic{wizardState.selectedCategories.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="max-w-2xl mx-auto">
          {/* Plan Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">Your Interview Plan Summary</h3>
            
            {wizardState.userConcern && (
              <div className="mb-4">
                <span className="font-medium text-gray-700">Main Concern: </span>
                <span className="text-gray-600">{wizardState.userConcern}</span>
              </div>
            )}
            
            <div className="mb-4">
              <span className="font-medium text-gray-700">Focus Areas: </span>
              <span className="text-gray-600">
                {wizardState.selectedCategories.join(', ')}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">{wizardState.starredQuestions.size}</div>
                <div className="text-sm text-gray-600">Starred Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">{wizardState.customQuestions.length}</div>
                <div className="text-sm text-gray-600">Custom Questions</div>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-center">Export Your Plan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handleDownloadPDF}
                size="lg"
                className="bg-black text-white hover:bg-gray-800 h-16 flex flex-col gap-1"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </Button>
              
              <Button
                onClick={handleCopyToClipboard}
                variant="outline"
                size="lg"
                className="h-16 flex flex-col gap-1"
              >
                <Copy className="w-5 h-5" />
                <span>Copy to Clipboard</span>
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                size="lg"
                className="h-16 flex flex-col gap-1"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Link</span>
              </Button>
              
              <Button
                onClick={onStartOver}
                variant="outline"
                size="lg"
                className="h-16 flex flex-col gap-1"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Start Over</span>
              </Button>
            </div>
          </div>

          {/* Encouragement */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 italic">
              "Great contractors love working with prepared homeowners. Don't hesitate to ask these questions!"
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
          >
            Back to Edit
          </Button>
        </div>
      </CardContent>
    </>
  );
};

export default Step5ExportPlan;
