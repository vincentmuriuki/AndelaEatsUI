import axios from 'axios';
import { toastSuccess, toastError } from '../../helpers/toast';

import {
  FETCH_MENUS_LOADING,
  FETCH_MENUS_SUCCESS,
  FETCH_MENUS_FAILURE,
  FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  DELETE_MENU_ITEM_LOADING,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE
} from '../actionTypes';

import { formatCurrentDate } from '../../helpers';
import { config } from '../../config';

export const baseUrl = config.ANDELAEATS_API_BASE_URL;

export const fetchMenusLoading = isLoading => ({
  type: FETCH_MENUS_LOADING,
  payload: isLoading
});

export const fetchMenusSuccess = (menus) => ({
  type: FETCH_MENUS_SUCCESS,
  payload: menus
});

export const fetchMenusError = (message) => ({
  type: FETCH_MENUS_FAILURE,
  payload: message
});

export const mockMenu = menuList => dispatch => dispatch({
  type: 'MOCK_MENU_LIST',
  payload: menuList
});

export const fetchMenus = () => (dispatch) => {
  const date = formatCurrentDate();

  dispatch(fetchMenusLoading(true));
  return axios.get(`${baseUrl}/admin/menu/lunch/${date}`, {
    headers: {
      'X-Location': 1
    }
  })
    .then(response => {
      const { payload } = response.data;

      dispatch(fetchMenusSuccess(payload));
      dispatch(fetchMenusLoading(false));
    })
    .catch(() => {
      dispatch(fetchMenusError(null));
      dispatch(fetchMenusLoading(false));
    });
};

const deleteMenuItemLoading = isDeleting => ({
  type: DELETE_MENU_ITEM_LOADING,
  payload: isDeleting
});

const deleteMenuItemFailure = error => ({
  type: DELETE_MENU_ITEM_FAILURE,
  payload: error
});

const deleteMenuItemSuccess = menuId => ({
  type: DELETE_MENU_ITEM_SUCCESS,
  payload: menuId
});

export const deleteMenuItem = menuId => dispatch => {
  dispatch(deleteMenuItemLoading(true));
  return axios.delete(`${baseUrl}/admin/menu/${menuId}`, {
    headers: {
      'X-Location': 1
    }
  })
    .then(() => {
      toastSuccess('Deleted Successfully');
      dispatch(deleteMenuItemSuccess(menuId));
      dispatch(deleteMenuItemLoading(false));
    })
    .catch(error => {
      const { data: { msg } } = error.response;
      toastError(msg);
      dispatch(deleteMenuItemFailure(msg));
      dispatch(deleteMenuItemLoading(false));
    });
};

const fetchVendorEngagementSuccess = engagements => ({
  type: FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  payload: engagements
});

const fetchVendorEngagementFailure = payload => ({
  type: FETCH_VENDOR_ENGAGEMENT_FAILURE,
  payload
});

export const fetchVendorEngagements = () => dispatch => axios
  .get(`${baseUrl}/engagements/`, {
    headers: {
      'X-Location': 1
    }
  })
  .then((response) => {
    const { payload } = response.data;
    dispatch(fetchVendorEngagementSuccess(payload));
  }).catch((error) => {
    dispatch(fetchVendorEngagementFailure(error));
  });
