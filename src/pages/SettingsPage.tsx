import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Save,
  Camera,
  Mail,
  Key,
  Smartphone,
  Globe,
  Zap
} from 'lucide-react';

export function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    notifications: {
      email: true,
      push: true,
      telegram: true,
      signals: true,
    },
    theme: 'dark',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'appearance', label: 'Aparência', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="h-8 w-8 text-green-400" />
            Configurações
          </h1>
          <p className="text-gray-400 mt-1">
            Gerencie suas preferências e informações da conta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Informações do Perfil</h2>
                  
                  {/* Avatar */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold">
                        {formData.name.charAt(0).toUpperCase()}
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-all">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{formData.name}</h3>
                      <p className="text-gray-400">{formData.email}</p>
                      <p className="text-sm text-green-400 mt-1">Plano {user?.plan?.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Nome completo
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Telefone
                        </label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+55 11 99999-9999"
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Fuso horário
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <select
                            value={formData.timezone}
                            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all appearance-none"
                          >
                            <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                            <option value="America/New_York">Nova York (GMT-5)</option>
                            <option value="Europe/London">Londres (GMT+0)</option>
                            <option value="Europe/Paris">Paris (GMT+1)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Preferências de Notificação</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-400" />
                        <div>
                          <p className="font-medium">Notificações por email</p>
                          <p className="text-sm text-gray-400">Receba atualizações por email</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setFormData({
                          ...formData,
                          notifications: { ...formData.notifications, email: !formData.notifications.email }
                        })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          formData.notifications.email ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                          formData.notifications.email ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-yellow-400" />
                        <div>
                          <p className="font-medium">Notificações push</p>
                          <p className="text-sm text-gray-400">Receba alertas no navegador</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setFormData({
                          ...formData,
                          notifications: { ...formData.notifications, push: !formData.notifications.push }
                        })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          formData.notifications.push ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                          formData.notifications.push ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Notificações Telegram</p>
                          <p className="text-sm text-gray-400">Receba sinais no seu Telegram</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setFormData({
                          ...formData,
                          notifications: { ...formData.notifications, telegram: !formData.notifications.telegram }
                        })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          formData.notifications.telegram ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                          formData.notifications.telegram ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-green-400" />
                        <div>
                          <p className="font-medium">Alertas de sinais</p>
                          <p className="text-sm text-gray-400">Receba alertas quando novos sinais forem gerados</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setFormData({
                          ...formData,
                          notifications: { ...formData.notifications, signals: !formData.notifications.signals }
                        })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          formData.notifications.signals ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      >
                        <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                          formData.notifications.signals ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Segurança da Conta</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h3 className="font-medium mb-4 flex items-center gap-2">
                        <Key className="h-5 w-5 text-yellow-400" />
                        Alterar Senha
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Senha atual</label>
                          <input
                            type="password"
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Nova senha</label>
                          <input
                            type="password"
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Confirmar nova senha</label>
                          <input
                            type="password"
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all"
                          />
                        </div>
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-all">
                          Atualizar Senha
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h3 className="font-medium mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-400" />
                        Autenticação de Dois Fatores
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Adicione uma camada extra de segurança à sua conta.
                      </p>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all">
                        Configurar 2FA
                      </button>
                    </div>

                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                      <h3 className="font-medium mb-2 text-red-400">Zona de Perigo</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Ações irreversíveis. Tenha cuidado.
                      </p>
                      <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg font-medium transition-all">
                        Excluir Conta
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Aparência</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-4">Tema</label>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => setFormData({ ...formData, theme: 'dark' })}
                          className={`p-4 rounded-lg border transition-all ${
                            formData.theme === 'dark' 
                              ? 'border-green-500 bg-green-500/10' 
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <div className="w-full h-12 bg-gray-900 rounded mb-2"></div>
                          <p className="text-sm">Escuro</p>
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, theme: 'light' })}
                          className={`p-4 rounded-lg border transition-all ${
                            formData.theme === 'light' 
                              ? 'border-green-500 bg-green-500/10' 
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <div className="w-full h-12 bg-gray-200 rounded mb-2"></div>
                          <p className="text-sm">Claro</p>
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, theme: 'system' })}
                          className={`p-4 rounded-lg border transition-all ${
                            formData.theme === 'system' 
                              ? 'border-green-500 bg-green-500/10' 
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <div className="w-full h-12 bg-gradient-to-r from-gray-900 to-gray-200 rounded mb-2"></div>
                          <p className="text-sm">Sistema</p>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-4">Idioma</label>
                      <select
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-all"
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="p-6 border-t border-gray-700 bg-gray-900/30">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-all"
                >
                  <Save className="h-5 w-5" />
                  {saved ? 'Salvo!' : 'Salvar Alterações'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
