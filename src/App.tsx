import { useState, useEffect } from 'react';
import { Player, Cell, Challenge } from './types/game';
import { truthChallenges, dareChallenges, sweetChallenges } from './data/challenges';
import GameBoard from './components/GameBoard';
import Dice from './components/Dice';
import ChallengeModal from './components/ChallengeModal';
import AudioPlayer from './components/AudioPlayer';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: '玩家1', position: 0, color: 'rose' },
    { id: 2, name: '玩家2', position: 0, color: 'amber' },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [cells, setCells] = useState<Cell[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    const newCells: Cell[] = [];
    for (let i = 0; i < 40; i++) {
      let type: Cell['type'] = 'normal';

      if (i % 8 === 3 || i % 8 === 7) {
        type = 'truth';
      } else if (i % 8 === 1 || i % 8 === 5) {
        type = 'dare';
      } else if (i % 12 === 0 && i !== 0) {
        type = 'sweet';
      }

      newCells.push({ id: i, type });
    }
    setCells(newCells);
  }, []);

  const handleStart = (player1Name: string, player2Name: string) => {
    setPlayers([
      { id: 1, name: player1Name, position: 0, color: 'rose' },
      { id: 2, name: player2Name, position: 0, color: 'amber' },
    ]);
    setGameStarted(true);
  };

  const handleRoll = (value: number) => {
    setIsRolling(true);
    const currentPlayer = players[currentPlayerIndex];
    const newPosition = Math.min(currentPlayer.position + value, cells.length - 1);

    setTimeout(() => {
      const newPlayers = [...players];
      newPlayers[currentPlayerIndex].position = newPosition;
      setPlayers(newPlayers);

      const landedCell = cells[newPosition];
      if (landedCell.type !== 'normal') {
        let challenge: Challenge;

        if (landedCell.type === 'truth') {
          challenge = truthChallenges[Math.floor(Math.random() * truthChallenges.length)];
        } else if (landedCell.type === 'dare') {
          challenge = dareChallenges[Math.floor(Math.random() * dareChallenges.length)];
        } else {
          challenge = sweetChallenges[Math.floor(Math.random() * sweetChallenges.length)];
        }

        setCurrentChallenge(challenge);
      } else {
        setCurrentPlayerIndex((currentPlayerIndex + 1) % 2);
        setIsRolling(false);
      }

      if (newPosition === cells.length - 1) {
        setTimeout(() => {
          alert(`🎉 恭喜 ${currentPlayer.name} 获胜！\n\n愿你们的爱情甜蜜美满 💕`);
        }, 500);
      }
    }, 1000);
  };

  const handleCloseChallenge = () => {
    setCurrentChallenge(null);
    setCurrentPlayerIndex((currentPlayerIndex + 1) % 2);
    setIsRolling(false);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-amber-100">
        <AudioPlayer />
        <WelcomeScreen onStart={handleStart} />
      </div>
    );
  }

  const currentPlayer = players[currentPlayerIndex];
  const winner = players.find(p => p.position === cells.length - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-amber-100 p-4">
      <AudioPlayer />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent mb-2">
            情侣飞行棋
          </h1>
          <p className="text-gray-600">
            当前回合：
            <span className={`font-bold ml-2 ${currentPlayer.id === 1 ? 'text-rose-500' : 'text-amber-500'}`}>
              {currentPlayer.name}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <GameBoard
              cells={cells}
              player1Position={players[0].position}
              player2Position={players[1].position}
            />
          </div>

          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">玩家信息</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-rose-100 to-rose-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full"></div>
                    <span className="font-medium">{players[0].name}</span>
                  </div>
                  <span className="text-sm text-gray-600">步数: {players[0].position}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full"></div>
                    <span className="font-medium">{players[1].name}</span>
                  </div>
                  <span className="text-sm text-gray-600">步数: {players[1].position}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl flex justify-center">
              <Dice onRoll={handleRoll} disabled={isRolling || !!winner} />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">游戏说明</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>💕 粉色格子 - 真心话</p>
                <p>🔥 红色格子 - 大冒险</p>
                <p>✨ 黄色格子 - 甜蜜时刻</p>
                <p className="pt-2 border-t">先到达终点的玩家获胜！</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChallengeModal
        challenge={currentChallenge}
        onClose={handleCloseChallenge}
        playerName={currentPlayer.name}
      />
    </div>
  );
}

export default App;
