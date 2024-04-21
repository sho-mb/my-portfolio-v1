import React from 'react';
import { HeroSection } from '../ui/common/HeroSection';
import { hero, sectionTitles, skills } from '../lib/about/about';
import { SectionTittle } from '../ui/common/SectionTittle';
import { Skills } from '../ui/about/Skills';

export default function page() {
  return (
    <main>
      <HeroSection hero={hero} />
      <section className="mt-10">
        <div className="mb-5">
          <SectionTittle
            title={sectionTitles.skills.title}
            subtile={sectionTitles.skills.subTitle}
          />
        </div>
        <p className="pb-10">
          Always bring a satisfy results to clients and commit to it. <br /> Help your business with
          my solution together.
        </p>
        <Skills skills={skills}></Skills>
      </section>
    </main>
  );
}
