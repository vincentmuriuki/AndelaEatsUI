/* eslint-disable no-undef */
import {
  FETCH_VENDORS_LOADING,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE
} from '../../actions/actionTypes';
import { initialVendors } from '../../reducers/initialState';
import vendorsReducer from '../../reducers/vendorsReducer';
import vendors from '../__mocks__/mockVendors';

describe('Vendors Reducer', () => {
  it('should return initial state', () => {
    expect(vendorsReducer(undefined, {})).toEqual(initialVendors);
  });

  describe('FETCH_VENDORS_LOADING', () => {
    it('should set isLoading state to true when making api request', () => {
      const action = {
        type: FETCH_VENDORS_LOADING,
        payload: true,
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.isLoading).toEqual(true);
    });

    it('should set isLoading state to false when request is resolved', () => {
      const action = {
        type: FETCH_VENDORS_LOADING,
        payload: false,
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.isLoading).toEqual(false);
    });
  });

  describe('FETCH_VENDORS_SUCCESS', () => {
    it('should update the allVendors state in the store', () => {
      const action = {
        type: FETCH_VENDORS_SUCCESS,
        payload: vendors,
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.vendors).toEqual(vendors);
    });
  });

  describe('FETCH_VENDORS_FAILURE', () => {
    it('should return the previous state of allVendors in the store', () => {
      const action = {
        type: FETCH_VENDORS_FAILURE,
        payload: {},
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.vendors).toEqual([]);
    });
  });
});
