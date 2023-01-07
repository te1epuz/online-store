import React from 'react';
import { Link } from 'react-router-dom';
import { TCart, TProduct } from '../../types/types';
import styles from './ProductCard.module.scss';
import AddToCartBtn from '../AddToCartBtn';

type TProps = {
  data: TProduct;
  cart: TCart[];
  setCart: React.Dispatch<React.SetStateAction<TCart[]>>;
  size: string;
};

function ProductCard({ data, size, cart, setCart }: TProps) {
  if (size === 'big') {
    return (
      <div className={`${styles.card} ${styles.card__content_grid}`}>
        <Link to={`/product-details/${data.id}`}>
          <div className={styles.card__content}>
            <div className={styles.img__wrapper}>
              <img className={styles.img} src={data.thumbnail} alt={data.title} />
            </div>
            <div className={styles.price}>
              <h3>${data.price}</h3>
              <p className={styles.text_rating}>Rating: {data.rating }</p>
            </div>
            <p className={styles.title}>{data.title}</p>
            <div className={styles.disabled}>
              <p className={styles.text_greyed}>Categoty: {data.category}</p>
              <p className={styles.text_greyed}>Brand: {data.brand}</p>
              <p className={styles.text_greyed}>
                <span>Discount: {data.discountPercentage}% | </span>
                <span>Stock: {data.stock}</span>
              </p>
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
  return (
    <div className={`${styles.card} ${styles.card__content_list}`}>
      <Link to={`/product-details/${data.id}`}>
        <div className={styles.card__wrapper_list}>
          <div className={styles.img__wrapper_list}>
            <img className={styles.img} src={data.thumbnail} alt={data.title} />
          </div>
          <div>
            <h3 className={styles.title}>${data.price}</h3>
            <h3 className={styles.title}>{data.title}</h3>
            <p className={styles.text_rating}>Rating: {data.rating }</p>
            <span className={styles.text_greyed}>
              Categoty: {data.category} | Brand: {data.brand}
              | Discount: {data.discountPercentage}% | Stock: {data.stock}
            </span>
          </div>
        </div>
      </Link>
      <div className={styles.card__buttons_list}>
        <Link to={`/product-details/${data.id}`}>
          <button className={styles.card__button} type="button">Details</button>
        </Link>
        <AddToCartBtn data={data} cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default ProductCard;
