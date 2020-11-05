import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import Login from '../components/Login';
import { login } from '../actions/authActions'



function LoginContainer (props) {

  let history = useHistory();
  const [ wrongCredentials, setWrongCredentials ] = useState(false);

  function handleLogin(username, password) {
    login(username, password)
      .then(response => {
        if (response.ok) {
          history.push('/')
        } else {
          setWrongCredentials(true)
        }
      })
  }
  return (
    <Login wrongCredentials={wrongCredentials} handleLogin={handleLogin}/>
  )
}

export default LoginContainer;