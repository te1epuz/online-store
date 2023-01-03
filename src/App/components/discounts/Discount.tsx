import React from 'react';
import { setLocaleStoragePromo } from '../../services/localStorage.service';
import PROMOCODES from './promocodes';

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
    <div>
      <span>{discount} -{PROMOCODES[discount]}%</span>
      <button type="button" onClick={handleDelete}>delete</button>
    </div>
  );
}

export default Discount;
