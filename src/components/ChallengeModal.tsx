import { Challenge } from '../types/game';
import { X, Heart, Flame, Sparkles } from 'lucide-react';

interface ChallengeModalProps {
  challenge: Challenge | null;
  onClose: () => void;
  playerName: string;
}

export default function ChallengeModal({ challenge, onClose, playerName }: ChallengeModalProps) {
  if (!challenge) return null;

  const getIcon = () => {
    switch (challenge.type) {
      case 'truth':
        return <Heart className="w-12 h-12 text-pink-400" />;
      case 'dare':
        return <Flame className="w-12 h-12 text-red-400" />;
      default:
        return <Sparkles className="w-12 h-12 text-yellow-400" />;
    }
  };

  const getTitle = () => {
    switch (challenge.type) {
      case 'truth':
        return '真心话';
      case 'dare':
        return '大冒险';
      default:
        return '甜蜜时刻';
    }
  };

  const getGradient = () => {
    switch (challenge.type) {
      case 'truth':
        return 'from-pink-500 to-rose-500';
      case 'dare':
        return 'from-red-500 to-orange-500';
      default:
        return 'from-yellow-400 to-amber-500';
    }
  };

  const getLevelEmoji = () => {
    switch (challenge.level) {
      case 'hot':
        return '🔥🔥🔥';
      case 'spicy':
        return '🔥🔥';
      default:
        return '💕';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
        <div className={`bg-gradient-to-r ${getGradient()} p-6 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 text-white">
            {getIcon()}
            <div>
              <h2 className="text-2xl font-bold">{getTitle()}</h2>
              <p className="text-white/90 text-sm">轮到 {playerName} 了</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-4 text-center">
            <span className="text-2xl">{getLevelEmoji()}</span>
          </div>

          <p className="text-xl text-gray-800 text-center leading-relaxed mb-6">
            {challenge.text}
          </p>

          {challenge.image && (
            <div className="mb-6 rounded-2xl overflow-hidden">
              <img
                src={challenge.image}
                alt="Challenge illustration"
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          <button
            onClick={onClose}
            className={`w-full py-4 bg-gradient-to-r ${getGradient()} text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
          >
            完成挑战
          </button>
        </div>
      </div>
    </div>
  );
}
