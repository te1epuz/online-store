// import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { TProduct } from '../../types/types';
import { ProductCard } from '../ProductCard/ProductCard';

type TProps = {
  categories: string[];
  brands: string[];
};

function ProductList({ categories, brands }: TProps) {
  const products = useAsyncValue() as TProduct[];
  const filteredArr = products.filter((i) => {
    if (categories?.length && brands.length) {
      return (
        categories.some((j) => j.toLowerCase() === i.category.toLowerCase()) &&
        brands.some((j) => j.toLowerCase() === i.brand.toLowerCase())
      );
    }

    if (categories?.length) return categories.some((j) => j.toLowerCase() === i.category.toLowerCase());
    if (brands.length) return brands.some((j) => j.toLowerCase() === i.brand.toLowerCase());

    return i;
  });

  console.log(filteredArr);
  console.log(categories);
  console.log(brands);
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
