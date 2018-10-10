import axios from 'axios';

import {
  FETCH_MENUS_LOADING,
  FETCH_MENUS_SUCCESS,
  FETCH_MENUS_FAILURE
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

export const fetchMenus = () => (dispatch) => {
  const date = formatCurrentDate();

  dispatch(fetchMenusLoading(true));
  return axios.get(`${baseUrl}/admin/menu/lunch/${date}`, {
    headers: {
      'X-Location': 1
    }
  })
    .then(response => {
      const menus = response.data;

      dispatch(fetchMenusSuccess(menus));
      dispatch(fetchMenusLoading(false));
    })
    .catch(() => {
      dispatch(fetchMenusError(null));
      dispatch(fetchMenusLoading(false));
    });
};
