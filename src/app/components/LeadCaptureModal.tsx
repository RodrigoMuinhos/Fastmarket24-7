import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Building2, Briefcase, Home, Hospital, Users } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(20);

  const businessTypes = [
    { value: 'condominio', label: 'Condomínio', icon: Building2 },
    { value: 'empresa', label: 'Empresa', icon: Briefcase },
    { value: 'clinica', label: 'Clínica/Hospital', icon: Hospital },
    { value: 'corporativo', label: 'Espaço Corporativo', icon: Home },
    { value: 'investidor', label: 'Investidor', icon: Users }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular envio (aqui você integraria com seu backend ou serviço de email)
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Lead capturado:', formData);
    
    setIsLoading(false);
    setIsSubmitted(true);
    setCountdown(20);

    // Contagem regressiva
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', businessType: '' });
          onClose();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Máscara para telefone
    if (name === 'phone') {
      let formattedPhone = value.replace(/\D/g, '');
      
      if (formattedPhone.length <= 11) {
        formattedPhone = formattedPhone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        formattedPhone = formattedPhone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        formattedPhone = formattedPhone.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        formattedPhone = formattedPhone.replace(/^(\d*)/, '($1');
      }
      
      setFormData({ ...formData, phone: formattedPhone });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const selectBusinessType = (type: string) => {
    setFormData({ ...formData, businessType: type });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="p-8 md:p-12">
                {!isSubmitted ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-[#22C55E] rounded-2xl mb-4"
                      >
                        <Building2 className="text-white" size={32} />
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-3">
                        Vamos começar!
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Preencha seus dados e nossa equipe entrará em contato em até 24h
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                          Nome completo *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#22C55E] focus:outline-none transition-colors text-[#1F2937]"
                          placeholder="Seu nome"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                          Email profissional *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#22C55E] focus:outline-none transition-colors text-[#1F2937]"
                          placeholder="seu@email.com"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                          Telefone/WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#22C55E] focus:outline-none transition-colors text-[#1F2937]"
                          placeholder="(11) 99999-9999"
                        />
                      </div>

                      {/* Business Type */}
                      <div>
                        <label className="block text-sm font-semibold text-[#1F2937] mb-3">
                          Tipo de espaço *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {businessTypes.map((type) => (
                            <motion.button
                              key={type.value}
                              type="button"
                              onClick={() => selectBusinessType(type.value)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`p-4 rounded-xl border-2 transition-all text-center ${
                                formData.businessType === type.value
                                  ? 'border-[#22C55E]'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              style={formData.businessType === type.value ? { backgroundColor: 'rgba(34, 197, 94, 0.1)' } : {}}
                            >
                              <type.icon
                                className={`mx-auto mb-2 ${
                                  formData.businessType === type.value
                                    ? 'text-[#22C55E]'
                                    : 'text-gray-400'
                                }`}
                                size={24}
                              />
                              <span className="text-sm font-medium text-[#1F2937]">
                                {type.label}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isLoading || !formData.businessType}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#22C55E] text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-[#22C55E]/30 hover:bg-[#1ea952] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Enviando...
                          </span>
                        ) : (
                          'Quero receber contato'
                        )}
                      </motion.button>

                      <p className="text-xs text-gray-500 text-center">
                        Ao enviar, você concorda com nossa política de privacidade
                      </p>
                    </form>
                  </>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="inline-block mb-6"
                    >
                      <CheckCircle2 className="text-[#22C55E]" size={80} />
                    </motion.div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
                      Recebemos seu cadastro!
                    </h3>
                    
                    <div className="rounded-2xl p-6 mb-6" style={{ background: 'linear-gradient(to bottom right, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))' }}>
                      <p className="text-lg text-[#1F2937] mb-3">
                        Olá, <span className="font-bold text-[#22C55E]">{formData.name}</span>! 👋
                      </p>
                      <p className="text-gray-700 mb-2">
                        Seu planejamento personalizado está sendo preparado.
                      </p>
                      <p className="text-gray-700">
                        Em breve, um especialista FastMarket entrará em contato via <span className="font-semibold text-[#22C55E]">WhatsApp ou email</span> para agendar sua consultoria.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                      <p>Fechando automaticamente em <span className="font-bold text-[#22C55E]">{countdown}s</span></p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}