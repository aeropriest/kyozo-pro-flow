'use client';
import React, { useRef, useEffect } from 'react';
import styles from './PotteryVideo.module.scss';

interface PotteryVideoProps {
  width?: string;
  height?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
}

const PotteryVideo: React.FC<PotteryVideoProps> = ({
  width = '400px',
  height = '300px',
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video && autoPlay) {
      // Attempt to play the video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Auto-play was prevented:', error);
        });
      }
    }
  }, [autoPlay]);

  return (
    <div 
      className={`${styles.videoContainer} ${className}`}
      style={{ width, height }}
    >
      <video
        ref={videoRef}
        className={styles.video}
        src="/pottery.mp4"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default PotteryVideo;