import React from 'react';

interface SectionType {
  title: string;
  subtile: string;
}

export const SectionTittle = (props: SectionType) => {
  return (
    <div className="mb-10">
      <div className="w-fit">
        <h2 className="font-bold text-2xl margins mb-2">{props.title}</h2>
        <div className="border-b-blue-500 border-b-2 w-full mb-2"></div>
      </div>
      <p className="font-semibold">{props.subtile}</p>
    </div>
  );
};
