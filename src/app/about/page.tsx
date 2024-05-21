'use client';
import React, { useEffect, useState } from 'react';
import { HeroSection } from '../ui/common/HeroSection';
import { hero, sectionTitles, skills } from '../../types/about/about';
import { SectionTittle } from '../ui/common/SectionTittle';
import { Skills } from '../ui/about/Skills';
import { Button, Separator } from '@radix-ui/themes';
import Image from 'next/image';
import { Portfolio } from '../ui/common/Portfolio';
import Link from 'next/link';
import { PortfoliosProps } from '@/types/portfolio/portfolio';
import { PortfolioSwiper } from '../ui/common/PortfolioSwiper';

export default function Page() {
  const [portfolios, setPortfolios] = useState<PortfoliosProps[]>([]);
  const numberOfPortfolio = 3;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/portfolio/api?number=${numberOfPortfolio}`, {
          cache: 'no-store',
          method: 'GET',
        });
        const data = await res.json();
        setPortfolios(data);
      } catch (err) {
        console.error('Error fetching portfolios:', err);
      }
    };
    fetchData();
  }, [numberOfPortfolio]);

  return (
    <main>
      <HeroSection hero={hero} />
      <section className="mt-4 md:my-20 md:mt-0">
        <div className="pb-5">
          <div className="mb-5">
            <SectionTittle
              title={sectionTitles.skills.title}
              subtile={sectionTitles.skills.subTitle}
            />
          </div>
          <p className="pb-12 md:pb-20 text-center md:text-left">
            Always bring a satisfy results to clients and commit to it. <br /> Help your business
            with my solution together.
          </p>
          <Skills skills={skills}></Skills>
        </div>
        <Separator my="3" size="4" />
      </section>
      <section className="my-20">
        <div className="pb-5">
          <div className="mb-10">
            <SectionTittle
              title={sectionTitles.random.title}
              subtile={sectionTitles.random.subTitle}
            />
          </div>
          <div className="md:flex">
            <div className="md:w-[50%]">
              <Image src="/assets/meIllust.png" alt="sho illustlation" height={320} width={320} />
            </div>
            <div className="md:w-[50%]">
              <h3 className="font-semibold text-xl">Fact about me</h3>
              <p className="mt-5">
                Gym is my best partner <br />
                I’m into cooking, every time find some recipes and <br />
                tested on my own
                <br />
                Of course, I love to eat as well as cooking
                <br />
                My dream is traveling world and <br /> eat what I want with no limite!
                <br />
                You can find me here more on{' '}
                <a className="underline hover:text-blue-500" href="https://twitter.com/xXkilin">
                  X
                </a>{' '}
                or
                <br />
                Maybe{' '}
                <a
                  className="underline hover:text-blue-500"
                  href="www.linkedin.com/in/紀章-田村-a2b335237"
                >
                  LinkedIn
                </a>{' '}
                too?
                <br />
                What anime character you like?
              </p>
            </div>
          </div>
        </div>
        <Separator my="3" size="4" />
      </section>
      <section className="my-20">
        <div className="pb-5">
          <SectionTittle
            title={sectionTitles.portfolio.title}
            subtile={sectionTitles.portfolio.subTitle}
          />
        </div>
        <div className="hidden md:block">
          <Portfolio portfolios={portfolios} />
        </div>
        <div className="md:hidden">
          <PortfolioSwiper portfolios={portfolios} />
        </div>
        <Separator my="3" size="4" />
      </section>
      <section className="my-20 text-center">
        <Button size={'4'}>
          <Link href="/contact">Let’s have a talk with me</Link>
        </Button>
      </section>
    </main>
  );
}
