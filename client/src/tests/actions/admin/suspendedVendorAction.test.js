/* eslint-disable no-undef */
import moxios from 'moxios';

import { 
  FETCH_SUSPENDED_VENDOR_LOADING,
  FETCH_SUSPENDED_VENDOR_SUCCESS,
  FETCH_SUSPENDED_VENDOR_FAILURE
} from '../../../actions/actionTypes';

import { 
  baseUrl,
  fetchSuspensions 
} from '../../../actions/admin/suspendedVendorAction';

import vendors from '../../__mocks__/mockVendors';

describe('Suspended Vendor Action', () => {
  describe('Fetch Suspended Vendors', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    
    it('fetch vendors success', async (done) => {
      moxios.stubRequest(`${baseUrl}/vendors/suspended/`, {
        status: 200,
        response: {
          payload: {
            vendors
          }
        }
      });

      const expectedAction = [
        {
          type: FETCH_SUSPENDED_VENDOR_LOADING,
          payload: true
        },
        {
          type: FETCH_SUSPENDED_VENDOR_SUCCESS,
          payload: vendors
        },
        {
          type: FETCH_SUSPENDED_VENDOR_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});
      await store 
        .dispatch(fetchSuspensions())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('fetch vendors failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/vendors/suspended/`, {
        status: 401
      });

      const expectedActions = [
        {
          type: FETCH_SUSPENDED_VENDOR_LOADING,
          payload: true
        },
        {
          type: FETCH_SUSPENDED_VENDOR_FAILURE,
          payload: new Error('Request failed with status code 401')
        },
        {
          type: FETCH_SUSPENDED_VENDOR_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchSuspensions())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});
