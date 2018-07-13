import { combineReducers } from 'redux';

import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
import ordersReducer from './ordersReducer';

const rootReducer = combineReducers({
  userReducer,
  upcomingMenus: ordersReducer,
  isLoading: loadingReducer
});
export default rootReducer;