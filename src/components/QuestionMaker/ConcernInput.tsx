
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { hotTopics } from '@/data/questionBank';

interface ConcernInputProps {
  userConcern: string;
  setUserConcern: (concern: string) => void;
  selectedTopics: string[];
  onTopicToggle: (topicId: string) => void;
  showAllQuestions: boolean;
  setShowAllQuestions: (show: boolean) => void;
  showStarredOnly: boolean;
  setShowStarredOnly: (show: boolean) => void;
  starredCount: number;
}

const ConcernInput: React.FC<ConcernInputProps> = ({
  userConcern,
  setUserConcern,
  selectedTopics,
  onTopicToggle,
  showAllQuestions,
  setShowAllQuestions,
  showStarredOnly,
  setShowStarredOnly,
  starredCount
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What's your main concern?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="concern">Enter your specific concern</Label>
          <Input
            id="concern"
            value={userConcern}
            onChange={(e) => setUserConcern(e.target.value)}
            placeholder="e.g., mold, water intrusion, musty smell..."
            className="w-full"
          />
        </div>
        
        <div>
          <Label>Quick topics (select any that apply)</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {hotTopics.map(topic => (
              <Button
                key={topic.id}
                onClick={() => onTopicToggle(topic.id)}
                variant={selectedTopics.includes(topic.id) ? "default" : "outline"}
                size="sm"
                className={selectedTopics.includes(topic.id) ? "bg-black text-white" : ""}
              >
                {topic.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setShowAllQuestions(!showAllQuestions)}
            variant="outline"
            size="sm"
          >
            {showAllQuestions ? 'Show Filtered' : 'Show All Questions'}
          </Button>
          
          <Button
            onClick={() => setShowStarredOnly(!showStarredOnly)}
            variant="outline"
            size="sm"
            className={showStarredOnly ? "bg-yellow-500 text-black" : ""}
          >
            <Star className="w-4 h-4 mr-1" />
            {showStarredOnly ? 'Show All' : 'Starred Only'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConcernInput;
