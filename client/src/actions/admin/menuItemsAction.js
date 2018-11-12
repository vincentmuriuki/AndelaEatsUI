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
  DELETE_MENU_ITEM_FAILURE,
  FETCH_MEALITEMS_SUCCESS,
  FETCH_MEALITEMS_FAILURE,
  CREATE_MENU_LOADING,
  CREATE_MENU_SUCCESS,
  CREATE_MENU_FAILURE,
  UPDATE_MENU_LOADING,
  UPDATE_MENU_SUCCESS,
  UPDATE_MENU_FAILURE,
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

export const fetchMenus = (startDate, endDate) => (dispatch) => {
  dispatch(fetchMenusLoading(true));
  return axios.get(`${baseUrl}/admin/menus/lunch/${startDate}/${endDate}`, {
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
  return axios.delete(`${baseUrl}/admin/menus/${menuId}`, {
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

const fetchMealItemsSuccess = mealItems => ({
  type: FETCH_MEALITEMS_SUCCESS,
  payload: mealItems
});

const fetchMealItemsFailure = payload => ({
  type: FETCH_MEALITEMS_FAILURE,
  payload
});

export const fetchMealItems = () => dispatch => axios
  .get(`${baseUrl}/meal-items/`, { 
    headers: { 
      'X-Location': 1 
    } 
  })
  .then((response) => {
    const { payload } = response.data;
    dispatch(fetchMealItemsSuccess(payload));
  })
  .catch((error) => {
    dispatch(fetchMealItemsFailure(error));
  });

const updateMenuLoading = payload => ({
  type: UPDATE_MENU_LOADING,
  payload
});

const updateMenuSuccess = mealItems => ({
  type: UPDATE_MENU_SUCCESS,
  payload: mealItems
});

const updateMenuFailure = message => ({
  type: UPDATE_MENU_FAILURE,
  payload: message
});

export const updateMenu = (id, menu) => dispatch => {
  dispatch(updateMenuLoading(true));

  return axios.put(`${baseUrl}/admin/menus/${id}`, menu, { 
    headers: { 
      'X-Location': 1 
    } 
  })
    .then((response) => {
      const { msg, payload } = response.data;
      toastSuccess(msg);
      dispatch(updateMenuSuccess(payload));
      dispatch(updateMenuLoading(false));
    })
    .catch((error) => {
      console.log({ error });
      toastError(error);
      dispatch(updateMenuFailure(error));
      dispatch(updateMenuLoading(false));
    });
};

const createMenuLoading = payload => ({
  type: CREATE_MENU_LOADING,
  payload
});

const createMenuSuccess = mealItems => ({
  type: CREATE_MENU_SUCCESS,
  payload: mealItems
});

const createMenuFailure = message => ({
  type: CREATE_MENU_FAILURE,
  payload: message
});

export const createMenu = menu => dispatch => {
  dispatch(createMenuLoading(true));

  return axios.post(`${baseUrl}/admin/menus/`, menu, { 
    headers: { 
      'X-Location': 1 
    } 
  })
    .then((response) => {
      const { msg, payload } = response.data;
      toastSuccess(msg);
      dispatch(createMenuSuccess(payload));
      dispatch(createMenuLoading(false));
    })
    .catch((error) => {
      toastError(error);
      dispatch(createMenuFailure(error));
      dispatch(createMenuLoading(false));
    });
};
