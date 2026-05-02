import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, Folder, List, Grid3x3, FileText, Star } from 'lucide-react';
import { Poem } from '../../data/poems';
import { TextFileIcon, FolderIcon } from '../icons/DesktopIcons';

interface FileExplorerProps {
  title: string;
  poems: Poem[];
  poemMetadata: Record<string, { readCount: number; isFavorite: boolean }>;
  onPoemOpen: (poem: Poem) => void;
  showFavoritesOnly?: boolean;
}

type ViewMode = 'icons' | 'list';

export const FileExplorer: React.FC<FileExplorerProps> = ({
  title,
  poems,
  poemMetadata,
  onPoemOpen,
  showFavoritesOnly = false
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('icons');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'reads'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredPoems = showFavoritesOnly
    ? poems.filter(poem => poemMetadata[poem.id]?.isFavorite)
    : poems;

  const sortedPoems = [...filteredPoems].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'date':
        comparison = a.modified.getTime() - b.modified.getTime();
        break;
      case 'reads':
        comparison = (poemMetadata[a.id]?.readCount || 0) - (poemMetadata[b.id]?.readCount || 0);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (column: 'name' | 'date' | 'reads') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#FFFFFF' }}>
      {/* Menu Bar */}
      <div
        className="flex gap-4 px-2 text-xs"
        style={{
          background: '#c0c0c0',
          borderBottom: '1px solid #808080'
        }}
      >
        <div className="py-1 px-2 cursor-pointer hover:bg-blue-800 hover:text-white"
          style={{ userSelect: 'none' }}
        >
          <span style={{ textDecoration: 'underline' }}>F</span>ile
        </div>
        <div className="py-1 px-2 cursor-pointer hover:bg-blue-800 hover:text-white"
          style={{ userSelect: 'none' }}
        >
          <span style={{ textDecoration: 'underline' }}>E</span>dit
        </div>
        <div className="py-1 px-2 cursor-pointer hover:bg-blue-800 hover:text-white"
          style={{ userSelect: 'none' }}
        >
          <span style={{ textDecoration: 'underline' }}>V</span>iew
        </div>
        <div className="py-1 px-2 cursor-pointer hover:bg-blue-800 hover:text-white"
          style={{ userSelect: 'none' }}
        >
          <span style={{ textDecoration: 'underline' }}>H</span>elp
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center gap-1 px-2 py-1"
        style={{
          background: '#c0c0c0',
          borderBottom: '2px solid #ffffff'
        }}
      >
        <button className="win95-button p-1" disabled>
          <ArrowLeft size={16} />
        </button>
        <button className="win95-button p-1" disabled>
          <ArrowRight size={16} />
        </button>
        <button className="win95-button p-1" disabled>
          <ArrowUp size={16} />
        </button>
        
        <div className="w-px h-6 bg-gray-400 mx-1" />
        
        <button
          className={`win95-button p-1 ${viewMode === 'icons' ? 'active' : ''}`}
          onClick={() => setViewMode('icons')}
          style={viewMode === 'icons' ? {
            borderColor: '#000000 #ffffff #ffffff #000000',
            outlineColor: '#808080 #dfdfdf #dfdfdf #808080'
          } : {}}
        >
          <Grid3x3 size={16} />
        </button>
        <button
          className={`win95-button p-1 ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
          style={viewMode === 'list' ? {
            borderColor: '#000000 #ffffff #ffffff #000000',
            outlineColor: '#808080 #dfdfdf #dfdfdf #808080'
          } : {}}
        >
          <List size={16} />
        </button>
      </div>

      {/* Address Bar */}
      <div
        className="flex items-center gap-2 px-2 py-1 text-xs"
        style={{
          background: '#c0c0c0',
          borderBottom: '2px solid #ffffff'
        }}
      >
        <span className="font-bold">Address:</span>
        <div
          className="flex-1 px-2 py-1"
          style={{
            background: '#ffffff',
            border: '1px solid #808080'
          }}
        >
          <Folder size={12} className="inline mr-1" />
          C:\Poetry\{showFavoritesOnly ? 'Favorites' : 'My Poems'}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto win95-scroll p-2">
        {sortedPoems.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center" style={{ color: '#808080' }}>
              <div className="text-lg mb-2">
                {showFavoritesOnly ? 'No favorite poems yet' : 'No poems found'}
              </div>
              {showFavoritesOnly && (
                <div className="text-xs">
                  Click the star icon when viewing a poem to add it to favorites
                </div>
              )}
            </div>
          </div>
        ) : viewMode === 'icons' ? (
          <div className="grid grid-cols-5 gap-4">
            {sortedPoems.map(poem => (
              <div
                key={poem.id}
                className="flex flex-col items-center gap-2 p-2 cursor-pointer"
                onDoubleClick={() => onPoemOpen(poem)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 128, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div className="relative">
                  <TextFileIcon size={32} />
                  {poemMetadata[poem.id]?.isFavorite && (
                    <div className="absolute -top-1 -right-1">
                      <svg width="14" height="14" viewBox="0 0 16 16">
                        <path
                          d="M8 2 L10 6 L14 6 L11 9 L12 13 L8 11 L4 13 L5 9 L2 6 L6 6 Z"
                          fill="#FFD700"
                          stroke="#000000"
                          strokeWidth="0.5"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-xs text-center break-words w-full" style={{ lineHeight: '1.2' }}>
                  {poem.title}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {/* List View Header */}
            <div
              className="flex items-center gap-2 px-2 py-1 text-xs font-bold border-b"
              style={{
                background: '#c0c0c0',
                borderColor: '#ffffff #000000 #000000 #ffffff'
              }}
            >
              <div className="w-8" />
              <div
                className="flex-1 cursor-pointer select-none"
                onClick={() => handleSort('name')}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
              </div>
              <div className="w-20 text-right">Size</div>
              <div className="w-24">Type</div>
              <div
                className="w-32 cursor-pointer select-none"
                onClick={() => handleSort('date')}
              >
                Modified {sortBy === 'date' && (sortOrder === 'asc' ? '▲' : '▼')}
              </div>
              <div
                className="w-20 text-right cursor-pointer select-none"
                onClick={() => handleSort('reads')}
              >
                Reads {sortBy === 'reads' && (sortOrder === 'asc' ? '▲' : '▼')}
              </div>
              <div className="w-12 text-center">★</div>
            </div>

            {/* List View Items */}
            {sortedPoems.map((poem, index) => (
              <div
                key={poem.id}
                className="flex items-center gap-2 px-2 py-1 text-xs cursor-pointer"
                onDoubleClick={() => onPoemOpen(poem)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000080';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = index % 2 === 0 ? '#ffffff' : '#f0f0f0';
                  e.currentTarget.style.color = '#000000';
                }}
                style={{
                  background: index % 2 === 0 ? '#ffffff' : '#f0f0f0'
                }}
              >
                <div className="w-8 flex items-center justify-center">
                  <TextFileIcon size={16} />
                </div>
                <div className="flex-1 truncate">{poem.title}</div>
                <div className="w-20 text-right">{Math.round(poem.content.length / 1024 * 10) / 10} KB</div>
                <div className="w-24">Text Document</div>
                <div className="w-32">{poem.modified.toLocaleDateString()}</div>
                <div className="w-20 text-right">{poemMetadata[poem.id]?.readCount || 0}</div>
                <div className="w-12 text-center">
                  {poemMetadata[poem.id]?.isFavorite && (
                    <span style={{ color: '#FFD700' }}>★</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div
        className="px-2 py-1 text-xs flex items-center gap-4"
        style={{
          background: '#c0c0c0',
          borderTop: '2px solid #ffffff'
        }}
      >
        <div>{sortedPoems.length} object(s)</div>
        {showFavoritesOnly && (
          <div>{sortedPoems.length} favorite(s)</div>
        )}
      </div>
    </div>
  );
};
