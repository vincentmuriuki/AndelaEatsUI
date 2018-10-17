/* eslint-disable no-undef */
import moxios from 'moxios';
import { formatCurrentDate } from '../../../helpers';
import mockMenuList from '../../__mocks__/mockMenuList';

import {
  FETCH_MENUS_SUCCESS,
  FETCH_MENUS_FAILURE,
  FETCH_MENUS_LOADING,
  FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  DELETE_MENU_ITEM_LOADING,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE
} from '../../../actions/actionTypes';

import {
  fetchMenus,
  baseUrl,
  fetchVendorEngagements,
  deleteMenuItem,
  mockMenu,
} from '../../../actions/admin/menuItemsAction';

import { engagements } from '../../__mocks__/mockMenuItems';

const menusPath = `admin/menu/lunch/${formatCurrentDate()}`;

const menusFromApi = {
  payload: {
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
        payload: { ...menusFromApi.payload }
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

    it('delete menu item success', async (done) => {
      moxios.stubRequest(`${baseUrl}/admin/menu/2`, {
        status: 200,
        response: {}
      });

      const store = mockStore({});

      const expectedActions = [
        {
          type: DELETE_MENU_ITEM_LOADING,
          payload: true,
        },
        {
          type: DELETE_MENU_ITEM_SUCCESS,
          payload: 2,
        },
        {
          type: DELETE_MENU_ITEM_LOADING,
          payload: false,
        }
      ];

      await store.dispatch(deleteMenuItem(2))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('delete menu item failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/admin/menu/2`, {
        status: 400,
        response: {
          msg: 'Access Error - Permission Denied'
        }
      });

      const store = mockStore({});

      const expectedActions = [
        {
          type: DELETE_MENU_ITEM_LOADING,
          payload: true,
        },
        {
          type: DELETE_MENU_ITEM_FAILURE,
          payload: 'Access Error - Permission Denied',
        },
        {
          type: DELETE_MENU_ITEM_LOADING,
          payload: false,
        }
      ];

      await store.dispatch(deleteMenuItem(2))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('mock menu item ', async (done) => {
      const store = mockStore({});

      const expectedActions = [
        {
          type: 'MOCK_MENU_LIST',
          payload: mockMenuList,
        }
      ];

      await store.dispatch(mockMenu(mockMenuList));
      expect(store.getActions()).toEqual(expectedActions);
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
