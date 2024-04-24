import Image from 'next/image';
import { andada } from './ui/fonts';
import { SectionTittle } from './ui/common/SectionTittle';
import { Portfolio } from './ui/common/Portfolio';
import { portfoliosLatest } from './lib/portfolios';

export default function Home() {
  return (
    <main>
      <div className="flex">
        <div className="w-1/2 my-auto">
          <h1 className={`${andada.className} text-2xl font-semibold`}>
            Hi I’m sho! <br />
            Web designer and <br />
            Frontend developer <br />
            from <span className="text-blue-500">Japan</span>.
          </h1>
        </div>
        <div className="w-1/2  bg-neutral-600">
          <Image
            width={565}
            height={931}
            content="fit"
            className="grayscale-[1]"
            src="/assets/hero.png"
            alt="sho's profile picture"
          />
        </div>
      </div>
      <div className="my-10">
        <div className="mb-10">
          <SectionTittle title="Portfolio" subtile="Here is latest portfolio" />
        </div>
        <Portfolio portfolios={portfoliosLatest} />
      </div>
    </main>
  );
}
