import { combineReducers } from 'redux';

import userReducer from './userReducer';
import ordersReducer from './ordersReducer';
import menuReducer from './menuReducer';
import vendorsReducer from './vendorsReducer';
import mealOrdersReducer from './admin/ordersReducer';
import mealItemsReducer from './admin/mealItemsReducer';

export default combineReducers({
  userReducer,
  upcomingMenus: menuReducer,
  orders: ordersReducer,
  allVendors: vendorsReducer,
  mealOrders: mealOrdersReducer,
  mealItems: mealItemsReducer,
});
