import { Box, Card, Inset, Text } from '@radix-ui/themes';
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
    title: string;
    content: string;
  };
}

export const PortfolioCard = (props: CardProps) => {
  const image = props.image;
  const portfolio = props.portfolio;

  return (
    <Box maxWidth="280px">
      <Card size="1">
        <Inset clip="padding-box" side="top" pb="current">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            content="fit"
            height={image.height}
          />
        </Inset>
        <Text as="div" size="2">
          <p className="mb-1 font-bold">{portfolio.title}</p>
          <p>{portfolio.content}</p>
        </Text>
      </Card>
    </Box>
  );
};
