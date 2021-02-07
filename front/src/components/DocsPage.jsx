import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import GeneralAbout from '../docs/GeneralAbout';
import GeneralSharing from '../docs/GeneralSharing';
import GeneralContribute from '../docs/GeneralContribute';

function SidebarItem (props) {
  return (
    <p className="pt-6">
      <span className="text-lg font-bold text-gray-800">{props.children}</span>
    </p>
  )
}

function SidebarSubItem (props) {
  return (
    <p className="pt-3">
      <a className="text-gray-700 hover:text-gray-900 hover:font-bold" href={props.url}>{props.children}</a>
    </p>
  )
}


function DocsPage (props) {
  return (
    <div className="container mx-auto grid grid-cols-4">
      <div className="col-span-1 px-10">
        <SidebarItem>General information</SidebarItem>
        <SidebarSubItem url='/docs/about'>About the ALICE project</SidebarSubItem>
        <SidebarSubItem url='/docs/sharing-policy'>Sharing Policy</SidebarSubItem>
        <SidebarSubItem url='/docs/contribute'>How to contribute</SidebarSubItem>
        <SidebarItem>Annotation Tool Guide</SidebarItem>
        {/* <SidebarSubItem>Getting started</SidebarSubItem> */}
        <SidebarItem>Dataset Guide</SidebarItem>
      </div>
      <div className="col-span-3 px-10 mt-6">
        <Router>
          <Switch>
            <Route exact path="/docs/">
              <Redirect to="/docs/about"/>
            </Route>
            <Route path="/docs/about" component={GeneralAbout} />
            <Route path="/docs/sharing-policy" component={GeneralSharing} />
            <Route path="/docs/contribute" component={GeneralContribute} />
          </Switch>
        </Router>

      </div>
    </div>
  );
}
  
export default DocsPage;