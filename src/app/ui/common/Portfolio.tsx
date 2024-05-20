import React from 'react';
import { PortfolioCard } from './PortfolioCard';
import { PortfoliosProps } from '@/types/portfolio/portfolio';

interface PortfolioProps {
  portfolios: PortfoliosProps[];
}

export const Portfolio = (props: PortfolioProps) => {
  const portfolios = props.portfolios;
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
