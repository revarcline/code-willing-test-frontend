import { configureStore } from "@reduxjs/toolkit";
import { phraseReducer } from "./features/phraseSlice";

export const store = configureStore({
  reducer: {
    phrases: phraseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
