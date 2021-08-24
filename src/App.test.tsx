import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders with title', () => {
  render(<App />);
  const titleElement = screen.getByText(/pig latinizer/i);
  expect(titleElement).toBeInTheDocument();
});
