import axios from 'axios';
import { toastSuccess, toastError } from '../../helpers/toast';
import {
  FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  FETCH_VENDOR_ENGAGEMENT_LOADING,
  CREATE_VENDOR_ENGAGEMENT_SUCCESS,
  CREATE_VENDOR_ENGAGEMENT_FAILURE,
  CREATE_VENDOR_ENGAGEMENT_LOADING,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  DELETE_VENDOR_ENGAGEMENT_LOADING,
  DELETE_VENDOR_ENGAGEMENT_SUCCESS,
  DELETE_VENDOR_ENGAGEMENT_FAILURE,
  EDIT_VENDOR_ENGAGEMENT_LOADING,
  EDIT_VENDOR_ENGAGEMENT_SUCCESS,
  EDIT_VENDOR_ENGAGEMENT_FAILURE
} from "../actionTypes";

import { config } from '../../config';

export const baseUrl = config.ANDELAEATS_API_BASE_URL;

export const fetchEngagementsLoading = isLoading => ({
  type: FETCH_VENDOR_ENGAGEMENT_LOADING,
  payload: isLoading
});

export const fetchEngagementsSuccess = engagements => ({
  type: FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  payload: engagements
});

export const fetchEngagementsFailure = error => ({
  type: FETCH_VENDOR_ENGAGEMENT_FAILURE,
  payload: error
});

export const fetchEngagements = () => dispatch => {
  dispatch(fetchEngagementsLoading(true));

  return axios.get(`${baseUrl}/engagements/`)
    .then(response => {
      dispatch(fetchEngagementsSuccess(response.data.payload.engagements));
      dispatch(fetchEngagementsLoading(false));
    })
    .catch(error => {
      dispatch(fetchEngagementsFailure(error));
      dispatch(fetchEngagementsLoading(false));
    });
};

export const fetchVendorsSuccess = vendors => ({
  type: FETCH_VENDORS_SUCCESS,
  payload: vendors,
});

export const fetchVendorsFailure = error => ({
  type: FETCH_VENDORS_FAILURE,
  payload: error
});

export const fetchVendors = () => dispatch => {
  return axios.get(`${baseUrl}/vendors/`)
    .then((res) => {
      dispatch(fetchVendorsSuccess(res.data.payload.vendors));
    })
    .catch((error) => {
      dispatch(fetchVendorsFailure(error));
    });
};

export const createEngagementsLoading = isLoading => ({
  type: CREATE_VENDOR_ENGAGEMENT_LOADING,
  payload: isLoading
});

export const createEngagementsSuccess = engagement => ({
  type: CREATE_VENDOR_ENGAGEMENT_SUCCESS,
  payload: engagement
});

export const createEngagementFailure = error => ({
  type: CREATE_VENDOR_ENGAGEMENT_FAILURE,
  payload: error
});

export const createEngagement = engagementDetails => dispatch => {
  dispatch(createEngagementsLoading(true));

  const url = `${baseUrl}/engagements/`;

  const options = {
    method: 'POST',
    data: engagementDetails,
    url
  };

  return axios(options)
    .then(response => {
      const { msg: message, payload: { engagement } } = response.data;
      toastSuccess(message);
      dispatch(createEngagementsSuccess(engagement));
      dispatch(createEngagementsLoading(false));
    })
    .catch(error => {
      toastError(error);
      dispatch(createEngagementFailure(error));
      dispatch(createEngagementsLoading(false));
    });
};


export const deleteEngagementsLoading = isLoading => ({
  type: DELETE_VENDOR_ENGAGEMENT_LOADING,
  payload: isLoading
});

export const deleteEngagementsSuccess = engagement => ({
  type: DELETE_VENDOR_ENGAGEMENT_SUCCESS,
  payload: engagement
});

export const deleteEngagementFailure = error => ({
  type: DELETE_VENDOR_ENGAGEMENT_FAILURE,
  payload: error
});


export const deleteEngagement = (engagementId) => dispatch => {
  dispatch(deleteEngagementsLoading(true));

  return axios.delete(`${baseUrl}/engagements/${engagementId}`)
    .then((res) => {
      toastSuccess(res.data.msg);
      dispatch(deleteEngagementsSuccess(engagementId));
      dispatch(deleteEngagementsLoading(false));
    })
    .catch((error) => {
      toastError(error);
      dispatch(deleteEngagementFailure(error));
      dispatch(deleteEngagementsLoading(false));
    });
};


export const editEngagementsLoading = isLoading => ({
  type: EDIT_VENDOR_ENGAGEMENT_LOADING,
  payload: isLoading
});

export const editEngagementsSuccess = engagement => ({
  type: EDIT_VENDOR_ENGAGEMENT_SUCCESS,
  payload: engagement
});

export const editEngagementFailure = error => ({
  type: EDIT_VENDOR_ENGAGEMENT_FAILURE,
  payload: error
});

export const editEngagement = (engagementId, engagementDetails) => dispatch => {
  dispatch(editEngagementsLoading(true));

  const url = `${baseUrl}/engagements/${engagementId}`;

  const options = {
    method: 'PATCH',
    data: engagementDetails,
    url
  };

  return axios(options)
    .then(response => {
      const { msg: message, payload: { engagement } } = response.data;
      toastSuccess(message);
      dispatch(editEngagementsSuccess(engagement));
      dispatch(editEngagementsLoading(false));
    })
    .catch(error => {
      toastError(error);
      dispatch(editEngagementFailure(error));
      dispatch(editEngagementsLoading(false));
    });
};