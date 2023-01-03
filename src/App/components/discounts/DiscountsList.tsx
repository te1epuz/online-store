import React from 'react';
import Discount from './Discount';

type Tprops = {
  discounts: string[];
  setDiscounts: React.Dispatch<React.SetStateAction<string[]>>;
}

function DiscountList({ discounts, setDiscounts }: Tprops) {
  return (
    <div>
      <div>
        Applied discounts:
      </div>
      {discounts.map((discount) =>
        <Discount key={discount} discount={discount} discounts={discounts} setDiscounts={setDiscounts} />)}
    </div>
  );
}

export default DiscountList;
