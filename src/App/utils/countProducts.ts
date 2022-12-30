import { TProduct } from '../types/types';

const countProducts = (products: TProduct[], keyOfProduct: keyof TProduct) => {
  const arr = products.reduce((a: { [key: string]: number }, b) => {
    const acc = a;
    acc[b[keyOfProduct] as keyof TProduct] = acc[b[keyOfProduct] as keyof TProduct]
      ? acc[b[keyOfProduct] as keyof TProduct] + 1
      : 1;
    return acc;
  }, {});
  return arr;
};

export default countProducts;
