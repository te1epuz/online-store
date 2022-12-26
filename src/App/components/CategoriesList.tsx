import { SetURLSearchParams, TProduct, TQueryParams } from '../types/types';
import countProducts from '../utils/countProducts';
import styles from './CategoriesList.module.scss';
import listStyles from './main.module.scss';

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
      price: '',
      stock: '',
    };
    params.search = data.get('search') || '';
    params.price = '';
    params.sort = data.get('sort') || '';
    params.category = query.includes(item) ? query.filter((i) => i !== item) : [...query, item];
    params.brand = data.getAll('brand');
    params.stock = '';

    setData(params);
  };
  const currentCount = countProducts(products, 'category');

  return (
    <>
      <h3 className={listStyles.title}>Categories</h3>

      <ul className={listStyles.list}>
        {categories.map((category) => (
          <button
            type="button"
            className={`${listStyles.list__btn} ${query.includes(category) ? styles.bgRed : ''}`}
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
    </>
  );
}

export default CategoriesList;
