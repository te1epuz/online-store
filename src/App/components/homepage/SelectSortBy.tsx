import React from 'react';
import { SetURLSearchParams, TQueryParams } from '../../types/types';

const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating: Low to High', value: 'rating-asc' },
  { label: 'Rating: High to Low', value: 'rating-desc' },
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
      size: '',
    };
    params.search = data.get('search') || '';
    params.category = data.getAll('category');
    params.brand = data.getAll('brand');
    params.sort = e.target.value || '';
    params.stock = data.get('stock') || '';
    params.price = data.get('price') || '';
    params.size = data.get('size') || 'big';
    setData(params);
  };
  return (
    <div>
      <label htmlFor="sort">
        Sort by:&nbsp;
        <select name="sort" id="sort" onChange={(e) => handleChange(e)} value={query}>
          {/* <option defaultValue="id-asc">Default</option> */}
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
