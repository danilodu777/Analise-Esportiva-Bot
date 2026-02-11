import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { plans } from '../data/mockData';
import { 
  CreditCard, 
  Check, 
  Star,
  Zap,
  Shield,
  Clock,
  ChevronRight
} from 'lucide-react';

export function PlansPage() {
  const { user } = useAuth();
  const [, setSelectedPlan] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Simulate payment modal or redirect
    alert(`Redirecionando para pagamento do plano ${planId}...`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Escolha seu <span className="text-green-400">Plano</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Acesse estatísticas em tempo real, configure robôs para enviar sinais 
            automaticamente e aumente suas chances de sucesso nas análises esportivas.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={billingPeriod === 'monthly' ? 'text-white' : 'text-gray-500'}>
              Mensal
            </span>
            <button
              onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 bg-gray-700 rounded-full transition-colors"
            >
              <span 
                className={`absolute top-1 w-5 h-5 bg-green-500 rounded-full transition-all ${
                  billingPeriod === 'yearly' ? 'left-8' : 'left-1'
                }`}
              />
            </button>
            <span className={billingPeriod === 'yearly' ? 'text-white' : 'text-gray-500'}>
              Anual
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                -20%
              </span>
            </span>
          </div>
        </div>

        {/* Current Plan Badge */}
        {user && (
          <div className="max-w-md mx-auto mb-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-4 border border-green-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Plano atual</p>
                  <p className="font-semibold">{user.plan.toUpperCase()}</p>
                </div>
              </div>
              {user.expiresAt && (
                <div className="text-right">
                  <p className="text-sm text-gray-400">Expira em</p>
                  <p className="font-semibold text-green-400">
                    {Math.ceil((user.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dias
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => {
            const price = billingPeriod === 'yearly' 
              ? (plan.price * 12 * 0.8) 
              : plan.price;
            const isCurrentPlan = user?.plan === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border transition-all ${
                  plan.popular 
                    ? 'border-green-500 ring-2 ring-green-500/20' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium px-4 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold">
                      R$ {price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-gray-500">
                      /{billingPeriod === 'yearly' ? 'ano' : 'mês'}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      isCurrentPlan
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    {isCurrentPlan ? (
                      'Plano Atual'
                    ) : (
                      <>
                        Assinar Agora
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold">Comparação de Recursos</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50">
                  <th className="text-left p-4 text-gray-400 font-medium">Recurso</th>
                  <th className="text-center p-4 text-gray-400 font-medium">Básico</th>
                  <th className="text-center p-4 text-gray-400 font-medium">Profissional</th>
                  <th className="text-center p-4 text-gray-400 font-medium">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="p-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    Jogos ao vivo
                  </td>
                  <td className="text-center p-4"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                  <td className="text-center p-4"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                  <td className="text-center p-4"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    Estatísticas avançadas
                  </td>
                  <td className="text-center p-4 text-gray-500">—</td>
                  <td className="text-center p-4"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                  <td className="text-center p-4"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    Configurações de robô
                  </td>
                  <td className="text-center p-4">1</td>
                  <td className="text-center p-4">5</td>
                  <td className="text-center p-4">Ilimitado</td>
                </tr>
                <tr>
                  <td className="p-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    Sinais por dia
                  </td>
                  <td className="text-center p-4">10</td>
                  <td className="text-center p-4">Ilimitado</td>
                  <td className="text-center p-4">Ilimitado</td>
                </tr>
                <tr>
                  <td className="p-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    Análise de pressão
                  </td>
                  <td className="text-center p-4 text-gray-500">—</td>
                  <td className="text-center p-4"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                  <td className="text-center p-4"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    API exclusiva
                  </td>
                  <td className="text-center p-4 text-gray-500">—</td>
                  <td className="text-center p-4 text-gray-500">—</td>
                  <td className="text-center p-4"><Check className="h-5 w-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    Suporte
                  </td>
                  <td className="text-center p-4 text-sm text-gray-400">Email</td>
                  <td className="text-center p-4 text-sm text-gray-400">Prioritário</td>
                  <td className="text-center p-4 text-sm text-gray-400">24/7 WhatsApp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Formas de pagamento aceitas</p>
          <div className="flex items-center justify-center gap-6">
            <div className="bg-gray-800 px-4 py-2 rounded-lg">
              <CreditCard className="h-8 w-8 text-gray-400" />
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-lg text-gray-400 font-medium">
              PIX
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-lg text-gray-400 font-medium">
              Boleto
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Pagamento seguro processado por Stripe. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
}
