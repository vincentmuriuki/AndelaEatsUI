
import axios from 'axios';
import { 
  SET_MENUS,
  MAKE_ORDER_FAILURE,
  MAKE_ORDER_SUCCESS,
  SELECT_MEAL,
  RESET_MENU
} from './actionTypes';
import { config } from '../config';

export const baseUrl = config.API_BASE_URL;

/**
 *
 *
 * @export
 * @param {*} menus
 * @returns {object} object
 */
export function setMenus(menus) {
  return {
    type: SET_MENUS,
    payload: menus
  };
}

/**
 *
 * @export
 * @param {object} prop value 
 * @returns {object} object
 */
export function selectMeal({ prop, value }) {
  return {
    type: SELECT_MEAL,
    payload: { prop, value }
  };
}
/**
 *
 * @export
 * @returns {void} 
 */
export function resetMenu() {
  return {
    type: RESET_MENU,
  };
}

/**
 *
 *
 * @export
 * @param {*} response
 * @returns {object} object
 */
export function handleOrderSuccess(response) {
  return {
    type: MAKE_ORDER_SUCCESS,
    payload: response
  };
}

/**
 *
 *
 * @export
 * @param {*} error
 * @returns {object} object
 */
export function handleOrderFailure(error) {
  return {
    type: MAKE_ORDER_FAILURE,
    payload: error
  };
}


export const getUpComingMenus = () => (dispatch) => axios.get(`${baseUrl}/menu`)
  .then((response) => {
    dispatch(setMenus(response.data));
  });
  // eslint-disable-next-line
export const orderMeal = (orders) => (dispatch) => axios.post(`${baseUrl}/menu`, orders)
  .then((response) => {
    dispatch(handleOrderSuccess(response.data));
  })
  .catch((error) => {
    dispatch(handleOrderFailure(error));
  });
