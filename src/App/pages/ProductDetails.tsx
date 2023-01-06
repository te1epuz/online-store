import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext, useNavigate, NavLink } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { TCart, TProduct } from '../types/types';
import AddToCartBtn from '../components/AddToCartBtn';
import { addToCart } from '../services/localStorage.service';
import styles from './ProductDetails.module.scss';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<TProduct | null | 'not found'>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [cart, setCart, , setIsFastBuy] =
    useOutletContext<
      [TCart[], React.Dispatch<React.SetStateAction<TCart[]>>, null, React.Dispatch<React.SetStateAction<boolean>>]
    >();

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
  }

  const navigate = useNavigate();

  function handleBuyNow() {
    if (product !== null && product !== 'not found') {
      if (!cart.some((item) => item.id === product.id)) {
        setCart((prev) => [...prev, { ...product, count: 1 }]);
        addToCart(product);
      }
    }
    setIsFastBuy(true);
    navigate('../cart');
  }

  if (product !== null && product === 'not found') {
    return (
      <>
        <h1>hmm...</h1>
        <h2>It seems product &apos;{id}&apos; doesn&apos;t exist :(</h2>
        <NavLink to="/">Go back to main page</NavLink>
      </>
    );
  }

  return product !== null ? (
    <>
      <p className={styles.path}>
        <NavLink to="/">Store</NavLink> {'>'} {product.category} {'>'} {product.brand} {'>'} {product.title}
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
          <p>
            <span className={styles.text_greyed}>Categoty:</span> {product.category}
          </p>
          <p>
            <span className={styles.text_greyed}>Brand:</span> {product.brand}
          </p>
          <p>
            <span className={styles.text_greyed}>Description:</span> {product.description}
          </p>
          <p>
            <span className={styles.text_greyed}>Rating:</span> {product.rating}
          </p>
          <p>
            <span className={styles.text_greyed}>Stock:</span> {product.stock}
          </p>
          <p>
            <span className={styles.text_greyed}>Discount:</span> {product.discountPercentage}%
          </p>
          <h2 className={styles.price}>Price: ${product.price}</h2>
          <div className={styles.buttons}>
            <AddToCartBtn data={product} cart={cart} setCart={setCart} />
            <button className={styles.button__buynow} onClick={handleBuyNow} type="button">
              Buy Now
            </button>
          </div>
          <p className={styles.text_small}>* Buy Now option will instantly redirect You to Check Out, be carefull</p>
          <p className={styles.text_small}>
            ** Shipping: International Priority Shipping via Global Shipping Program |{' '}
            <a href="http://" onClick={(event) => event.preventDefault()}>
              See details
            </a>
          </p>
          <p className={styles.text_small}>
            *** For shipping Located in: Philadelphia, Pennsylvania, United States Buyer pays for return shipping
            |&nbsp;
            <a href="http://" onClick={(event) => event.preventDefault()}>
              See details
            </a>
          </p>
        </div>
      </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
}

export default ProductDetails;
