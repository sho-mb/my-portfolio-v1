import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import React from 'react';
import { PortfoliosProps } from '@/types/portfolio/portfolio';
import { PortfolioCard } from './PortfolioCard';

interface PortfolioProps {
  portfolios: PortfoliosProps[];
}

export const PortfolioSwiper = (props: PortfolioProps) => {
  const portfolios = props.portfolios;
  return (
    <Swiper centeredSlides={true} spaceBetween={10} slidesPerView={1.5}>
      {portfolios?.map((portfolio) => {
        return (
          <SwiperSlide key={portfolio.portfolio.id}>
            <PortfolioCard image={portfolio.image} portfolio={portfolio.portfolio} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
