import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
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
  const [,,, setIsFastBuy] = useOutletContext<[
    null,
    null,
    null,
    React.Dispatch<React.SetStateAction<boolean>>
  ]>();

  function handleConfirm() {
    setIsPayed(true);
    const count = setInterval(() => setCountDown((prev) => prev - 1), 1000);
    setTimeout(() => {
      clearInterval(count);
      setIsPurchasePopUpEnabled(false);
      setCart([]);
      clearLocaleStorageCart();
      setIsFastBuy(false);
      navigate('..');
    }, 4000);
  }
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.background}
        type="button"
        onClick={() => {
          setIsFastBuy(false);
          setIsPurchasePopUpEnabled(false);
        }}
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
        <button type="button" className={styles.button__confirm} onClick={handleConfirm} disabled={isPayed}>
          {isPayed ? 'Done ✔️' : 'Confirm'}
        </button>
        {isPayed ? <div>redirecting in {countDown}...</div> : <div>*press to finish</div>}
      </div>
    </div>
  );
}

export default PurchasePopUp;
