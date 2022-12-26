import React from 'react';
import { SetURLSearchParams, TQueryParams } from '../types/types';

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
    };
    params.price = '';
    params.sort = data.get('sort') || '';
    params.search = e.target.value || '';
    params.category = data.getAll('category');
    params.brand = data.getAll('brand');
    params.stock = data.get('stock') || '';

    setData(params);
  };
  return (
    <input
      value={query}
      onChange={(e) => searchHandler(e)}
      placeholder="Search..."
      style={{ width: '200px', padding: '8px 15px', fontSize: '16px' }}
      type="search"
      name="search"
    />
  );
}

export default SearchInput;
