import { render, screen } from '@testing-library/react';
import App from './App';
import AppContainer from './AppConteiner';

test('renders learn react link', () => {
  render(<AppContainer/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); 
});
