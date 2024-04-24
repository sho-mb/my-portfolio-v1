import React from 'react';
import { HeroTitle } from './HeroTitle';
import Image from 'next/image';
import { Separator } from '@radix-ui/themes';

interface titleProps {
  hero: {
    heroTitle: {
      section: string;
      content: string;
      subContent?: string;
      snsIcons?: {
        src: string;
        alt: string;
        width: number;
        height: number;
        href: string;
      }[];
    };
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
}

export const HeroSection = (props: titleProps) => {
  const image = props.hero.image;
  return (
    <>
      <div className="flex">
        <div className="w-[50%]">
          <HeroTitle heroTitle={props.hero.heroTitle} />
        </div>
        <div className="w-[50%]">
          <Image src={image.src} alt={image.alt} height={image.height} width={image.width} />
        </div>
      </div>
      <Separator my="3" size="4" />
    </>
  );
};
