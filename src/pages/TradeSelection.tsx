import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { TradeSelector } from '@/components/TradeSelection';
import { useTradeSelection } from '@/hooks/useTradeSelection';
import { TradeType } from '@/types/trade';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const TradeSelection: React.FC = () => {
  const navigate = useNavigate();
  const { selectedTrade, updatePrimaryTrade, loading } = useTradeSelection();

  const handleTradeSelect = async (trade: TradeType) => {
    await updatePrimaryTrade(trade);
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading your preferences...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Select Your Trade
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the type of contractor work you need help vetting. 
              You can always change this later or add more trades.
            </p>
          </div>

          {/* Trade Selector */}
          <div className="mb-8">
            <TradeSelector
              selectedTrade={selectedTrade}
              onTradeSelect={handleTradeSelect}
              allowComingSoon={false}
              showTabs={true}
            />
          </div>

          {/* Continue Button */}
          {selectedTrade && (
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Ready to Continue</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  You've selected <strong>{selectedTrade}</strong> as your primary trade.
                  Access specialized tools and questions for this trade.
                </p>
                <Button 
                  onClick={handleContinue}
                  size="lg"
                  className="w-full"
                >
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};