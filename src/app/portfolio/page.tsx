import React from 'react';
import { HeroSection } from '../ui/common/HeroSection';
import { hero } from '../lib/portfolio/portfolio';
import { Portfolio } from '../ui/common/Portfolio';

export default function page() {
  return (
    <main>
      <HeroSection hero={hero} />
      <Portfolio />
    </main>
  );
}
