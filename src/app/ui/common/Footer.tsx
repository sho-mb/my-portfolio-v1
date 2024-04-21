import React from 'react';
import { NavLinks } from './NavLinks';

export const Footer = () => {
  return (
    <footer className="py-6">
      <div className="flex justify-between">
        <small>©2024 Sho Design</small>
        <div className="flex text-sm gap-4">
          <NavLinks />
        </div>
      </div>
    </footer>
  );
};
