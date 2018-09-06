import axios from 'axios';
import {
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  FETCH_VENDORS_LOADING,
} from './actionTypes';

import { config } from '../config';

export const baseUrl = config.ANDELAEATS_API_BASE_URL;

export const fetchVendorsLoading = isLoading => ({
  type: FETCH_VENDORS_LOADING,
  payload: isLoading
});

export const fetchVendorsSuccess = vendors => ({
  type: FETCH_VENDORS_SUCCESS,
  payload: vendors,
});

export const fetchVendorsFailure = error => ({
  type: FETCH_VENDORS_FAILURE,
  payload: error
});

export const fetchVendors = () => dispatch => {
  dispatch(fetchVendorsLoading(true));

  return axios.post(`${baseUrl}/user/token`, {
    userEmail: "admin@andela.com",
    userRole: "Admin"
  })
    .then((res) => {
      const { token } = res.data;
      axios.defaults.headers.Authorization = `Bearer ${token}`;
  
      return axios.get(`${baseUrl}/admin/vendors`)
        .then((res) => {
          dispatch(fetchVendorsSuccess(res.data.vendors));
          dispatch(fetchVendorsLoading(false));
        })
        .catch((error) => {
          dispatch(fetchVendorsFailure(error));
          dispatch(fetchVendorsLoading(false));
        });
    })
    .catch((error) => {
      dispatch(fetchVendorsFailure(error));
      dispatch(fetchVendorsLoading(false));
    });
};
