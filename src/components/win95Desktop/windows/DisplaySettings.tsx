import React, { useState } from 'react';

interface DisplaySettingsProps {
  currentWallpaper: string;
  onWallpaperChange: (wallpaper: string) => void;
}

const wallpapers = [
  { id: 'teal', name: '(Teal)' },
  { id: 'clouds', name: 'Clouds' },
  { id: 'setup', name: 'Setup' },
  { id: 'redblocks', name: 'Red Blocks' },
  { id: 'greencircuit', name: 'Green Circuit' }
];

export const DisplaySettings: React.FC<DisplaySettingsProps> = ({
  currentWallpaper,
  onWallpaperChange
}) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);

  const handleApply = () => {
    onWallpaperChange(selectedWallpaper);
  };

  const handleOk = () => {
    onWallpaperChange(selectedWallpaper);
  };

  const getWallpaperPreview = (id: string) => {
    const colors: Record<string, string> = {
      teal: '#008080',
      clouds: '#87CEEB',
      setup: '#000080',
      redblocks: '#000000',
      greencircuit: '#006400'
    };
    return colors[id] || '#008080';
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#c0c0c0' }}>
      {/* Tabs */}
      <div className="flex border-b-2" style={{ borderColor: '#ffffff' }}>
        <div
          className="px-4 py-2 text-xs font-bold border-2 border-b-0"
          style={{
            background: '#c0c0c0',
            borderColor: '#ffffff #000000 transparent #ffffff'
          }}
        >
          Background
        </div>
        <div
          className="px-4 py-2 text-xs"
          style={{
            background: '#808080',
            color: '#c0c0c0'
          }}
        >
          Screen Saver
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Preview Monitor */}
        <div className="mb-4 flex justify-center">
          <div
            className="relative border-4 border-black"
            style={{
              width: '200px',
              height: '150px',
              background: getWallpaperPreview(selectedWallpaper)
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-400" />
          </div>
        </div>
        
        {/* Wallpaper List */}
        <div className="mb-4">
          <label className="block text-xs font-bold mb-2">Wallpaper:</label>
          <div
            className="win95-input bg-white p-2"
            style={{ height: '120px', overflowY: 'auto' }}
          >
            {wallpapers.map((wallpaper) => (
              <div
                key={wallpaper.id}
                className={`px-2 py-1 cursor-pointer text-xs ${
                  selectedWallpaper === wallpaper.id ? 'bg-blue-800 text-white' : ''
                }`}
                onClick={() => setSelectedWallpaper(wallpaper.id)}
                style={
                  selectedWallpaper === wallpaper.id
                    ? { background: '#000080', color: '#ffffff' }
                    : {}
                }
              >
                {wallpaper.name}
              </div>
            ))}
          </div>
        </div>
        
        {/* Wallpaper Preview Thumbnails */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              className="cursor-pointer"
              onClick={() => setSelectedWallpaper(wallpaper.id)}
              style={{
                border: selectedWallpaper === wallpaper.id ? '2px solid #000000' : '1px solid #808080'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '30px',
                  background: getWallpaperPreview(wallpaper.id)
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Buttons */}
      <div
        className="flex justify-end gap-2 p-4 border-t-2"
        style={{ borderColor: '#ffffff' }}
      >
        <button className="win95-button px-6" onClick={handleOk}>
          OK
        </button>
        <button className="win95-button px-6">
          Cancel
        </button>
        <button className="win95-button px-6" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};
