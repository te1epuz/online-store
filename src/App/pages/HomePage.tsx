import { useEffect, useState } from 'react';
import { TProduct } from '../types/types';
import { ProductCard } from '../components/ProductCard/ProductCard';
// import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { getAllProducts } from '../services/productService';

function HomePage() {
  const [products, setProducts] = useState<TProduct[] | null>(null);

  async function getData() {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return products?.length ? (
    <>
      <h1>All products</h1>
      <div className={styles.products}>
        {products.map((i) => (
          <ProductCard key={i.id} data={i} />
        ))}
      </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
}

export { HomePage };
