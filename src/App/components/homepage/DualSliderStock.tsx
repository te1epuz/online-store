import ReactSlider from 'react-slider';
import styles from './Slider.module.scss';
import { SetURLSearchParams, TProduct, TQueryParams } from '../../types/types';
import quickSort from '../../utils/quickSort';

type TProps = {
  products: TProduct[];
  setData: SetURLSearchParams;
  data: URLSearchParams;
  query: string[];
  maxStock: number;
  minStock: number;
};

function DualSliderStock({ products, query, setData, data, maxStock, minStock }: TProps) {
  const filteredMaxStock = products.length ? quickSort(products, 'stock')[products.length - 1].stock : maxStock;
  const filteredMinStock = products.length ? quickSort(products, 'stock')[0].stock : minStock;
  const [min, max] = query.length !== 1 ? [+query[0], +query[1]] : [filteredMinStock, filteredMaxStock];
  const handleChange = (values: number[]) => {
    const params: TQueryParams = {
      category: [],
      brand: [],
      search: '',
      sort: '',
      price: '',
      stock: '',
      size: '',
    };
    params.sort = data.get('sort') || '';
    params.category = data.getAll('category');
    params.search = data.get('search') || '';
    params.brand = data.getAll('brand');
    params.price = data.get('price') || '';
    params.stock = values.join('-') || '';
    params.size = data.get('size') || 'big';
    setData(params);
  };

  return (
    <ReactSlider
      className={styles.horizontal__slider}
      thumbClassName={styles.thumb}
      trackClassName={styles.track}
      value={[min, max]}
      ariaLabel={['Lower thumb', 'Upper thumb']}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      min={minStock}
      max={maxStock}
      minDistance={5}
      step={10}
      onChange={(values) => handleChange(values)}
    />
  );
}

export default DualSliderStock;
