import { useState } from 'react';
import { RobotConfig } from '../types';
import { 
  Bot, 
  Plus, 
  Settings,
  Trash2,
  Play,
  Pause,
  Save,
  Send,
  CornerDownRight,
  Target,
  Zap,
  TrendingUp,
  Clock,
  MessageCircle
} from 'lucide-react';

export function RobotPage() {
  const [robots, setRobots] = useState<RobotConfig[]>([
    {
      id: '1',
      name: 'Robô Principal',
      telegramGroupId: '-1001234567890',
      minProbability: 70,
      enableCorners: true,
      enableGoals: true,
      enableShots: false,
      enablePressure: true,
      pressureThreshold: 'high',
      minMinute: 15,
      maxMinute: 85,
      active: true,
    },
    {
      id: '2',
      name: 'Robô Conservador',
      telegramGroupId: '-1009876543210',
      minProbability: 85,
      enableCorners: true,
      enableGoals: false,
      enableShots: false,
      enablePressure: false,
      pressureThreshold: 'medium',
      minMinute: 30,
      maxMinute: 75,
      active: false,
    },
  ]);

  const [selectedRobot, setSelectedRobot] = useState<RobotConfig | null>(robots[0]);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleActive = (id: string) => {
    setRobots(prev => prev.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
    if (selectedRobot?.id === id) {
      setSelectedRobot(prev => prev ? { ...prev, active: !prev.active } : null);
    }
  };

  const handleDeleteRobot = (id: string) => {
    setRobots(prev => prev.filter(r => r.id !== id));
    if (selectedRobot?.id === id) {
      setSelectedRobot(null);
    }
  };

  const handleAddRobot = () => {
    const newRobot: RobotConfig = {
      id: Date.now().toString(),
      name: `Novo Robô ${robots.length + 1}`,
      telegramGroupId: '',
      minProbability: 70,
      enableCorners: true,
      enableGoals: true,
      enableShots: false,
      enablePressure: false,
      pressureThreshold: 'medium',
      minMinute: 10,
      maxMinute: 85,
      active: false,
    };
    setRobots(prev => [...prev, newRobot]);
    setSelectedRobot(newRobot);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedRobot) {
      setRobots(prev => prev.map(r => 
        r.id === selectedRobot.id ? selectedRobot : r
      ));
      setIsEditing(false);
    }
  };

  const updateSelectedRobot = (updates: Partial<RobotConfig>) => {
    if (selectedRobot) {
      setSelectedRobot({ ...selectedRobot, ...updates });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Bot className="h-8 w-8 text-green-400" />
              Configuração do Robô
            </h1>
            <p className="text-gray-400 mt-1">
              Configure seus robôs para enviar sinais automaticamente ao Telegram
            </p>
          </div>
          
          <button
            onClick={handleAddRobot}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-all"
          >
            <Plus className="h-5 w-5" />
            Novo Robô
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Robots List */}
          <div className="lg:col-span-1 space-y-4">
            {robots.map((robot) => (
              <div
                key={robot.id}
                onClick={() => {
                  setSelectedRobot(robot);
                  setIsEditing(false);
                }}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border cursor-pointer transition-all ${
                  selectedRobot?.id === robot.id 
                    ? 'border-green-500 ring-1 ring-green-500' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${robot.active ? 'bg-green-500/20' : 'bg-gray-700'}`}>
                      <Bot className={`h-5 w-5 ${robot.active ? 'text-green-400' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{robot.name}</h3>
                      <p className="text-xs text-gray-500">ID: {robot.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleActive(robot.id);
                    }}
                    className={`p-2 rounded-lg transition-all ${
                      robot.active 
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {robot.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {robot.enableCorners && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Escanteios</span>
                  )}
                  {robot.enableGoals && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Gols</span>
                  )}
                  {robot.enableShots && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Chutes</span>
                  )}
                  {robot.enablePressure && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Pressão</span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700 text-sm text-gray-400">
                  <span>Min: {robot.minProbability}%</span>
                  <span>{robot.minMinute}' - {robot.maxMinute}'</span>
                </div>
              </div>
            ))}

            {robots.length === 0 && (
              <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700">
                <Bot className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Nenhum robô configurado</p>
                <button
                  onClick={handleAddRobot}
                  className="mt-4 text-green-400 hover:text-green-300 text-sm"
                >
                  Criar primeiro robô
                </button>
              </div>
            )}
          </div>

          {/* Robot Configuration */}
          <div className="lg:col-span-2">
            {selectedRobot ? (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${selectedRobot.active ? 'bg-green-500/20' : 'bg-gray-700'}`}>
                        <Bot className={`h-8 w-8 ${selectedRobot.active ? 'text-green-400' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        {isEditing ? (
                          <input
                            type="text"
                            value={selectedRobot.name}
                            onChange={(e) => updateSelectedRobot({ name: e.target.value })}
                            className="bg-transparent border-b border-green-500 text-xl font-bold focus:outline-none"
                          />
                        ) : (
                          <h2 className="text-xl font-bold">{selectedRobot.name}</h2>
                        )}
                        <p className={`text-sm ${selectedRobot.active ? 'text-green-400' : 'text-gray-500'}`}>
                          {selectedRobot.active ? '● Ativo' : '○ Inativo'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-all"
                        >
                          <Save className="h-4 w-4" />
                          Salvar
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all"
                        >
                          <Settings className="h-4 w-4" />
                          Editar
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteRobot(selectedRobot.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Configuration Form */}
                <div className="p-6 space-y-6">
                  {/* Telegram */}
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Configuração do Telegram
                    </h3>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">ID do Grupo</label>
                      <input
                        type="text"
                        value={selectedRobot.telegramGroupId}
                        onChange={(e) => updateSelectedRobot({ telegramGroupId: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 disabled:opacity-50"
                        placeholder="-1001234567890"
                      />
                    </div>
                  </div>

                  {/* Signal Types */}
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Tipos de Sinais
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedRobot.enableCorners ? 'bg-blue-500/10 border-blue-500/50' : 'bg-gray-800 border-gray-700'
                      } ${!isEditing && 'opacity-60 cursor-not-allowed'}`}>
                        <input
                          type="checkbox"
                          checked={selectedRobot.enableCorners}
                          onChange={(e) => updateSelectedRobot({ enableCorners: e.target.checked })}
                          disabled={!isEditing}
                          className="w-5 h-5 bg-gray-800 border-gray-700 rounded text-blue-500 focus:ring-blue-500"
                        />
                        <CornerDownRight className="h-5 w-5 text-blue-400" />
                        <span>Escanteios</span>
                      </label>

                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedRobot.enableGoals ? 'bg-green-500/10 border-green-500/50' : 'bg-gray-800 border-gray-700'
                      } ${!isEditing && 'opacity-60 cursor-not-allowed'}`}>
                        <input
                          type="checkbox"
                          checked={selectedRobot.enableGoals}
                          onChange={(e) => updateSelectedRobot({ enableGoals: e.target.checked })}
                          disabled={!isEditing}
                          className="w-5 h-5 bg-gray-800 border-gray-700 rounded text-green-500 focus:ring-green-500"
                        />
                        <Target className="h-5 w-5 text-green-400" />
                        <span>Gols</span>
                      </label>

                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedRobot.enableShots ? 'bg-yellow-500/10 border-yellow-500/50' : 'bg-gray-800 border-gray-700'
                      } ${!isEditing && 'opacity-60 cursor-not-allowed'}`}>
                        <input
                          type="checkbox"
                          checked={selectedRobot.enableShots}
                          onChange={(e) => updateSelectedRobot({ enableShots: e.target.checked })}
                          disabled={!isEditing}
                          className="w-5 h-5 bg-gray-800 border-gray-700 rounded text-yellow-500 focus:ring-yellow-500"
                        />
                        <Target className="h-5 w-5 text-yellow-400" />
                        <span>Chutes</span>
                      </label>

                      <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedRobot.enablePressure ? 'bg-purple-500/10 border-purple-500/50' : 'bg-gray-800 border-gray-700'
                      } ${!isEditing && 'opacity-60 cursor-not-allowed'}`}>
                        <input
                          type="checkbox"
                          checked={selectedRobot.enablePressure}
                          onChange={(e) => updateSelectedRobot({ enablePressure: e.target.checked })}
                          disabled={!isEditing}
                          className="w-5 h-5 bg-gray-800 border-gray-700 rounded text-purple-500 focus:ring-purple-500"
                        />
                        <Zap className="h-5 w-5 text-purple-400" />
                        <span>Pressão</span>
                      </label>
                    </div>
                  </div>

                  {/* Pressure Configuration */}
                  {selectedRobot.enablePressure && (
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
                      <h3 className="text-sm font-medium text-purple-400 mb-4 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Configuração de Pressão
                      </h3>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Nível de Pressão</label>
                        <div className="flex gap-2">
                          {(['low', 'medium', 'high'] as const).map((level) => (
                            <button
                              key={level}
                              onClick={() => isEditing && updateSelectedRobot({ pressureThreshold: level })}
                              disabled={!isEditing}
                              className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                                selectedRobot.pressureThreshold === level
                                  ? level === 'low' ? 'bg-green-600 text-white' :
                                    level === 'medium' ? 'bg-yellow-600 text-white' :
                                    'bg-red-600 text-white'
                                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                              } ${!isEditing && 'cursor-not-allowed opacity-60'}`}
                            >
                              {level === 'low' ? 'Baixa' : level === 'medium' ? 'Média' : 'Alta'}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {selectedRobot.pressureThreshold === 'low' && 'Envia sinais quando a pressão está acima de 30%'}
                          {selectedRobot.pressureThreshold === 'medium' && 'Envia sinais quando a pressão está acima de 50%'}
                          {selectedRobot.pressureThreshold === 'high' && 'Envia sinais quando a pressão está acima de 70%'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Probability & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Probabilidade Mínima
                      </h3>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="50"
                          max="95"
                          value={selectedRobot.minProbability}
                          onChange={(e) => updateSelectedRobot({ minProbability: parseInt(e.target.value) })}
                          disabled={!isEditing}
                          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 disabled:opacity-50"
                        />
                        <span className="text-2xl font-bold text-green-400 w-16 text-right">
                          {selectedRobot.minProbability}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Intervalo de Minutos
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">Min</label>
                          <input
                            type="number"
                            min="0"
                            max="90"
                            value={selectedRobot.minMinute}
                            onChange={(e) => updateSelectedRobot({ minMinute: parseInt(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-center text-lg font-bold focus:outline-none focus:border-green-500 disabled:opacity-50"
                          />
                        </div>
                        <span className="text-gray-500">-</span>
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">Max</label>
                          <input
                            type="number"
                            min="0"
                            max="90"
                            value={selectedRobot.maxMinute}
                            onChange={(e) => updateSelectedRobot({ maxMinute: parseInt(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-center text-lg font-bold focus:outline-none focus:border-green-500 disabled:opacity-50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Test Button */}
                  <button
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg font-medium transition-all"
                  >
                    <Send className="h-5 w-5" />
                    Enviar Mensagem de Teste
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-12 text-center">
                <Settings className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-400 mb-2">
                  Selecione um robô
                </h3>
                <p className="text-gray-500">
                  Clique em um robô para ver e editar suas configurações
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
