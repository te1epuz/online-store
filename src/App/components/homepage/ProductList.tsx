import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { TCart, TProduct } from '../../types/types';
import ProductCard from './ProductCard';

type TProps = {
  products: TProduct[];
  size: string;
};

function ProductList({ products, size }: TProps) {
  const [cart, setCart] = useOutletContext<[TCart[], React.Dispatch<React.SetStateAction<TCart[]>>]>();
  const filteredArr = products;

  if (!filteredArr.length) return <h1>No products found</h1>;
  return (
    <>
      {filteredArr.map((item) => (
        <ProductCard key={item.id} data={item} size={size} cart={cart} setCart={setCart} />
      ))}
    </>
  );
}

export default ProductList;
