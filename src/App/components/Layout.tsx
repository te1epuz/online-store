import { NavLink, Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

function Layout() {
  const activeStyles = (bool: boolean) =>
    bool ? styles.header__navigation__link__active : styles.header__navigation__link;

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.header__navigation}>
          <NavLink className={({ isActive }) => activeStyles(isActive)} to="/">
            Home
          </NavLink>
          <NavLink className={({ isActive }) => activeStyles(isActive)} to="/posts">
            Blog
          </NavLink>
          <NavLink className={({ isActive }) => activeStyles(isActive)} to="/about">
            About
          </NavLink>
        </nav>
      </header>
      <main className="contaier">
        <Outlet />
      </main>
      <footer className="contaier">(c)2022</footer>
    </>
  );
}

export { Layout };
