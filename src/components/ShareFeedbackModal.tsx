
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Star, Copy, MessageSquare, Mail, Share, MessageCircle, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ShareFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareFeedbackModal: React.FC<ShareFeedbackModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);
  const [hasShared, setHasShared] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const surveyQuestions = [
    {
      question: "What's your #1 home concern?",
      options: ["Foundation cracks", "Basement flooding", "Mold/moisture", "Sump pump issues", "Other"]
    },
    {
      question: "What tool should we build next?",
      options: ["Cost calculator", "Contractor finder", "Emergency checklist", "Home inspection guide"]
    }
  ];

  useEffect(() => {
    // Check if user already submitted feedback this session
    const feedbackSubmitted = sessionStorage.getItem('feedback_submitted');
    if (feedbackSubmitted === 'true') {
      setHasSubmittedFeedback(true);
    }
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleFeedbackSubmit = async () => {
    if (rating > 0 && !isSubmittingFeedback) {
      setIsSubmittingFeedback(true);
      
      try {
        // Save feedback to Supabase
        const { error } = await supabase
          .from('feedback')
          .insert({
            rating: rating,
            feedback_text: feedback.trim() || null,
            user_id: (await supabase.auth.getUser()).data.user?.id || null
          });

        if (error) {
          console.error('Error saving feedback:', error);
          toast({
            title: "Error",
            description: "There was an issue saving your feedback. Please try again.",
            variant: "destructive",
          });
          setIsSubmittingFeedback(false);
          return;
        }

        sessionStorage.setItem('feedback_submitted', 'true');
        setHasSubmittedFeedback(true);
        triggerConfetti();
        
        toast({
          title: "Thank you!",
          description: "Your feedback protects more homes in Columbus.",
          duration: 3000,
        });

        // Track analytics if available
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', 'feedback_submitted', {
            rating: rating,
            has_text_feedback: feedback.length > 0
          });
        }
        
      } catch (error) {
        console.error('Unexpected error saving feedback:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmittingFeedback(false);
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + '/elite-12');
      setHasShared(true);
      triggerConfetti();
      toast({
        title: "Link copied!",
        description: "Share it with someone who needs this guide.",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again or share manually.",
        variant: "destructive"
      });
    }
  };

  const shareViaWhatsApp = () => {
    const message = "Check out this free, no-BS guide to basement waterproofing in Columbus";
    const url = window.location.origin + '/elite-12';
    window.open(`https://wa.me/?text=${encodeURIComponent(message + ': ' + url)}`, '_blank');
    setHasShared(true);
    triggerConfetti();
  };

  const shareViaSMS = () => {
    const message = "Check out this free, no-BS guide to basement waterproofing in Columbus";
    const url = window.location.origin + '/elite-12';
    window.open(`sms:?body=${encodeURIComponent(message + ': ' + url)}`, '_blank');
    setHasShared(true);
    triggerConfetti();
  };

  const shareViaEmail = () => {
    const subject = "Helpful Basement Guide for Columbus Homeowners";
    const body = "Check out this free, no-BS guide to basement waterproofing in Columbus";
    const url = window.location.origin + '/elite-12';
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + ': ' + url)}`, '_blank');
    setHasShared(true);
    triggerConfetti();
  };

  const handleSurveyAnswer = async (answer: string) => {
    const currentQuestion = surveyQuestions[surveyStep].question;
    
    try {
      // Save survey response to Supabase
      await supabase
        .from('survey_responses')
        .insert({
          question: currentQuestion,
          answer: answer,
          user_id: (await supabase.auth.getUser()).data.user?.id || null
        });
    } catch (error) {
      console.error('Error saving survey response:', error);
      // Continue with the survey even if saving fails
    }

    const newAnswers = [...surveyAnswers, answer];
    setSurveyAnswers(newAnswers);
    
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      triggerConfetti();
      toast({
        title: "Survey complete!",
        description: "You're helping every homeowner in Columbus!",
        duration: 3000,
      });
      setShowSurvey(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="animate-ping">
            <div className="w-2 h-2 bg-yellow-400 rounded-full absolute top-1/4 left-1/4 animate-bounce"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full absolute top-1/3 right-1/4 animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full absolute bottom-1/3 left-1/3 animate-bounce delay-200"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full absolute bottom-1/4 right-1/3 animate-bounce delay-300"></div>
          </div>
        </div>
      )}

      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Help Us Build the Best Guide for Columbus Homeowners!
          </h2>
          <p className="text-gray-600 text-lg">
            Your feedback shapes smarter tools and helps your neighbors make better home decisions.
          </p>
        </div>

        <div className="space-y-8">
          {/* Feedback Section */}
          {!hasSubmittedFeedback ? (
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-5 h-5 text-yellow-500" />
                <h3 className="text-xl font-semibold text-black">Rate & Share Feedback</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      disabled={isSubmittingFeedback}
                      className="p-1 hover:scale-110 transition-transform disabled:opacity-50"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <Textarea
                  placeholder="What did you love? What could be better?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  disabled={isSubmittingFeedback}
                  className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20"
                />

                <Button
                  onClick={handleFeedbackSubmit}
                  disabled={rating === 0 || isSubmittingFeedback}
                  className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  {isSubmittingFeedback ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="border border-green-200 bg-green-50 rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Thank you for your feedback!</h3>
              <p className="text-green-600">Know someone who needs this? Share it below!</p>
            </div>
          )}

          {/* Share Section */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Share className="w-5 h-5 text-blue-500" />
              <h3 className="text-xl font-semibold text-black">Quick Share</h3>
            </div>
            
            <p className="text-gray-600 mb-4">Know someone who needs this? Send it with one tap.</p>
            
            <div className="space-y-3">
              <Button
                onClick={copyToClipboard}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                <Copy className="w-4 h-4 mr-2" />
                {hasShared ? "Link Copied!" : "Copy Link"}
              </Button>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={shareViaSMS}
                  variant="outline"
                  className="border-gray-300 text-black hover:bg-gray-50"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  SMS
                </Button>
                <Button
                  onClick={shareViaWhatsApp}
                  variant="outline"
                  className="border-gray-300 text-black hover:bg-gray-50"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  WhatsApp
                </Button>
                <Button
                  onClick={shareViaEmail}
                  variant="outline"
                  className="border-gray-300 text-black hover:bg-gray-50"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
              </div>
            </div>
          </div>

          {/* Survey Section */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-purple-500" />
              <h3 className="text-xl font-semibold text-black">1-Minute Lightning Survey</h3>
            </div>
            
            {!showSurvey ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Help us build smarter tools for you!</p>
                <Button
                  onClick={() => setShowSurvey(true)}
                  variant="outline"
                  className="border-black text-black hover:bg-gray-50"
                >
                  Take Quick Survey
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((surveyStep + 1) / surveyQuestions.length) * 100}%` }}
                  ></div>
                </div>

                <div>
                  <h4 className="font-semibold text-black mb-3">
                    {surveyQuestions[surveyStep].question}
                  </h4>
                  
                  <div className="space-y-2">
                    {surveyQuestions[surveyStep].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleSurveyAnswer(option)}
                        variant="outline"
                        className="w-full border-gray-300 text-black hover:bg-gray-50 justify-start"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Your feedback is private—never shared or sold.
        </p>

        {/* Dismiss Button */}
        <div className="text-center mt-6">
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
          >
            Not Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareFeedbackModal;
