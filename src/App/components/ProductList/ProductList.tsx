import { useAsyncValue } from 'react-router-dom';
import { TProduct } from '../../types/types';
import { ProductCard } from '../ProductCard/ProductCard';

function ProductList({ category }: { category: string | null }) {
  const products = useAsyncValue() as TProduct[];
  const filteredArr = products.filter((i) => {
    if (!category) return i;
    return i.category === category;
  });
  console.log(filteredArr);
  return (
    <>
      {filteredArr.map((item) => (
        <ProductCard key={item.id} data={item} />
      ))}
    </>
  );
}

export { ProductList };
