import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Quanto tempo leva para implantar um FastMarket?',
    answer: 'O processo completo leva de 30 a 60 dias, incluindo planejamento, instalação e treinamento. Trabalhamos com cronograma personalizado para cada cliente.'
  },
  {
    question: 'Preciso ter funcionários para operar o FastMarket?',
    answer: 'Não! O FastMarket é 100% autônomo. A operação funciona 24/7 sem necessidade de funcionários. Nosso sistema de gestão cuida de tudo automaticamente.'
  },
  {
    question: 'Qual o investimento inicial necessário?',
    answer: 'O investimento varia conforme o modelo escolhido (loja interna, container, kiosks). Nossa equipe comercial faz uma análise personalizada e apresenta a melhor solução para seu espaço e orçamento.'
  },
  {
    question: 'Como funciona a gestão de estoque?',
    answer: 'Nosso sistema inteligente monitora o estoque em tempo real, gera alertas automáticos de reposição e fornece relatórios detalhados de vendas. Você acompanha tudo pelo dashboard online.'
  },
  {
    question: 'Qual o retorno sobre investimento (ROI)?',
    answer: 'O ROI médio varia entre 18 a 24 meses, dependendo do modelo e localização. Temos cases de clientes que alcançaram breakeven em menos de 12 meses.'
  },
  {
    question: 'O FastMarket oferece suporte técnico?',
    answer: 'Sim! Oferecemos suporte técnico dedicado 24/7, manutenção preventiva, atualizações de software e equipe sempre disponível para qualquer necessidade.'
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'O sistema aceita todas as principais formas: cartão de crédito/débito (Visa, Master, Elo), PIX, carteiras digitais e pagamentos por aproximação (NFC).'
  },
  {
    question: 'Posso personalizar os produtos vendidos?',
    answer: 'Absolutamente! Trabalhamos juntos para definir o mix de produtos ideal para seu público. Você pode incluir itens específicos e ajustar conforme demanda.'
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-[#22C55E] transition-all"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
          >
            <span className="text-lg font-semibold text-[#1F2937] pr-8 group-hover:text-[#22C55E] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              {openIndex === index ? (
                <Minus className="text-[#22C55E]" size={24} />
              ) : (
                <Plus className="text-gray-400 group-hover:text-[#22C55E] transition-colors" size={24} />
              )}
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
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
