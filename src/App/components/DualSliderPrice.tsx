import ReactSlider from 'react-slider';
import styles from './Slider.module.scss';
import { SetURLSearchParams, TProduct, TQueryParams } from '../types/types';
import quickSort from '../utils/quickSort';
import listStyles from './main.module.scss';

type TProps = {
  products: TProduct[];
  setData: SetURLSearchParams;
  data: URLSearchParams;
  query: string[];
  maxPrice: number;
  minPrice: number;
};

function DualSliderPrice({ products, query, setData, data, maxPrice, minPrice }: TProps) {
  const filteredMaxPrice = products.length ? quickSort(products, 'price')[products.length - 1].price : maxPrice;
  const filteredMinPrice = products.length ? quickSort(products, 'price')[0].price : minPrice;
  const [min, max] = query.length !== 1 ? [+query[0], +query[1]] : [filteredMinPrice, filteredMaxPrice];
  const handleChange = (values: number[]) => {
    const params: TQueryParams = {
      category: [],
      brand: [],
      search: '',
      sort: '',
      price: '',
      stock: '',
    };
    params.sort = data.get('sort') || '';
    params.category = data.getAll('category');
    params.search = data.get('search') || '';
    params.brand = data.getAll('brand');
    params.stock = '';

    params.price = values.join('-');
    setData(params);
  };

  return (
    <>
      <h3 className={listStyles.title}>Price</h3>

      <ReactSlider
        className={styles.horizontal__slider}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
        value={[min, max]}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        min={minPrice}
        max={maxPrice}
        minDistance={5}
        step={10}
        onChange={(values) => handleChange(values)}
      />
    </>
  );
}

export default DualSliderPrice;
