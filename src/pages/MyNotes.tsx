
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Download, Plus, Trash2 } from 'lucide-react';

interface NotesData {
  notes: string[];
  generatedQuestions?: string[];
}

const MyNotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<string[]>(['', '', '', '', '']);
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Check if user has unlocked content
    const unlocked = localStorage.getItem('elite12_unlocked');
    if (unlocked !== 'true') {
      navigate('/');
    }

    // Load saved notes
    const savedNotes = localStorage.getItem('customNotes');
    if (savedNotes) {
      const data: NotesData = JSON.parse(savedNotes);
      if (data.notes) {
        setNotes(data.notes.length >= 5 ? data.notes : [...data.notes, ...Array(5 - data.notes.length).fill('')]);
      }
      if (data.generatedQuestions) {
        setGeneratedQuestions(data.generatedQuestions);
      }
    }
  }, [navigate]);

  const handleNoteChange = (index: number, value: string) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
    setHasChanges(true);
  };

  const addNote = () => {
    setNotes([...notes, '']);
    setHasChanges(true);
  };

  const removeNote = (index: number) => {
    if (notes.length > 1) {
      const newNotes = notes.filter((_, i) => i !== index);
      setNotes(newNotes);
      setHasChanges(true);
    }
  };

  const saveNotes = () => {
    const data: NotesData = {
      notes: notes.filter(note => note.trim() !== ''),
      generatedQuestions
    };
    localStorage.setItem('customNotes', JSON.stringify(data));
    setHasChanges(false);

    // Track analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'notes_saved', {
        notes_count: data.notes.length,
      });
    }
  };

  const exportNotes = () => {
    const allContent = [
      '=== MY WATERPROOFING CONTRACTOR QUESTIONS & NOTES ===',
      '',
      ...generatedQuestions.map((q, i) => `Generated Question ${i + 1}: ${q}`),
      generatedQuestions.length > 0 ? '' : '',
      ...notes.filter(note => note.trim() !== '').map((note, i) => `Note ${i + 1}: ${note}`),
      '',
      '---',
      'Created with The Elite 12: Basement Waterproofing Contractor Screening Guide',
      'K-Sump Solutions • Waterproofing Authority • Columbus, OH'
    ].join('\n');

    const blob = new Blob([allContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-waterproofing-notes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Track analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'notes_exported', {
        notes_count: notes.filter(note => note.trim() !== '').length,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
            My Custom Questions & Notes
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Use this space to add your own questions, concerns, or notes for your contractor meetings. Print or save for reference.
          </p>
        </div>

        {/* Generated Questions Section */}
        {generatedQuestions.length > 0 && (
          <div className="mb-8">
            <h2 className="font-inter-tight font-semibold text-xl text-black mb-4">
              Generated Questions from Question Maker
            </h2>
            <div className="space-y-3">
              {generatedQuestions.map((question, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-800">{question}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Notes Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-inter-tight font-semibold text-xl text-black">
              My Custom Notes
            </h2>
            <Button
              onClick={addNote}
              variant="outline"
              size="sm"
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </div>

          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`note-${index}`} className="text-black font-medium">
                    Question/Note #{index + 1}
                  </Label>
                  {notes.length > 1 && (
                    <Button
                      onClick={() => removeNote(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <Textarea
                  id={`note-${index}`}
                  value={note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                  placeholder="Enter your custom question or note here..."
                  className="w-full min-h-[100px] border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-yellow-500"
                  rows={4}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              onClick={saveNotes}
              disabled={!hasChanges}
              className="bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save My Notes
            </Button>
            <Button
              onClick={exportNotes}
              variant="outline"
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export to File
            </Button>
          </div>

          {hasChanges && (
            <p className="text-center text-sm text-amber-600">
              You have unsaved changes
            </p>
          )}
        </div>

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-black mb-2">💡 Making the Most of Your Notes</h3>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>• Print your notes before contractor meetings for easy reference</li>
            <li>• Use the export feature to share with family members or advisors</li>
            <li>• Add contractor responses directly to your notes during meetings</li>
            <li>• Keep a record of which contractors gave the best answers</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default MyNotes;
