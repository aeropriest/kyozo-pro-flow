import React, { useState, useEffect, useRef } from 'react';
import styles from './ParallaxGallery.module.scss';

// Custom hook to track mouse position relative to an element
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to viewport
      setMousePosition({
        x: e.clientX / window.innerWidth * 2 - 1, // -1 to 1 range
        y: e.clientY / window.innerHeight * 2 - 1, // -1 to 1 range
      });
    };
    
    // Track mouse movement globally
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return { mousePosition, isHovering, setIsHovering };
}

interface ImageData {
  src: string;
  alt: string;
}

interface Transform {
  x: number;
  y: number;
  rotate: number;
}

interface ParallaxImageProps {
  image: ImageData;
  targetTransform: Transform;
  progress: number;
}

const IMAGES: ImageData[] = [
  { src: '/Parallax1.jpg', alt: 'DJ at a concert with hands up' },
  { src: '/Parallax2.jpg', alt: 'Singer on stage with smoke' },
  { src: '/Parallax3.jpg', alt: 'Breakdancer performing a handstand' },
  { src: '/Parallax4.jpg', alt: 'Audience enjoying a concert' },
  { src: '/Parallax5.jpg', alt: 'Abstract red light streaks' },
];

const TARGET_TRANSFORMS: Transform[] = [
  { x: -12, y: -15, rotate: -8 },
  { x: 12, y: -12, rotate: 5 },
  { x: 0, y: 0, rotate: 0 },
  { x: -15, y: 15, rotate: -5 },
  { x: 15, y: 15, rotate: 8 },
];

const ANIMATION_SCROLL_RANGE = 600;

const ParallaxImage: React.FC<ParallaxImageProps> = ({ image, targetTransform, progress }) => {
  // Amplify the effect for more noticeable movement
  const translateX = targetTransform.x * progress * 1.5;
  const translateY = targetTransform.y * progress * 1.5;
  const rotate = targetTransform.rotate * progress * 0.8;

  return (
    <div
      className={styles['parallax-image']}
      style={{
        transform: `translate(calc(-50% + ${translateX}vw), calc(-50% + ${translateY}vh)) rotate(${rotate}deg)`,
      }}
    >
      <div className={styles['parallax-image__container']}>
        <img
          src={image.src}
          alt={image.alt}
          className={styles['parallax-image__img']}
          draggable="false"
        />
      </div>
    </div>
  );
};

const ParallaxGallery: React.FC = () => {
  // Use our custom hook for mouse tracking
  const { mousePosition, isHovering, setIsHovering } = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse enter/leave for the container
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  // Track the container's position in the viewport
  const [containerPosition, setContainerPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  
  useEffect(() => {
    const updateContainerPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        });
      }
    };
    
    // Update position initially and on resize/scroll
    updateContainerPosition();
    window.addEventListener('resize', updateContainerPosition);
    window.addEventListener('scroll', updateContainerPosition);
    
    return () => {
      window.removeEventListener('resize', updateContainerPosition);
      window.removeEventListener('scroll', updateContainerPosition);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={styles['parallax-gallery']} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles['parallax-gallery__background']}>
        <div className={styles['parallax-gallery__viewport']}>
          <div className={styles['parallax-gallery__relative']}>
            {IMAGES.map((image, index) => {
              // Calculate progress based on mouse position and hover state
              const progress = isHovering
                ? Math.min(Math.abs(mousePosition.x * 0.5) + Math.abs(mousePosition.y * 0.5), 1) * 1.5
                : Math.min(Math.abs(mousePosition.x * 0.3) + Math.abs(mousePosition.y * 0.3), 1);
                
              return (
                <ParallaxImage
                  key={image.src}
                  image={image}
                  targetTransform={TARGET_TRANSFORMS[index]}
                  progress={progress}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxGallery;
