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
            content: item.content,
            link: item.link || ''
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

export const createNewPortfolio = async (sharedLink: string, title: string, content: string, height: number, width: number, path: string, url: string) => {
  console.log(content);
  await prisma.portfolio.create({
    data: {
      alt: `portfolio ${title}'s image`,
      title: title,
      content: content,
      url: sharedLink,
      height: height,
      width: width,
      path: path,
      link: url,
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

export const getDetail = async (id: number) : Promise<PortfoliosProps> => {
  try {
    const data = await prisma.portfolio.findUnique({
      select : {
        title:true,
        content: true,
        url:true,
        height: true,
        width: true,
        id: true,
        alt: true,
        link: true,
      }, 
      where : {
        id: id
      }
    })
    if (!data) {
      throw new Error ('This id not exist')
    }

    const detail : PortfoliosProps = {
      image: {
        src: data.url,
        alt: data.alt,
        width: data.width,
        height: data.height
      },
      portfolio: {
        id: data.id,
        title: data.title,
        content: data.content,
        link: data.link || '',
      }
    } 
    return detail;
  } catch(err: any) {
    throw new Error (err.message)
  }
}