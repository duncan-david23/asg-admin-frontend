import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Investors from './pages/Investors'
import Transactions from './pages/Transactions'
import Sidebar from './components/Sidebar'
import { useLocation } from 'react-router-dom'

const App = () => {
  
  
 const location = useLocation()
 const isAuthPage = ['/'].includes(location.pathname)

  if (isAuthPage) {
    return (
      <Routes>
          <Route path='/' element={<Auth/>} />
      </Routes>
    )
  }



  return (

    <div className='flex'>
      <Sidebar/>
   

    <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/investors' element={<Investors/>} />
        <Route path='/transactions' element={<Transactions/>} />
    </Routes>

     </div>
  )
}

export default App