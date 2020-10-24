import React, { useState } from 'react';


function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex items-center justify-center mt-40">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
            value={username} onChange={ e => setUsername(e.target.value) }/>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" 
            value={password} onChange={e => setPassword( e.target.value )}/>
          </div>
          { props.wrongCredentials ?
            <p className="text-red-500 text-s italic mb-4">Wrong username or password</p> : <p></p>
          }
          <div className="flex items-center justify-between">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" 
                    onClick={ e => props.handleLogin(username, password) }>
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-600" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login