import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

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
      <Footer />
    </>
  );
}

export default MainLayout;
