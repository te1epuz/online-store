import { Suspense, useEffect, useState } from 'react';
import { LoaderFunction, useLoaderData, defer, Await, useSearchParams } from 'react-router-dom';
import { TResponse } from '../../types/types';
// import styles from './styles.module.scss';
import { ProductList } from '../../components/ProductList/ProductList';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import { BrandsList } from '../../components/BrandsList/BrandList';

function HomePage() {
  const { products, categories } = useLoaderData() as {
    products: TResponse;
    categories: string[];
  };

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchKeysParamsLength = Object.keys(Object.fromEntries(searchParams)).length;

  const categoriesParams = searchParams.getAll('category');
  const brandsParams = searchParams.getAll('brand');
  console.log('↕️', categoriesParams);
  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  const clearFilter = () => {
    if (searchKeysParamsLength) setIsLoading(true);
    setSearchParams({});
  };

  return (
    <div>
      <h1>All products</h1>
      <div className="content" style={{ display: 'flex' }}>
        <Suspense fallback={<h2>LOADINK KEK...</h2>}>
          <div className="items" style={{ display: 'flex', flexWrap: 'wrap', minWidth: '1000px' }}>
            <Await resolve={products}>
              {isLoading && <h1>LOADING LOADERA KEKW</h1>}
              <ProductList categories={categoriesParams} brands={brandsParams} />
            </Await>
          </div>
          <div className="filter">
            <button type="button" onClick={clearFilter}>
              Сброс Фильтра
            </button>
            <div className="categories">
              <Await resolve={categories}>
                <CategoriesList
                  query={categoriesParams}
                  setData={setSearchParams}
                  data={searchParams}
                  setLoading={setIsLoading}
                />
              </Await>
            </div>
            <div className="brands">
              <Await resolve={products}>
                <BrandsList
                  query={brandsParams}
                  setData={setSearchParams}
                  data={searchParams}
                  setLoading={setIsLoading}
                />
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
