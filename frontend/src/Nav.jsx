import { NavLink } from "react-router-dom"
import {AiFillHome, AiFillRocket, AiFillStar} from 'react-icons/ai'
import {FaVoteYea} from 'react-icons/fa'

const Nav = () => {
  return (
    <>
      <nav className="h-screen w-1/12 fixed flex flex-col items-center justify-start gap-6 pt-6">
        <NavLink className='flex gap-2 items-center w-4/5 h-8 justify-start pl-2 rounded-lg transition-all duration-300 ease-linear hover:bg-slate-200 hover:text-slate-900' to='/'><AiFillHome/> Home</NavLink>
        <NavLink className='flex gap-2 items-center w-4/5 h-8 justify-start pl-2 rounded-lg transition-all duration-300 ease-linear hover:bg-slate-200 hover:text-slate-900' to='/view'><AiFillRocket /> View</NavLink>
        <NavLink className='flex gap-2 items-center w-4/5 h-8 justify-start pl-2 rounded-lg transition-all duration-300 ease-linear hover:bg-slate-200 hover:text-slate-900' to='/create'><AiFillStar /> Create</NavLink>
        <NavLink className='flex gap-2 items-center w-4/5 h-8 justify-start pl-2 rounded-lg transition-all duration-300 ease-linear hover:bg-slate-200 hover:text-slate-900' to='/vote'><FaVoteYea /> Vote</NavLink>
      </nav>
    </>
  )
}

export default Nav