/* eslint-disable no-undef */
import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_SUCCESS,
  FETCH_MEAL_ITEMS_FAILURE
} from '../../../actions/actionTypes';
import mealItemsReducer from '../../../reducers/admin/mealItemsReducer';
import { initialMealItems } from '../../../reducers/initialState';
import { mealItems } from '../../__mocks__/mockMealItems';

describe('Admin:: Meal Items Reducer', () => {
  let newState, action;

  it('should return initial state', () => {
    expect(mealItemsReducer(undefined, {})).toEqual(initialMealItems);
  });

  describe('FECTH_MEAL_ITEMS_LOADING', () => {
    it('should set isLoading state to true when making api request', () => {
      action = {
        type: FETCH_MEAL_ITEMS_LOADING,
        payload: true,
      };

      newState = mealItemsReducer(initialMealItems, action);
      expect(newState.isLoading).toBe(true);
    });

    it('should set isLoading state to false when request is resolved', () => {
      action = {
        type: FETCH_MEAL_ITEMS_LOADING,
        payload: false,
      };

      newState = mealItemsReducer(initialMealItems, action);
      expect(newState.isLoading).toBe(false);
    });
  });

  describe('FETCH_MEAL_ITEMS_SUCCESS', () => {
    it('should update the mealItems state in the store', () => {
      action = {
        type: FETCH_MEAL_ITEMS_SUCCESS,
        payload: mealItems,
      };

      newState = mealItemsReducer(initialMealItems, action);
      expect(newState.meals).toEqual(mealItems);
    });
  });

  describe('FETCH_MEAL_ITEMS_FAILURE', () => {
    it('should return the previous state of mealItems', () => {
      action = {
        type: FETCH_MEAL_ITEMS_FAILURE,
      };

      newState = mealItemsReducer(newState, action);
      expect(newState.meals).toEqual(mealItems);
    });
  });
});
