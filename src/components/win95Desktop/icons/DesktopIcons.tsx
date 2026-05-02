// src/components/icons/DesktopIcons.tsx
import React from "react";

// — Folder Icon (Windows 95/98 style)
export const FolderIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    style={{ imageRendering: "pixelated" }}
    shapeRendering="crispEdges"
  >
    {/* Main folder body with classic yellow */}
    <path d="M 3 8 L 3 27 L 29 27 L 29 11 L 15 11 L 13 8 Z" fill="#FFFF00" />
    
    {/* Dark outline */}
    <path d="M 3 8 L 13 8 L 15 11 L 29 11 L 29 27 L 3 27 Z" fill="none" stroke="#000000" strokeWidth="1" />
    
    {/* Top highlight for 3D effect */}
    <line x1="3" y1="8" x2="13" y2="8" stroke="#FFFFFF" strokeWidth="1" />
    <line x1="15" y1="11" x2="28" y2="11" stroke="#FFFFFF" strokeWidth="1" />
    
    {/* Left highlight */}
    <line x1="3" y1="8" x2="3" y2="26" stroke="#FFFFFF" strokeWidth="1" />
    
    {/* Bottom shadow */}
    <line x1="4" y1="27" x2="29" y2="27" stroke="#808080" strokeWidth="1" />
    
    {/* Right shadow */}
    <line x1="29" y1="12" x2="29" y2="27" stroke="#808080" strokeWidth="1" />
    
    {/* Inner shadow for depth */}
    <line x1="4" y1="26" x2="28" y2="26" stroke="#C0C000" strokeWidth="1" />
    <line x1="28" y1="12" x2="28" y2="26" stroke="#C0C000" strokeWidth="1" />
  </svg>
);

// — Favorite Folder Icon (with classic star)
export const FavoriteFolderIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    style={{ imageRendering: "pixelated" }}
    shapeRendering="crispEdges"
  >
    {/* Main folder body */}
    <path d="M 3 8 L 3 27 L 29 27 L 29 11 L 15 11 L 13 8 Z" fill="#FFFF00" />
    <path d="M 3 8 L 13 8 L 15 11 L 29 11 L 29 27 L 3 27 Z" fill="none" stroke="#000000" strokeWidth="1" />
    
    {/* Highlights */}
    <line x1="3" y1="8" x2="13" y2="8" stroke="#FFFFFF" strokeWidth="1" />
    <line x1="15" y1="11" x2="28" y2="11" stroke="#FFFFFF" strokeWidth="1" />
    <line x1="3" y1="8" x2="3" y2="26" stroke="#FFFFFF" strokeWidth="1" />
    
    {/* Shadows */}
    <line x1="4" y1="27" x2="29" y2="27" stroke="#808080" strokeWidth="1" />
    <line x1="29" y1="12" x2="29" y2="27" stroke="#808080" strokeWidth="1" />
    <line x1="4" y1="26" x2="28" y2="26" stroke="#C0C000" strokeWidth="1" />
    <line x1="28" y1="12" x2="28" y2="26" stroke="#C0C000" strokeWidth="1" />
    
    {/* Classic Windows star icon */}
    <polygon 
      points="16,15 17,18 20,18 18,20 19,23 16,21 13,23 14,20 12,18 15,18" 
      fill="#FF0000" 
      stroke="#800000" 
      strokeWidth="0.5"
    />
  </svg>
);

// — Text / Document File Icon (Windows 95 style)
export const TextFileIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    style={{ imageRendering: "pixelated" }}
    shapeRendering="crispEdges"
  >
    {/* White paper background */}
    <rect x="8" y="4" width="15" height="24" fill="#FFFFFF" />
    
    {/* Dog-ear fold */}
    <polygon points="23,4 23,8 19,8" fill="#C0C0C0" />
    <polygon points="19,8 23,8 23,4" fill="#E0E0E0" />
    
    {/* Black outline */}
    <path d="M 8 4 L 19 4 L 23 8 L 23 28 L 8 28 Z" fill="none" stroke="#000000" strokeWidth="1" />
    <line x1="19" y1="4" x2="19" y2="8" stroke="#000000" strokeWidth="1" />
    <line x1="19" y1="8" x2="23" y2="8" stroke="#000000" strokeWidth="1" />
    
    {/* Text lines (classic blue) */}
    <rect x="10" y="11" width="11" height="1" fill="#000080" />
    <rect x="10" y="13" width="11" height="1" fill="#000080" />
    <rect x="10" y="15" width="11" height="1" fill="#000080" />
    <rect x="10" y="17" width="9" height="1" fill="#000080" />
    <rect x="10" y="19" width="10" height="1" fill="#000080" />
    <rect x="10" y="21" width="8" height="1" fill="#000080" />
    <rect x="10" y="23" width="7" height="1" fill="#000080" />
    
    {/* Paper shadow */}
    <line x1="23" y1="9" x2="23" y2="28" stroke="#808080" strokeWidth="1" />
    <line x1="9" y1="28" x2="23" y2="28" stroke="#808080" strokeWidth="1" />
  </svg>
);

// — Recycle Bin Icon (Windows 95/98 authentic style)
export const RecycleBinIcon: React.FC<{ size?: number; empty?: boolean }> = ({
  size = 32,
  empty = true,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    style={{ imageRendering: "pixelated" }}
    shapeRendering="crispEdges"
  >
    {/* Trash bin body - classic gray */}
    <path d="M 10 11 L 9 27 L 23 27 L 22 11 Z" fill="#C0C0C0" />
    
    {/* Top rim */}
    <rect x="8" y="9" width="16" height="2" fill="#808080" />
    
    {/* Handle */}
    <rect x="12" y="7" width="8" height="2" fill="#808080" />
    
    {/* Outline */}
    <path d="M 10 11 L 9 27 L 23 27 L 22 11 Z" fill="none" stroke="#000000" strokeWidth="1" />
    <rect x="8" y="9" width="16" height="2" fill="none" stroke="#000000" strokeWidth="1" />
    <rect x="12" y="7" width="8" height="2" fill="none" stroke="#000000" strokeWidth="1" />
    
    {/* 3D highlights */}
    <line x1="10" y1="11" x2="9" y2="26" stroke="#FFFFFF" strokeWidth="1" />
    <line x1="10" y1="11" x2="22" y2="11" stroke="#FFFFFF" strokeWidth="1" />
    <line x1="8" y1="9" x2="23" y2="9" stroke="#E0E0E0" strokeWidth="1" />
    
    {/* 3D shadows */}
    <line x1="22" y1="12" x2="23" y2="26" stroke="#404040" strokeWidth="1" />
    <line x1="9" y1="27" x2="23" y2="27" stroke="#404040" strokeWidth="1" />
    
    {/* Recycling arrows if not empty */}
    {!empty && (
      <>
        {/* Blue recycling symbol */}
        <path d="M 14 16 L 16 14 L 16 16 L 18 14 L 16 18 L 16 16 Z" fill="#0000FF" />
        <path d="M 18 20 L 16 22 L 16 20 L 14 22 L 16 18 L 16 20 Z" fill="#0000FF" />
        <path d="M 13 18 L 19 18" stroke="#0000FF" strokeWidth="2" />
      </>
    )}
  </svg>
);

// — My Computer Icon (Windows 95/98 classic)
export const MyComputerIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    style={{ imageRendering: "pixelated" }}
    shapeRendering="crispEdges"
  >
    {/* Computer monitor */}
    <rect x="10" y="7" width="16" height="13" fill="#C0C0C0" />
    <rect x="12" y="9" width="12" height="9" fill="#008080" />
    
    {/* Monitor outline */}
    <rect x="10" y="7" width="16" height="13" fill="none" stroke="#000000" strokeWidth="1" />
    
    {/* Monitor highlights */}
    <line x1="10" y1="7" x2="25" y2="7" stroke="#FFFFFF" strokeWidth="1" />
    <line x1="10" y1="7" x2="10" y2="19" stroke="#FFFFFF" strokeWidth="1" />
    <line x1="12" y1="9" x2="23" y2="9" stroke="#00FFFF" strokeWidth="1" />
    <line x1="12" y1="9" x2="12" y2="17" stroke="#00FFFF" strokeWidth="1" />
    
    {/* Monitor shadows */}
    <line x1="26" y1="8" x2="26" y2="20" stroke="#404040" strokeWidth="1" />
    <line x1="11" y1="20" x2="26" y2="20" stroke="#404040" strokeWidth="1" />
    
    {/* Monitor stand */}
    <rect x="15" y="20" width="6" height="2" fill="#808080" />
    <rect x="14" y="22" width="8" height="2" fill="#808080" />
    <rect x="15" y="20" width="6" height="2" fill="none" stroke="#000000" strokeWidth="1" />
    <rect x="14" y="22" width="8" height="2" fill="none" stroke="#000000" strokeWidth="1" />
    
    {/* Computer tower/case */}
    <rect x="2" y="14" width="8" height="14" fill="#C0C0C0" />
    <rect x="2" y="14" width="8" height="14" fill="none" stroke="#000000" strokeWidth="1" />
    
    {/* Tower highlights */}
    <line x1="2" y1="14" x2="9" y2="14" stroke="#FFFFFF" strokeWidth="1" />
    <line x1="2" y1="14" x2="2" y2="27" stroke="#FFFFFF" strokeWidth="1" />
    
    {/* Tower shadows */}
    <line x1="10" y1="15" x2="10" y2="28" stroke="#404040" strokeWidth="1" />
    <line x1="3" y1="28" x2="10" y2="28" stroke="#404040" strokeWidth="1" />
    
    {/* Drive bay */}
    <rect x="3" y="17" width="6" height="2" fill="#000000" />
    
    {/* Power button (green LED) */}
    <rect x="6" y="24" width="2" height="2" fill="#00FF00" stroke="#000000" strokeWidth="0.5" />
    
    {/* Floppy drive slot */}
    <rect x="3" y="20" width="6" height="1" fill="#404040" />
  </svg>
);

// — Music Player Icon (keeping your excellent design)
export function MusicPlayerIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      {/* Outer casing */}
      <rect x="2" y="2" width="28" height="28" fill="#808080" stroke="#000000" strokeWidth="1"/>
      <rect x="3" y="3" width="26" height="26" fill="#c0c0c0"/>
      
      {/* 3D effect - highlights */}
      <line x1="3" y1="3" x2="29" y2="3" stroke="#ffffff" strokeWidth="1"/>
      <line x1="3" y1="3" x2="3" y2="29" stroke="#ffffff" strokeWidth="1"/>
      
      {/* 3D effect - shadows */}
      <line x1="29" y1="3" x2="29" y2="29" stroke="#000000" strokeWidth="1"/>
      <line x1="3" y1="29" x2="29" y2="29" stroke="#000000" strokeWidth="1"/>
      
      {/* Screen display */}
      <rect x="5" y="5" width="22" height="10" fill="#0a2a0a" stroke="#000000" strokeWidth="0.5"/>
      <rect x="6" y="6" width="20" height="8" fill="#0f380f"/>
      
      {/* Visualizer bars */}
      <rect x="8" y="10" width="1.5" height="3" fill="#00ff00"/>
      <rect x="10" y="8" width="1.5" height="5" fill="#00ff00"/>
      <rect x="12" y="9" width="1.5" height="4" fill="#00ff00"/>
      <rect x="14" y="7" width="1.5" height="6" fill="#00ff00"/>
      <rect x="16" y="9" width="1.5" height="4" fill="#00ff00"/>
      <rect x="18" y="8" width="1.5" height="5" fill="#00ff00"/>
      <rect x="20" y="10" width="1.5" height="3" fill="#00ff00"/>
      <rect x="22" y="9" width="1.5" height="4" fill="#00ff00"/>
      
      {/* Play button */}
      <rect x="6" y="17" width="7" height="6" fill="#808080" stroke="#000000" strokeWidth="0.5"/>
      <rect x="6.5" y="17.5" width="6" height="5" fill="#c0c0c0"/>
      <line x1="6.5" y1="17.5" x2="12.5" y2="17.5" stroke="#ffffff" strokeWidth="0.5"/>
      <line x1="6.5" y1="17.5" x2="6.5" y2="22.5" stroke="#ffffff" strokeWidth="0.5"/>
      <polygon points="8.5,19 11,20.5 8.5,22" fill="#000000"/>
      
      {/* Stop button */}
      <rect x="14" y="17" width="7" height="6" fill="#808080" stroke="#000000" strokeWidth="0.5"/>
      <rect x="14.5" y="17.5" width="6" height="5" fill="#c0c0c0"/>
      <line x1="14.5" y1="17.5" x2="20.5" y2="17.5" stroke="#ffffff" strokeWidth="0.5"/>
      <line x1="14.5" y1="17.5" x2="14.5" y2="22.5" stroke="#ffffff" strokeWidth="0.5"/>
      <rect x="16.5" y="19" width="2" height="2.5" fill="#000000"/>
      
      {/* Speaker grille */}
      <circle cx="24" cy="20" r="3.5" fill="#808080" stroke="#000000" strokeWidth="0.5"/>
      <circle cx="24" cy="20" r="3" fill="#404040"/>
      <circle cx="24" cy="20" r="2" fill="#606060"/>
      <circle cx="24" cy="20" r="1" fill="#202020"/>
      
      {/* Cassette detail */}
      <rect x="6" y="25" width="20" height="2" fill="#404040" stroke="#000000" strokeWidth="0.3"/>
    </svg>
  );
}