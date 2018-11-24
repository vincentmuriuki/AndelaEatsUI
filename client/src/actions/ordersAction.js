import { toast } from 'react-toastify';
import axios from 'axios';
import {
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_FILTERED_ORDERS,
  DELETE_ORDER_LOADING,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  EDIT_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  GET_ORDER_SUCCESS
} from './actionTypes';
import { config } from '../config';
import { setMenuLoading } from './menuAction';

export const base = `${config.ANDELAEATS_API_BASE_URL}`;

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

export const deleteOrdersLoading = isLoading => ({
  type: DELETE_ORDER_LOADING,
  payload: isLoading
});

export const deleteOrdersSuccess = (id) => ({
  type: DELETE_ORDER_SUCCESS,
  payload: id
});

export const deleteOrdersFailure = error => ({
  type: DELETE_ORDER_FAILURE,
  payload: error
});

export const editOrderSuccess = (response) => ({
  type: EDIT_ORDER_SUCCESS,
  payload: response.data
});

export const updateOrderSuccess = (response) => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: response
});

export const getOrderSuccess = (order) => ({
  type: GET_ORDER_SUCCESS,
  order
});

export const fetchOrders = (page = 1, limit = 9) => (dispatch) => {
  dispatch(setOrdersLoading(true));

  return axios.get(`${base}/orders/`, {
    headers: {
      'X-Location': 1
    }
  })
    .then((response) => {
      dispatch(setOrdersSuccess(response.data.payload, page));
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
  dispatch(deleteOrdersLoading(true));
  return axios.delete(`${base}/orders/${id}`, {
    headers: {
      'X-Location': 1
    }
  })
    .then((response) => {
      toast.success(response.data.msg)
      dispatch(deleteOrdersSuccess(id));
      dispatch(deleteOrdersLoading(false));
    }).catch((error) => {
      toast.error(error.message)
      dispatch(deleteOrdersFailure(error.message));
      dispatch(deleteOrdersLoading(false))
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
  dispatch(setMenuLoading(true));
  return axios.put(`${base}/${id}`, data)
    .then((response) => {
      dispatch(updateOrderSuccess(response.data));
      toast.success(response.data.response);
      dispatch(setOrdersLoading(false));
      dispatch(setMenuLoading(false));
    }).catch((error) => {
      toast.error(error.message);
      dispatch(setOrdersLoading(false));
      dispatch(setMenuLoading(false));
    });
};

export const getOrderByDate = (date) => dispatch => {
  dispatch(setOrdersLoading(true));
  return axios.get(`${base}/search?date=${date}`)
    .then((response) => {
      dispatch(getOrderSuccess(response.data));
      dispatch(setOrdersLoading(false));
    }).catch((error) => {
      toast.error(error.message);
      dispatch(setOrdersLoading(false));
    });
};
