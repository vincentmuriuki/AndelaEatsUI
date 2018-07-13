import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { base, fetchOrders } from '../../actions/ordersAction';
import {
  FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, FETCH_ORDERS_LOADING
} from '../../actions/actionTypes';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

/* 
global jest 
expect 
*/
describe('Order actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('fetch past orders success', async (done) => {
    moxios.stubRequest(`${base}?page=1&limit=9`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_SUCCESS,
        orders: { currentPage: 1 }
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(fetchOrders(1, 9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('fetch past orders failure', async (done) => {
    moxios.stubRequest(`${base}?page=1&limit=9`, {
      status: 401
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_FAILURE,
        error: new Error("Request failed with status code 401")
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(fetchOrders(1, 9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
