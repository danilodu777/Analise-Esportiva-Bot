import { useState, useEffect } from 'react';
import { getLiveMatches } from '../api'; // Importa a função que criamos acima
import { Match } from '../types';
import { Activity, Filter, Zap, Loader2 } from 'lucide-react';

export function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const data = await getLiveMatches();
    
    // Mapeia os dados da API para o formato que o seu site entende
    const realMatches: Match[] = data.map((item: any) => ({
      id: item.fixture.id.toString(),
      league: item.league.name,
      homeTeam: item.teams.home.name,
      awayTeam: item.teams.away.name,
      homeScore: item.goals.home ?? 0,
      awayScore: item.goals.away ?? 0,
      minute: item.fixture.status.elapsed ?? 0,
      status: 'live',
      stats: {
        homeCorners: 0, 
        awayCorners: 0,
        homeShots: 0,
        awayShots: 0,
        homePossession: 50,
        awayPossession: 50,
        homeDangerousAttacks: 0,
        awayDangerousAttacks: 0
      }
    }));

    setMatches(realMatches);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000); // Atualiza a cada 1 minuto
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="h-12 w-12 animate-spin text-green-500 mb-4" />
        <p className="text-xl font-medium">Buscando jogos ao vivo com sua API...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Activity className="text-green-500" /> Jogos em Tempo Real
          </h1>
          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
            {matches.length} Jogos On-line
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div key={match.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500/50 transition-all">
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider">{match.league}</div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">{match.homeTeam}</span>
                <span className="bg-gray-900 px-3 py-1 rounded text-green-400 font-mono text-xl">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="font-bold text-lg text-right">{match.awayTeam}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1 text-green-500">
                  <Zap className="h-4 w-4 fill-current" />
                  <span>{match.minute}'</span>
                </div>
                <button className="text-green-400 hover:underline">Ver Detalhes</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}