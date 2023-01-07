import { SetURLSearchParams, TProduct, TQueryParams } from '../../types/types';
import countProducts from '../../utils/countProducts';
import listStyles from './listStyles.module.scss';

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
      size: '',
    };
    params.search = data.get('search') || '';
    params.price = data.get('price') || '';
    params.sort = data.get('sort') || '';
    params.category = query.includes(item) ? query.filter((i) => i !== item) : [...query, item];
    params.brand = data.getAll('brand');
    params.stock = data.get('stock') || '';
    params.size = data.get('size') || 'big';
    setData(params);
  };
  const currentCount = countProducts(products, 'category');

  return (
    <ul className={listStyles.list}>
      {categories
        .sort()
        .sort((a, b) => {
          if (currentCount[a] > 0 && currentCount[b] === undefined) return -1;
          return 0;
        })
        .map((category) => (
          <div className={listStyles.list__item} key={category}>
            <input
              className={listStyles.item__checkbox}
              type="checkbox"
              id={category}
              name={category}
              value={category}
              checked={query.includes(category)}
              onChange={() => handleSelect(category)}
            />
            <label
              className={`${listStyles.item__label} ${!currentCount[category] ? listStyles.text_greyed : ''}`}
              htmlFor={category}
            >
              {category}
              <span className={listStyles.item__labelspan}>
                ({currentCount[category] ? currentCount[category] : 0}/{wholeCount[category]})
              </span>
            </label>
          </div>
        ))}
    </ul>
  );
}

export default CategoriesList;
