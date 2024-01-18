import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './reducer/expensesSlice'; // Import the reducer
import { expensesApi } from './expensesApi';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expensesApi.middleware),
});
