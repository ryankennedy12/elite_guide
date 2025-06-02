
export interface Note {
  id: string;
  content: string;
  type: 'custom-question' | 'contractor-response' | 'personal-observation' | 'action-item';
  contractorName?: string;
  timestamp: Date;
  followUpNotes?: string[];
}

export interface NotesData {
  notes: Note[];
  generatedQuestions?: string[];
  contractors: string[];
}

export const noteTypeLabels = {
  'custom-question': 'Custom Question',
  'contractor-response': 'Contractor Response', 
  'personal-observation': 'Personal Observation',
  'action-item': 'Action Item / To-Do'
};

export const noteTypeColors = {
  'custom-question': 'bg-blue-100 text-blue-800 border-blue-200',
  'contractor-response': 'bg-green-100 text-green-800 border-green-200',
  'personal-observation': 'bg-purple-100 text-purple-800 border-purple-200',
  'action-item': 'bg-orange-100 text-orange-800 border-orange-200'
};
