import React, { useMemo, useEffect } from 'react';

const ROW_COUNT = 12;
const bubbleGapRem = 3; // Gap for horizontal and vertical spacing (1.25rem = 20px)

// Animation duration (seconds)
const ANIMATION_DURATION_S = ROW_COUNT * 3.5;

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

// Scroll-up keyframes for animation
const scrollUpKeyframes = `
  @keyframes scroll-up {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
`;

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
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        style={{
          borderRadius: '1rem',
          transform: 'translateZ(0)', // Force hardware acceleration
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
        }}
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

  const spacing = `${bubbleGapRem}rem`;
  const brickWidth = '18rem';
  const brickHeight = '8rem';

  // Calculate horizontal positions for bricks based on layout
  const getBrickStyle = (index: number) => {
    const baseStyle = {
      width: brickWidth,
      height: brickHeight,
      position: 'absolute' as const,
    };

    if (layout === 'A') {
      return index === 0 
        ? { ...baseStyle, left: 0 }
        : { ...baseStyle, left: `calc(50% + ${spacing})` };
    } else {
      return index === 0
        ? { ...baseStyle, left: `calc(50% - ${brickWidth} - ${spacing})` }
        : { ...baseStyle, left: '50%' };
    }
  };

  return (
    <div 
      className="relative w-full"
      style={{
        margin: `${bubbleGapRem}rem 0`,
        height: brickHeight,
      }}
    >
      <div key={key1} style={getBrickStyle(0)}>
        <Brick videoSrc={videos[0]} />
      </div>
      <div key={key2} style={getBrickStyle(1)}>
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
  // pick 2 videos per row from VIDEO_SOURCES, loop around if index exceeds length
  const initialRows = useMemo<RowData[]>(
    () =>
      Array.from({ length: ROW_COUNT }, (_, i) => {
        const firstVideoIndex = (i * 2) % VIDEO_SOURCES.length;
        const secondVideoIndex = (firstVideoIndex + 1) % VIDEO_SOURCES.length;

        return {
          id: i,
          layout: i % 2 === 0 ? 'A' : 'B',
          videos: [VIDEO_SOURCES[firstVideoIndex], VIDEO_SOURCES[secondVideoIndex]],
        };
      }),
    []
  );

  // Duplicate rows for seamless animation
  const doubledRows = [...initialRows, ...initialRows];

  // Calculate viewport height for ~6 rows with vertical spacing
  const viewportHeight = `calc(6 * (8rem + ${bubbleGapRem * 2}rem))`;

  const animationStyle = {
    animation: `scroll-up ${ANIMATION_DURATION_S}s linear infinite`,
    willChange: 'transform',
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: scrollUpKeyframes }} />
      <div 
        className="relative mx-auto h-full overflow-visible"
        style={{ 
          width: '100%',
          maxWidth: '54rem',
          padding: '0 1rem',
        }}
      >
        <div className="w-full" style={animationStyle}>
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
      {/* Gradient overlays (commented out for now)
      <div
        className="absolute top-0 left-0 right-0 h-[40px] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, black, transparent)',
          zIndex: 10,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[40px] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, black, transparent)',
          zIndex: 10,
        }}
        aria-hidden="true"
      />
      */}
    </div>
  );
};

export default VideoWall;
