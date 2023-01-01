import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { TProduct } from '../types/types';
import { getCart } from '../services/localStorage.service';
import AddToCartBtn from '../components/AddToCartBtn';
import styles from './ProductDetails.module.scss';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<TProduct | null | 'not found'>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [cart, setCart] = useState(getCart());

  async function getData() {
    const data = await getProductById(id);
    setProduct(data);
    if (data === 'not found') {
      setCurrentImage('');
    } else {
      setCurrentImage(data.images[0]);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  function changeCurrentImage(imageLink: string) {
    setCurrentImage(imageLink);
    // TODO добавить изменение стилей для списка картинок с выделением текущей
  }

  if (product !== null && product === 'not found') {
    return (
      <>
        <h1>hmm...</h1>
        <h2>It seems product &apos;{id}&apos; doesn&apos;t exist :(</h2>
        <Link to="/">Go back to main page</Link>
      </>
    );
  }

  return product !== null ? (
    <>
      <p className={styles.path}>
        Store {'>'} {product.category} {'>'} {product.brand} {'>'} {product.title}
      </p>
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.content}>
        <div>
          <div className={styles.thumbs__block}>
            {product.images.map((imageLink) => (
              <button
                className={styles.thumbs__button}
                key={imageLink}
                type="button"
                onClick={() => changeCurrentImage(imageLink)}
              >
                <img className={styles.thumbs__img} src={imageLink} alt="product" />
              </button>
            ))}
          </div>
        </div>
        <div className={styles.product__img_wrapper}>
          <img className={styles.product__img} src={currentImage} alt="product" width="400px" />
        </div>
        <div>
          <p>ID: {product.id}</p>
          <h3>Product Details:</h3>
          <p><span className={styles.text_greyed}>Categoty:</span> {product.category}</p>
          <p><span className={styles.text_greyed}>Brand:</span> {product.brand}</p>
          <p><span className={styles.text_greyed}>Description:</span> {product.description}</p>
          <p><span className={styles.text_greyed}>Rating:</span> {product.rating}</p>
          <p><span className={styles.text_greyed}>Stock:</span> {product.stock}</p>
          <p><span className={styles.text_greyed}>Discount:</span> {product.discountPercentage}%</p>
          <h2 className={styles.price}>Price: {product.price}$</h2>
          <div className={styles.buttons}>
            <AddToCartBtn data={product} cart={cart} setCart={setCart} />
            <button type="button">TODO buy now button</button>
          </div>
          <p className={styles.text_small}>*Shipping: International Priority Shipping via Global Shipping Program
            | <a href="http://" onClick={(event) => event.preventDefault()}>See details</a>
          </p>
          <p className={styles.text_small}>**For shipping Located in: Philadelphia, Pennsylvania, United States
            Buyer pays for return shipping |&nbsp;
            <a href="http://" onClick={(event) => event.preventDefault()}>See details</a>
          </p>
        </div>
      </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
}

export default ProductDetails;
