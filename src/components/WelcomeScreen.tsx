import { Heart } from 'lucide-react';
import { useState } from 'react';

interface WelcomeScreenProps {
  onStart: (player1Name: string, player2Name: string) => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handleStart = () => {
    if (player1Name.trim() && player2Name.trim()) {
      onStart(player1Name.trim(), player2Name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 text-rose-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent mb-2">
            情侣飞行棋
          </h1>
          <p className="text-gray-600">一场甜蜜又刺激的冒险</p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              玩家 1 昵称
            </label>
            <input
              type="text"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              placeholder="输入昵称..."
              className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              玩家 2 昵称
            </label>
            <input
              type="text"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder="输入昵称..."
              className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!player1Name.trim() || !player2Name.trim()}
          className="w-full py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          开始游戏
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>💕 真心话拉近距离</p>
          <p>🔥 大冒险点燃激情</p>
          <p>✨ 甜蜜时刻温暖心房</p>
        </div>
      </div>
    </div>
  );
}
