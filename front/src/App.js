import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import HomePage from './components/HomePage.jsx'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route path="/">
          <HomePage />
        </Route>
      </Router>
      <ToastContainer />

    </React.Fragment>
  );
}

export default App;
