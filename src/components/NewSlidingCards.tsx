'use client';
import React from 'react';
import NewSlidingCard from './NewSlidingCard';
import Button from './Button';
import VideoWall from './VideoWall';
import ParallaxGallery from './ParallaxGallary';
import Image from 'next/image';

const NewSlidingCards: React.FC = () => {
  return (
    <>
      {/* Card 0 Content */}
      <NewSlidingCard
        subtitle="INSIDER ACCESS"
        title="Exclusive access and insights"
        text="Experience the creative world through an insider's lens. Kyozo is an eco-system of creative communities - that gives you exclusive access to updates and insights from the creative luminaries driving cultural evolution."
        button={<Button variant="outline-only" href="#">Join the waitlist</Button>}
        content={<VideoWall />}
      />

      {/* Card 1 Content */}
      <NewSlidingCard
        subtitle="COMMUNITY ACCESS"
        title="Engage with visionary communities"
        text="Join and interact with diverse communities, from niche artistic circles to industry-leading collectives. Engage with passionate individuals who share your creative interests."
        button={<Button variant="outline-only" href="#">Join the waitlist</Button>}
        content={<ParallaxGallery />}
      />

      {/* Card 2 Content */}
      <NewSlidingCard
        subtitle="CREATOR TOOLS"
        title="Grow your creative community"
        text="Are you a creative professional, community organizer, or small business owner working within the creative industries? We understand the challenges of nurturing and growing a dedicated audience, so we built KyozoPro, a comprehensive platform that enhances genuine connections and unlocks new opportunities."
        button={<Button variant="outline-only" href="#">Join the waitlist</Button>}
        content={<Image src="/card-3.png" alt="Phone" width={800} height={800} />}
      />
    </>
  );
};

export default NewSlidingCards;
