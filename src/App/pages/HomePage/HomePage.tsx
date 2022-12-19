import { Suspense, useState } from 'react';
import { LoaderFunction, useLoaderData, defer, Await } from 'react-router-dom';
import { TResponse } from '../../types/types';
// import styles from './styles.module.scss';
import { ProductList } from '../../components/ProductList/ProductList';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import { BrandsList } from '../../components/BrandsList/BrandList';

function HomePage() {
  const { products, categories } = useLoaderData() as { products: TResponse; categories: string[] };
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  // const [productsArr, setProductsArr] = useState<TProduct[]>([]);

  return (
    <div>
      <h1>All products</h1>
      <div className="content" style={{ display: 'flex' }}>
        <Suspense fallback={<h2>LOADINK KEK...</h2>}>
          <div className="items" style={{ display: 'flex', flexWrap: 'wrap', minWidth: '1000px' }}>
            <Await resolve={products}>
              <ProductList categories={selectedCategories} brands={selectedBrands} />
            </Await>
          </div>
          <div className="filter">
            <div className="categories">
              <Await resolve={categories}>
                <CategoriesList selectedItems={selectedCategories} setData={setSelectedCategories} />
              </Await>
            </div>
            <div className="brands">
              <Await resolve={products}>
                <BrandsList data={selectedBrands} setData={setSelectedBrands} />
              </Await>
            </div>
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
