import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  baseUrl, getUpComingMenus, orderMeal, selectMeal, resetMenu 
} from '../../actions/menuAction';
import {
  SET_MENUS,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE,
  MENU_IS_LOADING,
  SELECT_MEAL,
  RESET_MENU
} from '../../actions/actionTypes';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

/* 
global jest 
expect 
*/
describe('Menu actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should set upcoming menus', async (done) => {
    moxios.stubRequest(`${baseUrl}/menu`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: SET_MENUS,
        payload: {}
      }
    ];
    const store = mockStore({});
    await store.dispatch(getUpComingMenus())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('should handle order success', async (done) => {
    moxios.stubRequest(`${baseUrl}/menu`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: MENU_IS_LOADING,
        payload: true
      },
      {
        type: MAKE_ORDER_SUCCESS,
        payload: {}
      },
      {
        type: MENU_IS_LOADING,
        payload: false
      }
    ];
    const order = {
      mainMeal: 1,
      acc1: 2,
      acc2: 3
    };
    const store = mockStore({});
    await store.dispatch(orderMeal(order))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('should handle order failure', async (done) => {
    moxios.stubRequest(`${baseUrl}/menu`, {
      status: 400,
    });
    const expectedActions = [
      {
        type: MENU_IS_LOADING,
        payload: true
      },
      {
        type: MAKE_ORDER_FAILURE,
        payload: new Error("Request failed with status code 400")
      }
    ];
    const order = {
      mainMeal: 1,
      acc1: 2,
      acc2: 3
    };
    const store = mockStore({});
    await store.dispatch(orderMeal(order))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('should select meal', async (done) => {
    const payload = { prop: '', value: '' };
    const expectedActions = [{
      type: SELECT_MEAL,
      payload
    }];
    const store = mockStore({});
    store.dispatch(selectMeal(payload));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
  it('should reset menu', async (done) => {
    const expectedActions = [{
      type: RESET_MENU
    }];
    const store = mockStore({});
    store.dispatch(resetMenu());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
