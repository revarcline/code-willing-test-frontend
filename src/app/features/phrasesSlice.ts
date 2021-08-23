import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { postPhrase } from "./userApi";
import type { RootState } from "../store";

interface PhraseState {
  fullPhrase: {
    original: string;
    pigLatin: string;
    status: string;
    errors: [];
  };
}

const initialState: PhraseState = {
  fullPhrase: {
    original: "",
    pigLatin: "",
    status: "idle",
    errors: [],
  },
};

export const translatePhrase = createAsyncThunk(
  "phrases/tranformPhrase",
  async (phrase: string) => await postPhrase(phrase)
);

export const phrasesSlice = createSlice({
  name: "phrase",
  initialState,
  reducers: {},
  extraReducers: {
    [translatePhrase.pending]: (state) => {
      state.fullPhrase = {
        ...state.fullPhrase,
        status: "loading",
      };
    },
    [translatePhrase.fulfilled]: (state, action: PayloadAction) => {
      state.fullPhrase = {
        ...state.fullPhrase,
        original: action.payload.fullPhrase.original,
        pigLatin: action.payload.fullPhrase.pigLatin,
        status: "finished",
      };
    },
    [translatePhrase.rejected]: (state, action: PayloadAction) => {
      state.fullPhrase = {
        ...state.fullPhrase,
        status: "failed",
        errors: action.payload,
      };
    },
  },
});

export default phrasesSlice.reducer;
