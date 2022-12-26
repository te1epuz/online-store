import { SetURLSearchParams, TProduct, TQueryParams } from '../types/types';
import countProducts from '../utils/countProducts';
import styles from './BrandList.module.scss';
import listStyles from './main.module.scss';

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
    };
    params.price = '';
    params.sort = data.get('sort') || '';
    params.category = data.getAll('category');
    params.search = data.get('search') || '';
    params.brand = query.includes(item) ? query.filter((i) => i !== item) : [...query, item];
    params.stock = '';

    setData(params);
  };
  const currentCount = countProducts(products, 'brand');

  return (
    <>
      <h3 className={listStyles.title}>Brands</h3>
      <ul className={listStyles.list}>
        {brands.map((brand) => (
          <button
            key={brand}
            className={`${listStyles.list__btn} ${query.includes(brand) ? styles.bgGreen : ''}`}
            type="button"
            onClick={() => handleClick(brand)}
          >
            {brand}
            <span>
              ({currentCount[brand] ? currentCount[brand] : 0}/{wholeCount[brand]})
            </span>
          </button>
        ))}
      </ul>
    </>
  );
}

export default BrandsList;
