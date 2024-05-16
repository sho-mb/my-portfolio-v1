'use server'
import { PortfoliosProps } from "@/types/portfolio/portfolio";
import { prisma } from "@/lib/prisma";

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

export const createNewPortfolio = async (sharedLink: string, title: string, content: string, height: number, width: number, path: string ) => {
  await prisma.portfolio.create({
    data: {
      alt: `portfolio ${title}'s image`,
      title: title,
      content: content,
      url: sharedLink,
      height: height,
      width: width,
      path: path,
    },
  }).catch(err => {
    return err
  })
}

export const deleteMany = async(ids: number[]) => {
  try {
    await prisma.portfolio.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  } catch(err) {
    throw new Error('At least choose one id');
  }
}

export const getPaths = async (ids: number[]) : Promise<string[]> => {
  const paths : string[] = []
  try {
    const data = await prisma.portfolio.findMany( {
      where: {
        id: {
          in: ids
        }
      }
    })

    data.map(portfolio => {
      return paths.push(portfolio.path)
    })
    return paths;
  } catch(err: any) {
    throw new Error (err.message)
  }
}