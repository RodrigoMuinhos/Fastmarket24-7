import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import fastMarketStore from '@/assets/4e4ffbb8fbf98e9dc91f47a200a552c791755bae.png';

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Video Thumbnail */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
        onClick={handlePlay}
      >
        <div className="relative aspect-video">
          <img 
            src={fastMarketStore}
            alt="FastMarket Demo"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />

          {/* Play Button */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-[#22C55E] w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-2xl shadow-[#22C55E]/50 group-hover:shadow-[#22C55E]/70 transition-all">
              <Play className="text-white ml-1" size={32} fill="white" />
            </div>
          </motion.div>

          {/* Label */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
              <p className="text-base sm:text-lg font-bold text-[#1F2937] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                🎥 Veja o FastMarket em ação
              </p>
              <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Demonstração completa de 2 minutos
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute top-2 right-2 sm:-top-12 sm:right-0 bg-white/10 backdrop-blur-sm text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <X size={24} />
              </motion.button>

              {/* Video Container */}
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                {/* Simulated Video Player (usando imagem como placeholder) */}
                <div className="relative w-full h-full">
                  <img 
                    src={fastMarketStore}
                    alt="FastMarket Demo Video"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Video Overlay Effect */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/60"
                  />

                  {/* Simulated Video Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Play className="mx-auto mb-4" size={56} fill="white" />
                      </motion.div>
                      <p className="text-xl sm:text-2xl font-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Demonstração FastMarket
                      </p>
                      <p className="text-sm sm:text-lg text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Veja como funciona na prática
                      </p>
                    </div>
                  </div>

                  {/* Video Controls (simulated) */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-3 sm:p-6">
                    <div className="flex items-center gap-4">
                      <button className="text-white hover:text-[#22C55E] transition-colors">
                        <Play size={24} fill="white" />
                      </button>
                      
                      <button onClick={toggleMute} className="text-white hover:text-[#22C55E] transition-colors">
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                      </button>

                      <div className="flex-1 bg-white/30 h-1 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: ['0%', '100%'] }}
                          transition={{ duration: 120, ease: 'linear' }}
                          className="h-full bg-[#22C55E]"
                        />
                      </div>

                      <span className="hidden sm:inline text-white text-sm font-mono">0:00 / 2:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="mt-6 text-center">
                <p className="text-white text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  💡 <span className="text-[#22C55E]">Dica:</span> Entre em contato para receber o vídeo completo e materiais exclusivos
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
