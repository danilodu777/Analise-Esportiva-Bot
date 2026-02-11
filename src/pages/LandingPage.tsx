import { 
  Activity, 
  Zap, 
  TrendingUp, 
  Bot, 
  Shield, 
  Users,
  ChevronRight,
  Play,
  Star,
  CornerDownRight,
  Target
} from 'lucide-react';

interface LandingPageProps {
  setCurrentPage: (page: string) => void;
}

export function LandingPage({ setCurrentPage }: LandingPageProps) {
  const features = [
    {
      icon: Activity,
      title: 'Estatísticas em Tempo Real',
      description: 'Acompanhe jogos ao vivo com estatísticas detalhadas atualizadas a cada segundo.',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Bot,
      title: 'Robô Automatizado',
      description: 'Configure robôs para enviar sinais automaticamente para seu grupo no Telegram.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: TrendingUp,
      title: 'Análise de Probabilidade',
      description: 'Algoritmos avançados calculam probabilidades de escanteios, gols e chutes.',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: Zap,
      title: 'Análise de Pressão',
      description: 'Identifique momentos de pressão alta ou baixa com precisão.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Shield,
      title: 'Sinais Precisos',
      description: 'Taxa de acerto acima de 75% comprovada por milhares de usuários.',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: Users,
      title: 'Comunidade Ativa',
      description: 'Faça parte de uma comunidade de analistas esportivos profissionais.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Usuários Ativos' },
    { value: '1M+', label: 'Sinais Enviados' },
    { value: '78%', label: 'Taxa de Acerto' },
    { value: '100+', label: 'Ligas Cobertas' },
  ];

  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'Trader Esportivo',
      content: 'A melhor ferramenta que já usei para análise esportiva. Os sinais são extremamente precisos!',
      avatar: 'C',
    },
    {
      name: 'Ana Costa',
      role: 'Analista',
      content: 'O robô para Telegram mudou completamente minha operação. Automatizou todo o processo.',
      avatar: 'A',
    },
    {
      name: 'Pedro Santos',
      role: 'Apostador Profissional',
      content: 'Estatísticas em tempo real com qualidade profissional. Vale cada centavo investido.',
      avatar: 'P',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-green-600/20 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-xl font-bold">
                Análise <span className="text-green-400">Esportiva</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage('login')}
                className="px-4 py-2 text-gray-300 hover:text-white transition-all"
              >
                Entrar
              </button>
              <button
                onClick={() => setCurrentPage('register')}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-all"
              >
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-emerald-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-8">
              <Zap className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">Plataforma #1 em Análise Esportiva</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Estatísticas em{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Tempo Real
              </span>
              {' '}para Sinais Precisos
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Acompanhe jogos ao vivo, configure robôs automatizados e envie sinais 
              para seu grupo no Telegram com probabilidades calculadas por IA.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage('register')}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-green-500/25"
              >
                Começar Agora
                <ChevronRight className="h-5 w-5" />
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-lg transition-all">
                <Play className="h-5 w-5" />
                Ver Demonstração
              </button>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="mt-20 relative">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Live Match Card */}
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">Premier League</span>
                    <span className="flex items-center gap-1 text-xs text-red-400">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      67'
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Manchester City</span>
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Liverpool</span>
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <CornerDownRight className="h-4 w-4" />
                      <span>6 - 4</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>14 - 9</span>
                    </div>
                  </div>
                </div>

                {/* Signal Card */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-4 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span className="font-medium">Novo Sinal</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Próximo escanteio para Manchester City</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-green-400">78%</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      Alta Prob.
                    </span>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    Análise de Pressão
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Man City</span>
                        <span className="text-red-400">Alta</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div className="h-full w-3/4 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Liverpool</span>
                        <span className="text-yellow-400">Média</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div className="h-full w-1/2 bg-yellow-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Recursos <span className="text-green-400">Poderosos</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tudo que você precisa para análises esportivas profissionais em uma única plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all group"
              >
                <div className={`${feature.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              O que dizem nossos <span className="text-green-400">usuários</span>
            </h2>
            <p className="text-gray-400">Milhares de analistas confiam na nossa plataforma</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-y border-green-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Junte-se a milhares de analistas que já estão usando nossa plataforma.
          </p>
          <button
            onClick={() => setCurrentPage('register')}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-green-500/25"
          >
            Criar Conta Grátis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-green-400" />
              <span className="font-bold">Análise Esportiva</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Análise Esportiva. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-all">Termos</a>
              <a href="#" className="hover:text-white transition-all">Privacidade</a>
              <a href="#" className="hover:text-white transition-all">Suporte</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
