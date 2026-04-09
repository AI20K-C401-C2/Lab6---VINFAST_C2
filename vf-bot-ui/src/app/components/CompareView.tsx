import { motion } from 'motion/react';
import { Car } from '../types/car';
import { Battery, Zap, Users, DollarSign, Check } from 'lucide-react';

interface CompareViewProps {
  car1: Car;
  car2: Car;
}

export function CompareView({ car1, car2 }: CompareViewProps) {
  const specs = [
    { label: 'Giá bán', key: 'price', icon: DollarSign },
    { label: 'Quãng đường', key: 'range', icon: Battery },
    { label: 'Tăng tốc 0-100km/h', key: 'acceleration', icon: Zap },
    { label: 'Công suất', key: 'power', icon: Zap },
    { label: 'Số chỗ ngồi', key: 'seats', icon: Users },
  ];

  const getCarValue = (car: Car, key: string) => {
    if (key === 'price') return car.price;
    if (key === 'range') return car.specs.range;
    if (key === 'acceleration') return car.specs.acceleration;
    if (key === 'power') return car.specs.power;
    if (key === 'seats') return `${car.specs.seats} chỗ`;
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col p-6 overflow-y-auto"
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-900 mb-6 text-center flex-shrink-0"
      >
        So sánh chi tiết
      </motion.h2>

      {/* Car Cards — compact side by side */}
      <div className="grid grid-cols-2 gap-4 flex-shrink-0 mb-6">
        {/* Car 1 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="bg-gradient-to-br from-red-600 to-red-800 text-white p-4 rounded-2xl mb-3">
            <h3 className="text-lg font-bold mb-0.5">{car1.name}</h3>
            <p className="text-red-100 text-sm">{car1.version}</p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={car1.image}
              alt={car1.name}
              className="w-full h-auto max-h-40 object-contain drop-shadow-xl rounded-xl"
            />
          </div>
        </motion.div>

        {/* Car 2 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="bg-gradient-to-br from-gray-700 to-gray-900 text-white p-4 rounded-2xl mb-3">
            <h3 className="text-lg font-bold mb-0.5">{car2.name}</h3>
            <p className="text-gray-300 text-sm">{car2.version}</p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={car2.image}
              alt={car2.name}
              className="w-full h-auto max-h-40 object-contain drop-shadow-xl rounded-xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-gray-200 flex-shrink-0"
      >
        <div className="space-y-0">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            const value1 = getCarValue(car1, spec.key);
            const value2 = getCarValue(car2, spec.key);

            return (
              <motion.div
                key={spec.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="grid grid-cols-3 gap-2 items-center py-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  <Icon className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="truncate">{spec.label}</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-900 font-semibold text-sm">{value1}</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-900 font-semibold text-sm">{value2}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Feature Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 gap-4 mt-4 flex-shrink-0"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-green-600" />
            {car1.name} - Nổi bật
          </h4>
          <ul className="space-y-1.5">
            {car1.specs.features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="text-xs text-gray-700 flex items-start gap-1.5">
                <span className="text-red-600 mt-0.5 flex-shrink-0">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-green-600" />
            {car2.name} - Nổi bật
          </h4>
          <ul className="space-y-1.5">
            {car2.specs.features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="text-xs text-gray-700 flex items-start gap-1.5">
                <span className="text-gray-600 mt-0.5 flex-shrink-0">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
