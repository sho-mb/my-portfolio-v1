import { links } from '@/app/lib/links';
import Link from 'next/link';
import React from 'react';

export const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        return (
          <Link key={link.link} href={link.href} className="hover:text-blue-800">
            <p>{link.link}</p>
          </Link>
        );
      })}
    </>
  );
};
