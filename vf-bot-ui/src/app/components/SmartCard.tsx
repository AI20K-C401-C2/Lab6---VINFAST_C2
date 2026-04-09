import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SmartCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delay?: number;
}

export function SmartCard({ icon: Icon, label, value, delay = 0 }: SmartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-white/50"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="text-xs text-gray-600">{label}</p>
          <p className="text-sm font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
