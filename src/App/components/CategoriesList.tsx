import { SetURLSearchParams, TProduct, TQueryParams } from '../types/types';
import countProducts from '../utils/countProducts';
import styles from './CategoriesList.module.scss';

type TProps = {
  products: TProduct[];
  categories: string[];
  query: string[];
  setData: SetURLSearchParams;
  data: URLSearchParams;
  wholeCount: { [key: string]: number };
};

function CategoriesList({ products, categories, query, setData, data, wholeCount }: TProps) {
  const handleSelect = (item: string) => {
    const params: TQueryParams = {
      category: [],
      brand: [],
      search: '',
      sort: '',
    };
    params.search = data.get('search') || '';
    params.sort = data.get('sort') || '';
    params.category = query.includes(item) ? query.filter((i) => i !== item) : [...query, item];
    params.brand = data.getAll('brand');

    setData(params);
  };
  // console.log('category');
  // console.log(products);
  // console.log('query', query);

  const currentCount = countProducts(products, 'category');

  console.log('currentCount categories', currentCount);

  return (
    <ul>
      {categories.map((category) => (
        <button
          type="button"
          className={query.includes(category) ? styles.bgRed : ''}
          onClick={() => handleSelect(category)}
          key={category}
        >
          {category}{' '}
          <span>
            ({currentCount[category] ? currentCount[category] : 0}/{wholeCount[category]})
          </span>
        </button>
      ))}
    </ul>
  );
}

export default CategoriesList;
