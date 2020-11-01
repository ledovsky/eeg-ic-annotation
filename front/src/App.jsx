import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import HomePage from './components/HomePage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div id="app">
      <Navbar />
      <Router>
        <Route path="/">
          <HomePage />
        </Route>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
