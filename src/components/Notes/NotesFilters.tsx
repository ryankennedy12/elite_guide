
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { noteTypeLabels } from '@/types/notes';

interface NotesFiltersProps {
  selectedType: string;
  selectedContractor: string;
  contractors: string[];
  onTypeChange: (type: string) => void;
  onContractorChange: (contractor: string) => void;
  totalNotes: number;
  filteredCount: number;
}

const NotesFilters: React.FC<NotesFiltersProps> = ({
  selectedType,
  selectedContractor,
  contractors,
  onTypeChange,
  onContractorChange,
  totalNotes,
  filteredCount
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Filter & Organize</h3>
        <Badge variant="outline">
          {filteredCount} of {totalNotes} notes
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Note Type</Label>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(noteTypeLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-sm font-medium">Contractor</Label>
          <Select value={selectedContractor} onValueChange={onContractorChange}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All contractors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Contractors</SelectItem>
              {contractors.map((contractor) => (
                <SelectItem key={contractor} value={contractor}>
                  {contractor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default NotesFilters;
