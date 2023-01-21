import {DiReact} from 'react-icons/di'

const Create = () => {
  return (
    <section className='h-screen w-full pl-[8.3333333%] grid place-content-center'>
      <div className='flex flex-col items-center gap-5 h-full w-full'>
        <DiReact className='h-80 w-auto animate-pulse text-cyan-500'/>
        <div className='flex flex-col w-full gap-2'>
          <h2 className='text-5xl font-bold'>Create a proposal</h2>
          <input type="text" placeholder='Input yout proposal' className='text-slate-900 pl-2 placeholder:text-slate-500 rounded-md w-full h-14 outline-none focus:bg-slate-300'/>
          <button className='text-center rounded-md w-full h-14 bg-cyan-600 text-xl transition-all duration-300 ease-in hover:bg-cyan-500 '>Submit</button>
        </div> 
      </div>
    </section>
  )
}

export default Create