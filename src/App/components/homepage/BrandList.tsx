import { SetURLSearchParams, TProduct, TQueryParams } from '../../types/types';
import countProducts from '../../utils/countProducts';
import listStyles from './listStyles.module.scss';

type TProps = {
  products: TProduct[];
  brands: string[];
  query: string[];
  setData: SetURLSearchParams;
  data: URLSearchParams;
  wholeCount: { [key: string]: number };
};
function BrandsList({ products, brands, query, setData, data, wholeCount }: TProps) {
  const handleClick = (item: string) => {
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
    params.category = data.getAll('category');
    params.search = data.get('search') || '';
    params.brand = query.includes(item) ? query.filter((i) => i !== item) : [...query, item];
    params.stock = data.get('stock') || '';
    params.size = data.get('size') || 'big';

    setData(params);
  };
  const currentCount = countProducts(products, 'brand');

  return (
    <ul className={listStyles.list}>
      {brands
        .sort()
        .sort((a, b) => {
          if (currentCount[a] > 0 && currentCount[b] === undefined) return -1;
          return 0;
        })
        .map((brand) => (
          <div className={listStyles.list__item} key={brand}>
            <input
              className={listStyles.item__checkbox}
              type="checkbox"
              id={brand}
              name={brand}
              value={brand}
              checked={query.includes(brand)}
              onChange={() => handleClick(brand)}
            />
            <label
              className={`${listStyles.item__label} ${!currentCount[brand] ? listStyles.text_greyed : ''}`}
              htmlFor={brand}
            >
              {brand}
              <span className={listStyles.item__labelspan}>
                ({currentCount[brand] ? currentCount[brand] : 0}/{wholeCount[brand]})
              </span>
            </label>
          </div>
        ))}
    </ul>
  );
}

export default BrandsList;
