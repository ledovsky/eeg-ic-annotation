import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import HomePage from './components/HomePage'
import Login from './containers/LoginContainer'
import Navbar from './containers/NavbarContainer'
import Footer from './components/Footer'
import Datasets from './containers/DatasetsContainer'
import DatasetView from './containers/DatasetViewContainer'
import NotFound from './components/NotFound'

function App() {
  return (
    <React.Fragment>
      <div className="flex-auto">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/datasets">
              <Datasets />
            </Route>
            <Route exact path="/datasets/:dataset_name">
              <DatasetView />
            </Route>
            <Route exact path="/404">
              <NotFound />
            </Route>
            <Redirect to="/404" />
          </Switch>
        </Router>
        <ToastContainer />
      </div>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
