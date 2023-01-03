import React from 'react';

type TProps = {
  setIsPurchasePopUpEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  totalItems: number;
  totalPrice: number;
};

function CartSummary({ setIsPurchasePopUpEnabled, totalItems, totalPrice }: TProps) {
  return (
    <div>
      <h2>Summary</h2>
      <div>Items: {totalItems}</div>
      <div>Total: ${totalPrice.toFixed(2)}</div>
      <div>Discount codes:</div>
      <div>...input...</div>
      <button type="button" onClick={() => setIsPurchasePopUpEnabled(true)}>buy now</button>
    </div>
  );
}

export default CartSummary;
