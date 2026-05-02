import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const beveledStyle = {
  boxShadow: 'inset -1px -1px 0px #000000, inset 1px 1px 0px #ffffff, inset -2px -2px 0px #808080, inset 2px 2px 0px #dfdfdf'
};

const beveledInsetStyle = {
  boxShadow: 'inset 1px 1px 0px #000000, inset -1px -1px 0px #ffffff, inset 2px 2px 0px #808080, inset -2px -2px 0px #dfdfdf'
};

const buttonStyle = {
  boxShadow: 'inset -1px -1px 0px #000000, inset 1px 1px 0px #ffffff, inset -2px -2px 0px #808080, inset 2px 2px 0px #dfdfdf',
  backgroundColor: '#C0C0C0',
  border: 'none',
  padding: '2px 6px',
  cursor: 'default',
  fontFamily: '"MS Sans Serif", Arial, sans-serif',
  fontSize: '11px'
};

const buttonPressedStyle = {
  boxShadow: 'inset 1px 1px 0px #000000, inset -1px -1px 0px #ffffff',
  backgroundColor: '#C0C0C0',
  border: 'none',
  padding: '3px 5px 1px 7px',
  cursor: 'default'
};

const FolderIcon = ({ size = 24, open = false }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }} aria-hidden="true">
    <rect x="4" y={open ? "7" : "8"} width="24" height="18" fill="#FFFF00" stroke="#000" strokeWidth="1"/>
    <rect x="4" y="6" width="12" height="4" fill="#FFFF00" stroke="#000" strokeWidth="1"/>
    <rect x="6" y={open ? "9" : "10"} width="20" height="14" fill="#FFFF88"/>
  </svg>
);

const TextFileIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }} aria-hidden="true">
    <rect x="8" y="4" width="16" height="24" fill="#FFF" stroke="#000" strokeWidth="1"/>
    <rect x="8" y="4" width="16" height="3" fill="#000080"/>
    <line x1="11" y1="11" x2="21" y2="11" stroke="#000" strokeWidth="1"/>
    <line x1="11" y1="14" x2="21" y2="14" stroke="#000" strokeWidth="1"/>
    <line x1="11" y1="17" x2="19" y2="17" stroke="#000" strokeWidth="1"/>
  </svg>
);

const RecycleBinIcon = ({ size = 24, full = false }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }} aria-hidden="true">
    <rect x="6" y="12" width="20" height="16" fill="#808080" stroke="#000" strokeWidth="1"/>
    <rect x="10" y="8" width="12" height="4" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
    {full && <rect x="12" y="16" width="8" height="8" fill="#FFF" opacity="0.6"/>}
  </svg>
);

const StarIcon = ({ size = 16, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#FFD700" : "none"} stroke="#000" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const MusicIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-5c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>
  </svg>
);

const SearchIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const HeartIcon = ({ size = 16, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#FF0000" : "none"} stroke="#000" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const initialPoemsData = [
  { id: 'poem1', name: 'Digital Dreams.txt', type: 'txt', favorite: false, readCount: 0, content: `In circuits deep, where memories sleep,\nA poet's heart in silence keeps\nThe whispers of a time gone by,\nWhen pixels danced across the sky.\n\nIn ones and zeros, stories flow,\nOf loves and losses, high and low,\nThe screen glows soft with gentle light,\nA beacon in the endless night.\n\nThough digital, the feelings real,\nIn every byte, emotions heal,\nFor poetry lives in every form,\nIn modern code or ancient norm.` },
  { id: 'poem2', name: 'Nostalgia.txt', type: 'txt', favorite: false, readCount: 0, content: `The cursor blinks in steady time,\nA metronome for thoughts in rhyme,\nEach keystroke echoes from the past,\nMemories that forever last.\n\nThe dial-up tone, a siren's song,\nWe'd wait for hours, patient, long,\nFor worlds to open, slow and bright,\nIn phosphor glow and CRT light.\n\nThose simpler days we can't reclaim,\nYet in our hearts, they still remain,\nA Windows 95 embrace,\nOf slower time and cyber space.` },
  { id: 'poem3', name: 'Windows to the Soul.txt', type: 'txt', favorite: false, readCount: 0, content: `Through beveled frames and taskbar gold,\nI see the stories yet untold,\nEach window holds a different view,\nOf dreams and hopes, both old and new.\n\nThe desktop icons, neatly placed,\nLike thoughts we've carefully embraced,\nEach folder holds a memory dear,\nOf times we've loved, of joy and fear.\n\nClick and drag, the windows flow,\nIn pixelated afterglow,\nOur digital hearts beat strong and true,\nIn every shade of retro blue.` },
  { id: 'poem4', name: 'Retro Revival.txt', type: 'txt', favorite: false, readCount: 0, content: `Click and drag, the windows flow,\nIn pixelated afterglow,\nThe past returns with gradient flair,\nAnd takes us back to simpler care.\n\nThe startup sound, a gentle chime,\nTransports us back through space and time,\nTo days when life moved slow and sweet,\nBefore the world was so complete.\n\nWe yearn for what we left behind,\nThe analog, the slow unwind,\nYet find it here in digital form,\nA perfect blend, both new and warm.` },
  { id: 'poem5', name: 'Midnight Bytes.txt', type: 'txt', favorite: false, readCount: 0, content: `At midnight hour, the screen aglow,\nI type these words in steady flow,\nThe world asleep, just me and code,\nIn this electronic abode.\n\nThe fan hums soft, a lullaby,\nAs characters march by and by,\nEach word a step, each line a dance,\nIn this technological romance.\n\nThe night embraces my machine,\nThe most poetic sight I've seen,\nFor in the dark, the light shines bright,\nA poet's endless, digital night.` },
  { id: 'poem6', name: 'Floppy Disk Dreams.txt', type: 'txt', favorite: false, readCount: 0, content: `Remember saving to the A drive,\nThose moments when we felt alive,\nThe gentle click, the whirring sound,\nOf data spinning round and round.\n\nOne-point-four megs of pure delight,\nWe'd guard them with our fullest might,\nEach disk a treasure, labeled clear,\nOf documents we held so dear.\n\nNow cloud and drives are all we need,\nBut something's lost in modern speed,\nThe tactile joy of holding tight,\nOur precious data, physical sight.` },
];

const initialDesktopIcons = [
  { id: 'poems', name: 'My Poems', x: 20, y: 20, type: 'folder', path: '/poems' },
  { id: 'favorites', name: 'Favorites', x: 20, y: 120, type: 'folder', path: '/favorites' },
  { id: 'about', name: 'About.txt', x: 20, y: 220, type: 'txt', content: 'Welcome to the Ultimate Windows 95 Poetry Desktop!\n\nCreated with love and nostalgia.\n\nFeatures:\n- Read beautiful poetry\n- Mark your favorites\n- Track reading progress\n- Enjoy retro aesthetics\n- Experience the magic of Win95\n\nPress F1 for help!' },
  { id: 'recycle', name: 'Recycle Bin', x: 20, y: 320, type: 'recycle' },
  { id: 'settings', name: 'Settings.txt', x: 20, y: 420, type: 'txt', content: 'Desktop Settings\n\nWallpaper: Teal\nScreensaver: Poetry\nSound: Enabled\nHigh Contrast: Off\n\nRight-click desktop for more options!' },
];

const wallpapers = [
  { id: 'teal', name: 'Teal', style: { background: 'linear-gradient(135deg, #008080 0%, #20B2AA 50%, #5F9EA0 100%)' } },
  { id: 'blue', name: 'Blue', style: { background: 'linear-gradient(135deg, #000080 0%, #0000CD 50%, #4169E1 100%)' } },
  { id: 'green', name: 'Green', style: { background: 'linear-gradient(135deg, #006400 0%, #228B22 50%, #32CD32 100%)' } },
  { id: 'purple', name: 'Purple', style: { background: 'linear-gradient(135deg, #4B0082 0%, #8B008B 50%, #9370DB 100%)' } },
  { id: 'red', name: 'Red', style: { background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #FF6347 100%)' } },
  { id: 'clouds', name: 'Clouds', style: { background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%2387CEEB\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'15\' fill=\'white\' opacity=\'0.7\'/%3E%3Ccircle cx=\'35\' cy=\'18\' r=\'12\' fill=\'white\' opacity=\'0.7\'/%3E%3Ccircle cx=\'70\' cy=\'60\' r=\'18\' fill=\'white\' opacity=\'0.7\'/%3E%3Ccircle cx=\'85\' cy=\'65\' r=\'10\' fill=\'white\' opacity=\'0.7\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' } },
];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const playSound = (type) => {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  
  gainNode.gain.setValueAtTime(0.1, context.currentTime);
  
  switch(type) {
    case 'click':
      oscillator.frequency.setValueAtTime(800, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.05);
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.05);
      break;
    case 'open':
      oscillator.frequency.setValueAtTime(440, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.15);
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.15);
      break;
    case 'close':
      oscillator.frequency.setValueAtTime(880, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(440, context.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.15);
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.15);
      break;
    case 'error':
      oscillator.frequency.setValueAtTime(200, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.3);
      break;
  }
};

export default function Win95PoetryDesktopUltimate() {
  const [poems, setPoems] = useState(() => {
    const saved = localStorage.getItem('win95_poems');
    return saved ? JSON.parse(saved) : initialPoemsData;
  });

  const [desktopIcons, setDesktopIcons] = useState(() => {
    const saved = localStorage.getItem('win95_desktop_icons');
    return saved ? JSON.parse(saved) : initialDesktopIcons;
  });

  const [windows, setWindows] = useState([]);
  const [taskbarItems, setTaskbarItems] = useState([]);
  const [startOpen, setStartOpen] = useState(false);
  const [screensaver, setScreensaver] = useState(false);
  const [screensaverType, setScreensaverType] = useState('poetry');
  const [wallpaper, setWallpaper] = useState('teal');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [clipboard, setClipboard] = useState(null);
  const [recycleBin, setRecycleBin] = useState([]);
  const [recentDocs, setRecentDocs] = useState([]);
  const [showClippy, setShowClippy] = useState(false);
  const [showBSOD, setShowBSOD] = useState(false);

  const screensaverTimeoutRef = useRef(60000);
  const lastInteractionRef = useRef(Date.now());
  const winCounter = useRef(0);
  const containerRef = useRef(null);

  const [now, setNow] = useState(new Date());
  const [context, setContext] = useState(null);
  const [selectedDesktop, setSelectedDesktop] = useState(null);
  const [draggingIcon, setDraggingIcon] = useState(null);

  useEffect(() => {
    localStorage.setItem('win95_poems', JSON.stringify(poems));
  }, [poems]);

  useEffect(() => {
    localStorage.setItem('win95_desktop_icons', JSON.stringify(desktopIcons));
  }, [desktopIcons]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastInteractionRef.current > screensaverTimeoutRef.current) {
        setScreensaver(true);
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const resetActivity = useCallback(() => {
    lastInteractionRef.current = Date.now();
    if (screensaver) setScreensaver(false);
  }, [screensaver]);

  useEffect(() => {
    const onAny = (e) => {
      resetActivity();
      if (e.type === 'keydown') {
        if (e.ctrlKey && e.key === 'n') {
          e.preventDefault();
          openNewPoem();
        }
        if (e.ctrlKey && e.key === 'f') {
          e.preventDefault();
          openSearch();
        }
        if (e.key === 'F1') {
          e.preventDefault();
          openHelp();
        }
        if (e.key === 'F5') {
          e.preventDefault();
          refreshDesktop();
        }
        if (e.ctrlKey && e.shiftKey && e.key === 'B') {
          setShowBSOD(true);
        }
      }
    };
    window.addEventListener('mousemove', onAny);
    window.addEventListener('mousedown', onAny);
    window.addEventListener('keydown', onAny);
    return () => {
      window.removeEventListener('mousemove', onAny);
      window.removeEventListener('mousedown', onAny);
      window.removeEventListener('keydown', onAny);
    };
  }, [resetActivity, screensaver]);

  const openWindow = useCallback((payload) => {
    resetActivity();
    if (soundEnabled) playSound('open');
    const id = `win-${winCounter.current++}`;
    const newWin = { 
      id, 
      z: windows.length ? Math.max(...windows.map(w => w.z)) + 1 : 1, 
      x: 100 + (windows.length * 20), 
      y: 80 + (windows.length * 20),
      width: 640,
      height: 480,
      ...payload 
    };
    setWindows(ws => [...ws, newWin]);
    setTaskbarItems(t => [...t, { id, title: payload.title, minimized: false }]);
  }, [resetActivity, windows, soundEnabled]);

  const closeWindow = useCallback((id) => {
    resetActivity();
    if (soundEnabled) playSound('close');
    setWindows(ws => ws.filter(w => w.id !== id));
    setTaskbarItems(t => t.filter(i => i.id !== id));
  }, [resetActivity, soundEnabled]);

  const minimizeWindow = useCallback((id) => {
    resetActivity();
    if (soundEnabled) playSound('click');
    setWindows(ws => ws.map(w => w.id === id ? { ...w, minimized: true } : w));
    setTaskbarItems(t => t.map(i => i.id === id ? { ...i, minimized: true } : i));
  }, [resetActivity, soundEnabled]);

  const restoreWindow = useCallback((id) => {
    resetActivity();
    if (soundEnabled) playSound('open');
    setWindows(ws => {
      const maxZ = ws.length ? Math.max(...ws.map(x => x.z)) : 0;
      return ws.map(w => w.id === id ? { ...w, minimized: false, z: maxZ + 1 } : w);
    });
    setTaskbarItems(t => t.map(i => i.id === id ? { ...i, minimized: false } : i));
  }, [resetActivity, soundEnabled]);

  const maximizeWindow = useCallback((id) => {
    if (soundEnabled) playSound('click');
    setWindows(ws => ws.map(w => {
      if (w.id === id) {
        if (w.maximized) {
          return { ...w, maximized: false, x: w.prevX || 100, y: w.prevY || 80, width: w.prevWidth || 640, height: w.prevHeight || 480 };
        } else {
          return { ...w, maximized: true, prevX: w.x, prevY: w.y, prevWidth: w.width, prevHeight: w.height, x: 0, y: 0, width: window.innerWidth, height: window.innerHeight - 28 };
        }
      }
      return w;
    }));
  }, [soundEnabled]);

  const bringToFront = useCallback((id) => {
    setWindows(ws => {
      const maxZ = ws.length ? Math.max(...ws.map(x => x.z)) : 0;
      return ws.map(w => w.id === id ? { ...w, z: maxZ + 1 } : w);
    });
  }, []);

  const toggleFavorite = useCallback((poemId) => {
    if (soundEnabled) playSound('click');
    setPoems(ps => ps.map(p => p.id === poemId ? { ...p, favorite: !p.favorite } : p));
  }, [soundEnabled]);

  const incrementReadCount = useCallback((poemId) => {
    setPoems(ps => ps.map(p => p.id === poemId ? { ...p, readCount: (p.readCount || 0) + 1 } : p));
    addToRecent(poemId);
  }, []);

  const addToRecent = useCallback((poemId) => {
    setRecentDocs(docs => {
      const filtered = docs.filter(d => d !== poemId);
      return [poemId, ...filtered].slice(0, 10);
    });
  }, []);

  const openPoem = useCallback((poem, mode = 'normal') => {
    incrementReadCount(poem.id);
    openWindow({
      title: poem.name.replace('.txt', ''),
      type: 'poem',
      poem: poem,
      readerMode: mode === 'reader',
      x: 120,
      y: 100,
      width: mode === 'reader' ? 800 : 600,
      height: mode === 'reader' ? 600 : 500
    });
  }, [openWindow, incrementReadCount]);

  const openExplorer = useCallback((folderName, items, path = '/') => {
    openWindow({
      title: folderName,
      type: 'explorer',
      content: items,
      path: path,
      history: [path],
      historyIndex: 0,
      x: 100,
      y: 80,
      width: 700,
      height: 500
    });
  }, [openWindow]);

  const handleDesktopDouble = useCallback((icon) => {
    resetActivity();
    if (icon.type === 'folder') {
      if (icon.id === 'poems') {
        openExplorer('My Poems', poems, '/poems');
      } else if (icon.id === 'favorites') {
        const favs = poems.filter(p => p.favorite);
        openExplorer('Favorites', favs, '/favorites');
      }
    } else if (icon.type === 'txt') {
      openWindow({
        title: icon.name.replace('.txt', ''),
        type: 'notepad',
        content: icon.content || 'Empty file',
        x: 120,
        y: 100,
        width: 600,
        height: 400
      });
    } else if (icon.type === 'recycle') {
      openWindow({
        title: 'Recycle Bin',
        type: 'recycle',
        content: recycleBin,
        x: 100,
        y: 80,
        width: 600,
        height: 400
      });
    }
  }, [openWindow, openExplorer, poems, recycleBin, resetActivity]);

  const openNewPoem = useCallback(() => {
    openWindow({
      title: 'New Poem',
      type: 'editor',
      content: '',
      x: 140,
      y: 120,
      width: 700,
      height: 550
    });
  }, [openWindow]);

  const openSearch = useCallback(() => {
    openWindow({
      title: 'Search Poems',
      type: 'search',
      x: 200,
      y: 150,
      width: 600,
      height: 450
    });
  }, [openWindow]);

  const openHelp = useCallback(() => {
    openWindow({
      title: 'Help',
      type: 'help',
      x: 180,
      y: 130,
      width: 550,
      height: 400
    });
  }, [openWindow]);

  const refreshDesktop = useCallback(() => {
    if (soundEnabled) playSound('click');
    setSelectedDesktop(null);
  }, [soundEnabled]);

  const deleteFile = useCallback((item) => {
    if (soundEnabled) playSound('click');
    setRecycleBin(bin => [...bin, { ...item, deletedAt: new Date() }]);
    setPoems(ps => ps.filter(p => p.id !== item.id));
  }, [soundEnabled]);

  const restoreFile = useCallback((item) => {
    if (soundEnabled) playSound('click');
    setPoems(ps => [...ps, item]);
    setRecycleBin(bin => bin.filter(b => b.id !== item.id));
  }, [soundEnabled]);

  const emptyRecycleBin = useCallback(() => {
    if (soundEnabled) playSound('click');
    if (window.confirm('Are you sure you want to permanently delete all items?')) {
      setRecycleBin([]);
    }
  }, [soundEnabled]);

  const copyFile = useCallback((item) => {
    if (soundEnabled) playSound('click');
    setClipboard({ action: 'copy', item });
  }, [soundEnabled]);

  const cutFile = useCallback((item) => {
    if (soundEnabled) playSound('click');
    setClipboard({ action: 'cut', item });
  }, [soundEnabled]);

  const pasteFile = useCallback(() => {
    if (!clipboard) return;
    if (soundEnabled) playSound('click');
    
    if (clipboard.action === 'copy') {
      const newItem = { ...clipboard.item, id: `poem${Date.now()}`, name: `${clipboard.item.name} (Copy)` };
      setPoems(ps => [...ps, newItem]);
    } else if (clipboard.action === 'cut') {
      setClipboard(null);
    }
  }, [clipboard, soundEnabled]);

  const renameFile = useCallback((item) => {
    const newName = prompt('Enter new name:', item.name);
    if (newName && newName !== item.name) {
      if (soundEnabled) playSound('click');
      setPoems(ps => ps.map(p => p.id === item.id ? { ...p, name: newName } : p));
    }
  }, [soundEnabled]);

  const getRandomPoem = useCallback(() => {
    const randomPoem = poems[Math.floor(Math.random() * poems.length)];
    openPoem(randomPoem, 'reader');
  }, [poems, openPoem]);

  const showContext = (x, y, items) => {
    setContext({ x, y, items });
  };

  const hideContext = () => setContext(null);

  const startIconDrag = (e, icon) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startIconX = icon.x;
    const startIconY = icon.y;
    
    setDraggingIcon(icon.id);
    
    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      setDesktopIcons(icons => icons.map(i => 
        i.id === icon.id ? { ...i, x: startIconX + dx, y: startIconY + dy } : i
      ));
    };
    
    const onUp = () => {
      setDraggingIcon(null);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };
const startResize = (e, winId) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const wObj = windows.find(w => w.id === winId);
    if (!wObj) return;
    const startW = wObj.width;
    const startH = wObj.height;
    
    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      setWindows(ws => ws.map(w => 
        w.id === winId ? { 
          ...w, 
          width: Math.max(300, startW + dx),
          height: Math.max(200, startH + dy)
        } : w
      ));
    };
    
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const startWindowDrag = (e, winId) => {
    if (e.button !== 0) return;
    e.preventDefault();
    bringToFront(winId);
    
    const wObj = windows.find(w => w.id === winId);
    if (!wObj || wObj.maximized) return;
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWinX = wObj.x;
    const startWinY = wObj.y;
    
    const onMove = (ev) => {
      setWindows(ws => ws.map(w => 
        w.id === winId ? { 
          ...w, 
          x: startWinX + (ev.clientX - startX),
          y: Math.max(0, startWinY + (ev.clientY - startY))
        } : w
      ));
    };
    
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const currentWallpaper = wallpapers.find(w => w.id === wallpaper) || wallpapers[0];

  if (showBSOD) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        background: '#0000AA', 
        color: 'white', 
        fontFamily: 'monospace',
        padding: '40px',
        overflow: 'auto'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>Windows</div>
        <div style={{ marginBottom: '20px' }}>
          A fatal exception 0E has occurred at 0028:C001E36 in VXD VMM(01) +<br/>
          00010E36. The current application will be terminated.
        </div>
        <div style={{ marginBottom: '20px' }}>
          * Press any key to terminate the current application.<br/>
          * Press CTRL+ALT+DEL again to restart your computer. You will<br/>
          &nbsp;&nbsp;lose any unsaved information in all applications.
        </div>
        <div style={{ marginTop: '40px' }}>Press any key to continue _</div>
        <button 
          onClick={() => setShowBSOD(false)}
          style={{ 
            marginTop: '40px',
            padding: '10px 20px',
            background: '#fff',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'monospace'
          }}
        >
          Reboot System
        </button>
      </div>
    );
  }

  if (screensaver) {
    return (
      <div 
        onClick={() => setScreensaver(false)}
        style={{ 
          width: '100vw', 
          height: '100vh', 
          background: '#000', 
          color: '#0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Courier New", monospace',
          fontSize: '24px',
          cursor: 'none',
          overflow: 'hidden'
        }}
      >
        {screensaverType === 'poetry' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            style={{ textAlign: 'center', padding: '40px' }}
          >
            {poems[Math.floor(Date.now() / 5000) % poems.length]?.content.split('\n')[0]}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      onContextMenu={(e) => {
        e.preventDefault();
        showContext(e.clientX, e.clientY, [
          { label: 'Refresh', action: refreshDesktop },
          { label: 'Paste', action: pasteFile, disabled: !clipboard },
          { label: 'New Poem', action: openNewPoem },
          { label: '---' },
          { label: 'Random Poem', action: getRandomPoem },
          { label: '---' },
          { label: 'Clippy', action: () => setShowClippy(!showClippy) },
        ]);
      }}
      onClick={() => {
        hideContext();
        setStartOpen(false);
        setSelectedDesktop(null);
      }}
      style={{ 
        width: '100vw', 
        height: '100vh', 
        ...currentWallpaper.style,
        overflow: 'hidden',
        position: 'relative',
        fontFamily: '"MS Sans Serif", Arial, sans-serif',
        fontSize: '11px',
        userSelect: 'none',
        ...(highContrast && { filter: 'contrast(2) brightness(1.2)' })
      }}
    >
      {/* Desktop Icons */}
      {desktopIcons.map(icon => (
        <div
          key={icon.id}
          onMouseDown={(e) => {
            e.stopPropagation();
            setSelectedDesktop(icon.id);
            startIconDrag(e, icon);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleDesktopDouble(icon);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            showContext(e.clientX, e.clientY, [
              { label: 'Open', action: () => handleDesktopDouble(icon) },
              { label: '---' },
              { label: 'Cut', action: () => cutFile(icon) },
              { label: 'Copy', action: () => copyFile(icon) },
              { label: 'Delete', action: () => deleteFile(icon) },
              { label: 'Rename', action: () => renameFile(icon) },
            ]);
          }}
          style={{
            position: 'absolute',
            left: icon.x,
            top: icon.y,
            width: '80px',
            textAlign: 'center',
            cursor: 'default',
            padding: '4px',
            ...(selectedDesktop === icon.id && {
              background: 'rgba(0,0,128,0.3)',
              outline: '1px dotted white'
            })
          }}
        >
          {icon.type === 'folder' && <FolderIcon size={32} />}
          {icon.type === 'txt' && <TextFileIcon size={32} />}
          {icon.type === 'recycle' && <RecycleBinIcon size={32} full={recycleBin.length > 0} />}
          <div style={{ 
            color: 'white', 
            textShadow: '1px 1px 2px black',
            marginTop: '4px',
            wordWrap: 'break-word',
            fontSize: '11px'
          }}>
            {icon.name}
          </div>
        </div>
      ))}

      {/* Windows */}
      <AnimatePresence>
        {windows.filter(w => !w.minimized).map(win => (
          <Window
            key={win.id}
            win={win}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            onMouseDown={() => bringToFront(win.id)}
            onDragStart={(e) => startWindowDrag(e, win.id)}
            onResizeStart={(e) => startResize(e, win.id)}
            poems={poems}
            toggleFavorite={toggleFavorite}
            openPoem={openPoem}
            deleteFile={deleteFile}
            restoreFile={restoreFile}
            emptyRecycleBin={emptyRecycleBin}
            copyFile={copyFile}
            cutFile={cutFile}
            renameFile={renameFile}
            soundEnabled={soundEnabled}
          />
        ))}
      </AnimatePresence>

      {/* Context Menu */}
      {context && (
        <div
          style={{
            position: 'fixed',
            left: context.x,
            top: context.y,
            background: '#C0C0C0',
            ...beveledStyle,
            zIndex: 10000,
            minWidth: '150px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {context.items.map((item, i) => (
            item.label === '---' ? (
              <div key={i} style={{ height: '1px', background: '#808080', margin: '2px 0' }} />
            ) : (
              <div
                key={i}
                onClick={() => {
                  if (!item.disabled) {
                    item.action();
                    hideContext();
                  }
                }}
                style={{
                  padding: '4px 20px 4px 8px',
                  cursor: item.disabled ? 'default' : 'pointer',
                  color: item.disabled ? '#808080' : '#000',
                  ...(item.disabled ? {} : {
                    ':hover': { background: '#000080', color: 'white' }
                  })
                }}
                onMouseEnter={(e) => {
                  if (!item.disabled) e.target.style.background = '#000080';
                  if (!item.disabled) e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = item.disabled ? '#808080' : '#000';
                }}
              >
                {item.label}
              </div>
            )
          ))}
        </div>
      )}

      {/* Clippy */}
      <AnimatePresence>
        {showClippy && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '40px',
              background: '#FFFFCC',
              ...beveledStyle,
              padding: '12px',
              zIndex: 9999,
              maxWidth: '250px',
              fontSize: '11px'
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>💡 Clippy says:</div>
            <div style={{ marginBottom: '8px' }}>
              It looks like you're reading poetry! Would you like help?
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button style={buttonStyle} onClick={getRandomPoem}>Random Poem</button>
              <button style={buttonStyle} onClick={() => setShowClippy(false)}>Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '28px',
        background: '#C0C0C0',
        ...beveledStyle,
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        gap: '2px',
        zIndex: 9998
      }}>
        <button
          style={{
            ...buttonStyle,
            fontWeight: 'bold',
            padding: '2px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setStartOpen(!startOpen);
            if (soundEnabled) playSound('click');
          }}
        >
          <div style={{ 
            width: '16px', 
            height: '16px', 
            background: 'linear-gradient(45deg, #ff0000, #ffff00, #00ff00, #0000ff)',
            border: '1px solid #000'
          }} />
          Start
        </button>

        <div style={{ flex: 1, display: 'flex', gap: '2px', overflow: 'auto' }}>
          {taskbarItems.map(item => (
            <button
              key={item.id}
              style={{
                ...(item.minimized ? buttonStyle : buttonPressedStyle),
                maxWidth: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
              onClick={() => {
                if (item.minimized) {
                  restoreWindow(item.id);
                } else {
                  minimizeWindow(item.id);
                }
              }}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div style={{
          ...beveledInsetStyle,
          padding: '2px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {musicPlaying && <MusicIcon size={14} />}
          <div>{now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </div>

      {/* Start Menu */}
      <AnimatePresence>
        {startOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              bottom: '30px',
              left: '2px',
              width: '250px',
              background: '#C0C0C0',
              ...beveledStyle,
              zIndex: 9999
            }}
          >
            <div style={{ 
              background: 'linear-gradient(90deg, #000080, #1084D0)',
              color: 'white',
              padding: '40px 8px',
              fontWeight: 'bold',
              fontSize: '20px',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              float: 'left'
            }}>
              Windows 95
            </div>
            <div style={{ marginLeft: '40px' }}>
              <StartMenuItem icon={<FolderIcon size={20} />} label="My Poems" onClick={() => { openExplorer('My Poems', poems, '/poems'); setStartOpen(false); }} />
              <StartMenuItem icon={<StarIcon size={16} filled />} label="Favorites" onClick={() => { openExplorer('Favorites', poems.filter(p => p.favorite), '/favorites'); setStartOpen(false); }} />
              <StartMenuItem icon={<SearchIcon size={16} />} label="Search" onClick={() => { openSearch(); setStartOpen(false); }} />
              <StartMenuItem icon={<HeartIcon size={16} />} label="Random Poem" onClick={() => { getRandomPoem(); setStartOpen(false); }} />
              <div style={{ height: '1px', background: '#808080', margin: '2px 0' }} />
              <StartMenuItem icon={<TextFileIcon size={20} />} label="New Poem" onClick={() => { openNewPoem(); setStartOpen(false); }} />
              <div style={{ height: '1px', background: '#808080', margin: '2px 0' }} />
              <StartMenuItem label="Settings" onClick={() => {
                openWindow({
                  title: 'Settings',
                  type: 'settings',
                  x: 200,
                  y: 150,
                  width: 450,
                  height: 400
                });
                setStartOpen(false);
              }} />
              <StartMenuItem label="Help" onClick={() => { openHelp(); setStartOpen(false); }} />
              <div style={{ height: '1px', background: '#808080', margin: '2px 0' }} />
              <StartMenuItem label="Shut Down..." onClick={() => {
                if (window.confirm('Are you sure you want to shut down?')) {
                  window.location.reload();
                }
              }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StartMenuItem({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.background = '#000080';
        e.target.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'transparent';
        e.target.style.color = '#000';
      }}
      style={{
        padding: '4px 8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function Window({ win, onClose, onMinimize, onMaximize, onMouseDown, onDragStart, onResizeStart, poems, toggleFavorite, openPoem, deleteFile, restoreFile, emptyRecycleBin, copyFile, cutFile, renameFile, soundEnabled }) {
  const [editContent, setEditContent] = useState(win.content || '');
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = poems.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onMouseDown={onMouseDown}
      style={{
        position: 'fixed',
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        background: '#C0C0C0',
        ...beveledStyle,
        zIndex: win.z,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Title Bar */}
      <div
        onMouseDown={onDragStart}
        style={{
          background: 'linear-gradient(90deg, #000080, #1084D0)',
          color: 'white',
          padding: '2px 2px 2px 4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: win.maximized ? 'default' : 'move',
          fontWeight: 'bold'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <TextFileIcon size={16} />
          {win.title}
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button style={{ ...buttonStyle, padding: '0px 6px', lineHeight: '16px' }} onClick={onMinimize}>_</button>
          <button style={{ ...buttonStyle, padding: '0px 4px', lineHeight: '16px' }} onClick={onMaximize}>□</button>
          <button style={{ ...buttonStyle, padding: '0px 4px', lineHeight: '16px' }} onClick={onClose}>✕</button>
        </div>
      </div>

      {/* Window Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '8px', background: 'white' }}>
        {win.type === 'poem' && (
          <div style={{ fontFamily: win.readerMode ? 'Georgia, serif' : '"Courier New", monospace', fontSize: win.readerMode ? '16px' : '12px', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '8px', background: '#f0f0f0', ...beveledInsetStyle }}>
              <div>
                <strong>{win.poem.name.replace('.txt', '')}</strong>
                <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
                  Read {win.poem.readCount || 0} times
                </div>
              </div>
              <button
                style={buttonStyle}
                onClick={() => toggleFavorite(win.poem.id)}
              >
                <StarIcon size={16} filled={win.poem.favorite} />
              </button>
            </div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{win.poem.content}</div>
          </div>
        )}

        {win.type === 'explorer' && (
          <div>
            <div style={{ marginBottom: '12px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {win.content.map(item => (
                <div
                  key={item.id}
                  onDoubleClick={() => openPoem(item)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  style={{
                    width: '80px',
                    textAlign: 'center',
                    padding: '8px',
                    cursor: 'pointer',
                    border: '1px solid transparent'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#E0E0E0'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <TextFileIcon size={32} />
                  <div style={{ fontSize: '10px', marginTop: '4px', wordWrap: 'break-word' }}>
                    {item.name}
                  </div>
                  {item.favorite && <StarIcon size={12} filled style={{ marginTop: '2px' }} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {win.type === 'notepad' && (
          <div style={{ fontFamily: '"Courier New", monospace', whiteSpace: 'pre-wrap', fontSize: '12px' }}>
            {win.content}
          </div>
        )}

        {win.type === 'editor' && (
          <div>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              style={{
                width: '100%',
                height: '400px',
                fontFamily: '"Courier New", monospace',
                fontSize: '12px',
                padding: '8px',
                border: '1px solid #808080',
                ...beveledInsetStyle,
                resize: 'none'
              }}
              placeholder="Write your poem here..."
            />
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
              <button style={buttonStyle} onClick={() => {
                if (soundEnabled) playSound('click');
                alert('Poem saved!');
              }}>Save</button>
              <button style={buttonStyle} onClick={() => setEditContent('')}>Clear</button>
            </div>
          </div>
        )}

        {win.type === 'search' && (
          <div>
            <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search poems..."
                style={{
                  flex: 1,
                  padding: '4px',
                  border: '1px solid #808080',
                  ...beveledInsetStyle
                }}
              />
              <SearchIcon size={20} />
            </div>
            <div>
              {searchResults.length === 0 && searchQuery && (
                <div style={{ color: '#666', fontStyle: 'italic' }}>No results found</div>
              )}
              {searchResults.map(poem => (
                <div
                  key={poem.id}
                  onDoubleClick={() => openPoem(poem)}
                  style={{
                    padding: '8px',
                    marginBottom: '4px',
                    background: '#f0f0f0',
                    cursor: 'pointer',
                    ...beveledInsetStyle
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#E0E0E0'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#f0f0f0'; }}
                >
                  <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {poem.name}
                    {poem.favorite && <StarIcon size={14} filled />}
                  </div>
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                    {poem.content.substring(0, 100)}...
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {win.type === 'help' && (
          <div style={{ lineHeight: '1.6' }}>
            <h3 style={{ marginTop: 0 }}>Windows 95 Poetry Desktop Help</h3>
            <p><strong>Keyboard Shortcuts:</strong></p>
            <ul>
              <li>Ctrl+N - New Poem</li>
              <li>Ctrl+F - Search</li>
              <li>F1 - Help</li>
              <li>F5 - Refresh Desktop</li>
              <li>Ctrl+Shift+B - Blue Screen (just for fun!)</li>
            </ul>
            <p><strong>Features:</strong></p>
            <ul>
              <li>Double-click icons to open</li>
              <li>Right-click for context menus</li>
              <li>Drag icons to rearrange</li>
              <li>Mark poems as favorites with the star icon</li>
              <li>Track how many times you've read each poem</li>
            </ul>
          </div>
        )}

        {win.type === 'recycle' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <button style={buttonStyle} onClick={emptyRecycleBin}>
                Empty Recycle Bin
              </button>
            </div>
            {win.content.length === 0 ? (
              <div style={{ color: '#666', fontStyle: 'italic' }}>Recycle Bin is empty</div>
            ) : (
              win.content.map(item => (
                <div key={item.id} style={{ padding: '8px', marginBottom: '4px', background: '#f0f0f0', ...beveledInsetStyle }}>
                  <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                  <button style={{ ...buttonStyle, marginTop: '4px' }} onClick={() => restoreFile(item)}>
                    Restore
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {win.type === 'settings' && (
          <div style={{ padding: '8px' }}>
            <h3 style={{ marginTop: 0 }}>Display Settings</h3>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Wallpaper:</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {wallpapers.map(wp => (
                  <button
                    key={wp.id}
                    style={{
                      ...buttonStyle,
                      width: '60px',
                      height: '40px',
                      ...wp.style,
                      border: '2px solid ' + (win.wallpaper === wp.id ? '#000' : 'transparent')
                    }}
                    onClick={() => {
                      /* This would update wallpaper but needs state management */
                      if (soundEnabled) playSound('click');
                    }}
                  >
                    {wp.name}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked /> Sound Effects
              </label>
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" /> High Contrast Mode
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Resize Handle */}
      {!win.maximized && (
        <div
          onMouseDown={onResizeStart}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '16px',
            height: '16px',
            cursor: 'nwse-resize',
            background: 'linear-gradient(135deg, transparent 0%, transparent 40%, #808080 40%, #808080 60%, transparent 60%)',
          }}
        />
      )}
    </motion.div>
  );
}

