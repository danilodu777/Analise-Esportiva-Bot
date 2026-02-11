import axios from 'axios';
import { Match } from './types';

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

export const httpClient = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  timeout: 15000,
  headers: {
    'x-apisports-key': API_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io'
  }
});

export const getLiveMatches = async (): Promise<Match[]> => {
  try {
    const response = await httpClient.get('/fixtures?live=all');
    const data = response.data.response || [];

    return data.map((item: any): Match => ({
      id: item.fixture.id.toString(),
      league: item.league.name,
      homeTeam: item.teams.home.name,
      awayTeam: item.teams.away.name,
      homeScore: item.goals.home ?? 0,
      awayScore: item.goals.away ?? 0,
      minute: item.fixture.status.elapsed ?? 0,
      status: item.fixture.status.short === 'HT' ? 'halftime' : 'live',
      stats: {
        homeCorners: 0, 
        awayCorners: 0,
        homeShots: 0,
        awayShots: 0,
        homeShotsOnTarget: 0,
        awayShotsOnTarget: 0,
        homePossession: 50,
        awayPossession: 50,
        homeAttacks: 0,
        awayAttacks: 0,
        homeDangerousAttacks: 0,
        awayDangerousAttacks: 0
      }
    }));
  } catch (error) {
    console.error("Erro real na API:", error);
    return [];
  }
};
