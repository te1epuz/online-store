import React, { useState } from 'react';
import { setLocaleStoragePromo } from '../../services/localStorage.service';
import PROMOCODES from './promocodes';
import styles from './DiscountsForm.module.scss';

type Tprops = {
  discounts: string[];
  setDiscounts: React.Dispatch<React.SetStateAction<string[]>>;
}

function DiscountForm({ discounts, setDiscounts }: Tprops) {
  const [text, setText] = useState('');
  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!discounts.includes(text) && PROMOCODES[text]) {
      const newArr = [...discounts, text];
      setDiscounts(newArr);
      setLocaleStoragePromo(newArr);
    }
    setText('');
  }

  return (
    <form className={styles.wrapper} onSubmit={onSubmitHandler}>
      <input
        className={styles.input}
        placeholder="input promo code"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      {!discounts.includes(text) && PROMOCODES[text] ? (
        <div className={styles.apply__row}>
          <span className={styles.apply__text}>Promo code {text} for -{PROMOCODES[text]}%</span>
          <button className={styles.button} type="submit">apply</button>
        </div>
      ) : ''}
    </form>
  );
}

export default DiscountForm;
