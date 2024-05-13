import { replaceToBr } from '@/lib/utils/textUtils';
import Image from 'next/image';
import React from 'react';

interface skillProps {
  skills: {
    images: {
      src: string;
      alt: string;
      height: number;
      width: number;
    }[];
    skill: {
      title: string;
      detail: string;
      skillNames: string;
    };
  }[];
}

export const Skills: React.FC<skillProps> = ({ skills }) => {
  return (
    <div className="flex">
      {skills.map((item) => {
        const images = item.images;
        const skill = item.skill;
        return (
          <div key={item.skill.title} className="w-[50%]">
            <div className="flex gap-4 mb-4">
              {images.map((logo) => {
                return (
                  <Image
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                  />
                );
              })}
            </div>
            <h2 className="font-bold text-xl mb-4">{skill.title}</h2>
            <p className="mb-4">{replaceToBr(skill.detail)}</p>
            <p className="text-gray-500">{replaceToBr(skill.skillNames)}</p>
          </div>
        );
      })}
    </div>
  );
};
