import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Save, Download, FileText } from 'lucide-react';
import { Note, NotesData } from '@/types/notes';
import NoteCard from '@/components/Notes/NoteCard';
import AddNoteForm from '@/components/Notes/AddNoteForm';
import NotesFilters from '@/components/Notes/NotesFilters';
import { useToast } from '@/hooks/use-toast';
import { useContentAccess } from '@/hooks/useContentAccess';

const MyNotes = () => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [contractors, setContractors] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedContractor, setSelectedContractor] = useState('all');

  useContentAccess();

  useEffect(() => {
    // Load saved notes
    const savedNotes = localStorage.getItem('customNotes');
    if (savedNotes) {
      try {
        const data: NotesData = JSON.parse(savedNotes);
        if (data.notes) {
          // Convert old format to new format if needed
          const convertedNotes = data.notes.map((note: any) => {
            if (typeof note === 'string') {
              return {
                id: Date.now().toString() + Math.random(),
                content: note,
                type: 'custom-question' as const,
                timestamp: new Date(),
                followUpNotes: []
              };
            }
            return {
              ...note,
              timestamp: new Date(note.timestamp || Date.now())
            };
          });
          setNotes(convertedNotes);
        }
        if (data.generatedQuestions) {
          setGeneratedQuestions(data.generatedQuestions);
        }
        if (data.contractors) {
          setContractors(data.contractors);
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    }
  }, []);

  // Update contractors list when notes change
  useEffect(() => {
    const uniqueContractors = Array.from(
      new Set(notes.map(note => note.contractorName).filter(Boolean))
    ) as string[];
    setContractors(uniqueContractors);
  }, [notes]);

  const addNote = (noteData: Omit<Note, 'id' | 'timestamp'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString() + Math.random(),
      timestamp: new Date()
    };
    setNotes([newNote, ...notes]);
    setHasChanges(true);
    
    toast({
      title: "Note added",
      description: "Your note has been saved to your journal.",
      duration: 2000,
    });
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    setHasChanges(true);
    
    toast({
      title: "Note updated",
      description: "Your changes have been saved.",
      duration: 2000,
    });
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    setHasChanges(true);
    
    toast({
      title: "Note deleted",
      description: "The note has been removed from your journal.",
      duration: 2000,
    });
  };

  const saveNotes = () => {
    const data: NotesData = {
      notes,
      generatedQuestions,
      contractors
    };
    localStorage.setItem('customNotes', JSON.stringify(data));
    setHasChanges(false);

    toast({
      title: "Notes saved",
      description: "All your notes have been saved successfully.",
      duration: 2000,
    });

    // Track analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'notes_saved', {
        notes_count: notes.length,
      });
    }
  };

  const exportNotes = () => {
    const filteredNotes = getFilteredNotes();
    
    const sections = [
      '=== CONTRACTOR Q&A JOURNAL ===',
      '',
      `Export Date: ${new Date().toLocaleDateString()}`,
      `Total Notes: ${filteredNotes.length}`,
      ''
    ];

    // Add generated questions if any
    if (generatedQuestions.length > 0) {
      sections.push('=== GENERATED QUESTIONS ===');
      generatedQuestions.forEach((q, i) => {
        sections.push(`${i + 1}. ${q}`);
      });
      sections.push('');
    }

    // Group notes by contractor
    const notesByContractor = filteredNotes.reduce((acc, note) => {
      const contractor = note.contractorName || 'General Notes';
      if (!acc[contractor]) acc[contractor] = [];
      acc[contractor].push(note);
      return acc;
    }, {} as Record<string, Note[]>);

    Object.entries(notesByContractor).forEach(([contractor, contractorNotes]) => {
      sections.push(`=== ${contractor.toUpperCase()} ===`);
      contractorNotes.forEach((note, i) => {
        sections.push(`${i + 1}. [${note.type.replace('-', ' ').toUpperCase()}]`);
        sections.push(`   ${note.content}`);
        sections.push(`   Date: ${new Date(note.timestamp).toLocaleDateString()}`);
        sections.push('');
      });
    });

    sections.push('---');
    sections.push('Created with The Elite 12: Basement Waterproofing Contractor Screening Guide');
    sections.push('K-Sump Solutions • Waterproofing Authority • Columbus, OH');

    const content = sections.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contractor-qa-journal.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export complete",
      description: "Your Q&A journal has been downloaded.",
      duration: 3000,
    });

    // Track analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'notes_exported', {
        notes_count: filteredNotes.length,
      });
    }
  };

  const getFilteredNotes = () => {
    return notes.filter(note => {
      const typeMatch = selectedType === 'all' || note.type === selectedType;
      const contractorMatch = selectedContractor === 'all' || note.contractorName === selectedContractor;
      return typeMatch && contractorMatch;
    });
  };

  const filteredNotes = getFilteredNotes();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-inter-tight font-bold text-4xl md:text-5xl text-black mb-4">
            Contractor Q&A Journal
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Document questions, track contractor responses, and organize your observations. 
            Compare multiple contractors side-by-side and keep all your notes in one professional place.
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

        {/* Filters */}
        {notes.length > 0 && (
          <div className="mb-6">
            <NotesFilters
              selectedType={selectedType}
              selectedContractor={selectedContractor}
              contractors={contractors}
              onTypeChange={setSelectedType}
              onContractorChange={setSelectedContractor}
              totalNotes={notes.length}
              filteredCount={filteredNotes.length}
            />
          </div>
        )}

        {/* Add Note Form */}
        <div className="mb-8">
          <AddNoteForm onAddNote={addNote} contractors={contractors} />
        </div>

        {/* Notes List */}
        <div className="space-y-6">
          {filteredNotes.length === 0 && notes.length > 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg mb-2">No notes match your current filters</p>
              <p className="text-sm">Try adjusting the filters above or add a new note</p>
            </div>
          )}
          
          {filteredNotes.length === 0 && notes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg mb-2">Start your contractor evaluation journal</p>
              <p className="text-sm">Add your first note above to begin organizing contractor responses</p>
            </div>
          )}

          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              contractors={contractors}
              onUpdate={updateNote}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </div>

        {/* Actions */}
        {notes.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 mt-8 border-t">
            <Button
              onClick={saveNotes}
              disabled={!hasChanges}
              className="bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {hasChanges ? 'Save Changes' : 'All Saved'}
            </Button>
            <Button
              onClick={exportNotes}
              variant="outline"
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Journal
            </Button>
          </div>
        )}

        {hasChanges && (
          <p className="text-center text-sm text-amber-600 mt-4">
            You have unsaved changes
          </p>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-black mb-3">💡 How to Use Your Q&A Journal</h3>
          <ul className="text-gray-700 text-sm space-y-2">
            <li>• <strong>Custom Questions:</strong> Add your specific questions before contractor meetings</li>
            <li>• <strong>Contractor Responses:</strong> Record what each contractor tells you during meetings</li>
            <li>• <strong>Personal Observations:</strong> Note your impressions, concerns, or gut feelings</li>
            <li>• <strong>Action Items:</strong> Track follow-ups, documents to request, or next steps</li>
            <li>• <strong>Compare Contractors:</strong> Use filters to view responses from each contractor side-by-side</li>
            <li>• <strong>Export & Share:</strong> Download your complete journal to share with family or advisors</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default MyNotes;
