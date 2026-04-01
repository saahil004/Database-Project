import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [users, setU] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/users')
    .then((res) => {
      setU(res.data)
    })
  }, [])

  return (
    <>
      <div className='m-5 p-10 bg-emerald-500 flex justify-center'>
        <button className='bg-blue-400 rounded-2xl p-2' onClick={() => setCount((count) => count+1)}>
          Sign up {count}
        </button>
        {
          users.map((user, index) => (
            <div key={index}>
              <h1>{user.name}</h1>
              <h2>{user.email}</h2>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
