'use client';
import { PortfoliosProps } from '@/types/portfolio/portfolio';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface detailProps {
  id: number;
}

const fetchData = async (id: number) => {
  const res = await fetch(`/portfolio/api/${id}`, {
    method: 'GET',
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }

  const error = await res.json();

  throw new Error(error);
};

export const PortfolioDetail = (props: detailProps) => {
  const id = props.id;
  const [detail, setDetail] = useState<PortfoliosProps>();

  useEffect(() => {
    try {
      fetchData(id).then((data) => setDetail(data));
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  return (
    <div>
      {detail && (
        <>
          <div className="w-full h-[500px] overflow-hidden relative">
            <Image
              style={{ objectFit: 'cover' }}
              fill={true}
              src={detail.image.src}
              alt={detail.image.alt}
            />
          </div>
          <div className="py-8 text-3xl">{detail.portfolio.title}</div>
          <div className="mb-8">{detail.portfolio.content}</div>
          <div className="mb-3">Link for this website</div>
          {detail.portfolio.link && (
            <Link target="_blank" href={detail.portfolio.link} className="text-blue-600">
              {detail.portfolio.link}
            </Link>
          )}
        </>
      )}
    </div>
  );
};
