import React from 'react';
import { andada } from '../fonts';
import { replaceToBr } from '@/app/lib/utils/textUtils';

interface titleProps {
  heroTitle: {
    section: string;
    content: string;
    subContent: string;
  };
}

export const HeroTitle = (props: titleProps) => {
  const heroTitle = props.heroTitle;

  return (
    <div>
      <h1 className="font-extrabold text-4xl mb-4">{heroTitle.section}</h1>
      <p className={`${andada.className} font-medium mb-4`}>{replaceToBr(heroTitle.content)}</p>
      <p>{replaceToBr(heroTitle.subContent)}</p>
    </div>
  );
};
