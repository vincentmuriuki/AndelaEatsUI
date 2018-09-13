/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  FETCH_MEAL_ORDERS_LOADING,
  FETCH_MEAL_ORDERS_SUCCESS,
  FETCH_MEAL_ORDERS_FAILURE
} from '../../../actions/actionTypes';
import {
  baseUrl,
  fetchOrders,
} from '../../../actions/admin/ordersAction';
import orders from '../../__mocks__/mockOrders';

describe('Admin::Orders Action', () => {
  describe('Fecth Orders', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch orders success', async (done) => {
      moxios.stubRequest(`${baseUrl}admin/orders`, {
        status: 200,
        response: {
          orders
        }
      });

      const expectedActions = [
        {
          type: FETCH_MEAL_ORDERS_LOADING,
          payload: true,
        },
        {
          type: FETCH_MEAL_ORDERS_SUCCESS,
          payload: orders,
        },
        {
          type: FETCH_MEAL_ORDERS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchOrders())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('fetch orders failure', async (done) => {
      moxios.stubRequest(`${baseUrl}admin/orders`, {
        status: 401,
      });

      const expectedActions = [
        {
          type: FETCH_MEAL_ORDERS_LOADING,
          payload: true,
        },
        {
          type: FETCH_MEAL_ORDERS_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: FETCH_MEAL_ORDERS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchOrders())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});
