import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import NotesFilters from '@/components/Notes/NotesFilters';
import { Note, noteTypeLabels } from '@/types/notes';
import ShareFeedbackModal from '@/components/ShareFeedbackModal';
import { useShareFeedbackModal } from '@/hooks/useShareFeedbackModal';

const MyNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedContractor, setSelectedContractor] = useState('all');
  const [contractors, setContractors] = useState<string[]>([]);

  const { isModalOpen, triggerType, showModal, closeModal } = useShareFeedbackModal();

  useEffect(() => {
    // Load notes from localStorage or API
    const savedNotes = localStorage.getItem('my_notes');
    if (savedNotes) {
      const parsedNotes: Note[] = JSON.parse(savedNotes);
      setNotes(parsedNotes);
      setFilteredNotes(parsedNotes);

      // Extract unique contractors
      const uniqueContractors = Array.from(new Set(parsedNotes.map(note => note.contractorName).filter(Boolean) as string[]));
      setContractors(uniqueContractors);
    }
  }, []);

  useEffect(() => {
    // Filter notes based on selected filters
    let filtered = notes;

    if (selectedType !== 'all') {
      filtered = filtered.filter(note => note.type === selectedType);
    }

    if (selectedContractor !== 'all') {
      filtered = filtered.filter(note => note.contractorName === selectedContractor);
    }

    setFilteredNotes(filtered);
  }, [selectedType, selectedContractor, notes]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const handleContractorChange = (contractor: string) => {
    setSelectedContractor(contractor);
  };

  const handleNotesExport = () => {
    // Export logic: e.g., generate PDF or CSV of notes
    // For demonstration, just log to console
    console.log('Exporting notes:', filteredNotes);

    // If user has significant notes, trigger modal
    if (filteredNotes.length >= 3) {
      setTimeout(() => {
        showModal('notes-submit');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black mb-6">My Notes & Interview Plan</h1>

        <NotesFilters
          selectedType={selectedType}
          selectedContractor={selectedContractor}
          contractors={contractors}
          onTypeChange={handleTypeChange}
          onContractorChange={handleContractorChange}
          totalNotes={notes.length}
          filteredCount={filteredNotes.length}
        />

        <div className="mt-6 space-y-4">
          {filteredNotes.length === 0 ? (
            <p className="text-gray-600 text-center">No notes match your filters.</p>
          ) : (
            filteredNotes.map(note => (
              <Card key={note.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 font-semibold">{note.content}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Type: {noteTypeLabels[note.type]}{note.contractorName ? ` | Contractor: ${note.contractorName}` : ''}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(note.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={handleNotesExport} className="bg-black text-white hover:bg-gray-800">
            Export Notes & Plan
          </Button>
        </div>
      </div>

      {/* Add the Share Feedback Modal */}
      <ShareFeedbackModal
        isOpen={isModalOpen}
        onClose={closeModal}
        trigger={triggerType}
      />
    </div>
  );
};

export default MyNotes;
