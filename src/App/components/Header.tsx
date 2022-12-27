import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
  const activeStyles = (bool: boolean) =>
    bool ? styles.header__navigation__link__active : styles.header__navigation__link;
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
            <span>+ХХХ ХХХ-ХХ-ХХ |+ХХХ ХХХ-ХХ-ХХ</span>
          </li>
          <li>
            <span className={styles.blackbar__text_greyed}>Pick-up point: </span>
            <span>from 10:00 to 21:00</span>
          </li>
          <li>
            <NavLink className={styles.header__link} to="/check_order">Check order?</NavLink>
          </li>
        </ul>
      </div>
      <nav className={styles.header__navigation}>
        <NavLink className={styles.logo__link} to="/" />
        <ul className={styles.navigation__links}>
          <li>
            <NavLink className={styles.navigation__link} to="/about">About</NavLink>
          </li>
          <li>
            <NavLink className={styles.navigation__link} to="/delivery">Delivery and payment</NavLink>
          </li>
          <li>
            <NavLink className={styles.navigation__link} to="/warranty">Warranty and returns</NavLink>
          </li>
          <li>
            <NavLink className={styles.navigation__link} to="/contacts">Contacts</NavLink>
          </li>
        </ul>
        <NavLink className={({ isActive }) => activeStyles(isActive)} to="/cart">
          Cart 🛒
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
