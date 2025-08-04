import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Send, Lightbulb, Bug, ThumbsUp, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface FeedbackCenterProps {
  onFeedbackSubmitted: () => void;
}

interface SurveyQuestion {
  id: string;
  question: string;
  options: string[];
  type: 'multiple-choice' | 'rating' | 'text';
}

export const FeedbackCenter = ({ onFeedbackSubmitted }: FeedbackCenterProps) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState<string>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({});
  const [showSurvey, setShowSurvey] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', icon: ThumbsUp, description: 'Overall thoughts and suggestions' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, description: 'Ideas for new tools or improvements' },
    { id: 'bug', label: 'Bug Report', icon: Bug, description: 'Something not working correctly' },
    { id: 'improvement', label: 'Improvement Idea', icon: ArrowRight, description: 'Ways to make existing features better' }
  ];

  const surveyQuestions: SurveyQuestion[] = [
    {
      id: 'discovery',
      question: 'How did you first discover our platform?',
      options: ['Google search', 'Social media', 'Friend referral', 'Local community', 'Other'],
      type: 'multiple-choice'
    },
    {
      id: 'primary_use',
      question: 'What do you primarily use our platform for?',
      options: ['Finding contractors', 'Preparing questions', 'Managing projects', 'Learning about home improvement', 'All of the above'],
      type: 'multiple-choice'
    },
    {
      id: 'satisfaction',
      question: 'How satisfied are you with our platform overall?',
      options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very dissatisfied'],
      type: 'multiple-choice'
    },
    {
      id: 'recommendation',
      question: 'How likely are you to recommend us to other Columbus homeowners?',
      options: ['10 - Extremely likely', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0 - Not at all likely'],
      type: 'rating'
    },
    {
      id: 'missing_features',
      question: 'What features or tools would you like to see added?',
      options: [],
      type: 'text'
    }
  ];

  const handleSubmitFeedback = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to submit feedback.",
        variant: "destructive"
      });
      return;
    }

    if (!feedbackText.trim()) {
      toast({
        title: "Feedback required",
        description: "Please write your feedback before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          user_id: user.id,
          rating: 5, // Default rating for feedback
          feedback_text: JSON.stringify({
            text: feedbackText,
            type: feedbackType,
            timestamp: new Date().toISOString()
          })
        });

      if (error) throw error;

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });

      toast({
        title: "Feedback submitted!",
        description: "Thank you for helping us improve!",
      });

      setFeedbackText('');
      setFeedbackType('general');
      onFeedbackSubmitted();

      // Show survey opportunity
      setShowSurvey(true);

      // Analytics tracking
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'feedback_submitted', {
          feedback_type: feedbackType,
          user_id: user.id
        });
      }

    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error submitting feedback",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSurveyAnswer = async (answer: string) => {
    const currentQuestion = surveyQuestions[currentSurveyIndex];
    const newAnswers = { ...surveyAnswers, [currentQuestion.id]: answer };
    setSurveyAnswers(newAnswers);

    // Save answer to database
    if (user) {
      try {
        await supabase
          .from('survey_responses')
          .insert({
            user_id: user.id,
            question: currentQuestion.question,
            answer: answer
          });
      } catch (error) {
        console.error('Error saving survey answer:', error);
      }
    }

    // Move to next question or complete survey
    if (currentSurveyIndex < surveyQuestions.length - 1) {
      setCurrentSurveyIndex(prev => prev + 1);
    } else {
      // Survey completed
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast({
        title: "Survey completed!",
        description: "Thank you for your valuable insights!",
      });

      setShowSurvey(false);
      setCurrentSurveyIndex(0);
      setSurveyAnswers({});
      onFeedbackSubmitted();

      // Analytics tracking
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'survey_completed', {
          user_id: user?.id,
          questions_answered: Object.keys(newAnswers).length
        });
      }
    }
  };

  const currentQuestion = surveyQuestions[currentSurveyIndex];
  const surveyProgress = ((currentSurveyIndex + 1) / surveyQuestions.length) * 100;

  if (showSurvey) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-blue-500" />
              Quick Survey ({currentSurveyIndex + 1} of {surveyQuestions.length})
            </CardTitle>
            <CardDescription>
              Help us understand how to better serve Columbus homeowners
            </CardDescription>
            <Progress value={surveyProgress} className="mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
              
              {currentQuestion.type === 'multiple-choice' && (
                <div className="space-y-2">
                  {currentQuestion.options.map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-4"
                      onClick={() => handleSurveyAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'rating' && (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  {currentQuestion.options.map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      className="h-16 text-center"
                      onClick={() => handleSurveyAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'text' && (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Share your ideas..."
                    value={surveyAnswers[currentQuestion.id] || ''}
                    onChange={(e) => setSurveyAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                  />
                  <Button
                    onClick={() => handleSurveyAnswer(surveyAnswers[currentQuestion.id] || '')}
                    disabled={!surveyAnswers[currentQuestion.id]?.trim()}
                  >
                    Continue
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => setShowSurvey(false)}
              className="w-full"
            >
              Skip Survey
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Feedback Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-green-500" />
            Share Your Feedback
          </CardTitle>
          <CardDescription>
            Help us improve by sharing your thoughts, ideas, and experiences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">What type of feedback do you have?</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {feedbackTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all ${
                      feedbackType === type.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-muted-foreground/50'
                    }`}
                    onClick={() => setFeedbackType(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <IconComponent className={`w-5 h-5 mt-1 ${
                          feedbackType === type.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <div>
                          <h4 className="font-medium">{type.label}</h4>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <Label htmlFor="feedback-text" className="text-base font-medium">
              Your Feedback
            </Label>
            <Textarea
              id="feedback-text"
              placeholder="Tell us what's on your mind. We read every piece of feedback!"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          </div>

          <Button 
            onClick={handleSubmitFeedback} 
            disabled={isSubmitting || !feedbackText.trim()}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>Submitting...</>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Feature Voting */}
      <Card>
        <CardHeader>
          <CardTitle>Vote on Future Features</CardTitle>
          <CardDescription>
            Help us prioritize what to build next for Columbus homeowners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { feature: 'Contractor Reviews Database', votes: 45 },
              { feature: 'Project Cost Calculator', votes: 38 },
              { feature: 'Local Permit Guide', votes: 32 },
              { feature: 'Seasonal Maintenance Reminders', votes: 29 },
              { feature: 'Neighborhood Project Map', votes: 24 }
            ].map((item, index) => (
              <div key={item.feature} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{item.feature}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{item.votes} votes</Badge>
                  <Button size="sm" variant="outline" disabled>
                    Vote
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Feature voting coming soon! For now, share your ideas in the feedback above.
          </div>
        </CardContent>
      </Card>

      {/* Micro Surveys */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">Ready for a Quick Survey?</h3>
            <p className="text-muted-foreground mb-4">
              Share your thoughts in our 2-minute survey and help shape the future of our platform
            </p>
            <Button onClick={() => setShowSurvey(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Survey
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};