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

  return axios.get(`${baseUrl}/vendors/`, {
    headers: {
      'X-Location': 1
    }
  })
    .then((res) => {
      dispatch(fetchVendorsSuccess(res.data.payload.vendors));
      dispatch(fetchVendorsLoading(false));
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

  const url = `${baseUrl}/vendors/`;

  const options = {
    method: 'POST',
    headers: {
      'X-Location': 1
    },
    data: vendorDetails,
    url
  };

  return axios(options)
    .then((res) => {
      const { msg: message, payload: { vendor } } = res.data;
      toastSuccess(message);
      dispatch(createVendorSuccess(vendor));
      dispatch(createVendorLoading(false));
    })
    .catch((error) => {
      toastError(error.response.data.message);
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

  return axios.delete(`${baseUrl}/vendors/${vendorId}`, {
    headers: {
      'X-Location': 1
    }
  })
    .then((res) => {
      toastSuccess(res.data.msg);
      dispatch(deleteVendorSuccess(vendorId));
      dispatch(deleteVendorLoading(false));
    })
    .catch((error) => {
      toastError(error.response.data.message);
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

  const url = `${baseUrl}/vendors/${id}`;

  const options = {
    method: 'PUT',
    headers: {
      'X-Location': 1
    },
    data: vendorDetails,
    url
  };

  return axios(options)
    .then((res) => {
      const { msg: message, payload: { vendor } } = res.data;
      toastSuccess(message);
      dispatch(updateVendorSuccess(vendor));
      dispatch(updateVendorLoading(false));
    })
    .catch((error) => {
      toastError(error.response.data.message);
      dispatch(updateVendorFailure(error));
      dispatch(updateVendorLoading(false));
    });
};
