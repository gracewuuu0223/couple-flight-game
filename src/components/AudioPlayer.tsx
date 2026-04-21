import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMute}
        className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-rose-400" />
        ) : (
          <Volume2 className="w-6 h-6 text-rose-400" />
        )}
      </button>

      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_4f6a6d5a27.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
