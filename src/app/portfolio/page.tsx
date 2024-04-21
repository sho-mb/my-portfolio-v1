import React from 'react';
import { HeroSection } from '../ui/common/HeroSection';
import { hero } from '../lib/portfolio/portfolio';

export default function page() {
  return (
    <main>
      <HeroSection hero={hero} />
      {/* <Portfolio portfolios={} /> */}
    </main>
  );
}
