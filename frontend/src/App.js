import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConnectButton from "./ConnectButton";

const Nav = lazy(()=>import('./Nav'))
const Home = lazy(()=>import('./pages/Home'));
const View = lazy(()=>import('./pages/View'));
const Create = lazy(()=>import('./pages/Create'));
const Vote = lazy(()=>import('./pages/Vote'));

function App() {
  return (
    <>
      <main className='h-screen w-full flex justify-start gap-4 bg-zinc-900 text-slate-100'>
        <ConnectButton />
        <Router>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Nav />
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/view' element={<View />}></Route>
              <Route path='/create' element={<Create />}></Route>
              <Route path='/vote' element={<Vote />}></Route>
            </Routes>
          </Suspense>
        </Router>
      </main>
    </>
  );
}

export default App;
