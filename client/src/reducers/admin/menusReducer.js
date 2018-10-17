import {
  FETCH_MENUS_LOADING,
  FETCH_MENUS_SUCCESS,
  FETCH_MENUS_FAILURE,
  FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  DELETE_MENU_ITEM_LOADING,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE
} from '../../actions/actionTypes';
import filter from '../../helpers/filter';

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
    case FETCH_VENDOR_ENGAGEMENT_SUCCESS:
      return {
        ...state,
        vendorEngagements: payload.engagements 
      };

    case FETCH_VENDOR_ENGAGEMENT_FAILURE:
      return { 
        ...state, 
        error: {
          status: false,
          message: payload
        }
      };

    case FETCH_MENUS_FAILURE: return {
      ...state,
      error: {
        status: true,
        message: payload
      }
    };

    case 'MOCK_MENU_LIST':
      return { ...state, menuList: [...state.menuList, ...payload] };
    
    case DELETE_MENU_ITEM_LOADING:
      return { ...state, isDeleting: payload };
    
    case DELETE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        menuList: [...filter(state.menuList, payload)]
      };
    
    case DELETE_MENU_ITEM_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          message: payload
        }
      };

    default: return state;
  }
};
