import React, { Component } from 'react'

function NavbarItemMain(props) {
  return (
    <li className="ml-6">
      <a className="text-indigo-500 hover:text-indigo-600 font-bold" href="#">{props.children}</a>
    </li>
  )
}
function NavbarItem(props) {
  return (
    <li className={`mr-6 ${props.margin ? 'ml-auto' : ''}`}>
      <a className="text-gray-700 hover:text-gray-800" href="#">{props.children}</a>
    </li>
  )
}

NavbarItem.defaultProps = {
  color: 'gray',
  bold: false
};

function Navbar() {
  return (
    <React.Fragment>
      <div className="py-5 px-2">
        <ul className="flex">
          <NavbarItemMain>Skoltech/IHNA EEG ICA</NavbarItemMain>
          <NavbarItem margin>Explore</NavbarItem>
          <NavbarItem>About</NavbarItem>
          <NavbarItem>Downloads</NavbarItem>
          <NavbarItem>Login To Annotation Tool</NavbarItem>
        </ul>
      </div>
      <hr className="mb-5"/>

    </React.Fragment>
  );
}
  
  export default Navbar;