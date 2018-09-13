import axios from 'axios';
import {
  FETCH_MEAL_ORDERS_SUCCESS,
  FETCH_MEAL_ORDERS_FAILURE,
  FETCH_MEAL_ORDERS_LOADING,
} from '../actionTypes';

export const baseUrl = 'https://private-b7e73-andelaeats.apiary-mock.com/';

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

export const fetchOrders = () => dispatch => {
  dispatch(fecthOrdersLoading(true));

  return axios.get(`${baseUrl}admin/orders`)
    .then((response) => {
      dispatch(fecthOrdersSuccess(response.data.orders));
      dispatch(fecthOrdersLoading(false));
    })
    .catch((error) => {
      dispatch(fecthOrdersFailure(error));
      dispatch(fecthOrdersLoading(false));
    });
};
