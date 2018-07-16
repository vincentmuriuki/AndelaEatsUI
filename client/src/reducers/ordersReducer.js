import {
  FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, FETCH_ORDERS_LOADING
} from '../actions/actionTypes';

import { orders } from './initialState';

export default (state = orders, action) => {
  switch (action.type) {
    case FETCH_ORDERS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, ...action.orders };
    case FETCH_ORDERS_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
