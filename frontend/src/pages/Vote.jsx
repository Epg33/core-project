import { DiReact } from "react-icons/di"

const Vote = () => {
  return (
    <section className='h-screen w-full pl-[8.3333333%] grid place-content-center'>
      <div className='flex flex-col items-center gap-5 h-full w-full'>
        <DiReact className='h-80 w-auto animate-pulse text-cyan-500'/>
        <div className='flex flex-col w-full gap-2'>
          <h2 className='text-5xl font-bold'>Input a proposal ID</h2>
          <input type="text" placeholder='Input your proposal ID' className='text-slate-900 pl-2 placeholder:text-slate-500 rounded-md w-full h-14 outline-none focus:bg-slate-300'/>
          <div className="w-full h-fit flex gap-2">
            <button className='text-center rounded-md w-2/4 h-14 bg-cyan-600 text-xl transition-all duration-300 ease-in hover:bg-cyan-500 '>Vote Yes</button>
            <button className='text-center rounded-md w-2/4 h-14 bg-red-600 text-xl transition-all duration-300 ease-in hover:bg-red-500 '>Vote No</button>
          </div>
        </div> 
      </div>
    </section>
  )
}

export default Vote