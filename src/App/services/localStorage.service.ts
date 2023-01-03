import { TCart, TProduct } from '../types/types';

const addToCart = (data: TProduct) => {
  if (!localStorage.getItem('myCart')) {
    const cart: TCart[] = [];
    const item = { ...data, count: 1 };
    cart.push(item);
    localStorage.setItem('myCart', JSON.stringify(cart));
  } else {
    const cart: TCart[] = JSON.parse(localStorage.getItem('myCart') || '');
    if (!cart.some((item) => item.id === data.id)) {
      const item = { ...data, count: 1 };

      cart.push(item);
      localStorage.setItem('myCart', JSON.stringify(cart));
    }
  }
};

const removeItem = (id: number | string) => {
  const cart: TProduct[] = JSON.parse(localStorage.getItem('myCart') || '');
  const filtered = cart.filter((item) => item.id !== id);
  localStorage.setItem('myCart', JSON.stringify(filtered));
};

const forceItemsToCart = (arr: TCart[]) => {
  localStorage.setItem('myCart', JSON.stringify(arr));
};

const getCart = (): TCart[] =>
  localStorage.getItem('myCart') ? JSON.parse(localStorage.getItem('myCart') || '') : [];

function clearLocaleStorageCart() {
  localStorage.setItem('myCart', '[]');
}

export { addToCart, getCart, removeItem, forceItemsToCart, clearLocaleStorageCart };
