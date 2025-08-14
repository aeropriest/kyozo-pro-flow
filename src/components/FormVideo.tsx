'use client';

import React, { useEffect, useRef } from 'react';
import styles from './FormVideo.module.scss';

interface FormVideoProps {
  className?: string;
}

const FormVideo: React.FC<FormVideoProps> = ({ className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.error('Video play error:', e));
    }
  }, []);

  return (
    <div className={`${styles.formVideoContainer} ${className}`}>
      <video
        ref={videoRef}
        src="/form-right.mp4"
        autoPlay
        muted
        loop
        playsInline
        className={styles.formVideo}
      />
    </div>
  );
};

export default FormVideo;
