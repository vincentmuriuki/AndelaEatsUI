import {
  FETCH_MENUS_LOADING,
  FETCH_MENUS_SUCCESS,
  FETCH_MENUS_FAILURE
} from '../../actions/actionTypes';

import { initialAdminMenus } from '../initialState';

export default (state = initialAdminMenus, { type, payload }) => {
  switch (type) {
    case FETCH_MENUS_LOADING: return {
      ...state,
      isLoading: payload
    };

    case FETCH_MENUS_SUCCESS: return {
      ...state,
      ...payload,
      error: {
        status: false,
        message: null
      }
    };

    case FETCH_MENUS_FAILURE: return {
      ...state,
      error: {
        status: true,
        message: payload
      }
    };

    default: return state;
  }
};
