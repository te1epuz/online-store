import { useAsyncValue } from 'react-router-dom';

type TProps = {
  onItemSelect: (item: string) => void;
};

function CategoriesList({ onItemSelect }: TProps) {
  const categories = useAsyncValue() as string[];
  return (
    <ul>
      {categories.map((category) => (
        <button type="button" onClick={() => onItemSelect(category)} key={category}>
          {category}
        </button>
      ))}
    </ul>
  );
}

export default CategoriesList;
