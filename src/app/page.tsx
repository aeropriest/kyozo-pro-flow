import SlidingCards from '../components/SlidingCards';
import Card from '../components/Card';
import Button from '../components/Button';
import AnimeText from '../components/AnimeText';
import SlideCard0 from '../components/SlideCard0';
import SlideCard1 from '../components/SlideCard1';
import SlideCard2 from '../components/SlideCard2';
import HeroSection from '../components/HeroSection';
import FixedFooter from '../components/FixedFooter';

export default function Home() {
  return (
    <div>
      <main>
        <AnimeText text="Hello here" />
        {/* Hero Section */}
        {/* <HeroSection title="Interactive Sliding Cards" subtitle="A demonstration of a scroll-driven animation effect. As you scroll down, new content cards will slide into view." /> */}

        {/* Sliding Cards Section */}
        {/* <SlidingCards>
          <SlideCard0 />
          <SlideCard1 />
          <SlideCard2 />
          <Card title="Additional Card" variant="rose">
            <p className="mt-4 text-lg">And finally, the last one.</p>
          </Card>
        </SlidingCards> */}

        {/* Fixed Footer */}
        <FixedFooter />
      </main>
    </div>
  );
}
