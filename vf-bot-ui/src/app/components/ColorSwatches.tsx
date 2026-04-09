import { motion } from 'motion/react';
import { CarColor } from '../types/car';
import { Check } from 'lucide-react';

interface ColorSwatchesProps {
  colors: CarColor[];
  selectedColor: string;
  onColorChange: (color: CarColor) => void;
}

export function ColorSwatches({ colors, selectedColor, onColorChange }: ColorSwatchesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex gap-3 justify-center"
    >
      {colors.map((color, index) => (
        <motion.button
          key={color.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onColorChange(color)}
          className={`relative w-12 h-12 rounded-full border-4 transition-all ${
            selectedColor === color.name
              ? 'border-blue-600 shadow-lg'
              : 'border-white shadow-md hover:border-gray-300'
          }`}
          style={{ backgroundColor: color.hex }}
          title={color.name}
        >
          {selectedColor === color.name && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check className="w-6 h-6 text-white drop-shadow-lg" strokeWidth={3} />
            </motion.div>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}
