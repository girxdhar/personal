import React from 'react';
import { BookOpen } from 'lucide-react';

interface AboutDialogProps {
  poemCount: number;
  favoriteCount: number;
}

export const AboutDialog: React.FC<AboutDialogProps> = ({ poemCount, favoriteCount }) => {
  return (
    <div className="flex flex-col h-full" style={{ background: '#c0c0c0' }}>
      <div className="flex-1 p-6 flex gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div
            className="w-16 h-16 flex items-center justify-center"
            style={{ background: '#000080' }}
          >
            <BookOpen size={40} color="#FFFFFF" />
          </div>
        </div>
        
        {/* Info */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="text-xl font-bold">
            Windows 95 Poetry Desktop
          </div>
          
          <div className="text-xs">
            Version 1.0
          </div>
          
          <div className="text-xs" style={{ color: '#808080' }}>
            Copyright © 1995
          </div>
          
          <div className="mt-4 text-xs space-y-1">
            <div>
              <span className="font-bold">System Information:</span>
            </div>
            <div>
              {poemCount} poems installed
            </div>
            <div>
              {favoriteCount} favorites
            </div>
          </div>
          
          <div className="mt-4 text-xs">
            Licensed to: Poetry Enthusiast
          </div>
          
          <div className="mt-2 text-xs" style={{ color: '#808080' }}>
            This product is licensed to you under the terms of nostalgia and appreciation for the golden age of computing.
          </div>
        </div>
      </div>
      
      {/* Button */}
      <div
        className="flex justify-center p-4 border-t-2"
        style={{ borderColor: '#ffffff' }}
      >
        <button className="win95-button px-12">
          OK
        </button>
      </div>
    </div>
  );
};
