
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { questionCategories, type QuestionCategory } from '@/data/questionBank';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: QuestionCategory[];
  onCategoryToggle: (category: QuestionCategory) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  onCategoryToggle
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        <div>
          <Label>Filter by category</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {questionCategories.map(category => (
              <Button
                key={category}
                onClick={() => onCategoryToggle(category)}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                size="sm"
                className={selectedCategories.includes(category) ? "bg-black text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
