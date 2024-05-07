import React from 'react';
import { PortfolioCard } from './PortfolioCard';
import { getPortfolios } from '@/service/portfolioService';

interface PortfolioProps {
  numberOfPortfolio?: number;
}

export const Portfolio = async (props: PortfolioProps) => {
  const portfolios = await getPortfolios().catch((err) => {
    console.error('Error fetching portfolios:', err);
  });

  if (props.numberOfPortfolio) {
    portfolios?.slice(0, props.numberOfPortfolio);
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {portfolios?.map((portfolio) => {
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
