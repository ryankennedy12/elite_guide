
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { WizardQuestionItem } from '@/data/wizard';

interface QuestionCardEditorProps {
  editedQuestion: string;
  editedProTip: string;
  editedRedFlag: string;
  onQuestionChange: (value: string) => void;
  onProTipChange: (value: string) => void;
  onRedFlagChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const QuestionCardEditor: React.FC<QuestionCardEditorProps> = ({
  editedQuestion,
  editedProTip,
  editedRedFlag,
  onQuestionChange,
  onProTipChange,
  onRedFlagChange,
  onSave,
  onCancel
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Question</label>
        <Textarea
          value={editedQuestion}
          onChange={(e) => onQuestionChange(e.target.value)}
          className="w-full text-base"
          rows={2}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-green-700 mb-2 block">Pro Tip</label>
        <Textarea
          value={editedProTip}
          onChange={(e) => onProTipChange(e.target.value)}
          className="w-full text-sm"
          rows={2}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-red-700 mb-2 block">Red Flag</label>
        <Textarea
          value={editedRedFlag}
          onChange={(e) => onRedFlagChange(e.target.value)}
          className="w-full text-sm"
          rows={2}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={onSave} size="sm" className="bg-black text-white hover:bg-gray-800">
          Save
        </Button>
        <Button onClick={onCancel} size="sm" variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default QuestionCardEditor;
