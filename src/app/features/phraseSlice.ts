import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { postPhrase } from "./userApi";

interface PhraseData {
  fullPhrase: {
    original: string;
    pigLatin: string;
  };
  error: string;
}

export const translatePhrase = createAsyncThunk(
  "phrase/tranformPhrase",
  async (phrase: string) => {
    const response = await postPhrase(phrase);
    return response.json() as PhraseData;
  }
);

interface GenericState<T> {
  data?: T;
  status: "loading" | "finished" | "error";
}
const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>
>({
  name = "",
  initialState,
  reducers,
}: {
  name: string;
  initialState: GenericState<T>;
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state) {
        state.status = "loading";
      },
      /**
       * * If you want to write to values of the state that depend on the generic
       * * (in this case: `state.data`, which is T), you might need to specify the
       * * State type manually here, as it defaults to `Draft<GenericState<T>>`,
       * * which can sometimes be problematic with yet-unresolved generics.
       * * This is a general problem when working with immer's Draft type and generics.
       * */
      success(state: GenericState<T>, action: PayloadAction<T>) {
        state.data = action.payload;
        state.status = "finished";
      },
      ...reducers,
    },
  });
};
const phraseSlice = createGenericSlice({
  name: "phrase",
  initialState: { status: "loading" } as GenericState<string>,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(translatePhrase.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(
        translatePhrase.fulfilled,
        (state, { payload }: PayloadAction) => {
          state.push(payload);
          state.status = "finished";
        }
      ),
      builder.addCase(
        translatePhrase.rejected,
        (state, { payload }: PayloadAction) => {
          state.push(payload);
          state.status = "failed";
        }
      );
  },
});

export default phraseSlice.reducer;
