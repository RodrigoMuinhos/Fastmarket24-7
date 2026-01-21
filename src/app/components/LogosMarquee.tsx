import { motion } from 'motion/react';

const logos = [
  { name: 'TechCorp', text: 'TechCorp Brasil' },
  { name: 'Condomínio Solar', text: 'Solar das Flores' },
  { name: 'Hospital Cruz', text: 'Hospital Santa Cruz' },
  { name: 'Edifício Premium', text: 'Edifício Premium Tower' },
  { name: 'Corp Center', text: 'Corporate Center SP' },
  { name: 'Medical Center', text: 'Medical Center Offices' },
  { name: 'Green Building', text: 'Green Building Residence' },
  { name: 'Tech Park', text: 'Tech Park Business' },
];

export function LogosMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-white py-8">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Marquee Container */}
      <div className="flex">
        {/* First Set */}
        <motion.div
          animate={{
            x: [0, -1920]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="flex gap-12 flex-shrink-0"
        >
          {logos.map((logo, idx) => (
            <div
              key={`first-${idx}`}
              className="flex items-center justify-center px-8 py-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#22C55E] transition-all min-w-[200px] group"
            >
              <span className="text-gray-600 font-semibold text-lg whitespace-nowrap group-hover:text-[#22C55E] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {logo.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Second Set (duplicate for seamless loop) */}
        <motion.div
          animate={{
            x: [0, -1920]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="flex gap-12 flex-shrink-0"
        >
          {logos.map((logo, idx) => (
            <div
              key={`second-${idx}`}
              className="flex items-center justify-center px-8 py-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#22C55E] transition-all min-w-[200px] group"
            >
              <span className="text-gray-600 font-semibold text-lg whitespace-nowrap group-hover:text-[#22C55E] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {logo.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Third Set (for extra smoothness) */}
        <motion.div
          animate={{
            x: [0, -1920]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="flex gap-12 flex-shrink-0"
        >
          {logos.map((logo, idx) => (
            <div
              key={`third-${idx}`}
              className="flex items-center justify-center px-8 py-4 bg-gray-50 rounded-2xl border border-gray-200 hover:border-[#22C55E] transition-all min-w-[200px] group"
            >
              <span className="text-gray-600 font-semibold text-lg whitespace-nowrap group-hover:text-[#22C55E] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                {logo.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
