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
  FETCH_VENDORS_FAILURE
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

  return axios.get(`${baseUrl}/engagements/`, {
    headers: {
      'X-Location': 1
    }
  })
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
  return axios.get(`${baseUrl}/vendors/`, {
    headers: {
      'X-Location': 1
    }
  })
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
    headers: {
      'X-Location': 1
    },
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