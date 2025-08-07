"use client";

import React, { useState } from 'react';
import { Marquee } from './Marquee';
import styles from './BubbleMarquee.module.scss';

const Bubble = ({ text, colorClass }: { text: string; colorClass: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const bubbleClasses = `${styles.bubble} ${styles[colorClass]} ${isHovered ? styles.hovered : ''}`;

  return (
    <div
      className={bubbleClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={styles['bubble-text']}>{text}</span>
    </div>
  );
};

const bubbleRows = [
  { colorClass: 'music', duration: '30s', reverse: false, tags: ['Rock', 'Jazz', 'R&B', 'Trance', 'Techno', 'House','Rock', 'Jazz', 'R&B', 'Trance'] },
  { colorClass: 'artMovements', duration: '35s', reverse: true, tags: ['Pop Art', 'Bauhaus', 'Expressionism', 'Futurism','Pop Art', 'Bauhaus', 'Expressionism', 'Futurism'] },
  { colorClass: 'crafts', duration: '25s', reverse: false, tags: ['Candle-making', 'Crochet', 'Jewelry', 'Painting','Candle-making', 'Crochet', 'Jewelry', 'Painting'] },
  { colorClass: 'fashion', duration: '32s', reverse: true, tags: ['Classic', 'Chic', 'Grunge','Classic', 'Chic', 'Grunge','Classic', 'Chic', 'Grunge',] },
  { colorClass: 'performance', duration: '38s', reverse: false, tags: ['Musical', 'Digital', 'Circus','Musical', 'Digital', 'Circus','Musical', 'Digital', 'Circus'] },
];

const BubbleMarquee: React.FC = () => {
  return (
    <section className={styles['bubble-section']}>
      <div className={styles['bubble-rows']}>
        {bubbleRows.map((row, rowIndex) => {
          const rotationAngle = rowIndex % 2 === 0 ? 0.2 : -0.2;
          return (
            <div
              key={rowIndex}
              className={styles['bubble-row']}
              style={{
                transform: `rotate(${rotationAngle}deg)`,
              }}
            >
                {row.tags.map((tag, tagIndex) => (
                  <Bubble key={tagIndex} text={tag} colorClass={row.colorClass} />
                ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BubbleMarquee;
