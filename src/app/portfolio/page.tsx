'use client';
import React, { useEffect, useState } from 'react';
import { HeroSection } from '../ui/common/HeroSection';
import { PortfoliosProps, hero } from '../../types/portfolio/portfolio';
import { Portfolio } from '../ui/common/Portfolio';

export default function Page() {
  const [portfolios, setPortfolios] = useState<PortfoliosProps[]>([]);
  const numberOfPortfolio = '';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/portfolio/api?number=${numberOfPortfolio}`, {
          cache: 'no-store',
          method: 'GET',
        });
        const data = await res.json();
        setPortfolios(data);
      } catch (err) {
        console.error('Error fetching portfolios:', err);
      }
    };
    fetchData();
  }, [numberOfPortfolio]);

  return (
    <main>
      <HeroSection hero={hero} />
      <Portfolio portfolios={portfolios} />
    </main>
  );
}
