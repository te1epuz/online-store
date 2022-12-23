import { Link } from 'react-router-dom';
import { TProduct } from '../types/types';
import styles from './ProductCard.module.scss';
import AddToCartBtn from './AddToCartBtn';

function ProductCard({ data }: { data: TProduct }) {
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.card__content} style={{ backgroundImage: `url(${data.thumbnail})` }}>
          <h3>{data.title}</h3>
          <p>Categoty: {data.category}</p>
          <p>Brand: {data.brand}</p>
          <p>Price: ${data.price}</p>
          <p>Discount: {data.discountPercentage}%</p>
          <p>Rating: {data.rating}</p>
          <p>Stock: {data.stock}</p>
          <div className={styles.card__buttons}>
            <Link to={`/product-details/${data.id}`}>
              <button type="button">Details</button>
            </Link>
            <AddToCartBtn data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
