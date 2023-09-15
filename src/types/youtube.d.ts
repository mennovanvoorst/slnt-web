export interface PlayerProps {
  videoId: string;
  onStateChange?: (state: number) => void;
  onPlayerReady: (state: number) => void;
  onProgress?: (timestamp: number) => void;
  isActive?: boolean;
  fullHeight?: boolean;
}

export interface Progress {
  currentTime: number;
  onChange: (progress: number) => void;
  max: number;
}

export interface Time {
  hh: string;
  mm: string;
  ss: string;
}
