import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import Navbar from '../components/Navbar'
import { logout } from '../actions/authActions'

function NavbarContainer (props) {
  let history = useHistory();
  const { auth } = useSelector(state => state);

  function handleLogout (e) {
    e.preventDefault();
    logout(); 
    history.push('/')
  }

  let loggedIn = false;
  let fullName = '';
  if ('token' in auth) {
    loggedIn = true;
    fullName = auth.user.first_name + ' ' + auth.user.last_name;
  }

  return (<Navbar loggedIn={loggedIn} fullName={fullName} handleLogout={ handleLogout }/>)
}

export default NavbarContainer;