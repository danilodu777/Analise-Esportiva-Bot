export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'basic' | 'pro' | 'premium';
  expiresAt: Date | null;
}

export interface Match {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: 'live' | 'halftime' | 'finished';
  stats: MatchStats;
}

export interface MatchStats {
  homeCorners: number;
  awayCorners: number;
  homeShots: number;
  awayShots: number;
  homeShotsOnTarget: number;
  awayShotsOnTarget: number;
  homePossession: number;
  awayPossession: number;
  homeAttacks: number;
  awayAttacks: number;
  homeDangerousAttacks: number;
  awayDangerousAttacks: number;
}

export interface Signal {
  id: string;
  matchId: string;
  type: 'corner' | 'goal' | 'shot' | 'pressure';
  prediction: string;
  probability: number;
  timestamp: Date;
  sent: boolean;
}

export interface RobotConfig {
  id: string;
  name: string;
  telegramGroupId: string;
  minProbability: number;
  enableCorners: boolean;
  enableGoals: boolean;
  enableShots: boolean;
  enablePressure: boolean;
  pressureThreshold: 'low' | 'medium' | 'high';
  minMinute: number;
  maxMinute: number;
  active: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: number; // in days
  features: string[];
  popular?: boolean;
}
