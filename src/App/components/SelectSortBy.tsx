import React from 'react';

import { SetURLSearchParams, TQueryParams } from '../types/types';

const sortOptions = [
  { label: 'price ASC', value: 'price-asc' },
  { label: 'price DESC', value: 'price-desc' },
  { label: 'rating ASC', value: 'rating-asc' },
  { label: 'rating DESC', value: 'rating-desc' },
];

type TProps = {
  query: string;
  setData: SetURLSearchParams;
  data: URLSearchParams;
};
function SelectSortBy({ query, setData, data }: TProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params: TQueryParams = {
      category: [],
      brand: [],
      search: '',
      sort: '',
      stock: '',
      price: '',
    };
    params.search = data.get('search') || '';
    params.category = data.getAll('category');
    params.brand = data.getAll('brand');
    params.sort = e.target.value || '';
    params.stock = data.get('stock') || '';
    params.price = data.get('price') || '';

    // console.log('query', query);
    setData(params);
  };
  return (
    <div>
      <label htmlFor="sort">
        Sort by:
        <select name="sort" id="sort" onChange={(e) => handleChange(e)} value={query}>
          <option disabled value="">
            Choose...
          </option>
          <option defaultValue="id-asc">Default</option>
          {sortOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default SelectSortBy;
