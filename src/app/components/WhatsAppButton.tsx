import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '5511999999999'; // Substitua pelo número real do FastMarket
  const message = 'Olá! Gostaria de saber mais sobre o FastMarket.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group"
    >
      {/* Pulse Animation */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 bg-[#25D366] rounded-full"
      />
      
      {/* Icon */}
      <MessageCircle className="relative z-10 group-hover:rotate-12 transition-transform" size={28} />
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="hidden sm:block absolute right-20 bg-[#1F2937] text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold shadow-lg pointer-events-none"
      >
        Fale conosco no WhatsApp
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#1F2937]" />
      </motion.div>
    </motion.a>
  );
}
