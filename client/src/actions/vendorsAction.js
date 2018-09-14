import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  FETCH_VENDORS_LOADING,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILURE,
  CREATE_VENDOR_LOADING,
  DELETE_VENDOR_SUCCESS,
  DELETE_VENDOR_FAILURE,
  DELETE_VENDOR_LOADING
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


export const createVendor = (vendor) => dispatch => {
  dispatch(createVendorLoading(true));

  return axios.post(`${baseUrl}/user/token`, {
    userEmail: "admin@andela.com",
    userRole: "Admin"
  })
    .then((res) => {
      const { token } = res.data;
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      
      return axios.post(`${baseUrl}/admin/vendor`, {
        vendorName: vendor.vendorName,
        vendorAddress: vendor.vendorAddress,
        contactPerson: vendor.contactPerson,
        phoneNumber: vendor.phoneNumber
      })
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(createVendorSuccess(res.data.vendor[0]));
          dispatch(createVendorLoading(false));
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(createVendorFailure(error));
          dispatch(createVendorLoading(false));
        });
    })
    .catch((error) => {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
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
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(deleteVendorSuccess(vendorId));
          dispatch(deleteVendorLoading(false));
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          dispatch(deleteVendorFailure(error));
          dispatch(deleteVendorLoading(false));
        });
    })
    .catch((error) => {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      dispatch(deleteVendorFailure(error));
      dispatch(deleteVendorLoading(false));
    });
};
