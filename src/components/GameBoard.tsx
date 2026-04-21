import { Cell } from '../types/game';
import { Heart, Flame, Sparkles } from 'lucide-react';

interface GameBoardProps {
  cells: Cell[];
  player1Position: number;
  player2Position: number;
}

export default function GameBoard({ cells, player1Position, player2Position }: GameBoardProps) {
  const getCellIcon = (cell: Cell) => {
    switch (cell.type) {
      case 'truth':
        return <Heart className="w-5 h-5 text-pink-400" />;
      case 'dare':
        return <Flame className="w-5 h-5 text-red-400" />;
      case 'sweet':
        return <Sparkles className="w-5 h-5 text-yellow-300" />;
      default:
        return null;
    }
  };

  const getCellStyle = (cell: Cell) => {
    const baseStyle = "relative flex items-center justify-center border-2 rounded-lg transition-all duration-300";
    switch (cell.type) {
      case 'truth':
        return `${baseStyle} bg-gradient-to-br from-pink-100 to-pink-50 border-pink-300 hover:shadow-pink-200 hover:shadow-lg`;
      case 'dare':
        return `${baseStyle} bg-gradient-to-br from-red-100 to-red-50 border-red-300 hover:shadow-red-200 hover:shadow-lg`;
      case 'sweet':
        return `${baseStyle} bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-300 hover:shadow-yellow-200 hover:shadow-lg`;
      default:
        return `${baseStyle} bg-gradient-to-br from-rose-50 to-white border-rose-200`;
    }
  };

  return (
    <div className="grid grid-cols-8 gap-2 p-4 bg-white/30 backdrop-blur-sm rounded-2xl shadow-2xl">
      {cells.map((cell) => (
        <div key={cell.id} className={getCellStyle(cell)}>
          <div className="absolute top-1 right-1 text-xs text-gray-400">{cell.id + 1}</div>
          {getCellIcon(cell)}

          {player1Position === cell.id && (
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full border-2 border-white shadow-lg animate-pulse flex items-center justify-center text-white text-xs font-bold">
              1
            </div>
          )}

          {player2Position === cell.id && (
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full border-2 border-white shadow-lg animate-pulse flex items-center justify-center text-white text-xs font-bold">
              2
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
