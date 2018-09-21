import axios from 'axios';
import { toastSuccess, toastError } from '../helpers/toast';
import {
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  FETCH_VENDORS_LOADING,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILURE,
  CREATE_VENDOR_LOADING,
  DELETE_VENDOR_SUCCESS,
  DELETE_VENDOR_FAILURE,
  DELETE_VENDOR_LOADING,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE,
  UPDATE_VENDOR_LOADING
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

export const createVendorLoading = isCreating => ({
  type: CREATE_VENDOR_LOADING,
  payload: isCreating
});

export const createVendorSuccess = vendor => ({
  type: CREATE_VENDOR_SUCCESS,
  payload: vendor
});

export const createVendorFailure = error => ({
  type: CREATE_VENDOR_FAILURE,
  payload: error
});


export const createVendor = (vendorDetails) => dispatch => {
  dispatch(createVendorLoading(true));

  return axios.post(`${baseUrl}/user/token`, {
    userEmail: "admin@andela.com",
    userRole: "Admin"
  })
    .then((res) => {
      const { token } = res.data;
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      
      return axios.post(`${baseUrl}/admin/vendor`, vendorDetails)
        .then((res) => {
          const { message, vendor } = res.data;
          toastSuccess(message);
          dispatch(createVendorSuccess(vendor[0]));
          dispatch(createVendorLoading(false));
        })
        .catch((error) => {
          toastError(error.response.data.message);
          dispatch(createVendorFailure(error));
          dispatch(createVendorLoading(false));
        });
    })
    .catch((error) => {
      toastError(error.message);
      dispatch(createVendorFailure(error));
      dispatch(createVendorLoading(false));
    });
};


export const deleteVendorLoading = isDeleting => ({
  type: DELETE_VENDOR_LOADING,
  payload: isDeleting
});


export const deleteVendorSuccess = vendorId => ({
  type: DELETE_VENDOR_SUCCESS,
  payload: vendorId
});

export const deleteVendorFailure = error => ({
  type: DELETE_VENDOR_FAILURE,
  payload: error
});


export const deleteVendor = (vendorId) => dispatch => {
  dispatch(deleteVendorLoading(true));

  return axios.post(`${baseUrl}/user/token`, {
    userEmail: "admin@andela.com",
    userRole: "Admin"
  })
    .then((res) => {
      const { token } = res.data;
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      return axios.delete(`${baseUrl}/admin/vendor/${vendorId}`)
        .then((res) => {
          toastSuccess(res.data.message);
          dispatch(deleteVendorSuccess(vendorId));
          dispatch(deleteVendorLoading(false));
        })
        .catch((error) => {
          toastError(error.response.data.message);
          dispatch(deleteVendorFailure(error));
          dispatch(deleteVendorLoading(false));
        });
    })
    .catch((error) => {
      toastError(error.message);
      dispatch(deleteVendorFailure(error));
      dispatch(deleteVendorLoading(false));
    });
};


export const updateVendorLoading = isUpdating => ({
  type: UPDATE_VENDOR_LOADING,
  payload: isUpdating
});


export const updateVendorSuccess = vendor => ({
  type: UPDATE_VENDOR_SUCCESS,
  payload: vendor
});

export const updateVendorFailure = error => ({
  type: UPDATE_VENDOR_FAILURE,
  payload: error
});


export const updateVendor = (id, vendorDetails) => dispatch => {
  dispatch(updateVendorLoading(true));

  return axios.post(`${baseUrl}/user/token`, {
    userEmail: "admin@andela.com",
    userRole: "Admin"
  })
    .then((res) => {
      const { token } = res.data;
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      return axios.put(`${baseUrl}/admin/vendor/${id}`, vendorDetails)
        .then((res) => {
          const { message, vendor } = res.data;
          toastSuccess(message);
          dispatch(updateVendorSuccess(vendor[0]));
          dispatch(updateVendorLoading(false));
        })
        .catch((error) => {
          toastError(error.response.data.message);
          dispatch(updateVendorFailure(error));
          dispatch(updateVendorLoading(false));
        });
    })
    .catch((error) => {
      toastError(error.message);
      dispatch(updateVendorFailure(error));
      dispatch(updateVendorLoading(false));
    });
};
