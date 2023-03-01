import React from 'react'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AddToken from '../pages/AddToken';
import { BrowserRouter } from 'react-router-dom';

render(<BrowserRouter> <AddToken/> </BrowserRouter>)

describe('Testando a página AddToken', () => {
  test('Testa se tudo está sendo renderizada corretamente', () => {
    expect(screen.getByRole('img', {name: /logoKlever/i})).toBeInTheDocument();
    expect(screen.getByRole('img', {name: /estrelaLogo/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /wishH1/i})).toHaveTextContent('Wish Wallet');
    expect(screen.getByTestId('buttonBack')).toBeInTheDocument();
    expect(screen.getByTestId('buttonSave')).toBeInTheDocument();
    expect(screen.getByTestId('tokenInput')).toBeInTheDocument();
    expect(screen.getByTestId('balanceInput')).toBeInTheDocument();
    
  })
})