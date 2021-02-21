import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import HomePage from './components/HomePage';
import Login from './containers/LoginContainer';
import Navbar from './containers/NavbarContainer';
import Footer from './components/Footer';
import Datasets from './containers/DatasetsContainer';
import DatasetView from './containers/DatasetViewContainer';
import ComponentAnnotation from './containers/ComponentAnnotationContainer';
import AnnotationList from './containers/AnnotationListContainer';
import Downloads from './containers/DownloadsContainer';
import NotFound from './components/NotFound';


function App() {
  return (
    <React.Fragment>
      <div className="flex-auto">
        <Router basename={`${process.env.PUBLIC_URL}`}>
          <Navbar />
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/datasets">
              <Datasets />
            </Route>
            <Route exact path="/datasets/:dataset_id">
              <DatasetView />
            </Route>
            <Route exact path="/downloads" component={Downloads} />
            <Route exact path="/ic/:ic_id/" component={AnnotationList} />
            <Route exact path="/ic/:ic_id/annotate" component={ComponentAnnotation} />
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
