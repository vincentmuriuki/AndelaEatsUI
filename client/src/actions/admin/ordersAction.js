import axios from 'axios';
import {
  FETCH_MEAL_ORDERS_SUCCESS,
  FETCH_MEAL_ORDERS_FAILURE,
  FETCH_MEAL_ORDERS_LOADING
} from '../actionTypes';

import { config } from '../../config';

export const baseUrl = config.ANDELAEATS_API_BASE_URL;

export const fecthOrdersLoading = (isLoading) => ({
  type: FETCH_MEAL_ORDERS_LOADING,
  payload: isLoading,

});

export const fecthOrdersSuccess = orders => ({
  type: FETCH_MEAL_ORDERS_SUCCESS,
  payload: orders,
});

export const fecthOrdersFailure = error => ({
  type: FETCH_MEAL_ORDERS_FAILURE,
  payload: error,
});

export const fetchOrders = (currentPage = '', startDate = '', endDate = '') => dispatch => {
  dispatch(fecthOrdersLoading(true));

  let url;

  if (!startDate || !endDate) {
    url = `${baseUrl}/orders/?page=${currentPage}&per_page=15`
  } else {
    url = `${baseUrl}/orders/${startDate}/${endDate}?page=${currentPage}&per_page=15`
  }

  return axios.get(url)
    .then((response) => {
      dispatch(fecthOrdersSuccess(response.data.payload));
      dispatch(fecthOrdersLoading(false));
    })
    .catch((error) => {
      dispatch(fecthOrdersFailure(error));
      dispatch(fecthOrdersLoading(false));
    });
};