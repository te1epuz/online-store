import { TCart } from '../types/types';

type TProps = {
  [x in keyof TCart]: TCart[x];
} & {
  totalItemPrice: number;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

function Counter({ totalItemPrice, onIncrement, onDecrement, ...rest }: TProps) {
  const handleIncrement = () => {
    onIncrement(+rest.id);
  };
  const handleDecrement = () => {
    onDecrement(+rest.id);
  };
  return (
    <>
      <p>title: {rest.title}</p>
      <p>descr: {rest.description}</p>
      <p>price: {rest.price}</p>
      <div className="buttons">
        <button disabled={rest.count >= rest.stock} onClick={handleIncrement} type="button">
          +
        </button>
        <p>count: {rest.count}</p>
        <button onClick={handleDecrement} type="button">
          -
        </button>
      </div>
      <p>Total price: ${totalItemPrice}</p>
      <hr />
    </>
  );
}

export default Counter;
