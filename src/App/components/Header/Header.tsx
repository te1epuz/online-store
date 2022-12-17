import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

function Header() {
  const activeStyles = (bool: boolean) =>
    bool ? styles.header__navigation__link__active : styles.header__navigation__link;
  return (
    <header className={styles.header}>
      <nav className={styles.header__navigation}>
        <NavLink className={({ isActive }) => activeStyles(isActive)} to="/">
          Online Store
        </NavLink>
        <NavLink className={({ isActive }) => activeStyles(isActive)} to="/cart">
          Cart
        </NavLink>
      </nav>
    </header>
  );
}

export { Header };
