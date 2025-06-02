import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { WizardState } from '../WizardContainer';

interface Step5ExportPlanProps {
  wizardState: WizardState;
  onBack: () => void;
  onStartOver: () => void;
}

const Step5ExportPlan: React.FC<Step5ExportPlanProps> = ({ wizardState, onBack, onStartOver }) => {
  const handleExportComplete = () => {
    // Trigger wizard completion event for modal
    setTimeout(() => {
      const event = new CustomEvent('wizard-completed');
      window.dispatchEvent(event);
    }, 500);
  };

  const exportToPDF = () => {
    // Example export logic: generate PDF from questions and custom questions
    // This is a placeholder for actual PDF generation logic
    const questions = wizardState.questionOrder.length > 0
      ? wizardState.questionOrder
      : Array.from(wizardState.starredQuestions);

    const customQuestions = wizardState.customQuestions;

    // For demonstration, just log export content
    console.log('Exporting PDF with questions:', questions);
    console.log('Including custom questions:', customQuestions);

    // TODO: Implement actual PDF generation and download here

    // Trigger completion after export
    handleExportComplete();
  };

  const exportToEmail = () => {
    // Example email export logic: open mail client with prefilled content
    const subject = encodeURIComponent('My Custom Basement Waterproofing Interview Plan');
    const bodyLines = [
      'Here is my custom interview plan based on the Elite 12 Guide:',
      '',
      ...wizardState.questionOrder.map((q, i) => `${i + 1}. ${q}`),
      '',
      'Custom Questions:',
      ...wizardState.customQuestions.map((q, i) => `${i + 1}. ${q}`),
      '',
      'Generated with K-Sump Solutions Elite 12 Guide.'
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));

    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');

    // Trigger completion after email
    handleExportComplete();
  };

  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Export or Share Your Interview Plan</CardTitle>
          <CardDescription>
            Download your custom questions or email them to yourself or a friend.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            You can export your personalized interview plan as a PDF or send it via email.
            Use this to prepare for your contractor interviews and keep track of important questions.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Button onClick={exportToPDF} className="flex-1 h-12 bg-black text-white hover:bg-gray-800">
              Export as PDF
            </Button>
            <Button onClick={exportToEmail} variant="outline" className="flex-1 h-12 border-black text-black hover:bg-gray-50">
              Email My Plan
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button variant="ghost" onClick={onStartOver}>
            Start Over
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Step5ExportPlan;
