import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Activity, Wifi } from 'lucide-react';

interface TaskbarProps {
  onStartClick: () => void;
  windows: Array<{ id: string; title: string; active: boolean; minimized: boolean }>;
  onWindowClick: (id: string) => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  onStartClick,
  windows,
  onWindowClick,
  soundEnabled,
  onSoundToggle
}) => {
  const [time, setTime] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-7 flex items-center px-0.5 gap-0.5"
      style={{
        background: '#c0c0c0',
        borderTop: '2px solid #ffffff',
        zIndex: 9999
      }}
    >
      {/* Start Button */}
      <button
        className="win95-button flex items-center gap-1 h-6"
        onClick={onStartClick}
        style={{ padding: '2px 4px' }}
      >
        {/* Windows Logo */}
        <svg width="16" height="16" viewBox="0 0 16 16">
          <rect x="0" y="0" width="7" height="7" fill="#FF0000" />
          <rect x="8" y="0" width="8" height="7" fill="#00FF00" />
          <rect x="0" y="8" width="7" height="8" fill="#0000FF" />
          <rect x="8" y="8" width="8" height="8" fill="#FFFF00" />
        </svg>
        <span className="font-bold text-xs">Start</span>
      </button>
      
      {/* Separator */}
      <div
        className="h-6 w-0.5"
        style={{
          borderLeft: '1px solid #808080',
          borderRight: '1px solid #ffffff'
        }}
      />
      
      {/* Window Buttons */}
      <div className="flex-1 flex gap-0.5 overflow-hidden">
        {windows.map((window) => (
          <button
            key={window.id}
            className="win95-button h-6 px-2 flex items-center gap-1 max-w-40 text-xs truncate"
            onClick={() => onWindowClick(window.id)}
            style={{
              ...(window.active && !window.minimized
                ? {
                    borderColor: '#000000 #ffffff #ffffff #000000',
                    outlineColor: '#808080 #dfdfdf #dfdfdf #808080',
                    padding: '5px 11px 3px 13px'
                  }
                : {})
            }}
          >
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>
      
      {/* System Tray */}
      <div
        className="flex items-center gap-2 h-6 px-2"
        style={{
          borderLeft: '1px solid #808080',
          borderTop: '1px solid #808080',
          borderRight: '1px solid #ffffff',
          borderBottom: '1px solid #ffffff',
          background: '#c0c0c0'
        }}
      >
        {/* System Resource Icon */}
        <div 
          className="w-4 h-4 flex items-center justify-center cursor-pointer relative"
          onMouseEnter={() => setShowTooltip('system')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Activity size={12} color="#000000" />
          {showTooltip === 'system' && (
            <div
              className="absolute bottom-full mb-1 px-2 py-1 text-xs whitespace-nowrap"
              style={{
                background: '#FFFFE0',
                border: '1px solid #000000',
                zIndex: 10000
              }}
            >
              System Resources: 85% free
            </div>
          )}
        </div>

        {/* Network Icon */}
        <div 
          className="w-4 h-4 flex items-center justify-center cursor-pointer relative"
          onMouseEnter={() => setShowTooltip('network')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Wifi size={12} color="#000000" />
          {showTooltip === 'network' && (
            <div
              className="absolute bottom-full mb-1 px-2 py-1 text-xs whitespace-nowrap"
              style={{
                background: '#FFFFE0',
                border: '1px solid #000000',
                zIndex: 10000
              }}
            >
              Network Connected
            </div>
          )}
        </div>
        
        {/* Sound Icon */}
        <div 
          className="w-4 h-4 flex items-center justify-center cursor-pointer relative"
          onClick={onSoundToggle}
          onMouseEnter={() => setShowTooltip('sound')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          {soundEnabled ? (
            <Volume2 size={12} color="#000000" />
          ) : (
            <VolumeX size={12} color="#000000" />
          )}
          {showTooltip === 'sound' && (
            <div
              className="absolute bottom-full mb-1 px-2 py-1 text-xs whitespace-nowrap"
              style={{
                background: '#FFFFE0',
                border: '1px solid #000000',
                zIndex: 10000
              }}
            >
              {soundEnabled ? 'Volume: On' : 'Volume: Off'}
            </div>
          )}
        </div>
        
        {/* Clock */}
        <div 
          className="text-xs font-normal cursor-pointer relative"
          style={{ minWidth: '60px' }}
          onMouseEnter={() => setShowTooltip('clock')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          {formatTime(time)}
          {showTooltip === 'clock' && (
            <div
              className="absolute bottom-full mb-1 px-2 py-1 text-xs whitespace-nowrap right-0"
              style={{
                background: '#FFFFE0',
                border: '1px solid #000000',
                zIndex: 10000
              }}
            >
              {formatDate(time)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};