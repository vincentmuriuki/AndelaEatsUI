/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  base,
  fetchOrders,
  filterOrders,
  deleteOrder,
  editOrder,
  updateOrder,
  updateOrderSuccess,
  getOrderByDate
} from '../../actions/ordersAction';

import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_LOADING,
  FETCH_FILTERED_ORDERS,
  DELETE_ORDER_SUCCESS,
  EDIT_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  GET_ORDER_SUCCESS,
  MENU_IS_LOADING
} from '../../actions/actionTypes';

const id = '123';
const date = new Date();

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

  it('edit order success', async (done) => {
    moxios.stubRequest(`${base}/${id}`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: EDIT_ORDER_SUCCESS,
        payload: {}
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(editOrder(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('edit order failure', async (done) => {
    moxios.stubRequest(`${base}/${id}`, {
      status: 401,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(editOrder(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('delete orders success', async (done) => {
    moxios.stubRequest(`${base}/${id}`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: DELETE_ORDER_SUCCESS,
        id
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(deleteOrder(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('delete orders failure', async (done) => {
    moxios.stubRequest(`${base}/${id}`, {
      status: 404,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(deleteOrder(id))
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

  it('update order success', async (done) => {
    moxios.stubRequest(`${base}/${id}`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: MENU_IS_LOADING,
        payload: true, 
      },
      {
        type: UPDATE_ORDER_SUCCESS,
        payload: {}
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      },
      {
        type: MENU_IS_LOADING,
        payload: false, 
      }];
    const store = mockStore({});
    await store.dispatch(updateOrder({}, id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('update order failure', async (done) => {
    moxios.stubRequest(`${base}/${id}`, {
      status: 401,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: MENU_IS_LOADING,
        payload: true, 
      },
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      },
      {
        type: MENU_IS_LOADING,
        payload: false, 
      }];
    const store = mockStore({});
    await store.dispatch(updateOrder({}, id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('get order success', async (done) => {
    moxios.stubRequest(`${base}/search?date=${date}`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: GET_ORDER_SUCCESS,
        order: {}
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(getOrderByDate(date))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('get order failure', async (done) => {
    moxios.stubRequest(`${base}/search?date=${date}`, {
      status: 419,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(getOrderByDate(date))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
