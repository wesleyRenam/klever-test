import React, {useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import star from '../assets/shooting-star.svg';

function AddToken() {
  //Utilizando state para guardar os valores digitados no input
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false)
  const [token, setToken] = useState('')
  const [balance, setBalance] = useState('')
  const navigate = useNavigate()
  const saveToken = () => {
    // Colocando o token em um objeto para facilitar a manipulação
    const objToken = {token, balance}
    // Pegando todos os valores já existentes no localStorage, se for null ou undefined coloca um array vazio
    const pushArray = JSON.parse(localStorage.getItem("tokens")) ?? []
     //Verificando se tem algum valor no campo de Token.
    if(token === '' || balance === '') {
      setError(true)
      //Verifico com o Some se existe algum token com o nome igual, uso um if para decidir.
    } else if(pushArray.some((eachArrayToken) => eachArrayToken.token === token)) {
      //Se for true, emito um alert falando que já existe um igual
      setAlert(true)
    }
    else {
      //Se for false eu adiciono ele no localStorage e mando de volta para a Home.
      pushArray.push(objToken);
      localStorage.setItem("tokens", JSON.stringify(pushArray));
      navigate('/') 
    }
  }
  return (
    <div className='bg-backG h-screen w-screen items-center flex flex-col'>
      <Link to='/' className='justify-center flex w-52 mb-16 mt-10'>
            <img src={logo} alt="Logo Klever" aria-label="logoKlever"/>
      </Link>
      <div className='flex w-1/3 rounded-xl flex-col '>
        <div className='flex justify-between items-center'>
          <div className='flex items-center justify-between'>
            <img src={star} alt="Estrela" className='w-12' aria-label='estrelaLogo'/>
            <h1 className='text-white font-bold text-5xl' aria-label='wishH1'>Wish Wallet</h1>
          </div>
        </div>
        <div className='flex m-10 justify-between items-center'>
          <h1 className='text-white font-bold text-2xl	'>Add Token</h1>
          <Link to='/' data-testid="buttonBack" className='font-bold text-white bg-cinza p-2 px-9 rounded-lg text-sm'>Voltar</Link> 
        </div>
        {/* Div de alerta que só aparece quando o state 'alert' está ativo */}
        <div className=' flex justify-center items-center'>
          {alert ? 
          <div className='flex w-1/4 bg-alert shadow-3xl fixed p-8 rounded-xl flex-col items-center '>
            <div>
              <h1 className='text-white'>Você tem um Token igual a esse, por favor troque o nome.</h1>
            </div>
            <div className='flex mt-7'>
              <button
              className='font-bold text-white bg-gray-500 p-2 w-full  rounded-lg text-sm'
              onClick={() => setAlert(false) }
              >
                Voltar
              </button>
            </div>
          </div> :
          <></>
          }
        </div>
        {/* Formulario de Token e Balance  */}
        <form className='flex m-10 mt-0 flex-col justify-between space-y-5'>
          <fieldset>
            <label htmlFor="text" className='text-white font-bold text-lg m-1'>
              Token
            <input
              className='bg-white text-black font-bold p-2 rounded-md w-full'
              type="text"
              name="text"
              required
              data-testid="tokenInput"
              //Atualizando o state com o valor do input.
              onChange={(event) => setToken(event.target.value)}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="text" className='text-white font-bold text-lg m-1'>
              Balance
            <input
              className='bg-white p-2 text-black font-bold rounded-md w-full'
              type="number"
              required
              data-testid="balanceInput"
              //Atualizando o state com o valor do input.
              onChange={(event) => setBalance(event.target.value)}
              />
            </label>
          </fieldset>
          <div className='flex w-full text-red-500 '>
            {error && <small>Todos os campos devem estar preenchidos.</small>}
          </div>
        </form> 
        
        {/* Botão para salvar que chama a função saveToken */}
        <div className='flex justify-end m-10 mt-0 items-center' >
          <button data-testid="buttonSave" className='font-bold text-white bg-purple p-2 px-7 rounded-lg text-sm w-1/4' onClick={() => saveToken()}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddToken