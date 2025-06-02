import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, Save, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Note, NotesData } from '@/types/notes';
import { generateQuestionList } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import InterviewSheet from '../InterviewSheet';

interface WizardState {
  userConcern: string;
  selectedCategories: string[];
  customQuestions: string[];
  starredQuestions: Set<string>;
  questionOrder: string[];
}

interface Step5ExportPlanProps {
  wizardState: WizardState;
  onBack: () => void;
  onStartOver: () => void;
  onExportComplete?: () => void;
}

// Confetti animation function
const triggerConfetti = () => {
  if (typeof window !== 'undefined' && window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF6347']
    });
  }
};

const Step5ExportPlan: React.FC<Step5ExportPlanProps> = ({
  wizardState,
  onBack,
  onStartOver,
  onExportComplete
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const handleExport = () => {
    const questionList = generateQuestionList(wizardState);

    const sections = [
      '=== K-SUMP INTERVIEW PLAN ===',
      '',
      `Generated: ${new Date().toLocaleDateString()}`,
      `Total Questions: ${questionList.length}`,
      '',
      '---',
      `Main Concern: ${wizardState.userConcern}`,
      '---',
      ''
    ];

    questionList.forEach((q, i) => {
      sections.push(`${i + 1}. ${q.content}`);
      sections.push('');
    });

    sections.push('---');
    sections.push('Created with The Elite 12: Basement Waterproofing Contractor Screening Guide');

    const content = sections.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'K-Sump Interview Plan.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Trigger confetti and success toast
    triggerConfetti();
    toast({
      title: "Download Complete! 🎉",
      description: "Your K-Sump Interview Plan has been downloaded successfully.",
      duration: 3000,
    });

    // Trigger completion callback after successful export
    if (onExportComplete) {
      setTimeout(() => {
        onExportComplete();
      }, 1000); // Small delay to ensure export completes
    }
  };

  const handleCopyToClipboard = () => {
    const questionList = generateQuestionList(wizardState);
    const questionsText = questionList.map((q, i) => `${i + 1}. ${q.content}`).join('\n');
    navigator.clipboard.writeText(questionsText)
      .then(() => {
        // Trigger confetti and success toast
        triggerConfetti();
        toast({
          title: "Questions Copied! 🎉",
          description: "All questions have been copied to your clipboard.",
          duration: 2000,
        });
      })
      .catch(err => {
        toast({
          title: "Copy failed",
          description: "Please try again.",
          variant: "destructive"
        });
      });
  };

  const handleSaveToNotes = async () => {
    setIsSaving(true);
    try {
      const questionList = generateQuestionList(wizardState);
      const newQuestions = questionList.map(q => q.content);

      // Load existing notes
      const savedNotes = localStorage.getItem('customNotes');
      let existingData: NotesData = { notes: [], generatedQuestions: [], contractors: [] };
      if (savedNotes) {
        existingData = JSON.parse(savedNotes) as NotesData;
      }

      // Append new questions to existing generated questions
      const updatedQuestions = [...(existingData.generatedQuestions || []), ...newQuestions];

      // Save updated data back to localStorage
      const dataToSave: NotesData = {
        ...existingData,
        generatedQuestions: updatedQuestions
      };
      localStorage.setItem('customNotes', JSON.stringify(dataToSave));

      // Trigger confetti and success toast
      triggerConfetti();
      toast({
        title: "Questions Saved! 🎉",
        description: "All questions have been saved to your notes successfully.",
        duration: 2000,
      });

      // Redirect to MyNotes page after a short delay
      setTimeout(() => {
        navigate('/my-notes');
      }, 1000);
    } catch (error) {
      console.error("Error saving questions:", error);
      toast({
        title: "Save failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-inter-tight font-bold text-2xl md:text-3xl text-black mb-2">
            Your Interview Plan
          </h2>
          <p className="text-gray-600">
            Review your customized contractor interview checklist and export it for use during meetings.
          </p>
        </div>
        <Button
          onClick={() => setShowPreview(!showPreview)}
          variant="outline"
          className="flex items-center gap-2"
        >
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>

      {/* Interview Sheet Preview */}
      {showPreview && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-h-96 overflow-y-auto">
          <InterviewSheet wizardState={wizardState} />
        </div>
      )}

      {/* Export Options */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-gray-900">Export Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={handleExport} className="bg-black text-white hover:bg-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Download as Text File
          </Button>
          <Button onClick={handleCopyToClipboard} variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copy Questions
          </Button>
          <Button onClick={handleSaveToNotes} disabled={isSaving} className="bg-blue-600 text-white hover:bg-blue-800 disabled:opacity-50">
            <Save className="w-4 h-4 mr-2" />
            Save to My Notes
          </Button>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          ← Back to Custom Questions
        </Button>
        <Button variant="ghost" onClick={onStartOver}>
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default Step5ExportPlan;
