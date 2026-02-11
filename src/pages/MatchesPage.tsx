import { useState, useEffect } from 'react';
import { getLiveMatches } from '../api';
import { Match } from '../types';
import { Activity, Zap, Loader2, AlertCircle } from 'lucide-react';

export function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRealData = async () => {
    const data = await getLiveMatches();
    setMatches(data);
    setLoading(false);
  };

  useEffect(() => {
    loadRealData();
    const interval = setInterval(loadRealData, 60000); // Atualiza a cada 60 segundos
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className=\"min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white\">
        <Loader2 className=\"h-10 w-10 animate-spin text-green-500 mb-4\" />
        <p>Acedendo aos servidores da API-Football...</p>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gray-900 text-white p-6\">
      <div className=\"max-w-7xl mx-auto\">
        <header className=\"flex justify-between items-center mb-8\">
          <h1 className=\"text-3xl font-bold flex items-center gap-3\">
            <Activity className=\"text-green-500\" /> Dados Legítimos ao Vivo
          </h1>
          <div className=\"text-sm text-gray-400\">
            Total: <span className=\"text-green-400\">{matches.length} jogos</span>
          </div>
        </header>

        {matches.length === 0 ? (
          <div className=\"bg-gray-800 p-10 rounded-xl text-center border border-gray-700\">
            <AlertCircle className=\"mx-auto h-12 w-12 text-gray-500 mb-4\" />
            <p className=\"text-gray-400\">Não há jogos ao vivo no momento com a sua chave.</p>
          </div>
        ) : (
          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">
            {matches.map((match: Match) => (
              <div key={match.id} className=\"bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500/50 transition-all\">
                <div className=\"text-[10px] text-green-400 font-bold uppercase mb-3\">{match.league}</div>
                <div className=\"flex justify-between items-center mb-6\">
                  <div className=\"text-center flex-1\">
                    <div className=\"font-bold text-lg\">{match.homeTeam}</div>
                  </div>
                  <div className=\"bg-gray-900 px-4 py-2 rounded-lg font-mono text-2xl text-green-500 mx-4 border border-gray-700\">
                    {match.homeScore} : {match.awayScore}
                  </div>
                  <div className=\"text-center flex-1\">
                    <div className=\"font-bold text-lg\">{match.awayTeam}</div>
                  </div>
                </div>
                <div className=\"flex justify-between items-center pt-4 border-t border-gray-700\">
                  <div className=\"flex items-center gap-2 text-sm text-gray-400\">
                    <Zap className=\"h-4 w-4 text-yellow-500\" />
                    {match.minute}' min
                  </div>
                  <span className=\"text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded\">AO VIVO</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}