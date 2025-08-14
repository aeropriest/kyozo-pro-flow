'use client';

import React, { useEffect, useRef } from 'react';
import styles from './VideoPlayer.module.scss';

interface VideoPlayerProps {
  className?: string;
  videoSrc?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  className = '',
  videoSrc = '/form-right.mp4' // Default to form-right.mp4
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.error('Video play error:', e));
    }
  }, [videoSrc]);

  return (
    <div className={`${styles.videoPlayerContainer} ${className}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className={styles.video}
      />
    </div>
  );
};

export default VideoPlayer;
