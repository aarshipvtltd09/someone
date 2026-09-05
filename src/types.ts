export type PageId = 1 | 2 | 3 | 4 | 5 | 6;

export interface StarTrait {
  id: string;
  word: string;
  angle: number;
  distance: number;
  size: number;
  glowColor: string;
  message: string;
}

export interface ConstellationStage {
  id: 'heart' | 'butterfly' | 'moon' | 'crown' | 'letters';
  name: string;
  icon: string;
  hint: string;
  points: { x: number; y: number; label?: string }[];
  connections: [number, number][];
}

export interface BookQuality {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  symbol: string;
  quote: string;
  illustrationType: 'heart' | 'hands' | 'smile' | 'crystal' | 'soul' | 'lamp' | 'aura';
}

export interface BirthdayWish {
  text: string;
  timestamp: string;
  id: string;
}
