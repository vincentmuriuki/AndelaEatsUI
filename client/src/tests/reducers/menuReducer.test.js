import menuReducer from '../../reducers/menuReducer';
import { initialMenus } from '../../reducers/initialState';
import { SET_MENUS, SELECT_MEAL } from '../../actions/actionTypes';

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
    ];
    const action = {
      type: SET_MENUS,
      payload 
    };
    const newState = menuReducer(initialMenus, action);
    expect(newState.menus).toEqual(action.payload);
  });
  it('SELECT_MEAL: should set selected meal to state', () => {
    const payload = {
      prop: 'mainMeal',
      value: 1
    };
    const action = {
      type: SELECT_MEAL,
      payload 
    };
    const newState = menuReducer(initialMenus, action);
    expect(newState.mainMeal).toEqual(action.payload.value);
  });
});