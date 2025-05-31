import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Copy, MessageSquare, Mail, Star, Check, X, Share, MessageCircle, BarChart3, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ShareReviewSurvey = () => {
  const { toast } = useToast();
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hasShared, setHasShared] = useState(false);
  const [hasCompletedReview, setHasCompletedReview] = useState(false);
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Debug function to clear localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem('ksump_reviewed');
    localStorage.removeItem('ksump_surveyed');
    localStorage.removeItem('ksump_any_action');
    setHasCompletedReview(false);
    setHasCompletedSurvey(false);
    setSurveyStep(0);
    setSurveyAnswers([]);
    setHasShared(false);
    toast({
      title: "Reset Complete",
      description: "All progress cleared. Popup will show in 45 seconds.",
    });
    console.log('LocalStorage cleared - popup should appear in 45 seconds');
  };

  // Check localStorage on component mount
  useEffect(() => {
    const reviewCompleted = localStorage.getItem('ksump_reviewed') === 'true';
    const surveyCompleted = localStorage.getItem('ksump_surveyed') === 'true';
    const anyActionCompleted = localStorage.getItem('ksump_any_action') === 'true';
    
    console.log('LocalStorage check:', {
      reviewCompleted,
      surveyCompleted,
      anyActionCompleted
    });
    
    setHasCompletedReview(reviewCompleted);
    setHasCompletedSurvey(surveyCompleted);

    // If user completed survey, restore their progress
    if (surveyCompleted) {
      setSurveyStep(3); // Set to completed state
    }
  }, []);

  // Timed popup trigger - only show if no actions completed
  useEffect(() => {
    const reviewCompleted = localStorage.getItem('ksump_reviewed') === 'true';
    const surveyCompleted = localStorage.getItem('ksump_surveyed') === 'true';
    const anyActionCompleted = localStorage.getItem('ksump_any_action') === 'true';

    console.log('Popup trigger check:', {
      reviewCompleted,
      surveyCompleted,
      anyActionCompleted,
      shouldShowPopup: !anyActionCompleted && !reviewCompleted && !surveyCompleted
    });

    // Don't show popup if any action was ever completed
    if (anyActionCompleted || reviewCompleted || surveyCompleted) {
      console.log('Popup blocked - action already completed');
      return;
    }

    console.log('Setting popup timer for 45 seconds...');
    const timer = setTimeout(() => {
      console.log('Popup timer fired - showing popup');
      setShowPopup(true);
    }, 45000); // 45 seconds

    return () => {
      console.log('Popup timer cleared');
      clearTimeout(timer);
    };
  }, []);

  // Handle popup dismiss on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (showPopup) {
        console.log('Popup dismissed by scroll');
        setShowPopup(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showPopup]);

  const markActionCompleted = () => {
    localStorage.setItem('ksump_any_action', 'true');
    setShowPopup(false); // Hide popup forever
    console.log('Action completed - popup disabled forever');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + '/elite-12');
      setHasShared(true);
      markActionCompleted();
      toast({
        title: "Link copied!",
        description: "Share it with someone who needs this guide.",
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
    const message = "Found this helpful basement waterproofing guide for Columbus homeowners - thought you might find it useful too!";
    const url = window.location.origin + '/elite-12';
    window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`, '_blank');
    setHasShared(true);
    markActionCompleted();
  };

  const shareViaSMS = () => {
    const message = "Found this helpful basement waterproofing guide for Columbus homeowners - thought you might find it useful too!";
    const url = window.location.origin + '/elite-12';
    window.open(`sms:?body=${encodeURIComponent(message + ' ' + url)}`, '_blank');
    setHasShared(true);
    markActionCompleted();
  };

  const shareViaEmail = () => {
    const subject = "Helpful Basement Guide for Columbus Homeowners";
    const body = "I found this really helpful basement waterproofing guide and thought you might find it useful too!";
    const url = window.location.origin + '/elite-12';
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + '\n\n' + url)}`, '_blank');
    setHasShared(true);
    markActionCompleted();
  };

  const submitRating = () => {
    if (rating > 0) {
      localStorage.setItem('ksump_reviewed', 'true');
      setHasCompletedReview(true);
      markActionCompleted();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      toast({
        title: "Thank you!",
        description: "Your feedback helps make the next guide even better.",
      });
    }
  };

  const surveyQuestions = [
    {
      question: "What's your #1 basement or home water concern?",
      options: ["Foundation cracks", "Basement flooding", "Mold/moisture", "Sump pump issues", "Other"]
    },
    {
      question: "How did you first find this guide?",
      options: ["Google search", "Facebook", "Friend/neighbor", "Contractor", "Other"]
    },
    {
      question: "What would you want next?",
      options: ["Free expert call", "More guides", "Storm reminders", "Local contractor list"]
    }
  ];

  const handleSurveyAnswer = (answer: string) => {
    const newAnswers = [...surveyAnswers, answer];
    setSurveyAnswers(newAnswers);
    
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      localStorage.setItem('ksump_surveyed', 'true');
      setHasCompletedSurvey(true);
      markActionCompleted();
      setSurveyStep(3); // Set to completed state
      toast({
        title: "Survey complete!",
        description: "You're helping every homeowner in Columbus!",
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setShowPopup(false);
  };

  // Don't show popup if any action was completed
  const shouldShowPopup = showPopup && !hasCompletedReview && !hasCompletedSurvey && localStorage.getItem('ksump_any_action') !== 'true';

  return (
    <div className="min-h-screen bg-white relative">
      {/* Debug Reset Button - only show in development */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={clearLocalStorage}
          variant="outline"
          size="sm"
          className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset for Testing
        </Button>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 animate-ping">
            <div className="w-2 h-2 bg-yellow-400 rounded-full absolute top-1/4 left-1/4 animate-bounce"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full absolute top-1/3 right-1/4 animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full absolute bottom-1/3 left-1/3 animate-bounce delay-200"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full absolute bottom-1/4 right-1/3 animate-bounce delay-300"></div>
          </div>
        </div>
      )}

      {/* Timed Popup */}
      {shouldShowPopup && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowPopup(false)}></div>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-yellow-400 p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-4">
                Want to make a difference?
              </h3>
              <p className="text-gray-600 mb-6">
                Share the guide, leave a rating, or take our quick survey—help another Columbus homeowner today!
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={() => scrollToSection('share-section')}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share Now
                </Button>
                {!hasCompletedReview && (
                  <Button
                    onClick={() => scrollToSection('review-section')}
                    variant="outline"
                    className="w-full border-black text-black hover:bg-gray-50"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Leave Feedback
                  </Button>
                )}
                {!hasCompletedSurvey && (
                  <Button
                    onClick={() => scrollToSection('survey-section')}
                    variant="outline"
                    className="w-full border-black text-black hover:bg-gray-50"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Take Survey
                  </Button>
                )}
                <Button
                  onClick={() => setShowPopup(false)}
                  variant="ghost"
                  className="w-full text-gray-500 hover:text-gray-700"
                >
                  No thanks
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-16">
        {/* Welcome Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            Ready to Help Another Homeowner—and Shape the Next Guide?
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Share this with a friend, give us your honest feedback, or take our 1-minute lightning survey. Every action helps build smarter tools for Columbus homeowners.
          </p>
        </div>

        {/* Share Section - Always Available */}
        <div id="share-section" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-black">Share the Guide</h2>
            <p className="text-gray-600">
              Know someone who needs this? Copy your unique link or send it by text, WhatsApp, or email.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={copyToClipboard}
              className="w-full h-14 bg-black text-white hover:bg-gray-800 text-lg font-semibold"
            >
              <Copy className="w-5 h-5 mr-3" />
              {hasShared ? "Link Copied!" : "Copy Link"}
              {hasShared && <Check className="w-5 h-5 ml-3 text-yellow-400" />}
            </Button>

            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={shareViaSMS}
                variant="outline"
                className="h-12 border-black text-black hover:bg-gray-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                SMS
              </Button>
              <Button
                onClick={shareViaWhatsApp}
                variant="outline"
                className="h-12 border-black text-black hover:bg-gray-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={shareViaEmail}
                variant="outline"
                className="h-12 border-black text-black hover:bg-gray-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          {hasShared && (
            <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-black font-medium">🏆 Good Neighbor Badge Unlocked!</p>
              <p className="text-sm text-gray-600 mt-1">You're helping build a smarter Columbus community.</p>
            </div>
          )}
        </div>

        {/* Review Section */}
        <div id="review-section" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-black">Rate Your Experience</h2>
            <p className="text-gray-600">
              How helpful was this guide? Private, never shown publicly.
            </p>
          </div>

          {hasCompletedReview ? (
            <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Already completed—thank you!</h3>
              <p className="text-gray-500">You've already shared your feedback with us.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-2 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <Textarea
                placeholder="What would make this guide even better? (optional)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500/20"
              />

              <Button
                onClick={submitRating}
                disabled={rating === 0}
                className="w-full h-12 bg-black text-white hover:bg-gray-800 disabled:opacity-50"
              >
                Submit Rating
              </Button>

              <p className="text-sm text-gray-500 text-center">
                Your feedback is never published or sold—just used to make the next guide better for Columbus homeowners.
              </p>
            </div>
          )}
        </div>

        {/* Survey Section */}
        <div id="survey-section" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-black">1-Minute Lightning Survey</h2>
            <p className="text-gray-600">
              Answer three quick questions to shape what we build next.
            </p>
          </div>

          {hasCompletedSurvey ? (
            <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Already completed—thank you!</h3>
              <p className="text-gray-500">You've already helped shape what we build next.</p>
            </div>
          ) : surveyStep < surveyQuestions.length ? (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((surveyStep + 1) / surveyQuestions.length) * 100}%` }}
                ></div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-black mb-6">
                  {surveyQuestions[surveyStep].question}
                </h3>
                
                <div className="space-y-3">
                  {surveyQuestions[surveyStep].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleSurveyAnswer(option)}
                      variant="outline"
                      className="w-full h-12 border-black text-black hover:bg-gray-50 text-left justify-start"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-black mb-2">Survey Complete!</h3>
              <p className="text-gray-600">You're helping every homeowner in Columbus!</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-100">
        <p className="text-gray-400">
          For Columbus homeowners—privacy respected, never any spam.
        </p>
      </footer>
    </div>
  );
};

export default ShareReviewSurvey;
