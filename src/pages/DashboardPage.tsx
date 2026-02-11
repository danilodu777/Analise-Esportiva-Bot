import { useAuth } from '../context/AuthContext';
import { mockMatches, mockSignals } from '../data/mockData';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Zap, 
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

interface DashboardPageProps {
  setCurrentPage: (page: string) => void;
}

export function DashboardPage({ setCurrentPage }: DashboardPageProps) {
  const { user } = useAuth();
  const liveMatches = mockMatches.filter(m => m.status === 'live').length;
  const sentSignals = mockSignals.filter(s => s.sent).length;

  const stats = [
    {
      label: 'Jogos ao Vivo',
      value: liveMatches.toString(),
      icon: Activity,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Sinais Enviados',
      value: sentSignals.toString(),
      icon: Zap,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Taxa de Acerto',
      value: '78%',
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Robôs Ativos',
      value: '2',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const recentSignals = mockSignals.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Olá, <span className="text-green-400">{user?.name}</span>! 👋
          </h1>
          <p className="text-gray-400">
            Aqui está o resumo das suas análises esportivas de hoje.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text`} style={{ color: 'rgb(34 197 94)' }} />
                </div>
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Matches Preview */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-400" />
                Jogos ao Vivo
              </h2>
              <button 
                onClick={() => setCurrentPage('matches')}
                className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1"
              >
                Ver todos <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="divide-y divide-gray-700">
              {mockMatches.filter(m => m.status === 'live').slice(0, 3).map((match) => (
                <div key={match.id} className="p-4 hover:bg-gray-700/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{match.league}</span>
                    <span className="flex items-center gap-1 text-xs">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-red-400">{match.minute}'</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{match.homeTeam}</p>
                      <p className="font-medium">{match.awayTeam}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">{match.homeScore}</p>
                      <p className="font-bold text-xl">{match.awayScore}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Signals */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Sinais Recentes
              </h2>
              <button 
                onClick={() => setCurrentPage('robot')}
                className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1"
              >
                Configurar <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="divide-y divide-gray-700">
              {recentSignals.map((signal) => {
                const match = mockMatches.find(m => m.id === signal.matchId);
                return (
                  <div key={signal.id} className="p-4 hover:bg-gray-700/30 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            signal.type === 'corner' ? 'bg-blue-500/20 text-blue-400' :
                            signal.type === 'goal' ? 'bg-green-500/20 text-green-400' :
                            signal.type === 'shot' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-purple-500/20 text-purple-400'
                          }`}>
                            {signal.type === 'corner' ? 'Escanteio' :
                             signal.type === 'goal' ? 'Gol' :
                             signal.type === 'shot' ? 'Chute' : 'Pressão'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {match?.homeTeam} vs {match?.awayTeam}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{signal.prediction}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-lg font-bold text-green-400">{signal.probability}%</span>
                        {signal.sent ? (
                          <span className="flex items-center gap-1 text-xs text-green-400">
                            <CheckCircle className="h-3 w-3" /> Enviado
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-yellow-400">
                            <AlertCircle className="h-3 w-3" /> Pendente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="mt-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-6 border border-green-700/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/20 p-3 rounded-xl">
                <Clock className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Plano {user?.plan?.toUpperCase()}</h3>
                <p className="text-gray-400 text-sm">
                  Sua assinatura expira em{' '}
                  <span className="text-green-400 font-medium">
                    {user?.expiresAt ? Math.ceil((user.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0} dias
                  </span>
                </p>
              </div>
            </div>
            <button 
              onClick={() => setCurrentPage('plans')}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-all"
            >
              Gerenciar Assinatura
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
