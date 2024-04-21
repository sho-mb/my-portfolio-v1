import React from 'react';
import { bowlbyOne } from '../fonts';
import { NavLinks } from './NavLinks';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="py-10">
      <div className="font-bold flex justify-between">
        <div className={`${bowlbyOne.className}`}>
          <Link href={'/'}>SHO DESIGN</Link>
        </div>
        <ul className="flex gap-4">
          <NavLinks />
        </ul>
      </div>
    </header>
  );
};
