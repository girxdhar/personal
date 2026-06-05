  import React, { useState } from 'react';
  import { ChevronRight, FileText, Folder, Settings, Search, HelpCircle, Play, Power, Star } from 'lucide-react';

  interface MenuItem {
    label: string;
    icon?: React.ReactNode;
    hasSubmenu?: boolean;
    submenu?: MenuItem[];
    separator?: boolean;
    action?: () => void;
  }

  interface StartMenuProps {
    visible: boolean;
    onClose: () => void;
    onMenuAction: (action: string) => void;
  }

  export const StartMenu: React.FC<StartMenuProps> = ({ visible, onClose, onMenuAction }) => {
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

    if (!visible) return null;

    const menuItems: MenuItem[] = [
      {
        label: 'Programs',
        icon: <Folder size={16} />,
        hasSubmenu: true,
        submenu: [
          {
            label: 'My Poems',
            icon: <Folder size={16} />,
            action: () => {
              onMenuAction('openMyPoems');
              onClose();
            }
          },
          {
            label: 'Favorites',
            icon: <Star size={16} />,
            action: () => {
              onMenuAction('openFavorites');
              onClose();
            }
          },
          {
            label: 'New Poem',
            icon: <FileText size={16} />,
            action: () => {
              onMenuAction('newPoem');
              onClose();
            }
          }
        ]
      },
      {
        label: 'Settings',
        icon: <Settings size={16} />,
        hasSubmenu: true,
        submenu: [
          {
            label: 'Display Settings',
            action: () => {
              onMenuAction('displaySettings');
              onClose();
            }
          },
          {
            label: 'Sound Settings',
            action: () => {
              onMenuAction('soundSettings');
              onClose();
            }
          }
        ]
      },
      {
        label: 'Find',
        icon: <Search size={16} />,
        action: () => {
          onMenuAction('find');
          onClose();
        }
      },
      {
        label: 'Help',
        icon: <HelpCircle size={16} />,
        hasSubmenu: true,
        submenu: [
          {
            label: 'Help Topics',
            action: () => {
              onMenuAction('help');
              onClose();
            }
          },
          {
            label: 'About Poetry Desktop',
            action: () => {
              onMenuAction('about');
              onClose();
            }
          }
        ]
      },
      {
        label: 'Run...',
        icon: <Play size={16} />,
        action: () => {
          onMenuAction('run');
          onClose();
        }
      },
      { separator: true },
      {
        label: 'Shut Down...',
        icon: <Power size={16} />,
        action: () => {
          onMenuAction('shutdown');
          onClose();
        }
      }
    ];

    const handleItemClick = (item: MenuItem) => {
      if (item.action) {
        item.action();
      }
    };

    const handleItemHover = (label: string, hasSubmenu: boolean) => {
      if (hasSubmenu) {
        setActiveSubmenu(label);
      } else {
        setActiveSubmenu(null);
      }
    };

    return (
      <>
        {/* Backdrop to close menu */}
        <div
          className="absolute inset-0"
          style={{ zIndex: 9997 }}
          onClick={onClose}
        />
        
        {/* Start Menu */}
        <div
          className="context-menu absolute"
          style={{
            bottom: '28px',
            left: '0px',
            width: '250px',
            zIndex: 9998
          }}
        >
          <div className="flex">
            {/* Windows 95 Banner */}
            <div
              className="flex items-center justify-center"
              style={{
                width: '28px',
                background: 'linear-gradient(to bottom, #000080, #1084d0)',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                padding: '8px 0'
              }}
            >
              <span className="text-white font-bold text-sm tracking-wider">
                Windows 95
              </span>
            </div>
            
            {/* Menu Items */}
            <div className="flex-1">
              {menuItems.map((item, index) => {
                if (item.separator) {
                  return <div key={index} className="context-menu-separator" />;
                }
                
                return (
                  <div
                    key={index}
                    className="context-menu-item relative"
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => handleItemHover(item.label, item.hasSubmenu || false)}
                  >
                    <div className="w-4 h-4 mr-2">
                      {item.icon}
                    </div>
                    <span className="flex-1">{item.label}</span>
                    {item.hasSubmenu && (
                      <ChevronRight size={12} className="ml-2" />
                    )}
                    
                    {/* Submenu */}
                    {item.hasSubmenu && activeSubmenu === item.label && item.submenu && (
                      <div
                        className="context-menu absolute"
                        style={{
                          left: '100%',
                          top: '-4px',
                          width: '200px',
                          zIndex: 9999
                        }}
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className="context-menu-item"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemClick(subItem);
                            }}
                          >
                            {subItem.icon && (
                              <div className="w-4 h-4 mr-2">
                                {subItem.icon}
                              </div>
                            )}
                            <span>{subItem.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  };
