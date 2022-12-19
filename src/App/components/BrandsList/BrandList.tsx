import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { TProduct } from '../../types/types';
import styles from './styles.module.scss';

type TProps = {
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
};
function BrandsList({ data, setData }: TProps) {
  const products = useAsyncValue() as TProduct[];
  const brands = Array.from(new Set(products.map((i) => i.brand[0].toUpperCase() + i.brand.toLowerCase().slice(1))));

  const handleClick = (item: string) => {
    setData((prev) => {
      if (!prev.includes(item)) {
        return [...prev, item];
      }
      return prev.filter((i) => i !== item);
    });
  };
  const clearFilter = () => {
    setData([]);
  };

  return (
    <>
      <h1>BrANDS</h1>
      <button type="button" onClick={clearFilter}>
        Сброс Фильтра
      </button>
      {brands.map((brand) => (
        <button
          key={brand}
          className={data.includes(brand) ? styles.bgGreen : ''}
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
