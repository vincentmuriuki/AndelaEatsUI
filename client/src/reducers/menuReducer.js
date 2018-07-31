import {
  SET_MENUS, SELECT_MEAL, MAKE_ORDER_SUCCESS, RESET_MENU, MAKE_ORDER_FAILURE, MENU_IS_LOADING
} from '../actions/actionTypes';
import { initialMenus } from './initialState';

const menuReducer = (state = initialMenus, action) => {
  switch (action.type) {
    case SET_MENUS:
      return { ...state, menus: action.payload };
    case SELECT_MEAL:
      return { ...state, [action.payload.prop]: action.payload.value };
    case MAKE_ORDER_SUCCESS:
      return { ...state, message: action.payload.message };
    case MAKE_ORDER_FAILURE:
      return { ...state, message: action.payload.message };
    case RESET_MENU: 
      return {
        ...state, acc1: '', acc2: '', mainMeal: '', message: ''
      };
    case MENU_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
export default menuReducer;
