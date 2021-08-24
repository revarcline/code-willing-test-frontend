import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import apiRoot from "../apiRoot";

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
  async (phrase: string, thunkAPI) => {
    const response = await fetch(`${apiRoot}/api/phrases/piglatin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        phrase: phrase,
      }),
    }).then((res) => res.json());
    if (response.status !== 200) {
      // return with error
      return thunkAPI.rejectWithValue({
        message: "Phrases must contain only alphabetic characters and spaces",
      });
    }
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
        state.error = "Something went wrong";
      }
      state.status = "failed";
    });
  },
});

export default phraseSlice.reducer;
