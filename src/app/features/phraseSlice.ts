import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
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

export const translatePhrase = createAsyncThunk(
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
      .catch((error) => error.json().errors[0].msg);
    return response as PhraseData;
  }
);

export default phraseSlice.reducer;
