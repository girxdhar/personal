import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Desktop } from "./Desktop";
import { Icon } from "./Icon";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { ContextMenu, ContextMenuItem } from "./ContextMenu";
import { BootScreen } from "./BootScreen";
import { PoemViewer } from "./windows/PoemViewer";
import { DisplaySettings } from "./windows/DisplaySettings";
import { MyComputer } from "./MyComputer";
import MusicPlayer from "./MusicPlayer";
import "./poetrystyle.css";

import {
  FolderIcon,
  FavoriteFolderIcon,
  TextFileIcon,
  RecycleBinIcon,
  MyComputerIcon,
  MusicPlayerIcon,
} from "./icons/DesktopIcons";

import { FileText, Trash2 } from "lucide-react";
import { poems, Poem } from "./data/poems";
import { sounds, initAudio, setSoundEnabled as _setSoundEnabled } from "./utils/sounds";

// ==================== TYPES ====================
type DesktopIconType = {
  id: string;
  title: string;
  type: "folder" | "file" | "system";
  icon: React.ReactNode;
  action: () => void;
  initialPosition: { x: number; y: number };
  deletable?: boolean;
};

type WindowState = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
};

type RecycleBinItem = {
  id: string;
  title: string;
  type: "folder" | "file";
  icon: React.ReactNode;
  deletedAt: Date;
  originalData?: Poem;
};

// ==================== CONSTANTS ====================
const WALLPAPERS = ["teal", "clouds", "setup", "redblocks", "greencircuit", "wallpaper6"];

// Adjusted icon positions to start lower (avoiding header overlap)
const DEFAULT_ICON_POSITIONS: Record<string, { x: number; y: number }> = {
  "my-poems": { x: 20, y: 80 },
  favorites: { x: 20, y: 180 },
  about: { x: 20, y: 280 },
  "recycle-bin": { x: 20, y: 380 },
  "my-computer": { x: 20, y: 480 },
  "music-player": { x: 20, y: 580 },
};

// ==================== PROPS ====================
interface PoetryDesktopSectionProps {
  isActive?: boolean;
}

// ==================== MAIN COMPONENT ====================
export default function PoetryDesktopSection({ isActive = true }: PoetryDesktopSectionProps) {
  // ========== STATE ==========
  const [booting, setBooting] = useState(true);
  const [shuttingDown, setShuttingDown] = useState(false);
  const [shutdownStep, setShutdownStep] = useState(0);
  const [wallpaper, setWallpaper] = useState(
    WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)]
  );
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(
    DEFAULT_ICON_POSITIONS
  );

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(new Set());
  const [maximizedWindows, setMaximizedWindows] = useState<Set<string>>(new Set());
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; items: ContextMenuItem[] } | null>(null);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [poemMetadata, setPoemMetadata] = useState<Record<string, { readCount: number; isFavorite: boolean }>>(
    () => {
      const meta: Record<string, { readCount: number; isFavorite: boolean }> = {};
      poems.forEach((p) => {
        meta[p.id] = { readCount: 0, isFavorite: false };
      });
      return meta;
    }
  );

  // Recycle Bin State
  const [recycleBinItems, setRecycleBinItems] = useState<RecycleBinItem[]>([]);
  const [deletedPoems, setDeletedPoems] = useState<Set<string>>(new Set());

  // ========== EFFECTS ==========
  useEffect(() => {
    if (!booting && isActive) {
      initAudio();
      sounds.startup();
    }
  }, [booting, isActive]);

  useEffect(() => {
    _setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  // ========== WINDOW MANAGEMENT ==========
  const openWindow = useCallback((w: WindowState) => {
    setWindows((prev) => {
      const exists = prev.some((win) => win.id === w.id);
      if (exists) {
        setActiveWindowId(w.id);
        setMinimizedWindows((m) => {
          const s = new Set(m);
          s.delete(w.id);
          return s;
        });
        return prev;
      }
      sounds.openWindow();
      
      // Fix for mobile: constraint window size and position
      const safeWidth = Math.min(w.width, window.innerWidth - 10);
      const safeHeight = Math.min(w.height, window.innerHeight - 60);
      const safeX = Math.max(5, Math.min(w.x, window.innerWidth - safeWidth - 5));
      const safeY = Math.max(5, Math.min(w.y, window.innerHeight - safeHeight - 40));
      
      const safeW = { ...w, width: safeWidth, height: safeHeight, x: safeX, y: safeY };
      
      return [...prev, safeW];
    });
    setActiveWindowId(w.id);
  }, []);

  const closeWindow = useCallback((id: string) => {
    sounds.closeWindow();
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setMinimizedWindows((m) => {
      const s = new Set(m);
      s.delete(id);
      return s;
    });
    setMaximizedWindows((m) => {
      const s = new Set(m);
      s.delete(id);
      return s;
    });
    setActiveWindowId((cur) => {
      if (cur === id) {
        const rest = windows.filter((w) => w.id !== id);
        return rest.length ? rest[rest.length - 1].id : null;
      }
      return cur;
    });
  }, [windows]);

  const minimizeWindow = useCallback((id: string) => {
    sounds.minimize();
    setMinimizedWindows((m) => new Set(m).add(id));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setMaximizedWindows((m) => {
      const s = new Set(m);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
  }, []);

  // ========== RECYCLE BIN FUNCTIONS ==========
  const moveToRecycleBin = useCallback((item: RecycleBinItem) => {
    sounds.delete();
    setRecycleBinItems((prev) => [...prev, item]);
    if (item.originalData) {
      setDeletedPoems((prev) => new Set(prev).add(item.originalData.id));
    }
  }, []);

  const restoreFromRecycleBin = useCallback((itemId: string) => {
    sounds.click();
    const item = recycleBinItems.find((i) => i.id === itemId);
    if (item?.originalData) {
      setDeletedPoems((prev) => {
        const s = new Set(prev);
        s.delete(item.originalData.id);
        return s;
      });
    }
    setRecycleBinItems((prev) => prev.filter((i) => i.id !== itemId));
  }, [recycleBinItems]);

  const emptyRecycleBin = useCallback(() => {
    sounds.delete();
    setRecycleBinItems([]);
    setDeletedPoems(new Set());
  }, []);

  const permanentlyDelete = useCallback((itemId: string) => {
    sounds.delete();
    setRecycleBinItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  // ========== POEM FUNCTIONS ==========
  const openPoem = useCallback((poem: Poem) => {
    const windowId = `poem-${poem.id}`;
    openWindow({
      id: windowId,
      title: poem.title,
      icon: <FileText size={16} />,
      content: (
        <PoemViewer
          poem={poem}
          readCount={poemMetadata[poem.id]?.readCount || 0}
          isFavorite={poemMetadata[poem.id]?.isFavorite || false}
          onToggleFavorite={() =>
            setPoemMetadata((m) => ({
              ...m,
              [poem.id]: {
                ...m[poem.id],
                isFavorite: !m[poem.id].isFavorite,
              },
            }))
          }
          onIncrementRead={() =>
            setPoemMetadata((m) => ({
              ...m,
              [poem.id]: {
                ...m[poem.id],
                readCount: (m[poem.id]?.readCount || 0) + 1,
              },
            }))
          }
          onDelete={() => {
            moveToRecycleBin({
              id: `poem-recycled-${poem.id}`,
              title: poem.title,
              type: "file",
              icon: <TextFileIcon />,
              deletedAt: new Date(),
              originalData: poem,
            });
            closeWindow(windowId);
          }}
        />
      ),
      x: 150 + Math.random() * 100,
      y: 100 + Math.random() * 50,
      width: 700,
      height: 500,
    });
  }, [openWindow, poemMetadata, moveToRecycleBin, closeWindow]);

  // Filter out deleted poems
  const availablePoems = useMemo(
    () => poems.filter((p) => !deletedPoems.has(p.id)),
    [deletedPoems]
  );

  const favoritePoems = useMemo(
    () => availablePoems.filter((p) => poemMetadata[p.id]?.isFavorite),
    [availablePoems, poemMetadata]
  );

  // ========== WINDOW CONTENT CREATORS ==========
  const createMyPoemsContent = useCallback(() => (
    <div className="p-4 h-full overflow-auto">
      {availablePoems.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <div className="text-lg mb-2">No poems available</div>
            <div className="text-xs">All poems have been deleted</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {availablePoems.map((poem) => (
            <div
              key={poem.id}
              className="flex flex-col items-center gap-2 p-2 cursor-pointer hover:bg-blue-100"
              onDoubleClick={() => openPoem(poem)}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setContextMenu({
                  x: e.clientX,
                  y: e.clientY,
                  items: [
                    { label: "Open", action: () => openPoem(poem) },
                    { separator: true },
                    {
                      label: "Delete",
                      action: () =>
                        moveToRecycleBin({
                          id: `poem-recycled-${poem.id}`,
                          title: poem.title,
                          type: "file",
                          icon: <TextFileIcon />,
                          deletedAt: new Date(),
                          originalData: poem,
                        }),
                    },
                  ],
                });
              }}
              style={{ border: "1px solid transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,0,128,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div className="relative">
                <TextFileIcon size={32} />
                {poemMetadata[poem.id]?.isFavorite && (
                  <div className="absolute -top-1 -right-1">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path
                        d="M8 2 L10 6 L14 6 L11 9 L12 13 L8 11 L4 13 L5 9 L2 6 L6 6 Z"
                        fill="#FFD700"
                        stroke="#000"
                        strokeWidth={0.5}
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="text-xs text-center break-words w-full">
                {poem.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ), [availablePoems, poemMetadata, openPoem, moveToRecycleBin]);

  const createFavoritesContent = useCallback(() => (
    favoritePoems.length === 0 ? (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <div className="text-lg mb-2">No favorite poems yet</div>
          <div className="text-xs">
            Click the star icon when viewing a poem to add it to favorites
          </div>
        </div>
      </div>
    ) : (
      <div className="p-4 h-full overflow-auto">
        <div className="grid grid-cols-4 gap-4">
          {favoritePoems.map((poem) => (
            <div
              key={poem.id}
              className="flex flex-col items-center gap-2 p-2 cursor-pointer hover:bg-blue-100"
              onDoubleClick={() => openPoem(poem)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,0,128,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <TextFileIcon size={32} />
              <div className="text-xs text-center break-words w-full">
                {poem.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  ), [favoritePoems, openPoem]);

  const createRecycleBinContent = useCallback(() => (
    recycleBinItems.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <RecycleBinIcon size={64} empty={true} />
        <div className="mt-4">Recycle Bin is empty</div>
      </div>
    ) : (
      <div className="flex flex-col h-full">
        <div className="p-2 bg-gray-100 border-b flex gap-2">
          <button
            onClick={emptyRecycleBin}
            className="px-3 py-1 bg-white border border-gray-400 rounded text-xs hover:bg-gray-50"
            style={{
              border: "2px solid",
              borderColor: "#ffffff #000000 #000000 #ffffff",
              background: "#c0c0c0",
            }}
          >
            Empty Recycle Bin
          </button>
        </div>
        <div className="p-4 flex-1 overflow-auto">
          <div className="grid grid-cols-4 gap-4">
            {recycleBinItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-2 p-2 cursor-pointer hover:bg-blue-100"
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    items: [
                      {
                        label: "Restore",
                        action: () => restoreFromRecycleBin(item.id),
                      },
                      { separator: true },
                      {
                        label: "Delete Permanently",
                        action: () => permanentlyDelete(item.id),
                      },
                    ],
                  });
                }}
              >
                {item.icon}
                <div className="text-xs text-center break-words w-full">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500">
                  {item.deletedAt.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  ), [recycleBinItems, emptyRecycleBin, restoreFromRecycleBin, permanentlyDelete]);

  // ========== WINDOW HANDLERS ==========
  const openMyPoemsWindow = useCallback(() => {
    openWindow({
      id: "my-poems-window",
      title: "My Poems",
      icon: <FolderIcon size={16} />,
      content: createMyPoemsContent(),
      x: 100,
      y: 80,
      width: 600,
      height: 500,
    });
  }, [openWindow, createMyPoemsContent]);

  const openFavoritesWindow = useCallback(() => {
    openWindow({
      id: "favorites-window",
      title: "Favorites",
      icon: <FavoriteFolderIcon size={16} />,
      content: createFavoritesContent(),
      x: 120,
      y: 100,
      width: 600,
      height: 500,
    });
  }, [openWindow, createFavoritesContent]);

  const openRecycleBinWindow = useCallback(() => {
    openWindow({
      id: "recycle-bin-window",
      title: "Recycle Bin",
      icon: <Trash2 size={16} />,
      content: createRecycleBinContent(),
      x: 150,
      y: 120,
      width: 600,
      height: 500,
    });
  }, [openWindow, createRecycleBinContent]);

  const openAboutWindow = useCallback(() => {
    openWindow({
      id: "about-window",
      title: "About.txt",
      icon: <TextFileIcon size={16} />,
      content: (
        <div className="p-5 h-full overflow-auto">
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
{`Windows 95 Poetry Desktop
Version 2.0
Copyright © 1995

Welcome to the Windows 95 Poetry Desktop!

FEATURES:
• Browse and read poems
• Favorites system
• Recycle Bin with restore functionality
• Delete and restore poems
• Sound effects
• Music Player with playlist
• Multiple wallpapers
• Display settings
• Context menus
• Window management

KEYBOARD SHORTCUTS:
• Space: Play/Pause music
• Arrow Keys: Navigate/Volume control

RECYCLE BIN:
• Right-click poems to delete
• Deleted items can be restored
• Empty recycle bin to permanently delete

DEVELOPED WITH:
• React + TypeScript
• Windows 95 UI Components
• Custom sound system

Enjoy your nostalgic experience!`}
          </pre>
        </div>
      ),
      x: 200,
      y: 120,
      width: 550,
      height: 450,
    });
  }, [openWindow]);

  const openDisplaySettingsWindow = useCallback(() => {
    openWindow({
      id: "display-settings",
      title: "Display Properties",
      icon: <TextFileIcon size={16} />,
      content: (
        <DisplaySettings
          currentWallpaper={wallpaper}
          onWallpaperChange={setWallpaper}
        />
      ),
      x: 250,
      y: 150,
      width: 500,
      height: 500,
    });
  }, [openWindow, wallpaper]);

  const openMyComputerWindow = useCallback(() => {
    openWindow({
      id: "my-computer-window",
      title: "My Computer",
      icon: <MyComputerIcon size={16} />,
      content: (
        <MyComputer
          onOpenPoems={openMyPoemsWindow}
          onOpenFavorites={openFavoritesWindow}
          onOpenDrive={(d) => console.log("Drive:", d)}
        />
      ),
      x: 180,
      y: 100,
      width: 650,
      height: 500,
      minWidth: 500,
      minHeight: 400,
    });
  }, [openWindow, openMyPoemsWindow, openFavoritesWindow]);

  const openMusicPlayerWindow = useCallback(() => {
    openWindow({
      id: "music-player-window",
      title: "Music Player",
      icon: <MusicPlayerIcon size={16} />,
      content: <MusicPlayer />,
      x: 220,
      y: 150,
      width: 700,
      height: 600,
    });
  }, [openWindow]);

  // ========== DESKTOP ICONS ==========
  const desktopIcons: DesktopIconType[] = useMemo(() => [
    {
      id: "my-poems",
      title: "My Poems",
      type: "folder",
      icon: <FolderIcon />,
      action: openMyPoemsWindow,
      initialPosition: iconPositions["my-poems"],
      deletable: false,
    },
    {
      id: "favorites",
      title: "Favorites",
      type: "folder",
      icon: <FavoriteFolderIcon />,
      action: openFavoritesWindow,
      initialPosition: iconPositions["favorites"],
      deletable: false,
    },
    {
      id: "about",
      title: "About.txt",
      type: "file",
      icon: <TextFileIcon />,
      action: openAboutWindow,
      initialPosition: iconPositions["about"],
      deletable: false,
    },
    {
      id: "recycle-bin",
      title: "Recycle Bin",
      type: "system",
      icon: <RecycleBinIcon empty={recycleBinItems.length === 0} />,
      action: openRecycleBinWindow,
      initialPosition: iconPositions["recycle-bin"],
      deletable: false,
    },
    {
      id: "my-computer",
      title: "My Computer",
      type: "system",
      icon: <MyComputerIcon />,
      action: openMyComputerWindow,
      initialPosition: iconPositions["my-computer"],
      deletable: false,
    },
    {
      id: "music-player",
      title: "Music Player",
      type: "system",
      icon: <MusicPlayerIcon />,
      action: openMusicPlayerWindow,
      initialPosition: iconPositions["music-player"],
      deletable: false,
    },
  ], [
    iconPositions,
    recycleBinItems.length,
    openMyPoemsWindow,
    openFavoritesWindow,
    openAboutWindow,
    openRecycleBinWindow,
    openMyComputerWindow,
    openMusicPlayerWindow,
  ]);

  // ========== EVENT HANDLERS ==========
  const handleDesktopContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    sounds.click();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: "Arrange Icons", action: () => {} },
        { label: "Refresh", action: () => window.location.reload() },
        { separator: true },
        { label: "Wallpaper", action: () => {} },
        ...WALLPAPERS.map((wp) => ({
          label: `  ${wp.charAt(0).toUpperCase() + wp.slice(1)}`,
          action: () => setWallpaper(wp),
        })),
        { separator: true },
        { label: "New", action: () => {} },
        { label: "  Folder", disabled: true },
        { label: "  Text Document", disabled: true },
        { separator: true },
        { label: "Properties", action: openDisplaySettingsWindow },
      ],
    });
  }, [openDisplaySettingsWindow]);

  const handleIconContextMenu = useCallback((iconId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sounds.click();
    setSelectedIcon(iconId);
    
    const icon = desktopIcons.find((i) => i.id === iconId);
    const items: ContextMenuItem[] = [
      { label: "Open", action: () => icon?.action() },
      { separator: true },
    ];

    if (iconId === "recycle-bin" && recycleBinItems.length > 0) {
      items.push({ label: "Empty Recycle Bin", action: emptyRecycleBin });
      items.push({ separator: true });
    }

    items.push(
      { label: "Cut", disabled: true },
      { label: "Copy", disabled: true },
      { label: "Create Shortcut", disabled: true },
      { label: "Delete", disabled: !icon?.deletable },
      { label: "Rename", disabled: true },
      { separator: true },
      { label: "Properties", action: () => {} }
    );

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items,
    });
  }, [desktopIcons, recycleBinItems.length, emptyRecycleBin]);

  const handleStartMenuAction = useCallback((action: string) => {
    sounds.click();
    switch (action) {
      case "openMyPoems":
        openMyPoemsWindow();
        break;
      case "openFavorites":
        openFavoritesWindow();
        break;
      case "displaySettings":
        openDisplaySettingsWindow();
        break;
      case "about":
        openAboutWindow();
        break;
      case "soundSettings":
        setSoundEnabled((v) => !v);
        break;
      case "run":
        if (availablePoems.length > 0) {
          const randomPoem = availablePoems[Math.floor(Math.random() * availablePoems.length)];
          openPoem(randomPoem);
        }
        break;
      case "shutdown":
        setShuttingDown(true);
        setShutdownStep(1);
        setTimeout(() => {
          setShutdownStep(2);
          setTimeout(() => {
            window.location.href = "https://girxdhar.github.io/pro";
          }, 3000);
        }, 2000);
        break;
      default:
        break;
    }
    setStartMenuOpen(false);
  }, [
    openMyPoemsWindow,
    openFavoritesWindow,
    openDisplaySettingsWindow,
    openAboutWindow,
    availablePoems,
    openPoem,
  ]);

  const handleTaskbarWindowClick = useCallback((id: string) => {
    sounds.click();
    if (activeWindowId === id && !minimizedWindows.has(id)) {
      minimizeWindow(id);
    } else {
      setActiveWindowId(id);
      setMinimizedWindows((m) => {
        const s = new Set(m);
        s.delete(id);
        return s;
      });
    }
  }, [activeWindowId, minimizedWindows, minimizeWindow]);

  const handleDesktopClick = useCallback(() => {
    setSelectedIcon(null);
    setContextMenu(null);
  }, []);

  // ========== RENDER ==========
  if (shuttingDown) {
    if (shutdownStep === 1) {
      return (
        <div className="w-full h-screen bg-black flex flex-col items-center justify-center cursor-none">
          <div className="text-white font-['Space_Mono'] text-lg md:text-xl tracking-widest text-center px-4">
            Please wait while your computer shuts down...
          </div>
        </div>
      );
    }
    return (
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center cursor-none">
        <div className="text-[#f97316] font-['Space_Mono'] text-xl md:text-3xl font-bold tracking-wider text-center px-4">
          It is now safe to turn off your computer.
        </div>
      </div>
    );
  }

  if (booting) {
    return (
      <div className="w-full h-screen">
        <BootScreen onBootComplete={() => setBooting(false)} />
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden" onClick={handleDesktopClick}>
      <Desktop wallpaper={wallpaper} onContextMenu={handleDesktopContextMenu}>
        {desktopIcons.map((icon) => (
          <Icon
            key={icon.id}
            id={icon.id}
            title={icon.title}
            icon={icon.icon}
            x={icon.initialPosition.x}
            y={icon.initialPosition.y}
            selected={selectedIcon === icon.id}
            onSelect={() => {
              sounds.click();
              setSelectedIcon(icon.id);
            }}
            onDoubleClick={() => {
              sounds.click();
              icon.action();
            }}
            onDragEnd={(x, y) =>
              setIconPositions((pos) => ({
                ...pos,
                [icon.id]: { x, y },
              }))
            }
            onContextMenu={(e) => handleIconContextMenu(icon.id, e)}
          />
        ))}

        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            active={activeWindowId === win.id}
            minimized={minimizedWindows.has(win.id)}
            maximized={maximizedWindows.has(win.id)}
            initialX={win.x}
            initialY={win.y}
            initialWidth={win.width}
            initialHeight={win.height}
            minWidth={win.minWidth}
            minHeight={win.minHeight}
            onFocus={() => {
              setActiveWindowId(win.id);
              setWindows((prev) => {
                const others = prev.filter((w) => w.id !== win.id);
                return [...others, win];
              });
            }}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
          >
            {win.content}
          </Window>
        ))}
      </Desktop>

      <Taskbar
        onStartClick={() => {
          sounds.click();
          setStartMenuOpen((o) => !o);
        }}
        windows={windows.map((w) => ({
          id: w.id,
          title: w.title,
          active: activeWindowId === w.id,
          minimized: minimizedWindows.has(w.id),
        }))}
        onWindowClick={handleTaskbarWindowClick}
        soundEnabled={soundEnabled}
        onSoundToggle={() => setSoundEnabled((v) => !v)}
      />

      <StartMenu
        visible={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onMenuAction={handleStartMenuAction}
      />

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}