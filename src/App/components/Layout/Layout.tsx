import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
// import styles from './styles.module.scss';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      <footer>(c)2022</footer>
    </>
  );
}

export { Layout };
