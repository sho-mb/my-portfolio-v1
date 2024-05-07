export const hero = {
  heroTitle: {
    section: 'Portfolio',
    content: 'Here is my portfolio \n Check out my work',
    subContent:
      'I have been working at tech \n company in Cambodia. \nFront to backend developing. \nLeaning web design by myself',
  },
  image: {
    src: '/assets/portfolio/185.png',
    alt: 'portfolio',
    height: 540,
    width: 540,
  },
};

// export const portfolios = [
//   {
//     image: {
//       src: '/assets/portfolio/185.png',
//       alt: 'Bold typography',
//       width: 300,
//       height: 80,
//     },
//     portfolio: {
//       title: 'test',
//       content:
//         'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus neque totam cumque',
//     },
//   },
//   {
//     image: {
//       src: '/assets/portfolio/185.png',
//       alt: 'Bold typography',
//       width: 300,
//       height: 80,
//     },
//     portfolio: {
//       title: 'test',
//       content:
//         'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus neque totam cumque',
//     },
//   },
//   {
//     image: {
//       src: '/assets/portfolio/185.png',
//       alt: 'Bold typography',
//       width: 300,
//       height: 80,
//     },
//     portfolio: {
//       title: 'test',
//       content:
//         'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus neque totam cumque',
//     },
//   },
//   {
//     image: {
//       src: '/assets/portfolio/185.png',
//       alt: 'Bold typography',
//       width: 300,
//       height: 80,
//     },
//     portfolio: {
//       title: 'test',
//       content:
//         'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus neque totam cumque',
//     },
//   },
//   {
//     image: {
//       src: '/assets/portfolio/185.png',
//       alt: 'Bold typography',
//       width: 300,
//       height: 80,
//     },
//     portfolio: {
//       title: 'test',
//       content:
//         'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus neque totam cumque',
//     },
//   },
//   {
//     image: {
//       src: '/assets/portfolio/185.png',
//       alt: 'Bold typography',
//       width: 300,
//       height: 80,
//     },
//     portfolio: {
//       title: 'test',
//       content:
//         'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus neque totam cumque',
//     },
//   },
// ];

export interface PortfoliosProps {
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