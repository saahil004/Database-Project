import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='m-5 p-10 bg-emerald-500 flex justify-center'>
        <button className='bg-blue-400 rounded-2xl p-2' onClick={() => setCount((count) => count+1)}>
          Sign up {count}
        </button>
      </div>
    </>
  )
}

export default App
