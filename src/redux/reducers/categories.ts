import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '@/types/categories';

type CategoriesState = {
  categories: Category[];
};

const initialState: CategoriesState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  initialState,
  name: 'categories',
  reducers: {
    resetCategories: () => initialState,
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { resetCategories, setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
