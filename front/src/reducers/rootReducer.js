import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import DatasetsReducer from './datasetsReducer';

export default combineReducers({
  auth: AuthReducer,
  datasets: DatasetsReducer,
})