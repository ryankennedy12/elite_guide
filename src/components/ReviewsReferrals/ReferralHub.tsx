import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Share2, Mail, MessageCircle, QrCode, Copy, CheckCircle, Gift } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface ReferralHubProps {
  onReferralSent: () => void;
}

export const ReferralHub = ({ onReferralSent }: ReferralHubProps) => {
  const [referralEmail, setReferralEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const baseUrl = window.location.origin;
  const referralLink = user ? `${baseUrl}?ref=${user.id}` : baseUrl;

  const defaultMessage = `Hey! I found this amazing resource for Columbus homeowners that's helped me with my home projects. It has tools for vetting contractors, creating custom questions, and managing projects. Thought you might find it useful too!`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.8 }
      });
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
      });

      // Analytics tracking
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'referral_link_copied', {
          user_id: user?.id
        });
      }
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please manually copy the link",
        variant: "destructive"
      });
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent("Check out this Columbus homeowner resource!");
    const body = encodeURIComponent(`${personalMessage || defaultMessage}\n\n${referralLink}`);
    const mailtoLink = `mailto:${referralEmail}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
    
    toast({
      title: "Email opened!",
      description: "Your email client should open with the referral message",
    });

    // Track sharing
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'referral_email_shared', {
        user_id: user?.id
      });
    }
    
    onReferralSent();
  };

  const shareViaSMS = () => {
    const message = encodeURIComponent(`${personalMessage || defaultMessage} ${referralLink}`);
    const smsLink = `sms:?body=${message}`;
    
    window.open(smsLink, '_blank');
    
    toast({
      title: "SMS opened!",
      description: "Your messaging app should open with the referral message",
    });

    // Track sharing
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'referral_sms_shared', {
        user_id: user?.id
      });
    }
    
    onReferralSent();
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(`${personalMessage || defaultMessage} ${referralLink}`);
    const whatsappLink = `https://wa.me/?text=${message}`;
    
    window.open(whatsappLink, '_blank');
    
    toast({
      title: "WhatsApp opened!",
      description: "Share with your contacts on WhatsApp",
    });

    // Track sharing
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'referral_whatsapp_shared', {
        user_id: user?.id
      });
    }
    
    onReferralSent();
  };

  const shareViaFacebook = () => {
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    
    window.open(facebookLink, '_blank', 'width=600,height=400');
    
    toast({
      title: "Facebook opened!",
      description: "Share with your Facebook network",
    });

    // Track sharing
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'referral_facebook_shared', {
        user_id: user?.id
      });
    }
    
    onReferralSent();
  };

  const shareViaLinkedIn = () => {
    const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
    
    window.open(linkedinLink, '_blank', 'width=600,height=400');
    
    toast({
      title: "LinkedIn opened!",
      description: "Share with your professional network",
    });

    // Track sharing
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'referral_linkedin_shared', {
        user_id: user?.id
      });
    }
    
    onReferralSent();
  };

  const generateQRCode = () => {
    // Future enhancement: Generate QR code for offline sharing
    toast({
      title: "QR Code coming soon!",
      description: "This feature will be available for offline sharing at community events",
    });
  };

  return (
    <div className="space-y-6">
      {/* Referral Rewards Banner */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Gift className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="font-bold text-lg">Referral Rewards Program</h3>
              <p className="text-muted-foreground">
                Earn points for every successful referral! Get early access to new features and special recognition.
              </p>
            </div>
            <Badge variant="secondary" className="ml-auto">Coming Soon</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Personal Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-6 w-6 text-blue-500" />
            Your Personal Referral Link
          </CardTitle>
          <CardDescription>
            Share this link to help other Columbus homeowners and track your referrals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="flex-1 font-mono text-sm"
            />
            <Button onClick={() => copyToClipboard(referralLink)} size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
            💡 <strong>Tip:</strong> When someone signs up using your link, both of you will earn community points!
          </div>
        </CardContent>
      </Card>

      {/* Customize Your Message */}
      <Card>
        <CardHeader>
          <CardTitle>Customize Your Referral Message</CardTitle>
          <CardDescription>
            Personalize the message that goes with your referral link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="personal-message">Your Personal Message</Label>
            <Textarea
              id="personal-message"
              placeholder={defaultMessage}
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
              className="mt-2"
            />
          </div>
          
          <div className="text-xs text-muted-foreground">
            Leave blank to use our default message, or write your own to make it more personal!
          </div>
        </CardContent>
      </Card>

      {/* Quick Share Options */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Share Options</CardTitle>
          <CardDescription>
            Choose your preferred method to share with friends and neighbors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button onClick={shareViaEmail} variant="outline" className="flex-col h-20 gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-xs">Email</span>
            </Button>
            
            <Button onClick={shareViaSMS} variant="outline" className="flex-col h-20 gap-2">
              <MessageCircle className="h-6 w-6" />
              <span className="text-xs">SMS</span>
            </Button>
            
            <Button onClick={shareViaWhatsApp} variant="outline" className="flex-col h-20 gap-2 bg-green-50 hover:bg-green-100">
              <MessageCircle className="h-6 w-6 text-green-600" />
              <span className="text-xs">WhatsApp</span>
            </Button>
            
            <Button onClick={shareViaFacebook} variant="outline" className="flex-col h-20 gap-2 bg-blue-50 hover:bg-blue-100">
              <Share2 className="h-6 w-6 text-blue-600" />
              <span className="text-xs">Facebook</span>
            </Button>
            
            <Button onClick={shareViaLinkedIn} variant="outline" className="flex-col h-20 gap-2 bg-blue-50 hover:bg-blue-100">
              <Share2 className="h-6 w-6 text-blue-700" />
              <span className="text-xs">LinkedIn</span>
            </Button>
            
            <Button onClick={generateQRCode} variant="outline" className="flex-col h-20 gap-2" disabled>
              <QrCode className="h-6 w-6" />
              <span className="text-xs">QR Code</span>
            </Button>
            
            <Button onClick={() => copyToClipboard(referralLink)} variant="outline" className="flex-col h-20 gap-2">
              <Copy className="h-6 w-6" />
              <span className="text-xs">Copy Link</span>
            </Button>
            
            <Button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Columbus Homeowner Resource',
                    text: personalMessage || defaultMessage,
                    url: referralLink
                  });
                } else {
                  copyToClipboard(`${personalMessage || defaultMessage} ${referralLink}`);
                }
              }}
              variant="outline" 
              className="flex-col h-20 gap-2"
            >
              <Share2 className="h-6 w-6" />
              <span className="text-xs">Share</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email-Specific Sharing */}
      <Card>
        <CardHeader>
          <CardTitle>Send Direct Email Referral</CardTitle>
          <CardDescription>
            Send a personalized referral email to a specific person
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="referral-email">Friend's Email Address</Label>
            <Input
              id="referral-email"
              type="email"
              placeholder="friend@example.com"
              value={referralEmail}
              onChange={(e) => setReferralEmail(e.target.value)}
              className="mt-2"
            />
          </div>
          
          <Button 
            onClick={shareViaEmail} 
            disabled={!referralEmail.trim()}
            className="w-full"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Email Referral
          </Button>
        </CardContent>
      </Card>

      {/* Local Community Focus */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏠 Columbus Community
          </CardTitle>
          <CardDescription>
            Special ways to share with your local Columbus neighbors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" disabled>
              📱 Share on Nextdoor (Coming Soon)
            </Button>
            <Button variant="outline" className="w-full justify-start" disabled>
              🏘️ Columbus Facebook Groups (Coming Soon)
            </Button>
            <Button variant="outline" className="w-full justify-start" disabled>
              📋 Print Flyer for Community Boards (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};