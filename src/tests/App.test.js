import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import AddToken from '../pages/AddToken';
import EditToken from '../pages/EditToken';


describe('Testando a página Home', () => {
  test('Testa se tudo está sendo renderizada corretamente', () => {
    render(<BrowserRouter> <Home/> </BrowserRouter>)
    expect(screen.getByTestId('logoKlever')).toBeInTheDocument();
    expect(screen.getByTestId('estrelaLogo')).toBeInTheDocument();
    expect(screen.getByTestId('wishH1')).toBeInTheDocument();
    expect(screen.getByTestId('buttonAdd')).toBeInTheDocument();
    expect(screen.getByTestId('semToken')).toBeInTheDocument();
  })
  test('Testa se o botão Add Token redireciona a página corretamente', () => {
    render(<BrowserRouter> <Home/> </BrowserRouter>)
    const addButton = screen.getByRole('link', {
      name: /Add Token/i,
    });
    fireEvent.click(addButton);
    expect(window.location.pathname).toBe('/addtoken');
  });
  test('Testa se o botão de Edit redireciona a página corretamente', () => {
    const token = [{token:'BTC', balance:123}]
    localStorage.setItem('tokens', JSON.stringify(token))
    render(<BrowserRouter> <Home/> </BrowserRouter>)
    const editButton = screen.getByTestId('editButton');
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(window.location.pathname).toBe('/edittoken/BTC');
  });
  test('Testa se o o nome do Token e o valor do Balance está renderizando corretamente', () => {
    const token = [{token:'BTC', balance:123}]
    localStorage.setItem('tokens', JSON.stringify(token))
    render(<BrowserRouter> <Home/> </BrowserRouter>)
    const h1Token = screen.getByTestId('h1Token');
    const h1Balance = screen.getByTestId('h1Balance');
    expect(h1Token).toHaveTextContent('BTC');
    expect(h1Balance).toHaveTextContent(123);
  });
}) 

describe('Testando a página AddToken', () => {
  test('Testa se tudo está sendo renderizada corretamente', () => {
    render(<BrowserRouter> <AddToken/> </BrowserRouter>)
    expect(screen.getByTestId('logoAdd')).toBeInTheDocument();
    expect(screen.getByTestId('estrelaLogoAdd')).toBeInTheDocument();
    expect(screen.getByTestId('wishH1Add')).toHaveTextContent('Wish Wallet');
    expect(screen.getByTestId('buttonBack')).toBeInTheDocument();
    expect(screen.getByTestId('buttonSave')).toBeInTheDocument();
    expect(screen.getByTestId('tokenInput')).toBeInTheDocument();
    expect(screen.getByTestId('balanceInput')).toBeInTheDocument();
  })
  test('Testa se da pra digitar nos inputs', () => {
    render(<BrowserRouter> <AddToken/> </BrowserRouter>)
    const tokenInput = screen.getByTestId('tokenInput');
    fireEvent.change(tokenInput, { target: { value: 'ETH' } });
    expect(tokenInput.value).toBe('ETH');

    const balanceInput = screen.getByTestId('balanceInput');
    fireEvent.change(balanceInput, { target: { value: 123 } });
    expect(balanceInput.value).toBe('123');
  });
  test('Testa se aparece o erro se você não digitar nada no input de token', () => {
    render(<BrowserRouter> <AddToken/> </BrowserRouter>)
    const saveButton = screen.getByTestId('buttonSave');
    const tokenInput = screen.getByTestId('tokenInput');
    const errorInput = screen.getByTestId('errorInput');
    fireEvent.change(tokenInput, { target: { value: '' } });
    fireEvent.click(saveButton);
    expect(errorInput).toBeInTheDocument();
  });
  test('Testa se aparece o erro se você não digitar nada no input de balance', () => {
    render(<BrowserRouter> <AddToken/> </BrowserRouter>)
    const saveButton = screen.getByTestId('buttonSave');
    const balanceInput = screen.getByTestId('balanceInput');
    const errorInput = screen.getByTestId('errorInput');
    fireEvent.change(balanceInput, { target: { value: '' } });
    fireEvent.click(saveButton);
    expect(errorInput).toBeInTheDocument();
  });
  test('Testa o botão save salva no localStorage', () => {
    render(<BrowserRouter> <AddToken/> </BrowserRouter>)
    window.localStorage.clear()
    const saveButton = screen.getByTestId('buttonSave');
    const tokenInput = screen.getByTestId('tokenInput');
    const balanceInput = screen.getByTestId ('balanceInput');
    const tokenObj = [{token:'ETH', balance:'123'}]
   
    fireEvent.change(tokenInput, { target: { value: 'ETH' } });
    fireEvent.change(balanceInput, { target: { value: 123 } });
    fireEvent.click(saveButton);

    const localTokens = JSON.parse(localStorage.getItem('tokens'))

    expect(localTokens).toEqual(tokenObj);
  });
  test('Testa se o botão de voltar redireciona para a Home', () => {
    render(<BrowserRouter> <AddToken/> </BrowserRouter>)
    const backButton = screen.getByTestId('buttonBack');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(window.location.pathname).toBe('/');
  });
})
