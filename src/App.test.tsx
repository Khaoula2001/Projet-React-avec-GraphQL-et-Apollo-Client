import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
    render(<App />);
    const titleElement = screen.getByText(/Gestion des Comptes et Transactions/i);
    expect(titleElement).toBeInTheDocument();
});
