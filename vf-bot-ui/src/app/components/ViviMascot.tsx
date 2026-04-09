import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface ViviMascotProps {
  stage: 'onboarding' | 'chat' | 'thinking';
  emotion?: 'neutral' | 'excited' | 'thinking';
  onClick?: () => void;
  onStartChat?: (intent?: 'price' | 'offers') => void;
}

export function ViviMascot({ stage, emotion = 'neutral', onClick, onStartChat }: ViviMascotProps) {
  if (stage === 'onboarding') {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img 
            src="/VinFast-logo-new_NO Tagline - 3D - Center-1st-priority.png" 
            alt="VinFast"
            className="w-48 h-auto drop-shadow-xl"
          />
        </motion.div>
        
        {/* Greeting Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Xin chào bạn! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Bạn muốn mình tư vấn gì nào?
          </p>
        </motion.div>

        {/* Suggestion Buttons - each sends a different intent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-3 justify-center max-w-md"
        >
          <button
            onClick={() => onStartChat?.('price')}
            className="px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-gray-700 border border-gray-200"
          >
            💰 Xem bảng giá
          </button>
          <button
            onClick={() => onStartChat?.('offers')}
            className="px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-gray-700 border border-gray-200"
          >
            🎁 Các ưu đãi mới nhất
          </button>
        </motion.div>
      </motion.div>
    );
  }

  // Chat/thinking stage — no longer rendered in the center of the screen.
  // The typing indicator is handled inside ChatPanel directly.
  return null;
}
