/* eslint-disable no-undef */
import { 
  FETCH_VENDOR_ENGAGEMENT_LOADING, 
  FETCH_VENDOR_ENGAGEMENT_SUCCESS, 
  FETCH_VENDOR_ENGAGEMENT_FAILURE
} from '../../../actions/actionTypes';

import { initialEngagements } from '../../../reducers/initialState';
import engagementReducer from '../../../reducers/admin/engagementsReducer';
import engagements from '../../__mocks__/mockEngagements';

describe('Engagement Reducer', () => {
  it('should return initial state', () => {
    expect(engagementReducer(undefined, {})).toEqual(initialEngagements);
  });

  describe('FETCH_ENGAGEMENT_LOADING', () => {
    it('should set loading state to true when making api request', () => {
      const action = {
        type: FETCH_VENDOR_ENGAGEMENT_LOADING,
        payload: true
      };

      const newState = engagementReducer(initialEngagements, action);
      expect(newState.isLoading).toEqual(true);
    });
    
    describe('FETCH_ENGAGEMENT_SUCCESS', () => {
      it('should update the allEngagements state in the store', () => {
        const action = {
          type: FETCH_VENDOR_ENGAGEMENT_SUCCESS,
          payload: engagements
        };

        const newState = engagementReducer(initialEngagements, action);
        expect(newState.engagements).toEqual(engagements);
      });
    });

    describe('FETCH_ENGAGEMENT_FAILURE', () => {
      it('should return the previous state of allEngagements in the store', () => {
        const actions = {
          type: FETCH_VENDOR_ENGAGEMENT_FAILURE,
          payload: {}
        };

        const newState = engagementReducer(initialEngagements, actions);
        expect(newState.engagements).toEqual([]);
      });
    });
  });
});