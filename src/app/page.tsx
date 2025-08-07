import SlidingCards from '@/components/SlidingCards';
import AnimeText from '@/components/AnimeText';
import SlideCard0 from '@/components/SlideCard0';
import SlideCard1 from '@/components/SlideCard1';
import SlideCard2 from '@/components/SlideCard2';
import SlideCard4 from '@/components/SlideCard4';
import FixedFooter from '@/components/FixedFooter';
import FeatureCard from '@/components/FeatureCard';
import styles from '@/styles/page.module.scss';
import Marquee, { marqueeClasses } from '@/components/Marquee';
import Toolkit from '@/components/Toolkit';
import BubbleMarquee from '@/components/BubbleMarquee';

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.heroSection}>
        <AnimeText text="Discover Your Creative Universe" fontSize="7rem" fontWeight={800} />
      </section>
      {/* <section className={styles.section}>
        <SlideCard4 />
      </section> */}
      <section className={styles.heroSection}>
        <AnimeText text="Where Creative Minds Converge" fontSize="7rem" fontWeight={800} />
      </section>
      <Marquee duration="30s" reverse={false}>
        <span className={marqueeClasses.text}>Rediscovering your creative passion</span>
        <span className={marqueeClasses.text}>Prompts to Turbocharge Your Creative Process</span>
        <span className={marqueeClasses.text}>BPM heartrate and running</span>
        <span className={marqueeClasses.text}>The creative paradox</span>
        <span className={marqueeClasses.text}>Rediscovering your creative passion</span>
      </Marquee>
      <section className={styles.section}>
        <SlidingCards>
          <SlideCard0 />
          <SlideCard1 />
          <SlideCard2 />
        </SlidingCards>
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
        <Toolkit />
      </section>
      
      <section>
        <BubbleMarquee />
      </section>
      <FixedFooter />
      </main>
  );
}
