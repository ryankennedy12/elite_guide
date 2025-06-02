
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Save, X } from 'lucide-react';
import { Note, noteTypeLabels, noteTypeColors } from '@/types/notes';

interface NoteCardProps {
  note: Note;
  contractors: string[];
  onUpdate: (note: Note) => void;
  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, contractors, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);
  const [editedType, setEditedType] = useState(note.type);
  const [editedContractor, setEditedContractor] = useState(note.contractorName || '');

  const handleSave = () => {
    onUpdate({
      ...note,
      content: editedContent,
      type: editedType,
      contractorName: editedContractor || undefined
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(note.content);
    setEditedType(note.type);
    setEditedContractor(note.contractorName || '');
    setIsEditing(false);
  };

  return (
    <Card className="relative border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`text-xs font-medium ${noteTypeColors[note.type]}`}>
              {noteTypeLabels[note.type]}
            </Badge>
            {note.contractorName && (
              <Badge variant="outline" className="text-xs">
                {note.contractorName}
              </Badge>
            )}
            <span className="text-xs text-gray-500">
              {new Date(note.timestamp).toLocaleDateString()}
            </span>
          </div>
          <div className="flex gap-1">
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={onDelete}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-400 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Note Type</Label>
                <Select value={editedType} onValueChange={(value: any) => setEditedType(value)}>
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
                  value={editedContractor}
                  onChange={(e) => setEditedContractor(e.target.value)}
                  placeholder="Contractor name"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Content</Label>
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Enter your note, question, or observation..."
                className="mt-1 min-h-[120px]"
                rows={5}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {note.content}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteCard;
