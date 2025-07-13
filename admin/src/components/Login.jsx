import React, { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { backendUrl } from './App' // adjust the path as per your structure

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()

      const response = await axios.post(
        backendUrl + '/api/user/admin',
        { email, password }
      )

      console.log(response)

      // Assuming backend sends token in `response.data.token`
      if (response.data.success) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message || 'Login failed')
      }

    } catch (error) {
      console.error(error)
      alert('Login error: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-1'>Email</p>
            <input
              type='email'
              className='rounded-md w-full px-3 py-2 border border-gray-300'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='mb-4 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-1'>Password</p>
            <input
              type='password'
              className='rounded-md w-full px-3 py-2 border border-gray-300'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
