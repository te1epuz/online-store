import React from 'react';
import styles from './Size.module.scss';
import { SetURLSearchParams, TQueryParams } from '../types/types';

type TProps = {
  query: string;
  setData: SetURLSearchParams;
  data: URLSearchParams;
};

function Size({ query, setData, data }: TProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const params: TQueryParams = {
      category: [],
      brand: [],
      search: '',
      sort: '',
      price: '',
      stock: '',
      size: '',
    };
    params.search = data.get('search') || '';
    params.price = '';
    params.sort = data.get('sort') || '';
    params.category = data.getAll('category');
    params.brand = data.getAll('brand');
    params.stock = '';
    params.size = e.currentTarget.textContent || '';
    setData(params);
  };

  return (
    <div className={styles.container__size}>
      <button className={query === 'small' ? styles.size_active : ''} onClick={(e) => handleClick(e)} type="button">
        small
      </button>
      <button className={query === 'big' ? styles.size_active : ''} onClick={(e) => handleClick(e)} type="button">
        big
      </button>
    </div>
  );
}

export default Size;
