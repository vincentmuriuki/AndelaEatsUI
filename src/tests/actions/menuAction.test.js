import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { baseUrl, getUpComingMenus } from '../../actions/menuAction';
import { SET_MENUS } from '../../actions/actionTypes';

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
});
