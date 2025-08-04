import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Star, Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface ReviewSectionProps {
  onReviewSubmitted: () => void;
}

interface CategoryRating {
  category: string;
  label: string;
  rating: number;
  description: string;
}

export const ReviewSection = ({ onReviewSubmitted }: ReviewSectionProps) => {
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>('overall');
  const [categoryRatings, setCategoryRatings] = useState<CategoryRating[]>([
    { category: 'helpfulness', label: 'Helpfulness', rating: 5, description: 'How helpful was this tool?' },
    { category: 'accuracy', label: 'Accuracy', rating: 5, description: 'How accurate was the information?' },
    { category: 'usability', label: 'Ease of Use', rating: 5, description: 'How easy was it to use?' },
    { category: 'completeness', label: 'Completeness', rating: 5, description: 'How complete was the content?' }
  ]);

  const { user } = useAuth();
  const { toast } = useToast();

  const tools = [
    { id: 'overall', label: 'Overall Experience', description: 'Rate your overall experience with our platform' },
    { id: 'elite12', label: 'Elite 12 Questions', description: 'The essential contractor questions tool' },
    { id: 'question-maker', label: 'Question Maker', description: 'The custom question generation wizard' },
    { id: 'project-tracker', label: 'Project Tracker', description: 'Project management and milestone tracking' },
    { id: 'contractor-comparison', label: 'Contractor Comparison', description: 'Side-by-side contractor analysis' },
    { id: 'prep-checklist', label: 'Prep Checklist', description: 'Pre-meeting preparation guide' },
    { id: 'cheat-sheet', label: 'Cheat Sheet', description: 'Quick reference guides and tips' }
  ];

  const handleRatingChange = (categoryIndex: number, rating: number) => {
    setCategoryRatings(prev => 
      prev.map((cat, index) => 
        index === categoryIndex ? { ...cat, rating } : cat
      )
    );
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to submit a review.",
        variant: "destructive"
      });
      return;
    }

    if (!reviewText.trim()) {
      toast({
        title: "Review required",
        description: "Please write a review before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate overall rating
      const overallRating = Math.round(
        categoryRatings.reduce((sum, cat) => sum + cat.rating, 0) / categoryRatings.length
      );

      // Save review to feedback table
      const { error } = await supabase
        .from('feedback')
        .insert({
          user_id: user.id,
          rating: overallRating,
          feedback_text: JSON.stringify({
            text: reviewText,
            tool: selectedTool,
            categoryRatings: categoryRatings.reduce((acc, cat) => {
              acc[cat.category] = cat.rating;
              return acc;
            }, {} as Record<string, number>)
          })
        });

      if (error) throw error;

      // Success animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast({
        title: "Review submitted!",
        description: "Thank you for helping the Columbus homeowner community!",
      });

      // Reset form
      setReviewText('');
      setSelectedTool('overall');
      setCategoryRatings(prev => prev.map(cat => ({ ...cat, rating: 5 })));
      
      onReviewSubmitted();

      // Analytics tracking
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'review_submitted', {
          tool: selectedTool,
          rating: overallRating,
          user_id: user.id
        });
      }

    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error submitting review",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, onRatingChange, size = 'h-6 w-6' }: { 
    rating: number; 
    onRatingChange: (rating: number) => void;
    size?: string;
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="focus:outline-none focus:ring-2 focus:ring-primary rounded transition-colors"
        >
          <Star
            className={`${size} transition-colors ${
              star <= rating 
                ? 'text-amber-400 fill-amber-400' 
                : 'text-muted-foreground hover:text-amber-300'
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-6 w-6 text-amber-500" />
            Share Your Experience
          </CardTitle>
          <CardDescription>
            Help other Columbus homeowners by sharing your honest experience with our tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tool Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Which tool would you like to review?</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tools.map((tool) => (
                <Card
                  key={tool.id}
                  className={`cursor-pointer transition-all ${
                    selectedTool === tool.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-muted-foreground/50'
                  }`}
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                        selectedTool === tool.id 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                      }`} />
                      <div>
                        <h4 className="font-medium">{tool.label}</h4>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Category Ratings */}
          <div>
            <Label className="text-base font-medium mb-4 block">Rate Different Aspects</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryRatings.map((category, index) => (
                <Card key={category.category} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{category.label}</h4>
                      <Badge variant="outline">{category.rating}/5</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                    <StarRating
                      rating={category.rating}
                      onRatingChange={(rating) => handleRatingChange(index, rating)}
                      size="h-5 w-5"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Written Review */}
          <div>
            <Label htmlFor="review-text" className="text-base font-medium">
              Tell us about your experience
            </Label>
            <Textarea
              id="review-text"
              placeholder="What did you like? How did it help with your project? Any suggestions for improvement?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          </div>

          {/* Photo/Video Upload (Future Enhancement) */}
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Photo/video reviews coming soon! For now, describe your experience above.
              </p>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmitReview} 
            disabled={isSubmitting || !reviewText.trim()}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>Submitting...</>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};