// Windows 95 Authentic Sound Generator using Web Audio API

let audioContext: AudioContext | null = null;
let soundEnabled = true;
let lastSoundTime: Record<string, number> = {};
const SOUND_THROTTLE = 100; // Minimum ms between same sounds

export const initAudio = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
};

export const getSoundEnabled = () => soundEnabled;

// Throttle function to prevent redundant sounds
const shouldPlaySound = (soundName: string): boolean => {
  if (!soundEnabled) return false;
  
  const now = Date.now();
  const lastTime = lastSoundTime[soundName] || 0;
  
  if (now - lastTime < SOUND_THROTTLE) {
    return false;
  }
  
  lastSoundTime[soundName] = now;
  return true;
};

const playTone = (frequency: number, duration: number, type: OscillatorType = 'square') => {
  if (!soundEnabled) return;
  
  const ctx = initAudio();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  
  gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration / 1000);
};

const playChord = (frequencies: number[], duration: number) => {
  if (!soundEnabled) return;
  
  frequencies.forEach(freq => playTone(freq, duration, 'sine'));
};

export const sounds = {
  startup: () => {
    if (!shouldPlaySound('startup')) return;
    const ctx = initAudio();
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    
    notes.forEach((freq, i) => {
      setTimeout(() => {
        playTone(freq, 400, 'sine');
      }, i * 200);
    });
  },
  
  click: () => {
    if (!shouldPlaySound('click')) return;
    playTone(800, 50, 'square');
  },
  
  openWindow: () => {
    if (!shouldPlaySound('openWindow')) return;
    const ctx = initAudio();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  },
  
  closeWindow: () => {
    if (!shouldPlaySound('closeWindow')) return;
    const ctx = initAudio();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  },
  
  minimize: () => {
    if (!shouldPlaySound('minimize')) return;
    const ctx = initAudio();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  },
  
  maximize: () => {
    if (!shouldPlaySound('maximize')) return;
    const ctx = initAudio();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  },
  
  error: () => {
    if (!shouldPlaySound('error')) return;
    playTone(200, 300, 'square');
  },
  
  emptyRecycleBin: () => {
    if (!shouldPlaySound('emptyRecycleBin')) return;
    const ctx = initAudio();
    
    // Crumpling sound simulation
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const freq = 100 + Math.random() * 200;
        playTone(freq, 50, 'sawtooth');
      }, i * 30);
    }
  }
};