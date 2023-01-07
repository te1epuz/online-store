import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

import { getCart } from '../../services/localStorage.service';

import styles from './MainLayout.module.scss';

function MainLayout() {
  const [cart, setCart] = useState(getCart());
  const [isFastBuy, setIsFastBuy] = useState(false);
  return (
    <>
      <Header cart={cart} />
      <main>
        <div className={styles.container}>
          <Outlet context={[cart, setCart, isFastBuy, setIsFastBuy]} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
