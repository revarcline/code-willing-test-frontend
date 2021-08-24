import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import phraseReducer from "./features/phraseSlice";

export const store = configureStore({
  reducer: phraseReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
