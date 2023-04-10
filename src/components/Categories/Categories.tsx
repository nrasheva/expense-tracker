import { useEffect } from 'react';
import styles from './Categories.module.scss';
import { getCategories } from '@/services/categories';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCategories } from '@/redux/reducers/categories';

export const Categories = (): JSX.Element => {
  const categories = useAppSelector((state) => state.categories.categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { categories } = await getCategories();

        dispatch(setCategories(categories));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <div></div>;
};
