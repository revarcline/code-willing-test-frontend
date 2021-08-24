import * as React from "react";
import { useState, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import "./App.css";
import { translatePhrase } from './app/features/phrasesSlice'

const App = (): JSX.Element => {
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
