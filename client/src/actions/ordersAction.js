import axios from 'axios';
import {
  FETCH_ORDERS_LOADING, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE
} from './actionTypes';
import { config } from '../config';

export const base = `${config.API_BASE_URL}/orders`;

export const setOrdersSuccess = (orders, currentPage) => ({
  type: FETCH_ORDERS_SUCCESS,
  orders: { ...orders, currentPage }
});

export const setOrdersFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  error
});

export const setOrdersLoading = (isLoading) => ({
  type: FETCH_ORDERS_LOADING,
  isLoading
});

export const fetchOrders = (page = 1, limit = 9) => (dispatch) => {
  dispatch(setOrdersLoading(true));
  return axios.get(`${base}?page=${page}&limit=${limit}`)
    .then((response) => {
      dispatch(setOrdersSuccess(response.data, page));
      dispatch(setOrdersLoading(false));
    }).catch((error) => {
      dispatch(setOrdersFailure(error));
      dispatch(setOrdersLoading(false));
    });
};
