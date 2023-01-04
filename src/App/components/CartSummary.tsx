import React, { useEffect, useState } from 'react';
import { getLocaleStoragePromo } from '../services/localStorage.service';
import styles from './CartSummary.module.scss';
import DiscountsBlock from './discounts/DiscountsBlock';
import PROMOCODES from './discounts/promocodes';

type TProps = {
  setIsPurchasePopUpEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  totalItems: number;
  totalPrice: number;
};

function CartSummary({ setIsPurchasePopUpEnabled, totalItems, totalPrice }: TProps) {
  const [discounts, setDiscounts] = useState<string[]>(getLocaleStoragePromo());
  const [totalDiscout, setTotalDiscount] = useState(0);

  useEffect(() => {
    if (discounts.length > 0) {
      let totalPercent = 0;
      discounts.forEach((disc) => {
        totalPercent += PROMOCODES[disc];
      });
      setTotalDiscount(totalPercent);
    }
  }, [discounts]);

  return (
    <div className={styles.wrapper}>
      <h2>Summary</h2>
      <div>Items: {totalItems}</div>
      <div className={`${discounts.length > 0 ? styles.crossed_out : ''}`}>
        Total: ${totalPrice.toFixed(2)}
      </div>
      <div className={`${discounts.length === 0 ? styles.hidden : ''}`}>
        Total: ${(totalPrice * (1 - totalDiscout / 100)).toFixed(2)}
      </div>
      <DiscountsBlock discounts={discounts} setDiscounts={setDiscounts} />
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
