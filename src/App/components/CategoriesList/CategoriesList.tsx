import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import styles from './styles.module.scss';
import { SetURLSearchParams, TQueryParams } from '../../types/types';

type TProps = {
  query: string[];
  setData: SetURLSearchParams;
  data: URLSearchParams;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function CategoriesList({ query, setData, data, setLoading }: TProps) {
  const categories = useAsyncValue() as string[];

  const handleSelect = async (item: string) => {
    setLoading(true);
    const params: TQueryParams = {
      category: [],
      brand: [],
    };

    params.category = query.includes(item) ? query.filter((i) => i !== item) : [...query, item];
    params.brand = data.getAll('brand');

    setData(params);
  };
  console.log('category');

  return (
    <ul>
      {categories.map((category) => (
        <button
          type="button"
          className={query.includes(category) ? styles.bgRed : ''}
          onClick={() => handleSelect(category)}
          key={category}
        >
          {category}
        </button>
      ))}
    </ul>
  );
}

export default CategoriesList;
