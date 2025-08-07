'use client';

import React from 'react';
import styles from './Toolkit.module.scss';
import ArrowIcon from './ArrowIcon';
interface ToolkitProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
}

const Toolkit: React.FC<ToolkitProps> = ({
  title = 'CreativeLab',
  subtitle = 'Your creative toolkit',
  description = 'Explore a dynamic resources hub where creativity meets community. Here you\'ll find a curated collection of articles, videos and resources designed to inspire, inform and ignite your creative journey.',
  ctaText = 'Check out CreativeLab',
  ctaUrl = '#'
}) => {
  return (
    <section className="relative w-full max-w-6xl mx-auto py-24 px-6 sm:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 items-center">
      {/* Left side */}
      <div className="relative">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white !leading-tight">
          CreativeLab
          <br />
          Your creative
          <br />
          toolkit
        </h2>
        <span className="absolute -bottom-8 right-1/2 translate-x-1/2 md:right-1/4 md:translate-x-0 text-white/10 font-mono text-2xl select-none">02</span>
      </div>

      {/* Right side */}
      <div className="relative flex flex-col justify-center h-full">
         <p className="text-neutral-300 text-base leading-relaxed max-w-md">
          Explore a dynamic resources hub where creativity meets community. Here you'll find a curated collection of articles, videos and resources designed to inspire, inform and ignite your creative journey.
        </p>
        <a href="#" className="mt-8 text-white font-semibold text-base inline-flex items-center self-start group">
          Check out CreativeLab
          <ArrowIcon />
        </a>
         <span className="absolute -bottom-8 right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 text-white/10 font-mono text-2xl select-none">03</span>
      </div>
    </div>
  </section>
    // <section className={styles.toolkit}>
    //   <div className={styles.container}>
    //     <div className={styles.leftColumn}>
    //       <h2 className={styles.title}>{title}</h2>
    //       <h3 className={styles.subtitle}>{subtitle}</h3>
    //     </div>
        
    //     <div className={styles.rightColumn}>
    //       <p className={styles.description}>{description}</p>
    //       <a href={ctaUrl} className={styles.cta}>
    //         {ctaText} <span className={styles.arrow}>→</span>
    //       </a>
    //     </div>
    //   </div>
      
    //   <div className={styles.bubbleContainer}>
    //     <div className={styles.bubble}>
    //       <span>Social Media</span>
    //     </div>
    //     <div className={styles.notText}>We are not</div>
    //   </div>
    // </section>
  );
};

export default Toolkit;
