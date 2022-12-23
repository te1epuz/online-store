import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TProduct } from '../types/types';
// import styles from './HomePage.module.scss';
import { ProductList } from '../components/ProductList';
import CategoriesList from '../components/CategoriesList';
import { BrandsList } from '../components/BrandList';
import { getAllCategories, getAllProducts } from '../services/productService';
import countProducts from '../utils/countProducts';
import { SearchInput } from '../components/SearchInput';
import { SelectSortBy } from '../components/SelectSortBy';

function HomePage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const brands = Array.from(new Set(products.map((i) => i.brand)));

  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const categoriesParams = searchParams.getAll('category');
  const brandsParams = searchParams.getAll('brand');
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

  // console.log('sort', sort);

  const getProducts = async () => {
    const dataProducts = await getAllProducts();
    const dataCategories = await getAllCategories();
    setProducts(dataProducts);
    setCategories(dataCategories);
    setIsLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const clearFilter = () => {
    setSearchParams({});
  };

  const copyURL = () => {
    // console.log('KAK? hmmmm...');
  };

  const filter = () => {
    const textEqual = (item: TProduct) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase());

    const filteredArr = products.filter((i) => {
      if (categoriesParams?.length && brandsParams.length && search) {
        return (
          categoriesParams.some((j) => j === i.category) && brandsParams.some((j) => j === i.brand) && textEqual(i)
        );
      }

      if (categoriesParams?.length && brandsParams.length) {
        return categoriesParams.some((j) => j === i.category) && brandsParams.some((j) => j === i.brand);
      }

      if (categoriesParams?.length && !brandsParams.length && search) {
        return categoriesParams.some((j) => j === i.category) && textEqual(i);
      }

      if (!categoriesParams?.length && brandsParams.length && search) {
        return brandsParams.some((j) => j === i.brand) && textEqual(i);
      }

      if (categoriesParams?.length) return categoriesParams.some((j) => j === i.category);
      if (brandsParams.length) return brandsParams.some((j) => j === i.brand);
      if (search) {
        return textEqual(i);
      }

      return i;
    });
    return filteredArr;
  };

  const sortArr = (arr: TProduct[]) => {
    if (sort) {
      const [key, order] = sort.split('-') as ['price' | 'rating', string];
      const sortedArr = arr.sort((a, b) => (order === 'asc' ? a[key] - b[key] : b[key] - a[key]));
      return sortedArr;
    }
    return arr;
  };

  const wholeCountCategories = countProducts(products, 'category');
  const wholeCountBrands = countProducts(products, 'brand');
  // console.log(wholeCountCategories);
  // console.log(wholeCountBrands);

  const filteredArr = filter();
  // console.log(filteredArr);
  const sortedArr = sortArr(filteredArr);
  // console.log('sortedArr', sortedArr);

  return !isLoading ? (
    <div>
      <h1>All products</h1>
      <h2>Найдено: {filteredArr.length}</h2>
      <SelectSortBy query={sort} setData={setSearchParams} data={searchParams} />
      <div className="content" style={{ display: 'flex' }}>
        <div className="items" style={{ display: 'flex', flexWrap: 'wrap', minWidth: '1000px' }}>
          <ProductList products={sortedArr} />
        </div>
        <div className="filter">
          <button type="button" onClick={clearFilter}>
            Сброс Фильтра
          </button>
          <button type="button" onClick={copyURL}>
            Скопировать фильтр
          </button>
          <SearchInput query={search} setData={setSearchParams} data={searchParams} />
          <div className="categories">
            <CategoriesList
              products={filteredArr}
              categories={categories}
              query={categoriesParams}
              setData={setSearchParams}
              data={searchParams}
              wholeCount={wholeCountCategories}
            />
          </div>
          <div className="brands">
            <BrandsList
              products={filteredArr}
              brands={brands}
              query={brandsParams}
              setData={setSearchParams}
              data={searchParams}
              wholeCount={wholeCountBrands}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export { HomePage };
