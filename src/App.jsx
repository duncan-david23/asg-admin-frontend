import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Investors from './pages/Investors'
import Transactions from './pages/Transactions'
import Sidebar from './components/Sidebar'
import { useLocation } from 'react-router-dom'
import AuthWrapper from './components/AuthWrapper'
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  
  
 const location = useLocation()
 const isAuthPage = ['/', '/login', '/register'].includes(location.pathname)

  if (isAuthPage) {
    return (
      <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          {/* <Route path='/register' element={<Register/>} /> */}
      </Routes>
    )
  }



  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <div className='flex'>
      <Sidebar/>
   

    <Routes>
        <Route path='/dashboard' element={
          <AuthWrapper>
            <Dashboard/>
          </AuthWrapper>
      } />
        <Route path='/investors' element={
          <AuthWrapper>
            <Investors/>
          </AuthWrapper>
        } />
        <Route path='/transactions' element={
          <AuthWrapper>
            <Transactions/>
          </AuthWrapper>
        } />
    </Routes>

     </div>
     </>
  )
}

export default App