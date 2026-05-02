import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 300);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(dotsInterval);
          setTimeout(onBootComplete, 500);
          return 100;
        }
        return prev + 4;
      });
    }, 50);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, [onBootComplete]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: '#000000' }}
    >
      {/* Windows 95 Logo Text */}
      <div className="mb-12">
        <div
          className="text-4xl font-bold mb-2"
          style={{ color: '#FFFFFF', fontFamily: 'Arial, sans-serif' }}
        >
          Windows <span style={{ color: '#FF0000' }}>95</span>
        </div>
      </div>
      
      {/* Loading Text */}
      <div
        className="text-lg mb-8"
        style={{ color: '#C0C0C0', fontFamily: 'MS Sans Serif, monospace' }}
      >
        Starting Windows 95{dots}
      </div>
      
      {/* Progress Bar */}
      <div
        className="relative"
        style={{
          width: '300px',
          height: '20px',
          background: '#808080',
          border: '2px solid #000000'
        }}
      >
        <div
          className="absolute top-0 left-0 h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: '#000080'
          }}
        />
      </div>
      
      {/* Copyright */}
      <div
        className="absolute bottom-8 text-xs"
        style={{ color: '#808080' }}
      >
        Copyright © Microsoft Corporation 1981-1995
      </div>
    </div>
  );
};
