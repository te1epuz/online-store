import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TProduct } from '../types/types';
import styles from './HomePage.module.scss';
import ProductList from '../components/ProductList';
import CategoriesList from '../components/CategoriesList';
import BrandsList from '../components/BrandList';
import { getAllCategories, getAllProducts } from '../services/productService';
import countProducts from '../utils/countProducts';
import SearchInput from '../components/SearchInput';
import SelectSortBy from '../components/SelectSortBy';
import DualSliderPrice from '../components/DualSliderPrice';
import quickSort from '../utils/quickSort';
import DualSliderStock from '../components/DualSliderStock';

function HomePage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const brands = Array.from(new Set(products.map((i) => i.brand)));

  const [isCopied, setIsCopied] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const categoriesParams = searchParams.getAll('category');
  const brandsParams = searchParams.getAll('brand');
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const price = searchParams.get('price') || '';
  const stock = searchParams.get('stock') || '';
  const priceArr = price.split('-');
  const stockArr = stock.split('-');

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

  const handleCopied = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const copyURL = () => {
    const text = window.location.href;
    navigator.clipboard
      .writeText(text)
      .then(() => handleCopied())
      .catch((err) => console.error('Async: Could not copy text: ', err));
  };

  const filteredArr = products.filter((product) => {
    if (
      (product.title + product.category + product.description + product.brand)
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (categoriesParams?.length ? categoriesParams.includes(product.category) : true) &&
      (brandsParams?.length ? brandsParams.includes(product.brand) : true) &&
      (priceArr.length !== 1 ? product.price >= +priceArr[0] && product.price <= +priceArr[1] : true) &&
      (stockArr.length !== 1 ? product.stock >= +stockArr[0] && product.stock <= +stockArr[1] : true)
    ) {
      return true;
    }
    return false;
  });

  const sortArr = (arr: TProduct[]) => {
    if (sort) {
      const [key, order] = sort.split('-') as ['price' | 'rating', string];
      const sortedArr = order === 'asc' ? quickSort(arr, key) : order === 'desc' ? quickSort(arr, key).reverse() : arr;
      return sortedArr;
    }
    return arr;
  };

  if (!isLoading) {
    const sortedArr = sortArr(filteredArr);
    const wholeCountCategories = countProducts(products, 'category');
    const wholeCountBrands = countProducts(products, 'brand');
    const maxPrice = quickSort(products, 'price')[products.length - 1].price;
    const minPrice = quickSort(products, 'price')[0].price;
    const maxStock = quickSort(products, 'stock')[products.length - 1].stock;
    const minStock = quickSort(products, 'stock')[0].stock;

    return (
      <>
        <h1>All products</h1>
        <div className={styles.options}>
          <SelectSortBy query={sort} setData={setSearchParams} data={searchParams} />
          <h2>Found: {filteredArr.length}</h2>
          <SearchInput query={search} setData={setSearchParams} data={searchParams} />
        </div>
        <div className={styles.content}>
          <div className={styles.items}>
            <ProductList products={sortedArr} />
          </div>

          <div className={styles.filter}>
            <button type="button" onClick={clearFilter}>
              Reset Filters
            </button>
            <button type="button" onClick={copyURL}>
              {isCopied ? 'Copied' : 'Copy Link'}
            </button>
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
            <div className="stock">
              <DualSliderStock
                products={filteredArr}
                query={stockArr}
                setData={setSearchParams}
                data={searchParams}
                minStock={minStock}
                maxStock={maxStock}
              />
            </div>
            <div className="price">
              <DualSliderPrice
                products={filteredArr}
                query={priceArr}
                setData={setSearchParams}
                data={searchParams}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  return <h1>Loading</h1>;
}

export default HomePage;
