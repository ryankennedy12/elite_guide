import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Droplets, Wind, Home, Zap, Wrench, Hammer, 
  Square, Palette, Leaf, DoorOpen 
} from 'lucide-react';
import { TradeInfo } from '@/types/trade';
import { cn } from '@/lib/utils';

interface TradeCardProps {
  trade: TradeInfo;
  isSelected?: boolean;
  isDisabled?: boolean;
  onSelect?: (tradeId: string) => void;
  showSelectButton?: boolean;
}

const iconMap = {
  droplets: Droplets,
  wind: Wind,
  home: Home,
  zap: Zap,
  wrench: Wrench,
  hammer: Hammer,
  square: Square,
  palette: Palette,
  leaf: Leaf,
  'door-open': DoorOpen,
};

const statusLabels = {
  live: 'Available Now',
  q1_2025: 'Q1 2025',
  q2_2025: 'Q2 2025',
  coming_soon: 'Coming Soon'
};

const statusColors = {
  live: 'bg-green-100 text-green-700 border-green-200',
  q1_2025: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  q2_2025: 'bg-orange-100 text-orange-700 border-orange-200',
  coming_soon: 'bg-muted text-muted-foreground border-border'
};

export const TradeCard: React.FC<TradeCardProps> = ({
  trade,
  isSelected = false,
  isDisabled = false,
  onSelect,
  showSelectButton = true
}) => {
  const IconComponent = iconMap[trade.icon as keyof typeof iconMap] || Home;
  const isLive = trade.launchStatus === 'live';

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-primary",
        isDisabled && "opacity-50 cursor-not-allowed",
        !isDisabled && "cursor-pointer hover:shadow-lg"
      )}
      onClick={() => !isDisabled && onSelect?.(trade.id)}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-3 rounded-lg flex items-center justify-center",
            isLive ? "bg-primary/10" : "bg-muted"
          )}>
            <IconComponent className={cn(
              "h-6 w-6",
              isLive ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{trade.name}</h3>
              <Badge 
                variant="outline" 
                className={cn("text-xs", statusColors[trade.launchStatus])}
              >
                {statusLabels[trade.launchStatus]}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {trade.description}
            </p>
            
            {showSelectButton && (
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                disabled={isDisabled}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect?.(trade.id);
                }}
                className="w-full"
              >
                {isSelected ? 'Selected' : isLive ? 'Select Trade' : 'Coming Soon'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};