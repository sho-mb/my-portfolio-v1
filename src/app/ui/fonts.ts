import { Andada_Pro, Bowlby_One, Roboto } from "next/font/google";

export const andada = Andada_Pro({
  weight: ['400', '500'],
  subsets: ['latin']
})

export const roboto = Roboto({ 
  weight: ['100', '300', '400', '500'],
  subsets: ["latin"] 
});

export const bowlbyOne = Bowlby_One({
  weight: ['400'],
  subsets: ['latin']
});