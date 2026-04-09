import { motion, AnimatePresence } from 'motion/react';
import { Car } from '../types/car';
import { CarDisplay } from './CarDisplay';

interface VisualPanelProps {
  displayMode: 'logo' | 'car';
  selectedCar?: Car;
  backgroundType?: 'default' | 'mountain';
  onTestDrive?: () => void;
}

export function VisualPanel({
  displayMode,
  selectedCar,
  backgroundType = 'default',
  onTestDrive,
}: VisualPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="h-full relative overflow-hidden"
    >
      {/* Subtle gradient background — no distracting large logos or images */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40" />

      {/* Content */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          {displayMode === 'logo' && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex flex-col items-center"
                >
                  <img 
                    src="/VinFast-logo-new_NO Tagline - 3D - Center-1st-priority.png" 
                    alt="VinFast Logo"
                    className="w-80 h-auto drop-shadow-2xl"
                  />
                  <p className="text-lg text-blue-800 font-light mt-6 tracking-widest uppercase">
                    Tương lai trong tầm tay
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {displayMode === 'car' && selectedCar && (
            <motion.div
              key={`car-${selectedCar.id}`}
              initial={{ opacity: 0, x: 30, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -30, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for premium feel
              }}
              className="h-full"
            >
              <CarDisplay car={selectedCar} onTestDrive={onTestDrive} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
