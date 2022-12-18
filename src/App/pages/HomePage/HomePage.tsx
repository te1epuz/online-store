import { Suspense, useState } from 'react';
import { LoaderFunction, useLoaderData, defer, Await } from 'react-router-dom';
import { TResponse } from '../../types/types';
// import styles from './styles.module.scss';
import { ProductList } from '../../components/ProductList/ProductList';
import CategoriesList from '../../components/CategoriesList/CategoriesList';

function HomePage() {
  const { products, categories } = useLoaderData() as { products: TResponse; categories: string[] };
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelect = (item: string) => {
    setSelectedCategory(item);
  };

  const clearFilter = () => {
    setSelectedCategory(null);
  };

  return (
    <div>
      <h1>All products</h1>
      <div className="content" style={{ display: 'flex' }}>
        <Suspense fallback={<h2>LOADINK KEK...</h2>}>
          <div className="items">
            <Await resolve={products}>
              <ProductList category={selectedCategory} />
            </Await>
          </div>
          <div className="categories">
            <Await resolve={categories}>
              <CategoriesList onItemSelect={handleSelect} />
              <button type="button" onClick={clearFilter}>
                Сброс Фильтра
              </button>
            </Await>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

const getProducts = async () => {
  const res: TResponse = await fetch('https://dummyjson.com/products?limit=100').then((list) => list.json());
  return res.products;
};

const getProductsCategories = async () => {
  const res: string[] = await fetch('https://dummyjson.com/products/categories').then((list) => list.json());
  return res;
};

const homePageLoader: LoaderFunction = async () =>
  defer({
    products: getProducts(),
    categories: getProductsCategories(),
  });

export { HomePage, homePageLoader };
