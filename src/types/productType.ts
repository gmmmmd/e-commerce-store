export type IProduct = {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  price: number;
  rating?: IRating;
};

export type IRating = {
  rate: number;
  count: number;
};
