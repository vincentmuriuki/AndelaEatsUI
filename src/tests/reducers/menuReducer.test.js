import menuReducer from '../../reducers/menuReducer';
import initialState from '../../reducers/initialState';
import { SET_MENUS } from '../../actions/actionTypes';

/* 
global jest 
expect 
*/
describe('Menu Reducers', () => {

  it('SET_MENUS: should set upcoming menus to state', () => {
    const payload = [
      {
        id: 1,
        meal: 'eba'
      }
    ]
    const action = {
      type: SET_MENUS,
      payload 
    };
    const newState = menuReducer(initialState.menus, action);
    expect(newState).toEqual(action.payload);
  });
});