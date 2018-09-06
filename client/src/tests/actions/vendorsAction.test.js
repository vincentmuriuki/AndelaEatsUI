/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  FETCH_VENDORS_LOADING,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
} from '../../actions/actionTypes';
import {
  baseUrl,
  fetchVendors,
} from '../../actions/vendorsAction';
import vendors from '../__mocks__/mockVendors';

describe('Vendors Action', () => {
  describe('Fecth Vendors', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch vendors success', async (done) => {
      moxios.stubRequest(`${baseUrl}/user/token`, {
        status: 200,
        response: {}
      });

      moxios.stubRequest(`${baseUrl}/admin/vendors`, {
        status: 200,
        response: {
          vendors
        }
      });

      const expectedActions = [
        {
          type: FETCH_VENDORS_LOADING,
          payload: true,
        },
        {
          type: FETCH_VENDORS_SUCCESS,
          payload: vendors,
        },
        {
          type: FETCH_VENDORS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchVendors())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('fetch vendors failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/user/token`, {
        status: 200,
        response: {}
      });

      moxios.stubRequest(`${baseUrl}/admin/vendors`, {
        status: 401,
      });

      const expectedActions = [
        {
          type: FETCH_VENDORS_LOADING,
          payload: true,
        },
        {
          type: FETCH_VENDORS_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: FETCH_VENDORS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchVendors())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});
