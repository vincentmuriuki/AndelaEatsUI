import { SET_MENUS } from '../actions/actionTypes';
import initialState from './initialState';

const menuReducer = (state = initialState.menus, action) => {
  switch (action.type) {
    case SET_MENUS:
      return action.payload;
    default:
      return state;
  }
};
export default menuReducer;
