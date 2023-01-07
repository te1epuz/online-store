import React from 'react';

import { addToCart, removeItem } from '../services/localStorage.service';
import { TCart, TProduct } from '../types/types';

import styles from './AddToCartBtn.module.scss';

type TProps = {
  data: TProduct;
  cart: TCart[];
  setCart: React.Dispatch<React.SetStateAction<TCart[]>>;
};

function AddToCartBtn({ data, cart, setCart }: TProps) {
  const toggleBtnText = (id: number) => (cart.some((item) => item.id === id) ? 'Remove item' : 'Add to cart');
  const toggleBtnStyle = (id: number) =>
    (cart.some((item) => item.id === id) ? styles.card__button_active : '');
  // console.log('render');
  const handleCLick = () => {
    if (!cart.some((item) => item.id === data.id)) {
      setCart((prev) => [...prev, { ...data, count: 1 }]);
      addToCart(data);
    } else {
      setCart((prev) => prev.filter((item) => item.id !== data.id));
      removeItem(data.id);
    }
  };

  return (
    <button className={`${styles.card__button} ${toggleBtnStyle(+data.id)}`} type="button" onClick={handleCLick}>
      {toggleBtnText(+data.id)}
    </button>
  );
}

export default AddToCartBtn;
