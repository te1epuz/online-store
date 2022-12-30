import { useState } from 'react';
import { TProduct } from '../types/types';
import ProductCard from './ProductCard';
import { getCart } from '../services/localStorage.service';

type TProps = {
  products: TProduct[];
  size: string;
};

function ProductList({ products, size }: TProps) {
  const [cart, setCart] = useState(getCart());

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
