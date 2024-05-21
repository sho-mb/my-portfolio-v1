'use client';
import { useState } from 'react';
import { NavLinks } from './NavLinks';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="rounded-md text-gray-500 focus:outline-none" onClick={toggleMenu}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute top-0 left-0 w-full h-screen bg-white z-10 flex flex-col items-center justify-center text-3xl`}
        onClick={toggleMenu}
      >
        <NavLinks />
      </div>
    </div>
  );
};

export default HamburgerMenu;
