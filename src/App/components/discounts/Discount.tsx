import React from 'react';
import { setLocaleStoragePromo } from '../../services/localStorage.service';
import PROMOCODES from './promocodes';
import styles from './Discount.module.scss';

type Tprops = {
  discount: string;
  discounts: string[];
  setDiscounts: React.Dispatch<React.SetStateAction<string[]>>;
}

function Discount({ discount, discounts, setDiscounts }: Tprops) {
  function handleDelete() {
    const newArr = discounts.filter((disc) => disc !== discount);
    setDiscounts(newArr);
    setLocaleStoragePromo(newArr);
  }
  return (
    <div className={styles.wrapper}>
      <span>{discount} -{PROMOCODES[discount]}%</span>
      <button className={styles.button} type="button" onClick={handleDelete}>delete</button>
    </div>
  );
}

export default Discount;
