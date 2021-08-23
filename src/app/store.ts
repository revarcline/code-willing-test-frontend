import { configureStore } from "@reduxjs/toolkit";
import { phrasesReducer } from "./features/phrasesSlice";

export const store = configureStore({
  reducer: {
    phrases: phrasesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
