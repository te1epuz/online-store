import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom';
import { URLSearchParams } from 'url';

type TProduct = {
  id: number | string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

type TCart = TProduct & {
  count: number;
};

type TResponse = {
  products: TProduct[];
};

type TQueryParams = {
  category: string[];
  brand: string[];
  search: string;
  sort: string;
  price: string;
  stock: string;
  size: string;
};

type SetURLSearchParams = (
  // eslint-disable-next-line no-unused-vars
  nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit),
  // eslint-disable-next-line no-unused-vars
  navigateOpts?: NavigateOptions,
) => void;

export type { TProduct, TResponse, TQueryParams, SetURLSearchParams, TCart };
