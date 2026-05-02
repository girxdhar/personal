import React from 'react';

export interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  separator?: boolean;
  action?: () => void;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const handleItemClick = (item: ContextMenuItem) => {
    if (!item.disabled && item.action) {
      item.action();
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        style={{ zIndex: 9998 }}
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault();
          onClose();
        }}
      />
      
      {/* Menu */}
      <div
        className="context-menu fixed"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          zIndex: 9999,
          minWidth: '180px'
        }}
      >
        {items.map((item, index) => {
          if (item.separator) {
            return <div key={index} className="context-menu-separator" />;
          }
          
          return (
            <div
              key={index}
              className={`context-menu-item ${item.disabled ? 'disabled' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon && (
                <div className="w-4 h-4 mr-2 absolute left-2">
                  {item.icon}
                </div>
              )}
              <span style={{ marginLeft: item.icon ? '20px' : '0' }}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
