import React from 'react';
import DiscountForm from './DiscountsForm';
import DiscountList from './DiscountsList';
import styles from './DiscountsBlock.module.scss';

type Tprops = {
  discounts: string[];
  setDiscounts: React.Dispatch<React.SetStateAction<string[]>>;
}

function DiscountsBlock({ discounts, setDiscounts }: Tprops) {
  return (
    <div>
      <div className={`${discounts.length === 0 ? styles.hidden : ''}`}>
        <DiscountList discounts={discounts} setDiscounts={setDiscounts} />
      </div>
      <DiscountForm discounts={discounts} setDiscounts={setDiscounts} />
      <div>*promo codes only for you: RSS, TS, JS</div>
    </div>
  );
}

export default DiscountsBlock;
