import React, { useState, useEffect } from 'react';

import { forceItemsToCart, getCart, removeItem } from '../services/localStorage.service';
import { TCart } from '../types/types';
import Counter from '../components/Counter';
import { paginate } from '../utils/paginate';
import Pagination from '../components/Pagination';

function CartPage() {
  const [cart, setCart] = useState(getCart() as TCart[]);
  const [itemsOnPage, setItemsOnPage] = useState(4);
  const [currentPage, setCurrentpage] = useState(1);
  const countPrice = (array: TCart[]) => array.reduce((a, b) => a + b.price * b.count, 0);
  const [totalPrice, setTotalprice] = useState(countPrice(cart));
  console.log(cart);
  const handleIncrement = (id: number) => {
    const productIndex = cart.findIndex((item) => item.id === id);
    const newArr = [...cart];
    newArr[productIndex].count += 1;
    setCart(newArr);
    setTotalprice(countPrice(newArr));
    forceItemsToCart(newArr);
  };
  useEffect(() => {
    setCurrentpage(1);
  }, [cart]);

  const handlePageChange = (page: number) => {
    setCurrentpage(page);
  };

  const handleDecrement = (id: number) => {
    const productIndex = cart.findIndex((item) => item.id === id);
    const newArr = [...cart];
    newArr[productIndex].count -= 1;
    if (newArr[productIndex].count <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
      setTotalprice(countPrice(newArr));
      removeItem(id);
    } else {
      setCart(newArr);
      setTotalprice(countPrice(newArr));
      forceItemsToCart(newArr);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsOnPage(!+e.currentTarget.value ? 1 : +e.currentTarget.value);
  };

  const handleTotalItemPrice = (price: TCart['price'], count: TCart['count']) => price * count;
  const itemsCrop = paginate(cart, currentPage, itemsOnPage);
  const itemsCount = cart.length;
  return (
    <>
      <h1>Cart</h1>
      <h2>TOTAL PRICE OF MY CART: ${totalPrice.toFixed(2)} ЪУЪ</h2>
      <p>Items on PAGE :</p> <input type="number" value={itemsOnPage} onChange={(e) => handleChange(e)} />
      <Pagination
        pageSize={itemsOnPage}
        itemsCount={itemsCount}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      {!cart.length ? <h2>OOPS, your cart is empty :(</h2> : null}
      <div className="cart_items">
        {itemsCrop.map((item) => (
          <Counter
            key={item.id}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            totalItemPrice={handleTotalItemPrice(item.price, item.count)}
            {...item}
          />
        ))}
      </div>
    </>
  );
}

export default CartPage;
