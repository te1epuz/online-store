/// types

type TResponse = {
  products: TProduct[];
};

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

export type { TProduct, TResponse };
