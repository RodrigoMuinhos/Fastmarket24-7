import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Carlos Mendes',
    role: 'Síndico',
    company: 'Condomínio Solar das Flores',
    text: 'O FastMarket transformou nosso condomínio! Os moradores amam a conveniência 24h e nós aumentamos a valorização do imóvel.',
    rating: 5
  },
  {
    name: 'Ana Paula Silva',
    role: 'CEO',
    company: 'TechCorp Brasil',
    text: 'Implantamos na nossa empresa e a satisfação dos colaboradores disparou. ROI em menos de 6 meses!',
    rating: 5
  },
  {
    name: 'Roberto Alves',
    role: 'Investidor',
    company: 'FastMarket Partner',
    text: 'Melhor investimento que já fiz. Operação 100% automatizada, gestão inteligente e lucro recorrente.',
    rating: 5
  },
  {
    name: 'Mariana Costa',
    role: 'Diretora de Facilities',
    company: 'Hospital Santa Cruz',
    text: 'Essencial para nosso hospital. Funcionários e visitantes têm acesso 24/7 sem depender de horário comercial.',
    rating: 5
  }
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Quote Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#22C55E] w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-[#22C55E]/30 z-10"
      >
        <Quote className="text-white" size={32} />
      </motion.div>

      {/* Testimonial Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-12 min-h-[320px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-12"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[currentIndex].rating }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                >
                  <Star className="text-[#FBBF24] fill-[#FBBF24]" size={24} />
                </motion.div>
              ))}
            </div>

            {/* Text */}
            <p className="text-xl text-gray-700 mb-8 leading-relaxed italic" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              "{testimonials[currentIndex].text}"
            </p>

            {/* Author */}
            <div className="border-t border-gray-100 pt-6">
              <p className="text-lg font-bold text-[#1F2937] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                {testimonials[currentIndex].name}
              </p>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                {testimonials[currentIndex].role} • {testimonials[currentIndex].company}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#22C55E] hover:text-white transition-all group"
        >
          <ChevronLeft className="group-hover:scale-125 transition-transform" size={24} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#22C55E] hover:text-white transition-all group"
        >
          <ChevronRight className="group-hover:scale-125 transition-transform" size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`transition-all ${
              idx === currentIndex
                ? 'w-12 bg-[#22C55E]'
                : 'w-3 bg-gray-300 hover:bg-gray-400'
            } h-3 rounded-full`}
          />
        ))}
      </div>
    </div>
  );
}
