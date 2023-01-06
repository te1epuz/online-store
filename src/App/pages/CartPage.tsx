import React, { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';

import { forceItemsToCart, removeItem } from '../services/localStorage.service';
import { TCart } from '../types/types';
import Counter from '../components/cartpage/Counter';
import { paginate } from '../utils/paginate';
import Pagination from '../components/cartpage/Pagination';
import styles from './CartPage.module.scss';
import CartSummary from '../components/cartpage/CartSummary';
import PurchasePopUp from '../components/cartpage/PurchasePopUp';

function CartPage() {
  const [cart, setCart, isFastBuy] =
    useOutletContext<[TCart[], React.Dispatch<React.SetStateAction<TCart[]>>, boolean]>();

  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.getAll('limit').includes('0') ? ['4'] : searchParams.getAll('limit');
  const pageQuery = searchParams.getAll('page').includes('0') ? ['1'] : searchParams.getAll('page');

  const [itemsOnPage, setItemsOnPage] = useState(+limit[0] || 4);
  const [currentPage, setCurrentpage] = useState(+pageQuery[0] || 1);

  const countPrice = (array: TCart[]) => array.reduce((a, b) => a + b.price * b.count, 0);
  const [totalPrice, setTotalprice] = useState(countPrice(cart));
  const countItems = (array: TCart[]) => array.reduce((a, b) => a + b.count, 0);
  const [totalItems, setTotalItems] = useState(countItems(cart));

  const [isPurchasePopUpEnabled, setIsPurchasePopUpEnabled] = useState(false);

  useEffect(() => {
    if (isFastBuy) setIsPurchasePopUpEnabled(true);
  }, []);

  const handleIncrement = (id: number) => {
    const productIndex = cart.findIndex((item) => item.id === id);
    const newArr = [...cart];
    newArr[productIndex].count += 1;
    setCart(newArr);
    setTotalprice(countPrice(newArr));
    setTotalItems(countItems(newArr));
    forceItemsToCart(newArr);
  };

  const handlePageChange = (page: number) => {
    setCurrentpage(page);
    setSearchParams({ limit, page: page.toString() });
  };

  const handleDecrement = (id: number) => {
    const productIndex = cart.findIndex((item) => item.id === id);
    const newArr = [...cart];
    newArr[productIndex].count -= 1;
    if (newArr[productIndex].count <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
      setTotalprice(countPrice(newArr));
      setTotalItems(countItems(newArr));
      removeItem(id);
    } else {
      setCart(newArr);
      setTotalprice(countPrice(newArr));
      setTotalItems(countItems(newArr));
      forceItemsToCart(newArr);
    }
  };
  const itemsCrop = paginate(cart, currentPage, itemsOnPage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsOnPage(
      !+e.currentTarget.value ? 1 : +e.currentTarget.value > cart.length ? cart.length : +e.currentTarget.value,
    );
    setSearchParams({ limit: e.currentTarget.value, page: pageQuery });
    if (+e.currentTarget.value === itemsCrop.length) setCurrentpage(1);
  };

  const handleTotalItemPrice = (price: TCart['price'], count: TCart['count']) => price * count;
  const itemsCount = cart.length;
  useEffect(() => {
    if (itemsCrop.length === 0) setCurrentpage((prev) => prev - 1);
    if (itemsCrop.length === 0) setCurrentpage(Math.ceil(cart.length / itemsOnPage));
    setSearchParams({ limit, page: currentPage.toString() });
  }, [cart, itemsOnPage, currentPage]);

  if (!cart.length) {
    return <h2>OOPS, your cart is empty :(</h2>;
  }
  return (
    <>
      <h1>Cart</h1>
      <p>Items on PAGE :</p>
      <input
        className={styles.cart_input}
        type="number"
        max={itemsCount}
        value={itemsOnPage}
        onChange={(e) => handleChange(e)}
      />
      <Pagination
        pageSize={itemsOnPage}
        itemsCount={itemsCount}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      <div className={styles.wrapper}>
        <div className="cart_items">
          {itemsCrop.map((item, index) => (
            <Counter
              key={item.id}
              listId={index + 1 + (currentPage - 1) * itemsOnPage}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              totalItemPrice={handleTotalItemPrice(item.price, item.count)}
              {...item}
            />
          ))}
        </div>
        <CartSummary
          setIsPurchasePopUpEnabled={setIsPurchasePopUpEnabled}
          totalItems={totalItems}
          totalPrice={totalPrice}
        />
      </div>
      {isPurchasePopUpEnabled === true ? (
        <PurchasePopUp setIsPurchasePopUpEnabled={setIsPurchasePopUpEnabled} setCart={setCart} />
      ) : (
        ''
      )}
    </>
  );
}

export default CartPage;
