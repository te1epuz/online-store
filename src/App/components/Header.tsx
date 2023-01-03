import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TCart } from '../types/types';
import styles from './Header.module.scss';

type TProps = {
  cart: TCart[];
};

function Header({ cart }: TProps) {
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  useEffect(() => {
    const totalPrice = cart.reduce((a, b) => a + b.price * b.count, 0);
    setCartTotalPrice(totalPrice);
    const totalAmount = cart.reduce((a, b) => a + b.count, 0);
    setCartTotalAmount(totalAmount);
  }, [cart]);

  return (
    <header className={styles.header}>
      <div className={styles.header__blackbar_wrapper}>
        <ul className={styles.header__blackbar}>
          <li>
            <span className={styles.blackbar__text_greyed}>City: </span>
            <span>Tokyo?</span>
          </li>
          <li>
            <span className={styles.blackbar__text_greyed}>Phones: </span>
            <span>+123 456-78-90 | +123 456-78-99</span>
          </li>
          <li>
            <span className={styles.blackbar__text_greyed}>Pick-up point: </span>
            <span>from 10:00 to 21:00</span>
          </li>
          <li>
            <NavLink
              className={`${styles.header__link} ${styles.link_disabled}`}
              to="/check_order"
              onClick={(event) => event.preventDefault()}
            >
              Check order?
            </NavLink>
          </li>
        </ul>
      </div>
      <nav className={styles.header__navigation}>
        <ul className={styles.navigation__links}>
          <li>
            <NavLink className={styles.logo__link} to="/" />
          </li>
          <li>
            <NavLink className={styles.navigation__link} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${styles.navigation__link} ${styles.link_disabled}`}
              to="/delivery"
              onClick={(event) => event.preventDefault()}
            >
              Delivery and payment
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${styles.navigation__link} ${styles.link_disabled}`}
              to="/warranty"
              onClick={(event) => event.preventDefault()}
            >
              Warranty and returns
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${styles.navigation__link} ${styles.link_disabled}`}
              to="/contacts"
              onClick={(event) => event.preventDefault()}
            >
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.cart__link} to="/cart">
              {(cartTotalAmount === 0 ? <span>Cart is empty &nbsp; </span> :
              <span>Items: {cartTotalAmount}<br />Total price: ${cartTotalPrice}</span>)}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
