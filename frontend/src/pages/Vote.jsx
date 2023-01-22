import { useContext, useRef, useState } from "react";
import { DiReact } from "react-icons/di"
import { ContextProvider } from "../context/Context";
import Loader from "../Loader";

const Vote = () => {
  const [loading, setLoading] = useState(false);
  const proposal = useRef();
  const {daoAgent} = useContext(ContextProvider)

  const vote = async (pass) => {
    try {
      const xd = await daoAgent.voteProposal(Number(proposal.current.value), pass)
      console.log(xd);
      setLoading(false);
      alert('Propuesta votada correctamente')
    } catch (err) {
      console.log(err);
    }
  }

  if(loading) return <Loader />
  return (
    <section className='h-screen w-full pl-[8.3333333%] grid place-content-center'>
      <div className='flex flex-col items-center gap-5 h-full w-full'>
        <DiReact className='h-80 w-auto animate-pulse text-cyan-500'/>
        <div className='flex flex-col w-full gap-2'>
          <h2 className='text-5xl font-bold'>Input a proposal ID</h2>
          <input type="Number" placeholder='Input your proposal ID' ref={proposal} className='text-slate-900 pl-2 placeholder:text-slate-500 rounded-md w-full h-14 outline-none focus:bg-slate-300'/>
          <div className="w-full h-fit flex gap-2">
            <button onClick={()=>{setLoading(true);vote(true)}} className='text-center rounded-md w-2/4 h-14 bg-cyan-600 text-xl transition-all duration-300 ease-in hover:bg-cyan-500'>Vote Yes</button>
            <button onClick={()=>{setLoading(true);vote(false)}} className='text-center rounded-md w-2/4 h-14 bg-red-600 text-xl transition-all duration-300 ease-in hover:bg-red-500'>Vote No</button>
          </div>
        </div> 
      </div>
    </section>
  )
}

export default Vote