import React from 'react';

import { SetURLSearchParams, TQueryParams } from '../../types/types';

const sortOptions = [
  { label: 'цене по возрастанию', value: 'price-asc' },
  { label: 'цене по убыванию', value: 'price-desc' },
  { label: 'рейтингу по возрастанию', value: 'rating-asc' },
  { label: 'рейтингу по убыванию', value: 'rating-desc' },
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
    };
    params.search = data.get('search') || '';
    params.category = data.getAll('category');
    params.brand = data.getAll('brand');
    params.sort = e.target.value || '';

    console.log('query', query);
    setData(params);
  };
  return (
    <div>
      <label htmlFor="sort">
        Отсортировать по:
        <select name="sort" id="sort" onChange={(e) => handleChange(e)} value={query}>
          <option disabled value="">
            Выбрать...
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

export { SelectSortBy };
