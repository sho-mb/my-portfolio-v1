import { Box, Button, Card, Inset, Text } from '@radix-ui/themes';
import Image from 'next/image';
import React from 'react';

interface CardProps {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  portfolio: {
    id: number;
    title: string;
    content: string;
  };
}

export const PortfolioCard = (props: CardProps) => {
  const image = props.image;
  const portfolio = props.portfolio;

  const goToDetail = (id: number) => {};

  return (
    <Box maxWidth="280px" height="400px">
      <Card size="1" className="h-full">
        <Inset clip="padding-box" side="top" pb="current" className="w-[280px] h-[200px]">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            style={{ objectFit: 'contain' }}
            height={image.height}
            unoptimized
          />
        </Inset>
        <Text as="div" size="2" className="mt-4">
          <p className="mb-1 font-bold">{portfolio.title}</p>
          <p>{portfolio.content}</p>
          <div className="absolute right-3 bottom-3">
            <Button radius="full" variant="outline" color="gray">
              More
            </Button>
          </div>
        </Text>
      </Card>
    </Box>
  );
};
