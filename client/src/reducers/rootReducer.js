import { combineReducers } from 'redux';

import userReducer from './userReducer';
import ordersReducer from './ordersReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  userReducer,
  upcomingMenus: menuReducer,
  orders: ordersReducer
});
