import React from 'react';
import { useAsyncValue } from 'react-router-dom';

type TProps = {
  setData: React.Dispatch<React.SetStateAction<string | null>>;
};

function CategoriesList({ setData }: TProps) {
  const categories = useAsyncValue() as string[];

  const handleSelect = (item: string) => {
    setData(item);
  };

  return (
    <ul>
      {categories.map((category) => (
        <button type="button" onClick={() => handleSelect(category)} key={category}>
          {category}
        </button>
      ))}
    </ul>
  );
}

export default CategoriesList;
