import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'

import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'
const App = () => {
  const [token, setToken] = useState(localStorage.getItem(token) ?localStorage.getItem(token) : "");

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen text-gray-600'>
      <ToastContainer/>
      {
        token === ""
          ? <Login  setToken={setToken}/>
          : <>
              <Navbar />
              <hr />
              <div className='flex w-full'>
                <Sidebar />
                <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8'>
                  <Routes>
                    <Route path='/add' element={<Add setToken={setToken}/>} />
                    <Route path='/list' element={<List setToken={setToken}/>} />
                    <Route path='/orders' element={<Orders setToken={setToken}/>} />
                  </Routes>
                </div>
              </div>
            </>
      }
    </div>
  )
}

export default App
