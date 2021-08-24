import * as React from "react";
import { useState, useEffect} from 'react'
import "./App.css";
import { transformPhrase } from './app/features/phraseSlice'

const App = (): JSX.Element => {
  const [phraseInput, setPhraseInput] = useState('')

  const handlePhraseChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const alphaRegex = /^[a-zA-Z ]*$/;
    if (ev.target.value === '' || alphaRegex.test(ev.target.value)) {
      setPhraseInput(ev.target.value)
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
          <button type="submit" id="phrase-submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        <h2>
          Result text
        </h2>
      </div>
    </div>
  );
};

export default App;
