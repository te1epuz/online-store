/// types

type TProduct = {
  id: number | string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};
type TResponse = {
  products: TProduct[];
};

export type { TProduct, TResponse };
