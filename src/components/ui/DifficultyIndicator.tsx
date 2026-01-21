/**
 * Difficulty Indicator Component
 * Shows current difficulty level with visual feedback
 */

import React from 'react';
import { motion } from 'framer-motion';
import { difficultyManager } from '@/lib/difficultyManager';

interface DifficultyIndicatorProps {
  classNumber: number;
  subject: string;
  showLabel?: boolean;
  compact?: boolean;
}

export const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({
  classNumber,
  subject,
  showLabel = true,
  compact = false,
}) => {
  const settings = difficultyManager.getDifficulty(classNumber, subject);
  const level = settings.level;
  
  const levelColors = {
    1: { bg: 'bg-green-500', text: 'text-green-500', glow: 'shadow-green-500/50' },
    2: { bg: 'bg-blue-500', text: 'text-blue-500', glow: 'shadow-blue-500/50' },
    3: { bg: 'bg-yellow-500', text: 'text-yellow-500', glow: 'shadow-yellow-500/50' },
    4: { bg: 'bg-orange-500', text: 'text-orange-500', glow: 'shadow-orange-500/50' },
    5: { bg: 'bg-red-500', text: 'text-red-500', glow: 'shadow-red-500/50' },
  };
  
  const colors = levelColors[level];
  const label = difficultyManager.getDifficultyLabel(level);
  
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full ${i <= level ? colors.bg : 'bg-gray-300 dark:bg-gray-600'}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-3">
      {/* Level dots */}
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i <= level 
                ? `${colors.bg} shadow-lg ${colors.glow}` 
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: i <= level ? 1.1 : 1 }}
            transition={{ 
              delay: i * 0.05,
              type: 'spring',
              stiffness: 300,
            }}
          />
        ))}
      </div>
      
      {/* Label */}
      {showLabel && (
        <motion.span 
          className={`text-sm font-medium ${colors.text}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
};

interface DifficultyAdjustmentToastProps {
  change: -1 | 0 | 1;
  reason: string;
  onClose: () => void;
}

export const DifficultyAdjustmentToast: React.FC<DifficultyAdjustmentToastProps> = ({
  change,
  reason,
  onClose,
}) => {
  if (change === 0) return null;
  
  const isIncrease = change > 0;
  
  return (
    <motion.div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg ${
        isIncrease 
          ? 'bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white' 
          : 'bg-gradient-to-r from-blue-500/90 to-cyan-500/90 text-white'
      }`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">
          {isIncrease ? '📈' : '📚'}
        </span>
        <div>
          <p className="font-bold">
            {isIncrease ? 'Level Up!' : 'Difficulty Adjusted'}
          </p>
          <p className="text-sm opacity-90">{reason}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

export default DifficultyIndicator;
