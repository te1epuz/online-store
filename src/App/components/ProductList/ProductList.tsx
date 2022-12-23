// import React, { useEffect } from 'react';
import { TProduct } from '../../types/types';
import { ProductCard } from '../ProductCard/ProductCard';

type TProps = {
  products: TProduct[];
};

function ProductList({ products }: TProps) {
  const filteredArr = products;

  if (!filteredArr.length) return <h1>No products found</h1>;
  return (
    <>
      {filteredArr.map((item) => (
        <ProductCard key={item.id} data={item} />
      ))}
    </>
  );
}

export { ProductList };
