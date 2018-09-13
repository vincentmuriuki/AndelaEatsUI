import {
  FETCH_VENDORS_LOADING,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  CREATE_VENDOR_LOADING,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILURE
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
    case CREATE_VENDOR_LOADING:
      return { ...state, isCreating: action.payload };
    case CREATE_VENDOR_SUCCESS:
      return { ...state, vendors: [...state.vendors, action.payload] };
    case CREATE_VENDOR_FAILURE:
      return state;
    default:
      return state;
  }
};

export default vendorsReducer;
