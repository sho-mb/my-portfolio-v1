import Image from 'next/image';
import React from 'react';
import { PortfolioCard } from './PortfolioCard';
import { portfolios } from '@/app/lib/portfolios';

export const Portfolio = () => {
  return (
    <div className="flex gap-20">
      {portfolios.map((portfolio) => {
        return (
          <PortfolioCard
            key={portfolio.portfolio.title}
            image={portfolio.image}
            portfolio={portfolio.portfolio}
          />
        );
      })}
    </div>
  );
};
