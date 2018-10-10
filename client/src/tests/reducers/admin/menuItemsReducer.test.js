/* eslint-disable no-undef */
import {
  FETCH_MENUS_FAILURE,
  FETCH_MENUS_SUCCESS,
  FETCH_MENUS_LOADING
} from '../../../actions/actionTypes';

import menusReducer from '../../../reducers/admin/menusReducer';

import { initialAdminMenus } from '../../../reducers/initialState';

describe('Admin:: Menu Items Reducer', () => {
  let newState, action;

  it('should return initial state', () => {
    expect(menusReducer(undefined, {})).toEqual(initialAdminMenus);
  });

  describe('FECTH_MENUS_LOADING', () => {
    it('should set isLoading state to true', () => {
      action = {
        type: FETCH_MENUS_LOADING,
        payload: true,
      };

      newState = menusReducer(initialAdminMenus, action);
      expect(newState.isLoading).toBe(true);
    });
  });

  describe('FETCH_MENUS_FAILURE', () => {
    it('should set error status and message', () => {
      action = {
        type: FETCH_MENUS_FAILURE,
        payload: "error message",
      };

      newState = menusReducer(initialAdminMenus, action);
      expect(newState.error.status).toBe(true);
      expect(newState.error.message).toBe("error message");
    });
  });

  describe('FETCH_MENUS_SUCCESS', () => {
    it('should update state with menus', () => {
      action = {
        type: FETCH_MENUS_SUCCESS,
        payload: {
          dateOfMeal: '2018-09-09',
          mealPeriod: 'lunch',
          menuList: [],
        }
      };

      newState = menusReducer(initialAdminMenus, action);
      expect(newState.dateOfMeal).toEqual('2018-09-09');
      expect(newState.mealPeriod).toEqual('lunch');
    });
  });
});
