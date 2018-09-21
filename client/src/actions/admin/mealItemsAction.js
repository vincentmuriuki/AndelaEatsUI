import axios from 'axios';
import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_SUCCESS,
  FETCH_MEAL_ITEMS_FAILURE,
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
