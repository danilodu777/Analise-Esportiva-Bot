import axios from 'axios';

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

export const httpClient = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  timeout: 15000,
  headers: {
    'x-apisports-key': API_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io'
  }
});

export const getLiveMatches = async () => {
  try {
    const response = await httpClient.get('/fixtures?live=all');
    return response.data.response || [];
  } catch (error) {
    console.error("Erro ao conectar com a API-Football:", error);
    return [];
  }
};