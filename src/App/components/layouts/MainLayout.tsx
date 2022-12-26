import { Outlet } from 'react-router-dom';
import Header from '../Header';
import styles from './MainLayout.module.scss';

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <footer>(c)2022</footer>
    </>
  );
}

export default MainLayout;
