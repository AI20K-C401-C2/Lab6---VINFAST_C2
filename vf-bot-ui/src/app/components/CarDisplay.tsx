import { motion, AnimatePresence } from 'motion/react';
import { Car, CarColor } from '../types/car';
import { useState } from 'react';
import { ColorSwatches } from './ColorSwatches';
import { SmartCard } from './SmartCard';
import { Battery, Zap, Users, Calendar } from 'lucide-react';

interface CarDisplayProps {
  car: Car;
  onTestDrive?: () => void;
}

export function CarDisplay({ car, onTestDrive }: CarDisplayProps) {
  const [selectedColor, setSelectedColor] = useState<CarColor>(car.colors[0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Car Image - centered with reflection */}
      <div className="w-full flex-1 flex flex-col items-center justify-center min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedColor.name}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ 
              duration: 0.7, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="relative w-full max-w-2xl flex flex-col items-center"
          >
            <img
              src={selectedColor.image}
              alt={`${car.name} - ${selectedColor.name}`}
              className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
            />
            {/* Reflection effect */}
            <div className="absolute inset-x-0 -bottom-10 h-20 bg-gradient-to-t from-white/30 to-transparent blur-xl pointer-events-none" />
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-2xl font-bold text-gray-800"
            >
              {car.name}
            </motion.h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Color Swatches - positioned at bottom */}
      <div className="w-full max-w-md pb-8">
        <ColorSwatches
          colors={car.colors}
          selectedColor={selectedColor.name}
          onColorChange={setSelectedColor}
        />
      </div>
    </motion.div>
  );
}