import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { base, fetchOrders, filterOrders } from '../../actions/ordersAction';
import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_LOADING,
  FETCH_FILTERED_ORDERS
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

  it('filter orders success', async (done) => {
    const order = {
      searchParam: 'rice',
      start: new Date(),
      end: new Date(),
      page: 2
    };
    moxios.stubRequest(`${base}/search?param=${order.searchParam}&start=${order.start}&end=${order.end}&page=${order.page}`, {//eslint-disable-line
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_FILTERED_ORDERS,
        orders: { currentPage: 2 }
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(filterOrders(order))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('filter orders failure', async (done) => {
    const order = {
      searchParam: 'yam',
      start: new Date(),
      end: new Date(),
      page: 2
    };
    moxios.stubRequest(`${base}/search?param=${order.searchParam}&start=${order.start}&end=${order.end}&page=${order.page}`, {//eslint-disable-line
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
    await store.dispatch(filterOrders(order))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
