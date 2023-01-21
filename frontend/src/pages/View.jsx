import React from 'react'

const View = () => {
  const proposals = [{
    user: '6tyot-2m6qr-z7xm7-gkmew-xmldo-wnmnt-7yry3-alxje-uxxc7-c3bhd-nqe',
    body : 'I want an apple',
    voteCount : {
      yes: 100,
      no: 0
    },
    passed: false
  },
  {
    user: '6tyot-2m6qr-z7xm7-gkmew-xmldo-wnmnt-7yry3-alxje-uxxc7-c3bhd-nqe',
    body : 'I want an apple',
    voteCount : {
      yes: 100,
      no: 0
    },
    passed: false
  },
  {
    user: '6tyot-2m6qr-z7xm7-gkmew-xmldo-wnmnt-7yry3-alxje-uxxc7-c3bhd-nqe',
    body : 'I want an apple',
    voteCount : {
      yes: 100,
      no: 0
    },
    passed: false
  },
  {
    user: '6tyot-2m6qr-z7xm7-gkmew-xmldo-wnmnt-7yry3-alxje-uxxc7-c3bhd-nqe',
    body : 'I want an apple',
    voteCount : {
      yes: 100,
      no: 0
    },
    passed: false
  },
  {
    user: '6tyot-2m6qr-z7xm7-gkmew-xmldo-wnmnt-7yry3-alxje-uxxc7-c3bhd-nqe',
    body : 'I want an apple',
    voteCount : {
      yes: 100,
      no: 0
    },
    passed: false
  },
  {
    user: '6tyot-2m6qr-z7xm7-gkmew-xmldo-wnmnt-7yry3-alxje-uxxc7-c3bhd-nqe',
    body : 'I want an apple',
    voteCount : {
      yes: 100,
      no: 0
    },
    passed: false
  },
  {
    user: '6tyot-2m6qr-z7xm7-gkmew-xmldo-wnmnt-7yry3-alxje-uxxc7-c3bhd-nqe',
    body : 'I want an apple',
    voteCount : {
      yes: 100,
      no: 0
    },
    passed: false
  },
  {
    user: '6tyot-2m6qr-z7xm7-gkmew-xmldo-wnmnt-7yry3-alxje-uxxc7-c3bhd-nqe',
    body : 'I want an apple',
    voteCount : {
      yes: 100,
      no: 0
    },
    passed: false
  },
  {
    user: '6tyot-2m6qr-z7xm7-gkmew-xmldo-wnmnt-7yry3-alxje-uxxc7-c3bhd-nqe',
    body : 'I want an apple',
    voteCount : {
      yes: 100,
      no: 0
    },
    passed: false
  }
]
  return (
    <section className='h-screen w-full pl-[12.3333333%]'>
      <h1 className='text-6xl pt-9 mb-3'>PROPOSALS</h1>
      <div className='w-full h-5/6 flex flex-col gap-6 overflow-y-scroll'>
        {
          proposals.map((prop, index)=>{
            return <div key={index} className='h-1/4 w-4/5 rounded-xl border-2 border-solid border-slate-100 p-3'>
              <h2 className='text-3xl'>{index}</h2>
              <p>{prop.user}</p>
              <p>Change the website text to: {prop.body}</p>
              <p>Yes: {prop.voteCount.yes}, No: {prop.voteCount.no}</p>
            </div>
          })
        }
      </div>
    </section>
  )
}

export default View