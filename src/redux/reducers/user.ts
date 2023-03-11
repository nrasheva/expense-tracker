import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Category = { id: number; name: string };

type UserState = {
  categories: Category[];
};

const initialState: UserState = {
  categories: [
    { id: 0, name: 'groceries' },
    { id: 1, name: 'rent' },
    { id: 2, name: 'food' },
  ],
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    resetUser: () => initialState,
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { resetUser, setCategories } = userSlice.actions;

export default userSlice.reducer;
