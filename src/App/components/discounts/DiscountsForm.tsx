import React, { useState } from 'react';
import { setLocaleStoragePromo } from '../../services/localStorage.service';
import PROMOCODES from './promocodes';

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
    <form onSubmit={onSubmitHandler}>
      <input
        placeholder="input promo code"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      {!discounts.includes(text) && PROMOCODES[text] ? (
        <div>
          <span>Promo code {text} for -{PROMOCODES[text]}%</span>
          <button type="submit">apply</button>
        </div>
      ) : ''}
    </form>
  );
}

export default DiscountForm;
