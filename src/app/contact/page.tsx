import React from 'react';
import { ContactForm } from '../ui/contact/ContactForm';
import { HeroSection } from '../ui/common/HeroSection';
import { hero } from '../../types/contact/contact';

export default function page() {
  return (
    <main>
      <HeroSection hero={hero} />
      <ContactForm />
    </main>
  );
}
