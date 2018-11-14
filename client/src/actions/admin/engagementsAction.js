import axios from 'axios';
import {
  FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  FETCH_VENDOR_ENGAGEMENT_LOADING
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