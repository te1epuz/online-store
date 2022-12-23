import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { TProduct } from '../types/types';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<TProduct | null | 'not found'>(null);
  const [currentImage, setCurrentImage] = useState<string>('');

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
        <p>It seems product &apos;{id}&apos; doesn&apos;t exist :(</p>
        <Link to="/">Go back to main page</Link>
      </>
    );
  }

  return product !== null ? (
    <>
      <h1>product page</h1>
      <p>
        Store {'>'} {product.category} {'>'} {product.brand} {'>'} {product.title}
      </p>
      <div>
        <h2>{product.title}</h2>
        <div>
          <div>
            <div>
              {product.images.map((imageLink) => (
                <button key={imageLink} type="button" onClick={() => changeCurrentImage(imageLink)}>
                  <img src={imageLink} alt="product" width="100px" />
                </button>
              ))}
            </div>
            <div>
              <img src={currentImage} alt="product" width="400px" />
            </div>
          </div>
          <div>
            <h3>{product.title}</h3>
            <p>Categoty: {product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>Discount: {product.discountPercentage}%</p>
            <p>Rating: {product.rating}</p>
            <p>Stock: {product.stock}</p>
          </div>
          <div>
            <p>Price: ${product.price}</p>
            <button type="button">add to cart</button>
            <button type="button">buy now</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
}

export { ProductDetails };
