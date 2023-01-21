import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import {idlFactory} from './Canisters/backend/backend.did.js'
import { ContextProvider } from './context/Context.jsx'

const ConnectButton = () => {
  const {setLoged, setDaoAgent} = useContext(ContextProvider)
  const handleClick = async (e) => {
    const canisterId = '';
    const principalKey = await window.ic.plug.requestConnect({
      whiteList: [canisterId]
    });
    if(!principalKey) {console.log('denied')}
    console.log(principalKey);
    const principal = await window.ic.plug.agent.getPrincipal();
    const dao = await window.ic.plug.createActor({
      canisterId: canisterId,
      interfaceFactory : idlFactory
    });
    localStorage.setItem('daoAgent', dao);
    setDaoAgent(dao)
    setLoged(principal)
  }
  return (
    <button onClick={()=>handleClick()} className='absolute h-10 w-32 rounded-lg text-2xl bg-slate-600 text-slate-100 right-8 top-4 transition-colors duration-300 hover:bg-slate-400'>
      Connect
    </button>
  )
}

export default ConnectButton