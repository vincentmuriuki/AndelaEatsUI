import {
  FETCH_VENDORS_LOADING,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
} from '../actions/actionTypes';

import { initialVendors } from './initialState';

const vendorsReducer = (state = initialVendors, action) => {
  switch (action.type) {
    case FETCH_VENDORS_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_VENDORS_SUCCESS:
      return { ...state, vendors: action.payload };
    case FETCH_VENDORS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default vendorsReducer;
