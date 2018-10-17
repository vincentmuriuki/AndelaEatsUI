/* eslint-disable no-undef */
import {
  FETCH_MENUS_FAILURE,
  FETCH_MENUS_SUCCESS,
  FETCH_MENUS_LOADING,
  DELETE_MENU_ITEM_LOADING,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE
} from '../../../actions/actionTypes';

import menusReducer from '../../../reducers/admin/menusReducer';

import { initialAdminMenus } from '../../../reducers/initialState';
import mockMenuList from '../../__mocks__/mockMenuList';

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

  describe('DELETE_MENU_ITEM_LOADING', () => {
    it('should set isDeleting state to true when making delete request', () => {
      action = {
        type: DELETE_MENU_ITEM_LOADING,
        payload: true
      };

      newState = menusReducer(initialAdminMenus, action);
      expect(newState.isDeleting).toBeTruthy();
    });

    it('should set isDeleting state to false request on delete resolve', () => {
      action = {
        type: DELETE_MENU_ITEM_LOADING,
        payload: false
      };

      newState = menusReducer(initialAdminMenus, action);
      expect(newState.isDeleting).toBeFalsy();
    });
  });

  describe('DELETE_MENU_ITEM_SUCCESS', () => {
    it('should update the store menuList', () => {
      action = {
        type: DELETE_MENU_ITEM_SUCCESS,
        payload: 2
      };

      const initialState = { ...initialAdminMenus, menuList: mockMenuList };

      newState = menusReducer(initialState, action);
      expect(newState.menuList.length).toEqual(3);
    });
  });

  describe('DELETE_MENU_ITEM_FAILURE', () => {
    it('should update the error state in the store', () => {
      action = {
        type: DELETE_MENU_ITEM_FAILURE,
        payload: 'Access Denied'
      };

      newState = menusReducer(initialAdminMenus, action);
      expect(newState.error.message).toBe('Access Denied');
    });
  });

  describe('MOCK_MENU_LIST', () => {
    it('should update the menuList state with mock menus', () => {
      action = {
        type: 'MOCK_MENU_LIST',
        payload: mockMenuList
      };

      newState = menusReducer(initialAdminMenus, action);
      expect(newState.menuList.length).toBe(4);
    });
  });
});
