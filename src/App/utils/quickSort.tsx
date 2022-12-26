import { TProduct } from '../types/types';

const quickSort = (arr: TProduct[], key: keyof TProduct): TProduct[] => {
  if (arr.length < 2) return arr;

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];
  const less = [];
  const greater = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (i !== pivotIndex) {
      if (arr[i][key] <= pivot[key]) {
        less.push(arr[i]);
      } else {
        greater.push(arr[i]);
      }
    }
  }
  return [...quickSort(less, key), pivot, ...quickSort(greater, key)];
};

export default quickSort;
