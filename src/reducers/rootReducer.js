import { combineReducers } from 'redux';

import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
import ordersReducer from './ordersReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  userReducer,
  upcomingMenus: menuReducer,
  isLoading: loadingReducer,
  orders: ordersReducer
});
