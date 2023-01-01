import React from 'react';
import { Link } from 'react-router-dom';
import { TProduct } from '../types/types';
import styles from './ProductCard.module.scss';
import AddToCartBtn from './AddToCartBtn';

type TProps = {
  data: TProduct;
  cart: TProduct[];
  setCart: React.Dispatch<React.SetStateAction<TProduct[]>>;
  size: string;
};

function ProductCard({ data, size, cart, setCart }: TProps) {
  return (
    <div className={`${styles.card} ${size === 'big' ? '' : styles.v_small}`}>
      <Link to={`/product-details/${data.id}`}>
        <div className={styles.card__content}>
          <div className={styles.img__wrapper}>
            <img className={styles.img} src={data.thumbnail} alt={data.title} />
          </div>
          <h3>{data.title}</h3>
          <div className={styles.disabled}>
            <p>Categoty: {data.category}</p>
            <p>Brand: {data.brand}</p>
            <p>Price: ${data.price}</p>
            <p>Discount: {data.discountPercentage}%</p>
            <p>Rating: {data.rating}</p>
            <p>Stock: {data.stock}</p>
          </div>
        </div>
      </Link>
      <div className={styles.card__buttons}>
        <Link to={`/product-details/${data.id}`}>
          <button className={styles.card__button} type="button">Details</button>
        </Link>
        <AddToCartBtn data={data} cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default ProductCard;
