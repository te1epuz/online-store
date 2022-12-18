import { TProduct } from '../../types/types';

function AddToCartBtn({ data }: { data: TProduct }) {
  const handleCLick = () => {
    console.log('Добавилос', data);
  };
  return (
    <button type="button" onClick={handleCLick}>
      Add to cart
    </button>
  );
}

export { AddToCartBtn };
