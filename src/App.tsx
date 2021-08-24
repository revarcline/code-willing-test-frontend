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
    if ( phraseInput !== '' ) {
    dispatch(transformPhrase(phraseInput))
    }
  }

  const handleResultsDisplay = () => {
    let output = 'Pig Latinizer'
    if (phraseStatus === 'succeeded') {
      output = pigLatinPhrase
    } else if (phraseStatus === 'failed') {
      output = phraseError
    }
      return(
        <div>
          <h2>{output}</h2>
        </div>
      )
  }
  
  return (
    <div className="App">
      <h1>
          {handleResultsDisplay()}
      </h1>
      <div className="App-form">
        <form onSubmit={handlePhraseSubmit}>
          <div id='phrase-label'>
          <label htmlFor="phrase-input">enter a phrase:</label>
          </div>
          <div id="phrase-form">
            <div>
          <input
            type="text"
            id="phrase-input"
            placeholder="letters and spaces only"
            value={phraseInput}
            onChange={handlePhraseChange}
            />
            </div>
            <div>
          <button type="submit" id="phrase-submit">Submit</button>
            </div>
          </div>
        </form>
        </div>
    </div>
  );
};

export default App;
