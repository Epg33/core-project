import { DiReact } from "react-icons/di"

const Home = () => {
  return (
    <>
      <section className='h-screen w-full pl-[8.3333333%] grid place-content-center'>
      <div className='flex flex-col items-center gap-5 h-full w-full'>
        <DiReact className='h-80 w-auto animate-pulse text-cyan-500'/>
        <h1 className='text-6xl font-bold'>Motoko Bootcamp</h1>
      </div>
      </section>
    </>
  )
}

export default Home