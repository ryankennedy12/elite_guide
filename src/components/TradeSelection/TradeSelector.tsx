import React, { useState } from 'react';
import { TradeCard } from './TradeCard';
import { tradeDefinitions, getTradesByStatus, TradeType } from '@/types/trade';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TradeSelectorProps {
  selectedTrade?: TradeType;
  onTradeSelect: (trade: TradeType) => void;
  allowComingSoon?: boolean;
  showTabs?: boolean;
}

export const TradeSelector: React.FC<TradeSelectorProps> = ({
  selectedTrade,
  onTradeSelect,
  allowComingSoon = false,
  showTabs = true
}) => {
  const [activeTab, setActiveTab] = useState<'available' | 'coming_soon'>('available');
  
  const liveTrades = getTradesByStatus('live');
  const q1Trades = getTradesByStatus('q1_2025');
  const q2Trades = getTradesByStatus('q2_2025');
  const comingSoonTrades = getTradesByStatus('coming_soon');
  
  const availableTrades = [...liveTrades, ...q1Trades, ...q2Trades];
  const allComingSoonTrades = [...q1Trades, ...q2Trades, ...comingSoonTrades];

  if (!showTabs) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(tradeDefinitions).map((trade) => (
            <TradeCard
              key={trade.id}
              trade={trade}
              isSelected={selectedTrade === trade.id}
              isDisabled={!allowComingSoon && trade.launchStatus !== 'live'}
              onSelect={onTradeSelect}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'available' | 'coming_soon')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available">Available Trades</TabsTrigger>
          <TabsTrigger value="coming_soon">Coming Soon</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Trade</h2>
            <p className="text-muted-foreground">
              Select the trade you need contractor vetting help with
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableTrades.map((trade) => (
              <TradeCard
                key={trade.id}
                trade={trade}
                isSelected={selectedTrade === trade.id}
                isDisabled={trade.launchStatus !== 'live'}
                onSelect={onTradeSelect}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="coming_soon" className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Coming Soon</h2>
            <p className="text-muted-foreground">
              These trades will be available throughout 2025
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allComingSoonTrades.map((trade) => (
              <TradeCard
                key={trade.id}
                trade={trade}
                isSelected={false}
                isDisabled={true}
                onSelect={() => {}}
                showSelectButton={false}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};