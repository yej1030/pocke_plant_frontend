// Tabler camera-plus outline (MIT); browser equivalent of the native icon.
import React from 'react';
export default function CameraIcon({size=24,color='currentColor',strokeWidth=2}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5"/><path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/><path d="M16 19h6m-3 -3v6"/></svg>;
}
