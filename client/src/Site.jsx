import { useEffect, useState } from 'react';
import Intro from './components/Intro';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Marquee from './components/Marquee';
import Hero from './sections/Hero';
import Project from './sections/Project';
import Contact from './sections/Contact';
import {
  About,
  Stack,
  Achievements,
  Beyond,
  Education,
  Certification,
} from './sections/Info';
import Journey from './sections/Journey';
import { initSmoothScroll } from './animations/smoothScroll';
import { initInteractions } from './hooks/interactions';

export default function Site() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stopSmoothScroll = initSmoothScroll();
    const stopInteractions = initInteractions();

    return () => {
      stopSmoothScroll();
      stopInteractions();
    };
  }, []);

  return (
    <>
      <Intro onDone={() => setReady(true)} />
      <Cursor />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Stack />
        <Project />
        <Journey />
        <Achievements />
        <Beyond />
        <Education />
        <Certification />
        <Contact />
      </main>
    </>
  );
}
