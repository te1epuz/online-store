import { TProduct, TResponse } from '../types/types';

async function getAllProducts(): Promise<TProduct[]> {
  const data: TResponse = await fetch('https://dummyjson.com/products?limit=100')
    .then((res) => res.json())
    .then((list) => list);
  return data.products;
}

async function getProductById(id: number | string): Promise<TProduct> {
  const data: TProduct = await fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((list) => list);
  // TODO check for missing page and reroute to 404
  return data;
}

export { getAllProducts, getProductById };
