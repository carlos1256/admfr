import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Expenses from './views/Expenses'
import Navbar from './views/Navbar'
import Purchase from './views/Purchase'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
 <div className="flex">
    <Navbar></Navbar>
    
    <div className='w-full md:w-[90%] p-1.5'>
      <Expenses ></Expenses>
      <Purchase></Purchase> 
    </div>
    
 </div>
    
   
    
     
    </>
  )
}

export default App
