import { useState } from 'react';
import { mockMatches, mockSignals } from '../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  Target,
  CornerDownRight,
  Zap,
  CheckCircle,
  XCircle,
  Calendar
} from 'lucide-react';

export function StatsPage() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');

  const totalMatches = mockMatches.length;
  const liveMatches = mockMatches.filter(m => m.status === 'live').length;
  const totalSignals = mockSignals.length;
  const successfulSignals = mockSignals.filter(s => s.sent).length;
  const successRate = Math.round((successfulSignals / totalSignals) * 100);

  const signalsByType = {
    corner: mockSignals.filter(s => s.type === 'corner').length,
    goal: mockSignals.filter(s => s.type === 'goal').length,
    shot: mockSignals.filter(s => s.type === 'shot').length,
    pressure: mockSignals.filter(s => s.type === 'pressure').length,
  };

  const avgCorners = Math.round(mockMatches.reduce((acc, m) => acc + m.stats.homeCorners + m.stats.awayCorners, 0) / mockMatches.length);
  const avgShots = Math.round(mockMatches.reduce((acc, m) => acc + m.stats.homeShots + m.stats.awayShots, 0) / mockMatches.length);
  const avgGoals = Math.round(mockMatches.reduce((acc, m) => acc + m.homeScore + m.awayScore, 0) / mockMatches.length * 10) / 10;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-green-400" />
              Estatísticas
            </h1>
            <p className="text-gray-400 mt-1">
              Análise de performance e métricas dos sinais
            </p>
          </div>

          {/* Period Filter */}
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setPeriod('today')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === 'today' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Hoje
            </button>
            <button
              onClick={() => setPeriod('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === 'week' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === 'month' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Mês
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-400">{successRate}%</p>
            <p className="text-gray-400 text-sm mt-1">Taxa de Acerto</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <p className="text-3xl font-bold">{totalSignals}</p>
            <p className="text-gray-400 text-sm mt-1">Sinais Enviados</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-500/10 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <p className="text-3xl font-bold">{totalMatches}</p>
            <p className="text-gray-400 text-sm mt-1">Jogos Analisados</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/10 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold">{liveMatches}</p>
            <p className="text-gray-400 text-sm mt-1">Ao Vivo Agora</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Signals by Type */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-6">Sinais por Tipo</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <CornerDownRight className="h-4 w-4 text-blue-400" />
                    Escanteios
                  </span>
                  <span className="text-gray-400">{signalsByType.corner}</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${(signalsByType.corner / totalSignals) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-400" />
                    Gols
                  </span>
                  <span className="text-gray-400">{signalsByType.goal}</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${(signalsByType.goal / totalSignals) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-yellow-400" />
                    Chutes
                  </span>
                  <span className="text-gray-400">{signalsByType.shot}</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                    style={{ width: `${(signalsByType.shot / totalSignals) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-400" />
                    Pressão
                  </span>
                  <span className="text-gray-400">{signalsByType.pressure}</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${(signalsByType.pressure / totalSignals) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Average Stats */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-6">Médias por Jogo</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <CornerDownRight className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">{avgCorners}</p>
                <p className="text-xs text-gray-400 mt-1">Escanteios</p>
              </div>
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <Target className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">{avgShots}</p>
                <p className="text-xs text-gray-400 mt-1">Chutes</p>
              </div>
              <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">{avgGoals}</p>
                <p className="text-xs text-gray-400 mt-1">Gols</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-sm font-medium text-gray-400 mb-4">Performance por Liga</h4>
              <div className="space-y-3">
                {['Premier League', 'La Liga', 'Série A Brasil', 'Bundesliga'].map((league, index) => (
                  <div key={league} className="flex items-center justify-between">
                    <span className="text-sm">{league}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${75 + index * 5}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-green-400">{75 + index * 5}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Success/Failure History */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-6">Histórico de Resultados</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                  <th className="pb-3 font-medium">Jogo</th>
                  <th className="pb-3 font-medium">Tipo</th>
                  <th className="pb-3 font-medium">Previsão</th>
                  <th className="pb-3 font-medium">Probabilidade</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {mockSignals.map((signal) => {
                  const match = mockMatches.find(m => m.id === signal.matchId);
                  return (
                    <tr key={signal.id} className="text-sm">
                      <td className="py-4">
                        <span className="font-medium">{match?.homeTeam} vs {match?.awayTeam}</span>
                        <p className="text-xs text-gray-500">{match?.league}</p>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          signal.type === 'corner' ? 'bg-blue-500/20 text-blue-400' :
                          signal.type === 'goal' ? 'bg-green-500/20 text-green-400' :
                          signal.type === 'shot' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {signal.type === 'corner' ? 'Escanteio' :
                           signal.type === 'goal' ? 'Gol' :
                           signal.type === 'shot' ? 'Chute' : 'Pressão'}
                        </span>
                      </td>
                      <td className="py-4 text-gray-300">{signal.prediction}</td>
                      <td className="py-4">
                        <span className="text-green-400 font-medium">{signal.probability}%</span>
                      </td>
                      <td className="py-4">
                        {signal.sent ? (
                          <span className="flex items-center gap-1 text-green-400">
                            <CheckCircle className="h-4 w-4" />
                            Acerto
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-400">
                            <XCircle className="h-4 w-4" />
                            Erro
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
