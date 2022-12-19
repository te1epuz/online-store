import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import styles from './styles.module.scss';

type TProps = {
  selectedItems: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
};

function CategoriesList({ selectedItems, setData }: TProps) {
  const categories = useAsyncValue() as string[];

  const clearFilter = () => {
    setData([]);
  };
  const handleSelect = (item: string) => {
    setData((prev) => {
      if (!prev.includes(item)) {
        return [...prev, item];
      }
      return prev.filter((i) => i !== item);
    });
  };

  return (
    <ul>
      <button type="button" onClick={clearFilter}>
        Сброс Фильтра
      </button>
      {categories.map((category) => (
        <button
          type="button"
          className={selectedItems.includes(category) ? styles.bgRed : ''}
          onClick={() => handleSelect(category)}
          key={category}
        >
          {category}
        </button>
      ))}
    </ul>
  );
}

export default CategoriesList;
