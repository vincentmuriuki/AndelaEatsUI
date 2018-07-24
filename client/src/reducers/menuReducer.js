import { SET_MENUS, SELECT_MEAL } from '../actions/actionTypes';
import { initialMenus } from './initialState';

const menuReducer = (state = initialMenus, action) => {
  switch (action.type) {
    case SET_MENUS:
      return { ...state, menus: action.payload };
    case SELECT_MEAL:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
export default menuReducer;
