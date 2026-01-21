import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  action: string;
  location: string;
  time: string;
}

const notifications: Notification[] = [
  { id: 1, name: 'Carlos Mendes', action: 'acabou de se cadastrar', location: 'São Paulo, SP', time: '2 minutos atrás' },
  { id: 2, name: 'Ana Silva', action: 'solicitou orçamento', location: 'Rio de Janeiro, RJ', time: '5 minutos atrás' },
  { id: 3, name: 'Roberto Costa', action: 'agendou reunião', location: 'Belo Horizonte, MG', time: '8 minutos atrás' },
  { id: 4, name: 'Mariana Santos', action: 'baixou o e-book', location: 'Brasília, DF', time: '12 minutos atrás' },
  { id: 5, name: 'João Oliveira', action: 'entrou em contato', location: 'Curitiba, PR', time: '15 minutos atrás' },
  { id: 6, name: 'Patricia Lima', action: 'se cadastrou', location: 'Porto Alegre, RS', time: '18 minutos atrás' },
];

export function SocialProofPopup() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let notificationIndex = 0;

    const showNextNotification = () => {
      setIsVisible(true);
      setCurrentNotification(notifications[notificationIndex]);
      notificationIndex = (notificationIndex + 1) % notifications.length;

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Show first notification after 3 seconds
    const initialTimer = setTimeout(() => {
      showNextNotification();
    }, 3000);

    // Then show new notification every 12 seconds
    const interval = setInterval(() => {
      showNextNotification();
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && currentNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: -50 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-24 left-6 z-40 max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#22C55E]/20 p-4 pr-12 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="flex-shrink-0"
              >
                <CheckCircle className="text-[#22C55E]" size={28} />
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1F2937] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="text-[#22C55E]">{currentNotification.name}</span> {currentNotification.action}
                </p>
                <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {currentNotification.location} • {currentNotification.time}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Progress Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-[#22C55E] rounded-b-2xl origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
