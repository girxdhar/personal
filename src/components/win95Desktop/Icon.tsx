import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface IconProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  selected: boolean;
  onSelect: () => void;
  onDoubleClick: () => void;
  onDragEnd: (x: number, y: number) => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export const Icon: React.FC<IconProps> = ({
  id,
  title,
  icon,
  x,
  y,
  selected,
  onSelect,
  onDoubleClick,
  onDragEnd,
  onContextMenu
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const lastClickTime = useRef(0);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    
    e.stopPropagation();
    onSelect();
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    
    if (timeSinceLastClick < 500) {
      // Double click
      onDoubleClick();
    }
    
    lastClickTime.current = now;
    onSelect();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    onContextMenu(e);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Update position immediately while dragging
      if (iconRef.current) {
        iconRef.current.style.left = `${newX}px`;
        iconRef.current.style.top = `${newY}px`;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false);
      
      // Snap to grid (20px)
      const snappedX = Math.round((e.clientX - dragOffset.x) / 20) * 20;
      const snappedY = Math.round((e.clientY - dragOffset.y) / 20) * 20;
      
      onDragEnd(snappedX, snappedY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onDragEnd]);

  return (
    <div
      ref={iconRef}
      className="absolute cursor-pointer select-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: '80px'
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {/* Selection highlight */}
      {selected && (
        <div
          className="absolute inset-0 border border-dashed"
          style={{
            backgroundColor: 'rgba(0, 0, 128, 0.3)',
            borderColor: '#FFFFFF',
            margin: '-4px',
            padding: '4px'
          }}
        />
      )}
      
      {/* Icon */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
        
        {/* Label */}
        <div
          className={`desktop-icon-label px-1 ${selected ? 'selected' : ''}`}
          style={{
            fontSize: '11px',
            maxWidth: '80px',
            wordBreak: 'break-word',
            lineHeight: '1.2'
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
