'use server'
import { PortfoliosProps } from "@/app/lib/portfolio/portfolio";
import { prisma } from "@/app/lib/prisma";

export const getPortfolios = async (): Promise<PortfoliosProps[]> => {
  try {
    const res = await prisma.portfolio.findMany();
    const portfolios: PortfoliosProps[] = [];
    if (res) {      
      res.forEach((item) => { 
        const portfolio: PortfoliosProps = {
          image: {
            src: item.url,
            alt: item.alt,
            width: item.width,
            height: item.height
          },
          portfolio: {
            id: item.id,
            title: item.title,
            content: item.content
          }
        };
        portfolios.push(portfolio); 
      });
    }
    return portfolios ;
  } catch(err: any) {
    console.log(err)
    return []
  }
}

export const createNewPortfolio = async (sharedLink: string, title: string, content: string, height: number, width: number ) => {
  await prisma.portfolio.create({
    data: {
      alt: `portfolio ${title}'s image`,
      title: title,
      content: content,
      url: sharedLink,
      height: height,
      width: width,
    },
  })
}