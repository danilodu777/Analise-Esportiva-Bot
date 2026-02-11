import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  Menu, 
  X, 
  LogOut, 
  User, 
  Settings,
  CreditCard,
  Bot,
  BarChart3,
  Home
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'matches', label: 'Jogos ao Vivo', icon: Activity },
    { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
    { id: 'robot', label: 'Robô', icon: Bot },
    { id: 'plans', label: 'Planos', icon: CreditCard },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('dashboard')}
          >
            <div className="bg-white/10 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-green-400" />
            </div>
            <span className="text-xl font-bold text-white">
              Análise <span className="text-green-400">Esportiva</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-green-600 text-white'
                      : 'text-green-100 hover:bg-white/10'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-green-100">
                  <div className="bg-green-600 p-2 rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-green-300">Plano {user?.plan}</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage('settings')}
                  className="p-2 text-green-100 hover:bg-white/10 rounded-lg transition-all"
                >
                  <Settings className="h-5 w-5" />
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-green-100 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="px-4 py-2 text-green-100 hover:bg-white/10 rounded-lg transition-all"
                >
                  Entrar
                </button>
                <button
                  onClick={() => setCurrentPage('register')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all"
                >
                  Cadastrar
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-green-100 hover:bg-white/10 rounded-lg"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-green-900/95 border-t border-green-700">
          <div className="px-4 py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-3 py-3 border-b border-green-700 mb-3">
                  <div className="bg-green-600 p-2 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{user?.name}</p>
                    <p className="text-sm text-green-300">Plano {user?.plan}</p>
                  </div>
                </div>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-all ${
                      currentPage === item.id
                        ? 'bg-green-600 text-white'
                        : 'text-green-100 hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-3 text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setCurrentPage('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-green-100 hover:bg-white/10 rounded-lg transition-all text-left"
                >
                  Entrar
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all text-left"
                >
                  Cadastrar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
