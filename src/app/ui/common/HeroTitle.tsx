import React from 'react';
import { andada } from '../fonts';
import { replaceToBr } from '@/lib/utils/textUtils';
import Link from 'next/link';
import Image from 'next/image';

interface titleProps {
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
}

export const HeroTitle = (props: titleProps) => {
  const heroTitle = props.heroTitle;

  return (
    <div className="text-center md:text-left">
      <h1 className="font-extrabold text-4xl mb-4 mt-4 md:mt-0">{heroTitle.section}</h1>
      <p className={`${andada.className} font-medium mb-4`}>{replaceToBr(heroTitle.content)}</p>
      {heroTitle.subContent && <p>{replaceToBr(heroTitle.subContent)}</p>}
      {heroTitle.snsIcons && (
        <div className="grid grid-cols-4 gap-4 items-center pt-4">
          {heroTitle.snsIcons.map((sns) => {
            return (
              <Link key={sns.src} href={sns.href} className="m-auto md:m-0">
                <Image src={sns.src} alt={sns.alt} height={sns.height} width={sns.width} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
