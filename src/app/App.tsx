import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Check, ShoppingCart, CreditCard, Package, TrendingUp, Building2, Users, Home, Hospital, Briefcase, Sparkles, Zap, BarChart3, Clock, Instagram, Mail, Phone, Monitor, Smartphone, Tv, X } from 'lucide-react';
import logoFastMarket from '@/assets/cd53d06e3e768b5e2fb1c878a0f946e1d3655847.png';
import fastMarketStore from '@/assets/4e4ffbb8fbf98e9dc91f47a200a552c791755bae.png';
import fastMarketKiosks from '@/assets/aea5dc839fdf3fe488d0fe100d5373e95f46229e.png';
import fastMarketContainer from '@/assets/4f8cd4a94f0a0df8de10cc4abb7edcf87facc8fe.png';
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal';
import { ScrollProgressBar } from '@/app/components/ScrollProgressBar';
import { AnimatedCounter } from '@/app/components/AnimatedCounter';
import { TestimonialsCarousel } from '@/app/components/TestimonialsCarousel';
import { FAQAccordion } from '@/app/components/FAQAccordion';
import { LogosMarquee } from '@/app/components/LogosMarquee';
import { VideoPlayer } from '@/app/components/VideoPlayer';
import { ParallaxSection } from '@/app/components/ParallaxSection';
import { RevealOnScroll } from '@/app/components/RevealOnScroll';

export default function App() {
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL ?? 'https://www.instagram.com/fastmarket.io/';
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL ?? 'contato@fastmarket.io';
  const contactPhoneE164 = import.meta.env.VITE_CONTACT_PHONE_E164 ?? '+5511999999999';

  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const howItWorksRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white font-['Inter'] overflow-x-hidden" style={{ position: 'relative' }}>
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Floating Nav */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          >
            <motion.img 
              src={logoFastMarket}
              alt="FastMarket Logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            />
            <div className="text-[#1F2937] text-lg sm:text-2xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontStyle: 'italic' }}>
              Fast<span style={{ fontWeight: 500 }}>Market</span>
            </div>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#1ea952' }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#22C55E] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            onClick={openModal}
          >
            Falar com time
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
          />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 text-[#22C55E] px-6 py-3 rounded-full mb-8"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
            >
              <Sparkles size={20} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                O futuro do varejo autônomo
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 text-[#1F2937] leading-tight px-4" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              Conveniência
              <br />
              <span className="text-[#22C55E]">inteligente 24h</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4 text-gray-600 max-w-3xl mx-auto leading-relaxed px-4" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              Mais do que uma loja de conveniência digital.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-12 sm:mb-16 text-gray-600 max-w-3xl mx-auto leading-relaxed px-4" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              Uma <span className="text-[#22C55E] font-semibold">solução completa</span> para criar mercados autônomos, inteligentes e lucrativos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-20 px-4"
            >
              <motion.button 
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: "0 25px 50px rgba(34, 197, 94, 0.4)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-[#22C55E] text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full text-base sm:text-lg md:text-xl transition-all shadow-2xl shadow-[#22C55E]/40 hover:shadow-[#22C55E]/60" 
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                onClick={openModal}
              >
                Solicite seu planejamento
              </motion.button>
              <motion.button 
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: '#f3f4f6',
                  borderColor: '#22C55E',
                  y: -3
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border-2 border-gray-200 text-[#1F2937] px-8 sm:px-10 py-4 sm:py-6 rounded-full text-base sm:text-lg transition-all shadow-lg hover:shadow-xl" 
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                onClick={scrollToHowItWorks}
              >
                Ver como funciona
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-3xl mx-auto px-4"
            >
              <motion.div 
                whileHover={{ scale: 1.1, y: -10 }}
                className="text-center cursor-pointer"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#22C55E] mb-2 sm:mb-3">24/7</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Disponível</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, y: -10 }}
                className="text-center cursor-pointer"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#22C55E] mb-2 sm:mb-3">&lt;1min</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Por compra</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, y: -10 }}
                className="text-center cursor-pointer"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#22C55E] mb-2 sm:mb-3">100%</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Autônomo</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#22C55E] rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Video Demo Section - MOVED TO TOP */}
      <section className="py-20 sm:py-32 md:py-40 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RevealOnScroll direction="up" className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mb-6 sm:mb-8"
            >
              <div className="bg-[#22C55E] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold shadow-lg shadow-[#22C55E]/30">
                🎬 Demonstração ao vivo
              </div>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 sm:mb-8 text-[#1F2937] leading-tight px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Veja como é <span className="text-[#22C55E]">simples e rápido</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Assista uma demonstração completa do FastMarket em funcionamento
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="scale" delay={0.3} className="max-w-5xl mx-auto">
            <VideoPlayer />
          </RevealOnScroll>
        </div>
      </section>

      {/* What is FastMarket - Animated Cards */}
      <section className="relative py-20 sm:py-32 md:py-40 lg:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-20"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 text-[#1F2937] px-4" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              O que é o <span className="text-[#22C55E]">FastMarket</span>?
            </motion.h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              O FastMarket é uma <span className="text-[#22C55E] font-semibold">plataforma de mercados autônomos</span>, que une tecnologia, planejamento e gestão para transformar espaços em operações de conveniência inteligentes.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildren}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              { icon: Zap, title: 'Tecnologia de ponta', desc: 'Sistema inteligente de gestão automática' },
              { icon: BarChart3, title: 'Planejamento estratégico', desc: 'Análise personalizada do seu espaço' },
              { icon: Clock, title: 'Gestão 24/7', desc: 'Operação contínua sem intervenção' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
                className="bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-100 transition-all cursor-pointer group"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-[#22C55E] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:shadow-lg group-hover:shadow-[#22C55E]/30"
                >
                  <feature.icon className="text-white" size={28} />
                </motion.div>
                <h3 className="text-xl sm:text-2xl mb-2 sm:mb-3 text-[#1F2937] group-hover:text-[#22C55E] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visual Gallery - Real FastMarket Photos */}
      <section className="relative py-20 sm:py-32 md:py-40 lg:py-48 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #22C55E 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mb-6"
            >
              <div className="bg-[#22C55E] text-white px-6 py-2 rounded-full text-sm font-semibold">
                ✨ Veja o FastMarket em ação
              </div>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-[#1F2937] px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Conheça nossos <span className="text-[#22C55E]">mercados autônomos</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Tecnologia de ponta, design moderno e experiência perfeita para seus clientes
            </p>
          </motion.div>

          {/* Photo Grid */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto"
          >
            {/* Photo 1 - Store Interior */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -10 }}
              className="group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <motion.img 
                  src={fastMarketStore}
                  alt="FastMarket - Loja Completa 24h"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 p-8 text-white"
                >
                  <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Loja Completa 24h
                  </h3>
                  <p className="text-lg text-gray-200" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    Produtos frescos, bebidas e snacks sempre disponíveis
                  </p>
                </motion.div>
              </div>
              
              {/* Badge */}
              <div className="absolute top-6 left-6 bg-[#22C55E] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                🏪 Lojas Internas
              </div>
            </motion.div>

            {/* Photo 2 - Kiosks */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -10 }}
              className="group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <motion.img 
                  src={fastMarketKiosks}
                  alt="FastMarket - Caixas Rápidos Inteligentes"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 p-8 text-white"
                >
                  <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Caixas Rápidos
                  </h3>
                  <p className="text-lg text-gray-200" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    Checkout automático em menos de 1 minuto
                  </p>
                </motion.div>
              </div>
              
              {/* Badge */}
              <div className="absolute top-6 left-6 bg-[#FBBF24] text-[#1F2937] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                ⚡ Tecnologia
              </div>
            </motion.div>

            {/* Photo 3 - Container (Full Width) */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -10 }}
              className="md:col-span-2 group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            >
              <div className="relative aspect-[21/9] overflow-hidden">
                <motion.img 
                  src={fastMarketContainer}
                  alt="FastMarket - Container em Condomínio"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 p-10 text-white"
                >
                  <h3 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Containers para Condomínios
                  </h3>
                  <p className="text-xl text-gray-200 max-w-3xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    Solução modular completa para áreas externas, com design premium e instalação rápida
                  </p>
                </motion.div>
              </div>
              
              {/* Badge */}
              <div className="absolute top-6 left-6 bg-white text-[#22C55E] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                🏢 Condomínios
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Below Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <p className="text-xl text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Pronto para ter um FastMarket no seu espaço?
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#22C55E] text-white px-10 py-5 rounded-full text-lg transition-all shadow-lg shadow-[#22C55E]/30" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              onClick={openModal}
            >
              Falar com especialista
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Not Just a Store - Immersive Dark Section */}
      <section className="relative bg-[#1F2937] py-20 sm:py-32 md:py-40 lg:py-48 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#22C55E 1px, transparent 1px), linear-gradient(90deg, #22C55E 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mb-8"
            >
              <div className="bg-[#22C55E] text-white px-6 py-2 rounded-full text-sm font-semibold">
                Muito além de uma loja
              </div>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 text-white px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Não é apenas uma loja de conveniência.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-8 sm:mb-12 px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              O FastMarket é uma <span className="text-[#22C55E] font-semibold">solução estratégica</span> de integração de mercadinhos pela cidade, conectando tecnologia, operação e rentabilidade.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-12 px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Atuamos desde o passo zero até a operação rodando, ajudando nossos parceiros a:
            </p>

            {/* Animated Benefits Grid */}
            <motion.div 
              variants={staggerChildren}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto px-4"
            >
              {[
                'Otimizar espaço',
                'Aumentar margem',
                'Reduzir custos',
                'Escalar resultados'
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                  className="flex items-center gap-3 sm:gap-4 bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 transition-all cursor-pointer group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Check className="text-[#22C55E] flex-shrink-0" size={24} />
                  </motion.div>
                  <span className="text-base sm:text-lg text-white group-hover:text-[#22C55E] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it Works - Interactive Timeline */}
      <section className="py-20 sm:py-32 md:py-40 lg:py-48 bg-gradient-to-b from-white to-gray-50" ref={howItWorksRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-[#1F2937] px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Como funciona <span className="text-[#22C55E]">na prática</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">Processo simples e rápido</p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildren}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 max-w-6xl mx-auto"
          >
            {[
              { icon: ShoppingCart, text: 'Cliente toca na tela', color: '#22C55E' },
              { icon: Package, text: 'Escolhe os produtos', color: '#22C55E' },
              { icon: Check, text: 'Confirma o carrinho', color: '#22C55E' },
              { icon: CreditCard, text: 'Realiza o pagamento', color: '#22C55E' },
              { icon: ShoppingCart, text: 'Retira os itens', color: '#FBBF24' }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -15, scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="relative bg-gradient-to-br from-[#22C55E] to-[#1ea952] w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#22C55E]/30 group-hover:shadow-2xl group-hover:shadow-[#22C55E]/50 transition-all"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon className="text-white" size={40} />
                  <div className="absolute -top-2 -right-2 bg-white text-[#22C55E] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {idx + 1}
                  </div>
                </motion.div>
                <p className="text-[#1F2937] group-hover:text-[#22C55E] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {step.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-2xl text-[#22C55E] mt-16 font-bold"
          >
            ⚡ Tudo em menos de 1 minuto. Sem filas.
          </motion.p>
        </div>
      </section>

      {/* Our Strategy - Bento Grid */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-[#1F2937] leading-tight px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Nossa estratégia vai <span className="text-[#22C55E]">além da tecnologia</span>
            </h2>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              { title: 'Planejamento personalizado', desc: 'Análise completa do seu espaço e público' },
              { title: 'Implantação completa', desc: 'Do projeto à operação funcionando' },
              { title: 'Gestão inteligente', desc: 'Controle total em tempo real' },
              { title: 'Operação automática 24h', desc: 'Sem intervenção humana necessária' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-[#22C55E]/5 p-6 sm:p-8 rounded-3xl border-2 border-gray-100 hover:border-[#22C55E] transition-all cursor-pointer group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(to bottom right, rgba(34, 197, 94, 0), rgba(34, 197, 94, 0.1))' }}
                />
                <div className="relative z-10">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="text-[#22C55E] mb-6"
                  >
                    <Check size={36} strokeWidth={3} />
                  </motion.div>
                  <h3 className="text-xl mb-3 text-[#1F2937] group-hover:text-[#22C55E] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-xl text-gray-600 mt-16"
          >
            Cada FastMarket é pensado para <span className="text-[#22C55E] font-bold">maximizar lucro</span> e <span className="text-[#FBBF24] font-bold">acelerar retorno</span>.
          </motion.p>
        </div>
      </section>

      {/* Gallery Section - Store Sizes */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="inline-flex items-center gap-2 text-[#22C55E] px-5 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
            >
              <Package size={20} strokeWidth={2.5} />
              <span className="font-semibold text-sm">Nossas Lojas</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-[#1F2937]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Do <span className="text-[#22C55E]">compacto</span> ao <span className="text-[#22C55E]">completo</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              FastMarket se adapta ao seu espaço: <span className="font-semibold text-[#1F2937]">pequeno, médio ou grande</span>. Tecnologia de ponta em qualquer formato.
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { 
                image: 'https://images.unsplash.com/photo-1586505093219-61053591c8d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW5kaW5nJTIwbWFjaGluZSUyMHJvb218ZW58MXx8fHwxNzY5MDAzMzgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
                title: 'FastMarket Compacto',
                description: '2-5m² • Ideal para halls',
                size: 'small'
              },
              { 
                image: 'https://images.unsplash.com/photo-1759163738323-671a50983861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMHJldGFpbCUyMGtpb3NrfGVufDF8fHx8MTc2OTAwMzM4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
                title: 'FastMarket Express',
                description: '8-15m² • Para empresas',
                size: 'medium'
              },
              { 
                image: 'https://images.unsplash.com/photo-1764795849694-34b3316b3de4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0ZWQlMjBzdG9yZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY5MDAzMzg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
                title: 'FastMarket Tech',
                description: '15-40m² • Alta tecnologia',
                size: 'medium'
              },
              { 
                image: 'https://images.unsplash.com/photo-1759153820384-12c9ddf8bd8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb252ZW5pZW5jZSUyMHN0b3JlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4OTgxMjkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
                title: 'FastMarket Premium',
                description: '40m²+ • Solução completa',
                size: 'large'
              }
            ].map((store, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                onClick={() => setSelectedStore(idx)}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                whileHover={{ y: -10 }}
              >
                {/* Image */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <motion.img
                    src={store.image}
                    alt={store.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-[#1F2937]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  {/* Size Badge */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-bold ${
                      store.size === 'small' ? 'bg-[#FBBF24] text-[#1F2937]' :
                      store.size === 'medium' ? 'bg-[#22C55E] text-white' :
                      'bg-[#1F2937] text-white border-2 border-[#22C55E]'
                    }`}
                  >
                    {store.size === 'small' ? 'COMPACTO' : store.size === 'medium' ? 'MÉDIO' : 'GRANDE'}
                  </motion.div>

                  {/* Click Hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-4 right-4 bg-[#22C55E] text-white px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    Clique para ver opções
                  </motion.div>
                </div>

                {/* Info */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    {store.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    <Check size={18} className="text-[#22C55E] flex-shrink-0" strokeWidth={3} />
                    {store.description}
                  </p>
                </motion.div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-4 border-[#22C55E] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl sm:rounded-3xl pointer-events-none"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12 sm:mt-16"
          >
            <p className="text-lg sm:text-xl text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Não sabe qual tamanho escolher? <span className="font-bold text-[#22C55E]">Nós ajudamos você!</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="bg-[#22C55E] text-white px-8 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg shadow-xl shadow-[#22C55E]/30 hover:bg-[#1ea952] transition-all"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              Fale com um especialista
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* For Whom - Icon Grid */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-[#1F2937] leading-tight px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Para quem o FastMarket é <span className="text-[#22C55E]">ideal</span>
            </h2>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto"
          >
            {[
              { icon: Building2, text: 'Condomínios' },
              { icon: Briefcase, text: 'Empresas' },
              { icon: Hospital, text: 'Clínicas e hospitais' },
              { icon: Home, text: 'Espaços corporativos' },
              { icon: Users, text: 'Investidores e empreendedores' }
            ].map((target, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -15, scale: 1.1 }}
                className="text-center group cursor-pointer"
              >
                <motion.div 
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#22C55E] transition-all shadow-lg group-hover:shadow-2xl"
                  style={{ background: 'linear-gradient(to bottom right, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))' }}
                >
                  <target.icon className="text-[#1F2937] group-hover:text-white transition-colors w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11" />
                </motion.div>
                <p className="text-[#1F2937] group-hover:text-[#22C55E] transition-colors font-medium" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  {target.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Benefits - Animated List */}
      <section className="py-20 sm:py-32" style={{ background: 'linear-gradient(to bottom right, rgba(34, 197, 94, 0.05), white, rgba(251, 191, 36, 0.05))' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-[#1F2937] px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Benefícios do modelo <span className="text-[#22C55E]">FastMarket</span>
            </h2>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildren}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
          >
            {[
              { icon: Clock, text: 'Operação 24h, sem funcionários', color: '#22C55E' },
              { icon: TrendingUp, text: 'Redução de custos operacionais', color: '#22C55E' },
              { icon: BarChart3, text: 'Controle total de vendas', color: '#22C55E' },
              { icon: Package, text: 'Estoque inteligente', color: '#22C55E' },
              { icon: Zap, text: 'Retorno rápido e escalável', color: '#22C55E' },
              { icon: TrendingUp, text: 'Rentabilidade comprovada', color: '#FBBF24' }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="flex items-center gap-4 bg-white p-5 sm:p-6 rounded-2xl border-2 border-gray-100 hover:border-[#22C55E] transition-all cursor-pointer group"
              >
                <div className="flex-shrink-0">
                  <benefit.icon className="text-[#22C55E] group-hover:text-[#1ea952] transition-colors" size={24} strokeWidth={2.5} />
                </div>
                <span className="text-base sm:text-lg text-[#1F2937] group-hover:text-[#22C55E] transition-colors leading-snug" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Immersive */}
      <section className="relative bg-gradient-to-br from-[#1F2937] via-[#1F2937] to-[#22C55E]/20 py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-[#22C55E]/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-[#FBBF24]/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 bg-[#22C55E] text-white px-6 py-3 rounded-full mb-8"
            >
              <Sparkles size={20} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Junte-se à revolução do varejo
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 text-white leading-tight px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Faça parte do <span className="text-[#22C55E]">futuro do varejo</span>
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-10 sm:mb-12 leading-relaxed px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Leve o FastMarket para seu espaço com um projeto <span className="text-[#22C55E] font-semibold">sob medida</span>, inteligente e rentável.
            </p>

            <motion.button 
              whileHover={{ scale: 1.1, boxShadow: "0 30px 60px rgba(34, 197, 94, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-[#22C55E] text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full text-base sm:text-xl transition-all shadow-2xl shadow-[#22C55E]/40" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              onClick={openModal}
            >
              🟢 Fale com nosso time agora
            </motion.button>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 mt-16 text-gray-400 text-sm"
            >
              <div className="flex items-center gap-2">
                <Check size={16} className="text-[#22C55E]" />
                <span>Setup completo incluído</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-[#22C55E]" />
                <span>Suporte dedicado</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-[#22C55E]" />
                <span>ROI garantido</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mb-6"
            >
              <div className="bg-[#22C55E] text-white px-6 py-2 rounded-full text-sm font-semibold">
                ⭐ Depoimentos de clientes
              </div>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-[#1F2937] leading-tight px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              O que nossos <span className="text-[#22C55E]">parceiros dizem</span>
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Centenas de clientes satisfeitos em todo Brasil
            </p>
          </motion.div>

          <TestimonialsCarousel />

          {/* Stats Grid */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto mt-20"
          >
            {[
              { end: 50, suffix: '+', label: 'Unidades ativas', icon: Building2, color: '#22C55E', bgGradient: 'from-[#22C55E]/5 to-white' },
              { end: 99, suffix: '%', label: 'Satisfação', icon: TrendingUp, color: '#22C55E', bgGradient: 'from-[#22C55E]/5 to-white' },
              { end: 24, suffix: 'h', label: 'Disponibilidade', icon: Clock, color: '#22C55E', bgGradient: 'from-[#22C55E]/5 to-white' },
              { end: 18, suffix: ' meses', label: 'ROI médio', icon: BarChart3, color: '#FBBF24', bgGradient: 'from-[#FBBF24]/5 to-white' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`relative text-center p-5 sm:p-6 rounded-3xl bg-gradient-to-br ${stat.bgGradient} border-2 border-gray-100 hover:border-[${stat.color}] transition-all cursor-pointer group overflow-hidden shadow-lg hover:shadow-2xl`}
              >
                {/* Background Glow Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.color}15 0%, transparent 70%)`
                  }}
                />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-3 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon 
                      size={22} 
                      style={{ color: stat.color }}
                      strokeWidth={2.5}
                    />
                  </motion.div>

                  {/* Number */}
                  <div 
                    className="text-3xl sm:text-4xl font-bold mb-2 group-hover:scale-105 transition-transform" 
                    style={{ color: stat.color, fontFamily: 'Inter, sans-serif' }}
                  >
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2.5} />
                  </div>

                  {/* Label */}
                  <p 
                    className="text-gray-600 text-xs sm:text-sm font-medium leading-tight" 
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Logos Marquee - Client Trust */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll direction="up">
            <p className="text-center text-gray-500 text-sm font-semibold mb-8 tracking-wide uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
              Empresas que confiam no FastMarket
            </p>
          </RevealOnScroll>
          <LogosMarquee />
        </div>
      </section>

      {/* Parallax Technology Section */}
      <ParallaxSection />

      {/* FAQ Section */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mb-6"
            >
              <div className="bg-[#22C55E] text-white px-6 py-2 rounded-full text-sm font-semibold">
                ❓ Perguntas frequentes
              </div>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-[#1F2937] leading-tight px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Tire suas <span className="text-[#22C55E]">dúvidas</span>
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Respostas para as perguntas mais comuns sobre o FastMarket
            </p>
          </motion.div>

          <FAQAccordion />

          {/* CTA Below FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <p className="text-xl text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Não encontrou sua resposta?
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#22C55E] text-white px-10 py-5 rounded-full text-lg transition-all shadow-lg shadow-[#22C55E]/30" 
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              onClick={openModal}
            >
              Fale com nossa equipe
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2937] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <img 
                src={logoFastMarket}
                alt="FastMarket Logo"
                className="w-12 h-12"
              />
              <div>
                <div className="text-white text-3xl mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontStyle: 'italic' }}>
                  Fast<span style={{ fontWeight: 500 }}>Market</span>
                </div>
                <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  Conveniência inteligente 24h
                </p>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center gap-4"
            >
              <motion.a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, backgroundColor: '#22C55E' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm w-14 h-14 rounded-2xl flex items-center justify-center transition-all hover:shadow-lg hover:shadow-[#22C55E]/30 group"
              >
                <Instagram className="text-gray-300 group-hover:text-white transition-colors" size={24} />
              </motion.a>

              <motion.a
                href={`mailto:${contactEmail}`}
                whileHover={{ scale: 1.15, backgroundColor: '#22C55E' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm w-14 h-14 rounded-2xl flex items-center justify-center transition-all hover:shadow-lg hover:shadow-[#22C55E]/30 group"
              >
                <Mail className="text-gray-300 group-hover:text-white transition-colors" size={24} />
              </motion.a>

              <motion.a
                href={`tel:${contactPhoneE164}`}
                whileHover={{ scale: 1.15, backgroundColor: '#22C55E' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm w-14 h-14 rounded-2xl flex items-center justify-center transition-all hover:shadow-lg hover:shadow-[#22C55E]/30 group"
              >
                <Phone className="text-gray-300 group-hover:text-white transition-colors" size={24} />
              </motion.a>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center md:text-right"
            >
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                © 2026 FastMarket
              </p>
              <p className="text-gray-500 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                Todos os direitos reservados
              </p>
            </motion.div>
          </div>

          {/* Bottom Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
          >
            <motion.a 
              whileHover={{ color: '#22C55E' }}
              className="transition-colors cursor-pointer"
              href="#"
            >
              Privacidade
            </motion.a>
            <span className="text-gray-600">|</span>
            <motion.a 
              whileHover={{ color: '#22C55E' }}
              className="transition-colors cursor-pointer"
              href="#"
            >
              Termos de Uso
            </motion.a>
            <span className="text-gray-600">|</span>
            <motion.a 
              whileHover={{ color: '#22C55E' }}
              className="transition-colors cursor-pointer"
              href="#"
            >
              FAQ
            </motion.a>
          </motion.div>
        </div>
      </footer>

      {/* Lead Capture Modal */}
      <LeadCaptureModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Technology Options Modal */}
      <AnimatePresence>
        {selectedStore !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStore(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full relative max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedStore(null)}
                  className="absolute top-6 right-6 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>

                {/* Content */}
                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="text-center mb-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="inline-flex items-center gap-2 text-[#22C55E] px-5 py-2 rounded-full mb-4"
                      style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                    >
                      <Monitor size={20} strokeWidth={2.5} />
                      <span className="font-semibold text-sm">Opções de Tecnologia</span>
                    </motion.div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                      {['FastMarket Compacto', 'FastMarket Express', 'FastMarket Tech', 'FastMarket Premium'][selectedStore]}
                    </h2>
                    <p className="text-lg text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      Escolha a tecnologia ideal para o seu espaço
                    </p>
                  </div>

                  {/* Technology Options Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Option 1: Totem Simples */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#22C55E] hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>
                        <Smartphone className="text-[#FBBF24]" size={32} strokeWidth={2} />
                      </div>
                      <h3 className="text-xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        Totem Simples
                      </h3>
                      <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        Tela de 10" a 15" para pagamento básico
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2 text-gray-700">
                          <Check size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>Interface touchscreen</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-700">
                          <Check size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>Pagamento por QR Code</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-700">
                          <Check size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>Compacto e econômico</span>
                        </li>
                      </ul>
                    </motion.div>

                    {/* Option 2: Totem com PDV */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="group bg-gradient-to-br from-[#22C55E]/5 to-white border-2 border-[#22C55E] rounded-2xl p-6 hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-4 right-4 bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </div>
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                        <Monitor className="text-[#22C55E]" size={32} strokeWidth={2} />
                      </div>
                      <h3 className="text-xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        Totem com PDV
                      </h3>
                      <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        Tela de 21" a 27" com ponto de venda completo
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2 text-gray-700">
                          <Check size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>PDV integrado</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-700">
                          <Check size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>Cartão e PIX</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-700">
                          <Check size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>Gestão de estoque</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-700">
                          <Check size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>Relatórios em tempo real</span>
                        </li>
                      </ul>
                    </motion.div>

                    {/* Option 3: Totem Publicitário com PDV */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="group bg-gradient-to-br from-[#1F2937]/5 to-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#1F2937] hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ backgroundColor: 'rgba(31, 41, 55, 0.1)' }}>
                        <Tv className="text-[#1F2937]" size={32} strokeWidth={2} />
                      </div>
                      <h3 className="text-xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        Totem Publicitário
                      </h3>
                      <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        Tela de 32" a 55" com PDV e mídia digital
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2 text-gray-700">
                          <Check size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>Tela grande high-definition</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-700">
                          <Check size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>PDV completo integrado</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-700">
                          <Check size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>Publicidade dinâmica</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-700">
                          <Check size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>Receita extra com anúncios</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>

                  {/* Bottom CTA */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 pt-8 border-t border-gray-200 text-center"
                  >
                    <p className="text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      Não sabe qual tecnologia escolher? <span className="font-bold text-[#22C55E]">Nossos especialistas ajudam você!</span>
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedStore(null);
                        openModal();
                      }}
                      className="bg-[#22C55E] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-[#22C55E]/30 hover:bg-[#1ea952] transition-all"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      Solicitar consultoria gratuita
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}