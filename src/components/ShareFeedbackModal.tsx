
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Star, Copy, MessageSquare, Mail, Share2, Check, Heart, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: 'guide-complete' | 'pdf-download' | 'notes-submit';
}

const ShareFeedbackModal: React.FC<ShareFeedbackModalProps> = ({ isOpen, onClose, trigger }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'feedback' | 'share' | 'survey'>('feedback');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Check if user already submitted feedback this session
  useEffect(() => {
    const sessionFeedback = sessionStorage.getItem('guide_feedback_submitted');
    if (sessionFeedback === 'true') {
      setHasSubmittedFeedback(true);
      setActiveTab('share');
    }
  }, []);

  const surveyQuestions = [
    {
      question: "What's your #1 home concern right now?",
      options: ["Basement flooding", "Foundation cracks", "Mold/moisture", "Sump pump issues", "Water damage", "Other"]
    },
    {
      question: "What tool should we build next?",
      options: ["Storm alert system", "Contractor directory", "DIY repair guides", "Insurance claim helper", "Cost calculator"]
    }
  ];

  const handleRatingClick = (star: number) => {
    setRating(star);
    // Micro-animation trigger
    const starElement = document.querySelector(`[data-star="${star}"]`);
    if (starElement) {
      starElement.classList.add('animate-bounce');
      setTimeout(() => starElement.classList.remove('animate-bounce'), 300);
    }
  };

  const submitFeedback = () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Your star rating helps us improve the guide.",
        variant: "destructive"
      });
      return;
    }

    // Store feedback submission
    sessionStorage.setItem('guide_feedback_submitted', 'true');
    setHasSubmittedFeedback(true);
    
    // Show celebration
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    
    toast({
      title: "Thank you! 🎉",
      description: "Your feedback protects more homes in Columbus.",
    });

    // If 5-star rating, encourage sharing
    if (rating === 5) {
      setTimeout(() => {
        setActiveTab('share');
        toast({
          title: "Love this guide?",
          description: "Share it with a neighbor who needs it!",
        });
      }, 1500);
    }
  };

  const copyShareLink = async () => {
    const shareText = "Check out this free, no-BS guide to basement waterproofing in Columbus";
    const shareUrl = window.location.origin + '/elite-12';
    
    try {
      await navigator.clipboard.writeText(`${shareText}: ${shareUrl}`);
      toast({
        title: "Link copied! 📋",
        description: "Paste it anywhere to share with someone who needs this guide.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again or share manually.",
        variant: "destructive"
      });
    }
  };

  const shareViaSMS = () => {
    const message = "Check out this free, no-BS guide to basement waterproofing in Columbus";
    const url = window.location.origin + '/elite-12';
    window.open(`sms:?body=${encodeURIComponent(message + ': ' + url)}`, '_blank');
    toast({ title: "SMS opened! 📱", description: "Send it to someone who needs this." });
  };

  const shareViaWhatsApp = () => {
    const message = "Check out this free, no-BS guide to basement waterproofing in Columbus";
    const url = window.location.origin + '/elite-12';
    window.open(`https://wa.me/?text=${encodeURIComponent(message + ': ' + url)}`, '_blank');
    toast({ title: "WhatsApp opened! 💬", description: "Share with friends and family." });
  };

  const shareViaEmail = () => {
    const subject = "Free Basement Waterproofing Guide for Columbus";
    const body = "I found this really helpful basement waterproofing guide and thought you might find it useful too!";
    const url = window.location.origin + '/elite-12';
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + '\n\n' + url)}`, '_blank');
    toast({ title: "Email opened! ✉️", description: "Send this guide to someone who needs it." });
  };

  const handleSurveyAnswer = (answer: string) => {
    const newAnswers = [...surveyAnswers, answer];
    setSurveyAnswers(newAnswers);
    
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      setHasCompletedSurvey(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      toast({
        title: "Survey complete! 🚀",
        description: "You're helping every homeowner in Columbus!",
      });
    }
  };

  const getTriggerMessage = () => {
    switch (trigger) {
      case 'pdf-download':
        return "Your guide is downloaded!";
      case 'notes-submit':
        return "Your interview plan is ready!";
      default:
        return "Guide completed!";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-yellow-400 rounded-full absolute animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}

        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-yellow-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-black">
            Help Us Build the Best Guide for Columbus Homeowners!
          </DialogTitle>
          <p className="text-gray-600 max-w-md mx-auto">
            {getTriggerMessage()} Your feedback shapes smarter tools and helps your neighbors make better home decisions.
          </p>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-2 my-6">
          <Button
            variant={activeTab === 'feedback' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('feedback')}
            className={activeTab === 'feedback' ? 'bg-black text-white' : 'border-black text-black'}
            disabled={hasSubmittedFeedback}
          >
            <Star className="w-4 h-4 mr-2" />
            Feedback
          </Button>
          <Button
            variant={activeTab === 'share' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('share')}
            className={activeTab === 'share' ? 'bg-black text-white' : 'border-black text-black'}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant={activeTab === 'survey' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('survey')}
            className={activeTab === 'survey' ? 'bg-black text-white' : 'border-black text-black'}
            disabled={hasCompletedSurvey}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Survey
            <Badge variant="secondary" className="ml-2 text-xs">1 min</Badge>
          </Button>
        </div>

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <Card>
            <CardContent className="p-6">
              {hasSubmittedFeedback ? (
                <div className="text-center space-y-4">
                  <div className="text-4xl">✅</div>
                  <h3 className="text-xl font-bold text-black">Thank You!</h3>
                  <p className="text-gray-600">Your feedback helps make the next guide even better.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-black mb-4">
                      What did you love? What could be better?
                    </h3>
                    
                    {/* Star Rating */}
                    <div className="flex justify-center space-x-2 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          data-star={star}
                          onClick={() => handleRatingClick(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    placeholder="Share your honest thoughts, ideas, or bug reports here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[100px] border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20"
                  />

                  <Button
                    onClick={submitFeedback}
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={rating === 0}
                  >
                    Submit Feedback
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Share Tab */}
        {activeTab === 'share' && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                <h3 className="text-lg font-semibold text-black">
                  Know someone who needs this? Send it with one tap.
                </h3>
                
                <div className="space-y-4">
                  <Button
                    onClick={copyShareLink}
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      onClick={shareViaSMS}
                      variant="outline"
                      className="border-black text-black hover:bg-gray-50"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      SMS
                    </Button>
                    <Button
                      onClick={shareViaWhatsApp}
                      variant="outline"
                      className="border-black text-black hover:bg-gray-50"
                    >
                      💬 WhatsApp
                    </Button>
                    <Button
                      onClick={shareViaEmail}
                      variant="outline"
                      className="border-black text-black hover:bg-gray-50"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Survey Tab */}
        {activeTab === 'survey' && (
          <Card>
            <CardContent className="p-6">
              {hasCompletedSurvey ? (
                <div className="text-center space-y-4">
                  <div className="text-4xl">🚀</div>
                  <h3 className="text-xl font-bold text-black">Survey Complete!</h3>
                  <p className="text-gray-600">You're helping every homeowner in Columbus!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((surveyStep + 1) / surveyQuestions.length) * 100}%` }}
                    ></div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-black mb-6">
                      {surveyQuestions[surveyStep].question}
                    </h3>
                    
                    <div className="space-y-3">
                      {surveyQuestions[surveyStep].options.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleSurveyAnswer(option)}
                          variant="outline"
                          className="w-full border-black text-black hover:bg-gray-50 text-left justify-start"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Privacy Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Your feedback is private—never shared or sold. We use it only to build better tools for Columbus homeowners.
          </p>
        </div>

        {/* Dismiss Options */}
        <div className="flex justify-center space-x-4 mt-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Not Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareFeedbackModal;
