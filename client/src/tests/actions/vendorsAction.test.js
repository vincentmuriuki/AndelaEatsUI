/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  FETCH_VENDORS_LOADING,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILURE,
  CREATE_VENDOR_LOADING
} from '../../actions/actionTypes';
import {
  baseUrl,
  fetchVendors,
  createVendor
} from '../../actions/vendorsAction';
import vendors from '../__mocks__/mockVendors';
import {
  newVendor,
  createdVendor
} from '../__mocks__/mockNewVendor';

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

  describe('Create Vendor', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('create vendor success', async (done) => {
      moxios.stubRequest(`${baseUrl}/user/token`, {
        status: 200,
        response: {}
      });

      moxios.stubRequest(`${baseUrl}/admin/vendor`, {
        status: 201,
        response: {
          vendor: [createdVendor]
        }
      });

      const expectedActions = [
        {
          type: CREATE_VENDOR_LOADING,
          payload: true,
        },
        {
          type: CREATE_VENDOR_SUCCESS,
          payload: createdVendor,
        },
        {
          type: CREATE_VENDOR_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(createVendor(newVendor))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('create vendor failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/user/token`, {
        status: 200,
        response: {}
      });

      moxios.stubRequest(`${baseUrl}/admin/vendor`, {
        status: 401,
        response: {}
      });

      const expectedActions = [
        {
          type: CREATE_VENDOR_LOADING,
          payload: true,
        },
        {
          type: CREATE_VENDOR_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: CREATE_VENDOR_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(createVendor(newVendor))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});
