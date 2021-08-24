import * as React from "react";
import { useState } from 'react'
import "./App.css";
import { transformPhrase } from './app/features/phraseSlice'
import { useAppDispatch, useAppSelector } from './app/hooks'

const App = (): JSX.Element => {
  const [phraseInput, setPhraseInput] = useState('')

  const dispatch = useAppDispatch()

  const handlePhraseChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const alphaRegex = /^[a-zA-Z ]*$/;
    if (ev.target.value === '' || alphaRegex.test(ev.target.value)) {
      setPhraseInput(ev.target.value)
    }
  }

  const pigLatinPhrase = useAppSelector(state => state.phrase.fullPhrase.pigLatin)
  const phraseStatus = useAppSelector(state => state.status)
  const phraseError = useAppSelector(state => state.error)

  const handlePhraseSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    dispatch(transformPhrase(phraseInput))
  }

  const handleResultsDisplay = () => {
    if (phraseStatus === 'idle') {
      return(
        <div></div>
      )
    } else if (phraseStatus === 'succeeded') {
      return(
        <div>
          <h2>{pigLatinPhrase}</h2>
        </div>
      )
    } else if (phraseStatus === 'failed') {
      return(
        <div>
          <h2>{phraseError}</h2>
        </div>
      )
    }
  }
  
  return (
    <div className="App">
      <h1>
        Pig Latinizer
      </h1>
      <div className="App-form">
        <form action="">
          <div id='phrase-label'>
          <label htmlFor="phrase-input">enter a phrase:</label>
          </div>
          <div id="phrase-form">
          <input
            type="text"
            id="phrase-input"
            placeholder="letters and spaces only"
            value={phraseInput}
            onChange={handlePhraseChange}
            />
          <button type="submit" id="phrase-submit" onSubmit={handlePhraseSubmit}>Submit</button>
          </div>
        </form>
      </div>
      {handleResultsDisplay}
    </div>
  );
};

export default App;
