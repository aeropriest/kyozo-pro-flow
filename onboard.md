on the pagehttps://kyozo.webflow.io, we have beautiful cards design and they have nice animation to goto next cards, i plan to reuse this animation to progress to each step, i am using sass for styling, below is the sliding card code and one of the cards, we will not change the cards with scrolling but we will have next and back buttons, our controls look like attached image, following are the steps, we should maintain json array for each stop to keep the title, subtitle, an image on the right while rest of the controls would go inside



step 1. Welcome the user, tell them about Kyozo and have a button 'Hello Kyozo' and user is prompted to press it to start, pressing it would actually send a whatsapp message to +852-6043-4478, message would have an image, a welcome message and a link for user to click on that would bring them back to onboarding process's step-2



step-2: Create an account with e-mail password or signup with google, enable the next button once a valid email and password is entered



step-3: If signed up with google, we will get users full name and image but is signup with email, we will ask user to set an avatar image in a dropzone, a text button below, I will do it later to skip this part



step-4: now user has signed up, we will invite user to create their community, give it a name, chose a location, add a logo and a background image



step-4: in this step user would set the privacy level, referreral settings, visibility setting and theme color like in attached image



step-4 here user would add members to this community, they can import members database from csv file, import from their Eventbrite account or create new member manually



step-4.1: if user chose to import from csv, we show a dropzone for user to browse or drag drop a csv



step-4.2: for eventbrite, user would enter their eventbirte private token, we instruct user to login to their event brite and click on button that opens the url to copy the private token https://www.eventbrite.com/account-settings/apps



step-4.3: for manually create account, we will use step-5



step-5: all imported members would be shown in a list , where user can go through each member profiles, and when clicked on a user, all details of the member would be loaded to edit them, member details would include first/last name, email, phone number, ig handle, there would be - this would also be used to create members manually, they should be able continue to add or goto next step



step-5: would take the user to their dashboard



"use client";



import React, { useState, useRef, useEffect, ReactNode } from 'react';

import styles from './SlidingCards.module.scss';



interface SlidingCardsProps {

  children: ReactNode;

  className?: string;

}



const SlidingCards: React.FC<SlidingCardsProps> = ({ children, className = '' }) => {

  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  const childrenArray = React.Children.toArray(children);

  const numCards = childrenArray.length;



  useEffect(() => {

    const container = containerRef.current;

    if (!container) return;



    const handleScroll = () => {

      const { top, height } = container.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      

      // The total distance the container can be scrolled through

      const scrollableDistance = height - viewportHeight;

      

      // The amount of pixels scrolled past the top of the container

      const scrolled = -top;

      

      if (scrollableDistance > 0) {

        // Calculate progress as a value between 0 and 1

        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

        setScrollProgress(progress);

      }

    };



    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call to set the state correctly on load

    handleScroll(); 



    return () => window.removeEventListener('scroll', handleScroll);

  }, [numCards]);



  const cardsToScrollPast = numCards - 1;

  const cardProgress = scrollProgress * cardsToScrollPast;

  const activeCardIndex = Math.floor(cardProgress);

  const progressInSegment = cardProgress - activeCardIndex;



  // Each card's animation happens over a portion of the scroll.

  // We define the scroll height per card in vh units.

  const scrollPerCard = 100; // vh

  // The animation (translateY) occurs over the first 80% of that scroll distance.

  const transitionDurationRatio = 0.8;



  return (

    <div

      ref={containerRef}

      style={{ height: `${100 + scrollPerCard * cardsToScrollPast}vh` }}

      className={`${styles.slidingCardsContainer} ${className}`}

    >

      <div className={styles.stickyContainer}>

        {childrenArray.map((child, i) => {

          let transform = 'translateY(100%) scale(1)';

          const zIndex = i;



          if (i <= activeCardIndex) {

            // Cards that have been fully revealed stay in place

            transform = 'translateY(0) scale(1)';

          } else if (i === activeCardIndex + 1) {

            // The next card to be revealed animates in

            const animationProgress = Math.min(1, progressInSegment / transitionDurationRatio);

            const translateY = 100 - animationProgress * 100;

            transform = `translateY(${translateY}%) scale(1)`;

          }

          // Cards further down the stack remain off-screen (default transform)



          return (

            <div

              key={i}

              className={styles.cardWrapper}

              style={{

                zIndex,

                transform,

              }}

            >

              {child}

            </div>

          );

        })}

      </div>

    </div>

  );

};



export default SlidingCards;



'use client';

import React from 'react';

import styles from './SlideCard0.module.scss';

import Button from './Button';

import Image from 'next/image';

import VideoWall from '@/components/VideoWall'



interface SlideCard0Props {

  className?: string;

}



const SlideCard0: React.FC<SlideCard0Props> = ({ className = '' }) => {

  return (

    <div className={`${styles.cardContainer} ${className}`}>

      <div className={styles.cardContent}>

        <div className={styles.leftContent}>

          <p className={styles.categoryLabel}>INSIDER ACCESS</p>

          <h2 className={styles.cardTitle}>Exclusive access and insights</h2>

          <p className={styles.cardDescription}>

            Experience the creative world through an insider's lens. Kyozo is an eco-system of creative communities - that gives you exclusive access to updates and insights from the creative luminaries driving cultural evolution.

          </p>

          <div>

            <Button variant="outline-only" href="#">Join the waitlist</Button>

          </div>

        </div>

        <div className={styles.rightContent}>

          <VideoWall />

        </div>

      </div>

    </div>

  );

};



export default SlideCard0;



@use '../styles/colors' as *;

@use 'sass:map';



.cardContainer {

  width: calc(100% - 200px); /* Account for left and right margins */

  height: calc(100vh - 160px); /* Account for top and bottom margins */

  margin: 20px 100px;

  background: map.get($colors-primary, 'lighter-background-color');

  padding: 10px;

  box-shadow: 0 8px 32px rgba(map.get($colors-primary, 'background-color'), 0.2);

  display: flex;

  flex-direction: column;

  justify-content: flex-start; /* Top align all content */  // gap: 30px;

  position: relative;

  overflow: hidden;

  border-radius: 30px;

  backdrop-filter: blur(10px);

  border: 0.5px solid map.get($colors-primary, 'mediam-background-color');  

}   



.cardContent {

  display: flex;

  flex-direction: row;

  // gap: 40px;

  align-items: flex-start; /* Top align items horizontally */

  justify-content: space-between;

  margin-top: 0; /* Don't push content to bottom */

  

  @media (max-width: 768px) {

    flex-direction: column-reverse;

  }

}



.leftContent {

  width: 50%;

  display: flex;

  flex-direction: column;

  text-align: left;

  gap: 10px;

  padding: 30px 0 0 30px; /* Reduced top padding */

  // background-color: map.get($colors-primary, 'accent-purple');

  margin-bottom: 20px;

  justify-content: flex-start; /* Top align content */

  height: 100%; /* Take full height of parent */

}



.rightContent {

  width: 60%;

  display: flex;

  justify-content: center;

  align-items: center;

  position: relative;

  overflow: hidden;

}



.categoryLabel {

  font-size: 1rem;

  font-weight: 300;





  letter-spacing: 0.1em;

  color: map.get($colors-primary, 'lighter-gray');

  margin: 0 0 8px 0;

}



.cardTitle {

  font-size: 4.8rem;

  font-weight: 700;

  margin: 0;

  // background: linear-gradient(90deg, map.get($colors-primary, 'dark-text-color'), map.get($colors-primary, 'accent-light-purple'));

  -webkit-background-clip: text;

  background-clip: text;

  color: map.get($colors-primary, 'dark-text-color');

  line-height: 1.0; /* Reduced line height to bring lines closer together */

}



.cardDescription {

  font-size: 1rem;

  line-height: 1.6;

  color: map.get($colors-primary, 'dark-text-color');

  margin: 0;

  padding-top: 30px;

  padding-bottom: 30px;

  // padding-right: 80px

  width: 65%;

}

