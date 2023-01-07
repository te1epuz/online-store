import React from 'react';
import { SetURLSearchParams, TQueryParams } from '../../types/types';
import styles from './SearchInput.module.scss';

type TProps = {
  query: string;
  setData: SetURLSearchParams;
  data: URLSearchParams;
};

function SearchInput({ query, setData, data }: TProps) {
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params: TQueryParams = {
      category: [],
      brand: [],
      search: '',
      sort: '',
      price: '',
      stock: '',
      size: '',
    };
    params.price = data.get('price') || '';
    params.sort = data.get('sort') || '';
    params.search = e.target.value || '';
    params.category = data.getAll('category');
    params.brand = data.getAll('brand');
    params.stock = data.get('stock') || '';
    params.size = data.get('size') || 'big';
    setData(params);
  };
  return (
    <input
      className={styles.searchbox}
      value={query}
      onChange={(e) => searchHandler(e)}
      placeholder="Search..."
      type="search"
      name="search"
    />
  );
}

export default SearchInput;
