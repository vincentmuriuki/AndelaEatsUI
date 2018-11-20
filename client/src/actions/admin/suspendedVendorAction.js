import axios from 'axios';
import { 
  FETCH_SUSPENDED_VENDOR_LOADING, 
  FETCH_SUSPENDED_VENDOR_SUCCESS, 
  FETCH_SUSPENDED_VENDOR_FAILURE
} from '../actionTypes';

import { config } from '../../config';

export const baseUrl = config.ANDELAEATS_API_BASE_URL;

export const fetchSuspensionLoading = isLoading => ({
  type: FETCH_SUSPENDED_VENDOR_LOADING,
  payload: isLoading
});

export const fetchSuspensionSuccess = suspensions => ({
  type: FETCH_SUSPENDED_VENDOR_SUCCESS,
  payload: suspensions
});

export const fetchSuspensionFailure = error => ({
  type: FETCH_SUSPENDED_VENDOR_FAILURE,
  payload: error
});

export const fetchSuspensions = () => dispatch => {
  dispatch(fetchSuspensionLoading(true));

  return axios.get(`${baseUrl}/vendors/suspended/`, {
    headers: {
      'X-Location': 1
    }
  })
    .then(response => {
      dispatch(fetchSuspensionSuccess(response.data.payload.vendors));
      dispatch(fetchSuspensionLoading(false));
    })
    .catch(error => {
      dispatch(fetchSuspensionFailure(error));
      dispatch(fetchSuspensionLoading(false));
    });
};

