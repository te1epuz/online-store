import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { SetURLSearchParams, TProduct, TQueryParams } from '../../types/types';
import styles from './styles.module.scss';

type TProps = {
  query: string[];
  setData: SetURLSearchParams;
  data: URLSearchParams;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
function BrandsList({ query, setData, data, setLoading }: TProps) {
  const products = useAsyncValue() as TProduct[];
  const brands = Array.from(new Set(products.map((i) => i.brand[0].toUpperCase() + i.brand.toLowerCase().slice(1))));

  const handleClick = (item: string) => {
    setLoading(true);
    const params: TQueryParams = {
      category: [],
      brand: [],
    };
    params.category = data.getAll('category');
    params.brand = query.includes(item) ? query.filter((i) => i !== item) : [...query, item];

    setData(params);
  };
  console.log('brand');

  return (
    <>
      <h1>BrANDS</h1>

      {brands.map((brand) => (
        <button
          key={brand}
          className={query.includes(brand) ? styles.bgGreen : ''}
          type="button"
          onClick={() => handleClick(brand)}
        >
          {brand}
        </button>
      ))}
    </>
  );
}

export { BrandsList };
