import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

import GeneralAbout from '../docs/GeneralAbout';
import GeneralSharing from '../docs/GeneralSharing';
import GeneralContribute from '../docs/GeneralContribute';
import DatasetsKids from '../docs/DatasetsKids';
import DatasetsStructure from '../docs/DatasetsStructure';

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
      <Link className="text-gray-700 hover:text-gray-900 hover:font-bold" to={props.url}>{props.children}</Link>
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
        <SidebarItem>Datasets</SidebarItem>
        <SidebarSubItem url='/docs/datasets-structure'>Download files structure</SidebarSubItem>
        <SidebarSubItem url='/docs/datasets-kids'>Kids Dataset</SidebarSubItem>
      </div>
      <div className="col-span-3 px-10 mt-6">
        <Switch>
          <Route exact path="/docs/">
            <Redirect to="/docs/about"/>
          </Route>
          <Route path="/docs/about" component={GeneralAbout} />
          <Route path="/docs/sharing-policy" component={GeneralSharing} />
          <Route path="/docs/contribute" component={GeneralContribute} />
          <Route path="/docs/datasets-structure" component={DatasetsStructure} />
          <Route path="/docs/datasets-kids" component={DatasetsKids} />
        </Switch>

      </div>
    </div>
  );
}
  
export default DocsPage;