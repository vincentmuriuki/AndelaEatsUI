/* eslint-disable no-undef */
import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_SUCCESS,
  FETCH_MEAL_ITEMS_FAILURE,
  SET_ADD_MEAL_ERRORS,
  SHOW_ADD_MEAL_MODAL,
  SET_ADD_MEAL_LOADING,
  ADD_MEAL_ITEM_SUCCESS
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

  describe('SET_ADD_MEAL_ERRORS', () => {
    it('should set form submit errors', () => {
      action = {
        type: SET_ADD_MEAL_ERRORS,
        payload: ['name'],
      };

      newState = mealItemsReducer(initialMealItems, action);
      expect(newState.addMealModal.errors.length).toBeGreaterThan(0);
    });
  });

  describe('SHOW_ADD_MEAL_MODAL', () => {
    it('should set show for add modal to true', () => {
      action = {
        type: SHOW_ADD_MEAL_MODAL,
        payload: true,
      };

      newState = mealItemsReducer(initialMealItems, action);
      expect(newState.addMealModal.show).toBe(true);
    });
  });

  describe('SET_ADD_MEAL_LOADING', () => {
    it('should set submit action loading to true', () => {
      action = {
        type: SET_ADD_MEAL_LOADING,
        payload: true,
      };

      newState = mealItemsReducer(initialMealItems, action);
      expect(newState.addMealModal.isLoading).toBe(true);
    });
  });

  describe('ADD_MEAL_ITEM_SUCCESS', () => {
    it('should include new meal items into meals array', () => {
      action = {
        type: ADD_MEAL_ITEM_SUCCESS,
        payload: mealItems[0],
      };

      newState = mealItemsReducer(initialMealItems, action);
      expect(newState.meals.includes(mealItems[0])).toBe(true);
    });
  });
});
