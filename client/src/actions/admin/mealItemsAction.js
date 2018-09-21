import axios from 'axios';
import { toastSuccess, toastError } from '../../helpers/toast';
import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_SUCCESS,
  FETCH_MEAL_ITEMS_FAILURE,
  SET_ADD_MEAL_ERRORS,
  SET_ADD_MEAL_LOADING,
  ADD_MEAL_ITEM_SUCCESS,
  SHOW_ADD_MEAL_MODAL,
  DELETE_MEAL_ITEM_LOADING,
  DELETE_MEAL_ITEM_SUCCESS,
  DELETE_MEAL_ITEM_FAILURE,
} from '../actionTypes';


export const baseUrl = 'https://private-b7e73-andelaeats.apiary-mock.com';

export const fectchMealItemsLoading = isLoading => ({
  type: FETCH_MEAL_ITEMS_LOADING,
  payload: isLoading,
});

export const fetchMealItemsFailure = error => ({
  type: FETCH_MEAL_ITEMS_FAILURE,
  payload: error
});

export const fetchMealItemsSuccess = mealItems => ({
  type: FETCH_MEAL_ITEMS_SUCCESS,
  payload: mealItems,
});

export const fetchMealItems = () => dispatch => {
  dispatch(fectchMealItemsLoading(true));
  return axios.get(`${baseUrl}/admin/meal-items`)
    .then((response) => {
      const { mealItems } = response.data;
      dispatch(fetchMealItemsSuccess(mealItems));
      dispatch(fectchMealItemsLoading(false));
    })
    .catch((error) => {
      dispatch(fetchMealItemsFailure(error));
      dispatch(fectchMealItemsLoading(false));
    });
};

export const showAddMealModalAction = show => ({
  type: SHOW_ADD_MEAL_MODAL,
  payload: show
});

export const setAddMealErrors = errors => dispatch => dispatch({
  type: SET_ADD_MEAL_ERRORS,
  payload: errors
});

export const setAddMealLoading = loading => ({
  type: SET_ADD_MEAL_LOADING,
  payload: loading
});

export const addMealItemSuccess = mealItem => ({
  type: ADD_MEAL_ITEM_SUCCESS,
  payload: mealItem
});

export const showAddMealModal = show => dispatch => dispatch(
  showAddMealModalAction(show)
);

export const addMealItem = formData => dispatch => {
  dispatch(setAddMealLoading(true));

  return axios.post(`${baseUrl}/admin/meal-items`, formData, {
    headers: { 'content-type': 'application/json' }
  })
    .then((response) => {
      const { mealItem } = response.data;
      dispatch(addMealItemSuccess(mealItem));
      dispatch(showAddMealModalAction(false));
      dispatch(setAddMealLoading(false));
    })
    .catch(() => {
      dispatch(setAddMealLoading(false));
    });
};

export const deleteMealItemLoading = isDeleting => ({
  type: DELETE_MEAL_ITEM_LOADING,
  payload: isDeleting,
});

export const deleteMealItemFailure = error => ({
  type: DELETE_MEAL_ITEM_FAILURE,
  payload: error
});

export const deleteMealItemSuccess = mealItemId => ({
  type: DELETE_MEAL_ITEM_SUCCESS,
  payload: mealItemId,
});

export const deleteMealItem = (mealItemId) => dispatch => {
  dispatch(deleteMealItemLoading(true));
  return axios.delete(`${baseUrl}/admin/meal-items/${mealItemId}`)
    .then(() => {
      toastSuccess("Deleted successfully");
      dispatch(deleteMealItemSuccess(mealItemId));
      dispatch(deleteMealItemLoading(false));
    })
    .catch((error) => {
      toastError(error.message);
      dispatch(deleteMealItemFailure(error));
      dispatch(deleteMealItemLoading(false));
    });
};
