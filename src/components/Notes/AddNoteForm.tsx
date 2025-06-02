
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { Note, noteTypeLabels } from '@/types/notes';

interface AddNoteFormProps {
  onAddNote: (note: Omit<Note, 'id' | 'timestamp'>) => void;
  contractors: string[];
}

const inspirationQuestions = [
  "How long have you been fixing this specific type of problem?",
  "What happens if your solution doesn't work as expected?", 
  "Can you show me before/after photos from similar jobs?",
  "What's your emergency response time if something goes wrong?",
  "How do you handle unexpected costs or complications?"
];

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onAddNote, contractors }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<Note['type']>('custom-question');
  const [contractorName, setContractorName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    onAddNote({
      content: content.trim(),
      type,
      contractorName: contractorName.trim() || undefined,
      followUpNotes: []
    });
    
    setContent('');
    setContractorName('');
    setIsExpanded(false);
  };

  const handleInspirationClick = (question: string) => {
    setContent(question);
    setIsExpanded(true);
  };

  if (!isExpanded) {
    return (
      <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
        <CardContent className="p-6">
          <Button
            onClick={() => setIsExpanded(true)}
            variant="ghost"
            className="w-full h-auto p-4 text-left justify-start"
          >
            <Plus className="h-5 w-5 mr-3 text-gray-400" />
            <div>
              <div className="font-medium text-gray-700">Add a new note</div>
              <div className="text-sm text-gray-500">Question, response, observation, or action item</div>
            </div>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">Add New Note</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Inspiration Section */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Need inspiration? Click any question below:
          </Label>
          <div className="grid gap-2">
            {inspirationQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleInspirationClick(question)}
                className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors duration-200 text-sm text-blue-800"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Note Type</Label>
            <Select value={type} onValueChange={(value: any) => setType(value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(noteTypeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium">Contractor (Optional)</Label>
            <Input
              value={contractorName}
              onChange={(e) => setContractorName(e.target.value)}
              placeholder="Contractor name"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Content</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your note, question, or observation..."
            className="mt-1 min-h-[120px]"
            rows={5}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Note
          </Button>
          <Button 
            onClick={() => setIsExpanded(false)}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddNoteForm;
