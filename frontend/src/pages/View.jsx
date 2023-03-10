/*global BigInt*/
import Loader from '../Loader';
import React, { useState, useEffect, useContext  } from 'react'
import { ContextProvider } from '../context/Context';

const View = () => {
  const [content, setContent] = useState([]);
  const {daoAgent} = useContext(ContextProvider);
  const getProposals = async()=> {
    const x = await daoAgent.getProposals();;
    setContent(x)
  }
  useEffect(()=>{
    getProposals()
  }, [])
  if(!content) return <Loader />
  return (
    <section className='h-screen w-full pl-[12.3333333%]'>
      <h1 className='text-6xl pt-9 mb-3'>PROPOSALS</h1>
      <div className='w-full h-5/6 flex flex-col gap-6 overflow-y-scroll'>
         {
          content.map((prop, index)=>{
            return <div key={index} className='h-1/4 w-4/5 rounded-xl border-2 border-solid border-slate-100 p-3'>
              <h2 className='text-3xl'>{BigInt(prop[0]).toString()}</h2>
              { <p>{prop.user}</p> }
              <p>Change the website text to: {prop[1].body}</p>
              <p>Yes: {BigInt(prop[1].voteCount.yes).toString()}, No: {BigInt(prop[1].voteCount.no).toString()}</p>
            </div>
         })}
      </div>
    </section>
  )
}

export default View