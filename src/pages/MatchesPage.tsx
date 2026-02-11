import { useState, useEffect } from 'react';
import { getLiveMatches } from '../api';
import { Match } from '../types';
import { Activity, Zap, Loader2, AlertCircle } from 'lucide-react';

export function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRealData = async () => {
    try {
      setError(null);
      const data = await getLiveMatches();
      setMatches(data);
    } catch (err) {
      console.error('Erro ao carregar jogos:', err);
      setError('Falha ao conectar com a API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRealData();
    const interval = setInterval(loadRealData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="h-10 w-10 animate-spin text-green-500 mb-4" />
        <p>Carregando dados da API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-400">{error}</p>
        <button 
          onClick={loadRealData} 
          className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="text-green-500" /> 
            Partidas ao Vivo
          </h1>
          <div className="text-sm text-gray-400">
            Total: <span className="text-green-400">{matches.length} jogos</span>
          </div>
        </header>

        {matches.length === 0 ? (
          <div className="bg-gray-800 p-10 rounded-xl text-center border border-gray-700">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-400">Nenhum jogo ao vivo no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div 
                key={match.id} 
                
