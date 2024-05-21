import React from 'react';
import { bowlbyOne } from '../fonts';
import { NavLinks } from './NavLinks';
import Link from 'next/link';
import HamburgerMenu from './Hamburger';

export const Header = () => {
  return (
    <header className="py-6 md:py-10">
      <div className="font-bold flex justify-between">
        <div className={`${bowlbyOne.className}`}>
          <Link href={'/'}>SHO DESIGN</Link>
        </div>
        <ul className="md:flex gap-4 hidden">
          <NavLinks />
        </ul>
        <div className="md:hidden">
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};
