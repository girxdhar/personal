// src/MusicPlayer.tsx
import React, { useRef, useState, useEffect, useCallback } from "react";

interface Track {
  title: string;
  artist: string;
  url: string;
}

const PLAYLIST: Track[] = [
  {
    title: "Lose Yourself",
    artist: "Eminem",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Till I Collapse",
    artist: "Eminem",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Not Afraid",
    artist: "Eminem",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Stan",
    artist: "Eminem",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    title: "Without Me",
    artist: "Eminem",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playlist] = useState(PLAYLIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"none" | "one" | "all">("none");

  const currentTrack = playlist[currentIndex];

  // Setup audio volume
  useEffect(() => {
    const aud = audioRef.current;
    if (aud) {
      aud.volume = volume;
    }
  }, [volume]);

  // When currentIndex changes: load new track
  useEffect(() => {
    const aud = audioRef.current;
    if (!aud) return;
    aud.src = currentTrack.url;
    aud.load();
    setProgress(0);
    setDuration(0);
    if (isPlaying) {
      aud.play().catch((e) => {
        console.warn("Playback failed: ", e);
        setIsPlaying(false);
      });
    }
  }, [currentIndex, currentTrack.url, isPlaying]);

  // Audio event handlers
  useEffect(() => {
    const aud = audioRef.current;
    if (!aud) return;

    const handleTimeUpdate = () => setProgress(aud.currentTime);
    const handleLoaded = () => setDuration(aud.duration);
    const handleEnded = () => {
      if (repeat === "one") {
        aud.currentTime = 0;
        aud.play();
      } else if (repeat === "all" || repeat === "none") {
        handleNext();
      }
    };

    aud.addEventListener("timeupdate", handleTimeUpdate);
    aud.addEventListener("loadedmetadata", handleLoaded);
    aud.addEventListener("ended", handleEnded);

    return () => {
      aud.removeEventListener("timeupdate", handleTimeUpdate);
      aud.removeEventListener("loadedmetadata", handleLoaded);
      aud.removeEventListener("ended", handleEnded);
    };
  }, [repeat]);

  const play = useCallback(() => {
    const aud = audioRef.current;
    if (!aud) return;
    aud.play();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    const aud = audioRef.current;
    if (!aud) return;
    aud.pause();
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    const aud = audioRef.current;
    if (!aud) return;
    aud.pause();
    aud.currentTime = 0;
    setIsPlaying(false);
  }, []);

  const handlePrev = useCallback(() => {
    stop();
    setCurrentIndex((idx) => {
      if (isShuffle) {
        return Math.floor(Math.random() * playlist.length);
      }
      return (idx - 1 + playlist.length) % playlist.length;
    });
  }, [isShuffle, playlist.length, stop]);

  const handleNext = useCallback(() => {
    stop();
    setCurrentIndex((idx) => {
      if (isShuffle) {
        return Math.floor(Math.random() * playlist.length);
      }
      return (idx + 1) % playlist.length;
    });
  }, [isShuffle, playlist.length, stop]);

  const toggleShuffle = () => setIsShuffle((v) => !v);

  const toggleRepeat = () => {
    setRepeat((r) => {
      if (r === "none") return "all";
      if (r === "all") return "one";
      return "none";
    });
  };

  const seekTo = (time: number) => {
    const aud = audioRef.current;
    if (!aud) return;
    aud.currentTime = time;
    setProgress(time);
  };

  const formatTime = (t: number) => {
    if (isNaN(t) || t < 0) return "00:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        isPlaying ? pause() : play();
      }
      if (e.code === "ArrowRight") {
        e.preventDefault();
        seekTo(Math.min(duration, progress + 5));
      }
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        seekTo(Math.max(0, progress - 5));
      }
      if (e.code === "ArrowUp") {
        e.preventDefault();
        setVolume((v) => Math.min(1, v + 0.1));
      }
      if (e.code === "ArrowDown") {
        e.preventDefault();
        setVolume((v) => Math.max(0, v - 0.1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isPlaying, progress, duration, play, pause]);

  return (
    <div
      className="h-full flex flex-col"
      style={{
        fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif',
        fontSize: "11px",
        background: "#c0c0c0",
      }}
    >
      <audio ref={audioRef} />

      {/* Main Content */}
      <div style={{ padding: "8px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Display Panel */}
        <div
          style={{
            background: "#000000",
            border: "2px solid",
            borderColor: "#808080 #ffffff #ffffff #808080",
            padding: "12px",
            marginBottom: "8px",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                color: "#00ff00",
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "4px",
                textShadow: "0 0 8px #00ff00",
                fontFamily: '"Courier New", monospace',
              }}
            >
              {currentTrack.title}
            </div>
            <div
              style={{
                color: "#00cc00",
                fontSize: "11px",
                fontFamily: '"Courier New", monospace',
              }}
            >
              {currentTrack.artist}
            </div>
          </div>

          {/* Visualizer */}
          <div
            style={{
              display: "flex",
              gap: "2px",
              height: "40px",
              alignItems: "flex-end",
              marginBottom: "12px",
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: isPlaying ? `${20 + Math.random() * 80}%` : "5%",
                  background: "#00ff00",
                  transition: "height 0.1s",
                  boxShadow: "0 0 4px #00ff00",
                }}
              />
            ))}
          </div>

          {/* Time Display */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#00ff00",
              fontFamily: '"Courier New", monospace',
              fontSize: "12px",
            }}
          >
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: "8px" }}>
          <div
            style={{
              background: "#c0c0c0",
              border: "2px solid",
              borderColor: "#808080 #ffffff #ffffff #808080",
              padding: "2px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percent = x / rect.width;
              seekTo(percent * duration);
            }}
          >
            <div
              style={{
                height: "12px",
                background: `linear-gradient(to right, #000080 ${(progress / duration) * 100}%, #ffffff ${(progress / duration) * 100}%)`,
              }}
            />
          </div>
        </div>

        {/* Controls Section */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          {/* Playback Controls */}
          <div
            style={{
              background: "#c0c0c0",
              border: "2px solid",
              borderColor: "#ffffff #000000 #000000 #ffffff",
              padding: "8px",
              flex: 1,
            }}
          >
            <div style={{ marginBottom: "4px", fontWeight: "bold" }}>Playback</div>
            <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
              <Win95Button onClick={handlePrev} width="60px">
                |◄◄
              </Win95Button>
              <Win95Button onClick={isPlaying ? pause : play} width="60px">
                {isPlaying ? "❚❚" : "►"}
              </Win95Button>
              <Win95Button onClick={stop} width="60px">
                ■
              </Win95Button>
              <Win95Button onClick={handleNext} width="60px">
                ►►|
              </Win95Button>
            </div>
          </div>

          {/* Options Panel */}
          <div
            style={{
              background: "#c0c0c0",
              border: "2px solid",
              borderColor: "#ffffff #000000 #000000 #ffffff",
              padding: "8px",
            }}
          >
            <div style={{ marginBottom: "4px", fontWeight: "bold" }}>Options</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <Win95Button
                onClick={toggleShuffle}
                pressed={isShuffle}
                width="100px"
              >
                ☑ Shuffle {isShuffle ? "On" : "Off"}
              </Win95Button>
              <Win95Button
                onClick={toggleRepeat}
                pressed={repeat !== "none"}
                width="100px"
              >
                ☑ Repeat {repeat === "none" ? "Off" : repeat === "all" ? "All" : "One"}
              </Win95Button>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div
          style={{
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#ffffff #000000 #000000 #ffffff",
            padding: "8px",
            marginBottom: "8px",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Volume</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px" }}>🔊</span>
            <div
              style={{
                flex: 1,
                background: "#ffffff",
                border: "2px solid",
                borderColor: "#808080 #ffffff #ffffff #808080",
                padding: "2px",
              }}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: "8px",
                  cursor: "pointer",
                }}
              />
            </div>
            <span style={{ fontSize: "11px", width: "30px" }}>{Math.round(volume * 100)}%</span>
          </div>
        </div>

        {/* Playlist */}
        <div
          style={{
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#ffffff #000000 #000000 #ffffff",
            padding: "8px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Playlist</div>
          <div
            style={{
              background: "#ffffff",
              border: "2px solid",
              borderColor: "#808080 #ffffff #ffffff #808080",
              flex: 1,
              overflowY: "auto",
            }}
          >
            {playlist.map((track, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(true);
                }}
                style={{
                  padding: "4px 8px",
                  cursor: "pointer",
                  background: idx === currentIndex ? "#000080" : "transparent",
                  color: idx === currentIndex ? "#ffffff" : "#000000",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  if (idx !== currentIndex) {
                    e.currentTarget.style.background = "#c0c0c0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (idx !== currentIndex) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {idx + 1}. {track.title} - {track.artist}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div
        style={{
          background: "#c0c0c0",
          borderTop: "2px solid #ffffff",
          padding: "2px 4px",
          display: "flex",
          gap: "4px",
          fontSize: "10px",
        }}
      >
        <div
          style={{
            border: "1px solid",
            borderColor: "#808080 #ffffff #ffffff #808080",
            padding: "1px 4px",
            flex: 1,
          }}
        >
          {isPlaying ? "Playing" : "Stopped"}
        </div>
        <div
          style={{
            border: "1px solid",
            borderColor: "#808080 #ffffff #ffffff #808080",
            padding: "1px 4px",
          }}
        >
          Track {currentIndex + 1}/{playlist.length}
        </div>
        <div
          style={{
            border: "1px solid",
            borderColor: "#808080 #ffffff #ffffff #808080",
            padding: "1px 4px",
          }}
        >
          {formatTime(progress)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}

// Win95 Button Component
interface Win95ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  width?: string;
  pressed?: boolean;
}

function Win95Button({ onClick, children, width = "60px", pressed = false }: Win95ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        width,
        height: "28px",
        background: "#c0c0c0",
        border: "2px solid",
        borderColor: (isPressed || pressed)
          ? "#000000 #ffffff #ffffff #000000"
          : "#ffffff #000000 #000000 #ffffff",
        fontSize: "12px",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}