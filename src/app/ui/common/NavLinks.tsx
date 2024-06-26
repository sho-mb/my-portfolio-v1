import { links } from '@/types/links';
import Link from 'next/link';
import React from 'react';

export const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        return (
          <Link key={link.link} href={link.href} className="hover:text-blue-800">
            <p className="mb-8 md:mb-0">{link.link}</p>
          </Link>
        );
      })}
    </>
  );
};
