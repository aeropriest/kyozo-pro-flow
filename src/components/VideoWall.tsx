'use client'
import React, { useMemo, useEffect } from 'react';
import styles from './VideoWall.module.scss';

const ROW_COUNT = 12;

// Video sources
const VIDEO_SOURCES = [
  '/city.mp4',
  '/concert.mp4',
  '/crafting.mp4',
  '/dancer.mp4',
  '/lights.mp4',
  '/paint.mp4',
  '/city.mp4',
  '/concert.mp4',
  '/performance.mp4',
  '/pottery.mp4',
  '/prod.mp4',
  '/producing.mp4',
];

interface BrickProps {
  videoSrc: string;
}

const Brick: React.FC<BrickProps> = ({ videoSrc }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.error('Video play error:', e));
    }
  }, [videoSrc]);

  return (
    <div className={styles.brick}>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};

interface RowProps {
  layout: 'A' | 'B';
  videos: [string, string];
  rowIndex: number;
}

const Row: React.FC<RowProps> = ({ layout, videos, rowIndex }) => {
  const key1 = `brick-${rowIndex}-0`;
  const key2 = `brick-${rowIndex}-1`;

  const rowLayoutClass = layout === 'A' ? styles.layoutA : styles.layoutB;

  return (
    <div className={`${styles.row} ${rowLayoutClass}`}>
      <div key={key1}>
        <Brick videoSrc={videos[0]} />
      </div>
      <div key={key2}>
        <Brick videoSrc={videos[1]} />
      </div>
    </div>
  );
};

interface RowData {
  id: number;
  layout: 'A' | 'B';
  videos: [string, string];
}

const VideoWall: React.FC = () => {
  const initialRows = useMemo<RowData[]>(() =>
    Array.from({ length: ROW_COUNT }, (_, i) => {
      const firstVideoIndex = (i * 2) % VIDEO_SOURCES.length;
      const secondVideoIndex = (firstVideoIndex + 1) % VIDEO_SOURCES.length;

      return {
        id: i,
        layout: i % 2 === 0 ? 'A' : 'B',
        videos: [VIDEO_SOURCES[firstVideoIndex], VIDEO_SOURCES[secondVideoIndex]],
      };
    }), []);

  const doubledRows = [...initialRows, ...initialRows];

  return (
    <div className={styles.videoWallContainer}>
      <div className={styles.scrollViewport}>
        <div className={styles.scrollWrapper}>
          {doubledRows.map((row, index) => (
            <Row
              key={`${row.id}-${index}`}
              layout={row.layout}
              videos={row.videos}
              rowIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoWall;