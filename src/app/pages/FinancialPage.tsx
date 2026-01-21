import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  BarChart3,
  BadgeDollarSign,
  CheckCircle2,
  Clock,
  CreditCard,
  Boxes,
  Shield,
  HandCoins,
  LineChart as LineChartIcon,
  PiggyBank,
  Receipt,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import logoFastMarket from '@/assets/cd53d06e3e768b5e2fb1c878a0f946e1d3655847.png';
import fastMarketStore from '@/assets/4e4ffbb8fbf98e9dc91f47a200a552c791755bae.png';
import fastMarketKiosks from '@/assets/aea5dc839fdf3fe488d0fe100d5373e95f46229e.png';

import { AnimatedCounter } from '@/app/components/AnimatedCounter';
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal';
import { WhatsAppButton } from '@/app/components/WhatsAppButton';

interface FAQItem {
  question: string;
  answer: string;
}

type ScenarioKey = 'seguro' | 'base' | 'acelerado';

type SpaceKey = 'pequeno' | 'medio' | 'grande';

type PlanKey = 'mini' | 'standard' | 'pro';

type Scenario = {
  key: ScenarioKey;
  label: string;
  subtitle: string;
  vendasMultiplier: number;
  margemDelta: number;
  opexMultiplier: number;
};

type SpaceProfile = {
  key: SpaceKey;
  label: string;
  subtitle: string;
  vendasDia: number;
  ticketMedio: number;
  margemBrutaPct: number; // 0..1
  opexMensal: number;
  plan: PlanKey;
};

type Plan = {
  key: PlanKey;
  label: string;
  investimentoMin: number;
  bestFor: string;
  includes: string[];
  addOns: string[];
};

function clampPositive(n: number) {
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

function clamp(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPct(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(value);
}

function calcPaybackMonths({ capex, lucroLiquidoMensal }: { capex: number; lucroLiquidoMensal: number }) {
  const denom = clampPositive(lucroLiquidoMensal);
  if (denom <= 0) return Infinity;
  return capex / denom;
}

function FinanceFAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {items.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06, duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-[#22C55E] transition-all"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
          >
            <span
              className="text-base sm:text-lg font-semibold text-[#1F2937] pr-6 group-hover:text-[#22C55E] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0 text-gray-400 group-hover:text-[#22C55E]"
              aria-hidden
            >
              <span className="inline-block text-2xl leading-none">⌃</span>
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="px-6 sm:px-8 pb-6 text-gray-600 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export function FinancialPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>('base');
  const [spaceKey, setSpaceKey] = useState<SpaceKey>('pequeno');
  const [planKey, setPlanKey] = useState<PlanKey>('mini');
  const [capex, setCapex] = useState<number>(25000);

  useEffect(() => {
    const previous = document.title;
    document.title = 'Área Financeira | FastMarket';
    return () => {
      document.title = previous;
    };
  }, []);

  const scenarios = useMemo<Scenario[]>(
    () => [
      {
        key: 'seguro',
        label: 'Seguro',
        subtitle: 'Mais cauteloso',
        vendasMultiplier: 0.92,
        margemDelta: -0.01,
        opexMultiplier: 1.0,
      },
      {
        key: 'base',
        label: 'Base',
        subtitle: 'O mais comum',
        vendasMultiplier: 1.0,
        margemDelta: 0,
        opexMultiplier: 1.0,
      },
      {
        key: 'acelerado',
        label: 'Acelerado',
        subtitle: 'Quando o ponto responde muito bem',
        vendasMultiplier: 1.05,
        margemDelta: 0.01,
        opexMultiplier: 1.05,
      },
    ],
    []
  );

  const plans = useMemo<Plan[]>(
    () => [
      {
        key: 'mini',
        label: 'Mini',
        investimentoMin: 25000,
        bestFor: 'Espaço pequeno / começo rápido',
        includes: ['Loja 24/7', 'Pagamentos (PIX/cartão)', 'Dashboard básico', 'Suporte e manutenção'],
        addOns: ['Mídia/Totem', 'Integração ERP', 'Relatórios avançados'],
      },
      {
        key: 'standard',
        label: 'Standard',
        investimentoMin: 80000,
        bestFor: 'Espaço médio / volume recorrente',
        includes: ['Tudo do Mini', 'Gestão de estoque mais completa', 'Rotina de reposição', 'Relatórios e alertas'],
        addOns: ['Módulo de promoções', 'Módulo de fidelidade', 'Mídia/Totem'],
      },
      {
        key: 'pro',
        label: 'Pro',
        investimentoMin: 150000,
        bestFor: 'Espaço grande / escala',
        includes: ['Tudo do Standard', 'Dashboards avançados', 'Rotas/operacional', 'Integrações e automações'],
        addOns: ['Múltiplas unidades', 'BI personalizado', 'Integrações sob medida'],
      },
    ],
    []
  );

  const spaces = useMemo<SpaceProfile[]>(
    () => [
      {
        key: 'pequeno',
        label: 'Pequeno',
        subtitle: 'Condomínio / escritório / recepção',
        vendasDia: 70,
        ticketMedio: 16,
        margemBrutaPct: 0.35,
        opexMensal: 7000,
        plan: 'mini',
      },
      {
        key: 'medio',
        label: 'Médio',
        subtitle: 'Hospital / indústria / educacional',
        vendasDia: 130,
        ticketMedio: 18,
        margemBrutaPct: 0.36,
        opexMensal: 12000,
        plan: 'standard',
      },
      {
        key: 'grande',
        label: 'Grande',
        subtitle: 'Alta circulação / operação maior',
        vendasDia: 220,
        ticketMedio: 20,
        margemBrutaPct: 0.37,
        opexMensal: 25000,
        plan: 'pro',
      },
    ],
    []
  );

  const scenario = useMemo(() => scenarios.find((s) => s.key === scenarioKey) ?? scenarios[1], [scenarioKey, scenarios]);
  const space = useMemo(() => spaces.find((s) => s.key === spaceKey) ?? spaces[0], [spaceKey, spaces]);
  const plan = useMemo(() => plans.find((p) => p.key === planKey) ?? plans[0], [planKey, plans]);

  // Mantém plano e investimento mínimos coerentes com o porte escolhido.
  useEffect(() => {
    // quando muda o porte, sugerimos o plano ideal
    setPlanKey(space.plan);
  }, [space.plan]);

  useEffect(() => {
    // garante mínimo por plano
    setCapex((current) => Math.max(plan.investimentoMin, current));
  }, [plan.investimentoMin]);

  // Premissas simples para explicar a conta (os números reais vêm do seu ponto).
  const DIAS_NO_MES = 30;
  const TAXAS_E_PERDAS_PCT = 0.039; // taxas de pagamento + perdas/ruptura

  const vendasDia = useMemo(() => Math.round(space.vendasDia * scenario.vendasMultiplier), [space, scenario]);
  const ticketMedio = useMemo(() => space.ticketMedio, [space]);
  const margemBrutaPct = useMemo(() => clamp(space.margemBrutaPct + scenario.margemDelta, 0.25, 0.55), [space, scenario]);
  const opexMensal = useMemo(() => Math.round(space.opexMensal * scenario.opexMultiplier), [space, scenario]);

  const receitaMensal = useMemo(() => vendasDia * ticketMedio * DIAS_NO_MES, [vendasDia, ticketMedio]);
  const lucroBrutoMensal = useMemo(() => receitaMensal * margemBrutaPct, [receitaMensal, margemBrutaPct]);
  const taxasEPerdasMensal = useMemo(() => receitaMensal * TAXAS_E_PERDAS_PCT, [receitaMensal]);
  const lucroLiquidoMensal = useMemo(
    () => clampPositive(lucroBrutoMensal - opexMensal - taxasEPerdasMensal),
    [lucroBrutoMensal, opexMensal, taxasEPerdasMensal]
  );

  const paybackMesesRaw = useMemo(() => calcPaybackMonths({ capex, lucroLiquidoMensal }), [capex, lucroLiquidoMensal]);
  const paybackMeses = useMemo(() => clamp(Math.round(paybackMesesRaw), 6, 24), [paybackMesesRaw]);

  const kpis = useMemo(
    () => [
      {
        label: 'Receita/mês',
        value: Math.round(receitaMensal),
        icon: <BarChart3 className="text-[#22C55E]" size={20} strokeWidth={2.5} />,
        formatter: formatBRL,
      },
      {
        label: 'Lucro líquido/mês',
        value: Math.round(lucroLiquidoMensal),
        icon: <PiggyBank className="text-[#22C55E]" size={20} strokeWidth={2.5} />,
        formatter: formatBRL,
      },
      {
        label: 'Payback estimado',
        value: paybackMeses,
        icon: <HandCoins className="text-[#22C55E]" size={20} strokeWidth={2.5} />,
        suffix: ' meses',
      },
      {
        label: 'Margem bruta',
        value: Math.round(margemBrutaPct * 100),
        icon: <BadgeDollarSign className="text-[#22C55E]" size={20} strokeWidth={2.5} />,
        suffix: '%',
      },
    ],
    [receitaMensal, lucroLiquidoMensal, paybackMeses, margemBrutaPct]
  );

  const projection = useMemo(() => {
    // rampa de maturação: começa menor e estabiliza.
    const ramp = [0.65, 0.72, 0.8, 0.88, 0.95, 1.0, 1.02, 1.03, 1.04, 1.05, 1.05, 1.05];
    return ramp.map((factor, idx) => {
      const receita = receitaMensal * factor;
      const lucroBruto = receita * margemBrutaPct;
      const taxasEPerdas = receita * TAXAS_E_PERDAS_PCT;
      const lucroLiquido = clampPositive(lucroBruto - opexMensal - taxasEPerdas);
      return {
        m: `M${idx + 1}`,
        receita,
        lucroLiquido,
      };
    });
  }, [receitaMensal, margemBrutaPct, opexMensal]);

  const cashflow = useMemo(() => {
    let acumulado = -capex;
    return projection.map((p) => {
      acumulado += p.lucroLiquido;
      return {
        m: p.m,
        acumulado,
      };
    });
  }, [capex, projection]);

  const paybackBars = useMemo(() => {
    return spaces
      .map((sp) => {
        const sc = scenario;
        const vendas = Math.round(sp.vendasDia * sc.vendasMultiplier);
        const receita = vendas * sp.ticketMedio * DIAS_NO_MES;
        const margem = clamp(sp.margemBrutaPct + sc.margemDelta, 0.25, 0.55);
        const lucroBruto = receita * margem;
        const taxasEPerdas = receita * TAXAS_E_PERDAS_PCT;
        const opex = Math.round(sp.opexMensal * sc.opexMultiplier);
        const lucro = clampPositive(lucroBruto - opex - taxasEPerdas);

        const p = plans.find((pl) => pl.key === sp.plan);
        const investimento = p?.investimentoMin ?? 25000;
        const meses = clamp(Math.round(calcPaybackMonths({ capex: investimento, lucroLiquidoMensal: lucro })), 6, 24);
        return {
          modelo: sp.label,
          meses,
        };
      })
      .map((x) => ({ ...x, meses: Number.isFinite(x.meses) ? x.meses : 6 }));
  }, [spaces, scenario, plans]);

  const unitEconomics = useMemo(() => {
    const receita = receitaMensal;
    const cmv = receita * (1 - margemBrutaPct);
    const opex = opexMensal;
    const taxasEPerdas = receita * TAXAS_E_PERDAS_PCT;
    const lucro = clampPositive(receita - cmv - opex - taxasEPerdas);
    return [
      { name: 'CMV', value: Math.round(cmv), fill: '#FBBF24' },
      { name: 'OPEX', value: Math.round(opex), fill: '#9CA3AF' },
      { name: 'Taxas/perdas', value: Math.round(taxasEPerdas), fill: '#A78BFA' },
      { name: 'Lucro', value: Math.round(lucro), fill: '#22C55E' },
    ];
  }, [receitaMensal, margemBrutaPct, opexMensal]);

  const faqItems = useMemo<FAQItem[]>(
    () => [
      {
        question: 'Qual é a ideia (bem simples) do FastMarket?',
        answer:
          'Uma loja autônoma que vende 24/7, com gestão por dashboard. Menos custo de operação, mais horário disponível e mais chance de vender “fora do horário”.',
      },
      {
        question: 'E se vender menos do que a gente imagina?',
        answer:
          'A gente trabalha com cenário conservador e melhora o resultado com o básico bem feito: mix certo, reposição, preço, promoções e parcerias. O 24/7 costuma ajudar a capturar venda quando ninguém está aberto.',
      },
      {
        question: 'Quais são os custos que mais pesam?',
        answer:
          'O investimento muda por modelo (kiosk/loja/container). No mês a mês, entra estoque/reposição, logística, internet, energia e manutenção/suporte. A proposta é deixar tudo previsível e fácil de escalar.',
      },
      {
        question: 'E segurança? E “quebra/quebra”?',
        answer:
          'Tem controle de acesso, monitoramento e registros (auditoria) no sistema. Pagamentos com PIX/cartão e conciliação. E manutenção preventiva pra reduzir parada.',
      },
      {
        question: 'Como eu entendo payback sem complicar?',
        answer:
          'É conta simples: investimento ÷ lucro líquido por mês. Ex.: se investir 25 mil e sobrar 2,5 mil/mês, payback ~ 10 meses. Na reunião a gente troca por números do seu ponto.',
      },
    ],
    []
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white font-['Inter'] overflow-x-hidden"
      style={{ position: 'relative' }}
    >
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img src={logoFastMarket} alt="FastMarket Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
            <div
              className="text-[#1F2937] text-lg sm:text-2xl"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontStyle: 'italic' }}
            >
              Fast<span style={{ fontWeight: 500 }}>Market</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="border border-gray-200 bg-white text-[#1F2937] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap hover:border-[#22C55E] hover:text-[#22C55E] inline-flex items-center gap-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              <ArrowLeft size={16} />
              Voltar
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#22C55E] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap hover:bg-[#1ea952] inline-flex items-center gap-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Falar com time
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative pt-14 sm:pt-16 pb-14 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-[#22C55E]/10 text-[#1ea952] px-4 py-2 rounded-full text-sm mb-5"
                >
                  <BarChart3 size={18} />
                  Números (bem simples)
                </motion.div>

                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F2937] leading-tight"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Simule retorno, payback e crescimento — sem economês
                </h1>
                <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed">
                  Escolha um cenário, o tamanho do espaço e o investimento. Depois, a gente faz a versão real com os dados do seu ponto.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#22C55E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1ea952] transition-all shadow-lg shadow-[#22C55E]/25"
                  >
                    Quero a projeção do meu ponto
                  </button>
                  <a
                    href="#kpis"
                    className="border border-gray-200 bg-white text-[#1F2937] px-6 py-3 rounded-full font-semibold hover:border-[#22C55E] hover:text-[#22C55E] transition-all text-center"
                  >
                    Ver números
                  </a>
                </div>

                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                  {[
                    { icon: <ShieldCheck size={18} className="text-[#22C55E]" />, text: 'Sem “mistério”: premissas explícitas' },
                    { icon: <LineChartIcon size={18} className="text-[#22C55E]" />, text: 'Cenários prontos (Seguro/Base/Acelerado)' },
                    { icon: <Receipt size={18} className="text-[#22C55E]" />, text: 'Conta simples de payback' },
                    { icon: <CheckCircle2 size={18} className="text-[#22C55E]" />, text: 'Depois viramos isso em proposta real' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-3">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#22C55E]/20 via-transparent to-[#FBBF24]/20 blur-2xl" />
                <div className="relative bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
                  <img
                    src={fastMarketStore}
                    alt="FastMarket - visão geral"
                    className="w-full h-56 sm:h-72 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[#1F2937]">O que você recebe nesta conversa</h2>
                    <ul className="mt-4 space-y-3 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="text-[#22C55E] mt-0.5" size={18} />
                        <span>Projeção de payback com premissas claras (fluxo, ticket, margem).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="text-[#22C55E] mt-0.5" size={18} />
                        <span>3 cenários (Seguro, Base, Acelerado) para você comparar.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="text-[#22C55E] mt-0.5" size={18} />
                        <span>Plano recomendado (Mini/Standard/Pro) e módulos opcionais.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kpis" className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">Números (projeção)</h2>
                <p className="text-gray-600 mt-2">Números para entender a conta. Na call, a gente troca por dados do seu ponto.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="border border-gray-200 bg-white text-[#1F2937] px-5 py-2.5 rounded-full font-semibold hover:border-[#22C55E] hover:text-[#22C55E] transition-all"
              >
                Pedir projeção real
              </button>
            </div>

            <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-5">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <div className="text-sm font-semibold text-[#1F2937]">Qual o tamanho do espaço?</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {spaces.map((sp) => {
                      const active = sp.key === spaceKey;
                      return (
                        <button
                          key={sp.key}
                          onClick={() => setSpaceKey(sp.key)}
                          className={
                            active
                              ? 'bg-[#22C55E] text-white px-4 py-2 rounded-full text-sm font-semibold'
                              : 'bg-gray-50 text-[#1F2937] px-4 py-2 rounded-full text-sm font-semibold border border-gray-100 hover:border-[#22C55E] hover:text-[#22C55E]'
                          }
                          title={sp.subtitle}
                        >
                          {sp.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 text-sm font-semibold text-[#1F2937]">Cenário</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {scenarios.map((s) => {
                      const active = s.key === scenarioKey;
                      return (
                        <button
                          key={s.key}
                          onClick={() => setScenarioKey(s.key)}
                          className={
                            active
                              ? 'bg-[#22C55E] text-white px-4 py-2 rounded-full text-sm font-semibold'
                              : 'bg-gray-50 text-[#1F2937] px-4 py-2 rounded-full text-sm font-semibold border border-gray-100 hover:border-[#22C55E] hover:text-[#22C55E]'
                          }
                          title={s.subtitle}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Quanto você tem disponível para investir?</div>
                  <div className="mt-1 text-2xl font-extrabold text-[#1F2937]">{formatBRL(capex)}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    Mínimo recomendado no plano <span className="font-semibold">{plan.label}</span>: {formatBRL(plan.investimentoMin)}.
                  </div>

                  <div className="mt-4">
                    <input
                      type="range"
                      min={plan.investimentoMin}
                      max={350000}
                      step={5000}
                      value={capex}
                      onChange={(e) => setCapex(Math.max(plan.investimentoMin, Number(e.target.value)))}
                      className="w-full"
                      aria-label="Investimento"
                    />
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>{formatBRL(plan.investimentoMin)}</span>
                      <span>{formatBRL(350000)}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="text-xs text-gray-500">Valor</label>
                    <input
                      type="number"
                      min={plan.investimentoMin}
                      step={1000}
                      value={capex}
                      onChange={(e) => setCapex(Math.max(plan.investimentoMin, Number(e.target.value || 0)))}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((kpi, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">{kpi.label}</div>
                    {kpi.icon}
                  </div>
                  <div className="mt-3 text-3xl font-extrabold text-[#1F2937]">
                    {typeof (kpi as any).formatter === 'function' ? (
                      <span>{(kpi as any).formatter(kpi.value)}</span>
                    ) : (
                      <>
                        <AnimatedCounter end={kpi.value} />
                        {kpi.suffix ? <span className="text-base font-bold text-gray-500 ml-1">{kpi.suffix}</span> : null}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="text-sm text-gray-500">Vendas/dia</div>
                <div className="mt-2 text-2xl font-extrabold text-[#1F2937]">{vendasDia}</div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="text-sm text-gray-500">Ticket médio</div>
                <div className="mt-2 text-2xl font-extrabold text-[#1F2937]">{formatBRL(ticketMedio)}</div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="text-sm text-gray-500">OPEX/mês</div>
                <div className="mt-2 text-2xl font-extrabold text-[#1F2937]">{formatBRL(opexMensal)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <LineChartIcon className="text-[#22C55E]" size={22} />
                  <h3 className="text-xl font-bold text-[#1F2937]">Evolução (12 meses)</h3>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  Nos primeiros meses o resultado costuma subir conforme o público cria hábito e o mix fica mais certeiro.
                </p>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projection} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="m" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                      <Tooltip formatter={(value: any) => formatBRL(Number(value))} />
                      <Legend />
                      <Line type="monotone" dataKey="receita" name="Receita (R$)" stroke="#22C55E" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="lucroLiquido" name="Lucro líquido (R$)" stroke="#FBBF24" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white rounded-2xl p-4 border border-gray-100">
                    <div className="text-gray-500">Alavanca 1</div>
                    <div className="mt-1 font-semibold text-[#1F2937]">Sortimento + reposição</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-gray-100">
                    <div className="text-gray-500">Alavanca 2</div>
                    <div className="mt-1 font-semibold text-[#1F2937]">Preço, campanhas e conveniência</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <HandCoins className="text-[#22C55E]" size={22} />
                  <h3 className="text-xl font-bold text-[#1F2937]">Payback por porte</h3>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  Comparativo rápido por tamanho do espaço. Na prática, muda por fluxo, ticket, mix e custos do local.
                </p>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={paybackBars} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="modelo" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip />
                      <Bar dataKey="meses" name="Meses" fill="#22C55E" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="text-sm font-semibold text-[#1F2937]">Caixa acumulado</div>
                    <div className="text-xs text-gray-500">Começa negativo (investimento) e vai somando o lucro mensal.</div>
                  </div>
                  <div className="mt-3 h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={cashflow} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="m" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                        <Tooltip formatter={(value: any) => formatBRL(Number(value))} />
                        <Line type="monotone" dataKey="acumulado" name="Acumulado (R$)" stroke="#1F2937" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-2xl p-4 border border-gray-100 text-sm text-gray-600">
                  <div className="font-semibold text-[#1F2937] mb-1">Regra prática</div>
                  <div>
                    Payback = I / L (investimento / lucro mensal). ROI anualizado = (L × 12) / I.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Receipt className="text-[#22C55E]" size={22} />
                <h3 className="text-xl font-bold text-[#1F2937]">De onde vem o resultado</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Quebra simples: CMV, OPEX e o que sobra de lucro — para ficar fácil de explicar.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip formatter={(v: any) => formatBRL(Number(v))} />
                      <Pie
                        data={unitEconomics}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {unitEconomics.map((item) => (
                    <div key={item.name} className="bg-white border border-gray-100 rounded-2xl p-5">
                      <div className="text-sm text-gray-500">{item.name}</div>
                      <div className="mt-2 text-2xl font-extrabold" style={{ color: item.fill as string }}>
                        {formatBRL(item.value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#1F2937]">Planos (Mini / Standard / Pro)</h3>
                <p className="text-gray-600 mt-2">
                  Escolha um pacote e depois adicione módulos conforme necessidade. Sem pegadinha: o que muda é escala e profundidade de gestão.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((p) => {
                    const active = p.key === planKey;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setPlanKey(p.key)}
                        className={
                          active
                            ? 'text-left bg-white border-2 border-[#22C55E] rounded-3xl p-5 shadow-sm'
                            : 'text-left bg-gray-50 border border-gray-100 rounded-3xl p-5 hover:border-[#22C55E] transition-all'
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-extrabold text-[#1F2937]">{p.label}</div>
                          <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#1ea952]">
                            a partir de {formatBRL(p.investimentoMin)}
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">{p.bestFor}</div>
                        <div className="mt-4 text-sm font-semibold text-[#1F2937]">Inclui</div>
                        <ul className="mt-2 space-y-2 text-sm text-gray-600">
                          {p.includes.slice(0, 4).map((it) => (
                            <li key={it} className="flex items-start gap-2">
                              <CheckCircle2 size={16} className="text-[#22C55E] mt-0.5" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 text-sm font-semibold text-[#1F2937]">Módulos adicionais</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {p.addOns.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1 rounded-full bg-white border border-gray-100 text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-bold text-[#1F2937]">6 coisas que você pode ter no projeto</h4>
                  <p className="text-gray-600 text-sm mt-2">Tudo em formato de módulo (você liga/desliga conforme sua operação).</p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        icon: <CreditCard size={18} className="text-[#22C55E]" />,
                        title: 'Pagamentos (PIX/cartão)',
                        desc: 'Venda sem caixa e com conciliação simples.',
                      },
                      {
                        icon: <BarChart3 size={18} className="text-[#22C55E]" />,
                        title: 'Dashboard em tempo real',
                        desc: 'Vendas, estoque, alertas e relatórios para decisão rápida.',
                      },
                      {
                        icon: <Boxes size={18} className="text-[#22C55E]" />,
                        title: 'Estoque inteligente',
                        desc: 'Alerta de reposição, curva ABC e mix recomendado.',
                      },
                      {
                        icon: <ShieldCheck size={18} className="text-[#22C55E]" />,
                        title: 'Controle e auditoria',
                        desc: 'Registros e trilhas para reduzir perdas e dar previsibilidade.',
                      },
                      {
                        icon: <BadgeDollarSign size={18} className="text-[#22C55E]" />,
                        title: 'Mídia / totem (receita extra)',
                        desc: 'Monetize tela e ajude o retorno do projeto.',
                      },
                      {
                        icon: <Shield size={18} className="text-[#22C55E]" />,
                        title: 'Suporte e manutenção',
                        desc: 'Rotina preventiva e time para manter a operação rodando.',
                      },
                    ].map((item) => (
                      <div key={item.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                        <div className="flex items-center gap-2 font-semibold text-[#1F2937]">
                          {item.icon}
                          {item.title}
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#22C55E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1ea952] transition-all"
                  >
                    Quero ver proposta
                  </button>
                  <a
                    href="#faq"
                    className="border border-gray-200 bg-white text-[#1F2937] px-6 py-3 rounded-full font-semibold hover:border-[#22C55E] hover:text-[#22C55E] transition-all text-center"
                  >
                    Ver perguntas difíceis
                  </a>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                <img
                  src={fastMarketKiosks}
                  alt="Modelos FastMarket"
                  className="w-full h-40 object-cover rounded-2xl"
                />
                <h4 className="mt-5 text-lg font-bold text-[#1F2937]">Checklist do comitê</h4>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  {[
                    { icon: <CheckCircle2 size={18} className="text-[#22C55E]" />, text: 'Fluxo e ticket esperados' },
                    { icon: <CheckCircle2 size={18} className="text-[#22C55E]" />, text: 'Mix + margem (GM%)' },
                    { icon: <CheckCircle2 size={18} className="text-[#22C55E]" />, text: 'CAPEX vs OPEX' },
                    { icon: <CheckCircle2 size={18} className="text-[#22C55E]" />, text: 'Operação e reposição' },
                    { icon: <CheckCircle2 size={18} className="text-[#22C55E]" />, text: 'Risco e mitigação' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      {item.icon}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-[#22C55E]/10 text-[#1ea952] px-4 py-2 rounded-full text-sm mb-4">
                <ShieldCheck size={18} />
                Perguntas capciosas (e respostas)
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">Objeções típicas de investimento</h2>
              <p className="text-gray-600 mt-3">
                Sem enrolação: premissas, riscos e o que dá pra controlar na operação.
              </p>
            </div>

            <div className="mt-10">
              <FinanceFAQAccordion items={faqItems} />
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-[#22C55E] to-[#1ea952] rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_30%_30%,white,transparent_55%)]" />
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                    Quer levar isso para o seu comitê com dados reais?
                  </h2>
                  <p className="mt-4 text-white/90">
                    A gente monta um PDF/planilha com premissas do seu ponto e recomenda o modelo ideal.
                  </p>
                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-white text-[#1F2937] px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
                    >
                      Agendar call
                    </button>
                    <Link
                      to="/"
                      className="border border-white/30 bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/15 transition-all text-center"
                    >
                      Ver a landing principal
                    </Link>
                  </div>
                </div>

                <div className="bg-white/10 border border-white/15 rounded-3xl p-6">
                  <div className="flex items-center gap-2 font-semibold">
                    <ShieldCheck size={18} />
                    O que você precisa enviar
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-white/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5" />
                      Fluxo estimado (dia/semana) e perfil do público
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5" />
                      Área disponível e restrições (energia, internet)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5" />
                      Preferência de operação (própria vs parceria)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton />

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
