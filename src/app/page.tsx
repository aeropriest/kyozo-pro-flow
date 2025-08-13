'use client';
import Image from 'next/image';
import {
  SlidingCards,
  AnimeText,
  ScrollRevealText,
  SlideCard0,
  SlideCard1,
  SlideCard2,
  FixedFooter,
  FeatureCard,
  BackgroundImages,
  Marquee,
  Hero,
  BubbleMarquee,
  BottomText,
  PricingSection,
  Toolkit,
  NewSlidingCards,
  NewSlidingCard,
  VideoWall,
  ParallaxGallery,
  Button,
} from '@/components';
import styles from '@/styles/page.module.scss';

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
      <section>
      <p>Where creative minds converge</p>  
      </section>
      <section>
        <ParallaxGallery />
      </section>
      <section className={styles.section}>
        <SlidingCards>
          <NewSlidingCard
            subtitle="INSIDER ACCESS"
            title="Exclusive access and insights"
            text="Experience the creative world through an insider's lens. Kyozo is an eco-system of creative communities - that gives you exclusive access to updates and insights from the creative luminaries driving cultural evolution."
            button={<Button variant="outline-only" href="#">Join the waitlist</Button>}
            content={<ParallaxGallery />}
          />
          <NewSlidingCard
            subtitle="COMMUNITY ACCESS"
            title="Engage with visionary communities"
            text="Join and interact with diverse communities, from niche artistic circles to industry-leading collectives. Engage with passionate individuals who share your creative interests."
            button={<Button variant="outline-only" href="#">Join the waitlist</Button>}
            content={<VideoWall />}
          />
          <NewSlidingCard
            subtitle="CREATOR TOOLS"
            title="Grow your creative community"
            text="Are you a creative professional, community organizer, or small business owner working within the creative industries? We understand the challenges of nurturing and growing a dedicated audience, so we built KyozoPro, a comprehensive platform that enhances genuine connections and unlocks new opportunities."
            button={<Button variant="outline-only" href="#">Join the waitlist</Button>}
            content={<Image src="/card-3.png" alt="Phone" width={800} height={800} />}
          />
        </SlidingCards>
      </section>
      <section>
        <Toolkit />
      </section>   
      <section>
      <Marquee 
          categories={[
            {
              category: 'music',
              items: [
                { text: 'Rediscovering your creative passion' },
                { text: 'Prompts to Turbocharge Your Creative Process' },
                { text: 'BPM heartrate and running' },
                { text: 'The creative paradox' },
                { text: 'Rediscovering your creative passion' },
              ]
            },
          ]}
        />
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
