import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
  active: boolean;
  minimized: boolean;
  maximized: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onPositionChange?: (x: number, y: number) => void;
  onSizeChange?: (width: number, height: number) => void;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  children,
  initialX = 100,
  initialY = 100,
  initialWidth = 600,
  initialHeight = 400,
  minWidth = 320,
  minHeight = 240,
  active,
  minimized,
  maximized,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
  onSizeChange
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [savedPosition, setSavedPosition] = useState({ x: initialX, y: initialY });
  const [savedSize, setSavedSize] = useState({ width: initialWidth, height: initialHeight });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || maximized) return;
    
    e.stopPropagation();
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (maximized) return;
    
    e.preventDefault();
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMinimize();
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!maximized) {
      // Save current position and size
      setSavedPosition(position);
      setSavedSize(size);
    } else {
      // Restore saved position and size
      setPosition(savedPosition);
      setSize(savedSize);
    }
    
    onMaximize();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - size.width));
      const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 28 - 40));
      
      setPosition({ x: newX, y: newY });
      onPositionChange?.(newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, size.width, onPositionChange]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      const newWidth = Math.max(minWidth, resizeStart.width + deltaX);
      const newHeight = Math.max(minHeight, resizeStart.height + deltaY);
      
      setSize({ width: newWidth, height: newHeight });
      onSizeChange?.(newWidth, newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeStart, minWidth, minHeight, onSizeChange]);

  if (minimized) return null;

  const windowStyle = maximized
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100vh - 28px)' }
    : { left: position.x, top: position.y, width: size.width, height: size.height };

  return (
    <motion.div
      ref={windowRef}
      className="win95-window absolute flex flex-col"
      style={windowStyle}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`win95-title-bar ${active ? 'active' : 'inactive'}`}
        onMouseDown={handleTitleBarMouseDown}
      >
        {/* Icon */}
        {icon && (
          <div className="w-4 h-4 mr-1 flex items-center justify-center">
            {icon}
          </div>
        )}
        
        {/* Title */}
        <div className="flex-1 text-white font-bold text-xs truncate select-none">
          {title}
        </div>
        
        {/* Control Buttons */}
        <div className="flex gap-0.5">
          <button
            className="win95-button w-4 h-4 flex items-center justify-center p-0"
            onClick={handleMinimize}
            style={{ padding: 0, minWidth: '16px', minHeight: '14px' }}
          >
            <Minus size={10} />
          </button>
          <button
            className="win95-button w-4 h-4 flex items-center justify-center p-0"
            onClick={handleMaximize}
            style={{ padding: 0, minWidth: '16px', minHeight: '14px' }}
          >
            <Square size={8} />
          </button>
          <button
            className="win95-button w-4 h-4 flex items-center justify-center p-0"
            onClick={handleClose}
            style={{ padding: 0, minWidth: '16px', minHeight: '14px' }}
          >
            <X size={10} />
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="flex-1 overflow-hidden bg-white">
        {children}
      </div>
      
      {/* Resize Handle */}
      {!maximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, transparent 40%, #808080 40%, #808080 45%, transparent 45%, transparent 50%, #808080 50%, #808080 55%, transparent 55%)',
          }}
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </motion.div>
  );
};
