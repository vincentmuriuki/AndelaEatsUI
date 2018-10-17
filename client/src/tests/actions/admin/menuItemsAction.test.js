/* eslint-disable no-undef */
import moxios from 'moxios';
import { formatCurrentDate } from '../../../helpers';

import {
  FETCH_MENUS_SUCCESS,
  FETCH_MENUS_FAILURE,
  FETCH_MENUS_LOADING,
  FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
} from '../../../actions/actionTypes';

import {
  fetchMenus,
  baseUrl,
  fetchVendorEngagements
} from '../../../actions/admin/menuItemsAction';

import { engagements } from '../../__mocks__/mockMenuItems';

const menusPath = `admin/menu/lunch/${formatCurrentDate()}`;

const menusFromApi = {
  menus: {
    dateOfMeal: '2018-09-09',
    mealPeriod: 'lunch',
    menuList: []
  }
};

const initExpectedActions = [
  {
    type: FETCH_MENUS_LOADING,
    payload: true,
  }, null,
  {
    type: FETCH_MENUS_LOADING,
    payload: false,
  }
];

describe('Admin::Menu Items Action', () => {
  describe('Fetch menu Items', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch menu items success', async (done) => {
      moxios.stubRequest(`${baseUrl}/${menusPath}`, {
        status: 200,
        response: { ...menusFromApi }
      });
      
      const expectedActions = [...initExpectedActions];

      expectedActions[1] = {
        type: FETCH_MENUS_SUCCESS,
        payload: { ...menusFromApi }
      };
  
      const store = mockStore({});
      
      await store
        .dispatch(fetchMenus())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });

      done();
    });

    it('fetch menu items error', async (done) => {
      moxios.stubRequest(`${baseUrl}/${menusPath}`, {
        status: 400,
        response: {}
      });
      
      const expectedActions = [...initExpectedActions];

      expectedActions[1] = {
        type: FETCH_MENUS_FAILURE,
        payload: null
      };
  
      const store = mockStore({});
      
      await store
        .dispatch(fetchMenus())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });

      done();
    });
  });


  describe('Fetch Vendor Engagements', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch vendor engagements success', async (done) => {
      moxios.stubRequest(`${baseUrl}/engagements/`, {
        status: 200,
        response: { payload: engagements }
      });

      const expectedAction = [{
        type: FETCH_VENDOR_ENGAGEMENT_SUCCESS,
        payload: engagements
      }];

      const store = mockStore({});

      await store
        .dispatch(fetchVendorEngagements())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('fetch vendor engagements failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/engagements/`, {
        status: 401,
        response: {}
      });

      const expectedAction = [{
        type: FETCH_VENDOR_ENGAGEMENT_FAILURE,
        payload: new Error('Request failed with status code 401')
      }];
  
      const store = mockStore({});
      
      await store
        .dispatch(fetchVendorEngagements())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
  });
});
