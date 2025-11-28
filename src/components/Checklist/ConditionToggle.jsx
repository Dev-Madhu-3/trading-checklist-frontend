import { useState } from 'react';
import ConditionModal from './ConditionModal';

const ConditionToggle = ({ name, points, checked, onChange }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Example images for different conditions
  const getConditionImages = (conditionName) => {
    switch (conditionName.toLowerCase()) {
      case 'trend':
        return [
          { 
            src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a72306a?auto=format&fit=crop&w=500&q=80', 
            label: 'Bullish Trend',
            description: 'Higher highs and higher lows'
          },
          { 
            src: 'https://images.unsplash.com/photo-1635246382859-0f0e3c1c8c7a?auto=format&fit=crop&w=500&q=80', 
            label: 'Bearish Trend',
            description: 'Lower highs and lower lows'
          }
        ];
      case 'at aoi / rejected':
        return [
          { 
            src: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=500&q=80', 
            label: 'AOI Rejection',
            description: 'Price rejected at area of interest'
          }
        ];
      case 'touching ema':
        return [
          { 
            src: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=500&q=80', 
            label: 'EMA Touch',
            description: 'Price touching the EMA line'
          }
        ];
      case 'round psychological level':
        return [
          { 
            src: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=500&q=80', 
            label: 'Psychological Level',
            description: 'Round number price level'
          }
        ];
      case 'rejection from previous structure':
        return [
          { 
            src: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=500&q=80', 
            label: 'Structure Rejection',
            description: 'Rejection at previous structure'
          }
        ];
      case 'candlestick rejection from aoi':
        return [
          { 
            src: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=500&q=80', 
            label: 'Candlestick Rejection',
            description: 'Rejection candlestick pattern'
          }
        ];
      case 'break & retest / head & shoulders pattern':
        return [
          { 
            src: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=500&q=80', 
            label: 'Break & Retest',
            description: 'Break of support/resistance with retest'
          },
          { 
            src: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=500&q=80', 
            label: 'Head & Shoulders',
            description: 'Head and shoulders pattern'
          }
        ];
      default:
        return [
          { 
            src: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=500&q=80', 
            label: 'Example',
            description: 'Condition example'
          }
        ];
    }
  };

  const handleToggleClick = () => {
    if (!modalOpen && !isUpdating) {
      setModalOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsUpdating(true);
    onChange(true);
    setModalOpen(false);
    // Reset the updating state after a short delay to prevent rapid clicks
    setTimeout(() => setIsUpdating(false), 300);
  };

  const handleCancel = () => {
    setIsUpdating(true);
    onChange(false);
    setModalOpen(false);
    // Reset the updating state after a short delay to prevent rapid clicks
    setTimeout(() => setIsUpdating(false), 300);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm text-slate-200 font-bold">{name}</div>
        </div>
        <div className="flex items-center gap-2 pr-1">
          <span className="text-[10px] font-medium text-slate-500">+{points}%</span>
          <button
            type="button"
            className={`
              relative inline-flex h-7 w-12 items-center rounded-full
              transition-all duration-300
              ${checked ? 'bg-emerald-500' : 'bg-slate-700/50'}
              hover:scale-105 active:scale-95
              focus:outline-none
            `}
            onClick={handleToggleClick}
            disabled={isUpdating}
          >
            <span
              className={`
                inline-block h-5 w-5 transform rounded-full bg-white
                transition-transform duration-300
                ${checked ? 'translate-x-6' : 'translate-x-1'}
                shadow-lg
              `}
            />
          </button>
        </div>
      </div>

      <ConditionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        conditionName={name}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        images={getConditionImages(name)}
      />
    </>
  );
};

export default ConditionToggle;