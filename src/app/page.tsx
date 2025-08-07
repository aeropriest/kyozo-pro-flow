'use client';
import SlidingCards from '@/components/SlidingCards';
import AnimeText from '@/components/AnimeText';
import ScrollRevealText from '@/components/ScrollRevealText';
import SlideCard0 from '@/components/SlideCard0';
import SlideCard1 from '@/components/SlideCard1';
import SlideCard2 from '@/components/SlideCard2';
import FixedFooter from '@/components/FixedFooter';
import FeatureCard from '@/components/FeatureCard';
import BackgroundImages from '@/components/BackgroundImages';
import styles from '@/styles/page.module.scss';
import Marquee, { marqueeClasses } from '@/components/Marquee';
import Hero from '@/components/Hero';
import BubbleMarquee from '@/components/BubbleMarquee';
import BottomText from '@/components/BottomText';
import PricingSection from '@/components/PricingSection';
import Toolkit from '@/components/Toolkit';

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.heroSection}>
        <Hero />
      </section>
      <BackgroundImages />
      <section className={styles.featureSection}>
        <FeatureCard />
      </section>  
      <section className={styles.section}>
        <SlidingCards>
          <SlideCard0 />
          <SlideCard1 />
          <SlideCard2 />
        </SlidingCards>
      </section>
      <section>
        <Toolkit />
      </section>   
      <section>
        <Marquee duration="30s" reverse={false}>
          <span className={marqueeClasses.text}>Rediscovering your creative passion</span>
          <span className={marqueeClasses.text}>Prompts to Turbocharge Your Creative Process</span>
          <span className={marqueeClasses.text}>BPM heartrate and running</span>
          <span className={marqueeClasses.text}>The creative paradox</span>
          <span className={marqueeClasses.text}>Rediscovering your creative passion</span>
        </Marquee>
      </section>
      <section>
        <PricingSection />
      </section>   
      <section className={styles.section}>
        <BubbleMarquee 
          categories={[
            {
              category: 'music',
              items: [
                { text: 'Funk' },
                { text: 'Hip-Hop' },
                { text: 'Rock' },
                { text: 'Jazz' },
                { text: 'R&B' },
                { text: 'Classical' },
                { text: 'Electronic' },
                { text: 'Folk' }
              ]
            },
            {
              category: 'artMovements',
              items: [
                { text: 'Futurism' },
                { text: 'Classicism' },
                { text: 'Cubism' },
                { text: 'Modernism' },
                { text: 'Impressionism' },
                { text: 'Surrealism' },
                { text: 'Expressionism' },
                { text: 'Minimalism' }
              ]
            },
            {
              category: 'crafts',
              items: [
                { text: 'Recycling' },
                { text: 'Tufting' },
                { text: 'Wood Burning' },
                { text: 'Candle-making' },
                { text: 'Pottery' },
                { text: 'Knitting' },
                { text: 'Embroidery' },
                { text: 'Origami' }
              ]
            },
            {
              category: 'fashion',
              items: [
                { text: 'Vintage' },
                { text: 'Boho' },
                { text: 'Punk' },
                { text: 'Avant-garde' },
                { text: 'Streetwear' },
                { text: 'Minimalist' },
                { text: 'Athleisure' },
                { text: 'Haute Couture' }
              ]
            },
            {
              category: 'performance',
              items: [
                { text: 'Slam Poetry' },
                { text: 'Improv' },
                { text: 'Stand-ups' },
                { text: 'Storytelling' },
                { text: 'Monologues' },
                { text: 'Puppetry' },
                { text: 'Mime' },
                { text: 'Dance' }
              ]
            }
          ]}
        />
      </section>
      <FixedFooter />
      <BottomText text="Join the Kyozo creative universe" fontSize="7rem" fontWeight={800} />
      </main>
  );
}
