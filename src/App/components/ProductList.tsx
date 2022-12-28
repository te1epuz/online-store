// import React, { useEffect } from 'react';
import { TProduct } from '../types/types';
import ProductCard from './ProductCard';

type TProps = {
  products: TProduct[];
  size: string;
};

function ProductList({ products, size }: TProps) {
  const filteredArr = products;

  if (!filteredArr.length) return <h1>No products found</h1>;
  return (
    <>
      {filteredArr.map((item) => (
        <ProductCard key={item.id} data={item} size={size} />
      ))}
    </>
  );
}

export default ProductList;
