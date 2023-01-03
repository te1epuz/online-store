import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearLocaleStorageCart } from '../services/localStorage.service';
import { TCart } from '../types/types';
import styles from './PurchasePopUp.module.scss';

type TProps = {
  setIsPurchasePopUpEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setCart: React.Dispatch<React.SetStateAction<TCart[]>>;
};

function PurchasePopUp({ setIsPurchasePopUpEnabled, setCart }: TProps) {
  const [isPayed, setIsPayed] = useState(false);
  const [countDown, setCountDown] = useState(4);
  const navigate = useNavigate();

  function handleConfirm() {
    setIsPayed(true);
    const count = setInterval(() => setCountDown((prev) => prev - 1), 1000);
    setTimeout(() => {
      clearInterval(count);
      setIsPurchasePopUpEnabled(false);
      setCart([]);
      clearLocaleStorageCart();
      navigate('..');
    }, 4000);
  }
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.background}
        type="button"
        onClick={() => setIsPurchasePopUpEnabled(false)}
      >close popup
      </button>
      <div className={styles.mainwindow}>
        <div>purchase popup window</div>
        <div>purchase popup window</div>
        <div>purchase popup window</div>
        <div>purchase popup window</div>
        <div>purchase popup window</div>
        <div>purchase popup window</div>
        <div>purchase popup window</div>
        <button type="button" onClick={handleConfirm} disabled={isPayed}>
          {isPayed ? 'Done' : 'Confirm'}
        </button>
        {isPayed ? <div>redirecting in {countDown}...</div> : <div>*press to confirm</div>}
      </div>
    </div>
  );
}

export default PurchasePopUp;
