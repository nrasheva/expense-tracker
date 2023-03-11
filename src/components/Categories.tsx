import { useState } from 'react';

type Category = { id: number; name: string };

const CATEGORIES: Category[] = [
  { id: 0, name: 'groceries' },
  { id: 1, name: 'rent' },
  { id: 2, name: 'food' },
];

export const Categories = (): JSX.Element => {
  const [categories, setCategories] = useState(CATEGORIES);
  const [name, setName] = useState('');
  const [conflict, setConflict] = useState(false);

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

    setCategories([...categories, newCategory]);
    setName('');
  };

  return (
    <div>
      <h3>Categories</h3>
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
