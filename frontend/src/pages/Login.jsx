import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    if (currentState === 'Sign Up') {
      const response = await axios.post(backendUrl + '/api/user/register', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success('Registration successful!');
        navigate('/'); // Navigate to homepage or dashboard
      } else {
        toast.error(response.data.message);
      }
    } else {
      const response = await axios.post(backendUrl + '/api/user/login', {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message || 'Something went wrong!');
  }
};

useEffect(() => {
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    setToken(savedToken);
    navigate('/'); // Navigate to homepage or dashboard
  }
}, []);



  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Login' ? null : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className="cursor-pointer"
          >
            Login instead
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState}
      </button>
    </form>
  );
};

export default Login;
