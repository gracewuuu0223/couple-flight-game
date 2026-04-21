import { useState } from 'react';

interface DiceProps {
  onRoll: (value: number) => void;
  disabled: boolean;
}

export default function Dice({ onRoll, disabled }: DiceProps) {
  const [rolling, setRolling] = useState(false);
  const [currentValue, setCurrentValue] = useState(1);

  const handleRoll = () => {
    if (disabled || rolling) return;

    setRolling(true);
    let counter = 0;
    const interval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * 6) + 1);
      counter++;

      if (counter > 15) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setCurrentValue(finalValue);
        setRolling(false);
        onRoll(finalValue);
      }
    }, 100);
  };

  const getDotPositions = (value: number) => {
    const dots = [];
    const positions: Record<number, string[]> = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
    };

    const dotPositionClasses: Record<string, string> = {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'middle-left': 'top-1/2 -translate-y-1/2 left-2',
      'middle-right': 'top-1/2 -translate-y-1/2 right-2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'bottom-2 right-2',
      'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    };

    return positions[value].map((pos, idx) => (
      <div
        key={idx}
        className={`absolute w-3 h-3 bg-white rounded-full ${dotPositionClasses[pos]}`}
      />
    ));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`relative w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl shadow-2xl cursor-pointer transform transition-all duration-200 ${
          rolling ? 'animate-spin' : 'hover:scale-110'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleRoll}
      >
        {getDotPositions(currentValue)}
      </div>

      <button
        onClick={handleRoll}
        disabled={disabled || rolling}
        className={`px-6 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-semibold shadow-lg transform transition-all duration-200 ${
          disabled || rolling ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'
        }`}
      >
        {rolling ? '投掷中...' : '掷骰子'}
      </button>
    </div>
  );
}
