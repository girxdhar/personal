import React, { useState, useRef, useEffect } from 'react';

interface Drive {
  id: string;
  letter: string;
  label: string;
  type: 'hard' | 'floppy' | 'cdrom';
  totalSpace: number;
  usedSpace: number;
}

interface MyComputerProps {
  onOpenDrive?: (driveId: string) => void;
  onOpenPoems?: () => void;
  onOpenFavorites?: () => void;
}

export function MyComputer({ onOpenDrive, onOpenPoems, onOpenFavorites }: MyComputerProps) {
  const [viewMode, setViewMode] = useState<'large' | 'list' | 'details'>('large');
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; driveId: string } | null>(null);
  const [showProperties, setShowProperties] = useState<Drive | null>(null);
  
  const drives: Drive[] = [
    { id: 'c', letter: 'C:', label: 'Poetry Collection (C:)', type: 'hard', totalSpace: 2000, usedSpace: 1200 },
    { id: 'd', letter: 'D:', label: 'Favorites (D:)', type: 'hard', totalSpace: 1500, usedSpace: 300 },
    { id: 'a', letter: 'A:', label: '3½ Floppy (A:)', type: 'floppy', totalSpace: 1.44, usedSpace: 0 },
    { id: 'e', letter: 'E:', label: 'CD-ROM Drive (E:)', type: 'cdrom', totalSpace: 650, usedSpace: 650 }
  ];

  useEffect(() => {
    const handleClick = () => { setContextMenu(null); };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleDriveClick = (driveId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDrive(driveId);
  };

  const handleDriveDoubleClick = (driveId: string) => {
    if (driveId === 'c') onOpenPoems?.();
    else if (driveId === 'd') onOpenFavorites?.();
    else if (driveId === 'a' || driveId === 'e') {
      alert(`${driveId.toUpperCase()}: is not accessible.\n\nThe device is not ready.`);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, driveId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDrive(driveId);
    setContextMenu({ x: e.clientX, y: e.clientY, driveId });
  };

  const formatSize = (mb: number) => {
    if (mb >= 1000) return `${(mb / 1024).toFixed(2)} GB`;
    return `${mb.toFixed(0)} MB`;
  };

  // Old school Windows 95 drive icon with dithering effect
  const DriveIcon = ({ type, selected }: { type: string; selected: boolean }) => (
    <div style={{
      width: '32px',
      height: '32px',
      imageRendering: 'pixelated',
      position: 'relative'
    }}>
      {type === 'hard' && (
        <div style={{ width: '32px', height: '32px', background: selected ? '#fff' : '#000', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '2px', background: selected ? '#000' : '#808080' }}>
            <div style={{ position: 'absolute', top: '0', left: '0', right: '0', height: '3px', background: selected ? '#fff' : '#000080' }} />
            <div style={{ position: 'absolute', top: '8px', left: '4px', right: '4px', height: '12px', background: selected ? '#fff' : '#000' }}>
              <div style={{ margin: '1px', height: '10px', background: selected ? '#000' : '#008080' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '4px', right: '2px', width: '4px', height: '4px', borderRadius: '50%', background: selected ? '#000' : '#00ff00' }} />
          </div>
        </div>
      )}
      {type === 'floppy' && (
        <div style={{ width: '32px', height: '32px', background: selected ? '#fff' : '#000', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '2px', background: selected ? '#000' : '#00f' }}>
            <div style={{ position: 'absolute', top: '4px', left: '4px', right: '4px', height: '10px', background: selected ? '#fff' : '#808080', border: `1px solid ${selected ? '#000' : '#000'}` }} />
            <div style={{ position: 'absolute', bottom: '4px', left: '8px', right: '8px', height: '8px', background: selected ? '#fff' : '#404040' }}>
              <div style={{ width: '2px', height: '2px', background: selected ? '#000' : '#fff', margin: '3px auto' }} />
            </div>
          </div>
        </div>
      )}
      {type === 'cdrom' && (
        <div style={{ width: '32px', height: '32px', position: 'relative' }}>
          <div style={{ 
            width: '28px', 
            height: '28px', 
            margin: '2px',
            borderRadius: '50%', 
            background: selected ? '#fff' : `conic-gradient(from 0deg, #ff0 0deg, #ff0 60deg, #fa0 60deg, #fa0 120deg, #ff0 120deg, #ff0 180deg, #fa0 180deg, #fa0 240deg, #ff0 240deg, #ff0 300deg, #fa0 300deg, #fa0 360deg)`,
            border: `2px solid ${selected ? '#000' : '#888'}`
          }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              margin: '8px auto',
              borderRadius: '50%', 
              background: selected ? '#000' : '#333',
              border: `1px solid ${selected ? '#fff' : '#000'}`
            }} />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#c0c0c0',
      fontFamily: 'MS Sans Serif, Arial, sans-serif',
      fontSize: '11px',
      imageRendering: 'pixelated'
    }}>
      {/* Menu Bar */}
      <div style={{
        display: 'flex',
        backgroundColor: '#fff',
        borderBottom: '1px solid #808080',
        padding: '2px 0'
      }}>
        {['File', 'Edit', 'View', 'Help'].map(menu => (
          <div key={menu} style={{
            padding: '3px 8px',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#000080'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = '#000080';
            e.currentTarget.style.color = '#fff';
          }}
          >
            <span style={{ textDecoration: 'underline' }}>{menu[0]}</span>{menu.slice(1)}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: '2px',
        padding: '3px',
        backgroundColor: '#c0c0c0',
        borderBottom: '2px solid #fff',
        borderTop: '2px solid #fff'
      }}>
        {/* Back/Forward/Up */}
        {['←', '→', '↑'].map((arrow, i) => (
          <button key={i} disabled style={{
            width: '24px',
            height: '22px',
            backgroundColor: '#c0c0c0',
            border: '2px solid',
            borderColor: '#fff #000 #000 #fff',
            fontSize: '14px',
            color: '#808080',
            cursor: 'default'
          }}>
            {arrow}
          </button>
        ))}
        
        <div style={{ width: '2px', background: 'linear-gradient(to right, #808080, #fff)', margin: '0 2px' }} />
        
        {/* Cut/Copy/Paste */}
        {['✂', '📋', '📄'].map((icon, i) => (
          <button key={i} disabled style={{
            width: '24px',
            height: '22px',
            backgroundColor: '#c0c0c0',
            border: '2px solid',
            borderColor: '#fff #000 #000 #fff',
            fontSize: '12px',
            color: '#808080',
            cursor: 'default'
          }}>
            {icon}
          </button>
        ))}

        <div style={{ width: '2px', background: 'linear-gradient(to right, #808080, #fff)', margin: '0 2px' }} />

        {/* View Buttons */}
        {[
          { mode: 'large', icon: '⊞' },
          { mode: 'list', icon: '☰' },
          { mode: 'details', icon: '▤' }
        ].map(({ mode, icon }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as any)}
            style={{
              width: '24px',
              height: '22px',
              backgroundColor: '#c0c0c0',
              border: '2px solid',
              borderColor: viewMode === mode ? '#000 #fff #fff #000' : '#fff #000 #000 #fff',
              fontSize: '14px',
              cursor: 'pointer',
              paddingTop: viewMode === mode ? '2px' : '0',
              paddingLeft: viewMode === mode ? '2px' : '0'
            }}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        backgroundColor: '#fff',
        border: '2px solid',
        borderColor: '#808080 #fff #fff #808080',
        margin: '0'
      }}
      onClick={() => setSelectedDrive(null)}
      >
        {viewMode === 'large' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 120px)',
            gap: '20px',
            padding: '20px'
          }}>
            {drives.map(drive => (
              <div
                key={drive.id}
                onClick={(e) => handleDriveClick(drive.id, e)}
                onDoubleClick={() => handleDriveDoubleClick(drive.id)}
                onContextMenu={(e) => handleContextMenu(e, drive.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px',
                  cursor: 'default',
                  backgroundColor: selectedDrive === drive.id ? '#000080' : 'transparent',
                  color: selectedDrive === drive.id ? '#fff' : '#000',
                  border: selectedDrive === drive.id ? '1px dotted #fff' : '1px dotted transparent',
                  userSelect: 'none'
                }}
              >
                <DriveIcon type={drive.type} selected={selectedDrive === drive.id} />
                <div style={{
                  marginTop: '8px',
                  fontSize: '11px',
                  textAlign: 'center',
                  wordWrap: 'break-word',
                  width: '100%'
                }}>
                  {drive.label}
                </div>
                {drive.type !== 'floppy' && (
                  <div style={{ marginTop: '8px', width: '90px' }}>
                    <div style={{
                      width: '100%',
                      height: '10px',
                      border: '1px solid #000',
                      backgroundColor: selectedDrive === drive.id ? '#fff' : '#fff'
                    }}>
                      <div style={{
                        width: `${(drive.usedSpace / drive.totalSpace) * 100}%`,
                        height: '100%',
                        backgroundColor: selectedDrive === drive.id ? '#000' : '#00f'
                      }} />
                    </div>
                    <div style={{
                      fontSize: '9px',
                      marginTop: '2px',
                      textAlign: 'center'
                    }}>
                      {formatSize(drive.totalSpace - drive.usedSpace)} free
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {viewMode === 'list' && (
          <div style={{ padding: '4px' }}>
            {drives.map(drive => (
              <div
                key={drive.id}
                onClick={(e) => handleDriveClick(drive.id, e)}
                onDoubleClick={() => handleDriveDoubleClick(drive.id)}
                onContextMenu={(e) => handleContextMenu(e, drive.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 8px',
                  cursor: 'default',
                  backgroundColor: selectedDrive === drive.id ? '#000080' : 'transparent',
                  color: selectedDrive === drive.id ? '#fff' : '#000',
                  userSelect: 'none'
                }}
              >
                <DriveIcon type={drive.type} selected={selectedDrive === drive.id} />
                <span>{drive.label}</span>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'details' && (
          <div>
            {/* Header */}
            <div style={{
              display: 'flex',
              backgroundColor: '#c0c0c0',
              borderBottom: '2px solid',
              borderColor: '#fff #808080 #808080 #fff',
              padding: '4px',
              fontWeight: 'bold'
            }}>
              <div style={{ flex: 1 }}>Name</div>
              <div style={{ width: '120px' }}>Type</div>
              <div style={{ width: '100px' }}>Total Size</div>
              <div style={{ width: '100px' }}>Free Space</div>
            </div>
            {/* Rows */}
            {drives.map(drive => (
              <div
                key={drive.id}
                onClick={(e) => handleDriveClick(drive.id, e)}
                onDoubleClick={() => handleDriveDoubleClick(drive.id)}
                onContextMenu={(e) => handleContextMenu(e, drive.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                  cursor: 'default',
                  backgroundColor: selectedDrive === drive.id ? '#000080' : 'transparent',
                  color: selectedDrive === drive.id ? '#fff' : '#000',
                  borderBottom: '1px solid #c0c0c0',
                  userSelect: 'none'
                }}
              >
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DriveIcon type={drive.type} selected={selectedDrive === drive.id} />
                  <span>{drive.label}</span>
                </div>
                <div style={{ width: '120px' }}>
                  {drive.type === 'hard' ? 'Local Disk' : drive.type === 'floppy' ? '3½ Floppy' : 'CD-ROM Disc'}
                </div>
                <div style={{ width: '100px' }}>{formatSize(drive.totalSpace)}</div>
                <div style={{ width: '100px' }}>
                  {drive.type !== 'cdrom' ? formatSize(drive.totalSpace - drive.usedSpace) : '—'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 8px',
        backgroundColor: '#c0c0c0',
        borderTop: '2px solid',
        borderColor: '#fff #808080 #808080 #fff',
        fontSize: '11px'
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{
            padding: '2px 8px',
            border: '2px solid',
            borderColor: '#808080 #fff #fff #808080'
          }}>
            {drives.length} object(s)
          </div>
          {selectedDrive && (
            <div style={{
              padding: '2px 8px',
              border: '2px solid',
              borderColor: '#808080 #fff #fff #808080'
            }}>
              {(() => {
                const drive = drives.find(d => d.id === selectedDrive);
                return drive && drive.type !== 'cdrom' ? `${formatSize(drive.totalSpace - drive.usedSpace)} free` : '';
              })()}
            </div>
          )}
        </div>
        <div style={{
          width: '16px',
          height: '16px',
          border: '2px solid',
          borderColor: '#808080 #fff #fff #808080',
          backgroundColor: '#c0c0c0'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            background: 'linear-gradient(135deg, #808080 25%, transparent 25%, transparent 75%, #808080 75%), linear-gradient(135deg, #808080 25%, transparent 25%, transparent 75%, #808080 75%)',
            backgroundSize: '4px 4px',
            backgroundPosition: '0 0, 2px 2px'
          }} />
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: contextMenu.x,
            top: contextMenu.y,
            backgroundColor: '#c0c0c0',
            border: '2px solid',
            borderColor: '#fff #000 #000 #fff',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.5)',
            minWidth: '150px',
            zIndex: 9999
          }}
        >
          {[
            { label: 'Open', bold: true, action: () => handleDriveDoubleClick(contextMenu.driveId) },
            { label: 'Explore', action: () => {} },
            { separator: true },
            { label: 'Find...', disabled: true },
            { separator: true },
            { label: 'Format...', disabled: true },
            { separator: true },
            { label: 'Properties', action: () => {
              const drive = drives.find(d => d.id === contextMenu.driveId);
              if (drive) setShowProperties(drive);
              setContextMenu(null);
            }}
          ].map((item, i) => 
            item.separator ? (
              <div key={i} style={{
                height: '1px',
                margin: '2px 4px',
                background: 'linear-gradient(to right, #808080, #fff)'
              }} />
            ) : (
              <div
                key={i}
                onClick={!item.disabled ? item.action : undefined}
                style={{
                  padding: '4px 24px',
                  cursor: item.disabled ? 'default' : 'pointer',
                  color: item.disabled ? '#808080' : '#000',
                  fontWeight: item.bold ? 'bold' : 'normal'
                }}
                onMouseOver={(e) => !item.disabled && (e.currentTarget.style.backgroundColor = '#000080', e.currentTarget.style.color = '#fff')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent', e.currentTarget.style.color = item.disabled ? '#808080' : '#000')}
              >
                {item.label}
              </div>
            )
          )}
        </div>
      )}

      {/* Properties Dialog */}
      {showProperties && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}
        onClick={() => setShowProperties(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '320px',
              backgroundColor: '#c0c0c0',
              border: '2px solid',
              borderColor: '#fff #000 #000 #fff',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.5)'
            }}
          >
            {/* Title Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '3px',
              background: 'linear-gradient(to right, #000080, #1084d0)',
              color: '#fff',
              fontWeight: 'bold'
            }}>
              <span>{showProperties.label} Properties</span>
              <button
                onClick={() => setShowProperties(null)}
                style={{
                  width: '16px',
                  height: '14px',
                  backgroundColor: '#c0c0c0',
                  border: '2px solid',
                  borderColor: '#fff #000 #000 #fff',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: '#000'
                }}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <DriveIcon type={showProperties.type} selected={false} />
                <div>
                  <div style={{ fontWeight: 'bold' }}>{showProperties.label}</div>
                  <div style={{ fontSize: '10px', color: '#808080' }}>
                    {showProperties.type === 'hard' ? 'Local Disk' : showProperties.type === 'floppy' ? '3½ Floppy' : 'CD-ROM Disc'}
                  </div>
                </div>
              </div>

              <div style={{
                borderTop: '2px solid',
                borderColor: '#808080 #fff #fff #808080',
                paddingTop: '12px',
                fontSize: '11px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Used space:</span>
                  <span style={{ color: '#00f' }}>{formatSize(showProperties.usedSpace)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Free space:</span>
                  <span style={{ color: '#f0f' }}>{formatSize(showProperties.totalSpace - showProperties.usedSpace)}</span>
                </div>
                <div style={{
                  borderTop: '1px solid #808080',
                  paddingTop: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 'bold'
                }}>
                  <span>Capacity:</span>
                  <span>{formatSize(showProperties.totalSpace)}</span>
                </div>

                {/* Pie Chart */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="#f0f" />
                    <path
                      d={`M 50 50 L 50 5 A 45 45 0 ${showProperties.usedSpace / showProperties.totalSpace > 0.5 ? 1 : 0} 1 ${
                        50 + 45 * Math.sin((showProperties.usedSpace / showProperties.totalSpace) * 2 * Math.PI)
                      } ${
                        50 - 45 * Math.cos((showProperties.usedSpace / showProperties.totalSpace) * 2 * Math.PI)
                      } Z`}
                      fill="#00f"
                    />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#000" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderTop: '2px solid',
              borderColor: '#fff #808080 #808080 #fff'
            }}>
              <button
                onClick={() => setShowProperties(null)}
                style={{
                  padding: '4px 20px',
                  backgroundColor: '#c0c0c0',
                  border: '2px solid',
                  borderColor: '#fff #000 #000 #fff',
                  cursor: 'pointer'
                }}
              >
                OK
              </button>
              <button
                onClick={() => setShowProperties(null)}
                style={{
                  padding: '4px 20px',
                  backgroundColor: '#c0c0c0',
                  border: '2px solid',
                  borderColor: '#fff #000 #000 #fff',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}