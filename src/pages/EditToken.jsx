import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import logo from '../assets/logo.svg';
import star from '../assets/shooting-star.svg';

function EditToken() {
  // Criando estados
  const [alert, setAlert] = useState(false);
  const [findToken, setFindToken] = useState(null);
  const [token, setToken] = useState();
  const [balance, setBalance] = useState();
  // Pegando o parametro para pesquisar o token no localStorage
  const { id } = useParams()
  const navigate = useNavigate()
  const localTokens = JSON.parse(localStorage.getItem("tokens"))

  useEffect(() => {
      // Procurando o token na lista do localStorage
      const findToken = localTokens.find((eachToken) => eachToken.token === id)
      setFindToken(findToken);
  }, [])
  const saveToken = () => {
    // Encontro o index do elemento que quero editar na lista do localStorage
    const indexId = localTokens.findIndex((eachToken) => eachToken.token === id)
    const editToken = localTokens[indexId]
    // Atualizando o valor do token e do balance utilizando o input value.
    editToken.token = token ?? findToken.token;
    editToken.balance = balance ?? findToken.balance;
    localStorage.setItem("tokens", JSON.stringify(localTokens))
    navigate('/') 
  }
  const removeToken = () => {
    // Filtrando todos os objetos para que consiga excluir o token escolhido.
    const newTokens = localTokens.filter((eachToken) => eachToken.token !== findToken.token)
    navigate('/')  
    localStorage.setItem("tokens", JSON.stringify(newTokens));
  }
  return (
    // Verificando se o findToken existe para renderizar tudo.
    (findToken === null ? '' :
    <div className='bg-backG h-screen w-screen items-center flex flex-col'>
      {/* Logo com link para a Home  */}
      <Link to='/' className='justify-center flex w-52 mb-16 mt-10'>
        <img src={logo} alt="Logo Klever"/>
      </Link>
      <div className='flex w-1/3 rounded-xl flex-col '>
        <div className='flex justify-between items-center'>
          <div className='flex items-center justify-between'>
            <img src={star} alt="Estrela" className='w-12' data-testid='estrelaLogoEdit'/>
            <h1 className='text-white font-bold text-5xl' data-testid='wishH1Edit'>Wish Wallet</h1>
          </div>
        </div>
        <div className='flex m-10 justify-between items-center'>
          <h1 className='text-white font-bold text-2xl'>Edit Token</h1>
          <Link to='/' data-testid="buttonBack" className='font-bold text-white bg-cinza p-2 px-9 rounded-lg text-sm'>Voltar</Link> 
        </div>
        {/* Div de alerta que só aparece quando o state 'alert' está ativo */}
        <div className=' flex justify-center items-center'>
          {alert ? 
          <div className='flex w-1/4 bg-alert shadow-3xl fixed p-8 rounded-xl flex-col items-center '>
            <div>
              <h1 className='text-white'>Você tem certeza que quer remover esse Token ?</h1>
            </div>
            <div className='flex mt-7'>
              <button className='font-bold text-white bg-red-600 p-2 px-6 mr-20 rounded-lg text-sm w-1/2 ' onClick={() => removeToken()} >
                Remover
              </button>
              <button
              className='font-bold text-white bg-gray-500 p-2 px-6  rounded-lg text-sm w-1/2'
              onClick={() => setAlert(false) }
              >
                Cancelar
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
              value={token ?? findToken.token}
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
              value={balance ?? findToken.balance}
              data-testid="balanceInput"
              //Atualizando o state com o valor do input.
              onChange={(event) => setBalance(event.target.value)}
              />
            </label>
          </fieldset>
        </form> 
        <div className='flex justify-between m-10 mt-0 items-center' >
          <button className='font-bold text-white bg-red-600 p-2 rounded-lg text-sm w-1/4 ' onClick={() => setAlert(true)}>
            Remove
          </button>
          <button className='font-bold text-white bg-purple p-2 px-7 rounded-lg text-sm w-1/4' onClick={() => saveToken()}>
            Save
          </button>
        </div>
      </div>
    </div>
    )
  )
}

export default EditToken