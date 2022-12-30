import React from 'react';

import { addToCart, removeItem } from '../services/localStorage.service';
import { TProduct } from '../types/types';

type TProps = {
  data: TProduct;
  cart: TProduct[];
  setCart: React.Dispatch<React.SetStateAction<TProduct[]>>;
};

function AddToCartBtn({ data, cart, setCart }: TProps) {
  const toggleBtnText = (id: number) => (cart.some((item) => item.id === id) ? 'Remove item' : 'Add to cart');
  // console.log('render');
  const handleCLick = () => {
    if (!cart.some((item) => item.id === data.id)) {
      setCart((prev) => [...prev, data]);
      addToCart(data);
    } else {
      setCart((prev) => prev.filter((item) => item.id !== data.id));
      removeItem(data.id);
    }
  };

  return (
    <button type="button" onClick={handleCLick}>
      {toggleBtnText(+data.id)}
    </button>
  );
}

export default AddToCartBtn;
