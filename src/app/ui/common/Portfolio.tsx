import Image from 'next/image';
import React from 'react';
import { PortfolioCard } from './PortfolioCard';

interface portfoliosProps {
  portfolios: {
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    portfolio: {
      title: string;
      content: string;
    };
  }[];
}

export const Portfolio = (props: portfoliosProps) => {
  const portfolios = props.portfolios;
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
