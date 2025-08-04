// Trade types and constants
export const tradeTypes = [
  'waterproofing',
  'hvac',
  'roofing', 
  'electrical',
  'plumbing',
  'general_contractor',
  'flooring',
  'painting',
  'landscaping',
  'windows_doors'
] as const;

export type TradeType = typeof tradeTypes[number];

export interface TradeInfo {
  id: TradeType;
  name: string;
  description: string;
  icon: string;
  category: 'essential' | 'specialty' | 'coming_soon';
  launchStatus: 'live' | 'q1_2025' | 'q2_2025' | 'coming_soon';
  color: string;
}

export const tradeDefinitions: Record<TradeType, TradeInfo> = {
  waterproofing: {
    id: 'waterproofing',
    name: 'Waterproofing',
    description: 'Basement waterproofing, foundation repair, moisture control',
    icon: 'droplets',
    category: 'essential',
    launchStatus: 'live',
    color: 'blue'
  },
  hvac: {
    id: 'hvac',
    name: 'HVAC',
    description: 'Heating, ventilation, air conditioning systems',
    icon: 'wind',
    category: 'essential',
    launchStatus: 'q1_2025',
    color: 'green'
  },
  roofing: {
    id: 'roofing',
    name: 'Roofing',
    description: 'Roof repair, replacement, gutters, shingles',
    icon: 'home',
    category: 'essential',
    launchStatus: 'q1_2025',
    color: 'orange'
  },
  electrical: {
    id: 'electrical',
    name: 'Electrical',
    description: 'Wiring, panels, outlets, lighting, electrical safety',
    icon: 'zap',
    category: 'essential',
    launchStatus: 'q2_2025',
    color: 'yellow'
  },
  plumbing: {
    id: 'plumbing',
    name: 'Plumbing',
    description: 'Pipes, fixtures, water heaters, drain cleaning',
    icon: 'wrench',
    category: 'essential',
    launchStatus: 'q2_2025',
    color: 'purple'
  },
  general_contractor: {
    id: 'general_contractor',
    name: 'General Contractor',
    description: 'Full home renovations, additions, project management',
    icon: 'hammer',
    category: 'essential',
    launchStatus: 'q2_2025',
    color: 'red'
  },
  flooring: {
    id: 'flooring',
    name: 'Flooring',
    description: 'Hardwood, tile, carpet, laminate installation',
    icon: 'square',
    category: 'specialty',
    launchStatus: 'coming_soon',
    color: 'brown'
  },
  painting: {
    id: 'painting',
    name: 'Painting',
    description: 'Interior, exterior painting, drywall, finishing',
    icon: 'palette',
    category: 'specialty',
    launchStatus: 'coming_soon',
    color: 'pink'
  },
  landscaping: {
    id: 'landscaping',
    name: 'Landscaping',
    description: 'Lawn care, irrigation, hardscaping, garden design',
    icon: 'leaf',
    category: 'specialty',
    launchStatus: 'coming_soon',
    color: 'green'
  },
  windows_doors: {
    id: 'windows_doors',
    name: 'Windows & Doors',
    description: 'Window replacement, door installation, weatherproofing',
    icon: 'door-open',
    category: 'specialty',
    launchStatus: 'coming_soon',
    color: 'gray'
  }
};

export const getTradesByCategory = (category: TradeInfo['category']) => {
  return Object.values(tradeDefinitions).filter(trade => trade.category === category);
};

export const getTradesByStatus = (status: TradeInfo['launchStatus']) => {
  return Object.values(tradeDefinitions).filter(trade => trade.launchStatus === status);
};

export const getLiveTrades = () => getTradesByStatus('live');
export const getComingSoonTrades = () => Object.values(tradeDefinitions).filter(
  trade => trade.launchStatus !== 'live'
);