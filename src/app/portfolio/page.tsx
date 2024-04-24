import React from 'react';
import { HeroSection } from '../ui/common/HeroSection';
import { hero, portfolios } from '../lib/portfolio/portfolio';
import { Portfolio } from '../ui/common/Portfolio';

export default function page() {
  return (
    <main>
      <HeroSection hero={hero} />
      <Portfolio portfolios={portfolios} />
    </main>
  );
}
