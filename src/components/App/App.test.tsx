import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // add provider with data
  render(<App />);
  const linkElement = screen.getByText(/New task/i);
  expect(linkElement).toBeInTheDocument();
});
