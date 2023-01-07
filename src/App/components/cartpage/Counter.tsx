import { TCart } from '../../types/types';
import styles from './Counter.module.scss';

type TProps = {
  [x in keyof TCart]: TCart[x];
} & {
  totalItemPrice: number;
  listId: number;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

function Counter({ totalItemPrice, listId, onIncrement, onDecrement, ...rest }: TProps) {
  const handleIncrement = () => {
    onIncrement(+rest.id);
  };
  const handleDecrement = () => {
    onDecrement(+rest.id);
  };
  return (
    <div className={styles.card}>
      <div className={styles.card__id}>#{listId}</div>
      <div className={styles.card__body}>
        <div className={styles.card__image}>
          <img src={rest.thumbnail} alt={rest.title} />
        </div>
        <div className={styles.card__info}>
          <h3 className={styles.card__title}>{rest.title}</h3>
          <div className={styles.card__description}>{rest.description}</div>
          <div className={styles.card__stats}>
            <div>Price: ${rest.price}</div>
            <div>Stock: {rest.stock} pcs.</div>
            <div>Discount: {rest.discountPercentage}%</div>
          </div>
        </div>
      </div>
      <div className={styles.card__controls}>
        <div className={styles.card__buttons}>
          <button className={styles.control_btn} onClick={handleDecrement} type="button">
            -
          </button>
          <p className={styles.card__count}>{rest.count}</p>
          <button
            className={styles.control_btn}
            disabled={rest.count >= rest.stock}
            onClick={handleIncrement}
            type="button"
          >
            +
          </button>
        </div>
        <div className={styles.total}>Total price: ${totalItemPrice}</div>
      </div>
    </div>
  );
}

export default Counter;
