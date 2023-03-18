import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCategories } from '../redux/reducers/user';

export const Categories = (): JSX.Element => {
  const [name, setName] = useState('');
  const [conflict, setConflict] = useState(false);

  const categories = useAppSelector((state) => state.user.categories);

  const dispatch = useAppDispatch();

  const handleChange = (name: string): void => {
    setName(name);

    const exists = categories.some((e) => e.name === name);
    setConflict(exists);
  };

  const handleCategory = (): void => {
    const newCategory = {
      id: categories.length + 1,
      name: name,
    };

    dispatch(setCategories([...categories, newCategory]));
    setName('');
  };

  return (
    <div>
      {categories.map((category) => {
        return <div key={category.id}>{category.name}</div>;
      })}
      <input onChange={(e) => handleChange(e.target.value)} type='text' value={name} />
      <button disabled={conflict} onClick={handleCategory}>
        Add category
      </button>
      {conflict && <p>Category already exists</p>}
    </div>
  );
};
