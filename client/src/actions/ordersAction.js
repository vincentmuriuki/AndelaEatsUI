import axios from 'axios';
import {
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_FILTERED_ORDERS
} from './actionTypes';
import { config } from '../config';

export const base = `${config.API_BASE_URL}orders`;

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

export const setFilteredOrders = (orders, currentPage) => ({
  type: FETCH_FILTERED_ORDERS,
  orders: { ...orders, currentPage }
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

export const filterOrders = (order) => (dispatch) => {
  const {
    searchParam = '', start = '', end = '', page = 1
  } = order;
  dispatch(setOrdersLoading(true));
  return axios.get(`${base}/search?param=${searchParam}&start=${start}&end=${end}&page=${page}`) //eslint-disable-line
    .then((response) => {
      dispatch(setFilteredOrders(response.data, page));
      dispatch(setOrdersLoading(false));
    }).catch((error) => {
      dispatch(setOrdersFailure(error));
      dispatch(setOrdersLoading(false));
    });
};
