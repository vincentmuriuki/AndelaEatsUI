import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_LOADING,
  FETCH_FILTERED_ORDERS,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  EDIT_ORDER_SUCCESS, 
  EDIT_ORDER_FAILURE 
} from '../actions/actionTypes';

import { orders } from './initialState';

export default (state = orders, action) => {
  switch (action.type) {
    case FETCH_ORDERS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state, ...action.orders, isFiltered: false, error: ''
      };
    case FETCH_ORDERS_FAILURE:
      return { ...state, error: action.error };
    case FETCH_FILTERED_ORDERS:
      return {
        ...state, ...action.orders, isFiltered: true, error: ''
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        totalRecords: state.totalRecords - 1,
        meals: state.meals.filter(meal => meal.id !== action.id)
      };
    case DELETE_ORDER_FAILURE:
      return { ...state, error: action.error };
    case EDIT_ORDER_SUCCESS: 
      return {
        ...state,
        menu: action.payload
      };
    case EDIT_ORDER_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
