import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedMenus,
{ MealOptions, Menus } from '../../../components/Order/Menus';
import { mockMenu } from '../../helpers/mockOrders';

const props = {
  data: mockMenu,
  mealOptions: mockMenu,
  title: 'Test Meal',
  selectedMealId: 1,
  toggleModal: jest.fn(),
  selectMeal: jest.fn(),
  match: {
    params: { id: 23 }
  },
  resetMenu: jest.fn(),
  updateSelection: jest.fn(),
  menu: mockMenu[0],
  getOrderByDate: () => Promise.resolve()
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let wrapper;
/* 
global jest 
expect 
*/
describe('MealOptions Component', () => {
  it('should mount successfully', () => {
    wrapper = shallow(<MealOptions {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should have a title', () => {
    wrapper = shallow(<MealOptions {...props} />);
    expect(wrapper.find('h3').contains(props.title)).toBeTruthy();
  });

  describe('class methods test', () => {
    it('onChange method', () => {
      const mealId = 1;

      const selectMealSpy = jest.spyOn(props, 'updateSelection');
      wrapper = shallow(<MealOptions {...props} />);
      wrapper.instance().onChange(mealId, true);

      expect(selectMealSpy).toHaveBeenCalled();
    });
  });
});

describe('Menus Component', () => {
  it('should mount successfully', () => {
    wrapper = shallow(<Menus {...props} />);
    expect(wrapper).toBeDefined();
  });

  describe('class methods test', () => {
    it('componentWillReceiveProps', () => {
      const nextProps = { ...props, match: { params: { id: 15 } } }
      wrapper = shallow(<Menus {...props} />).instance();
      const methodSpy = jest.spyOn(wrapper, 'componentWillReceiveProps');
      wrapper.componentWillReceiveProps(nextProps);
      expect(methodSpy).toHaveBeenCalled();
      expect(wrapper.state.updated).toBe(false);
    });

    it('updateSelection method', () => {
      const mealCategory = 'main';
      const mealId = 1;

      const selectMealSpy = jest.spyOn(props, 'selectMeal');
      wrapper = shallow(<Menus {...props} />);
      wrapper.instance().updateSelection(mealCategory, mealId);

      expect(selectMealSpy).toHaveBeenCalled();
    });

    it('resetMenus method', () => {
      const resetMenuSpy = jest.spyOn(props, 'resetMenu');
      wrapper = shallow(<Menus {...props} />).instance();

      wrapper.resetMenus();

      expect(resetMenuSpy).toHaveBeenCalled();
      expect(wrapper.state).toEqual({
        mainMeal: '', acc1: '', acc2: '', isLoading: true, updated: false
      });
    });

    it('queryEdit method', () => {
      const id = 23;
      wrapper = shallow(<Menus {...props} />).instance();
      const methodSpy = jest.spyOn(wrapper, 'queryEdit');
      wrapper.queryEdit(id, mockMenu);

      expect(methodSpy).toHaveBeenCalled();
      expect(wrapper.state).toEqual({
        isLoading: true, updated: false
      });
    });
  });

  describe('interaction test', () => {
    it('calls toggleModal on button click', () => {
      const toggleModalSpy = jest.spyOn(props, 'toggleModal');
      wrapper = shallow(<Menus {...props} />);
      wrapper.find('.btn.submit-order').simulate('click');
      expect(toggleModalSpy).toHaveBeenCalled();
    });
  });
});


describe('ConnectedMenus Test', () => {
  it('renders without problems', () => {
    const store = mockStore({
      orders: {
        isLoading: false,
        menu: mockMenu
      }
    });
    wrapper = shallow(<ConnectedMenus store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
