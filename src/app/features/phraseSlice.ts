import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transform } from "typescript";
import { RootState } from "../store";
import { postPhrase } from "./userApi";

interface PhraseData {
  fullPhrase: {
    original: string;
    pigLatin: string;
  };
}

interface PhraseState {
  phrase: PhraseData;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PhraseState = {
  phrase: {
    fullPhrase: {
      original: "",
      pigLatin: "",
    },
  },
  status: "idle",
  error: null,
};

export const transformPhrase = createAsyncThunk(
  "phrase/tranformPhrase",
  async (phrase: string) => {
    const response = await fetch(`${apiRoot}/api/phrases/piglatin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        phrase: phrase,
      }),
    })
      .then((res) => res.json())
      .catch((error) => error.json());
    return response as PhraseData;
  }
);

export const phraseSlice = createSlice({
  name: "phrase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(transformPhrase.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(transformPhrase.fulfilled, (state, { payload }) => {
      state.phrase = payload;
      state.status = "succeeded";
    });
    builder.addCase(transformPhrase.rejected, (state, { payload }) => {
      console.log("rejected", payload);
      if (payload) {
        state.error = payload.errors[0].msg;
      }
      state.status = "failed";
    });
  },
});

export const selectPhrase = (state: RootState) => {
  return state.phrase.fullPhrase;
};

export default phraseSlice.reducer;
