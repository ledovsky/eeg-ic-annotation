import { useSelector } from 'react-redux';

import { loadDatasets } from '../actions/datasetsActions';


function LoggedInActionsContainer ( props ) {
  const auth = useSelector(state => state.auth);

  if ('token' in auth) {
    loadDatasets();
  }

  console.log(auth);

  return null;
}

export default LoggedInActionsContainer;