'use client';
import React from 'react';
import Image from 'next/image';
import styles from './ParallaxGallery.module.scss';

interface ParallaxGalleryProps {
  externalMousePosition?: { x: number; y: number };
}

const ParallaxGallery: React.FC<ParallaxGalleryProps> = ({ externalMousePosition }) => {
  // Using SVG files that already exist in the public directory
  const images = [
    { src: '/globe.svg', alt: 'Gallery Image 1', depth: 0.2 },
    { src: '/window.svg', alt: 'Gallery Image 2', depth: 0.1 },
    { src: '/file.svg', alt: 'Gallery Image 3', depth: 0.3 },
  ];

  return (
    <div className={styles.galleryContainer}>
      {images.map((image, index) => {
        // Calculate parallax effect based on mouse position
        const translateX = externalMousePosition ? externalMousePosition.x * image.depth * 30 : 0;
        const translateY = externalMousePosition ? externalMousePosition.y * image.depth * 30 : 0;
        
        return (
          <div 
            key={index}
            className={styles.imageWrapper}
            style={{
              transform: `translate(${translateX}px, ${translateY}px)`,
              zIndex: 10 - index
            }}
          >
            <Image 
              src={image.src} 
              alt={image.alt} 
              width={300} 
              height={400}
              className={styles.galleryImage}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ParallaxGallery;
