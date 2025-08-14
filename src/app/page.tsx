'use client';

import Hero from "@/components/Hero";
import BackgroundImages from "@/components/BackgroundImages";
import ThemeToggle from "@/components/ThemeToggle";
import SlidingCards from "@/components/SlidingCards";
import FeatureCard from "@/components/FeatureCard";
import ScrollRevealText from "@/components/ScrollRevealText";
import SlidingCard from "@/components/SlidingCard";
import ParallaxGallery from "@/components/ParallaxGallery";
import VideoWall from "@/components/VideoWall";
import Button from "@/components/Button";
import Toolkit from "@/components/Toolkit";
import Marquee from "@/components/Marquee";
import BubbleMarquee from "@/components/BubbleMarquee";
import BottomText from "@/components/BottomText";
import PricingSection from "@/components/PricingSection";
import Image from "next/image";
import PriceCircles from "@/components/PriceCircles";
export default function Home() {
  
  return (
    <div className="container">
      <ThemeToggle />
      <Hero text="Discover Your Creative Universe" />
      <BackgroundImages />
      <FeatureCard />
      {/* <ScrollRevealText text="Where creative minds converge" />       */}
      <SlidingCards>
        <SlidingCard
          subtitle="INSIDER ACCESS"
          title="Exclusive access and insights"
          text="Experience the creative world through an insider's lens. Kyozo is an eco-system of creative communities - that gives you exclusive access to updates and insights from the creative luminaries driving cultural evolution."
          button={<Button variant="accent-border" size="medium" href="#">Join the waitlist</Button>}
          content={<VideoWall />}
        />
        <SlidingCard
          subtitle="COMMUNITY ACCESS"
          title="Engage with visionary communities"
          text="Join and interact with diverse communities, from niche artistic circles to industry-leading collectives. Engage with passionate individuals who share your creative interests."
          button={<Button variant="accent-border" size="medium" href="#">Join the waitlist</Button>}
          content={<ParallaxGallery />}
        />
        <SlidingCard
          subtitle="CREATOR TOOLS"
          title="Grow your creative community"
          text="Are you a creative professional, community organizer, or small business owner working within the creative industries? We understand the challenges of nurturing and growing a dedicated audience, so we built KyozoPro, a comprehensive platform that enhances genuine connections and unlocks new opportunities."
          button={<Button variant="accent-border" size="medium" href="#">Join the waitlist</Button>}
          content={<Image src="/card-3.png" alt="Phone" width={800} height={800} />}
        />
      </SlidingCards>      
      <Toolkit />
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
      
      <PricingSection />      
       
        <BubbleMarquee 
          categories={[
            {
              category: 'music',
              items: [
                { text: 'Music' },
              ]
            },
            {
              category: 'classicism',
              items: [
                { text: 'Classicism' },
              ]
            },
            {
              category: 'jewelry',
              items: [
                { text: 'Jewelry' },
              ]
            },
            {
              category: 'vintage',
              items: [
                { text: 'Vintage' },
              ]
            },
            {
              category: 'minimal',
              items: [
                { text: 'Minimal' },
              ]
            }
          ]}
        />
     
      <BottomText text="Join the creative universe" fontSize="6rem" fontWeight={700} />
    </div>
  );
}
