import { toast } from 'react-toastify';
import axios from 'axios';
import {
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_FILTERED_ORDERS,
  DELETE_ORDER_SUCCESS,
  EDIT_ORDER_SUCCESS, 
  UPDATE_ORDER_SUCCESS
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

export const setFilteredOrders = (orders, currentPage) => ({
  type: FETCH_FILTERED_ORDERS,
  orders: { ...orders, currentPage }
});

export const deleteOrdersSuccess = (id) => ({
  type: DELETE_ORDER_SUCCESS,
  id
});

export const editOrderSuccess = (response) => ({
  type: EDIT_ORDER_SUCCESS,
  payload: response.data
});

export const updateOrderSuccess = (response) => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: response
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


export const deleteOrder = (id) => (dispatch) => {
  dispatch(setOrdersLoading(true));
  return axios.delete(`${base}/${id}`)
    .then((response) => {
      dispatch(deleteOrdersSuccess(id));
      dispatch(setOrdersLoading(false));
    }).catch((error) => {
      toast.error(error.message)
      dispatch(setOrdersLoading(false));
    });
};


export const editOrder = (id) => dispatch => {
  dispatch(setOrdersLoading(true));
  return axios.get(`${base}/${id}`)
    .then((response) => {
      dispatch(editOrderSuccess(response));
      dispatch(setOrdersLoading(false));
    }).catch((error) => {
      toast.error(error.message);
      dispatch(setOrdersLoading(false));
    });
};

export const updateOrder = (data, id) => dispatch => {
  dispatch(setOrdersLoading(true));
  return axios.put(`${base}/${id}`, data)
    .then((response) => {
      dispatch(updateOrderSuccess(response));
      toast.success(response.data.response);
      dispatch(setOrdersLoading(false));
    }).catch((error) => {
      toast.error(error.message)
      dispatch(setOrdersLoading(false));
    });
};
