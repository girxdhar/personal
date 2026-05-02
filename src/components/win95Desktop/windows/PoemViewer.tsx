import React, { useState } from 'react';
import { Star, BookOpen, Printer, Copy } from 'lucide-react';
import { Poem } from '../data/poems';

interface PoemViewerProps {
  poem: Poem;
  readCount: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onIncrementRead: () => void;
}

export const PoemViewer: React.FC<PoemViewerProps> = ({
  poem,
  readCount,
  isFavorite,
  onToggleFavorite,
  onIncrementRead
}) => {
  const [readerMode, setReaderMode] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  React.useEffect(() => {
    onIncrementRead();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(poem.content);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handlePrint = () => {
    // Show "printed" message
    alert('Poem sent to printer!');
  };

  if (readerMode) {
    return (
      <div className="flex flex-col h-full" style={{ background: '#FFFEF0' }}>
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-2 py-1 border-b-2"
          style={{
            background: '#c0c0c0',
            borderColor: '#808080 #ffffff #ffffff #808080'
          }}
        >
          <button
            className="win95-button text-xs flex items-center gap-1"
            onClick={() => setReaderMode(false)}
          >
            <BookOpen size={14} />
            Standard View
          </button>
          
          <button
            className="win95-button text-xs flex items-center gap-1"
            onClick={onToggleFavorite}
          >
            <Star size={14} fill={isFavorite ? '#FFD700' : 'none'} color={isFavorite ? '#FFD700' : '#000000'} />
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
        
        {/* Reader Content */}
        <div className="flex-1 overflow-auto win95-scroll p-16">
          <div className="max-w-3xl mx-auto">
            {/* ASCII Border Top */}
            <div className="text-center mb-6 font-mono text-sm" style={{ color: '#808080' }}>
              ╔════════════════════════════════════════════════════════════╗
            </div>
            
            {/* Title */}
            <h1 className="text-center mb-8" style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {poem.title}
            </h1>
            
            {/* Poem Content */}
            <pre
              className="whitespace-pre-wrap text-center leading-loose"
              style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '14px',
                lineHeight: '2'
              }}
            >
              {poem.content}
            </pre>
            
            {/* ASCII Border Bottom */}
            <div className="text-center mt-6 font-mono text-sm" style={{ color: '#808080' }}>
              ╚════════════════════════════════════════════════════════════╝
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div
          className="px-4 py-1 text-xs text-right"
          style={{
            background: '#c0c0c0',
            borderTop: '2px solid #ffffff',
            color: '#808080'
          }}
        >
          Read {readCount} {readCount === 1 ? 'time' : 'times'}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-2 py-1 border-b-2"
        style={{
          background: '#c0c0c0',
          borderColor: '#808080 #ffffff #ffffff #808080'
        }}
      >
        <button
          className="win95-button text-xs flex items-center gap-1"
          onClick={() => setReaderMode(true)}
        >
          <BookOpen size={14} />
          Reader Mode
        </button>
        
        <button
          className="win95-button text-xs flex items-center gap-1"
          onClick={onToggleFavorite}
        >
          <Star size={14} fill={isFavorite ? '#FFD700' : 'none'} color={isFavorite ? '#FFD700' : '#000000'} />
          {isFavorite ? 'Favorited' : 'Favorite'}
        </button>
        
        <button
          className="win95-button text-xs flex items-center gap-1"
          onClick={handlePrint}
        >
          <Printer size={14} />
          Print
        </button>
        
        <button
          className="win95-button text-xs flex items-center gap-1"
          onClick={handleCopy}
        >
          <Copy size={14} />
          {showCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto win95-scroll p-5">
        <pre
          className="whitespace-pre-wrap"
          style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            lineHeight: '1.8'
          }}
        >
          {poem.content}
        </pre>
      </div>
      
      {/* Footer */}
      <div
        className="px-4 py-1 text-xs"
        style={{
          background: '#c0c0c0',
          borderTop: '2px solid #ffffff'
        }}
      >
        Read {readCount} {readCount === 1 ? 'time' : 'times'}
      </div>
    </div>
  );
};
