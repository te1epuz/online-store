import { SetURLSearchParams, TProduct, TQueryParams } from '../types/types';
import countProducts from '../utils/countProducts';
import styles from './BrandList.module.scss';

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
    };
    params.sort = data.get('sort') || '';
    params.category = data.getAll('category');
    params.search = data.get('search') || '';
    params.brand = query.includes(item) ? query.filter((i) => i !== item) : [...query, item];

    setData(params);
  };
  const currentCount = countProducts(products, 'brand');
  console.log('currentCount brands', currentCount);

  return (
    <>
      <h1>BrANDS</h1>

      {brands.map((brand) => (
        <button
          key={brand}
          className={query.includes(brand) ? styles.bgGreen : ''}
          type="button"
          onClick={() => handleClick(brand)}
        >
          {brand}{' '}
          <span>
            ({currentCount[brand] ? currentCount[brand] : 0}/{wholeCount[brand]})
          </span>
        </button>
      ))}
    </>
  );
}

export { BrandsList };
