import React from 'react';
import styles from './CartSummary.module.scss';

type TProps = {
  setIsPurchasePopUpEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  totalItems: number;
  totalPrice: number;
};

function CartSummary({ setIsPurchasePopUpEnabled, totalItems, totalPrice }: TProps) {
  return (
    <div className={styles.wrapper}>
      <h2>Summary</h2>
      <div>Items: {totalItems}</div>
      <div>Total: ${totalPrice.toFixed(2)}</div>
      <div>Discount codes:</div>
      <div>...input...</div>
      <button
        type="button"
        className={styles.button__buy}
        onClick={() => setIsPurchasePopUpEnabled(true)}
      >To Checkout...
      </button>
    </div>
  );
}

export default CartSummary;
