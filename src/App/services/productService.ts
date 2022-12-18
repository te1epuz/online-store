// в этом файле в будущем добавятся методы для localStorage (добавить в корзину, удалить из корзины)
import { TProduct } from '../types/types';

async function getProductById(id: string | undefined): Promise<TProduct> {
  const data: TProduct = await fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((list) => list);
  // TODO check for missing page and reroute to 404
  return data;
}

export { getProductById };
