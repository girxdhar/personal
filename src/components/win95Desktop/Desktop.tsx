import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import wallpaper1 from '../win95Desktop/assets/wallpaper1.png'
import wallpaper2 from '../win95Desktop/assets/wallpaper2.png';
import wallpaper3 from '../win95Desktop/assets/wallpaper3.png';
import wallpaper4 from '../win95Desktop/assets/wallpaper4.png';
import wallpaper5 from '../win95Desktop/assets/wallpaper5.png';

interface DesktopProps {
  wallpaper: string;
  children: React.ReactNode;
  onContextMenu: (e: React.MouseEvent) => void;
}

const wallpaperImages: Record<string, string> = {
  teal: wallpaper1,
  clouds: wallpaper2,
  setup: wallpaper3,
  redblocks: wallpaper4,
  greencircuit: wallpaper5,
};


export const Desktop: React.FC<DesktopProps> = ({ wallpaper, children, onContextMenu }) => {
  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      style={{ bottom: '28px' }} // Leave space for taskbar
      onContextMenu={onContextMenu}
    >
      <ImageWithFallback
        src={wallpaperImages[wallpaper] || wallpaperImages.teal}
        alt="Desktop wallpaper"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ imageRendering: 'auto' }}
      />
      {children}
    </div>
  );
};