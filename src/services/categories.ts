import { instance } from '@/axios';
import type { Category } from '@/types/categories';

export const getCategories = async () => {
  const { data } = await instance.get<Category[]>('/categories');
  return { categories: data };
};
