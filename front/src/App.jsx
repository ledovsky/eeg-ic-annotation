import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import HomePage from './components/HomePage'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <React.Fragment>
      <div className="flex-auto">
        <Navbar />
        <Router>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Router>
        <ToastContainer />
      </div>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
