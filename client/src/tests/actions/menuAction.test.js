import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { baseUrl, getUpComingMenus, orderMeal } from '../../actions/menuAction';
import { 
  SET_MENUS,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE 
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
        type: MAKE_ORDER_SUCCESS,
        payload: {}
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
});
