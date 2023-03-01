import React from 'react'
import logo from '../assets/logo.svg';
import star from '../assets/shooting-star.svg';
import edit from '../assets/edit.svg';
import { Link } from "react-router-dom";
function Home() {
  const tokens = JSON.parse(localStorage.getItem("tokens")) ?? []

   // Lista de Tokens no LocalStorage
  const htmlToken = tokens.map((eachToken) =>
  <div className='flex items-center m-3' key={eachToken.token}>
    <Link className='w-6 mr-1' to={`/edittoken/${eachToken.token}`}>
      <img src={edit} alt="Botão de editar"/>
    </Link>
    <h1 className="text-white font-semibold text-3xl">{eachToken.token}</h1>
  </div> )

  // Lista de balances no LocalStorage
  const htmlBalance = tokens.map((eachToken) => 
  <div className="m-3" key={eachToken.token}>
    <h1 className="text-white font-bold text-3xl flex justify-end">
      {Number(eachToken.balance).toLocaleString('pt-br', {minimumFractionDigits: 2})}
    </h1>
  </div>
  )

  return (
    <div className='bg-backG h-screen w-screen items-center flex flex-col'>
      <div className='justify-center flex w-52 mb-16 mt-10'>
          <img src={logo} alt="Logo Klever" aria-label="logoKlever"/>
      </div>
      <div className='flex w-1/3  rounded-xl flex-col '>
        <div className='flex items-center justify-between'>
          <div className='flex'>
            <img src={star} alt="Estrela" className='w-12' aria-label='estrelaLogo'/>
            <h1 className='text-white font-bold text-5xl' aria-label='wishH1'>Wish Wallet</h1>
          </div>
          <Link data-testid="buttonAdd" to='/addtoken' className='font-bold text-white bg-purple p-2 px-5 rounded-lg text-xl'>Add Token</Link>
        </div>
        {/* Verificando se tem tokens no localStorage para poder renderizar  */}
        { tokens.length === 0 ? <h1 className='text-white font-medium text-3xl mt-20'> Você não tem nenhum token adicionado ainda</h1> :
        <div className='flex m-8 mt-16 justify-between'>
          <div >
            <h1 className= 'text-white font-medium text-lg ml-10'>Tokens</h1>
            {htmlToken}            
          </div>
          <div>
            <h1 className='text-white font-medium text-lg flex justify-end'>Balance</h1>
            {htmlBalance}
          </div>
        </div>
        }
      </div>
    </div>
  )
}

export default Home