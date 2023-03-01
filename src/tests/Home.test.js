import React from 'react'
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Home';

render(<BrowserRouter> <Home/> </BrowserRouter>)

describe('Testando a página Home', () => {
  test('Testa se tudo está sendo renderizada corretamente', () => {
    expect(screen.getByRole('img', {name: /logoKlever/i})).toBeInTheDocument();
    expect(screen.getByRole('img', {name: /estrelaLogo/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /wishH1/i})).toBeInTheDocument();
    expect(screen.getByTestId('buttonAdd')).toBeInTheDocument();
  })
})