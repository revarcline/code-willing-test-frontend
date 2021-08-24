import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import {store} from './app/store'
import App from './App';

// have to use provider store in order to render component!
const AppWithStore = () => <Provider store={store}><App /></Provider>

test('renders with title, input, and submit button', () => {
  render(<AppWithStore />);
  const titleElement = screen.getByText(/pig latinizer/i);
  const inputElement = screen.getByLabelText(/enter a phrase:/i)
  const submitElement = screen.getByText(/submit/i)
  expect(titleElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
  expect(submitElement).toBeInTheDocument();
});

test('only allows letters and spaces in input', () => {
  render(<AppWithStore />);
  const inputElement = screen.getByLabelText(/enter a phrase:/i)
  fireEvent.change(inputElement, { target: { value: '123?' } })
  expect(inputElement).toHaveValue('')
  fireEvent.change(inputElement, { target: { value: 'A flying squid' } })
  expect(inputElement).toHaveValue('A flying squid')
})
