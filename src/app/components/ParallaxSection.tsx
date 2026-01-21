import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Zap, Shield, TrendingUp, Sparkles } from 'lucide-react';

export function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Different parallax speeds for layered effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={containerRef} className="relative min-h-screen py-32 overflow-hidden bg-gradient-to-b from-[#1F2937] via-[#1F2937] to-[#0f172a]" style={{ position: 'relative' }}>
      {/* Background Layers */}
      <motion.div
        style={{ y: y3, opacity: 0.1 }}
        className="absolute inset-0"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#22C55E] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FBBF24] rounded-full blur-[120px]" />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 left-20 opacity-20"
      >
        <Sparkles className="text-[#22C55E]" size={60} />
      </motion.div>
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-40 right-20 opacity-20"
      >
        <Zap className="text-[#FBBF24]" size={80} />
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          style={{ opacity, scale }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-8"
          >
            <div className="bg-[#22C55E] text-white px-6 py-2 rounded-full text-sm font-semibold">
              ⚡ Tecnologia que transforma
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl mb-8 text-white leading-tight"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            Inovação que gera
            <br />
            <span className="text-[#22C55E]">resultados reais</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Nosso ecossistema combina IA, IoT e analytics para criar uma experiência de compra perfeita e gestão simplificada
          </motion.p>

          {/* Feature Cards with Parallax */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: 'Segurança Total',
                desc: 'Monitoramento 24/7 e proteção de dados',
                color: '#22C55E',
                delay: 0
              },
              {
                icon: Zap,
                title: 'Performance',
                desc: 'Sistema otimizado para rapidez',
                color: '#FBBF24',
                delay: 0.2
              },
              {
                icon: TrendingUp,
                title: 'Crescimento',
                desc: 'Escalabilidade comprovada',
                color: '#22C55E',
                delay: 0.4
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                style={{ y: idx === 1 ? y1 : y2 }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                whileHover={{ y: -20, scale: 1.05 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-[#22C55E]/50 transition-all cursor-pointer group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon className="group-hover:scale-110 transition-transform" size={32} style={{ color: feature.color }} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#22C55E] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Grid Background Effect */}
      <motion.div
        style={{ opacity: 0.05 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          style={{
            backgroundImage: 'linear-gradient(#22C55E 1px, transparent 1px), linear-gradient(90deg, #22C55E 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
          className="w-full h-full"
        />
      </motion.div>
    </div>
  );
}